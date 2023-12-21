import { CallToAction, StarRating } from "@/components/import";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import React from "react";
import { connect, useDispatch } from "react-redux";
import { alertBox } from "redux/AlertBox/alert-actions";
import { StoreWhishlist } from "redux/whislist/whislist-actions";
import axios from "axios";
import { PreviewCourseModal } from "@/components/shared/Modals";
import Head from "next/head";
import { convertToTitleCase } from "helpers/CustomHelpers";
import Cookies from "js-cookie";

import { addToCart, removeFromCart, updateCartCount } from "redux/AddToCart/cart-actions";
import { updateRedirection } from "redux/Redirection/redirect-actions";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LabsLibrary from "@/components/shared/LabsLibrary";
import SandboxLibrary from "@/components/shared/SandboxLibrary";
import { RotatingLines } from "react-loader-spinner";
import * as Libdata from "../lib/Library_lib";
import LibraryCourses from "@/components/shared/LibraryCourse";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const playUrl = process.env.NEXT_PUBLIC_PLAY_URL_PYTHON;
const Category = ({
  userData,
  whislist,
  addWhislist,
  alertBoxAction,
  currencyData,
  cartData,
  userSubscriptionplans,
  removeFromCartStore,
  storeCartCountAction,
  updateaftersignin,
  addToCartStore,
  removeFromCartAction,
  seoHomePageData,
  userSubscriptionData,
  coursesEnrolled
}) => {
  const moreCourseSlug = Cookies.get("moreCourseSlug");
  const dispatch = useDispatch();

  // console.log(moreCourseSlug, "more")
  const [checkedCategories, setCheckedCategories] = useState([]);
  // console.log(checkedCategories, "checkedCategories")
  const [checkedProductTypes, setCheckedProductTypes] = useState([]);
  const [checkedCourseLevels, setCheckedCourseLevels] = useState([]);
  const [checkedLanguages, setCheckedLanguages] = useState([]);
  const [sortedValue, setSortedValue] = useState(1);
  const [courses, setCourses] = useState([]);
  const [currency, setCurrency] = useState(null);
  const [sub_nt_exp, setSubntexp] = useState(false);
  const [winwidth, setwinwidth] = useState(0);
  const [clicked, setclicked] = useState(false);
  const [loading, setloading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [expanded, setExpanded] = useState<string | false>("panel1");
  const [activeTab, setActiveTab] = useState("all");
  const [disablecheckbox, setdiasblecheckbox] = useState(false);
  const loader = useRef(null);
  const [expired, setExpired] = useState([]);
  const [page, setPage] = useState(1);
  const [count_loading, setCountLoading] = useState(false);
  const [pagination, setPagination] = useState({
    lastPage: null,
  });
  const [previewData, setPreviewData] = useState({
    courseImage: "",
    isOcAvailable: false,
    demoVideoLink: "",
    courseTitle: "",
    courseSlug: "",
    sellLevel: "",
    totaRatingCount: 0,
    averageRating: 0,
    courseLevel: "",
    courseDescription: "",
    detailedInfo: [],
    isPtComingSoon: false,
    isOcComingSoon: false,
  });

  const [subscribesUser,setSubscribedUser] = useState(false)
  const [courseBought,setCoursesBought] = useState([])

  useEffect(() => {
    if (window) {
      setwinwidth(window.innerWidth);
    }
    const handlesize = () => {
      setwinwidth(window.innerWidth);
    };
    window.addEventListener("resize", handlesize);
    return () => {
      window.removeEventListener("resize", handlesize);
    };
  }, []);

  useEffect(() => {
    if (currencyData) setCurrency(currencyData);
  }, [currencyData]);

  useEffect(()=>{ 
    if(userSubscriptionData && userSubscriptionData.active_plans){
      let plans = userSubscriptionData.active_plans.filter((itm)=>itm.is_plan_active == true)
      if(plans.length > 0){
        setSubscribedUser(true)
      }else{
        let course_id =[]
        coursesEnrolled.forEach((itm)=>{
         for(let key in itm.enrollment_details){
          let end_date = itm.enrollment_details[key].end_date
          let end_date_utc = new Date(new Date(end_date).toISOString()).getTime()
          let now_utc = new Date(new Date().toISOString()).getTime()
          if(end_date_utc > now_utc){
            let present = course_id.find((x)=> x == itm.course_id)
            if(!present){
              course_id.push(itm.course_id)
            }
          }
         }
        })
       setCoursesBought(course_id)
      }
    }
  },[userSubscriptionData,coursesEnrolled])

  const getExpired = async () => {
    // const  arr = checkedCategories
    let arr = [];
    if (moreCourseSlug) {
      setCheckedCategories([parseInt(moreCourseSlug)]);
      arr = [parseInt(moreCourseSlug)];
      if (checkedCategories.length > 0) {
        document.cookie = `moreCourseSlug=${checkedCategories[0]}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    } else {
      arr = checkedCategories;
    }
    const c_type = checkedProductTypes;
    const c_level = checkedCourseLevels;
    const c_lang = checkedLanguages;
    const encodedArray = encodeURIComponent(JSON.stringify(arr));
    const encodedArray1 = encodeURIComponent(JSON.stringify(c_type));
    const encodedArray2 = encodeURIComponent(JSON.stringify(c_level));
    const encodedArray3 = encodeURIComponent(JSON.stringify(c_lang));
    await axios
      .get(
        `${baseUrl}/courses?per_page=${30}&course_page_id_arr=${encodedArray}&for_web=true&arr_product_type=${encodedArray1}&courseLevel=${encodedArray2}&language=${encodedArray3}&page=${1}&sorting=${sortedValue}&is_expired=${true}`
      )
      .then((resp) => {
        if (resp.data.data) {
          setExpired(resp.data.data);
        }
      });
  };

  const getcourses = async () => {
    let arr = [];
    if (moreCourseSlug) {
      setCheckedCategories([parseInt(moreCourseSlug)]);
      arr = [parseInt(moreCourseSlug)];
      if (checkedCategories.length > 0) {
        document.cookie = `moreCourseSlug=${checkedCategories[0]}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    } else {
      arr = checkedCategories;
    }
    const c_type = checkedProductTypes;
    const c_level = checkedCourseLevels;
    const c_lang = checkedLanguages;
    const encodedArray = encodeURIComponent(JSON.stringify(arr));
    const encodedArray1 = encodeURIComponent(JSON.stringify(c_type));
    const encodedArray2 = encodeURIComponent(JSON.stringify(c_level));
    const encodedArray3 = encodeURIComponent(JSON.stringify(c_lang));
    await axios
      .get(
        `${baseUrl}/courses?per_page=${15}&course_page_id_arr=${encodedArray}&for_web=true&arr_product_type=${encodedArray1}&courseLevel=${encodedArray2}&language=${encodedArray3}&page=${page}&sorting=${sortedValue}`
      )
      .then((resp) => {
        if (resp.data.data) {
          if (page != 1) {
            setCourses([...courses, ...resp.data.data]);
          } else {
            setCourses(resp.data.data);
          }
          setPagination({
            lastPage: resp.data?.pagination?.lastPage,
          });
        }
      });

    setloading(false);
  };
  const getCounts = async () => {
    await axios.get(`${baseUrl}/courses/libcounts`).then((resp) => {
      if (resp.data) {
        let category = resp.data.categorycount;
        Libdata.categoryList.forEach((itm) => {
          let cat = category.find((x) => x.course_page_id == itm.id);
          if (cat) {
            itm.count = parseInt(cat.count);
          }
        });
        Libdata.categoryList.sort((a, b) => b.count - a.count);
        let product = resp.data.products_count;
        Libdata.productTypeList.forEach((itm) => {
          let prod = product.find((y) => y.product_type == itm.shortname);
          if (prod) {
            itm.count = parseInt(prod.count);
          }
        });
        let clevel = resp.data.rows;
        Libdata.courseLevels.forEach((itm) => {
          let level = clevel.find((x) => x.course_level == itm.name);
          if (level) {
            itm.count = parseInt(level.count);
          }
        });
        setCountLoading(false);
      }
    });
  };
  useEffect(() => {
    setCountLoading(true);
    getCounts();
    getExpired();
  }, []);

  useEffect(() => {
    setloading(true);
    setExpired([]);
    setPage(1);
    getcourses();
    getExpired();
  }, [
    moreCourseSlug,
    checkedCategories,
    checkedProductTypes,
    checkedCourseLevels,
    checkedLanguages,
    sortedValue,
  ]);

  useEffect(() => {
    if (!count_loading) {
      setloading(true);
      getcourses();
    }
  }, [page, count_loading]);

  const handlepage = (temp) => {
    if (temp) {
      setPage(page + 1);
    } else {
      let tmp = 1;
      setPage(tmp + 0);
    }
  };
  useEffect(() => {
    if (userSubscriptionplans) {
      let status = false;
      userSubscriptionplans.active_plans.map((itm) => {
        status = status || itm.is_plan_active;
      });
      setSubntexp(status);
    }
  }, [userSubscriptionplans]);

  const calculateOldPrice = (data) => {
    let returnTotal: any = 0;
    if (data && data.products && data.products?.length > 0) {
      data.products.map((item) => {
        if (
          item.product_type !== "FT" &&
          item.product_type !== "ILT" &&
          item &&
          item.regular_price &&
          item.regular_price[currency.type]
        ) {
          returnTotal = Number(returnTotal) + Number(item.regular_price[currency.type]);
        }
      });
    }
    return currency.symbol + parseFloat(returnTotal).toFixed(2);
  };

  const calculateFixedPrice = (data, forDisplay = true) => {
    let returnTotal: any = 0;
    if (data && data.products && data.products?.length > 0) {
      data.products.map((item) => {
        if (
          item.product_type !== "FT" &&
          item.product_type !== "ILT" &&
          item &&
          item.sale_price &&
          item.sale_price[currency.type]
        ) {
          returnTotal = Number(returnTotal) + Number(item.sale_price[currency.type]);
        }
      });
    }
    return currency.symbol + parseFloat(returnTotal).toFixed(2);
  };

  const checkWhislistStatus = (course_id) => {
    if (whislist.includes(course_id)) {
      return "active";
    } else {
      return "";
    }
  };

  const openPreviewModal = (datas) => {
    if (datas && datas.seo_details && datas.products && datas.products?.length > 0) {
      const product = datas.products.find(item => item.product_type === "OC" && item.other_details && item.other_details.video_link);
      const ptComingSoon = datas.products.find(
        (item) => item.product_type === "PT" && item.is_comingsoon === "1"
      );
      const ocComingSoon = datas.products.find(
        (item) => item.product_type === "OC" && item.is_comingsoon === "1"
      );
      let PTvailable = ptComingSoon ? true : false;
      let OCvailable = ocComingSoon ? true : false;
      let vailable = product ? true : false;
      let vailableDemo = product ? product.other_details.video_link : null;
        setPreviewData({
          isOcAvailable: vailable,
          demoVideoLink: vailableDemo,
          sellLevel: datas.seo_details?.sell_level,
          courseImage:
            process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
            datas?.seo_details?.featured_image?.replace("media/", ""),
          courseTitle: datas.seo_details?.title,
          courseSlug: datas.seo_details?.slug,
          totaRatingCount: datas.ratings.rating,
          averageRating: datas.ratings?.overall_rating,
          courseLevel: datas.other_attributes?.course_level,
          courseDescription: datas.description,
          detailedInfo: datas.detailedInfo,
          isPtComingSoon: PTvailable,
          isOcComingSoon: OCvailable,
        });
      document.querySelector("body").classList.add("open-modal-preview-course");
    }
  };

  const handleWhislist = (e, product_id, user_id) => {
    addWhislist(product_id, user_id, currency.type);
    alertBoxAction({
      type: "SUCCESS",
      title: "Success",
      msg: "Your whishlist is updated",
    });
  };

  const handleCategoriesFilterChange = (value) => {
    const currentIndex = checkedCategories.indexOf(value);
    const newChecked = [...checkedCategories];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedCategories(newChecked);
  };

  const handleProductTypesFilterChange = (value) => {
    const currentIndex = checkedProductTypes.indexOf(value);
    const newChecked = [...checkedProductTypes];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedProductTypes(newChecked);
  };

  const handleCourseLevelFilterChange = (value) => {
    const currentIndex = checkedCourseLevels.indexOf(value);
    const newChecked = [...checkedCourseLevels];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedCourseLevels(newChecked);
  };
  const handleLanguageFilterChange = (value) => {
    const currentIndex = checkedLanguages.indexOf(value);
    const newChecked = [...checkedLanguages];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedLanguages(newChecked);
  };

  const handleChangeAccordion =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const changeSorting = (e) => {
    e.preventDefault();
    if (e.target.value) {
      setSortedValue(e.target.value);
    }
  };

  const handleFilterClear = () => {
    setCheckedCategories([]);
    setCheckedProductTypes([]);
    setCheckedCourseLevels([]);
    setCheckedLanguages([]);
  };

  const findcartcourse = (id) => {
    let present = cartData.findIndex((itm) => itm.courseId == id);
    return present;
  };
  const checkSuccess = () => {
    setTimeout(() => {
      selectedCourse.forEach((itm, ie) => {
        let present = findcartcourse(itm);
        if (present != -1) {
          selectedCourse.splice(ie, 1);
        }
      });
      setloading(false);
    }, 2000);
  };

  const changeTab = (e, type) => {
    e.preventDefault();
    setActiveTab(type);
  };
  const gettime = (temp) => {
    let date = new Date(temp).getDate();
    let month = new Date(temp).getMonth();
    let year = new Date(temp).getFullYear();
    var mS = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    return mS[month] + " " + date + ", " + year;
  };

  const [handleAddProductToCartLoading, setHandleAddProductToCartLoading] = useState(false);
  const [currentLoading, setCurrentlyLoading] = useState({
    courseId: null,
  });
  const [cartItems, setCartItems] = useState([]);

  const handleCartForChild = async (e) => {
    if(subscribesUser || courseBought.includes(e.id)){
      window.open(
        `${process.env.NEXT_PUBLIC_LMS_URL}/course/${e.seo_details?.slug}/${e.id}`
      );
    }else{
      const inCart = cartData.find((item) => item.courseId === e.id);
      if (userData) {
        if (inCart) {
          // for await (let item of inCart.selectedCourseType) {
          //   await handleRemoveFromcart(e.id, item);
          // }
        } else {
          setCurrentlyLoading({
            courseId: e.id,
          });
          const product_type = [];
          for (let item of e.products) {
            if ((item.is_comingsoon === "0" || item.is_comingsoon === "") && item.regular_price) {
              product_type.push(item.product_type.toLowerCase());
            }
          }
          await addToCartStore(e.id, product_type, currency.type);
          setCurrentlyLoading({
            courseId: null,
          });
        }
      } else {
        if (inCart) {
          // removeFromCartAction(e.id, inCart.selectedCourseType);
        } else {
          dispatch(
            addToCart(
              e.id,
              e.products
                .filter(
                  (item) =>
                    item.product_type.toLowerCase() &&
                    (item.is_comingsoon === "0" || item.is_comingsoon === "") &&
                    item.regular_price
                )
                .map((item) => item.product_type.toLowerCase()),
              currency.type.toUpperCase()
            )
          );
        }
      }
    }
  };

  const handleRemoveFromcart = async (course_id, type) => {
    if (currentLoading.courseId != null) return;
    setHandleAddProductToCartLoading(true);
    setCurrentlyLoading({
      courseId: course_id,
    });

    //some time labs is given free so when lab is included with PT OC
    //so when PT AND LAB is present or OC and LAB is present or SANDBOX and LAB is present
    //when any one is remove we need to remove labs as well
    let course = cartItems.find((itm) => itm.courseId == course_id);
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

  const getCartData = async (userToken) => {
    let CartData = await axios.get(`${baseUrl}/cart/getcartdata`, {
      headers: {
        Authorization: userToken,
      },
    });

    let cartData = [];
    if (CartData.data) {
      cartData = CartData.data.cart_details;
    }
    if (cartData && cartData.length > 0) {
      setCartItems(cartData);
      setCurrentlyLoading({
        courseId: null,
      });
    } else {
      setCartItems([]);
    }
  };

  const getCartfromCookie = async () => {
    let cart = await axios.post(`${baseUrl}/cart/getprices`, {
      cart_details: cartData,
    });
    if (cart.data.cart_details) {
      setCartItems(cart.data.cart_details);
      storeCartCountAction(cart.data.cart_details.length);
      setCurrentlyLoading({
        courseId: null,
      });
    } else {
      setCartItems([]);
    }
  };

  useEffect(() => {
    if (
      userData &&
      userData.data.token &&
      updateaftersignin == false &&
      handleAddProductToCartLoading == false
    ) {
      getCartData(userData.data.token);
    }
  }, [handleAddProductToCartLoading, updateaftersignin, userData]);

  useEffect(() => {
    if (userData == null) {
      //post method to get the current price of products
      getCartfromCookie();
    }
  }, [cartData, userData]);

  return (
    <>
      {previewData && (
        <React.Fragment>
          {/* <Head>
            <title>Whizlabs Training Courses</title>
            <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
            <meta
              name="description"
              content="Whizlabs offers online certification training in Cloud Computing, Project Management, Agile, Business Analysis, Java, Big Data, Blue Prism, Blockchain, Linux, Digital Marketing, Quality, and Networking domains."
            />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Whizlabs Training Courses" />
            <meta
              property="og:description"
              content="Whizlabs offers online certification training in Cloud Computing, Project Management, Agile, Business Analysis, Java, Big Data, Blue Prism, Blockchain, Linux, Digital Marketing, Quality, and Networking domains."
            />
            <meta property="og:url" content="https://www.whizlabs.com/library/" />
            <meta property="og:site_name" content="Whizlabs" />
            <meta
              property="og:image"
              content={
                process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60b50f90b3ff6"
              }
            />
            <meta property="fb:app_id" content="502194103558420" />
            <meta property="og:image:width" content="500" />
            <meta property="og:image:height" content="500" />
            <meta name="twitter:card" content="summary" />
            <meta
              name="twitter:description"
              content="Whizlabs offers online certification training in Cloud Computing, Project Management, Agile, Business Analysis, Java, Big Data, Blue Prism, Blockchain, Linux, Digital Marketing, Quality, and Networking domains."
            />
            <meta name="twitter:title" content="Whizlabs Training Courses" />
            <meta name="twitter:site" content="@whizlabs" />
            <meta
              name="twitter:image"
              content={
                process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60b50f90b4039"
              }
            />
            <meta name="twitter:creator" content="@whizlabs" />
          </Head> */}

          <PreviewCourseModal previewData={previewData} />
          {/* <!-- banner-part --> */}
          <div className="category-banner">
            <img src={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "banner-library.webp"} alt="banner" />
            {/* <div className="container">
              <div className="left-part">
                <ul className="breadcrumbs">
                  <li>
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/library">
                      <a>Training library</a>
                    </Link>
                  </li>
                </ul>
                <h1 className="small-banner-title">
                  Upgrade your Cloud Computing Skills with the industry experts
                </h1>
              </div>
              <div className="right-part">
                <img className="img-full" src="/images/cloud-cerified-image.jpg" alt="" />
              </div>
            </div>
            <div className="overlay"></div> */}
          </div>
          <div className="tabs-library">
            <div className="container">
              <div className="tab">
                <div
                  className={activeTab === "all" ? "tab-1 active" : "tab-1"}
                  onClick={(e) => {
                    changeTab(e, "all");
                  }}
                >
                  All
                </div>
                <div
                  className={activeTab === "labs" ? "tab-1 active" : "tab-1"}
                  onClick={(e) => {
                    changeTab(e, "labs");
                  }}
                >
                  Labs
                </div>
                <div
                  className={activeTab === "sandbox" ? "tab-1 active" : "tab-1"}
                  onClick={(e) => {
                    changeTab(e, "sandbox");
                  }}
                >
                  Sandboxes
                </div>
              </div>
            </div>
          </div>
          {activeTab === "all" && (
            <>
              {/* <!-- content area part -->  */}
              <div id="content-area" className="bg-color category-page">
                <div className="two-column">
                  <div className="container">
                    <div className="left-column">
                      {/* <!-- filter-bar --> */}
                      <div className="filter-bar">
                        <div className="filter-head">
                          <div className="title">
                            Filters (
                            {checkedCategories.length +
                              checkedProductTypes.length +
                              checkedCourseLevels.length +
                              checkedLanguages.length}
                            )
                          </div>
                          <div className="btn-clear" onClick={() => handleFilterClear()}>
                            Clear
                          </div>
                          <div className="icon-close icon icon-font-cross"></div>
                        </div>
                        <div className="filters-group">
                          <Accordion
                            square
                            defaultExpanded={true}
                            expanded={expanded === "panel1"}
                            onChange={handleChangeAccordion("panel1")}
                          >
                            <AccordionSummary
                              aria-controls={"panel1d-content0"}
                              id={"panel1d-header0"}
                              expandIcon={<ExpandMoreIcon />}
                            >
                              <div className="item">
                                <div className="filtername">Categories</div>
                              </div>
                            </AccordionSummary>
                            <AccordionDetails>
                              <ul className="item-content cat-list-lib">
                                {!loading ? (
                                  <>
                                    {Libdata.categoryList.map((data) => (
                                      <li
                                        key={data.id}
                                        onClick={(e) => {
                                          // e.preventDefault()
                                          if (window) {
                                            window.scrollTo({
                                              top: 64,
                                              left: 0,
                                              behavior: "smooth",
                                            });
                                          }
                                        }}
                                      >
                                        <label className="custom-checkbox">
                                          <input
                                            type="checkbox"
                                            disabled={disablecheckbox}
                                            onChange={() => handleCategoriesFilterChange(data.id)}
                                            checked={
                                              checkedCategories.includes(data.id) ? true : false
                                            }
                                          />
                                          <span className="checkbox-style"></span>
                                          <samp className="name">
                                            {data.categoryName}{" "}
                                            {data.count ? <span>({data.count})</span> : ``}
                                          </samp>
                                        </label>
                                      </li>
                                    ))}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </ul>
                            </AccordionDetails>
                          </Accordion>

                          <Accordion
                            square
                            defaultExpanded={false}
                            expanded={expanded === "panel2"}
                            onChange={handleChangeAccordion("panel2")}
                          >
                            <AccordionSummary
                              aria-controls={"panel1d-content1"}
                              id={"panel1d-header1"}
                              expandIcon={<ExpandMoreIcon />}
                            >
                              <div className="item">
                                <div className="filtername">Products</div>
                              </div>
                            </AccordionSummary>
                            <AccordionDetails>
                              {!loading && (
                                <>
                                  {" "}
                                  <ul
                                    className="item-content prod-list-lib"
                                    style={{ listStyle: "none" }}
                                  >
                                    {Libdata.productTypeList.map((data, i) => (
                                      <li
                                        key={i}
                                        onClick={(e) => {
                                          // e.preventDefault()
                                          if (window) {
                                            window.scrollTo({
                                              top: 64,
                                              left: 0,
                                              behavior: "smooth",
                                            });
                                          }
                                        }}
                                      >
                                        <label className="custom-checkbox">
                                          <input
                                            type="checkbox"
                                            disabled={disablecheckbox}
                                            onChange={() =>
                                              handleProductTypesFilterChange(data.shortname)
                                            }
                                            checked={
                                              checkedProductTypes.includes(data.shortname)
                                                ? true
                                                : false
                                            }
                                          />
                                          <span className="checkbox-style"></span>
                                          <samp className="name">
                                            {data.fullname}{" "}
                                            {data.count ? <span>({data.count})</span> : ``}
                                          </samp>
                                        </label>
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              )}
                            </AccordionDetails>
                          </Accordion>

                          <Accordion
                            square
                            defaultExpanded={false}
                            expanded={expanded === "panel3"}
                            onChange={handleChangeAccordion("panel3")}
                          >
                            <AccordionSummary
                              aria-controls={"panel1d-content1"}
                              id={"panel1d-header1"}
                              expandIcon={<ExpandMoreIcon />}
                            >
                              <div className="item">
                                <div className="filtername">Levels</div>
                              </div>
                            </AccordionSummary>
                            <AccordionDetails>
                              {!loading && (
                                <>
                                  {" "}
                                  <ul
                                    className="item-content prod-list-lib"
                                    style={{ listStyle: "none" }}
                                  >
                                    {Libdata.courseLevels.map((data, i) => (
                                      <li
                                        key={i}
                                        onClick={(e) => {
                                          // e.preventDefault()
                                          if (window) {
                                            window.scrollTo({
                                              top: 64,
                                              left: 0,
                                              behavior: "smooth",
                                            });
                                          }
                                        }}
                                      >
                                        <label className="custom-checkbox">
                                          <input
                                            disabled={disablecheckbox}
                                            type="checkbox"
                                            onChange={() =>
                                              handleCourseLevelFilterChange(data.value)
                                            }
                                            checked={
                                              checkedCourseLevels.includes(data.value)
                                                ? true
                                                : false
                                            }
                                          />
                                          <span className="checkbox-style"></span>
                                          <samp className="name">
                                            {data.name}{" "}
                                            {data.count ? <span>({data.count})</span> : ``}
                                          </samp>
                                        </label>
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              )}
                            </AccordionDetails>
                          </Accordion>
                          <Accordion
                            square
                            defaultExpanded={false}
                            expanded={expanded === "panel4"}
                            onChange={handleChangeAccordion("panel4")}
                          >
                            <AccordionSummary
                              aria-controls={"panel1d-content1"}
                              id={"panel1d-header1"}
                              expandIcon={<ExpandMoreIcon />}
                            >
                              <div className="item">
                                <div className="filtername">Languages</div>
                              </div>
                            </AccordionSummary>
                            <AccordionDetails>
                              {!loading && (
                                <>
                                  {" "}
                                  <ul
                                    className="item-content prod-list-lib"
                                    style={{ listStyle: "none" }}
                                  >
                                    {Libdata.languages.map((data, i) => (
                                      <li
                                        key={i}
                                        onClick={(e) => {
                                          // e.preventDefault()
                                          if (window) {
                                            window.scrollTo({
                                              top: 64,
                                              left: 0,
                                              behavior: "smooth",
                                            });
                                          }
                                        }}
                                      >
                                        <label className="custom-checkbox">
                                          <input
                                            disabled={disablecheckbox}
                                            type="checkbox"
                                            onChange={() => handleLanguageFilterChange(data.value)}
                                            checked={
                                              checkedLanguages.includes(data.value) ? true : false
                                            }
                                          />
                                          <span className="checkbox-style"></span>
                                          <samp className="name">
                                            {data.name}{" "}
                                            {data.count ? <span>({data.count})</span> : ``}
                                          </samp>
                                        </label>
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              )}
                            </AccordionDetails>
                          </Accordion>
                        </div>
                        <div className="button">
                          <button className="btn" onClick={() => handleFilterClear()}>
                            Clear
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="right-column">
                      <div className="course-listing">
                        <div className="heading">
                          <h2 className="title">Courses to get you started</h2>
                          <div className="right-part">
                            <div className="total-course">
                              {/* <strong>{courses?.length}</strong> courses */}
                            </div>
                            <div className="mobile-filter-sortby">
                              <select
                                className="sortby"
                                onChange={(e) => changeSorting(e)}
                                style={
                                  winwidth <= 640
                                    ? { maxWidth: "50% !important" }
                                    : { maxWidth: "none" }
                                }
                              >
                                <option value={1}>Popularity: High to Low</option>
                                <option value={2}>Popularity: Low to High</option>
                                <option value={3}>Most recently launched</option>
                                {/* <option value="price-high-to-low">Price: High to Low</option> */}
                                {/* <option value="price-low-to-high">Price: Low to High</option> */}
                              </select>

                              {winwidth < 1024 && (
                                <>
                                  <div
                                    className="library-filter"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      if (!clicked) {
                                        setclicked(true);
                                      } else {
                                        setclicked(false);
                                      }
                                    }}
                                  >
                                    <i
                                      className="icon icon-font-equalizer"
                                      style={{ margin: "0px" }}
                                    ></i>
                                    Filters (
                                    {checkedCategories.length +
                                      checkedProductTypes.length +
                                      checkedCourseLevels.length +
                                      checkedLanguages.length}
                                    )
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        {clicked && (
                          <>
                            <div className="overlay-library">
                              <div
                                className="transparent"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setclicked(false);
                                }}
                              ></div>
                              <div className="content">
                                <div className="filter-bar">
                                  <div className="filter-head">
                                    <div className="title">
                                      Filters (
                                      {checkedCategories.length +
                                        checkedProductTypes.length +
                                        checkedCourseLevels.length +
                                        checkedLanguages.length}
                                      )
                                    </div>
                                    <div className="btn-clear" onClick={() => handleFilterClear()}>
                                      Clear
                                    </div>
                                    <div
                                      className="icon-close icon icon-font-cross"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setclicked(false);
                                      }}
                                    ></div>
                                  </div>
                                  <div className="button">
                                    <button className="btn" onClick={() => handleFilterClear()}>
                                      Clear
                                    </button>
                                  </div>
                                  <div className="filters-group">
                                    <Accordion square defaultExpanded={true}>
                                      <AccordionSummary
                                        aria-controls={"panel1d-content0"}
                                        id={"panel1d-header0"}
                                        expandIcon={<ExpandMoreIcon />}
                                      >
                                        <div className="item">
                                          <div className="filtername">Categories</div>
                                        </div>
                                      </AccordionSummary>
                                      <AccordionDetails>
                                        {!loading && (
                                          <ul
                                            className="item-content cat-list-lib"
                                            style={{ width: "100%" }}
                                          >
                                            {Libdata.categoryList.map((data) => (
                                              <li key={data.id}>
                                                <label className="custom-checkbox">
                                                  <input
                                                    type="checkbox"
                                                    onChange={() =>
                                                      handleCategoriesFilterChange(data.id)
                                                    }
                                                    checked={
                                                      checkedCategories.includes(data.id)
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                  <span className="checkbox-style"></span>
                                                  <samp className="name">
                                                    {data.categoryName}{" "}
                                                    {data.count ? <span>({data.count})</span> : ``}
                                                  </samp>
                                                </label>
                                              </li>
                                            ))}
                                          </ul>
                                        )}
                                      </AccordionDetails>
                                    </Accordion>

                                    <Accordion square defaultExpanded={true}>
                                      <AccordionSummary
                                        aria-controls={"panel1d-content1"}
                                        id={"panel1d-header1"}
                                        expandIcon={<ExpandMoreIcon />}
                                      >
                                        <div className="item">
                                          <div className="filtername">Products</div>
                                        </div>
                                      </AccordionSummary>
                                      <AccordionDetails>
                                        {!loading && (
                                          <ul
                                            className="item-content prod-list-lib"
                                            style={{ listStyle: "none" }}
                                          >
                                            {Libdata.productTypeList.map((data, i) => (
                                              <li key={i}>
                                                <label className="custom-checkbox">
                                                  <input
                                                    type="checkbox"
                                                    onChange={() =>
                                                      handleProductTypesFilterChange(data.shortname)
                                                    }
                                                    checked={
                                                      checkedProductTypes.includes(data.shortname)
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                  <span className="checkbox-style"></span>
                                                  <samp className="name">
                                                    {data.fullname}{" "}
                                                    {data.count ? <span>({data.count})</span> : ``}
                                                  </samp>
                                                </label>
                                              </li>
                                            ))}
                                          </ul>
                                        )}
                                      </AccordionDetails>
                                    </Accordion>

                                    <Accordion square defaultExpanded={true}>
                                      <AccordionSummary
                                        aria-controls={"panel1d-content1"}
                                        id={"panel1d-header1"}
                                        expandIcon={<ExpandMoreIcon />}
                                      >
                                        <div className="item">
                                          <div className="filtername">Levels</div>
                                        </div>
                                      </AccordionSummary>
                                      <AccordionDetails>
                                        {!loading && (
                                          <ul
                                            className="item-content prod-list-lib"
                                            style={{ listStyle: "none" }}
                                          >
                                            {Libdata.courseLevels.map((data, i) => (
                                              <li key={i}>
                                                <label className="custom-checkbox">
                                                  <input
                                                    type="checkbox"
                                                    onChange={() =>
                                                      handleCourseLevelFilterChange(data.value)
                                                    }
                                                    checked={
                                                      checkedCourseLevels.includes(data.value)
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                  <span className="checkbox-style"></span>
                                                  <samp className="name">
                                                    {data.name}{" "}
                                                    {data.count ? <span>({data.count})</span> : ``}
                                                  </samp>
                                                </label>
                                              </li>
                                            ))}
                                          </ul>
                                        )}
                                      </AccordionDetails>
                                    </Accordion>
                                    <Accordion square defaultExpanded={true}>
                                      <AccordionSummary
                                        aria-controls={"panel1d-content1"}
                                        id={"panel1d-header1"}
                                        expandIcon={<ExpandMoreIcon />}
                                      >
                                        <div className="item">
                                          <div className="filtername">Languages</div>
                                        </div>
                                      </AccordionSummary>
                                      <AccordionDetails>
                                        {!loading && (
                                          <ul
                                            className="item-content prod-list-lib"
                                            style={{ listStyle: "none" }}
                                          >
                                            {Libdata.languages.map((data, i) => (
                                              <li key={i}>
                                                <label className="custom-checkbox">
                                                  <input
                                                    type="checkbox"
                                                    onChange={() =>
                                                      handleLanguageFilterChange(data.value)
                                                    }
                                                    checked={
                                                      checkedLanguages.includes(data.value)
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                  <span className="checkbox-style"></span>
                                                  <samp className="name">
                                                    {data.name}{" "}
                                                    {data.count ? <span>({data.count})</span> : ``}
                                                  </samp>
                                                </label>
                                              </li>
                                            ))}
                                          </ul>
                                        )}
                                      </AccordionDetails>
                                    </Accordion>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                        {page == 1 && loading && (
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
                        )}
                        {courses && courses?.length > 0 && (
                          <div className="list-group">
                            {courses.map((course, idx) => {
                              if (course.id && course.seo_details) {
                                return (
                                  <>
                                    <LibraryCourses
                                      course={course}
                                      checkWhislistStatus={checkWhislistStatus}
                                      handleWhislist={handleWhislist}
                                      userData={userData}
                                      idx={idx}
                                      openPreviewModal={openPreviewModal}
                                      gettime={gettime}
                                      handleCartForChild={handleCartForChild}
                                      currentLoading={currentLoading}
                                      subscribeUser={subscribesUser}
                                      courseEnrolled ={courseBought}
                                    />
                                  </>
                                );
                              }
                            })}
                          </div>
                        )}
                        {expired.length > 0 && page == pagination.lastPage && !loading && (
                          <div className="list-group" style={{ marginTop: "10px" }}>
                            {expired.map((course, idx) => {
                              if (course.id && course.seo_details) {
                                return (
                                  <>
                                    <LibraryCourses
                                      course={course}
                                      checkWhislistStatus={checkWhislistStatus}
                                      handleWhislist={handleWhislist}
                                      userData={userData}
                                      idx={idx}
                                      openPreviewModal={openPreviewModal}
                                      gettime={gettime}
                                      handleCartForChild={handleCartForChild}
                                      currentLoading={currentLoading}
                                      subscribeUser={subscribesUser}
                                      courseEnrolled ={courseBought}
                                    />
                                  </>
                                );
                              }
                            })}
                          </div>
                        )}
                        {pagination.lastPage != page && courses.length > 0 && (
                          <>
                            <div
                              className="load_more_lib"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handlepage(true);
                              }}
                            >
                              {!loading ? (
                                <>Load More</>
                              ) : (
                                <>
                                  {/* <Oval
                                    height={30}
                                    width={30}
                                    color="#fff"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                    ariaLabel="oval-loading"
                                    secondaryColor="#ff6d00"
                                    strokeWidth={10}
                                    strokeWidthSecondary={5}
                                  /> */}
                                </>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {activeTab === "labs" && (
            <>
              <LabsLibrary
                courseLevelLab={Libdata.courseLevelLab}
                productTypeListLab={Libdata.productTypeListLab}
                categoryListLab={Libdata.categoryListLab}
              />
            </>
          )}
          {activeTab === "sandbox" && (
            <>
              <SandboxLibrary data={Libdata.sandboxData} />
            </>
          )}
          <br />

          {/* <!-- upgradation-block --> */}
          <CallToAction />
        </React.Fragment>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.authData.userData,
    whislist: state.whislist.whislist,
    currencyData: state.ipDetails.currency_detail,
    userbought: state.userCourse.course_bought,
    cartData: state.cart.cart,
    userSubscriptionplans: state.userProfileData.userSubscriptionData,
    updateaftersignin: state.cart.updateaftersignin,
    userSubscriptionData:state.userProfileData.userSubscriptionData,
    coursesEnrolled:state.enrolled.enrolled
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCartStore: (id, type, currency) => dispatch(addToCart(id, type, currency)),
    addWhislist: (course_id, user_id, currency) =>
      dispatch(StoreWhishlist(course_id, user_id, currency)),
    alertBoxAction: (data) => dispatch(alertBox(data)),
    redirectionAction: (data, url) => dispatch(updateRedirection(data, url)),
    removeFromCartStore: (id, type) => dispatch(removeFromCart(id, type)),
    removeFromCartAction: (id, type) => dispatch(removeFromCart(id, type)),
    storeCartCountAction: (count) => dispatch(updateCartCount(count)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);

export async function getServerSideProps() {
  const seoHomePageData = {
    seoPageType: "trainingCoursesPage",
    title: "Whizlabs Training Courses",
    metaTags: [
      { name: "facebook-domain-verification", property: "", content: "twh401qzi7r7o3n227q4sg3hghbpzh" },
      {
        name: "description",
        property: "",
        content:
          "Whizlabs offers online certification training in Cloud Computing, Project Management, Agile, Business Analysis, Java, Big Data, Blue Prism, Blockchain, Linux, Digital Marketing, Quality, and Networking domains.",
      },
      { name: "", property: "og:locale", content: "en_US" },
      { name: "", property: "og:type", content: "website" },
      { name: "", property: "og:title", content: "Whizlabs Training Courses" },
      {
        name: "",
        property: "og:description",
        content:
          "Whizlabs offers online certification training in Cloud Computing, Project Management, Agile, Business Analysis, Java, Big Data, Blue Prism, Blockchain, Linux, Digital Marketing, Quality, and Networking domains.",
      },
      { name: "", property: "og:url", content: "https://www.whizlabs.com/library/" },
      { name: "", property: "og:site_name", content: "Whizlabs" },
      {
        name: "",
        property: "og:image",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60b50f90b3ff6",
      },
      { name: "", property: "fb:app_id", content: "502194103558420" },
      { name: "", property: "og:image:width", content: "500" },
      { name: "", property: "og:image:height", content: "500" },
      { name: "twitter:card", property: "", content: "summary" },
      {
        name: "twitter:description",
        property: "",
        content:
          "Whizlabs offers online certification training in Cloud Computing, Project Management, Agile, Business Analysis, Java, Big Data, Blue Prism, Blockchain, Linux, Digital Marketing, Quality, and Networking domains.",
      },
      { name: "twitter:title", property: "", content: "Whizlabs Training Courses" },
      { name: "twitter:site", property: "", content: "@whizlabs" },
      {
        name: "twitter:image",
        property: "",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60b50f90b4039",
      },
      { name: "twitter:creator", property: "", content: "@whizlabs" },
    ],
  };
  
  return {
    props: {
      seoHomePageData,
    },
  };
}
