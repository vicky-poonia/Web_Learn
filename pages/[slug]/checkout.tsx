import { connect } from "react-redux";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { alertBox } from "redux/AlertBox/alert-actions";
import Head from "next/head";
import Cookie from "js-cookie";
import * as ga from "../../lib/ga";
import * as fbq from "../../lib/fpixel";
import { loadStripe } from "@stripe/stripe-js";
import * as CryptoJS from "crypto-js";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import InboxIcon from '@material-ui/icons/Inbox';
import {gcp_course_id} from '../../lib/Library_lib'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

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
  promoData: promoDataResp,
  // availed_freebies,
  subscription,
  clientStatus,
  landing_product,
  seoHomePageData
}) => {
  const router = useRouter();
  const [stipePromise] = useState(() => loadStripe(process.env.NEXT_PUBLIC_STRIPE_PKEY!));

  const slug = router.query.slug;
  const crazyDealData = promoDataResp.data.find((Itm) => Itm.course_slug === slug);
  return (
    <Elements stripe={stipePromise}>
      <SingleCheckout
        userData={userData}
        alertBoxAction={alertBoxAction}
        utmData={utmData}
        courseData={courseData}
        currencyData={currencyData}
        enrolledProducts={enrolledProducts}
        promoData={crazyDealData}
        subscription = {subscription}
        clientStatus = {clientStatus}
        landing_product={landing_product}
        seoHomePageData={seoHomePageData}
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
  seoHomePageData,
}) => {
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
  const [queryprod,setQueryProd] = useState([])
  const [full_course,setFullCourse] = useState(false)
  const [showFreebies,setshowFreebies] = useState(false)

  useEffect(()=>{
    const queryProds = (router.query.prod as string).split(":");
    let a = []
    queryProds.forEach((itm)=>{
      a.push(itm.toUpperCase())
    })
    setQueryProd(a)
    getFreebies()
  },[])

  const getFreebies = async()=>{
    let freebies_sub = await axios.get(`${baseUrl}/orders/freebies/subscription/bf2023`,{
      headers: {
        Authorization: userData.token,
      },
    })
    if(freebies_sub.data){
      setshowFreebies(freebies_sub.data.showFreebies == true ? true : false)
    }
  }

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
  
    if (currency && courseData) {
      
      courseData.products.forEach((prod) => {
        if (
          prod.product_type === "PT" ||
          prod.product_type === "OC" ||
          prod.product_type === "LAB" &&
          prod.product_type !== "SANDBOX"
        ) {
          if (router.query.prod) {
            const queryProds = (router.query.prod as string).split(":");
            if (queryProds.includes(prod.product_type.toLowerCase()) && prod.is_comingsoon !== "1" && prod.is_comingsoon !== "2") {
              rp += +prod.regular_price[currency.type];
              sp += +prod.sale_price[currency.type];
              // console.log(prod.product_type,rp,sp)
              availProds.push(prod.product_type);
            }
          } else {
            rp += +prod.regular_price[currency.type];
            sp += +prod.sale_price[currency.type];
            // console.log(prod.product_type,rp,sp)
            availProds.push(prod.product_type);
          }
        }

        if (prod.product_type.includes("SANDBOX")) {
          // console.log(prod)
          if (router.query.prod) {
            const queryProds = (router.query.prod as string).split(":");
            if (queryProds.includes(prod.product_type.toLowerCase())) {
              if((prod.regular_price[1] || prod.regular_price[3] || prod.regular_price[6]) && (prod.sale_price[1] || prod.sale_price[3] || prod.sale_price[6]))
              {
                let SB = prod
                let validity = Object.keys(SB.regular_price)
                // console.log('sandbox vaild',validity[0])
                let SB_sale_price = SB.sale_price[validity[0]]
                let SB_reg_price =   SB.regular_price[validity[0]]
                rp += +SB_reg_price[currency.type]
                sp += +SB_sale_price[currency.type]
                // console.log(prod.product_type,rp,sp)
                availProds.push(prod.product_type);
              }else{
                rp += +prod.regular_price[currency.type];
                sp += +prod.sale_price[currency.type];
                availProds.push(prod.product_type);
              }

            }
          }
        }
      });
    }

    setRegularPrice(rp);
    if (promoData && enrolledProducts.length == 0) {
      setFinalAmount(promoData.discounted_price[currency.type]);
      setSalePrice(promoData.discounted_price[currency.type]);
      setOriginalPrice(sp);
    } else {
      setFinalAmount(sp);
      setSalePrice(sp);
    }
    setSelectedCourseTypes(availProds);
  }, [currency, courseData,clientStatus]);



  useEffect(()=>{
   if(selectedCourseTypes.length == 1 && selectedCourseTypes[0].includes('SANDBOX-')){
    setFullCourse(true)
   }else{
    let courseArr = courseData.products.filter((itm)=>itm.product_type != "FT")
    if(courseArr.length == selectedCourseTypes.length){
      setFullCourse(true)
    }else{
      setFullCourse(false)
    }
   }
  },[selectedCourseTypes])
  
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
  useEffect(() => {
    if (selectedCourseTypes.length > 0) {
      let rp = 0;
      let sp = 0;

      if (currency && courseData) {
        courseData.products.forEach((prod) => {
          if (selectedCourseTypes.includes(prod.product_type)) {
            if(prod.product_type === "SANDBOX")
            {
              if((prod.regular_price[1] || prod.regular_price[3] || prod.regular_price[6] || prod.regular_price[`global`]) && (prod.sale_price[1] || prod.sale_price[3] || prod.sale_price[6] ||  prod.sale_price[`global`]))
              {
                let SB = prod
                let validity = Object.keys(SB.regular_price)
                let SB_sale_price = SB.sale_price[validity[0]]
                let SB_reg_price = SB.regular_price[validity[0]]
                rp += +SB_reg_price[currency.type]
                sp += +SB_sale_price[currency.type]
              }else{
                rp += +prod.regular_price[currency.type];
                sp += +prod.sale_price[currency.type];
              }
            }else{
              rp += +prod.regular_price[currency.type];
              sp += +prod.sale_price[currency.type];
            }
          }
        });
      }
      setRegularPrice(rp);
      if (promoData && enrolledProducts.length == 0 ) {
        setFinalAmount(promoData.discounted_price[currency.type]);
        setSalePrice(promoData.discounted_price[currency.type]);
        setOriginalPrice(sp);
      } else {
        setSalePrice(sp);
        setFinalAmount(sp);
      }
    }
  }, [selectedCourseTypes]);

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
      utm_source: landing_product ? utmData?.utm_source || "(direct)" :utmData?.utm_source || "",
      utm_campaign: landing_product? utmData?.utm_campaign ||`landing_page_${courseData.title}`:utmData?.utm_campaign || "",
      utm_medium: landing_product? utmData?.utm_medium || "(direct)": utmData?.utm_medium || "",
      utm_term: landing_product? utmData?.utm_term || "": utmData?.utm_term || "",
      utm_content: utmData?.utm_content || "",
      share_a_sale:landing_product? utmData?.share_a_sale || false: utmData?.share_a_sale || false,
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

    const formData = {
      course_id: landing_product?courseData.course_id:courseData.id,
      products: selectedCourseTypes,
      payment_method: paymentMode === "ccav" ? "ccavenue" : "stripe",
      currency_type: currency.type,
      coupon_code: userCoupon.length > 0 ? userCoupon : null,
      discount_amt: promoData && enrolledProducts.length == 0
        ? originalPrice - promoData.discounted_price[currency.type]
        :discountAmt,
      final_amount: finalAmount,
      promo_id: promoData && enrolledProducts.length == 0 ? promoData.id : null,
      utm_source: landing_product ? utmData?.utm_source || "(direct)" :utmData?.utm_source || "",
      utm_campaign: landing_product? utmData?.utm_campaign ||`landing_page_${courseData.title}`:utmData?.utm_campaign || "",
      utm_medium: landing_product? utmData?.utm_medium || "(direct)": utmData?.utm_medium || "",
      utm_term: landing_product? utmData?.utm_term || "": utmData?.utm_term || "",
      utm_content: utmData?.utm_content || "",
      share_a_sale:landing_product? utmData?.share_a_sale || false: utmData?.share_a_sale || false,
      landing_product:landing_product,
      productsInfo:landing_product ? courseData.products : []
    };
    // console.log(formData)

    const encFormData = CryptoJS.AES.encrypt(
      JSON.stringify(formData),
      process.env.NEXT_PUBLIC_SECRET_KEY
    ).toString();

    if(landing_product){
      Cookie.set('landing',true)
      ga.event({
        action: "conversion",
        params: {
          'send_to': 'AW-1071861065/uoelCJnmi-4YEMmajf8D',
        },
      });
    }

    if(clientStatus && gcp_course_id.includes(courseData.id) && userCoupon == "gcpcodeblue100"){
      const response = await axios.post(
        `${baseUrl}/cart/client`,
        {
          data: encFormData,
        },
        {
          headers: {
            Authorization: userData.token,
            "Content-Type": "application/json",
          },
        }
      );
     if(response.data.status == "success"){
      Cookie.set("lastOrderId", response.data.order_id);
      window.open("/checkout/redirect/success", "_self");
     }
    }else{
      if (paymentMode === "stripe") {
        const response = await axios.post(
          `${baseUrl}/cart/checkout/single`,
          {
            data: encFormData,
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
        axios
          .post(
            `${baseUrl}/cart/checkout/single`,
            {
              data: encFormData,
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
    }
 
  };

  const handleCoupon = async (e) => {
    e.preventDefault();

    if (userCoupon.length === 0) return;

    setDiscountInvalid(false);

    setDiscountLoading(true);
    if(userCoupon == 'gcpcodeblue100' && clientStatus != true  ){
      setDiscountAmt(0);
      setUserCoupon("");
      setFinalAmount(salePrice);
      setDiscountLoading(false);
      return
    }
    const response = await axios.post(`${baseUrl}/cart/coupon/verify`, {
      user_id: userData.user_id,
      coupon_code: userCoupon,
      course_id: courseData.id,
      currency_type: currency.type,
      course_types: selectedCourseTypes,
    });

    if (response.data.status === "error") {
      setDiscountInvalid(true);
      setDiscountLoading(false);
      setUserCoupon("");
      return;
    }

    const couponData = response.data.data;
    // Storing data to Redux state & DB also.
    if (couponData?.discounted_price && userCoupon) {
      if (couponData?.total_discount == 0) {
        setDiscountInvalid(true);
        setDiscountLoading(false);
        setUserCoupon("");
        return;
      }
    }
    setDiscountAmt(parseFloat(couponData.total_discount));
    setFinalAmount(finalAmount - parseFloat(couponData.total_discount));
    setDiscountLoading(false);
  };
  let obj = [{title:"Azure Cloud Sandbox",images:"azure-cloud-sandbox.webp",pageId:18,s_id:2476},
  {title:"AWS Cloud Sandbox",images:"aws-sandbox.webp",pageId:15,s_id:2475},
  {title:"Goolge Cloud Sandbox",images:"gcp-sandbox.webp",pageId:19,s_id:2479},
  {title:"Power-Bi Cloud Sandbox",images:"power-bi-sandbox.webp",pageId:41,s_id:2483}            
] 

  let course_status = obj.findIndex(x => x.pageId === courseData.course_page_id && x.s_id != courseData.id)
  let is_premium_plus_availble = false;
  if(course_status != -1)
  {
    subscription?.active_plans.forEach((itm)=>{
      let plan = itm.plan
      if(plan.is_active)
      {
        if(plan.is_sandbox_access && plan.is_unlimited_access_lab)
        {
          is_premium_plus_availble = true
        }
      }
    })
  }
  if(courseData)
  {
    //from backend sandbox came as first .. we need to show sandbox after PT OC LAB .. so sandbox is pushes to end of list
    if(courseData.products[0].product_type === "SANDBOX")
    {
      let sb = courseData.products[0];
      courseData.products.splice(0,1);
      courseData.products.push(sb)
    }
  }

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
            <h2 className="title">Checkout Page</h2>
            <div className="checkout-content">
              <div className="checkout-option">
                <div className="payment-method purchase-detail">
                  <span className="pay-title">Purchase detail&#40;s&#41;</span>

                  <div className="cart-items">
                    <div className="item">
                      <figure className="course-img">
                        <a href="#">
                          <img
                            className="img-full"
                            src={
                             !landing_product? process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                             courseData.seo_details?.featured_image.replace("media/", ""):
                             process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                             courseData.seo_data?.featured_image.replace("media/", "")
                            }
                            alt={!landing_product?courseData.seo_details?.page_title:courseData.title}
                            title={!landing_product?courseData.seo_details?.page_title:courseData.title}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = "/images/no-image.png";
                            }}
                          />
                        </a>
                        <div className="title">
                          <a href={`/${courseData?.seo_details?.slug}`}>
                            {courseData?.seo_details?.title}
                          </a>
                        </div>
                      </figure>
                      <div className="item-details">
                        <div className="title">
                         {
                          !landing_product ? <a href={`/${courseData?.seo_details?.slug}`}>
                          {courseData?.seo_details?.title}
                        </a>:<> <a href={`/${courseData?.course_slug?.slug}`}>
                           {courseData?.title}
                          </a></>
                         }
                        </div>
                        <ul className="option-group">
                          {promoData  && enrolledProducts.length == 0 ? (
                            <li className="option">
                              <div className="crazy-offer">
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: `<strong>Crazy Deal:</strong> ` + promoData.banner_top,
                                  }}
                                />
                              </div>
                              <div
                                className="option-right"
                                style={{
                                  maxWidth: promoData && "80px",
                                }}
                              >
                                <div className="price-block">
                                  <span className="price">
                                    {currency.symbol}
                                    {promoData.discounted_price[currency.type]}
                                  </span>
                                </div>
                              </div>
                            </li>
                          ) : (
                            courseData?.products.map((prod) => {
                              let validity = null;
                              if(prod.product_type === "SANDBOX")
                              {
                                validity = Object.keys(prod.regular_price)
                              }
                            
                              if (
                                (prod.product_type === "PT" ||
                                prod.product_type === "OC" ||
                                (prod.product_type == "LAB" && (!clientStatus || !gcp_course_id.includes(courseData.id)))  
                                )
                                && (prod.is_comingsoon !== "1" && prod.is_comingsoon !== "2") 
                              ) {
                                return (
                                  <li className="option" key={prod.id}>
                                    <div className="option-title">
                                      {prod.product_type === "PT"
                                        ? <div className="productIconIcon" ><i className ="icon-font-note2" style={{margin:"0 5px 0 0"}}></i>Practice Tests</div> 
                                        : prod.product_type === "OC"
                                        ? <div className="productIconIcon" ><i className ="icon-font-play" style={{margin:"0 5px 0 0"}}></i>Video Course</div>
                                        : prod.product_type === "LAB"
                                        ? <div className="productIconIcon">
                                          <i className ="icon-font-bicker" style={{margin:"0 5px 0 0"}}></i>Hands-On Labs</div>
                                        : ""}
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
                                                {prod.regular_price?.[currency?.type]}
                                              </del>
                                              <span className="price">
                                                {currency?.symbol}
                                                {prod.sale_price?.[currency?.type]}
                                              </span>
                                            </div>
                                            {selectedCourseTypes.includes(prod.product_type) ? (
                                              <div
                                                className="icon"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  if (selectedCourseTypes.length > 1 && (!clientStatus || !gcp_course_id.includes(courseData.id)) ) {
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
                                               {
                                                !landing_product &&  <i className="icon delete-ico icon-font-delete"></i>
                                               }
                                              </div>
                                            ) : (
                                              <div
                                                className="icon"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  if (
                                                    !selectedCourseTypes.includes(prod.product_type) && (!clientStatus || !gcp_course_id.includes(courseData.id))
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
                                            )}
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

                              if (prod.product_type == "SANDBOX" && !queryprod.includes("sandbox-1") && !queryprod.includes("sandbox-3")&& !queryprod.includes("sandbox-6")  && (prod.is_comingsoon !== "1" && prod.is_comingsoon !== "2") && (!clientStatus || !gcp_course_id.includes(courseData.id)) ) {
                                // console.log("prd with sandbx")
                                return (
                                  <li className="option" key={prod.id}>
                                    <div className="option-title">
                                    <div className="productIconIcon" >
                                      <InboxIcon/>
                                      {validity?<>&nbsp;Cloud Sandbox {validity[0] == "global" ?<></>:<>({validity[0]} Months {prod.validity > 1 ? "s" : ""})</>} </>:<>&nbsp;Sandbox ({prod.validity}  Months)</>}
                                     </div> 
                                    </div>
                                    <div className="option-right">
                                      {enrolledProducts.includes(prod.product_type) ? (
                                        "Purchased"
                                      ) : (prod.regular_price[currency.type] > 0 || prod.regular_price[validity[0]][currency.type] > 0) ? 
                                      <>
                                        <div className="price-block">
                                          <del className="old-price">
                                            {currency?.symbol}
                                            {/* {prod.regular_price?.[currency?.type]} */}
                                            {validity ? prod.regular_price[validity[0]][currency.type] : prod.regular_price?.[currency?.type]}
                                          </del>
                                          <span className="price">
                                            {currency?.symbol}
                                            {/* {prod.sale_price?.[currency?.type]} */}
                                            {validity ? prod.sale_price[validity[0]][currency.type] : prod.sale_price?.[currency?.type]}
                                          </span>
                                        </div>
                                        
                                            {selectedCourseTypes.includes(prod.product_type) ? (
                                              <div
                                                className="icon"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  if (selectedCourseTypes.length > 1 && (!clientStatus || !gcp_course_id.includes(courseData.id))) {
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
                                              {
                                                !landing_product &&   <i className="icon delete-ico icon-font-delete"></i>
                                              }
                                              </div>
                                            ) : (
                                              <div
                                                className="icon"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  if (
                                                    !selectedCourseTypes.includes(prod.product_type) && (!clientStatus || !gcp_course_id.includes(courseData.id))
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
                                            )}
                                      </>:<>
                                        <div className="price-block">
                                            <span className="price">Free</span>
                                          </div>
                                      </>}
                                    </div>
                                  </li>
                                );
                              }
 
                              if (queryprod.length == 1 && prod.product_type.includes("SANDBOX") && queryprod.includes(prod.product_type)) {
                                // console.log("standalone sandbox")
                                return (
                                  <li className="option" key={prod.id}>
                                    <div className="option-title">
                                    <div className="productIconIcon" style={{marginLeft:"6px"}} >
                                      <InboxIcon/>
                                      &nbsp;Sandbox ({prod.validity}Months)
                                     </div> 
                                    </div>
                                    <div className="option-right">
                                      {enrolledProducts.includes(prod.product_type) ? (
                                        "Purchased"
                                      ) : (prod.regular_price[currency.type] > 0 || prod.regular_price[validity[0]][currency.type] > 0) ? 
                                      <>
                                        <div className="price-block">
                                          <del className="old-price">
                                            {currency?.symbol}
                                            {/* {prod.regular_price?.[currency?.type]} */}
                                            {validity ? prod.regular_price[validity[0]][currency.type] : prod.regular_price?.[currency?.type]}
                                          </del>
                                          <span className="price">
                                            {currency?.symbol}
                                            {/* {prod.sale_price?.[currency?.type]} */}
                                            {validity ? prod.sale_price[validity[0]][currency.type] : prod.sale_price?.[currency?.type]}
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
                                      </>:<>
                                        <div className="price-block">
                                            <span className="price">Free</span>
                                          </div>
                                      </>}
                                    </div>
                                  </li>
                                );
                              }
                              
                            })
                         
                          )}
                          {/* if the user purchasing for first time and if the course has whizcard show whizcard as free */}
                          {!promoData &&  courseData.whizcard != '' && courseData.whizcard !=null && enrolledProducts.length == 0 &&
                            <>
                               <li className="option">
                                  <div className="option-title">
                                    <div className="productIconIcon">
                                      <PictureAsPdfIcon/>&nbsp;Whizcard
                                    </div>
                                  </div>
                                  <div className="option-right">
                                    <div className="price-block">
                                        <span className="price" style={{marginRight:"24px"}}>
                                          FREE
                                        </span>
                                    </div>
                                  </div>
                                </li> 
                            </>
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* black friday freebies info */}
                {
                  ( !full_course && showFreebies && <>
                    <div className="freebies-cart">
                      <div className="item">
                        <div className="item-details small-info" style={{ textAlign: "center", padding: "10px" }}>
                          <InfoOutlinedIcon /><br></br>
                          Buy all course types and get<br />
                          <strong> 7 Days Free Premium plus Subscription plan</strong>
                        </div>
                      </div>
                    </div>
                  </>)
                }
                                   {/* selected_sandbox && (((!availed_freebies.aws && selected_sandbox.pageId == 15)||(!availed_freebies.gcp && selected_sandbox.pageId ==19)
                  ||(!availed_freebies.azure && selected_sandbox.pageId == 18 ) || (!availed_freebies.powerbi && selected_sandbox.pageId == 41)) 
                  && (courseData?.id != 2475 && courseData?.id != 2476 && courseData?.id != 2479 && courseData?.id != 2483)
                   )&& */}
                {
                  full_course&& showFreebies &&
                  <div className="payment-method purchase-detail">
                  <span className="pay-title">Freebies Included</span>
                  <div className="cart-items">
                    <div className="item">
                      <div className="item-details">
                        <div className="title"><a href="/pricing">Subscription</a></div>
                        <ul className="option-group">
                          <li className="option">
                            <div className="option-title" style={{minWidth:"200px"}}>Premium Plus (7-Days)</div>
                            <div className="option-right">
                              <div className="price-block">
                                <span className="price">FREE</span>
                              </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                }
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
                        {currency && currency.symbol == "$" ? "US":""}
                        {currency ? currency.symbol : ""}
                        {Number(salePrice).toFixed(2)}
                      </span>
                    </div>
                    {
                      !landing_product &&                     <div className="price-block hr">
                      <span className="price-subtitle">Discount</span>
                      <span className="price-discount">
                        -
                        {currency && currency.symbol == "$" ? "US":""}
                        {currency ? currency.symbol : ""}
                        {discountAmt.toFixed(2)}
                      </span>
                    </div> 
                    }               
                  </div>
                  <div className="saving-block" style={landing_product?{justifyContent:"flex-end"}:{}}>
                    {
                      !landing_product && <div className="saving-batch">
                      <i className="icon saving-icon icon-font-saving"></i>
                      <span className="saving-text">
                        Saving{" "}
                        <strong>
                          {currency ? currency.symbol : ""}
                             {promoData && enrolledProducts.length == 0
                            ? (promoData.regular_price[currency.type] - promoData.discounted_price[currency.type]).toFixed(2)
                            : (regularPrice - salePrice + discountAmt).toFixed(2)}
                        </strong>
                      </span>
                    </div>
                    }
                    <span className="saving-amt">
                      {currency && currency.symbol == "$" ? "US":""}
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
                {promoData && enrolledProducts.length == 0 ? <></>:<>
                  {
                    !courseData.isCampaign && !landing_product && <div className="promo-code">
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
                            setFinalAmount(salePrice);
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
                    {discountAmt > 0 && (
                      <span
                        style={{
                          textAlign: "left",
                          width: "100%",
                          display: "block",
                          margin: "10px 0 0",
                          fontSize: "100%",
                          color: "#009688",
                        }}
                      >
                        Coupon applied
                      </span>
                    )}
                  </div>
                  }
                </>} 

                <div className="summary-content-ic">
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
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { slug, prod,landing,landing_slug } = context.query;
  let landing_product = landing ? JSON.parse(landing) : false

  if (!prod) {
    return {
      redirect: {
        destination: `/${slug}`,
        permanent: false,
      },
    };
  }

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
  const split1 = decoded.split("userData=")[1];
  let userId = null;
  let userToken = null;

  if (split1) {
    const split2 = split1.split(";")[0];
    const parsed = split2 ? JSON.parse(split2) : null;
    userId = parsed ? parsed.data.user_id : null;
    userToken = parsed ? parsed.data.token : null;
  }

  if (!userToken) {
    return {
      redirect: {
        destination: `/${slug}`,
        permanent: false,
      },
    };
  }
  // const {
  //   data: { data: courseData },
  //   status,
  // } = 
  let course_data = null
  let courseData = null
  if(!landing_product){
    course_data = await axios.get(`${baseUrl}/courses?slug=${slug}`);
    courseData = course_data.data.data
   let status = course_data.status

  if (status === 500) {
    return {
      redirect: {
        destination: `/${slug}`,
        permanent: false,
      },
    };
  }
  }else{
    course_data  = await axios.get(`${baseUrl}/courses/landing?slug=${landing_slug}`)
    courseData = course_data.data.landingData
    let sandbox_product_index = courseData.products.findIndex((itm)=> itm.product_type == "SANDBOX")
    let sandbox_product = courseData.products.find(itm => itm.product_type == "SANDBOX")
    let new_regularPrice = {
      'global' : sandbox_product?.regular_price
    }
    let new_saleprice = {
      'global':sandbox_product?.sale_price
    }
    courseData.products[sandbox_product_index].sale_price = new_saleprice
    courseData.products[sandbox_product_index].regular_price = new_regularPrice
    // console.log(courseData.products)
  }


  const {
    data: { data: enrollData },
  } = await axios.post(
    baseUrl + "/users/user-course-enroll-status",
    {
      course_id: landing_product?courseData.course_id:courseData.id,
    },
    { headers: { Authorization: userToken } }
  );

  const courseProds = [];
  courseData.products.forEach((itm) => {
    if (
      itm.product_type === "PT" ||
      itm.product_type === "OC" ||
      itm.product_type === "LAB" ||
      itm.product_type.includes("SANDBOX")
    ) {
      courseProds.push(itm.product_type);
    }
  });

  /***
   * Checking three different scenarios with course enrollments for redirection:
   * 1. if course has both PT && OC and user is enrolled in both
   * 2. if course has only PT and user is enrolled in PT
   * 3. if course has only OC and user is enrolled in OC
   */
  // it the course product typoe and enrolled courses list product type matches we redirect to course page itself
  // this is taken care by variable valid ,,, if valid is true after foreach loop all courses are already bought so redirect to course page itself
  let sandboxProduct;
  
  // if (enrollData.products) {
  //   if (courseProds.includes("PT") && courseProds.includes("OC") && courseProds.includes("LAB") && courseProds.includes("SANDBOX")) {
  //     if (
  //       enrollData.products.includes("PT") &&
  //       enrollData.products.includes("OC") &&
  //       enrollData.products.includes("LAB") &&
  //       enrollData.products.includes("SANDBOX")
  //     ) {
  //       // redirect
  //       return {
  //         redirect: {
  //           destination: `/${slug}`,
  //           permanent: false,
  //         },
  //       };
  //     }
  //   } else if (courseProds.includes("PT")) {
  //     if (enrollData.products.includes("PT")) {
  //       // redirect
  //       console.log('redirect happend here')
  //       return {
  //         redirect: {
  //           destination: `/${slug}`,
  //           permanent: false,
  //         },
  //       };
  //     }
  //   } else if (courseProds.includes("OC")) {
  //     if (enrollData.products.includes("OC")) {
  //       // redirect
  //       return {
  //         redirect: {
  //           destination: `/${slug}`,
  //           permanent: false,
  //         },
  //       };
  //     }
  //   } else if (courseProds.includes("LAB")) {
  //     if (enrollData.products.includes("LAB")) {
  //       // redirect
  //       return {
  //         redirect: {
  //           destination: `/${slug}`,
  //           permanent: false,
  //         },
  //       };
  //     }
  //   }

    // CHECK SANDBOX
    if (enrollData.products.includes("SANDBOX")) {
      if(enrollData.validity){
        sandboxProduct = `SANDBOX-${enrollData.validity}`;
      }
    }
  

  let valid = true
  if(enrollData.products){
    courseProds.forEach((itm)=>{
      if(!enrollData.products.includes(itm)){
        valid = false
      }
    })
  }

  if (valid) {
    return {
      redirect: {
        destination: `/${slug}`,
        permanent: false,
      },
    };
  }



  if (sandboxProduct === prod.toUpperCase()) {
    // redirect
    return {
      redirect: {
        destination: `/${slug}`,
        permanent: false,
      },
    };
  }
  //for black friday included freebies checking weather he has already availed freebies
  // const {data} = await axios.get(`${baseUrl}/orders/freebies/track/?user_id=${userId}`)
  // let availed_freebies = data.obj

  return {
    props: {
      courseData,
      slug,
      enrolledProducts: enrollData.products,
      landing_product,
      seoHomePageData,
      // availed_freebies
    },
  };
};

const mapStateToProps = (state) => {
  return {
    userData: state.authData?.userData?.data,
    utmData: state.utmData,
    currencyData: state.ipDetails.currency_detail,
    subscription : state.userProfileData.userSubscriptionData,
    clientStatus : state.client.client
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    alertBoxAction: (data) => dispatch(alertBox(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleCheckoutWrapper);
