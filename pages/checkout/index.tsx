import { connect } from "react-redux";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { alertBox } from "redux/AlertBox/alert-actions";
import { clearCart } from "redux/AddToCart/cart-actions";
import Head from "next/head";
import Cookie from "js-cookie";
import * as ga from "../../lib/ga";
import * as fbq from "../../lib/fpixel";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const CCAV_ACCCODE = process.env.NEXT_PUBLIC_CCAVENUE_ACCESS_CODE;
const CCAV_TXNURL = process.env.NEXT_PUBLIC_CCAVENUE_TXN_URL;

const CheckoutWrapper = ({ userData, alertBox, clearCartAction, cartInfo, cart_id,currency,utmData,cart,coupon,seoHomePageData}) => {
  const [stipePromise, setStripePromise] = useState(() =>
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PKEY!)
  );

  return (
    <Elements stripe={stipePromise}>
      <Checkout
        userData={userData}
        alertBox={alertBox}
        clearCartAction={clearCartAction}
        cartInfo={cartInfo}
        cart_id={cart_id}
        utmData={utmData}
        currency_type={currency}
        cart={cart}
        coupon={coupon}
        seoHomePageData={seoHomePageData}
      />
    </Elements>
  );
};

const Checkout = ({ userData, alertBox, clearCartAction, cartInfo, cart_id,currency_type, utmData,cart,coupon, seoHomePageData}) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const ccAvFormEl = useRef(null);

  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [currency, setCurrency] = useState(null);

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

  const [userDefaultBilling, setUserDefaultBilling] = useState(true);

  const [userNameOnCard, setUserNameOnCard] = useState("");

  const [userCoupon, setUserCoupon] = useState("");

  const [regularAmount, setRegularAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  const [paymentStatus, setPaymentStatus] = useState("Pay Now");
  const [paymentMode, setPaymentMode] = useState("stripe");

  const [alertMessage, setAlertMessage] = useState("");

  const [orderDetails, setOrderDetails] = useState({
    id: "",
    status: "",
  });

  const [cartId, setCartId] = useState(null);
  const [cartDetails, setCartDetails] = useState(null);
  const [encRequest, setEncRequest] = useState();
  const [isBreakpoint, setIsBreakpoint] = useState(false);

  useEffect(()=>{
    if(!userData){
      router.push('/')
    }
  },[userData])
  
  useEffect(() => {
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

  // console.log(coupon)

  useEffect(() => {
    if (cartInfo && currency_type && cart_id) {
      setCartId(cart_id); // set Cart Id
      let curr_type = { type: "", symbol: "" };
      if (currency_type?.toLowerCase() === "gbp") {
        curr_type.type = currency_type?.toLowerCase();
        curr_type.symbol = "£";
      } else if (currency_type?.toLowerCase() === "eur") {
        curr_type.type = currency_type?.toLowerCase();
        curr_type.symbol = "€";
      } else if (currency_type?.toLowerCase() === "inr") {
        curr_type.type = currency_type?.toLowerCase();
        curr_type.symbol = "₹";
      } else {
        curr_type.type = currency_type?.toLowerCase();
        curr_type.symbol = "$";
      }
      let payment_mode = currency_type?.toLowerCase() === "inr" ? "ccav" : "stripe";
      setPaymentMode(payment_mode);
      setCurrency(curr_type);
      setCartDetails(cartInfo);
      //final amount must be calculated !
      let final_amount = 0.0
      if(coupon == null){
        cartInfo.forEach((itm)=>{
          let selectedCourseType = itm.selectedCourseType
          itm.course_details.forEach((x)=>{
            if(selectedCourseType.includes(x.course_type)){
              final_amount = final_amount + parseFloat(x.total_price[curr_type.type])
            }
          })
          if(selectedCourseType.length == 1 && selectedCourseType[0].includes("sandbox-")){
            itm.course_details.forEach((x)=>{
              final_amount = final_amount + parseFloat(x.total_price[curr_type.type])
            })
          }
        })
      }else{
        final_amount = coupon.discounted_price
      }
      
      setFinalAmount(final_amount * 100);
      // Facebook Pixel
      if (process.env.NEXT_PUBLIC_BASE_PATH.includes("whizlabs.com")) {
        fbq.event({
          action: "InitiateCheckout",
          params: {
            currency: cartInfo?.currency_type,
            value: cartInfo.discounted_price,
          },
        });

        ga.ecommerceEvent({
          eventType: "checkout",
          currency: cartInfo?.currency_type,
          checkoutStep: 1,
          checkoutOption: payment_mode,
          productList: cartInfo,
        });
      }
    } else {
      // router.push("/");
    }
  }, [cartInfo, cart_id]);

  useEffect(() => {
    if (userData) {
      axios
        .get(baseUrl + "/users/profile", {
          headers: { Authorization: userData.token },
        })
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
            // setUserStateId(user.state_id);
            // setUserStateName(user.state.name);
            // setUserCityId(user.city_id);
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
      router.push("/checkout/redirect/success");
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
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: statusText,
      });
      return false;
    }

    return data.status === 1 ? true : false;
  };

  const updateOrder = async (orderId, txn_id) => {
    const data = JSON.stringify({
      order_id: orderId,
      txn_id,
      order_status: "completed",
      utm_source: utmData?.utm_source || "",
      utm_campaign: utmData?.utm_campaign || "",
      utm_medium: utmData?.utm_medium || "",
      utm_term: utmData?.utm_term || "",
      utm_content: utmData?.utm_content || "",
      share_a_sale: utmData?.share_a_sale || false,
    });

    const response = await axios.put(`${baseUrl}/orders`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // EMPTY CART NOW

    return response.data && response.data?.data?.order_id ? true : false;
  };

  const validateInput = () => {
    if (!userFirstName) {
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "First Name is required.",
      });
      setPaymentStatus("Pay Now");
      return 0;
    }
    if (!userLastName) {
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "Last Name is required.",
      });
      setPaymentStatus("Pay Now");
      return 0;
    }
    /*  if (!userPhone) {
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "Phone Number is required.",
      });
      setPaymentStatus("Pay Now");
      return 0;
    } */
    // if (userPhone && userPhone.length < 8) {
    //   alertBox({
    //     type: "ERROR",
    //     title: "Error",
    //     msg: "Phone number is invalid",
    //   });
    //   setPaymentStatus("Pay Now");
    //   return 0;
    // }
    if (!userAdd1) {
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "Address line 1 is required",
      });
      setPaymentStatus("Pay Now");
      return 0;
    }
    if (userAdd1.trim().toLowerCase() === "na") {
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "Invalid Address",
      });
      setPaymentStatus("Pay Now");
      return 0;
    }
    if (!userCountryId || userCountryId === "Select Country") {
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "Country is required",
      });
      setPaymentStatus("Pay Now");
      return 0;
    }
    if (!userStateId || userStateId === "Select State") {
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "State is required.",
      });
      setPaymentStatus("Pay Now");
      return 0;
    }
    return 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPaymentStatus("Processing...");
    // paymentBtn.current.setAttr("disabled", true);
    const cardElement = elements.getElement(CardElement);

    // HANDLE VALIDATION
    const isValidInputs = validateInput();

    if (!isValidInputs) return;

    // Update Profile
    if (userDefaultBilling) {
      await userUpdateProfile();
    }

    let courseAWS = cartInfo.find((item)=> item.courseSlug == "aws-developer-associate")
    let final_amount_associate = 0.0
    if(courseAWS){
      courseAWS.course_details.forEach((x)=>{
        if(courseAWS.selectedCourseType.includes(x.course_type)){
          final_amount_associate = final_amount_associate + parseFloat(x.total_price[currency?.type])
        }
      })
    }
  
    if(courseAWS){
      ga.event({
        action: "conversion",
        params: {
          'send_to': 'AW-1071861065/2TpoCNr-guoYEMmajf8D',
          'value': final_amount_associate,
          'currency': currency.type,
        },
      });
    }

    if (paymentMode === "stripe") {
      const response = await axios.post(
        `${baseUrl}/cart/checkout`,
        JSON.stringify({
          cart_id: cartId,
          payment_method: "stripe",
          couponData:coupon
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        alertBox({
          type: "ERROR",
          title: "Error",
          msg: response.statusText,
        });
        setPaymentStatus("Retry Payment");
        return;
      }

      if (response.data.status === "error") {
        alertBox({
          type: "ERROR",
          title: "Error",
          msg: response.data.message,
        });
        setPaymentStatus("Retry Payment");
        return;
      }
      const orderApiResp = response.data.data;
      Cookie.set("lastOrderId", orderApiResp.order_id);

      // Use your card Element with other Stripe.js APIs
      const { error, paymentIntent } = await stripe!.confirmCardPayment(
        orderApiResp.stripe.client_secret,
        {
          payment_method: {
            card: cardElement!,
            billing_details: { name: userNameOnCard },
          },
        }
      );

      if (error) {
        alertBox({
          type: "ERROR",
          title: error?.code ? error?.code?.replaceAll("_", " ").toUpperCase() : "Error",
          msg: error?.message || "Your card was declined",
        });
        setPaymentStatus("Retry Payment");
        return;
      }

      const payIntentStatus = paymentIntent!.status;
      setPaymentStatus(payIntentStatus);
      const orderUpdate = await updateOrder(orderApiResp.order_id, orderApiResp.stripe.id);
      if (!orderUpdate) {
        alertBox({
          type: "ERROR",
          title: "Error",
          msg: error.message,
        });
        setPaymentStatus("Retry Payment");
        return;
      }
      alertBox({
        type: "SUCCESS",
        title: "Success",
        msg: "Payment Successfull.",
      });
      setPaymentStatus("Payment Success");
      clearCartAction();
    } else {
      axios
        .post(`${baseUrl}/cart/checkout`, {
          cart_id: cartId,
          couponData:coupon,
          payment_method: "ccavenue",
          utm_source: utmData?.utm_source || "",
          utm_campaign: utmData?.utm_campaign || "",
          utm_medium: utmData?.utm_medium || "",
          utm_term: utmData?.utm_term || "",
          utm_content: utmData?.utm_content || "",
          share_a_sale: utmData?.share_a_sale || false,
        })
        .then(({ status, statusText, data }) => {
          if (status !== 200) {
            console.error(statusText);
            return;
          }

          if (data.status === "error") {
            console.error(data);
            return;
          } 

          setEncRequest(data.data.ccavenue.enc_order);
          Cookie.set("lastOrderId", data.data.order_id);
          ccAvFormEl.current.submit();
        })
        .catch((er) => console.error(er));
    }
  };
  //bf savings tab
  // let course_in_cart = cartInfo.cart_details;
  // let rp = course_in_cart[course_in_cart.length-1].strike_out_price;
  // let sp = cartInfo.total_price;
  // let saving = (rp - parseFloat(sp)).toFixed(2)
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
                    {paymentMode === "stripe" ? (
                      <>
                        <li data-target="strip" className="active current">
                          <figure>
                            <img src="/images/strip.png" alt="" />
                          </figure>
                        </li>
                        <span
                          style={isBreakpoint ? { marginTop: "15px" } : { marginTop: "0px" }}
                          className="msg_stripe"
                        >
                          All Credit and Debit cards are accepted
                        </span>
                      </>
                    ) : (
                      ""
                    )}

                    {paymentMode === "ccav" ? (
                      <li data-target="avenue" className="active current">
                        <figure>
                          <img src="/images/avenue.png" alt="" />
                        </figure>
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>
                </div>
                <div className="payment-info">
                  <div
                    className={`tab avenue ${paymentMode === "ccav" ? "current active" : ""}`}
                    id="avenue"
                    style={{
                      marginBottom: "15px",
                    }}
                  >
                    <div>
                      <span className="subtitle">Information Guide</span>
                      <p>
                        In order to complete your transaction, we will transfer you over to
                        CCAvenue’s secure servers. You will be able to pay using your{" "}
                        <strong>
                          Credit & Debit Card, Net Banking, Cash Card, Paytm, Wallet, UPI,
                        </strong>
                        <strong> and EMI option. </strong>
                      </p>
                      <form
                        id="cc_av__nonseamless"
                        ref={ccAvFormEl}
                        method="post"
                        name="redirect"
                        action={
                          CCAV_TXNURL + "/transaction/transaction.do?command=initiateTransaction"
                        }
                      >
                        <input
                          type="hidden"
                          id="encRequest"
                          name="encRequest"
                          defaultValue={encRequest}
                        />
                        <input
                          type="hidden"
                          name="access_code"
                          id="access_code"
                          defaultValue={CCAV_ACCCODE}
                        />
                      </form>
                    </div>
                  </div>
                  <div
                    className={`tab strip ${paymentMode === "stripe" ? "current active" : ""}`}
                    id="strip"
                  >
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
                  </div>
                  <div
                    className="billing-details"
                    style={{
                      width: "100%",
                      border: "1px solid #DDD",
                      borderRadius: " 8px",
                      padding: "20px",
                    }}
                  >
                    <span className="subtitle">Billing Details</span>
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
                        <div className="input-box" style={{maxWidth:"100%"}}>
                          <label>
                            Email <span style={{ display: "inline", color: "red" }}>*</span>
                          </label>
                          <input
                            type="email"
                            className="bg-ghostwhite"
                            value={userEmail}
                            disabled={true}
                          />
                        </div>
                        {/* <div className="input-box">
                          <label>
                            Phone
                          </label>
                          <input
                            type="tel"
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
                            type="text"
                            className="bg-ghostwhite"
                            value={userAdd1}
                            onChange={(e) => setUserAdd1(e.target.value)}
                          />
                        </div>
                        <div className="input-box full">
                          <label>Address Line 2</label>
                          <input
                            type="text"
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
                            type="text"
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

              <div className="order-summary-block">
                <div className="order-summary">
                  <span className="title">Order summary</span>
                  <div className="price-group">
                    <div className="price-block">
                      <span className="price-subtitle">Subtotal</span>
                      <span className="price">
                        {currency && currency.symbol == "$" ? "US":""}
                        {currency ? currency.symbol : ""}
                        {/* {cartDetails?.total_price} */}
                        {(finalAmount / 100).toFixed(2)}
                      </span>
                    </div>
                    {/* <div className="price-block hr">
                      <span className="price-subtitle">Discount</span>
                      <span className="price-discount">
                        -{currency ? currency.symbol : ""}
                        {(+cartDetails?.total_price - +(finalAmount / 100)).toFixed(2)}
                      </span>
                    </div> */}
                  </div>
                  <div className="saving-block"  style={coupon?.discounted_price ?{}:{justifyContent:"flex-end"}}>
                    {
                      coupon?.discounted_price && <div className="saving-batch">
                      <i className="icon saving-icon icon-font-saving"></i>
                      <span className="saving-text">
                        Savings{" "}
                        <strong>
                          {" "}
                          {currency ? currency.symbol : ""}
                          {(+coupon?.total_price - +(finalAmount / 100)).toFixed(2)}{" "}
                        </strong>
                      </span>
                    </div>
                    }
                    <span className="saving-amt">
                      {currency && currency.symbol == "$" ? "US":""}
                      {currency ? currency.symbol : ""}
                      {(finalAmount / 100).toFixed(2)}
                    </span>
                  </div>
                  <button
                    disabled={
                      paymentStatus == "Pay Now" || paymentStatus == "Retry Payment" ? false : true
                    }
                    onClick={(e) => handleSubmit(e)}
                    className="btn btn-checkout" /* disabled={!["initial", "error"].includes(payment.status) || !stripe} */
                  >
                    {/* Pay Now */}
                    {paymentStatus}
                  </button>
                  {/* {alertMessage} */}
                  <div className="summary-content-ic-cart">
                    <div>
                      <p>
                        Upon clicking 'Pay Now', you will be charged the above amount using the payment method selected.
                      </p>
                    </div>
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

export const getServerSideProps = async (context) => {
  let cartInfo = "";
  let userToken = "";
  let cartId = "";
  let currency = "";
  let cart = null;

  const seoHomePageData = {
    seoPageType: "checkout",
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
  const userSplit = decoded.split("userData=")[1];
  const cartSplit = decoded.split("cart_id=")[1];
  if (userSplit) {
    const split2 = userSplit.split(";")[0];
    const parsed = split2 ? JSON.parse(split2) : null;
    userToken = parsed ? parsed.data.token : null;
  }else{
    return{
      redirect: {
        destination: `/`,
        permanent: false,
      },
    }
  }

  let CartData = await axios.get(`${baseUrl}/cart/getcartdata`,{
    headers:{
      Authorization:userToken
    }
  })
  // console.log(CartData.data)
  if(CartData && CartData.data && CartData.data.cart && CartData.data.cart_details){
    cartInfo = CartData.data.cart_details
    cartId = CartData.data.cart.id
    currency = CartData.data.cart.currency_type
    cart =  CartData.data.cart
  }else{
    return{
      redirect: {
        destination: `/`,
        permanent: false,
      },
    }
  }
  return {
    props: {
      cartInfo: cartInfo,
      cart_id: cartId,
      currency:currency,
      cart:cart,
      seoHomePageData,
    },
  };
};

const mapStateToProps = (state) => {
  return {
    userData: state.authData?.userData?.data,
    utmData: state.utmData,
    coupon:state.cart.couponData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    alertBox: (data) => dispatch(alertBox(data)),
    clearCartAction: () => dispatch(clearCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutWrapper);
