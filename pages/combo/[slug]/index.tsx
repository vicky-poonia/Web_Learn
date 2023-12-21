import { connect } from "react-redux";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { alertBox } from "redux/AlertBox/alert-actions";
import Head from "next/head";
import Cookie from "js-cookie";
import * as ga from "../../../lib/ga";
import * as fbq from "../../../lib/fpixel";
import { loadStripe } from "@stripe/stripe-js";
import * as CryptoJS from "crypto-js";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import InboxIcon from "@material-ui/icons/Inbox";
import { gcp_course_id } from "../../../lib/Library_lib";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import TimerIcon from '@material-ui/icons/Timer';
import { removeComboSlug } from "redux/ComboSlug/combo-slug-action";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const CCAV_ACCCODE = process.env.NEXT_PUBLIC_CCAVENUE_ACCESS_CODE;
const CCAV_TXNURL = process.env.NEXT_PUBLIC_CCAVENUE_TXN_URL;

const SingleCheckoutWrapper = ({
  userData,
  alertBoxAction,
  utmData,
  courseData,
  currencyData,
  enrolledProducts,
  // availed_freebies,
  subscription,
  clientStatus,
  landing_product,
  removeSlugAction,
  seoHomePageData
}) => {
  const router = useRouter();
  const [stipePromise] = useState(() => loadStripe(process.env.NEXT_PUBLIC_STRIPE_PKEY!));
  const slug = router.query.slug;
  return (
    <Elements stripe={stipePromise}>
      <SingleCheckout
        userData={userData}
        alertBoxAction={alertBoxAction}
        utmData={utmData}
        courseData={courseData}
        currencyData={currencyData}
        enrolledProducts={[]}
        promoData={null}
        subscription={subscription}
        clientStatus={false}
        landing_product={false}
        removeSlugAction={removeSlugAction}
      />
    </Elements>
  );
};

const SingleCheckout = ({
  userData,
  alertBoxAction,
  utmData,
  courseData,
  currencyData,
  enrolledProducts,
  promoData,
  subscription,
  clientStatus,
  landing_product,
  removeSlugAction
}) => {
  // console.log("landingProduct",landing_product)
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const ccAvFormEl = useRef(null);

  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);

  const [currency, setCurrency] = useState({
    type: "inr",
    symbol: "₹",
  });

  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAdd1, setUserAdd1] = useState("");
  const [userAdd2, setUserAdd2] = useState("");
  const [userZip, setUserZip] = useState("");
  const [userCountryId, setUserCountryId] = useState("");
  const [userStateId, setUserStateId] = useState("");

  const [userDefaultBilling, setUserDefaultBilling] = useState(true);

  const [userNameOnCard, setUserNameOnCard] = useState("");

  const [userCoupon, setUserCoupon] = useState("");

  const [regularPrice, setRegularPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);

  const [paymentStatus, setPaymentStatus] = useState("Pay Now");
  const [paymentMode, setPaymentMode] = useState("ccav"); // ccav/stripe

  const [discountAmt, setDiscountAmt] = useState(0);
  const [discountLoading, setDiscountLoading] = useState(false);
  const [discountInvalid, setDiscountInvalid] = useState(false);

  const [finalAmount, setFinalAmount] = useState(0);

  const [encRequest, setEncRequest] = useState();

  const [selectedCourseTypes, setSelectedCourseTypes] = useState([]);

  const [isBreakpoint, setIsBreakpoint] = useState(false);
  const [queryprod, setQueryProd] = useState([]);
  const [loading,setLoading] = useState(true)

  //   useEffect(()=>{
  //     const queryProds = (router.query.prod as string).split(":");
  //     let a = []
  //     queryProds.forEach((itm)=>{
  //       a.push(itm.toUpperCase())
  //     })
  //     setQueryProd(a)
  //   },[])

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

  useEffect(()=>{
    if(subscription && courseData[0] && courseData[0].combo_type == 0){
      let activeplans = subscription.active_plans.filter((itm)=>itm.is_plan_active == true)
      if(activeplans.length >= 1 ){
        router.push('/')
        setTimeout(()=>{
          alertBoxAction({
            type: "SUCCESS",
            title: "",
            msg: "You already have access to the course",
          });
        },1000)
      }else{
        setLoading(false)
      }
    }else{
      setLoading(false)
    }
  },[courseData,subscription])
  useEffect(() => {
    if (currencyData) {
      // currencyData = { type: "usd", symbol: "$", loaded: true }; // for development
      setPaymentMode(currencyData.type?.toLowerCase() === "inr" ? "ccav" : "stripe");
      setCurrency(currencyData);
    }
  }, [currencyData]);

  useEffect(() => {
    let rp = 0;
    let sp = 0;
    const availProds = [];

    if (currency && courseData && courseData.length >= 1) {
      //   courseData.products.forEach((prod) => {
      //     if (
      //       prod.product_type === "PT" ||
      //       prod.product_type === "OC" ||
      //       prod.product_type === "LAB" &&
      //       prod.product_type !== "SANDBOX"
      //     ) {
      //       if (router.query.prod) {
      //         const queryProds = (router.query.prod as string).split(":");
      //         if (queryProds.includes(prod.product_type.toLowerCase()) && prod.is_comingsoon !== "1" && prod.is_comingsoon !== "2") {
      //           rp += +prod.regular_price[currency.type];
      //           sp += +prod.sale_price[currency.type];
      //           // console.log(prod.product_type,rp,sp)
      //           availProds.push(prod.product_type);
      //         }
      //       } else {
      //         rp += +prod.regular_price[currency.type];
      //         sp += +prod.sale_price[currency.type];
      //         // console.log(prod.product_type,rp,sp)
      //         availProds.push(prod.product_type);
      //       }
      //     }

      //     if (prod.product_type.includes("SANDBOX")) {
      //       // console.log(prod)
      //       if (router.query.prod) {
      //         const queryProds = (router.query.prod as string).split(":");
      //         if (queryProds.includes(prod.product_type.toLowerCase())) {
      //           if((prod.regular_price[1] || prod.regular_price[3] || prod.regular_price[6]) && (prod.sale_price[1] || prod.sale_price[3] || prod.sale_price[6]))
      //           {
      //             let SB = prod
      //             let validity = Object.keys(SB.regular_price)
      //             // console.log('sandbox vaild',validity[0])
      //             let SB_sale_price = SB.sale_price[validity[0]]
      //             let SB_reg_price =   SB.regular_price[validity[0]]
      //             rp += +SB_reg_price[currency.type]
      //             sp += +SB_sale_price[currency.type]
      //             // console.log(prod.product_type,rp,sp)
      //             availProds.push(prod.product_type);
      //           }else{
      //             rp += +prod.regular_price[currency.type];
      //             sp += +prod.sale_price[currency.type];
      //             availProds.push(prod.product_type);
      //           }

      //         }
      //       }
      //     }
      //   });

      courseData.forEach((itm) => {
        itm.products.forEach((i) => {
          i.product_type.forEach((j) => {
            if (j.course_type != "SANDBOX") {
              sp = sp + parseFloat(j.sale_price[currency.type]);
            } else {
              let validity = Object.keys(j.sale_price)[0];
              sp = sp + parseFloat(j.sale_price[validity][currency.type]);
            }
          });
        });
      });

      // console.log("217", sp);
    }
    let discount = parseFloat(courseData[0].discount_percentage);
    let final_amt = sp - sp * (discount / 100);
    setDiscountAmt(sp * (discount / 100))
    setFinalAmount(final_amt);
    setSalePrice(sp);
  }, [currency, courseData]);

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
            setUserStateId(user.state_id);
            if (user.country_id && user.state_id) {
              axios.get(baseUrl + "/data/states/" + user.country_id).then((response) => {
                setStateList(response.data.data);
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
  // console.log(courseData)
  //   useEffect(() => {
  //     if (selectedCourseTypes.length > 0) {
  //       let rp = 0;
  //       let sp = 0;

  //       if (currency && courseData) {
  //         courseData.products.forEach((prod) => {
  //           if (selectedCourseTypes.includes(prod.product_type)) {
  //             if(prod.product_type === "SANDBOX")
  //             {
  //               if((prod.regular_price[1] || prod.regular_price[3] || prod.regular_price[6] || prod.regular_price[`global`]) && (prod.sale_price[1] || prod.sale_price[3] || prod.sale_price[6] ||  prod.sale_price[`global`]))
  //               {
  //                 let SB = prod
  //                 let validity = Object.keys(SB.regular_price)
  //                 let SB_sale_price = SB.sale_price[validity[0]]
  //                 let SB_reg_price = SB.regular_price[validity[0]]
  //                 rp += +SB_reg_price[currency.type]
  //                 sp += +SB_sale_price[currency.type]
  //               }else{
  //                 rp += +prod.regular_price[currency.type];
  //                 sp += +prod.sale_price[currency.type];
  //               }
  //             }else{
  //               rp += +prod.regular_price[currency.type];
  //               sp += +prod.sale_price[currency.type];
  //             }
  //           }
  //         });
  //       }
  //       setRegularPrice(rp);
  //       if (promoData && enrolledProducts.length == 0 ) {
  //         setFinalAmount(promoData.discounted_price[currency.type]);
  //         setSalePrice(promoData.discounted_price[currency.type]);
  //         setOriginalPrice(sp);
  //       } else {
  //         setSalePrice(sp);
  //         setFinalAmount(sp);
  //       }
  //     }
  //   }, [selectedCourseTypes]);

  const changeCountry = async (e) => {
    const index = e.nativeEvent.target.selectedIndex;
    const name = e.nativeEvent.target[index].text;
    const value = e.nativeEvent.target[index].value;
    setStateList([]);
    setUserStateId("Select State");
    setUserCountryId(value);
    if (value !== "Select Country") {
      const stateResp = await axios.get(baseUrl + "/data/states/" + value);
      setStateList(stateResp.data.data);
    }
  };

  const changeState = async (e) => {
    const index = e.nativeEvent.target.selectedIndex;
    const name = e.nativeEvent.target[index].text;
    const value = e.nativeEvent.target[index].value;
    setUserStateId(value);
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
      return false;
    }

    return data.status === 1 ? true : false;
  };

  const updateOrder = async (orderId, txn_id) => {
    const data = JSON.stringify({
      order_id: orderId,
      txn_id,
      order_status: "completed",
      utm_source: landing_product ? utmData?.utm_source || "(direct)" : utmData?.utm_source || "",
      utm_campaign: landing_product
        ? utmData?.utm_campaign || `landing_page_${courseData.title}`
        : utmData?.utm_campaign || "",
      utm_medium: landing_product ? utmData?.utm_medium || "(direct)" : utmData?.utm_medium || "",
      utm_term: landing_product ? utmData?.utm_term || "" : utmData?.utm_term || "",
      utm_content: utmData?.utm_content || "",
      share_a_sale: landing_product
        ? utmData?.share_a_sale || false
        : utmData?.share_a_sale || false,
    });

    const response = await axios.put(`${baseUrl}/orders`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data && response.data?.data?.order_id ? true : false;
  };
  const validateInput = () => {
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
    /* if (!userPhone) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Handling onClick")
    setPaymentStatus("Processing...");

    const cardElement = elements.getElement(CardElement);

    // HANDLE VALIDATION
    const isValidInputs = validateInput();

    if (!isValidInputs) return;

    // Update Profile
    if (userDefaultBilling) {
      await userUpdateProfile();
    }
    // console.log(discountAmt)

    // if (landing_product) {
    //   Cookie.set("landing", true);
    //   ga.event({
    //     action: "conversion",
    //     params: {
    //       send_to: "AW-1071861065/uoelCJnmi-4YEMmajf8D",
    //     },
    //   });
    // }
    if (paymentMode === "stripe") {
      const response = await axios.post(
        `${baseUrl}/combo/checkout`,
        {
          payment_method: "stripe",
          currency_type: currency.type,
          slug: `${courseData[0].slug}`,
          utm_source: utmData?.utm_source || "",
          utm_campaign: utmData?.utm_campaign || "",
          utm_medium: utmData?.utm_medium || "",
          utm_term: utmData?.utm_term || "",
          utm_content: utmData?.utm_content || "",
          share_a_sale: utmData?.share_a_sale || false,
        },
        {
          headers: {
            Authorization: userData.token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        alertBoxAction({
          type: "ERROR",
          title: "Error",
          msg: response.statusText,
        });
        setPaymentStatus("Retry Payment");
        return;
      }

      if (response.data.status === "error") {
        alertBoxAction({
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
        alertBoxAction({
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
        alertBoxAction({
          type: "ERROR",
          title: "Error",
          msg: error.message,
        });
        setPaymentStatus("Retry Payment");
        return;
      }
      alertBoxAction({
        type: "SUCCESS",
        title: "Success",
        msg: "Payment Successful.",
      });
      setPaymentStatus("Payment Success");
    }

    if (paymentMode === "ccav") {
      await axios
        .post(
          `${baseUrl}/combo/checkout`,
          {
            payment_method: "ccavenue",
            currency_type: currency.type,
            slug: `${courseData[0].slug}`,
            utm_source: utmData?.utm_source || "",
            utm_campaign: utmData?.utm_campaign || "",
            utm_medium: utmData?.utm_medium || "",
            utm_term: utmData?.utm_term || "",
            utm_content: utmData?.utm_content || "",
            share_a_sale: utmData?.share_a_sale || false,
          },
          {
            headers: { Authorization: userData.token },
          }
        )
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
  return (
    !loading?<>
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
            <h2 className="title">Checkout Page</h2>
            <div className="checkout-content">
              <div className="checkout-option">
                <div className="payment-method purchase-detail">
                  <span className="pay-title">Purchase detail&#40;s&#41;</span>
                  {courseData[0].products.map((itm) => {
                    return (
                      <>
                        <div className="cart-items">
                          <div className="item">
                            <figure className="course-img">
                              <a href="#">
                                <img
                                  className="img-full"
                                  src={
                                    process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                                    itm?.featured_img.replace("media/", "")
                                  }
                                  alt={itm.course_name}
                                  title={itm.course_name}
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = "/images/no-image.png";
                                  }}
                                />
                              </a>
                              <div className="title">
                                <a href={`/${itm.course_slug}`}>{itm.course_name}</a>
                              </div>
                            </figure>
                            <div className="item-details">
                              <div className="title">
                                {
                                  <>
                                    {" "}
                                    <a href={`/${itm.course_slug}`}>{itm.course_name}</a>
                                  </>
                                }
                              </div>
                              <ul className="option-group">
                                {itm?.product_type.map((prod) => {
                                  let validity = null;
                                  if (prod.course_type === "SANDBOX") {
                                    validity = Object.keys(prod.regular_price);
                                  }

                                  if (
                                    prod.course_type === "PT" ||
                                    prod.course_type === "OC" ||
                                    prod.course_type == "LAB"
                                  ) {
                                    return (
                                      <li className="option" key={prod.id}>
                                        <div className="option-title">
                                          {prod.course_type === "PT" ? (
                                            <div className="productIconIcon">
                                              <i
                                                className="icon-font-note2"
                                                style={{ margin: "0 5px 0 0" }}
                                              ></i>
                                              Practice Tests
                                            </div>
                                          ) : prod.course_type === "OC" ? (
                                            <div className="productIconIcon">
                                              <i
                                                className="icon-font-play"
                                                style={{ margin: "0 5px 0 0" }}
                                              ></i>
                                              Video Course
                                            </div>
                                          ) : prod.course_type === "LAB" ? (
                                            <div className="productIconIcon">
                                              <i
                                                className="icon-font-bicker"
                                                style={{ margin: "0 5px 0 0" }}
                                              ></i>
                                              Hands-On Labs
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                        {prod.regular_price[currency.type] !== "0" &&
                                        prod.sale_price[currency.type] !== "0" ? (
                                          <div className="option-right">
                                            {enrolledProducts.includes(prod.product_type) ? (
                                              "Purchased"
                                            ) : (
                                              <>
                                                <div className="price-block">
                                                  <del className="old-price">
                                                    {currency?.symbol}
                                                    {parseFloat(
                                                      prod.regular_price?.[currency?.type]
                                                    ).toFixed(2)}
                                                  </del>
                                                  <span
                                                    className="price"
                                                    style={{ minWidth: "70px", textAlign: "right" }}
                                                  >
                                                    {currency?.symbol}
                                                    {parseFloat(
                                                      prod.sale_price?.[currency?.type]
                                                    ).toFixed(2)}
                                                  </span>
                                                </div>
                                              </>
                                            )}
                                          </div>
                                        ) : (
                                          <div className="option-right">
                                            {enrolledProducts.includes(prod.product_type) ? (
                                              "Purchased"
                                            ) : (
                                              <div className="price-block">
                                                <span className="price">Free</span>
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </li>
                                    );
                                  }

                                  if (prod.course_type == "SANDBOX") {
                                    // console.log("prd with sandbx")
                                    return (
                                      <li className="option" key={prod.id}>
                                        <div className="option-title">
                                          <div className="productIconIcon">
                                            <InboxIcon />
                                            {validity ? (
                                              <>
                                                &nbsp;Cloud Sandbox{" "}
                                                {validity[0] == "global" ? (
                                                  <></>
                                                ) : (
                                                  <>
                                                    ({validity[0]} Months{" "}
                                                    {prod.validity > 1 ? "s" : ""})
                                                  </>
                                                )}{" "}
                                              </>
                                            ) : (
                                              <>&nbsp;Sandbox ({prod.validity} Months)</>
                                            )}
                                          </div>
                                        </div>
                                        <div className="option-right">
                                          {enrolledProducts.includes(prod.product_type) ? (
                                            "Purchased"
                                          ) : prod.regular_price[currency.type] > 0 ||
                                            prod.regular_price[validity[0]][currency.type] > 0 ? (
                                            <>
                                              <div className="price-block">
                                                <del className="old-price">
                                                  {currency?.symbol}
                                                  {/* {prod.regular_price?.[currency?.type]} */}
                                                  {validity
                                                    ? parseFloat(
                                                        prod.regular_price[validity[0]][
                                                          currency.type
                                                        ]
                                                      ).toFixed(2)
                                                    : parseFloat(
                                                        prod.regular_price?.[currency?.type]
                                                      ).toFixed(2)}
                                                </del>
                                                <span
                                                  className="price"
                                                  style={{ minWidth: "70px", textAlign: "right" }}
                                                >
                                                  {currency?.symbol}
                                                  {/* {prod.sale_price?.[currency?.type]} */}
                                                  {validity
                                                    ? parseFloat(
                                                        prod.sale_price[validity[0]][currency.type]
                                                      ).toFixed(2)
                                                    : parseFloat(
                                                        prod.sale_price?.[currency?.type]
                                                      ).toFixed(2)}
                                                </span>
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              <div className="price-block">
                                                <span className="price">Free</span>
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      </li>
                                    );
                                  }

                                  if (
                                    queryprod.length == 1 &&
                                    prod.product_type.includes("SANDBOX") &&
                                    queryprod.includes(prod.product_type)
                                  ) {
                                    // console.log("standalone sandbox")
                                    return (
                                      <li className="option" key={prod.id}>
                                        <div className="option-title">
                                          <div
                                            className="productIconIcon"
                                            style={{ marginLeft: "6px" }}
                                          >
                                            <InboxIcon />
                                            &nbsp;Sandbox ({prod.validity}Months)
                                          </div>
                                        </div>
                                        <div className="option-right">
                                          {enrolledProducts.includes(prod.product_type) ? (
                                            "Purchased"
                                          ) : prod.regular_price[currency.type] > 0 ||
                                            prod.regular_price[validity[0]][currency.type] > 0 ? (
                                            <>
                                              <div className="price-block">
                                                <del className="old-price">
                                                  {currency?.symbol}
                                                  {/* {prod.regular_price?.[currency?.type]} */}
                                                  {validity
                                                    ? prod.regular_price[validity[0]][currency.type]
                                                    : prod.regular_price?.[currency?.type]}
                                                </del>
                                                <span className="price">
                                                  {currency?.symbol}
                                                  {/* {prod.sale_price?.[currency?.type]} */}
                                                  {validity
                                                    ? prod.sale_price[validity[0]][currency.type]
                                                    : prod.sale_price?.[currency?.type]}
                                                </span>
                                              </div>

                                              {/* {selectedCourseTypes.includes(prod.product_type) ? (
                                              <div
                                                className="icon"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  if (selectedCourseTypes.length > 1) {
                                                    setSelectedCourseTypes((course) =>
                                                      course.filter(
                                                        (Itm) => Itm !== prod.product_type
                                                      )
                                                    );
                                                    setDiscountAmt(0);
                                                    setUserCoupon("");
                                                    setFinalAmount(salePrice);
                                                  }
                                                }}
                                              >
                                                <i className="icon delete-ico icon-font-delete"></i>
                                              </div>
                                            ) : (
                                              <div
                                                className="icon"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  if (
                                                    !selectedCourseTypes.includes(prod.product_type)
                                                  ) {
                                                    setSelectedCourseTypes([
                                                      ...selectedCourseTypes,
                                                      prod.product_type,
                                                    ]);
                                                    setDiscountAmt(0);
                                                    setUserCoupon("");
                                                    setFinalAmount(salePrice);
                                                  }
                                                }}
                                              >
                                                <i className="icon add-ico icon-font-cart"></i>
                                              </div>
                                            )} */}
                                            </>
                                          ) : (
                                            <>
                                              <div className="price-block">
                                                <span className="price">Free</span>
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      </li>
                                    );
                                  }
                                })}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>

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
                          className="msg_stripe"
                          style={isBreakpoint ? { marginTop: "15px" } : { marginTop: "0px" }}
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
                        <div className="input-box" style={{ maxWidth: "100%" }}>
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
                      </div>
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
                        {currency && currency.symbol == "$" ? "US" : ""}
                        {currency ? currency.symbol : ""}
                        {Number(salePrice).toFixed(2)}
                      </span>
                    </div>
                    {!landing_product && (
                      <div className="price-block hr">
                        <span className="price-subtitle">
                          Discount {courseData ? <>{courseData[0].discount_percentage}%OFF</> : ""}
                        </span>
                        <span className="price-discount">
                          -{currency && currency.symbol == "$" ? "US" : ""}
                          {currency ? currency.symbol : ""}
                          {discountAmt.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="saving-block" style={courseData[0].combo_type == 0 ? {justifyContent:"space-between"} : {justifyContent:"flex-end"}}>
                    {/* {!landing_product && (
                      <div className="saving-batch">
                        <i className="icon saving-icon icon-font-saving"></i>
                        <span className="saving-text">
                          Saving{" "}
                          <strong>
                            {currency ? currency.symbol : ""}
                            {promoData && enrolledProducts.length == 0
                              ? (
                                  promoData.regular_price[currency.type] -
                                  promoData.discounted_price[currency.type]
                                ).toFixed(2)
                              : (regularPrice - salePrice + discountAmt).toFixed(2)}
                          </strong>
                        </span>
                      </div>
                    )} */}
                    {courseData[0].combo_type == 0 && (
                      <>
                        <span style={{display:"flex",alignItems:"center"}}>
                        <TimerIcon style={{fontSize:"18px",color:'#F06421'}} className="timer_icons_combo"/>
                        <span>
                         
                          &nbsp;<span id="mytimer-hours-checkout" className="timer_offer_combo"></span>&nbsp;
                          <span id="mytimer-min-checkout" className="timer_offer_combo"></span> &nbsp;
                          <span id="mytimer-sec-checkout" className="timer_offer_combo"></span>
                     
                      </span>
                        </span>
                      </>
                    )}
                    <span className="saving-amt">
                      {currency && currency.symbol == "$" ? "US" : ""}
                      {currency ? currency.symbol : ""}
                      {Number(finalAmount).toFixed(2)}
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
                </div>
                {/* black friday removal  */}
                {/* for crazy deal users with purchased any one product can buy other product without crazy deal offer */}

                <div className="summary-content-ic">
                  <div>
                    <p>
                      Upon clicking 'Pay Now', you will be charged the above amount using the
                      payment method selected.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    </> :<></>
  );
};

export const getServerSideProps = async (context) => {
  const { slug } = context.query;
  const cookie = context.req.headers.cookie;
  const decoded = decodeURIComponent(cookie);
  const split1 = decoded.split("userData=")[1];
  let userId = null;
  let userToken = null;

  const seoHomePageData = {
    seoPageType: "combo",
    title: "Checkout | Whizlabs",
    metaTags: [
      { name: "facebook-domain-verification", httpEquiv: "", property: "", content: "twh401qzi7r7o3n227q4sg3hghbpzh" },
      { name: "", httpEquiv: "cache-control", property: "", content: "no-cache"},
      { name: "", httpEquiv: "expires", property: "", content: "0"},
      { name: "", httpEquiv: "pragma", property: "", conten: "no-cache"},
    ],
  };

  if (split1) {
    const split2 = split1.split(";")[0];
    const parsed = split2 ? JSON.parse(split2) : null;
    userId = parsed ? parsed.data.user_id : null;
    userToken = parsed ? parsed.data.token : null;
  }

  if (!userToken) {
    return {
      redirect: {
        destination: `/cart`,
        permanent: false,
      },
    };
  }

  let courseData = null;

  let comboData = await axios.get(`${baseUrl}/combo/getproduct?slug=${slug}`);
  if (comboData && comboData.data) {
    courseData = comboData.data.combos_data;

    if(courseData?.length == 0){
      return {
        redirect:{
          destination:'/',
          permanent:false
        }
       }
    }
    if(courseData && courseData[0].start_date && courseData[0].end_date && courseData[0].combo_type == 0){
      let value = courseData[0]
      let date_now_utc = new Date(new Date().toISOString()).getTime()
            let start_date_utc = new Date( new Date(value.start_date).toISOString()).getTime()
            let end_date_utc = new Date( new Date(value.end_date).toISOString()).getTime()
            if(start_date_utc > date_now_utc || end_date_utc < date_now_utc){
                //stop timer()
               return {
                redirect:{
                  destination:'/',
                  permanent:false
                }
               }
            }
    }
  } else {
    return {
      redirect: {
        destination: `/cart`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      slug,
      courseData,
      seoHomePageData,
    },
  };
};

const mapStateToProps = (state) => {
  return {
    userData: state.authData?.userData?.data,
    utmData: state.utmData,
    currencyData: state.ipDetails.currency_detail,
    subscription: state.userProfileData.userSubscriptionData,
    clientStatus: state.client.client,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    alertBoxAction: (data) => dispatch(alertBox(data)),
    removeSlugAction:()=>dispatch(removeComboSlug())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleCheckoutWrapper);
