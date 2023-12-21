import { connect } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { alertBox } from "redux/AlertBox/alert-actions";
import { subsButtonClick } from "redux/buttonClick/click-actions";
import Head from "next/head";
import Cookie from "js-cookie";
import * as ga from "../../lib/ga";
import * as fbq from "../../lib/fpixel";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const CheckoutWrapperSub = ({ subData, userData, alertBoxAction, buttonClickAction, utmData, activePlanIds,userType,timerState, seoHomePageData}) => {
  const [stipePromise, setStripePromise] = useState(() =>
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PKEY!)
  );
  return (
    <Elements stripe={stipePromise}>
      <Checkout
        subData={subData}
        userData={userData}
        alertBoxAction={alertBoxAction}
        buttonClickAction={buttonClickAction}
        utmData={utmData}
        activePlanIds={activePlanIds}
        userType={userType}
        timerState={timerState}
        seoHomePageData={seoHomePageData}
      />
    </Elements>
  );
};

const Checkout = ({ subData, userData, alertBoxAction, buttonClickAction, utmData, activePlanIds,userType,timerState, seoHomePageData}) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAdd1, setUserAdd1] = useState("");
  const [userAdd2, setUserAdd2] = useState("");
  const [userZip, setUserZip] = useState("");
  const [userCountryId, setUserCountryId] = useState("");
  const [userCountryName, setUserCountryName] = useState("");
  const [userCountryCode, setUserCountryCode] = useState("");
  const [userStateId, setUserStateId] = useState("");
  const [userStateName, setUserStateName] = useState("");
  const [userCityId, setUserCityId] = useState("");
  const [userCityName, setUserCityName] = useState("");
  const [userAutoRenew, setUserAutoRenew] = useState(
    subData?.subscription_for > 0 && subData?.subscription_for <= 12 ? true : false
  );
  const [userDefaultBilling, setUserDefaultBilling] = useState(true);
  const [userNameOnCard, setUserNameOnCard] = useState("");
  const [userCoupon, setUserCoupon] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [discountAmt, setDiscountAmt] = useState(0);
  const [discountLoading, setDiscountLoading] = useState(false);
  const [discountInvalid, setDiscountInvalid] = useState(false);
  const [finalAmount, setFinalAmount] = useState(userType == "amazon"? subData?.offer_price.usd * 100:(timerState && subData.campaign_offer ? (subData?.campaign_offer.price.usd *100):subData?.offer_price.usd * 100));
  const [orderDetails, setOrderDetails] = useState({
    id: "",
    status: "",
  });
  const [isBreakpoint, setIsBreakpoint] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState("new");

  useEffect(() => {
    if (!subData || !userData /* || activePlanIds.includes(subData.id) */) {
      // go pack to pricing page
      router.push("/pricing");
      return;
    }

    if (activePlanIds.includes(subData.id)) {
      setSubscriptionType("renew");
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    function handleResize() {
      const { innerWidth: width, innerHeight: height } = window;
      if (width < 450) {
        setIsBreakpoint(false);
      } else {
        setIsBreakpoint(true);
      }
    }
  }, []);

  useEffect(() => {
    if (subData && subData?.offer_price?.usd) {
      // Facebook Pixel
      if (process.env.NEXT_PUBLIC_BASE_PATH.includes("whizlabs.com")) {
        fbq.event({
          action: "InitiateCheckout",
          params: {
            currency: "USD",
            value: subData?.offer_price?.usd,
          },
        });
      }
    }
  }, [subData]);

  useEffect(() => {
    if (userData !== null && userData.token) {
      axios
        .get(baseUrl + "/users/profile", { headers: { Authorization: userData.token } })
        .then((response) => {
          const user = response.data.data;
          if (user) {
            setUserFirstName(user.firstname);
            setUserLastName(user.lastname);
            setUserEmail(user.email);
            // setUserPhone(user.phone);
            setUserAdd1(user.address_line_1);
            setUserAdd2(user.address_line_2);
            setUserZip(user.pincode);
            setUserCountryId(user.country_id);
            setUserCountryName(user.country?.name);
            setUserCountryCode(user.country?.country_code);

            setUserCityId(user.city_id);
            // setUserCityName(user.city.name);
            setUserStateId(user.state_id);
            if (user.country_id && user.state_id) {
              axios.get(baseUrl + "/data/states/" + user.country_id).then((response) => {
                setStateList(response.data.data);
                // setCityList(response[1].data.data);
              });
            }
          }
        })
        .catch((err) => console.error(err));
    }

    axios.get(baseUrl + "/data/countries").then((response) => setCountryList(response.data.data));
  }, [userData]);

  useEffect(() => {
    let state_verify = stateList.find((itm) => itm.id == userStateId);
    if (state_verify) {
      setUserStateId(userStateId);
    } else {
      setUserStateId("Select State");
    }
  }, []);

  useEffect(() => {
    if (paymentStatus === "active" || paymentStatus === "succeeded") {
      // Navigate to subscription page
      alertBoxAction({
        type: "SUCCESS",
        title: "Success",
        msg: "Payment Success! Redirecting...",
      });
      setPaymentStatus("Success");

      setLoading(false);
      setTimeout(() => {
        router.push("/pricing/thankyou");
      }, 3000);
    }
  }, [paymentStatus]);

  const changeCountry = async (e) => {
    const index = e.nativeEvent.target.selectedIndex;
    const name = e.nativeEvent.target[index].text;
    const value = e.nativeEvent.target[index].value;
    setStateList([]);
    setCityList([]);
    setUserStateId("Select State");
    setUserCountryId(value);
    setUserCountryName(name);
    if (value !== "Select Country") {
      const stateResp = await axios.get(baseUrl + "/data/states/" + value);
      setStateList(stateResp.data.data);
    }
    setUserCountryCode(countryList.find((item) => item.id == value).country_code || "");
  };

  const changeState = async (e) => {
    const index = e.nativeEvent.target.selectedIndex;
    const name = e.nativeEvent.target[index].text;
    const value = e.nativeEvent.target[index].value;
    setCityList([]);
    const cityResp = await axios.get(baseUrl + "/data/cities/" + value);
    setCityList(cityResp.data.data);
    setUserStateId(value);
    setUserStateName(name);
  };

  const changeCity = async (e) => {
    const index = e.nativeEvent.target.selectedIndex;
    const name = e.nativeEvent.target[index].text;
    const value = e.nativeEvent.target[index].value;
    setUserCityId(value);
    setUserCityName(name);
  };

  const handleCoupon = async (e) => {
    e.preventDefault();
    setDiscountInvalid(false);

    setDiscountLoading(true);

    const response = await axios.post(`${baseUrl}/subscription/verify_coupon`, {
      coupon_name: userCoupon,
      plan_id: subData.id,
      user_id: userData.user_id,
    });

    if (response.data.status === "error") {
      setDiscountInvalid(true);
      setDiscountLoading(false);
      setUserCoupon("");
      return;
    }

    const couponData = response.data.data;

    setDiscountAmt(parseFloat(couponData.discount_amount));
    setFinalAmount(parseFloat(couponData.final_price) * 100);
    setDiscountLoading(false);
  };

  const userUpdateProfile = async () => {
    const { status, data, statusText } = await axios.put(
      `${baseUrl}/users/profile/${userData.user_id}`,
      JSON.stringify({
        firstname: userFirstName,
        lastname: userLastName,
        // phone: userPhone,
        address_line_1: userAdd1,
        address_line_2: userAdd2 || null,
        country_id: userCountryId,
        state_id: userStateId,
        city_id: userCityId || null,
        pincode: userZip,
      }),
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (status === 500) {
      alertBoxAction({
        type: "ERROR",
        title: "Error",
        msg: statusText,
      });
      setLoading(false);
      return false;
    }

    return data.status === 1 ? true : false;
  };

  const validateInput = () => {
    if (!userNameOnCard) {
      alertBoxAction({
        type: "ERROR",
        title: "Error",
        msg: "Card holder's name is required.",
      });
      setPaymentStatus("Pay Now");
      return 0;
    }
    if (!userFirstName) {
      alertBoxAction({
        type: "ERROR",
        title: "Error",
        msg: "First Name is required.",
      });
      setPaymentStatus("Pay Now");
      return 0;
    }
    if (!userLastName) {
      alertBoxAction({
        type: "ERROR",
        title: "Error",
        msg: "Last Name is required.",
      });
      setPaymentStatus("Pay Now");
      return 0;
    }
    /*   if (!userPhone) {
      alertBoxAction({
        type: "ERROR",
        title: "Error",
        msg: "Phone Number is required.",
      });
      setPaymentStatus("Pay Now");
      return 0;
    } */
    // if (userPhone && userPhone.length < 8) {
    //   alertBoxAction({
    //     type: "ERROR",
    //     title: "Error",
    //     msg: "Phone number is invalid",
    //   });
    //   setPaymentStatus("Pay Now");
    //   return 0;
    // }
    if (!userAdd1) {
      alertBoxAction({
        type: "ERROR",
        title: "Error",
        msg: "Address line 1 is required",
      });
      setPaymentStatus("Pay Now");
      return 0;
    }
    if (userAdd1.trim().toLowerCase() === "na") {
      alertBoxAction({
        type: "ERROR",
        title: "Error",
        msg: "Invalid Address",
      });
      setPaymentStatus("Pay Now");
      return 0;
    }
    if (!userCountryId || userCountryId === "Select Country") {
      alertBoxAction({
        type: "ERROR",
        title: "Error",
        msg: "Country is required",
      });
      setPaymentStatus("Pay Now");
      return 0;
    }
    if (!userStateId || userStateId === "Select State") {
      alertBoxAction({
        type: "ERROR",
        title: "Error",
        msg: "State is required.",
      });
      setPaymentStatus("Pay Now");
      return 0;
    }
    return 1;
  };

  let parsedData = null;
  const cookieValue = Cookie.get('Subscribe_now_button');
  if (cookieValue) {
    try {
      parsedData = JSON.parse(cookieValue);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cardElement = elements.getElement(CardElement);

    // HANDLE VALIDATION
    const isValidInputs = validateInput();

    if (!isValidInputs) return;

    setLoading(true);

    setPaymentStatus("Processing...");
    // Update Profile
    if (userDefaultBilling) await userUpdateProfile();

    // Create a payment method from stripe
    let { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: userNameOnCard,
      },
    });

    if (error) {
      alertBoxAction({
        type: "ERROR",
        title: error?.code ? error?.code?.replaceAll("_", " ").toUpperCase() : "Error",
        msg: error?.message || "Your card was declined",
      });
      setLoading(false);
      return;
    }

    // Create the subscription.
    const subResponse = await axios.post(
      `${baseUrl}/subscription/create`,
      {
        user_id: userData.user_id,
        plan_id: subData.id,
        coupon_name: userCoupon,
        auto_renew: userAutoRenew,
        payment_method_id: paymentMethod.id,
        subscription_type: subscriptionType,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (subResponse.data.status === "error") {
      alertBoxAction({
        type: "ERROR",
        title: "Error",
        msg: subResponse.data.message,
      });
      setPaymentStatus("");
      setLoading(false);
      return;
    }

    const subApiResp = subResponse.data.data;

    setOrderDetails({
      id: subApiResp.order_id,
      status: subApiResp.status,
    });
    Cookie.set("lastOrderId", subApiResp.order_id);

    // alertBoxAction({
    //   type: "SUCCESS",
    //   title: "Success",
    //   msg: `Subscription created with status: ${subApiResp.status}`,
    // });

    // console.log("subApiResp.status", subApiResp.status);
    switch (subApiResp.status) {
      case "active":
        // Redirect to account page
        const isComplete = await updateSubscription(subApiResp.order_id, subApiResp.id);
        if (isComplete) {
          if(cookieValue){
            // 3rd param "0" - not purchased  &  "1" - purchased
            buttonClickAction(userData, parsedData, "1", subApiResp.order_id);
          }
          alertBoxAction({
            type: "SUCCESS",
            title: "Success",
            msg: "Payment Success! Redirecting to your account.",
          });
          setPaymentStatus("Success");

          setLoading(false);
          setTimeout(() => {
            router.push("/pricing/thankyou");
          }, 3000);
        } else {
          alertBoxAction({
            type: "ERROR",
            title: "Error",
            msg: "Error Updating subscription.",
          });
          setLoading(false);
          setPaymentStatus("Error");
        }
        break;

      case !"active":
      case "incomplete":
      case "requires_action":
      case "requires_source_action":
      case "requires_source":
        const { error, paymentIntent } = await stripe.confirmCardPayment(subApiResp.client_secret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: userNameOnCard,
            },
          },
        });

        if (error) {
          alertBoxAction({
            type: "ERROR",
            title: error?.code ? error?.code?.replaceAll("_", " ").toUpperCase() : "Error",
            msg: error?.message || "Your card was declined",
          });
          setLoading(false);
        } else {
          if (paymentIntent) {
            const payIntentStatus = paymentIntent!.status;
            setPaymentStatus(payIntentStatus);
            const isComplete = await updateSubscription(subApiResp.order_id, subApiResp.id);
            if (isComplete) {
              if(cookieValue){
                // 3rd param "0" - not purchased  &  "1" - purchased
                buttonClickAction(userData, parsedData, "1", subApiResp.order_id);
              }
              alertBoxAction({
                type: "SUCCESS",
                title: "Success",
                msg: "Success! Redirecting to your account.",
              });
              setPaymentStatus("Success");
            } else {
              alertBoxAction({
                type: "ERROR",
                title: "Error",
                msg: "Error Updating subscription.",
              });
              setLoading(false);
              setPaymentStatus("Error");
            }
          }
        }
        break;

      default:
        alertBoxAction({
          type: "ERROR",
          title: "Error",
          msg: `Unknown Subscription status: ${subApiResp.status}`,
        });
        setLoading(false);
    }
  };

  const updateSubscription = async (orderId = null, subsId = null) => {
    const data = JSON.stringify({
      order_id: orderId,
      subs_id: subsId,
      user_id: userData.user_id,
      plan_id: subData.id,
      utm_source: utmData?.utm_source || "",
      utm_campaign: utmData?.utm_campaign || "",
      utm_medium: utmData?.utm_medium || "",
      utm_term: utmData?.utm_term || "",
      utm_content: utmData?.utm_content || "",
      share_a_sale: utmData?.share_a_sale || false,
    });

    const response = await axios.post(`${baseUrl}/subscription/complete`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.status === 500 ? false : response.data.status === 1 ? true : false;
  };
  let discount_available = subData?.campaign_offer?true:false;
  // console.log("subscriptionType", subscriptionType);
  return (
    <>
      {/* <Head>
        <title>Checkout | Whizlabs</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />

        <meta httpEquiv="cache-control" content="no-cache" />
        <meta httpEquiv="expires" content="0" />
        <meta httpEquiv="pragma" content="no-cache" />
      </Head> */}
      <div id="content-area" className="checkout-page">
        <div className="checkout-block">
          <div className="container-small">
            <h2 className="title">Checkout</h2>
            <div className="checkout-content">
              <div className="checkout-option">
                <div className="payment-method">
                  <span className="pay-title">Payment Method</span>
                  <ul className="payment-card">
                    <li className="active current" data-target="strip">
                      <figure>
                        <img src="/images/strip.png" alt="" />
                      </figure>
                    </li>
                    <span
                      className="msg_stripe"
                      style={isBreakpoint ? { marginTop: "15px" } : { marginTop: "0px" }}
                    >
                      All Credit and Debit cards are accepted
                    </span>
                  </ul>
                  {subData?.subscription_for > 1 && subData?.subscription_for <= 12 && (
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        defaultChecked={userAutoRenew}
                        onChange={() => setUserAutoRenew(!userAutoRenew)}
                      />
                      <span className="checkbox-style"></span>
                      <samp className="name">Auto-renew this subscription before it expires.</samp>
                    </label>
                  )}
                </div>
                <div className="payment-info">
                  <div className="tab strip current active" id="strip">
                    <div className="payment-details" id="stripe_wrapper">
                      <span className="subtitle">Payment Details</span>
                      <form>
                        <div className="input-box-group">
                          <div className="input-box full">
                            <label>
                              Name on Card{" "}
                              <span style={{ display: "inline", color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              name="name"
                              className="bg-ghostwhite"
                              value={userNameOnCard}
                              onChange={(e) => setUserNameOnCard(e.target.value)}
                            />
                          </div>
                          <div className="input-box full">
                            <label>
                              Card Number <span style={{ display: "inline", color: "red" }}>*</span>
                            </label>
                            <CardElement />
                          </div>
                        </div>

                        <div className="security-pera">
                          <p>
                            Your security is important to us. <br /> We do not store your credit
                            card information.
                          </p>
                        </div>
                      </form>
                    </div>
                    <div className="billing-details">
                      <form>
                        <div className="input-box-group">
                          <div className="input-box">
                            <label>
                              First Name <span style={{ display: "inline", color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className="bg-ghostwhite"
                              value={userFirstName}
                              onChange={(e) => setUserFirstName(e.target.value)}
                            />
                          </div>
                          <div className="input-box">
                            <label>
                              Last Name <span style={{ display: "inline", color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className="bg-ghostwhite"
                              value={userLastName}
                              onChange={(e) => setUserLastName(e.target.value)}
                            />
                          </div>
                          <div className="input-box" style={{ maxWidth: "100%" }}>
                            <label>
                              Email <span style={{ display: "inline", color: "red" }}>*</span>
                            </label>
                            <input
                              type="email"
                              className="bg-ghostwhite"
                              value={userEmail}
                              readOnly
                            />
                          </div>
                          {/* <div className="input-box">
                            <label>
                              Phone{" "}
                            </label>
                            <input
                              type="email"
                              className="bg-ghostwhite"
                              value={userPhone}
                              onChange={(e) => setUserPhone(e.target.value)}
                            />
                          </div> */}
                          <div className="input-box full">
                            <label>
                              Address Line 1{" "}
                              <span style={{ display: "inline", color: "red" }}>*</span>
                            </label>
                            <input
                              type="email"
                              className="bg-ghostwhite"
                              value={userAdd1}
                              onChange={(e) => setUserAdd1(e.target.value)}
                            />
                          </div>
                          <div className="input-box full">
                            <label>Address Line 2</label>
                            <input
                              type="email"
                              className="bg-ghostwhite"
                              value={userAdd2}
                              onChange={(e) => setUserAdd2(e.target.value)}
                            />
                          </div>
                          {/* <div className="input-box">
                            <label>
                              Postal/ZIP Code{" "}
                              <span style={{ display: "inline", color: "red" }}>*</span>
                            </label>
                            <input
                              type="email"
                              className="bg-ghostwhite"
                              value={userZip}
                              onChange={(e) => setUserZip(e.target.value)}
                            />
                          </div> */}
                          <div className="input-box">
                            <label>
                              Country <span style={{ display: "inline", color: "red" }}>*</span>
                            </label>
                            <select
                              className="custom_select_1"
                              onChange={(e) => changeCountry(e)}
                              value={userCountryId}
                            >
                              <option>Select Country</option>
                              {countryList.map((item) => (
                                <option value={item.id} key={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="input-box">
                            <label>
                              state <span style={{ display: "inline", color: "red" }}>*</span>
                            </label>
                            <select
                              className="custom_select_1"
                              onChange={(e) => changeState(e)}
                              value={userStateId}
                            >
                              <option>Select State</option>
                              {stateList.map((item) => (
                                <option value={item.id} key={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          {/* <div className="input-box">
                            <label>city</label>
                            <select
                              className="custom_select_1"
                              onChange={(e) => changeCity(e)}
                              value={userCityId}
                            >
                              <option>Select City</option>
                              {cityList.map((item) => (
                                <option value={item.id} key={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div> */}
                        </div>
                        {/* <label className="custom-checkbox">
                          <input
                            type="checkbox"
                            defaultChecked={userDefaultBilling}
                            onChange={() => {
                              setUserDefaultBilling(!userDefaultBilling);
                            }}
                          />
                          <span className="checkbox-style"></span>
                          <samp className="name">Save details as default billing address</samp>
                        </label> */}
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-summary-block">
                <div className="order-summary">
                  <span className="title">Order summary</span>
                  <div className="price-group">
                    <div className="price-block">
                      <span className="price-subtitle">Regular Price</span>
                      {
                        userType == "amazon" ? <> <span className="price">US${(+subData?.price?.usd).toFixed(2)}</span></> : <>  <span className="price">US${(+subData?.price?.usd).toFixed(2)}</span></>
                      }
                    </div>
                        <div className="price-block hr">
                          <span className="price-subtitle">Discount Price</span>
                          <span className="price-discount">
                            {/* take care amazon user in campaign and normal sale times */}
                            {userType != "amazon" ? (timerState &&  subData.campaign_offer ?<> <>US${(+subData?.campaign_offer.price.usd).toFixed(2)}</></> :<> <>US${(+subData?.offer_price.usd).toFixed(2)}</></>) : <>US${(+subData?.offer_price.usd).toFixed(2)}</>}
                            {/* US${(+subData?.offer_price?.usd).toFixed(2)} */}
                          </span>
                        </div>
                    {discountAmt > 0 && (
                      <div className="price-block hr">
                        <span
                          className="price-subtitle"
                          style={{ marginLeft: "1em", marginTop: "-10px" }}
                        >
                          Promo Code <small>({userCoupon})</small>
                        </span>
                        <span className="price-discount" style={{ marginTop: "-10px" }}>
                          -US${discountAmt.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div
                    className="saving-block"
                    style={{
                      justifyContent: "flex-end", // only when saving-batch is commented
                    }}
                  >
                    {/* <div className="saving-batch">
                      <i className="icon saving-icon icon-font-saving"></i>
                      <span className="saving-text">
                        Saving{" "}
                        <strong>
                          {" "}
                          ${(+subData?.regular_price - +(finalAmount / 100)).toFixed(2)}{" "}
                        </strong>
                      </span>
                    </div> */}
                    <span className="saving-amt">US${(finalAmount / 100).toFixed(2)}</span>
                  </div>
                  <button
                    disabled={loading}
                    onClick={(e) => handleSubmit(e)}
                    className="btn btn-checkout" /* disabled={!["initial", "error"].includes(payment.status) || !stripe} */
                  >
                    {!loading ? "Pay Now" : <img src="/images/loader.svg" width={40} height={40} />}
                  </button>
                  {/* {paymentStatus} */}
                </div>
                { userType !=="amazon" && !discount_available && <div className="promo-code">
                  <form>
                    <input
                      value={userCoupon}
                      readOnly={discountAmt !== 0}
                      onChange={(e) => setUserCoupon(e.target.value.toLowerCase())}
                      type="text"
                      placeholder="Enter Promo Code"
                    />
                    <a
                      onClick={(e) => {
                        e.preventDefault();

                        if (discountAmt > 0) {
                          setDiscountAmt(0);
                          setUserCoupon("");
                          setFinalAmount(parseFloat(subData?.offer_price?.usd) * 100 || 0);
                        } else {
                          handleCoupon(e);
                        }
                      }}
                      style={{ cursor: "pointer" }}
                      className="btn apply-btn"
                    >
                      {!discountLoading ? (
                        <span>{discountAmt > 0 ? "Remove" : "Apply"}</span>
                      ) : (
                        <img src="/images/loader.svg" width={30} height={30} />
                      )}
                    </a>
                  </form>
                  {discountInvalid && (
                    <span
                      style={{
                        textAlign: "left",
                        width: "100%",
                        display: "block",
                        margin: "10px 0 0",
                        fontSize: "100%",
                        color: "#f44336",
                      }}
                    >
                      Invalid Coupon
                    </span>
                  )}
                </div>} 
                <div className="summary-content">
                  <div>
                    <p>
                      Upon clicking 'Pay Now' you will be charged the above amount. You will be
                      charged automatically, renewing your plan, when the current plan expires. You
                      can visit 'My Account' page to make changes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    subData: state.cart?.subscription,
    userData: state.authData?.userData?.data,
    utmData: state.utmData,
    userType: state.userProfileData.user_type,
    timerState:state.timer.timer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    alertBoxAction: (data) => dispatch(alertBox(data)),
    buttonClickAction: (data, cookie, subs, p_id) => dispatch(subsButtonClick(data, cookie, subs, p_id)),
  };
};

export const getServerSideProps = async (context) => {
  const { slug } = context.query;

  const seoHomePageData = {
    seoPageType: "checkoutPricing",
    title: "Checkout | Whizlabs",
    metaTags: [
      { name: "facebook-domain-verification", httpEquiv: "", property: "", content: "twh401qzi7r7o3n227q4sg3hghbpzh" },
      { name: "", httpEquiv: "cache-control", property: "", content: "no-cache"},
      { name: "", httpEquiv: "expires", property: "", content: "0"},
      { name: "", httpEquiv: "pragma", property: "", conten: "no-cache"},
    ],
  };

  const cookie = context.req.headers.cookie;
  const decoded = decodeURIComponent(cookie);
  const split1 = decoded.split("userData=")[1];
  let userId = null;
  let userToken = null;
  let userType = null;
  let plan_id = null;
  let data_profile = decoded.split("userProfile=")[1]
  let data_sub = decoded.split("subscriptionData=")[1]
  if(data_profile)
  {
   let profile_split = data_profile.split(';')[0]
   let user_Type = JSON.parse(profile_split).user_type
    userType = user_Type
  }
  if(data_sub){
    let subdata_split = data_sub.split(';')[0]
    let planId =  JSON.parse(subdata_split).id
    plan_id = planId
  }
  if(plan_id == 727 && userType == "retail")
  {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }
  //for amazon user we have created a new plan with yearly 60usd .. 
  //need to restrict the other retail user to enter into the amazon checkout page 
  if (split1) {
    const split2 = split1.split(";")[0];
    const parsed = split2 ? JSON.parse(split2) : null;
    userId = parsed ? parsed.data.user_id : null;
    userToken = parsed ? parsed.data.token : null;
  }
  if (!userToken) {
    return {
      redirect: {
        destination: `/pricing`,
        permanent: false,
      },
    };
  }

  // check if user already has this subscription
  const { data: profileResp } = await axios.get(baseUrl + "/users/profile", {
    headers: { Authorization: userToken },
  });
  let activePlanIds = [];
  profileResp.data?.subscrptions?.active_plans?.forEach((plan) => {
    if (plan.is_plan_active) {
      activePlanIds.push(plan.plan_id);
    }
  });

  return {
    props: {
      activePlanIds,
      seoHomePageData,
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutWrapperSub);
