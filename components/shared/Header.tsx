import { useRouter } from "next/router";
import AnnouncmentBlock from "./AnnouncmentBlock";
import HeaderSearch from "./HeaderSearch";
import Menus from "./Menu";
import MenuMobile from "./MenuMobile";
import MenuIcon from "@material-ui/icons/Menu";
import { Menu, MenuButton } from "@szhsin/react-menu";
import { LoginModal, SignupModal, ResetPassModal } from "@/components/shared/AuthModals";
import Link from "next/link";
import "@szhsin/react-menu/dist/index.css";
import Image from "next/image";
import { connect } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { authRegister, authLogin, authLogout, authSocialLogin } from "redux/Auth/auth-actions";
import { useSession, signOut } from "next-auth/react";
import {
  clearCart,
  updateCartAfterLogin,
  updateCartCount,
  updateSateOfCartAfterLogin,
} from "redux/AddToCart/cart-actions";
import { updateRedirection } from "redux/Redirection/redirect-actions";
import UserAvatar from "../plugins/UserAvatar";
import { Head } from "next/document";
import { ScrollToTop } from "../ScrollToTop";
import axios from "axios";
import AfterSignUpModal from "./AfterSignUpModal";
import cookie from "js-cookie";
import { storeUserProfile } from "redux/UserProfile/profile-actions";
import { checkEmailVerified } from "redux/UserProfile/profile-actions";
import SiteUnderMaintenanceBanner from "./SiteUnderMaintenance";
import { alertBox } from "redux/AlertBox/alert-actions";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const Header = ({
  userData,
  authRegisterAction,
  authLoginAction,
  authLogoutAction,
  clearCartAction,
  socialLogin,
  authDataRegister,
  menusList,
  // saveAfterSignupData,
  alertBoxAction,
  cart,
  subscriptionData,
  userSubscriptionData,
  searchCourses,
  whislist,
  redirectionAction,
  redirectTo,
  redirectUrl,
  pathName,
  subscribedUser,
  headless = false,
  containerSmall = false,
  staticpage = false,
  // waIconVisible,
  loginmessage,
  plan_details,
  user_type,
  email_verified,
  updateEMail,
  maintenance_details,
  currencyData,
  cart_count,
  updateCartAfterSigninAction,
  storeCartCountAction,
}) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [scrolBtn, setScrollbtn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [cartMenu, setCartMenu] = useState(false);
  const [headerSearchOpen, setHeaderSearchOpen] = useState(false);
  const [isBreakpoint, setIsBreakpoint] = useState(false);
  const [plandetails, setplandetails] = useState(null);
  const [plan_toshow, setshowplan] = useState(null);
  const [upgrade, setupgrade] = useState(true);
  const [purchased, setpurchased] = useState(null);
  const [openAfterSignupModal, setOpenAfterSignupModal] = useState(true);
  const [modalSignupActive, setModalSignupActive] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const ref = useRef();
  const notifiref = useRef();

  // cart item
  const [cartItems, setCartItems] = useState([]);
  const [currency, setCurrency] = useState(null);
  const [subTotal, setSubTotal] = useState(0.0);
  const [loading, setloading] = useState(false);
  // const [handleAddProductToCartLoading, setHandleAddProductToCartLoading] = useState(false);

  // console.log(user_type)

  const checkemail = async () => {
    await updateEMail(userData.data.user_id);
  };
  useEffect(() => {
    if (userData) {
      checkemail();
    }
  }, []);

  useEffect(() => {
    // Hook for menu  button div Reference
    const closeML = (e: any) => {
      if (menuOpen && ref.current && !ref.current !== e.target) {
        setMenuOpen(false);
        document.body.classList.remove("o-hidden");
      }
      if (openNotification && notifiref.current && !notifiref.current !== e.target) {
        setOpenNotification(false);
      }
    };
    document.body.addEventListener("click", closeML);
    return () => {
      document.body.removeEventListener("click", closeML);
    };
  }, [menuOpen, openNotification]);
  useEffect(() => {
    const getuserCourse = async (userData) => {
      await axios.get(baseUrl + `/users/courses/?user_id=${userData.data.user_id}`).then((resp) => {
        setpurchased(resp.data?.data.length);
      });
    };
    if (userData) {
      getuserCourse(userData);
    }
  }, [userData]);
  useEffect(() => {
    let data = [];
    if (userSubscriptionData) {
      userSubscriptionData.forEach((itm) => {
        if (
          itm.plan?.is_sandbox_access == true &&
          itm.plan?.is_unlimited_access_lab == true &&
          itm.is_plan_active == true
        ) {
          setupgrade(false);
        }
        if (itm.plan?.is_sandbox_access == true && itm.plan?.is_unlimited_access_lab == true) {
          itm[`plan_name`] = "Premium Plus";
          itm[`weight`] = 5;
        }
        if (itm.plan?.is_sandbox_access == false && itm.plan?.is_unlimited_access_lab == true) {
          itm[`plan_name`] = "Premium";
          itm[`weight`] = 4;
        }
        if (itm.plan?.is_sandbox_access == false && itm.plan?.is_unlimited_access_lab == false) {
          itm[`plan_name`] = "Standard";
          itm[`weight`] = 3;
        }
        if (itm.is_plan_active) {
          data.push(itm);
        }
      });
    }
    setplandetails(data);
  }, [userSubscriptionData]);

  useEffect(() => {
    if (plandetails) {
      if (plandetails.length > 0) {
        plandetails.sort((a, b) => {
          return a.weight - b.weight;
        });
        let plan_title = plandetails[plandetails.length - 1].plan_name;
        let data = plan_details.find((itm) => itm.title === plan_title);
        setshowplan(data);
      }
      if (plandetails.length == 0) {
        if (purchased == 0) {
          let data = plan_details.find((itm) => itm.title === "Free");
          setshowplan(data);
        } else {
          let data = plan_details.find((itm) => itm.title === "Basic");
          setshowplan(data);
        }
      }
    }
  }, [plandetails, purchased]);

  // useOutsideClick(impactRef, () => setMenuOpen(false));
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    function handleResize() {
      const { innerWidth: width, innerHeight: height } = window;
      if (width > 1023) {
        setIsBreakpoint(false);
      } else {
        setIsBreakpoint(true);
      }
      setMenuOpen(false);
      document.body.classList.remove("o-hidden");
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    function handleScroll() {
      const { innerWidth: width, innerHeight: height, pageYOffset: scrollY } = window;
      if (scrollY > 900) {
        setScrollbtn(true);
      } else {
        setScrollbtn(false);
      }
    }
    whatsAppScroll();
    window.addEventListener("scroll", whatsAppScroll);
    function whatsAppScroll() {
      const { innerWidth: width, innerHeight: height, pageYOffset: scrollY } = window;
    }
  }, []);

  useEffect(() => {
    const signal = new AbortController().signal;
    if (userData && userData.data && userData.data.token) {
      setLoggedIn(true);
      let signupmodalcookie = cookie.get("signupmodal");
      if (signupmodalcookie) {
        setModalSignupActive(true);
      } else {
        setModalSignupActive(false);
      }
      // Logout from LMS
      const urlParams = new URLSearchParams(window.location.search);
      const urlRef = urlParams.get("ref");
      if (urlRef && urlRef === "LMSlogout") {
        authLogoutAction();
        clearCartAction();
        signOut({ redirect: false, callbackUrl: "/" });
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } else {
      setLoggedIn(false);
    }
  }, [userData]);

  const priceFormat = (value) => parseFloat(value).toFixed(2);

  useEffect(() => {
    if (!userData && session && session.user) {
      // Logout from LMS
      const urlParams = new URLSearchParams(window.location.search);
      const urlRef = urlParams.get("ref");
      if (urlRef && urlRef === "LMSlogout") {
        authLogoutAction();
        clearCartAction();
        signOut({ redirect: false, callbackUrl: "/" });
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        let pathname_cur = router.pathname;
        if (session.user.email == null) {
          authLogoutAction();
          clearCartAction();
          signOut({ redirect: false, callbackUrl: "/" });
          alertBoxAction({
            type: "WARNING",
            title: "",
            msg: "Login failed with Apple ID. Suggest to try different methods.",
          });
        }
        if (session.user.email != null) {
          socialLogin({
            name: session.user.name || null,
            email: session.user.email || null,
            image: session.user.image || null,
            currentPath: pathname_cur,
          });
        }
      }
    }
  }, [session]);

  // useEffect(() => {
  //   let count = 0;
  //   if (subscriptionData && subscriptionData.subscription_id) {
  //     count = cart ? cart.length : 0 + 1;
  //   } else {
  //     count = cart ? cart.length : 0;
  //   }
  //   setCartCount(count);
  // }, [cart, subscriptionData]);

  const openSignInModal = () => {
    document.querySelector("body").classList.add("open-modal-login");
    setModalSignupActive(true);
  };

  const openSignUpModal = () => {
    document.querySelector("body").classList.add("open-modal-signup");
    setModalSignupActive(true);
  };
  const logout = async () => {
    const userToken = userData.data.token;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    let pathname = "/";
    if (
      pathName.includes("/my-account") ||
      pathName.includes("/my-wishlist") ||
      pathName.includes("/cart")
    ) {
      pathname = "/";
    } else {
      pathname = pathName;
    }
    await signOut({ redirect: false, callbackUrl: pathname });
    axios
      .get(`${baseUrl}/auth/logout`, {
        headers: { Authorization: userToken },
      })
      .then(({ status, statusText }) => {
        if (status === 500) {
          console.error(statusText);
        }
      })
      .catch((e) => console.error(e));
    await authLogoutAction();
    await clearCartAction();
    if (pathName.includes("/my-wishlist") || pathName.includes("/my-account")) {
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      window.location.reload();
    }
  };

  const handlelink = (link) => {
    window.open(link);
  };

  useEffect(() => {
    // clear the coupon datas
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
      storeCartCountAction(cartData.length);
    }
    if (cartData && cartData.length > 0) {
      const data = cartData;
      data.map((item) => {
        item.total = updateCartUI({ item });
      });
      setCartItems(data);
    } else {
      setCartItems([]);
    }
  };

  const getCartfromCookie = async () => {
    let tmpCart = await axios.post(`${baseUrl}/cart/getprices`, {
      cart_details: cart,
    });
    if (tmpCart.data.cart_details) {
      const data = tmpCart.data.cart_details;
      storeCartCountAction(tmpCart.data.cart_details.length);
      data.map((item) => {
        item.total = updateCartUI({ item });
      });
      setCartItems(data);
      setloading(false);
    } else {
      setCartItems([]);
    }
  };

  useEffect(() => {
    // console.log('getcartData',updateCartstate)
    if (userData && userData.data && userData.data.token && currency) {
      setloading(true);
      getCartData(userData.data.token);
    }
  }, [userData, currency, cart]);

  useEffect(() => {
    if (!userData && currency) {
      setloading(true);
      //post method to get the current price of products
      getCartfromCookie();
    }
  }, [cart, userData, currency]);

  const openCartPage = (e) => {
    e.preventDefault();
    console.log("carts")
    router.push("/cart");
  };

  const updateCartUI = ({ item }: { item: any }) => {
    if (!item) {
      if (currency && cartItems.length > 0) {
        let PT = 0;
        let OC = 0;
        let LAB = 0;
        let SANDBOX = 0;
        let savingTotal = 0;

        cartItems.forEach((item) => {
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
      }
    } else {
      let PT = 0;
      let OC = 0;
      let LAB = 0;
      let SANDBOX = 0;
      let savingTotal = 0;
      if (
        item.selectedCourseType.includes("pt") &&
        item.PtSalePrice[currency.type] &&
        !item.enrolled_product_types?.includes("PT")
      ) {
        PT += parseFloat(item.PtSalePrice[currency.type]);
        savingTotal +=
          parseFloat(item.PtRegPrice[currency.type]) - parseFloat(item.PtSalePrice[currency.type]);
      }
      if (
        item.selectedCourseType.includes("oc") &&
        item.OcSalePrice[currency.type] &&
        !item.enrolled_product_types?.includes("OC")
      ) {
        OC += parseFloat(item.OcSalePrice[currency.type]);
        savingTotal +=
          parseFloat(item.OcRegPrice[currency.type]) - parseFloat(item.OcSalePrice[currency.type]);
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
        (typeof item.SandboxRegPrice == 'object' && item.SandboxSalePrice[currency.type]) &&
        !item.enrolled_product_types?.includes("sandbox")
      ) {
        SANDBOX += parseFloat(item.SandboxSalePrice[currency.type]);
        savingTotal +=
          parseFloat(item.SandboxRegPrice[currency.type]) -
          parseFloat(item.SandboxSalePrice[currency.type]);
      }

      return PT + OC + LAB + SANDBOX;
    }
  };

  const [mobilepf, setmobileplatform] = useState(false);

  const mobileplatform = (e) => {
    e.preventDefault();
    if (mobilepf) {
      setmobileplatform(false);
    } else {
      setmobileplatform(true);
    }
  };

  //Notification

  const [notificationRead, setNotificationRead] = useState(false);
  const handleNotificationClick = (e) => {
    e.preventDefault();
    let userId = userData?.data?.user_id;
    if (userId) {
      cookie.set(`notificationRead_${userId}`, "true");
      setNotificationRead(true);
      router.push("/my-account/?ref=account");
    }
  };
  useEffect(() => {
    let userId = userData?.data?.user_id;
    const isNotificationRead = userId ? cookie.get(`notificationRead_${userId}`) === "true" : false;
    setNotificationRead(isNotificationRead);
  }, []);

  useEffect(() => {
    if (currency && cartItems && cartItems.length > 0) {
      updateCartUI({
        item: null,
      });
    }
  }, [cartItems, currency]);

  return (
    <>
      <div id="wrapper" style={{ marginTop: "0px" }}>
        {!loggedIn && (
          <>
            <ResetPassModal />
            <LoginModal
              redirectUrl={redirectUrl}
              redirectTo={redirectTo}
              redirectionAction={redirectionAction}
              authLogin={authLoginAction}
              userData={userData}
              session={session}
              loginmessage={loginmessage}
            />
            <SignupModal
              authRegister={authRegisterAction}
              authDataRegister={authDataRegister}
              redirectUrl={redirectUrl}
              redirectTo={redirectTo}
              redirectionAction={redirectionAction}
            />
          </>
        )}
        {loggedIn && userData && modalSignupActive && !cookie.get("client") ? (
          <AfterSignUpModal
            searchCourses={searchCourses}
            open={openAfterSignupModal}
            setOpen={setOpenAfterSignupModal}
            // saveAfterSignupData={saveAfterSignupData}
            userData={userData}
          />
        ) : (
          ""
        )}

        {maintenance_details != null ? (
          <SiteUnderMaintenanceBanner selected_Maintenance_details={maintenance_details} />
        ) : (
          ""
        )}
        {!staticpage &&
          !headless &&
          !subscribedUser &&
          !pathName.includes("/lifetime-membership") && <AnnouncmentBlock />}

        {/* {!headless && !subscribedUser && <AnnouncmentBlock />} */}
        {scrolBtn && <ScrollToTop />}
        {/* {waIconVisible && <IconWA/>} */}
        <header className={headless ? "ft-header" : ""}>
          <div className={containerSmall ? "container-small" : "container"}>
            <div
              className={`header-left ${
                cookie.get("signupmodal") && !cookie.get("client") ? "background-blurr" : ""
              }`}
            >
              {/* <Link href={headless? "/ft-course-library" : "/"}>
              <a className="logo">
                <img width={200} height={30} className="img-full" src="/images/logo.svg" alt="" />
              </a>
            </Link> */}
              {!headless ? (
                <>
                  <Link href="/">
                    <a className="logo">
                      <img
                        width={200}
                        height={30}
                        className="img-full"
                        src="/images/logo.svg"
                        alt="Whizlabs Logo"
                      />
                    </a>
                  </Link>
                </>
              ) : staticpage ? (
                <>
                  <Link href="/training/library">
                    <a className="logo">
                      <img
                        width={200}
                        height={30}
                        className="img-full"
                        src="/images/logo.svg"
                        alt="Whizlabs Logo"
                      />
                    </a>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/">
                    <a className="logo">
                      <img
                        width={200}
                        height={30}
                        className="img-full"
                        src="/images/logo.svg"
                        alt="Whizlabs Logo"
                      />
                    </a>
                  </Link>
                </>
              )}
              {!isBreakpoint &&
                !headless &&
                !pathName.includes("/careers/[career]") &&
                !pathName.includes("/careers/apply") && (
                  <>
                    <div className="container">
                      <div className="header-left">
                        <div className="nav">
                          <ul>
                            <div
                              className="dropdown btn-dropdown"
                              onClick={() => {
                                setMenuOpen(!menuOpen);
                                setHeaderSearchOpen(false);
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              <span>Training Library</span>
                              <i className="icon icon-font-dropdown-arrow"></i>
                            </div>
                            {/* <div className="dropdown btn-dropdown-plate">
                            <span>Platform</span><i className="icon icon-font-dropdown-arrow"></i>
                          </div> */}
                            <Menu
                              menuButton={
                                <MenuButton>
                                  <span
                                    style={{
                                      height: "40px",
                                      width: "130px",
                                      backgroundColor: "#eff0f2",
                                      borderRadius: "50px",
                                      display: "flex",
                                      padding: "10px 0 0 25px",
                                      alignItems: "baseline",
                                    }}
                                  >
                                    Platform <i className="icon icon-font-dropdown-arrow"></i>
                                  </span>
                                </MenuButton>
                              }
                              menuClassName="menu-holder"
                            >
                              <div className="menuholder">
                                {/* <div id="dropdown-platform" className="dropdown-platform"> */}
                                <ul className="list-menu-plate">
                                  <li>
                                    <a href="/practice-exam-simulator" /*target="_blank"*/>
                                      <figure>
                                        <img
                                          className="img-full"
                                          src="/images/exam-simu.svg"
                                          alt=""
                                        />
                                      </figure>
                                      <div className="link-txt">
                                        <label>Exam Simulators</label>
                                        <p>
                                          Learn faster. Move faster. Transform now with Exam
                                          Simulators
                                        </p>
                                      </div>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="/self-study-video-courses" /*target="_blank"*/>
                                      <figure>
                                        <img
                                          className="img-full"
                                          src="/images/video-course.svg"
                                          alt=""
                                        />
                                      </figure>
                                      <div className="link-txt">
                                        <label>Video Courses</label>
                                        <p>Life teams to a common of cloud knowledge.</p>
                                      </div>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      // rel="noopener"
                                      /*target="_blank"*/
                                      href={process.env.NEXT_PUBLIC_PLAY_URL}
                                    >
                                      <figure>
                                        <img
                                          className="img-full"
                                          src="/images/hand-on-labs.svg"
                                          alt=""
                                        />
                                      </figure>
                                      <div className="link-txt">
                                        <label>Hands-on Labs</label>
                                        <p>Objective-driven. Proven to build cloud skills</p>
                                      </div>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      // rel="noopener"
                                      /*target="_blank"*/
                                      href={`${process.env.NEXT_PUBLIC_PLAY_URL}/sandbox`}
                                    >
                                      <figure>
                                        <img
                                          className="img-full"
                                          src="/images/cloud-sand.svg"
                                          alt=""
                                        />
                                      </figure>
                                      <div className="link-txt">
                                        <label>Cloud Sandboxes</label>
                                        <p>
                                          Risk-free cloud sandboxes for AWS, GCP, Azure, and Power
                                          BI
                                        </p>
                                      </div>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              {/* </div> */}
                            </Menu>
                            <li>
                              <a
                                rel="noopener"
                                target="_blank"
                                href={process.env.NEXT_PUBLIC_BUSINESS_URL}
                              >
                                For Business
                              </a>
                            </li>
                            {user_type != "amazon" && (
                              <>
                                <li
                                  onClick={() => {
                                    router.push("/pricing");
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  <a>Pricing</a>
                                </li>
                              </>
                            )}
                            {/* <li><a href="/review">Discussions</a></li> */}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* <div id="dropdown-platform" className="dropdown-platform"> */}
                    {/* <ul className="list-menu">
                      <li>
                        <a href="/platform/practice-test" target="_blank">
                          <figure>
                            <img className="img-full" src="/images/exam-simu.svg" alt="" />
                          </figure>
                          <div className="link-txt">
                            <label>Exam Simulators</label>
                            <p>Learn faster. Move faster. Transform now with Exam Simulators</p>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="/platform/self-study-video-courses" target="_blank">
                          <figure>
                            <img className="img-full" src="/images/video-course.svg" alt="" />
                          </figure>
                          <div className="link-txt">
                            <label>Video Courses</label>
                            <p>Life teams to a common of cloud knowledge.</p>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a rel="noopener" target="_blank" href={process.env.NEXT_PUBLIC_PLAY_URL}>
                          <figure>
                            <img className="img-full" src="/images/hand-on-labs.svg" alt="" />
                          </figure>
                          <div className="link-txt">
                            <label>Hands-on Labs</label>
                            <p>Objective-driven. Proven to build cloud skills</p>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a rel="noopener" target="_blank" href={`${process.env.NEXT_PUBLIC_PLAY_URL}/sandbox`}>
                          <figure>
                            <img className="img-full" src="/images/cloud-sand.svg" alt="" />
                          </figure>
                          <div className="link-txt">
                            <label>Cloud Sandboxes</label>
                            <p>Risk-free cloud sandboxes for AWS, GCP, and Azure</p>
                          </div>
                        </a>
                      </li>
                    </ul> */}
                    {/* </div>  */}
                  </>
                )}
            </div>

            <div className="header-right">
              {!headless &&
                !pathName.includes("/careers/[career]") &&
                !pathName.includes("/careers/apply") && (
                  <>
                    {/* <div className="nav navcloser">
                    <ul>
                      <li>
                        <a rel="noopener" target="_blank" href={process.env.NEXT_PUBLIC_PLAY_URL}>
                          Hands-on Labs
                        </a>
                      </li>
                      <li>
                        <a
                          rel="noopener"
                          target="_blank"
                          href={`${process.env.NEXT_PUBLIC_PLAY_URL}/sandbox`}
                        >
                          Sandbox
                        </a>
                      </li>
                      <li>
                        <a
                          rel="noopener"
                          target="_blank"
                          href={process.env.NEXT_PUBLIC_BUSINESS_URL}
                        >
                          For Business
                        </a>
                      </li>
                      <li>
                        <Link href="/pricing">
                          <a>Pricing</a>
                        </Link>
                      </li>
                    </ul>
                  </div> */}
                    <div
                      className="icon-search desktop"
                      onClick={() => {
                        setHeaderSearchOpen(!headerSearchOpen);
                      }}
                      style={{
                        color: "#1F2430",
                        fontSize: "19px",
                        padding: "15px",
                        cursor: "pointer",
                        transition: "0.2s all",
                      }}
                    >
                      <i className="icon icon-font-search"></i>
                    </div>
                    <div className={`cart-block ${isBreakpoint && cartMenu ? "open" : ""}`}>
                      <div
                        className={`icon-group ${
                          cookie.get("signupmodal") && !cookie.get("client")
                            ? "background-blurr"
                            : ""
                        }`}
                        onClick={() => {
                          setCartMenu(!cartMenu);
                        }}
                      >
                        <div className="icon-cart">
                          {/* <Link href="/cart"> */}
                          <p
                            style={{
                              margin: 0,
                            }}
                            // href="#"
                            onClick={(e) => openCartPage(e)}
                            className="icon icon-font-cart"
                          ></p>
                          {/* </Link> */}
                          <span>{cart_count}</span>
                        </div>
                      </div>
                      {
                        !pathName.includes('cart') && <>
                          <div className="cart-list-menu">
                        <div className="btn-close" onClick={() => setCartMenu(false)}>
                          Close
                        </div>

                        {!loading ? (
                          cartItems && cartItems.length ? (
                            <div className="cart-data">
                              <ul>
                                <div className="overflow-handle">
                                  {cartItems.map((item, index) => {
                                    let courseType = item.selectedCourseType;

                                    console.log(courseType);
                                    let str = [];
                                    if (
                                      courseType.length == 1 &&
                                      courseType[0].includes("sandbox-")
                                    ) {
                                      let validity = courseType[0].split("-");
                                      validity[validity.length - 1] == 1
                                        ? str.push(
                                            `SANDBOX (${validity[validity.length - 1]} Month)`
                                          )
                                        : str.push(
                                            `SANDBOX (${validity[validity.length - 1]} Months) `
                                          );
                                    } else {
                                      courseType.includes("pt") ? str.push("PT") : "";
                                      courseType.includes("oc") ? str.push("VC") : "";
                                      courseType.includes("lab") ? str.push("LABS") : "";
                                      courseType.includes("sandbox") ? str.push("SANDBOX") : "";
                                    }
                                    return (
                                      <div className="cart-item" key={index}>
                                        <div className="cart-item-left">
                                          <img
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
                                        </div>
                                        <div className="cart-item-right">
                                          <p>{item.courseName}</p>
                                          <p>[{str.join(" , ")}]</p>
                                          <span className="price">
                                            {currency.symbol}
                                            {item.total.toFixed(2)}
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                                <div className="cart-footer">
                                  <p className="total-amount">
                                    Total : {currency.symbol}
                                    {subTotal.toFixed(2)}
                                  </p>
                                  <Link href="/cart">
                                    <button>Go To Cart</button>
                                  </Link>
                                </div>
                              </ul>
                            </div>
                          ) : (
                            <div className="empty-cart">
                              <p>Your Cart is Empty</p>
                              <p>Keep browsing to find a course!</p>
                              <Link href="/library">
                                <button>Find a Course</button>
                              </Link>
                            </div>
                          )
                        ) : (
                          <div className="empty-cart">
                            <p>Your Cart is Empty</p>
                            <p>Keep browsing to find a course!</p>
                            <Link href="/library">
                              <button>Find a Course</button>
                            </Link>
                          </div>
                        )}
                      </div>
                        </>
                      }
                    </div>
                  </>
                )}
              {staticpage && !router.asPath.includes("/training/library") && (
                <>
                  <div
                    style={{ marginRight: "300px", fontFamily: "'Poppins', sans-serif" }}
                    className="nav"
                  >
                    <ul style={{ fontSize: "14px" }}>
                      <li>
                        <a href="/training/library">Home</a>
                      </li>
                      <li>
                        <a href="#whats-included">Course OverView</a>
                      </li>
                      <li>
                        <a href="#examformat">Exam Information</a>
                      </li>
                      <li>
                        <a href="#faq">FAQ's</a>
                      </li>
                      <li>
                        <a href="#reviews">Reviews</a>
                      </li>
                    </ul>
                  </div>
                  {!staticpage && (
                    <>
                      <div className={`cart-block ${isBreakpoint && cartMenu ? "open" : ""}`}>
                        <div
                          className={`icon-group ${
                            cookie.get("signupmodal") && !cookie.get("client")
                              ? "background-blurr"
                              : ""
                          }`}
                          onClick={() => {
                            setCartMenu(!cartMenu);
                          }}
                        >
                          <div className="icon-cart">
                            {/* <Link href="/cart"> */}
                            <p
                              style={{
                                margin: 0,
                              }}
                              // href="#"
                              // onClick={(e) => openCartPage(e)}
                              className="icon icon-font-cart"
                            ></p>
                            {/* </Link> */}
                            <span>{cart_count}</span>
                          </div>
                        </div>
                        {
                          !pathName.includes('cart') && <>
                                                    <div className="cart-list-menu">
                          <div className="btn-close" onClick={() => setCartMenu(false)}>
                            Close
                          </div>

                          {!loading ? (
                            cartItems && cartItems.length ? (
                              <div className="cart-data">
                                <ul>
                                  <div className="overflow-handle">
                                    {cartItems.map((item, index) => {
                                      let courseType = item.selectedCourseType;

                                      console.log(courseType);
                                      let str = [];
                                      if (
                                        courseType.length == 1 &&
                                        courseType[0].includes("sandbox-")
                                      ) {
                                        let validity = courseType[0].split("-");
                                        validity[validity.length - 1] == 1
                                          ? str.push(
                                              `SANDBOX (${validity[validity.length - 1]} Month)`
                                            )
                                          : str.push(
                                              `SANDBOX (${validity[validity.length - 1]} Months) `
                                            );
                                      } else {
                                        courseType.includes("pt") ? str.push("PT") : "";
                                        courseType.includes("oc") ? str.push("VC") : "";
                                        courseType.includes("lab") ? str.push("LABS") : "";
                                        courseType.includes("sandbox") ? str.push("SANDBOX") : "";
                                      }
                                      return (
                                        <div className="cart-item" key={index}>
                                          <div className="cart-item-left">
                                            <img
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
                                          </div>
                                          <div className="cart-item-right">
                                            <p>{item.courseName}</p>
                                            <p>[{str.join(" , ")}]</p>
                                            <span className="price">
                                              {currency.symbol}
                                              {item.total.toFixed(2)}
                                            </span>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                  <div className="cart-footer">
                                    <p className="total-amount">
                                      Total :{currency.symbol}
                                      {subTotal.toFixed(2)}
                                    </p>
                                    <Link href="/cart">
                                      <button>Go To Cart</button>
                                    </Link>
                                  </div>
                                </ul>
                              </div>
                            ) : (
                              <div className="empty-cart">
                                <p>Your Cart is Empty</p>
                                <p>Keep browsing to find a course!</p>
                                <Link href="/library">
                                  <button>Find a Course</button>
                                </Link>
                              </div>
                            )
                          ) : (
                            <div className="empty-cart">
                              <p>Your Cart is Empty</p>
                              <p>Keep browsing to find a course!</p>
                              <Link href="/library">
                                <button>Find a Course</button>
                              </Link>
                            </div>
                          )}
                        </div>
                          </>
                        }
                      </div>
                    </>
                  )}
                </>
              )}

              {!pathName.includes("/careers/[career]") && !pathName.includes("/careers/apply") ? (
                <>
                  {loggedIn && userData && userData.data ? (
                    <>
                      <div className="user-login-block">
                        {
                          <a
                            className={
                              email_verified == false
                                ? "icon-notification active icon_dance"
                                : "icon-notification"
                            }
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenNotification(!openNotification);
                            }}
                          >
                            <i className="icon icon-font-notification"></i>
                            <span></span>
                          </a>
                        }
                        <div className={`user-block ${isBreakpoint && profileMenu ? "open" : ""}`}>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setProfileMenu(!profileMenu);
                            }}
                          >
                            <figure>
                              <div>
                                <UserAvatar
                                  img={userData.data.profile_img}
                                  alt={userData.data.name.first}
                                  username={userData.data.name.first}
                                  email={userData.data.user_email}
                                  width={40}
                                  height={40}
                                  background={"#F98600"}
                                />
                              </div>

                              {/* <img
                            className="img-full"
                            src={
                              userData.data.profile_img
                                ? process.env.NEXT_PUBLIC_LEARN_MEDIA_URL +
                                  userData.data.profile_img
                                : "/images/user-not-found.svg"
                            }
                            alt=""
                          /> */}
                            </figure>
                            <i className="icon icon-font-dropdown-arrow-sharp"></i>
                          </a>
                          <div className="user-profile-menu">
                            <ul className="user-name">
                              <li>
                                <p style={{ padding: "0.12rem 0" }}>
                                  Hello,{" "}
                                  <strong>
                                    {userData.data.name.first}          
                                  </strong>                                  
                                </p>
                                {email_verified == true && (
                                      <i
                                        className="icon icon-font-verified-buyes"
                                        style={{
                                          display: "inline-block",marginTop:'1px', fontSize:'16px',
                                          marginLeft: "6px",
                                          color: "#4CAF50",
                                        }}
                                      ></i>
                                    )}
                                <div className="btn-close" onClick={() => setProfileMenu(false)}>
                                  Close
                                </div>
                              </li>
                              <li>
                                {/* <div style={{display:"flex",justifyContent:"space-between"}}>
                              <div>{plan_toshow != null ? plan_toshow.title :
                                purchased == 0 ? <>Free</> : <>Basic</>
                              }</div>
                              <div onClick={(e)=>{
                                e.preventDefault();
                                window.open("/pricing","_self")
                              }}
                              style={{cursor:"pointer"}}
                              >{upgrade ? <>Upgrade Now </> : <></>}</div>
                            </div> */}
                                <div className="plan-types">
                                  <figure>
                                    <img
                                      className="img-full"
                                      src={`/${plan_toshow?.images}`}
                                      alt=""
                                    />
                                  </figure>
                                  <span className={`${plan_toshow?.classname}`}>
                                    {plan_toshow?.title}
                                  </span>
                                  {upgrade && (
                                    <a
                                      className="link-upgrade"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        window.open("/pricing", "_self");
                                      }}
                                    >
                                      Upgrade
                                    </a>
                                  )}
                                </div>
                              </li>
                            </ul>
                            <ul>
                              <li>
                                <a href={`${process.env.NEXT_PUBLIC_LMS_URL}/dashboard`}>
                                  Dashboard
                                </a>
                              </li>

                              {/* <li>
                                <a href={`${process.env.NEXT_PUBLIC_LMS_URL}/my-courses`}>
                                  My Courses
                                </a>
                              </li> */}
                              <li>
                                <a href={`/my-wishlist`}>
                                  My Wishlist{" "}
                                  {whislist.length > 0 && (
                                    <span className="counter">{whislist.length || 0}</span>
                                  )}
                                </a>
                              </li>
                              {/*  <li>
                                  <a href="https://www.whizlabs.com/revert-old-version/">Switch to old UI</a>
                                </li> */}
                            </ul>
                            <ul style={{ padding: "5px 0" }}>
                              <li>
                                <a href={process.env.NEXT_PUBLIC_PLAY_URL} target="_blank">
                                  Hands-on Labs
                                </a>
                                <a
                                  href={`${process.env.NEXT_PUBLIC_PLAY_URL}/sandbox`}
                                  target="_blank"
                                >
                                  {/* Sandbox */}
                                  Cloud Playground
                                </a>
                              </li>
                            </ul>
                            <ul>
                              {/* <li>
                                <Link href="/my-account">
                                  <a>My Account</a>
                                </Link>
                              </li> */}
                              {/*<li>
                                <Link href="/my-account">
                                  <a>My Profile</a>
                                </Link>
                              </li>
                              */}
                              <li>
                                <Link href="/my-account">
                                  <a>My Account</a>
                                </Link>
                              </li>
                              <li style={{ cursor: "pointer" }}>
                                <a className="logout-link" onClick={() => logout()}>
                                  Logout
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div
                        ref={notifiref}
                        className={
                          openNotification ? "notification-menu open" : "notification-menu"
                        }
                      >
                        <div className="head">
                          <span>Notifications</span>
                          {/* <a href="#">Settings</a> */}
                        </div>
                        <ul className="mid">
                          {/* <li className={email_verified == false?"unread":""} onClick={(e)=>{
                            e.preventDefault();
                            router.push('/my-account/?ref=account')
                          }}> */}
                          <li
                            className={notificationRead ? "" : "unread"}
                            onClick={handleNotificationClick}
                          >
                            <div className="left">
                              <i className="icon icon-font-notification2"></i>
                            </div>
                            <div className="right">
                              <p>
                                {email_verified == false ? (
                                  <>
                                    <p>Verify your email address </p>
                                  </>
                                ) : (
                                  <>
                                    <p>Your Email Address verified successfully </p>
                                  </>
                                )}
                              </p>
                              {/* <span>2 hours ago</span> */}
                            </div>
                          </li>
                        </ul>
                        <div className="link-viewall">{/* <a href="#">View All</a> */}</div>
                      </div>
                    </>
                  ) : (
                    <>
                      {
                        <div className="login-group">
                          <a
                            className="link-signin"
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              if (router.pathname.includes("cart")) {
                                updateCartAfterSigninAction(true);
                              }
                              openSignInModal();
                            }}
                          >
                            Sign in
                          </a>
                          <a
                            className="btn link-signup"
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              if (router.pathname.includes("cart")) {
                                updateCartAfterSigninAction(true);
                              }
                              openSignUpModal();
                            }}
                          >
                            Sign up
                          </a>
                        </div>
                      }
                    </>
                  )}
                </>
              ) : (
                <>
                  <Link href="/careers">
                    <a className="btn-back-careers">
                      <i className="icon icon-font-arrow-right"></i>
                      <span>Back to Careers</span>
                    </a>
                  </Link>
                </>
              )}
            </div>
            {!headless &&
              !pathName.includes("/careers/[career]") &&
              !pathName.includes("/careers/apply") && (
                <>
                  <div className="mobile-mode">
                    <div className="hamburger">
                      {/* <i
                        className="icon-font-hamburger"
                        onClick={() => {
                          setMenuOpen(!menuOpen);
                          setHeaderSearchOpen(false);
                        }}
                      ></i> */}
                      <MenuIcon
                        className="hamburger-icon"
                        onClick={() => {
                          setMenuOpen(!menuOpen);
                          setHeaderSearchOpen(false);
                          document.body.classList.add("o-hidden");
                        }}
                      />
                    </div>
                    <div className="icon-search">
                      <i
                        className="icon icon-font-search"
                        onClick={() => {
                          setHeaderSearchOpen(!headerSearchOpen);
                        }}
                      ></i>
                    </div>
                  </div>
                  {/* <div className={isBreakpoint && menuOpen ? "mobile-nav open" : ""}> */}
                  {/* </div> */}
                </>
              )}
          </div>
          {!isBreakpoint && menuOpen && (
            <div className="container">
              <div ref={ref} className="dropdown-menu open  desktop ">
                <Menus
                  logout={logout}
                  userData={userData}
                  setMenuOpen={setMenuOpen}
                  menuOpen={menuOpen}
                  menusList={menusList}
                  handleSignIn={openSignInModal}
                  handleSignUp={openSignUpModal}
                />
              </div>
            </div>
          )}
          {isBreakpoint && menuOpen && (
            <>
              <div className="dropdown-menu open mobile">
                <MenuMobile
                  logout={logout}
                  userData={userData}
                  setMenuOpen={setMenuOpen}
                  menuOpen={menuOpen}
                  menusList={menusList}
                  handleSignIn={openSignInModal}
                  handleSignUp={openSignUpModal}
                />
                <div
                  className={`transparent-head`}
                  id="transperent-head"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("mobilenav").classList.add("mobile-nav-close");
                    document
                      .getElementById("transperent-head")
                      .classList.add("transparent-head-close");
                    setTimeout(() => {
                      setMenuOpen(false);
                      document.body.classList.remove("o-hidden");
                    }, 300);
                  }}
                ></div>
              </div>
            </>
          )}
        </header>
        {isBreakpoint && (
          <div
            className="mobile-header-new"
            style={{
              width: "100%",
              height: "40px",
              padding: "8px",
              position: "sticky",
              display: "block",
              zIndex: "99",
              background: "white",
              borderTop: "1px solid #eeeeee",
              borderBottom: "1px solid #eeeeee",
              transition: "all 0.1s linear",
            }}
          >
            <div className={containerSmall ? "container-small" : "container"}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                {/* <Link href={process.env.NEXT_PUBLIC_BUSINESS_URL}>
                <a
                  className="btn"
                  style={{
                    height: "25px",
                    lineHeight: "25px",
                    background: "#F06421",
                  }}
                  target="_blank"
                >
                  Business
                </a>
              </Link> */}
                <div className="box-mobile">
                  {/* <Link href="/library"> Library</Link> */}
                  <div
                    onClick={() => {
                      router.push("/library");
                    }}
                  >
                    Library
                  </div>
                </div>
                <div
                  className="box-mobile platform-mobile-m"
                  onClick={(e) => {
                    mobileplatform(e);
                  }}
                >
                  Platform
                </div>
                {user_type != "amazon" && (
                  <>
                    <div className="box-mobile">
                      {/* <Link href="/pricing">Pricing</Link> */}
                      <div
                        onClick={() => {
                          router.push("/pricing");
                        }}
                      >
                        Pricing
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            {mobilepf && (
              <>
                <div className="mobile-optimized-platform">
                  <ul className="list-menu">
                    <li>
                      <a href="/platform/practice-test">
                        <figure>
                          <img className="img-full" src="/images/exam-simu.svg" alt="" />
                        </figure>
                        <div className="link-txt">
                          <label>Exam Simulators</label>
                          <p>Learn faster. Move faster. Transform now with Exam Simulators</p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="/platform/self-study-video-courses">
                        <figure>
                          <img className="img-full" src="/images/video-course.svg" alt="" />
                        </figure>
                        <div className="link-txt">
                          <label>Video Courses</label>
                          <p>Real-time courses crafted by Experts</p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href={process.env.NEXT_PUBLIC_PLAY_URL}>
                        <figure>
                          <img className="img-full" src="/images/hand-on-labs.svg" alt="" />
                        </figure>
                        <div className="link-txt">
                          <label>Hands-on Labs</label>
                          <p>Objective-driven. Proven to build cloud skills</p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        // rel="noopener"
                        // target="_blank"
                        href={`${process.env.NEXT_PUBLIC_PLAY_URL}/sandbox`}
                      >
                        <figure>
                          <img className="img-full" src="/images/cloud-sand.svg" alt="" />
                        </figure>
                        <div className="link-txt">
                          <label>Cloud Sandboxes</label>
                          <p>Risk-free cloud sandboxes for AWS, GCP, Azure, and Power BI</p>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        )}

        {!headless &&
          !pathName.includes("/careers/[career]") &&
          !pathName.includes("/careers/apply") && (
            <HeaderSearch
              searchCourses={searchCourses}
              setHeaderSearchOpen={setHeaderSearchOpen}
              isOpen={headerSearchOpen}
              userData={userData}
            />
          )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  let plan_details = [
    { title: "Free", classname: "free-plan", images: "images/free-img.webp" },
    { title: "Basic", classname: "basic-plan", images: "images/basic-img.svg" },
    { title: "Standard", classname: "standard-plan", images: "images/standard-img.svg" },
    { title: "Premium", classname: "premium-plan", images: "images/premium-img.svg" },
    { title: "Premium Plus", classname: "premiumPlus-plan", images: "images/premium-plus-img.svg" },
  ];
  return {
    cart: state.cart.cart,
    subscriptionData: state.cart.subscriptions,
    searchCourses: state.searchAllCourses.searchCourses,
    authDataRegister: state.authData.authDataRegister,
    loginmessage: state.authData.loginmessage,
    userData: state.authData.userData,
    whislist: state.whislist.whislist,
    redirectTo: state.redirectData.redirect_to,
    currencyData: state.ipDetails.currency_detail,
    updateCartstate: state.cart.updateaftersignin,
    redirectUrl: state.redirectData.redirect_url,
    profile: state.profile,
    plan_details: plan_details,
    email_verified: state.userProfileData.email_verified,
    cart_count: state.cart.cart_count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authRegisterAction: (data, path) => dispatch(authRegister(data, path)),
    authLoginAction: (data, path) => dispatch(authLogin(data, path)),
    authLogoutAction: () => dispatch(authLogout()),
    clearCartAction: () => dispatch(clearCart()),
    socialLogin: (data) => dispatch(authSocialLogin(data)),
    redirectionAction: (data) => dispatch(updateRedirection(data)),
    updateUserProfile: (userToken) => dispatch(storeUserProfile(userToken)),
    updateEMail: (user_id) => dispatch(checkEmailVerified(user_id)),
    updateCartAfterSigninAction: (data) => dispatch(updateCartAfterLogin(data)),
    storeCartCountAction: (count) => dispatch(updateCartCount(count)),
    // saveAfterSignupData: (data) => dispatch(saveAfterSignupDetails(data)),
    alertBoxAction: (data) => dispatch(alertBox(data)),
    // updateSateOfCartAfterLoginAction: (cart, currency, userData) =>
    //   dispatch(updateSateOfCartAfterLogin(cart, currency, userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
