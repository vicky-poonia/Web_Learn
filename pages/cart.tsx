import { useEffect, useState } from "react";
import { SubscribeCourse } from "@/components/import";
import { connect } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateCartAfterLogin,
  updateCartCount,
  updateCoupon,
  updateSateOfCartAfterLogin,
} from "redux/AddToCart/cart-actions";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import cookie from "js-cookie";
import * as fbq from "../lib/fpixel";
import * as ga from "../lib/ga";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import InboxIcon from "@material-ui/icons/Inbox";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import CircularProgress from "@material-ui/core/CircularProgress";
import { updateRedirection } from "redux/Redirection/redirect-actions";
import {RotatingLines } from "react-loader-spinner";
import CartCombo from "@/components/Cartcombo/cartcombo";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const EmptyCart = () => (
  <div className="cart-block">
    <div className="container">
      <span className="page-title">0 Courses in Cart</span>
      <div
        className="white-box"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "30px 0",
          borderRadius: "8px",
        }}
      >
        <figure style={{ marginBottom: "20px" }}>
          <img src="/images/empty-cart.svg" alt="" />
        </figure>
        <p
          className="empty-pera"
          style={{
            textAlign: "center",
            fontSize: "18px",
            color: "#1F2430",
            fontWeight: "400",
            lineHeight: "1.5",
          }}
        >
          Your cart is empty. <br /> Keep browsing to find a course!
        </p>
        <Link href="/library/">
          <a
            className="btn find-course-btn"
            style={{
              width: "100%",
              maxWidth: "180px",
              backgroundColor: "#F06421",
              textDecoration: "none",
              color: "#fff",
            }}
          >
            Find a Course
          </a>
        </Link>
      </div>
    </div>
  </div>
);

const Cart = ({
  cartData,
  userData,
  addToCartStore,
  removeFromCartStore,
  currencyData,
  updateCouponDatas,
  stateCart,
  storeCartCountAction,
  updateaftersignin,
  updateCartAfterLoginAction,
  CouponStateData,
  seoHomePageData,
}) => {
  const router = useRouter();
  const [loadingMask, setLoadingMask] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [savingsBag, setSavingsBag] = useState(0);
  const [savingsBagWithDisc, setSavingsBagWithDisc] = useState(0);
  const [subTotal, setSubTotal] = useState(0.0);
  const [finalTotal, setFinalTotal] = useState(0.0);
  const [discount, setDiscount] = useState(0.0);
  const [coupon, setCoupon] = useState("");
  const [upperCoupon, setUpperCoupon] = useState("");
  const [className, setClassName] = useState("bg-color emptycart-page");
  const [currency, setCurrency] = useState(null);
  const [couponData, setCouponData] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [handleAddProductToCartLoading, setHandleAddProductToCartLoading] = useState(false);
  const [removeCoupons, setRemoveCoupons] = useState(false);
  const [currentLoading, setCurrentlyLoading] = useState({
    courseId: null,
    productType: null,
  });
  const [loading, setloading] = useState(false);
  const [showFreebies,setfreebies] = useState(false)
  const [fullcourseSelected,setfullcourseSelected] = useState(false)
  const [autoApplycoupon,setautoapplycoupon] = useState(false)
  // const [availed_freebies,setAvailed_freebies] = useState(null)

  // useEffect(()=>{
  //   if(userData)
  //   {
  //     const availed_freebies_fn = async(userData)=>{
  //       const {data} = await axios.get(`${baseUrl}/orders/freebies/track/?user_id=${userData.data.user_id}`)
  //       setAvailed_freebies(data.obj)
  //     }
  //     availed_freebies_fn(userData)
  //   }
  // },[userData])

  useEffect(() => {
    // Facebook Pixel
    if (process.env.NEXT_PUBLIC_BASE_PATH.includes("whizlabs.com")) {
      fbq.event({
        action: "AddToCart",
        params: {
          content_name: "Facebook Pixel code in cart page",
          currency: currency?.type || "",
          value: finalTotal || "",
        },
      });
    }
  }, []);

  useEffect(() => {
    // clear the coupon datas
    updateCouponDatas(null);
    // if (userData === null) {
    //   router.push("/");
    // }
    if (currencyData) setCurrency(currencyData);
  }, [currencyData]);

  const getCartData = async (userToken) => {
    let CartData = await axios.get(`${baseUrl}/cart/getcartdata`, {
      headers: {
        Authorization: userToken,
      },
    });

    setloading(false);
    let cartData = [];
    if (CartData.data) {
      cartData = CartData.data.cart_details;
    }
    storeCartCountAction(cartData.length)
    if (cartData && cartData.length > 0) {
      setCartItems(cartData);
      if(CouponStateData && !autoApplycoupon){
       await handleCouponApply()
      }
      setCurrentlyLoading({
        courseId: null,
        productType: null,
      });
    } else {
      setCartItems([]);
      setClassName("bg-color emptycart-page");
    }
  };

  const getCartfromCookie = async () => {
    let cart = await axios.post(`${baseUrl}/cart/getprices`, {
      cart_details: stateCart,
    });
    if (cart.data.cart_details) {
      setCartItems(cart.data.cart_details);
      storeCartCountAction(cart.data.cart_details.length)
      setCurrentlyLoading({
        courseId: null,
        productType: null,
      });
      setloading(false);
    } else {
      setCartItems([]);
    }
  };

  // const updateCartAfterSigninFunction = async () => {
  //   //todo
  //   // 1. get the userID
  //   // 2.pass it to backend
  //   // 3. update the current one
  //   // 4. if all ok redirect to checkout page
  //   // 5. stay here and show the updated the cart
  //   //
  //   try {
  //     if (userData && userData.data) {
  //       setloading(true);
  //       // setHandleAddProductToCartLoading(true);
  //       // updateSateOfCartAfterLoginAction(stateCart, currency, userData);
  //       setCartItems([]);
  //       setTimeout(() => {
  //         getCartData(userData.data.token);
  //       }, 1000);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   if (stateCart && stateCart.length > 0 && userData && currency) {
  //     //updateCart
  //     updateCartAfterSigninFunction();
  //   }
  // }, [userData]);

  useEffect(() => {
    if (
      userData &&
      userData.data.token &&
      updateaftersignin == false &&
      handleAddProductToCartLoading == false
    ) {
      setloading(true);
      getCartData(userData.data.token);
    }
  }, [handleAddProductToCartLoading,updateaftersignin,userData]);

  useEffect(() => {
    if (userData == null) {
      setloading(true);
      //post method to get the current price of products
      getCartfromCookie();
    }
  }, [stateCart, userData]);

  useEffect(() => {
    document.querySelector("body").classList.add("bg-color");
    if (currency && cartItems && cartItems.length > 0) {
      updateCartUI();
    }
    return () => {
      setTimeout(() => {
        setLoadingMask(false);
      }, 1000);
    };
  }, [cartItems, currency, savingsBag, savingsBagWithDisc, subTotal, finalTotal, discount, coupon]);
  // console.log("cart",cartItems)
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      cartItems.forEach((itm) => {
        let selected_ctype = itm.selectedCourseType;
        if (
          selected_ctype.length == 1 &&
          itm.LabSalePrice.inr === "0" &&
          selected_ctype.includes("lab")
        ) {
          handleRemoveFromcart(itm.courseId, "lab");
          // removeFromCartStore(itm.courseId,"lab")
        }
      });
    }
  }, [cartItems]);

  const getFreebies = async()=>{
    let freebies_sub = await axios.get(`${baseUrl}/orders/freebies/subscription/bf2023`,{
      headers: {
        Authorization: userData.data.token,
      },
    })
    if(freebies_sub.data){
      setfreebies(freebies_sub.data.showFreebies == true ? true : false)
    }
  }
  useEffect(()=>{
    if(removeCoupons && userData){
      getFreebies()
    }
  },[removeCoupons,userData])
  
  const priceFormat = (value) => parseFloat(value).toFixed(2);

  const openCheckoutPage = async (e) => {
    e.preventDefault();
    if (userData && userData.data && userData.data.user_id) {
      router.push("/checkout");
    } else {
      document.querySelector("body").classList.add("open-modal-login");
      updateCartAfterLoginAction(true)
    }
  };
  const handleCouponApply = async()=>{
    setautoapplycoupon(true)
    setCouponLoading(true);
    const response = await axios.post(`${baseUrl}/cart/coupon/verify`, {
      user_id: userData.data.user_id,
      coupon_code: coupon,
    });
    if (response.data.data) {
      if (response.data?.data?.total_discount == 0) {
        updateCouponDatas(null);
        setCoupon("");
        setCouponData(null);
        setFinalTotal(subTotal);
        setSavingsBagWithDisc(0);
        setDiscount(0);
        setCouponLoading(false);
        return;
      }
      const finalCal = response.data.data.discounted_price;
      setFinalTotal(finalCal);
      setCouponData(response.data.data)
      setSubTotal(response.data.data.total_price)
      setSavingsBagWithDisc(savingsBag + response.data.data.total_discount);
      setDiscount(response.data.data.total_discount);
      const cookieCartId = cookie.get("cart_id");
      updateCouponDatas({
        user_id: userData.data.user_id,
        cart_id: cookieCartId,
        coupon_code: coupon,
        total_price: response.data.data.total_price,
        discounted_price: response.data.data.discounted_price,
        currency_type: currency.type,
      });
    }
    setCouponLoading(false);
  }
  const handleCoupon = async (e) => {
    if(typeof e == "object"){
      e.preventDefault();
    }
    setCouponLoading(true);
    if (!userData || !userData.data || !userData.data.user_id) {
      document.querySelector("body").classList.add("open-modal-login");
      setCouponLoading(false);
      return;
    }

    if (couponData === null && coupon && userData.data.user_id) {
      const response = await axios.post(`${baseUrl}/cart/coupon/verify`, {
        user_id: userData.data.user_id,
        coupon_code: coupon,
      });

      if (response.data.status == "error") {
        setCouponData("Invalid Coupon");
        setCouponLoading(false);
        return;
      }

      // Storing data to Redux state & DB also.
      if (response.data?.data?.discounted_price && coupon) {
        if (response.data?.data?.total_discount == 0) {
          setCouponData("Invalid Coupon");
          setCouponLoading(false);
          return;
        }
      }
      setCouponData(response.data.data);
      const finalCal = response.data.data.discounted_price;
      setFinalTotal(finalCal);
      setSavingsBagWithDisc(savingsBag + response.data.data.total_discount);
      setDiscount(response.data.data.total_discount);
      if (response.data.data) {
        const cookieCartId = cookie.get("cart_id");
        updateCouponDatas({
          user_id: userData.data.user_id,
          cart_id: cookieCartId,
          coupon_code: coupon,
          total_price: response.data.data.total_price,
          discounted_price: response.data.data.discounted_price,
          currency_type: currency.type,
        });
      }
      setCouponLoading(false);
    } else {
      updateCouponDatas(null);
      setCoupon("");
      setCouponData(null);
      setFinalTotal(subTotal);
      setSavingsBagWithDisc(0);
      setDiscount(0);
      setCouponLoading(false);
      setautoapplycoupon(false)
    }
  };

  const updateCartUI = () => {
    if (currency && cartItems.length > 0) {
      setClassName("cart-page");
      let PT = 0;
      let OC = 0;
      let LAB = 0;
      let SANDBOX = 0;
      let savingTotal = 0;

      let fullcourse = cartItems.filter((itm)=> itm.selectedCourseType.length == itm.courseType.length)
      if(fullcourse.length > 0){
        setfullcourseSelected(true)
      }else{
        setfullcourseSelected(false)
      }
      let cart_unwantedCourseFound = false
      //removing unwanted courseTypes

      cartItems.forEach((itm)=>{
        if(!(itm.selectedCourseType.length == 1 && itm.selectedCourseType[0].includes('sandbox-'))){
          itm.selectedCourseType.forEach(async(x)=>{
            if(!itm.courseType.includes(x)){
              cart_unwantedCourseFound = true;
              await removeFromCartStore(itm.courseId,x, currency.type);
            }
          })
        }
      })

      if(cart_unwantedCourseFound){
        window.location.reload()
      }
      
      if(CouponStateData == null){
        cartItems.forEach((item) => {
          if (item.isCampaign) {
            setRemoveCoupons(item.isCampaign);
          }
          if (
            item.selectedCourseType.includes("pt") &&
            item.PtSalePrice[currency.type] &&
            !item.enrolled_product_types?.includes("PT")
          ) {
            PT += parseFloat(item.PtSalePrice[currency.type]);
            savingTotal +=
              parseFloat(item.PtRegPrice[currency.type]) -
              parseFloat(item.PtSalePrice[currency.type]);
          }
          if (
            item.selectedCourseType.includes("oc") &&
            item.OcSalePrice[currency.type] &&
            !item.enrolled_product_types?.includes("OC")
          ) {
            OC += parseFloat(item.OcSalePrice[currency.type]);
            savingTotal +=
              parseFloat(item.OcRegPrice[currency.type]) -
              parseFloat(item.OcSalePrice[currency.type]);
          }
          if (
            item.selectedCourseType.includes("lab") &&
            item.LabSalePrice[currency.type] &&
            !item.enrolled_product_types?.includes("LAB")
          ) {
            LAB += parseFloat(item.LabSalePrice[currency.type]);
            savingTotal +=
              parseFloat(item.LabRegPrice[currency.type]) -
              parseFloat(item.LabSalePrice[currency.type]);
          }
          if (
            (item.selectedCourseType.includes("sandbox") ||
              item.selectedCourseType.includes("sandbox-6") ||
              item.selectedCourseType.includes("sandbox-3") ||
              item.selectedCourseType.includes("sandbox-1")) &&
            (typeof item.SandboxSalePrice == 'object' && item.SandboxSalePrice[currency.type]) &&
            !item.enrolled_product_types?.includes("sandbox")
          ) {
            SANDBOX += parseFloat(item.SandboxSalePrice[currency.type]);
            savingTotal +=
              parseFloat(item.SandboxRegPrice[currency.type]) -
              parseFloat(item.SandboxSalePrice[currency.type]);
          }
        });
        const total = PT + OC + LAB + SANDBOX;
          setSubTotal(total);
          setFinalTotal(total - discount);
          setSavingsBag(savingTotal);
      }
    
      ga.ecommerceEvent({
        eventType: "addToCart",
        currency: currency?.type || "",
        productList: cartItems,
      });
    } else {
      setClassName("bg-color emptycart-page");
    }
  };

  const handleAddProductToCart = async (e, course_id, course_type) => {
    if (currentLoading.courseId != null) return;
    if(CouponStateData){
      setautoapplycoupon(false)
    }
    setHandleAddProductToCartLoading(true);
    setCurrentlyLoading({
      courseId: course_id,
      productType: course_type,
    });
    await addToCartStore(course_id, course_type, currency.type);
    setHandleAddProductToCartLoading(false);
    // setCurrentlyLoading({
    //   courseId:null,
    //   productType:null
    // })
    return;
  };

  const handleRemoveFromcart = async (course_id, type) => {
    if (currentLoading.courseId != null) return;
    if(CouponStateData){
      setautoapplycoupon(false)
    }
    setHandleAddProductToCartLoading(true);
    setCurrentlyLoading({
      courseId: course_id,
      productType: type,
    });

    //some time labs is given free so when lab is included with PT OC
    //so when PT AND LAB is present or OC and LAB is present or SANDBOX and LAB is present
    //when any one is remove we need to remove labs as well
    let course = cartItems.find((itm) => itm.courseId == course_id);
    // console.log("labs course",course)
    if (
      course &&
      course.selectedCourseType.length == 2 &&
      course.selectedCourseType.includes("lab") &&
      parseFloat(course.LabSalePrice[`usd`]) == 0
    ) {
      // console.log("came in LAB")
      await removeFromCartStore(course_id, "lab", currency.type);
      // console.log("removed")
    }
    await removeFromCartStore(course_id, type, currency.type);
    // console.log("removed")
    setHandleAddProductToCartLoading(false);
  };

  const clearCouponDatas = () => {
    // clear the coupon datas
    updateCouponDatas(null);
    setCoupon("");
    setCouponData(null);
    setSavingsBagWithDisc(0);
    setDiscount(0);
    //
  };

  const getEnrollmentInfo = async ({ Itm }) => {
    const responses = await Promise.all([
      axios
        .post(
          `${baseUrl}/users/user-course-enroll-status`,
          {
            course_id: Itm.courseId,
          },
          {
            headers: {
              Authorization: userData.data.token,
            },
          }
        )
        .then(({ data }) => data),
      axios.get(`${baseUrl}/web/promotions`).then(({ data }) => data),
    ]);
    const enrolledProds = responses[0];
    const promos = responses[1];

    return {
      enrolledProds,
      promos,
    };
  };
  //   let obj = [{title:"Azure Cloud Sandbox",images:"/images/azure-cloud-sandbox.webp",pageId:18},
  //   {title:"AWS Cloud Sandbox",images:"/images/aws-sandbox.webp",pageId:15},
  //   {title:"Goolge Cloud Sandbox",images:"/images/gcp-sandbox.webp",pageId:19},
  //   {title:"Power-Bi Cloud Sandbox",images:"/images/power-bi-sandbox.webp",pageId:41}
  // ]
  // let course_stats = false
  //   cartItems.forEach((itm)=>{
  //     let pg_id = itm.course_page_id
  //     if(pg_id == 15 && itm.courseId != 2475)
  //     {
  //       course_stats = true;
  //     }
  //     if(pg_id == 19 && itm.courseId != 2479)
  //     {
  //       course_stats = true;
  //     }
  //     if(pg_id == 18 && itm.courseId != 2476)
  //     {
  //       course_stats = true
  //     }
  //     if(pg_id == 41 && itm.courseId != 2483)
  //     {
  //       course_stats = true
  //     }
  //   })

  //   let is_premium_plus_availble = false;

  //   if(course_stats)
  //   {
  //       subscriptionData?.active_plans.forEach((itm)=>{
  //         let plan = itm.plan
  //         if(plan.is_active)
  //         {
  //           if(plan.is_sandbox_access && plan.is_unlimited_access_lab)
  //           {
  //             is_premium_plus_availble = true
  //           }
  //         }
  //       })
  //   }
  return (
    <>
      {!loadingMask && cartItems && (
        <>
          {/* <Head>
            <title>Cart | Whizlabs</title>
            <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
            <meta httpEquiv="cache-control" content="no-cache" />
            <meta httpEquiv="expires" content="0" />
            <meta httpEquiv="pragma" content="no-cache" />
          </Head> */}
          {loadingMask ? (
            <>
              <div id="content-area">
                <div className="error-page error-500">
                  <div className="container">
                    <div className="btn-group">
                      <h3>Loading....</h3>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div id="content-area" className={`${className}`}>
                {!currency || cartItems.length === 0 ? (
                  <>
                    {loading ? (
                      <>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "30px",
                            marginBottom: "50px",
                          }}
                        >
                          <RotatingLines
                            strokeColor="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="96"
                            visible={true}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <EmptyCart />
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {/* <!-- course in cart --> */}
                    <div className="container">
                      {/* <br /> */}
                      <div className="page-title">{cartItems.length} Course(s) in Cart</div>
                      <div className="page-content">
                        <div className="cart-items">
                          {cartItems.map((item, index) => (
                            <div className="item" key={index}>
                              <figure className="course-img">
                                <Link href={"/" + item.courseSlug}>
                                  <a>
                                    <img
                                      className="img-full"
                                      src={
                                        process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                                        item.courseImage.replace("media/", "")
                                      }
                                      alt={item.courseName}
                                      title={item.courseName}
                                      onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src = "/images/no-image.png";
                                      }}
                                    />
                                  </a>
                                </Link>
                                <div className="title">
                                  <Link href={"/" + item.courseSlug}>
                                    <a>{item.courseName}</a>
                                  </Link>
                                </div>
                              </figure>
                              <div className="item-details">
                                <div className="title">
                                  <Link href={"/" + item.courseSlug}>
                                    <a>{item.courseName}</a>
                                  </Link>
                                </div>
                                <ul className="option-group ankit">
                                  <>
                                    {/* PRACTICE TESTS */}
                                    {(() => {
                                      if (
                                        item.courseType.includes("pt") &&
                                        !item.enrolled_product_types?.includes("PT")
                                      ) {
                                        if (item.selectedCourseType.includes("pt")) {
                                          return (
                                            <li className="option">
                                              <div
                                                className="option-title"
                                                style={{ display: "flex", alignItems: "center" }}
                                              >
                                                <i className="icon-font-note2 pIconclass"></i>
                                                Practice Tests
                                              </div>
                                              <div className="option-right">
                                                <div className="price-block">
                                                  <del className="old-price">
                                                    {currency.symbol}
                                                    {priceFormat(item.PtRegPrice[currency.type])}
                                                  </del>
                                                  <span className="price">
                                                    {currency.symbol}
                                                    {priceFormat(item.PtSalePrice[currency.type])}
                                                  </span>
                                                </div>
                                                <div
                                                  className="icon"
                                                  onClick={
                                                    () => handleRemoveFromcart(item.courseId, "pt")
                                                    // removeFromCartStore(item.courseId, "pt")
                                                  }
                                                >
                                                  {currentLoading.courseId == item.courseId &&
                                                  currentLoading.productType == "pt" ? (
                                                    <CircularProgress
                                                      style={{
                                                        color: "green",
                                                        width: "20px",
                                                        height: "20px",
                                                        padding: "5px",
                                                      }}
                                                    />
                                                  ) : (
                                                    <i className="icon delete-ico icon-font-delete"></i>
                                                  )}
                                                </div>
                                              </div>
                                            </li>
                                          );
                                        } else {
                                          return (
                                            <li className="offer-add">
                                              <span className="offer-title">Practice Tests</span>
                                              <div className="offer-text">
                                                <p>
                                                  Would you like to add in the cart?{" "}
                                                  <strong>
                                                    {" "}
                                                    Best offer {currency.symbol}
                                                    {item.PtSalePrice[currency.type]}{" "}
                                                  </strong>{" "}
                                                </p>
                                                <button
                                                  onClick={(e) =>
                                                    handleAddProductToCart(e, item.courseId, ["pt"])
                                                  }
                                                  className="btn offer-btn"
                                                >
                                                  {/* {handleAddProductToCartLoading ? "Wait" : "Add"} */}
                                                  {currentLoading.courseId == item.courseId &&
                                                  currentLoading.productType == "pt" ? (
                                                    <CircularProgress
                                                      style={{
                                                        color: "white",
                                                        width: "20px",
                                                        height: "20px",
                                                        padding: "5px",
                                                      }}
                                                    />
                                                  ) : (
                                                    "Add"
                                                  )}
                                                </button>
                                              </div>
                                            </li>
                                          );
                                        }
                                      }
                                    })()}

                                    {/* ONLINE COURSES */}
                                    {(() => {
                                      if (
                                        item.courseType.includes("oc") &&
                                        !item.enrolled_product_types?.includes("OC")
                                      ) {
                                        if (item.selectedCourseType.includes("oc")) {
                                          return (
                                            <li className="option">
                                              <div
                                                className="option-title"
                                                style={{ display: "flex", alignItems: "center" }}
                                              >
                                                <i className="icon-font-play  pIconclass"></i>Video
                                                Course
                                              </div>
                                              <div className="option-right">
                                                <div className="price-block">
                                                  <del className="old-price">
                                                    {currency.symbol}
                                                    {priceFormat(item.OcRegPrice[currency.type])}
                                                  </del>
                                                  <span className="price">
                                                    {currency.symbol}
                                                    {priceFormat(item.OcSalePrice[currency.type])}
                                                  </span>
                                                </div>
                                                <div
                                                  className="icon"
                                                  onClick={
                                                    () => handleRemoveFromcart(item.courseId, "oc")
                                                    // removeFromCartStore(item.courseId, "oc")
                                                  }
                                                >
                                                  {currentLoading.courseId == item.courseId &&
                                                  currentLoading.productType == "oc" ? (
                                                    <CircularProgress
                                                      style={{
                                                        color: "green",
                                                        width: "20px",
                                                        height: "20px",
                                                        padding: "5px",
                                                      }}
                                                    />
                                                  ) : (
                                                    <i className="icon delete-ico icon-font-delete"></i>
                                                  )}
                                                  {/* <i className="icon delete-ico icon-font-delete"></i> */}
                                                </div>
                                              </div>
                                            </li>
                                          );
                                        } else {
                                          return (
                                            <li className="offer-add">
                                              <span className="offer-title">Video Course</span>
                                              <div className="offer-text">
                                                <p>
                                                  Would you like to add in the cart?{" "}
                                                  <strong>
                                                    {" "}
                                                    Best offer {currency.symbol}
                                                    {item.OcSalePrice[currency.type]}{" "}
                                                  </strong>{" "}
                                                </p>
                                                <button
                                                  onClick={(e) =>
                                                    handleAddProductToCart(e, item.courseId, ["oc"])
                                                  }
                                                  className="btn offer-btn"
                                                >
                                                  {/* {handleAddProductToCartLoading ? "Wait" : "Add"} */}
                                                  {currentLoading.courseId == item.courseId &&
                                                  currentLoading.productType == "oc" ? (
                                                    <CircularProgress
                                                      style={{
                                                        color: "white",
                                                        width: "20px",
                                                        height: "20px",
                                                        padding: "5px",
                                                      }}
                                                    />
                                                  ) : (
                                                    "Add"
                                                  )}
                                                </button>
                                              </div>
                                            </li>
                                          );
                                        }
                                      }
                                    })()}

                                    {/* HANDS-ON-LABS */}
                                    {(() => {
                                      if (
                                        item.courseType.includes("lab" || "labs") &&
                                        !item.enrolled_product_types?.includes("LAB")
                                      ) {
                                        if (item.selectedCourseType.includes("lab")) {
                                          return (
                                            <li className="option">
                                              <div
                                                className="option-title"
                                                style={{ display: "flex", alignItems: "center" }}
                                              >
                                                <i className="icon-font-bicker pIconclass"></i>
                                                Hands-On Labs
                                              </div>
                                              <div className="option-right">
                                                <div className="price-block">
                                                  <del className="old-price">
                                                    {item.LabRegPrice[currency.type] === "0"
                                                      ? ""
                                                      : currency.symbol}
                                                    {item.LabRegPrice[currency.type] === "0" ? (
                                                      <></>
                                                    ) : (
                                                      priceFormat(item.LabRegPrice[currency.type])
                                                    )}
                                                  </del>
                                                  <span className="price">
                                                    {item.LabSalePrice[currency.type] === "0"
                                                      ? ""
                                                      : currency.symbol}
                                                    {item.LabSalePrice[currency.type] === "0" ? (
                                                      <>FREE</>
                                                    ) : (
                                                      priceFormat(item.LabSalePrice[currency.type])
                                                    )}
                                                  </span>
                                                </div>
                                                <div
                                                  className="icon"
                                                  onClick={
                                                    () => handleRemoveFromcart(item.courseId, "lab")
                                                    // removeFromCartStore(item.courseId, "lab")
                                                  }
                                                >
                                                  {item.LabSalePrice[currency.type] === "0" ? (
                                                    ""
                                                  ) : currentLoading.courseId == item.courseId &&
                                                    currentLoading.productType == "lab" ? (
                                                    <CircularProgress
                                                      style={{
                                                        color: "green",
                                                        width: "20px",
                                                        height: "20px",
                                                        padding: "5px",
                                                      }}
                                                    />
                                                  ) : (
                                                    <i className="icon delete-ico icon-font-delete"></i>
                                                  )}
                                                </div>
                                              </div>
                                            </li>
                                          );
                                        } else {
                                          return (
                                            <li className="offer-add">
                                              <span className="offer-title">Hands-on Labs</span>
                                              <div className="offer-text">
                                                <p>
                                                  Would you like to add in the cart?{" "}
                                                  <strong>
                                                    {" "}
                                                    Best offer {currency.symbol}
                                                    {priceFormat(
                                                      item.LabSalePrice[currency.type]
                                                    )}{" "}
                                                  </strong>{" "}
                                                </p>
                                                <button
                                                  onClick={(e) =>
                                                    handleAddProductToCart(e, item.courseId, [
                                                      "lab",
                                                    ])
                                                  }
                                                  className="btn offer-btn"
                                                >
                                                  {/* {handleAddProductToCartLoading ? "Wait" : "Add"} */}
                                                  {currentLoading.courseId == item.courseId &&
                                                  currentLoading.productType == "lab" ? (
                                                    <CircularProgress
                                                      style={{
                                                        color: "white",
                                                        width: "20px",
                                                        height: "20px",
                                                        padding: "5px",
                                                      }}
                                                    />
                                                  ) : (
                                                    "Add"
                                                  )}
                                                </button>
                                              </div>
                                            </li>
                                          );
                                        }
                                      }
                                    })()}

                                    {/* SANDBOX */}
                                    {(() => {
                                      let validity = null;
                                      if (
                                        item.selectedCourseType.includes("sandbox-6") ||
                                        item.selectedCourseType.includes("sandbox-3") ||
                                        item.selectedCourseType.includes("sandbox-1")
                                      ) {
                                        let sandbox_validity =
                                          item.selectedCourseType[0].split("-");
                                        validity = sandbox_validity[sandbox_validity.length - 1];
                                      }
                                      if (
                                        item.courseType.includes("sandbox") &&
                                        !item.enrolled_product_types?.includes("SANDBOX")
                                      ) {
                                        if (
                                          item.selectedCourseType.includes("sandbox") ||
                                          item.selectedCourseType.includes(`sandbox-${validity}`)
                                        ) {
                                          return (
                                            <li className="option">
                                              <div
                                                className="option-title"
                                                style={{ marginLeft: "8px" }}
                                              >
                                                {/* Sandbox ({item.courseType[0].split("-")[1]} Month
                                              {+item.courseType[0].split("-")[1] > 1 ? "s" : ""}) */}
                                                <InboxIcon />
                                                {validity ? (
                                                  <>&nbsp;Sandbox&nbsp;({validity} Months)</>
                                                ) : (
                                                  <>
                                                    &nbsp;Cloud Sandbox{" "}
                                                    {item.sandbox_validity != "global" ? (
                                                      <>({item.sandbox_validity} Months)</>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </>
                                                )}
                                              </div>
                                              <div className="option-right">
                                                <div className="price-block">
                                                  <del className="old-price">
                                                    {currency.symbol}
                                                    {typeof item.SandboxRegPrice == 'object' ?priceFormat(
                                                      item.SandboxRegPrice[currency.type]
                                                    ):""}
                                                  </del>
                                                  <span className="price">
                                                    {currency.symbol}
                                                    {typeof item.SandboxSalePrice == 'object' ? priceFormat(
                                                      item.SandboxSalePrice[currency.type]
                                                    ):""}
                                                  </span>
                                                </div>
                                                <div
                                                  className="icon"
                                                  onClick={() =>
                                                    validity
                                                      ? handleRemoveFromcart(
                                                          item.courseId,
                                                          `sandbox-${validity}`
                                                        )
                                                      : handleRemoveFromcart(
                                                          item.courseId,
                                                          "sandbox"
                                                        )
                                                  }
                                                >
                                                  {/* <i className="icon delete-ico icon-font-delete"></i> */}
                                                  {currentLoading.courseId == item.courseId &&
                                                  (currentLoading.productType == "sandbox" ||
                                                    currentLoading.productType ==
                                                      `sandbox-${validity}`) ? (
                                                    <CircularProgress
                                                      style={{
                                                        color: "green",
                                                        width: "20px",
                                                        height: "20px",
                                                        padding: "5px",
                                                      }}
                                                    />
                                                  ) : (
                                                    <i className="icon delete-ico icon-font-delete"></i>
                                                  )}
                                                </div>
                                              </div>
                                            </li>
                                          );
                                        } else {
                                          return (
                                            <li className="offer-add">
                                              <span className="offer-title">
                                                {validity ? (
                                                  <>Sandbox ({validity}&nbsp;Months)</>
                                                ) : (
                                                  <>
                                                    Cloud Sandbox &nbsp;
                                                      {item.sandbox_validity != "global" ?<>({item.sandbox_validity}&nbsp;Months)</>:""}
                                                    &nbsp;
                                                  </>
                                                )}
                                              </span>
                                              <div className="offer-text">
                                                <p>
                                                  Would you like to add in the cart?{" "}
                                                  <strong>
                                                    {" "}
                                                    Best offer {currency.symbol}
                                                    {item.SandboxSalePrice[currency.type]}{" "}
                                                  </strong>{" "}
                                                </p>
                                                <button
                                                  onClick={(e) =>
                                                    handleAddProductToCart(e, item.courseId, [
                                                      "sandbox",
                                                    ])
                                                  }
                                                  className="btn offer-btn"
                                                >
                                                  {/* {handleAddProductToCartLoading ? "Wait" : "Add"} */}
                                                  {currentLoading.courseId == item.courseId &&
                                                  currentLoading.productType == "sandbox" ? (
                                                    <CircularProgress
                                                      style={{
                                                        color: "white",
                                                        width: "20px",
                                                        height: "20px",
                                                        padding: "5px",
                                                      }}
                                                    />
                                                  ) : (
                                                    "Add"
                                                  )}
                                                </button>
                                              </div>
                                            </li>
                                          );
                                        }
                                      }
                                    })()}
                                    {item.whizcard != "" &&
                                      item.whizcard != null &&
                                      item.enrolled_product_types?.length == 0 && (
                                        <>
                                          <li className="option">
                                            <div className="option-title">
                                              <div className="productIconIcon">
                                                <PictureAsPdfIcon
                                                  style={{ padding: "0 6px 3px 9px" }}
                                                />
                                                &nbsp;Whizcard
                                              </div>
                                            </div>
                                            <div className="option-right">
                                              <div className="price-block">
                                                <span
                                                  className="price"
                                                  style={{ marginRight: "24px" }}
                                                >
                                                  FREE
                                                </span>
                                              </div>
                                            </div>
                                          </li>
                                        </>
                                      )}
                                  </>
                                </ul>
                              </div>
                            </div>
                          ))}

                          {/* black friday freebies info */}
                          {
                          ( !loading && showFreebies  && !fullcourseSelected&& <>
                            <div className="freebies-cart">
                              <div className="item">
                                <div className="item-details small-info" style={{textAlign:"center",padding:"10px"}}>
                                  <InfoOutlinedIcon/><br></br>
                                    Buy all course types in <Link href='/library'>individuval course</Link> and get<br/>
                                    <strong>7 Days Free Premium plus Subscription plan</strong>
                                </div>
                              </div>
                            </div>
                          </>)
                        }
                          { !loading && showFreebies  && fullcourseSelected &&
                              <div className="freebies-cart">
                                <span className="pay-title">Freebies-Included</span>
                                {<div className="item">
                                  <div className="item-details">
                                    <div className="title"><a>Subscription</a></div>
                                    <ul className="option-group">
                                      <li className="option">
                                        <div className="option-title">Premium Plus (7-Days)</div>
                                        <div className="option-right">
                                          <div className="price-block">
                                            <span className="price">FREE</span>
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>}
                              </div>
                            }
                        </div>

                        {/* <!-- Cart Summary --> */}
                        <div className="order-summary-block">
                          <div className="order-summary">
                            <span className="title">Order summary</span>
                            <div className="price-group">
                              <div className="price-block">
                                <span className="price-subtitle">Subtotal</span>
                                <span className="price">
                                  {currency && currency.symbol == "$" ? "US" : ""}
                                  {currency.symbol}
                                  {priceFormat(subTotal)}
                                </span>
                              </div>
                              {/* Black friday removal  */}
                              {!removeCoupons && (
                                <div className="price-block hr">
                                  <span className="price-subtitle">Discount</span>
                                  <span className="price-discount">
                                    {typeof couponData === "string" ? "" : "-"}
                                    {currency && currency.symbol == "$" ? "US" : ""}
                                    {currency.symbol}
                                    {priceFormat(discount)}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div
                              className="saving-block"
                              style={
                                couponData?.discounted_price ? {} : { justifyContent: "flex-end" }
                              }
                            >
                              {couponData?.discounted_price && (
                                <div className="saving-batch">
                                  <i className="icon saving-icon icon-font-saving"></i>
                                  <span className="saving-text">
                                    Savings{" "}
                                    <strong>
                                      {" "}
                                      {currency.symbol}
                                      {(couponData.discounted_price).toFixed(2)}
                                    </strong>
                                  </span>
                                </div>
                              )}
                              <span className="saving-amt">
                                {currency && currency.symbol == "$" ? "US" : ""}
                                {currency.symbol}
                                {priceFormat(finalTotal)}
                                
                              </span>
                            </div>
                            <a onClick={openCheckoutPage} className="btn btn-checkout">
                              {userData ? <> Proceed to Checkout</> : <>Sign In to Proceed</>}
                            </a>
                          </div>
                          {/* black friday reomoval */}
                          {!removeCoupons && userData && (
                            <div className="promo-code">
                              <form>
                                <input
                                  value={couponData !== null ? upperCoupon :coupon}
                                  readOnly={couponData !== null}
                                  type="text"
                                  onChange={(e) =>{
                                      setUpperCoupon(e.target.value.toUpperCase().trim())
                                      setCoupon(e.target.value.toLowerCase().trim())
                                    }
                                  }                                  
                                  placeholder="Enter Promo Code"
                                />
                                <button
                                  onClick={(e) => handleCoupon(e)}
                                  className="btn apply-btn"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    minWidth: "90px",
                                  }}
                                >
                                  {!couponLoading ? (
                                    <span>{couponData !== null ? "Remove" : "Apply"}</span>
                                  ) : (
                                    <img
                                      src="/images/loader.svg"
                                      alt="loading..."
                                      style={{
                                        width: "25px",
                                      }}
                                    />
                                  )}
                                </button>
                              </form>
                              {couponData !== null ? (
                                <span
                                  style={{
                                    textAlign: "left",
                                    width: "100%",
                                    display: "block",
                                    margin: "10px 0 0",
                                    fontSize: "100%",
                                    color: typeof couponData === "string" ? "#f44336" : "#009688",
                                  }}
                                >
                                  {typeof couponData === "string" ? couponData : "Coupon applied"}
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* <RecomendCourse /> */}

                    {/* <SubscribeCourse /> */}
                  </>
                )}
                <CartCombo cart={cartItems} currency={currency} userData = {userData}/>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    stateCart: state.cart.cart,
    userData: state.authData.userData,
    currencyData: state.ipDetails.currency_detail,
    redirectTo: state.redirectData.redirect_to,
    updateaftersignin:state.cart.updateaftersignin,
    CouponStateData:state.cart.couponData
    // subscriptionData : state.userProfileData.userSubscriptionData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCartStore: (id, type, currency) => dispatch(addToCart(id, type, currency)),
    removeFromCartStore: (id, type, currency) => dispatch(removeFromCart(id, type, currency)),
    updateCouponDatas: (data) => dispatch(updateCoupon(data)),
    storeCartCountAction:(count)=>dispatch(updateCartCount(count)),
    updateCartAfterLoginAction:(data)=>dispatch(updateCartAfterLogin(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const CrazyDealOption = ({ item, restrictLists, currency, priceFormat, removeFromCartStore }) => (
  <ul className="option-group">
    <li className="option">
      <div className="crazy-offer">
        <label>Crazy Deal Offer</label>{" "}
        {item.courseSlug === restrictLists[1] || item.courseSlug === restrictLists[2] ? (
          <span>(Practice Test + Online Courses)</span>
        ) : (
          <span>(Practice Test + Online Courses + Hands on Labs)</span>
        )}
      </div>
      <div className="option-right">
        <div className="price-block">
          <span className="price">
            {currency.symbol}
            {+priceFormat(item.PtSalePrice[currency.type]) +
              +priceFormat(item.OcSalePrice[currency.type])}
          </span>
        </div>
        <div
          className="icon"
          onClick={() => {
            removeFromCartStore(item.courseId, "pt");
            removeFromCartStore(item.courseId, "oc");
          }}
        >
          <i className="icon icon delete-ico icon-font-delete icon-font-delete"></i>
        </div>
      </div>
    </li>
  </ul>
);

export async function getServerSideProps() {
  const seoHomePageData = {
    seoPageType: "cart",
    title: "Cart | Whizlabs",
    metaTags: [
      { httpEquiv: "", name: "facebook-domain-verification", property: "", content: "twh401qzi7r7o3n227q4sg3hghbpzh" },
      { httpEquiv: "cache-control", name: "", property: "", content: "no-cache" },
      { httpEquiv: "expires", name: "", property: "", content: "0" },
      { httpEquiv: "pragma", name: "", property: "", content: "no-cache" },
    ],
  };
  
  
  return {
    props: {
      seoHomePageData,
    }, 
  };
}
