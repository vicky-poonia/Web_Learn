import { Accordions, CallToAction, StarRating } from "@/components/import";
import {
  PreviewCourseModal,
  VideoReviewModal,
  ComingSoonNotifyModal,
  ShareCourseModal,
} from "@/components/shared/Modals";
import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "redux/AddToCart/cart-actions";
import { alertBox } from "redux/AlertBox/alert-actions";
import { StoreWhishlist } from "redux/whislist/whislist-actions";
import FourOhFour from "pages/404";
import Link from "next/link";
import UserAvatar from "@/components/plugins/UserAvatar";
import router, { useRouter } from "next/router";
import Head from "next/head";
import { convertToTitleCase } from "helpers/CustomHelpers";
import { updateRedirection } from "redux/Redirection/redirect-actions";
import { whizCardLoader } from "redux/WhizCard/whizcard-action";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import axios from "axios";
import md5 from "md5";
import moment from "moment";
import CrazyDealSidebar from "./shared/CrazyDealSidebar";
import CrazyDealTopBanner from "@/components/shared/CrazyDealTopBanner";
import SandboxContent from "./shared/SandboxContent";
import AccordianFaq from "@/components/shared/AccordianFaq";
import cookie from 'js-cookie';
import { subsButtonClick } from "redux/buttonClick/click-actions";
import {NotifiedCourse} from 'redux/userCourse/usercourse-action';
import {
  updateDownloadWhizCardStatus,
  getWhizCardDetail,
  getwhizcardstatus,
} from "@/services/review-services/services";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const tabs = [
  {
    type: "E",
    title: "Exam & Products",
    icon: "icon-font-true-tick-with-circle",
    available: false,
  },
  { type: "T", title: "Technical", icon: "icon-font-setting", available: false },
  { type: "G", title: "General", icon: "icon-font-general", available: false },
  { type: "P", title: "Payment", icon: "icon-font-payment-card", available: false },
  { type: "S", title: "Support", icon: "icon-font-support", available: false },
];

const Sandbox = ({
  pageData,
  addToCartAction,
  freqCoursesData,
  cartData,
  userData,
  reviewsDatas,
  videoDatas,
  addWhislist,
  whislist,
  currencyData,
  removeFromCartAction,
  alertBoxAction,
  redirectionAction,
  redirectTo,
  enrolledProductTypes,
  utmData,
  slug,
  crazyDealData,
  enrollmentDetails,
  sandbox,
  whizCard,
  notified,
  updateNotified,
  subscriptionRes,
  buttonClickAction,
  seoHomePageData,
}) => {
  const wishlistIcon = useRef(null);
  const router = useRouter();
  const path = router.pathname;

  const [demoVideoLink, setDemoVideoLink] = useState("");
  const [courseAlreadyInCart, setCourseAlreadyInCart] = useState([]);
  const [selctedCourses, setSelectedCourseType] = useState([]);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [totalDiscountPrice, setTotalDiscountPrice] = useState(0);
  const [totalFinalPrice, setTotalFinalPrice] = useState(0);
  const [pageContent, setPageContent] = useState(null);
  const [faqType, setFaqType] = useState("E");
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [activeWhislist, setActiveWhislist] = useState("");
  const [freeTestPresent, setfreeTestPresent] = useState(false);
  const [downloadlink, setdownloadlink] = useState("");
  const [previewData, setPreviewData] = useState({
    courseImage: "/images/load.gif",
    isOcAvailable: false,
    demoVideoLink: "",
    courseTitle: "Loading...",
    courseSlug: "",
    sellLevel: "",
    totaRatingCount: 0,
    averageRating: 0,
    courseLevel: "",
    courseDescription: "Loading...",
    page_type: "course",
    detailedInfo: [],
    isPtComingSoon: false,
    isOcComingSoon: false,
  });
  const [cartLoading, setCartLoading] = useState(false);
  const [currency, setCurrency] = useState({
    type: "inr",
    symbol: "₹",
  });
  const [comingSoonOrNotifyData, setComingSoonOrNotifyData] = useState({
    course_slug: null,
    course_title: null,
    course_description: null,
    course_id: null,
    course_type: null,
    user_email: null,
    type: "NOTIFY",
  });
  const [activeTabType, setActiveTabType] = useState("");
  const [expanded, setExpanded] = useState("panel0");
  const [overAllProductTotalPrice, setOverAllProductTotalPrice] = useState(0);
  const [availableProductTypes, setAvailableProductTypes] = useState([]);
  const [schemaProductReviews, setSchemaProductReviews] = useState([]);
  const [practiceTestData, setPracticeTestData] = useState([]);
  const [videoCourseData, setVideoCourseData] = useState([]);
  const [labInfoData, setLabInfoData] = useState([]);
  const [isPtComingSoon, SetisPtComingSoon] = useState(false);
  const [isOcComingSoon, SetisOcComingSoon] = useState(false);
  const [showwizcard, setShowwhizcard] = useState(false);
  const [crazyDealPromo, setCrazyDealPromo] = useState(false);
  const [sandboxAvailable, setSandboxAvailable] = useState(false);
  const [sandboxComingSoon, setSandboxComingSoon] = useState(false);
  const [sandboxDiscontinued, setSandboxDiscontinued] = useState(false);
  const [sandboxDetails, setSandboxDetails] = useState([]); //todo
  const [visibleSection, setVisibleSection] = useState("");
  const [structuredFaqsData, setStructuredFaqsData] = useState([]);
  const [task_slug, setTask_slug] = useState("");
  const courseOverview = useRef(null);
  const reviews = useRef(null);
  const faqs = useRef(null);
  const top = useRef(null);
  const [defaultSelection, setDefaultSelection] = useState(6);

  const sectionref = [
    { section: "CourseOverview", ref: courseOverview },
    { section: "reviews", ref: reviews },
    { section: "faqs", ref: faqs },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    const getDimensions = (ele) => {
      const { height } = ele.getBoundingClientRect();
      const offsetTop = ele.offsetTop;
      const offsetBottom = offsetTop + height;

      return {
        height,
        offsetTop,
        offsetBottom,
      };
    };

    const handleScroll = () => {
      const { height: headerHeight } = getDimensions(top.current);
      const scrollPosition = window.scrollY + headerHeight;

      const selected = sectionref.find(({ section, ref }) => {
        const ele = ref.current;
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele);
          return scrollPosition > offsetTop && scrollPosition < offsetBottom;
        }
      });
      if (selected && selected.section !== visibleSection) {
        setVisibleSection(selected.section);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleSection]);

  useEffect(() => {
    document.querySelector("body").classList.add("product-page-footer-banner");

    const sbData =
      pageData?.products.find((prod) => prod.product_type.includes("SANDBOX")) || false;

    pageData.products.forEach((prod) => {
      if (sbData) {
        setSandboxAvailable(true);
        if (sbData.is_comingsoon === 1) setSandboxComingSoon(true);
        if (sbData.is_comingsoon === 2) setSandboxDiscontinued(true);
      }

      if (pageData && pageData.id) {
        if (pageData?.whizcard?.length > 0) {
          let link = process.env.NEXT_PUBLIC_WEB_MEDIA_URL;
          let fname = pageData.whizcard;
          let result = link.concat(fname);
          setdownloadlink(result);
          setShowwhizcard(true);
        }
      }
    });
    const freeQuizId = pageData.detailedInfo?.praticetest_info.find((Itm) => Itm.is_free === true);
    if (typeof freeQuizId !== "undefined") {
      setfreeTestPresent(true);
    }

    let structuredFaqs = [];
    pageData?.faq_details.map((Itm) => {
      Itm.faq &&
        Itm.faq.length > 0 &&
        Itm.faq.map((item) => {
          if (item && item.is_active == 1 && item.question && item.answer) {
            structuredFaqs.push({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            });
          }
        });
    });
    setStructuredFaqsData(structuredFaqs);
  }, []);

  useEffect(() => {
    if (crazyDealData && enrolledProductTypes.length === 0) setCrazyDealPromo(crazyDealData);
  }, [crazyDealData, enrolledProductTypes]);

  useEffect(() => {
    if (currencyData) {
      setCurrency(currencyData);
    }
  }, [currencyData]);

  useEffect(() => {
    const cartCourse = cartData?.find((item) =>
      item.courseId === (pageData && pageData.id) ? pageData.id : 0
    );

    if (pageData && pageData.id && currency) {
      let videosData = pageData.products.find((prod) => prod.product_type === "OC");
      if (videosData && videosData.other_details && videosData.other_details.video_link) {
        setDemoVideoLink(videosData.other_details.video_link);
      }

      if (isPtComingSoon == false && pageData?.detailedInfo?.praticetest_info?.length > 0) {
        setActiveTabType("PT");
        setExpanded("panel0");
      } else if (isOcComingSoon == false && pageData?.detailedInfo?.onlinecourse_info?.length > 0) {
        setActiveTabType("OC");
        setExpanded("panel0");
      } else if (pageData?.detailedInfo?.lab_info?.length > 0) {
        setActiveTabType("LAB");
        setExpanded("panel0");
      }

      // Sorting Product Types FT, PT, OC, Lab
      pageData?.products.sort((a, b) => {
        return b.product_type.localeCompare(a.product_type);
      });

      // Set Overall Product Price
      let overall_price_of_product = 0;
      let available_product_types: any = [];
      if (pageData?.detailedInfo?.lab_info?.length > 0) {
        available_product_types.push("HandsOn Labs");
      }

      // Set Reviews for product schemas
      if (reviewsDatas && reviewsDatas.data && reviewsDatas.data.length > 0) {
        let schemaReviews: any = [];
        reviewsDatas.data.map((rev) => {
          schemaReviews.push({
            "@type": "Review",
            author: {
              "@type": "Person",
              name: rev.user_name,
            },
            description: rev.post_question_text,
            reviewRating: {
              "@type": "Rating",
              ratingValue: rev.post_addition.rating,
              bestRating: 5,
            },
          });
        });
        // console.log(schemaReviews, "SC")
        setSchemaProductReviews(schemaReviews);
      }

      pageData.products.forEach((prod) => {
        if (prod.product_type !== "FT" && prod.product_type !== "ILT" && prod.is_comingsoon < 1) {
          overall_price_of_product += parseFloat(prod.sale_price[currency.type]);
          if (prod.product_type.includes("SANDBOX")) {
            available_product_types.push(prod.product_type);
          }
        }
      });
      setOverAllProductTotalPrice(overall_price_of_product);
      setAvailableProductTypes(available_product_types);
      setPageContent(pageData);
      const prodObj = {
        prodType: [],
        finalPrice: 0,
        discountPrice: 0,
        discountPercent: 0,
      };

      // prettier-ignore
      const sortedProds = [...pageData.products].sort((a,b) => a.sale_price[currency.type] - b.sale_price[currency.type])
      for (const prod of sortedProds) {
        if (
          prod.product_type.includes("SANDBOX-6") &&
          !enrolledProductTypes?.includes("SANDBOX") &&
          prod.is_comingsoon < 1
        ) {
          prodObj.prodType.push(prod.product_type.toLowerCase());
          prodObj.finalPrice += parseFloat(prod.sale_price[currency.type]);
          prodObj.discountPrice += parseFloat(prod.regular_price[currency.type]);
          prodObj.discountPercent += getPercentage(
            prod.regular_price[currency.type],
            prod.sale_price[currency.type]
          );
        }
      }
      // console.log(prodObj.prodType)
      // console.log("371",prodObj)
      setSelectedCourseType(prodObj.prodType);
      if (crazyDealPromo) {
        setTotalFinalPrice(crazyDealData.discounted_price[currency.type]);
        setTotalDiscountPrice(crazyDealData.regular_price[currency.type]);
      } else {
        setTotalFinalPrice(prodObj.finalPrice);
        setTotalDiscountPrice(prodObj.discountPrice);
      }
      setDiscountPercentage(prodObj.discountPercent);
    } else {
      setPageContent(null);
    }
  }, [pageData, currency, enrolledProductTypes, crazyDealData, crazyDealPromo]);

  useEffect(() => {
    if (pageContent) {
      for (let i = tabs.length - 1; i >= 0; i--) {
        const item = tabs[i];
        item.available = showFaqTab(item.type);
        if (item.available) {
          setFaqType(null);
          setFaqType(item.type);
        }
      }
    }
  }, [pageContent]);

  useEffect(() => {
    if (whislist.includes(pageData.id)) {
      setActiveWhislist("active");
    } else {
      setActiveWhislist("");
    }
  }, [whislist]);

  // useEffect(() => {
  //   if (cartLoading) {
  //     // for sandbox
  //     if (selctedCourses[0].includes("sandbox")) {
  //       removeFromCartAction(pageContent.id, "sandbox");
  //     }
  //   }

  //   return () => setCartLoading(false);
  // }, [selctedCourses, cartLoading]);

  const handleToggle = async ({ e, type, discountPrice, originalPrice, disPercentage }) => {
    e.preventDefault();
    if (enrolledProductTypes.includes(type.toUpperCase())) {
      return;
    }
    // console.log("424",selctedCourses,type)
    type = type.toLowerCase();

    if (!crazyDealPromo) {
      // setCartLoading(true);

      const newChecked = [type];
      const newDiscountPrice = parseFloat(discountPrice);
      const newOriginalPrice = parseFloat(originalPrice);
      const newDiscountPercentage = parseInt(disPercentage);
      // console.log("435")
      setSelectedCourseType(newChecked);
      setTotalDiscountPrice(newDiscountPrice);
      setTotalFinalPrice(newOriginalPrice);
      setDiscountPercentage(newDiscountPercentage);
    }
  };

  const checkIfUserEnrolledAllProducts = () => {
    return !sandboxComingSoon && !sandboxDiscontinued && enrolledProductTypes.includes("SANDBOX");
  };

  const priceFormat = (value) => {
    let is_decimal: any = value % 1;
    if (is_decimal != 0) {
      return Number(value).toFixed(2);
    } else {
      return Number(value);
    }
  };

  const getPercentage = (regular, sale) => Math.round(((regular - sale) / regular) * 100);

  const openVideoModal = (url) => setActiveVideoUrl(url);

  const openComingSoonOrNotifyModal = (
    e,
    course_id,
    course_type = null,
    course_data = null,
    type = "NOTIFY"
  ) => {
    e.preventDefault();
    setComingSoonOrNotifyData({
      course_slug: course_data?.seo_details?.slug,
      course_title: course_data?.seo_details?.seo_title,
      course_description: course_data?.seo_details?.seo_description,
      course_id: course_id,
      course_type: course_type,
      user_email:
        userData && userData.data && userData.data.user_email ? userData.data.user_email : null,
      type,
    });
    if (type == "NOTIFY") document.querySelector("body").classList.add("open-modal-notify");
    else document.querySelector("body").classList.add("open-modal-share-course");
  };

  useEffect(()=>{
    let show_notify = cookie.get("show_notifymodal")
    // console.log("useEffect",show_notify)
    if(show_notify)
    {
      let type = "NOTIFY"
      if(document)
      {
        if(notified)
        {
          let data = notified.find(itm => itm.id == pageData.id)
          if(!data?.product.includes(cookie.get("course_type")))
          {
            // document.querySelector("body").classList.add("open-modal-notify");
            Notification_operation(cookie.get("course_type"))
            cookie.remove('show_notifymodal')
            cookie.remove('course_type')
          }
          else{
            alertBoxAction({
              type: "SUCCESS",
              title: "Success",
              msg: "Notification set already",
            });
          }
        }
      }
    }
  },[])

  const [isNotifyButtonDisabled, setIsNotifyButtonDisabled] = useState(false);
  const handleNotifyButtonClick = (n) => {
    // e.preventDefault();
    setIsNotifyButtonDisabled(true);
    Notification_operation(n);
    setTimeout(() => {
      setIsNotifyButtonDisabled(false);
    }, 3000);
  };

  const oneDay = 24 * 60 * 60 * 1000;
  const expiryDate = new Date(Date.now() + oneDay);
  const subsValues = {
    "button_name": "subscribe_now",
    "button_url": process.env.NEXT_PUBLIC_BASE_PATH + `${slug}`
  };
  const handleSubsClick = async () => {
    if (userData) {
    cookie.set("Subscribe_now_button", subsValues, { expires: expiryDate });
    buttonClickAction(userData.data, subsValues);
    } else {
      cookie.set("Subscribe_now_button", subsValues, { expires: expiryDate });
    }
  };
  const Notification_operation = async(type)=>{
    if(userData)
    {
      // console.log(notified)
      let data = notified?.find(itm => itm.id == pageData.id)
      if(data?.product.includes(type))
      {
        return;
      }
      const response = await axios.post(baseUrl + "/users/notify", {
        email: userData.data.user_email,
        course_id: pageData?.id,
        product_type: type,
      });
      if (response && response.data.status) {
        alertBoxAction({
          type: "SUCCESS",
          title: "Success",
          msg: "Notification sent successfully",
        });
        updateNotified(userData.data.user_id)
      }
    }
    else{
      document.querySelector("body").classList.add("open-modal-login");
      cookie.set("show_notifymodal",true)
      cookie.set("course_type",type)
      return
    }
    
  }
  const handleCart = async(e) => {
    e.preventDefault();

    const selProd = selctedCourses.map((Itm) => Itm.toUpperCase()).sort();
    const enrollProd = enrolledProductTypes.map((Itm) => Itm.toUpperCase()).sort();

    if (JSON.stringify(selProd) === JSON.stringify(enrollProd)) return;

    let cartCourse = cartData.filter((itm)=> itm.courseId == pageContent.id)
    // console.log(cartCourse)
    if(cartCourse.length > 0){
     await removeFromCartAction(pageContent.id, cartCourse[0].selectedCourseType[0]);
     setTimeout(()=>{
      addToCartAction(pageContent.id, selctedCourses,currency.type);
    },1000)
    }else{
      addToCartAction(pageContent.id, selctedCourses,currency.type);
    }
  

  

    // 2470, ['sandbox-6']
    // console.log("console.log waht was selected",selctedCourses)
  
    if (selctedCourses.length > 0) {
      setCartLoading(true);
      setTimeout(()=>{
        router.push('/cart')
      },1300)
      // document.querySelector("body").classList.add("open-modal-login");
    } else {
      alertBoxAction({
        type: "WARNING",
        title: "",
        msg: "Please select atleast one product.",
      });
    }
  };

  /* const handleFreeTest = async (e) => {
    e.preventDefault();
    const freeQuizId = pageContent.detailedInfo?.praticetest_info.find(
      (Itm) => Itm.is_free === true
    ).id;

    const freeTestLmsLink = new URL(
      `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageContent.seo_details?.slug}/${pageContent.id}/quiz/${freeQuizId}/ft/`
    );
    if (utmData?.utm_source) {
      freeTestLmsLink.searchParams.append("utm_source", utmData?.utm_source);
    }
    if (utmData?.utm_campaign) {
      freeTestLmsLink.searchParams.append("utm_campaign", utmData?.utm_campaign);
    }
    if (utmData?.utm_medium) {
      freeTestLmsLink.searchParams.append("utm_medium", utmData?.utm_medium);
    }
    if (utmData?.utm_term) {
      freeTestLmsLink.searchParams.append("utm_term", utmData?.utm_term);
    }
    if (utmData?.utm_content) {
      freeTestLmsLink.searchParams.append("utm_content", utmData?.utm_content);
    }
    if (utmData?.share_a_sale) {
      freeTestLmsLink.searchParams.append("share_a_sale", utmData?.share_a_sale);
    }

    if (userData && userData.data && pageContent?.id) {
      window.open(`${freeTestLmsLink}`);
    } else {
      redirectionAction("LMS_ACTIVITY", freeTestLmsLink); // after sign in redirect to LMS FREE TEST
      document.querySelector("body").classList.add("open-modal-login");
    }
  }; */

  // TODO

  const getLabDetails = async () => {
    try {
      let config = {
        // method: "post",
        url: `${baseUrl}/labs/course-section/sandbox`,
        data: { course_id: pageData.id },
        headers: {
          authorization: userData?.data?.token,
        },
      };
      const resp = await axios({ ...config, method: "POST" });
      let t_slug;
      resp.data.data.filter((item) => {
        if (item.task_slug !== null) {
          t_slug = item.task_slug;
        }
        setTask_slug(item.task_slug);
      });
      return resp.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    let isMount = true;
    if (isMount) {
      if (userData) {
        getLabDetails()
          .then((resp) => {
            setSandboxDetails(resp.data);
          })
          .catch((error) => console.error(error));
      }
    }
  }, [pageData]);
  // console.log(task_slug);

  // let t_slug;
  // sandboxDetails.filter(item => {
  //   if(item.task_slug !== null){
  //     t_slug = item.task_slug;
  //   }
  //   setTask_slug(item.task_slug);
  //   console.log(item.task_slug);
  // })

  const handlewhiz = async (e) => {
    e.preventDefault();
    if (userData) {
      try {
        await axios({
          method: "post",
          url: process.env.NEXT_PUBLIC_BASE_URL + "/users/dwonload-whizcard",
          data: {
            course_id: pageData.id,
            email: userData.data.user_email,
            type: "website",
          },
        });
        window.open(process.env.NEXT_PUBLIC_WEB_MEDIA_URL + pageData.whizcard);
      } catch (err) {
        console.error(err);
      }
    } else {
      dispatch(whizCardLoader({data: {
            check: true,
            course_id: pageData.id,
            email: null,
            type: "website",
            url: pageData.whizcard,
      }}));
      document.querySelector("body").classList.add("open-modal-login");
    }
  };

  useEffect(() => {
    let mount = true;
    if(mount){
      const whizUpload = async () =>{
        if(whizCard.check){
          if (userData) {
            try {
              await axios({
                method: "post",
                url: process.env.NEXT_PUBLIC_BASE_URL + "/users/dwonload-whizcard",
                data: {
                  course_id: whizCard.course_id,
                  email: userData.data.user_email,
                  type: whizCard.type,
                },
              });
              window.open(process.env.NEXT_PUBLIC_WEB_MEDIA_URL + whizCard.url, "_blank").focus();
              dispatch(whizCardLoader({data: {
                    check: false,
                    course_id: null,
                    email: null,
                    type: "",
                    url: "",
              }}));
            } catch (err) {
              console.error(err);
            }
          }
        }
      }
      whizUpload();
    }
  },[userData])

  const handlePracticeTest = (e, id) => {
    e.preventDefault();
    if (userData && userData.data.user_id) {
      window.open(
        `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageContent.seo_details?.slug}/${pageContent.id}/quiz/${id}`
      );
    } else {
      let url =
        process.env.NEXT_PUBLIC_LMS_URL +
        "/course/" +
        pageContent.seo_details?.slug +
        "/" +
        pageContent.id +
        "/quiz/" +
        id;
      redirectionAction("LMS_ACTIVITY", url); // after sign in redirect to LMS PRACTICE TEST
      document.body.classList.add("open-modal-login");
    }
  };

  const handleOnlineCourse = (e, videoId) => {
    e.preventDefault();
    if (userData && userData.data.user_id) {
      window.open(
        `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageContent.seo_details?.slug}/${pageContent.id}/video/${videoId}`
      );
    } else {
      let url =
        process.env.NEXT_PUBLIC_LMS_URL +
        "/course/" +
        pageContent.seo_details?.slug +
        "/" +
        pageContent.id +
        "/video";
      redirectionAction("LMS_ACTIVITY", url); // after sign in redirect to LMS ONLINE COURSE PAGE
      document.body.classList.add("open-modal-login");
    }
  };

  const handleLabs = (e, labData) => {
    e.preventDefault();
    if (userData && userData.data.user_id) {
      const backLink = `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageContent.seo_details?.slug}/${pageContent.id}/lab`;
      const token = md5("1@sas" + userData.data.user_email + "%1@asa");
      // const playRedirectLink = new URL("https://play.whizlabs.com/site/lms_login");
      let playRedirectLink;
      if (labData.lab_type == 4) {
        playRedirectLink = new URL(`${process.env.NEXT_PUBLIC_PLAY_URL_PYTHON}/site/lms_login`);
      } else if (labData.task_slug == "sandbox") {
        window.open(`${process.env.NEXT_PUBLIC_PLAY_URL}/sandbox`);
      } else {
        window.open(`${process.env.NEXT_PUBLIC_PLAY_URL}/${labData.task_slug}`);
        // playRedirectLink = new URL(`${process.env.NEXT_PUBLIC_PLAY_URL}/login`);
      }
      playRedirectLink?.searchParams.append("course_id", pageContent.id);
      playRedirectLink?.searchParams.append("lab_id", labData.id);
      playRedirectLink?.searchParams.append("points", labData.credits);
      playRedirectLink?.searchParams.append("ref", labData.play_link);
      playRedirectLink?.searchParams.append("user_token", userData.data.token);
      playRedirectLink?.searchParams.append("task_slug", labData.task_slug);
      playRedirectLink?.searchParams.append("back", backLink);
      playRedirectLink?.searchParams.append("token", token);
      playRedirectLink?.searchParams.append("version", "3");
      playRedirectLink?.searchParams.append("api_origin", process.env.NEXT_PUBLIC_BASE_URL);
      window.open(playRedirectLink?.href);
    } else {
      let url =
        process.env.NEXT_PUBLIC_LMS_URL +
        "/course/" +
        pageContent.seo_details?.slug +
        "/" +
        pageContent.id +
        "/lab";
      redirectionAction("LMS_ACTIVITY", url); // after sign in redirect to LMS ONLINE COURSE PAGE
      document.body.classList.add("open-modal-login");
    }
  };

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : "");
  };

  const changeCourseLibrary = (e, type) => {
    e.preventDefault();
    setExpanded("panel0");
    setActiveTabType(type);
  };
  const handleBuyNowDirect = (e) => {
    e.preventDefault();
    if (pageData && pageData.slug) {
      if (!selctedCourses.length) {
        alertBoxAction({
          type: "WARNING",
          title: "",
          msg: "Please select atleast one product.",
        });
        return;
      }

      selctedCourses.forEach((prod) => removeFromCartAction(pageContent.id, prod));

      const redirectSlug = `/${slug}/checkout?prod=${selctedCourses.join(":")}`;

      if (!userData || !userData.data || !userData.data.user_id) {
        redirectionAction("REDIRECT", redirectSlug); // after sign in redirect to direct checkout Page
        document.querySelector("body").classList.add("open-modal-login");
      }

      router.push(redirectSlug);
    }
  };

  const handleBuyNow = (e) => {
    e.preventDefault();

    if (!selctedCourses.length) {
      alertBoxAction({
        type: "WARNING",
        title: "",
        msg: "Please select atleast one product.",
      });
    }

    selctedCourses.forEach((prod) => removeFromCartAction(pageContent.id, prod));

    const redirectSlug = `/${slug}/checkout?prod=${selctedCourses.join(":")}`;

    if (!userData || !userData.data || !userData.data.user_id) {
      redirectionAction("REDIRECT", redirectSlug); // after sign in redirect to direct checkout Page
      document.querySelector("body").classList.add("open-modal-login");
    }

    router.push(redirectSlug);
  };

  const showFaqTab = (faq_type) => {
    let returnRes: boolean = false;
    const faqArray = pageContent?.faq_details?.filter(
      (e) => e?.faq_type === faq_type && e?.faq?.length > 0
    );

    if (faqArray?.length > 0) {
      const finalRes: any = faqArray[0]?.faq?.filter(
        (item) => item?.is_active == 1 && item?.question !== null && item?.answer != null
      );

      if (finalRes?.length > 0) {
        returnRes = true;
      }
    }

    return returnRes;
  };

  const scrollTo = (ele) => {
    // console.log("ele is ",ele)
    // ele?.scrollIntoView({
    //   behavior: "smooth",
    //   block: "start",
    // });
    var element = ele;
    var headerOffset = 45;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const changeFaqType = (type) => (faqType === type ? setFaqType("") : setFaqType(type));

  if (!pageData || !pageData.id) return <FourOhFour />;

  const [priceToShow, setPriceToShow] = useState(null)
  
  useEffect(() => {
    if (subscriptionRes) {
      if(subscriptionRes[0]?.campaign_offer){
        setPriceToShow(Math.trunc((subscriptionRes[0]?.campaign_offer?.price.usd)/ subscriptionRes[0].subscription_for))
      } else {
        setPriceToShow(Math.trunc((subscriptionRes[0]?.offer_price.usd)/ subscriptionRes[0].subscription_for))
      }
    }
  }, [subscriptionRes]);

  return (
    <React.Fragment>
      {/* <Head>
        {pageData?.seo_details?.seo_title && <title>{`${pageData?.seo_details?.seo_title}`}</title>}
        {pageData?.seo_details?.seo_keyword && (
          <meta key="keywords" name="keywords" content={`${pageData?.seo_details?.seo_keyword}`} />
        )}
        {pageData?.seo_details?.seo_description && (
          <meta
            key="description"
            name="description"
            content={`${pageData?.seo_details?.seo_description}`}
          />
        )}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content={`website`} />
        {pageData?.seo_details?.seo_title && (
          <meta
            name="og:title"
            property="og:title"
            content={`${pageData?.seo_details?.seo_title}`}
          />
        )}
        {pageData?.seo_details?.seo_description && (
          <meta
            name="og:description"
            property="og:description"
            content={`${pageData?.seo_details?.seo_description}`}
          />
        )}
        <meta property="og:site_name" content={`Whizlabs`} />
        {pageData?.seo_details?.slug && (
          <meta
            property="og:url"
            content={`${process.env.NEXT_PUBLIC_BASE_PATH + pageData?.seo_details?.slug}`}
          />
        )}
        {pageData?.seo_details?.featured_image && (
          <meta
            name="og:image"
            content={`${
              process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
              pageData.seo_details?.featured_image.replace("media/", "")
            }`}
          />
        )}
        {pageData?.seo_details?.featured_image && (
          <meta
            name="image"
            property="og:image"
            content={`${
              process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
              pageData.seo_details?.featured_image.replace("media/", "")
            }`}
          />
        )}
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:card" content="summary" />
        {pageData?.seo_details?.seo_title && (
          <meta name="twitter:title" content={`${pageData?.seo_details?.seo_title}`} />
        )}
        {pageData?.seo_details?.seo_description && (
          <meta name="twitter:description" content={`${pageData?.seo_details?.seo_description}`} />
        )}
        <meta name="twitter:site" content={`@whizlabs`} />
        {pageData?.seo_details?.featured_image && (
          <meta
            name="twitter:image"
            content={`${
              process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
              pageData.seo_details?.featured_image.replace("media/", "")
            }`}
          />
        )}
      </Head> */}

      {pageContent ? (
        <React.Fragment>
          {/* Schema Builder for Product Details */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: (Math.floor(pageContent.ratings?.overall_rating * 2) / 2).toFixed(1),
                reviewCount: pageContent.ratings?.rating,
              },
              description: pageContent.seo_details?.seo_description,
              mpn: pageContent?.sku,
              sku: pageContent?.sku,
              brand: {
                "@type": "Brand",
                name: "Whizlabs",
              },
              review: schemaProductReviews,
              name: pageContent.seo_details?.page_title,
              image:
                process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                pageContent.seo_details?.featured_image.replace("media/", ""),
              offers: {
                "@type": "Offer",
                url: `${process.env.NEXT_PUBLIC_BASE_PATH}${pageContent?.seo_details?.slug}`,
                itemOffered: availableProductTypes,
                priceValidUntil: moment().add(1, "years").format("YYYY-MM-D"),
                price: priceFormat(overAllProductTotalPrice),
                priceCurrency: currency?.type?.toUpperCase(),
                itemCondition: "https://schema.org/NewCondition",
                availability: "https://schema.org/InStock",
              },
            })}
          </script>
          {/* Schema Builder for Product Faqs */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: structuredFaqsData,
            })}
          </script>

          <ComingSoonNotifyModal data={comingSoonOrNotifyData} alertBox={alertBoxAction} userData={undefined} updateNotified={undefined} />

          <ShareCourseModal
            userData={userData}
            data={comingSoonOrNotifyData}
            alertBox={alertBoxAction}
          />

          <PreviewCourseModal previewData={previewData} />

          <VideoReviewModal videoUrl={activeVideoUrl} />

          {/* <WhizcardModal
            userEmail={userData?.data?.user_email || ""}
            courseId={pageContent.id}
            whizCardLink={pageData.whizcard}
          /> */}

          {/* <!-- banner-part --> */}
          <div
            className="product-banner"
            style={{
              background: "#3D4050 url('/images/product-page-banner-min.png') no-repeat center",
              backgroundSize: "cover",
            }}
          >
            <div className="container">
              <ul className="breadcrumbs">
                <li>
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </li>
                <li className="training-library">
                  <Link href="/library">
                    <a>Training Library</a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>{pageContent.seo_details?.breadcrumb}</a>
                  </Link>
                </li>
              </ul>
              <div className="product-details">
                <div className="left-part">
                  <div
                    className={"course-img blank"}
                    onClick={(e) => {
                      e.preventDefault();
                      return;
                    }}
                  >
                    <img
                      className="img-full"
                      src={
                        process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                        pageContent.seo_details?.featured_image.replace("media/", "")
                      }
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = "/images/no-image.png";
                      }}
                      alt={pageContent.seo_details?.page_title}
                      title={pageContent.seo_details?.page_title}
                    />
                  </div>
                  <div className="course-content">
                    <h1 className="title">{pageContent.seo_details?.page_title}</h1>
                    <div className="sub-title">{pageContent.seo_details?.sub_title}</div>

                    <Link
                      href={
                        pageContent.ratings?.rating <= 0
                          ? "/" + pageContent.seo_details?.slug + "/reviews/write"
                          : "/" + pageContent.seo_details?.slug + "/reviews"
                      }
                    >
                      <a style={{ textDecoration: "none" }}>
                        <StarRating
                          isSamp={true}
                          avgRating={pageContent.ratings?.overall_rating}
                          totalRating={pageContent.ratings?.rating}
                        />
                      </a>
                    </Link>
                    {/* Learners Count */}
                    {pageContent.web_counts?.learners_count === 0 ? null : (
                      <div className="total-learners">
                        <i className="icon icon-font-graduation-cap"></i>
                        <span>
                          {pageContent.web_counts?.learners_count.toLocaleString()} Learners
                        </span>
                      </div>
                    )}
                    <div className="level-text">
                      {pageContent.seo_details?.is_bestseller && (
                        <label className="bestseller">Bestseller</label>
                      )}
                      {/* {pageContent.other_attributes?.course_level && (
                        <span>
                          Level: {convertToTitleCase(pageContent.other_attributes?.course_level)}
                        </span>
                      )} */}
                    </div>
                    {
                      pageData.short_description_sandbox &&  <div>
                      <div className="sandbox_description" dangerouslySetInnerHTML={{__html:pageData.short_description_sandbox}}></div>
                  </div>
                  }
                  </div>
                </div>
                <div className="right-part">
                  <div className="btn-group">
                    {/* <button className="btn btn-add-to-cart" onClick={(e) => handleCart(e)}>
                      Add to Cart
                    </button> */}
                    <React.Fragment>
                      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                        {sandboxDiscontinued ? (
                          <>
                            <div className="btn-free-test">Discontinued</div>
                          </>
                        ) : (
                          <>
                            <div
                              className="btn-free-test"
                              onClick={(e) => {
                                if (!enrolledProductTypes.includes("SANDBOX")) {
                                  handleCart(e);
                                } else if(task_slug == "aws-sandbox") {
                                  window.open(
                                    `${process.env.NEXT_PUBLIC_PLAY_URL}/sandbox/aws/${task_slug}`
                                  );
                                } else {
                                  window.open(
                                    `${process.env.NEXT_PUBLIC_PLAY_URL}/${task_slug}` // todo
                                    // `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageContent.seo_details?.slug}/${pageContent.id}/sb`
                                  );
                                }
                              }}
                            >
                              {/* check is practice Test is comming soon or available ... if availabe use access Now */}
                              {/* {enrolledProductTypes.includes("SANDBOX") && sandboxAvailable
                                ? "Access Now"
                                : sandboxComingSoon
                                ? "Coming Soon"
                                : "Add to Cart"} */}
                            </div>
                          </>
                        )}
                      </div>
                    </React.Fragment>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {crazyDealPromo && <CrazyDealTopBanner crazyDealData={crazyDealData} />}

          {/* <!-- nav-group --> */}
          <div className="scroll-nav">
            <div className="container">
              <div className="nav-list coursepage_overview">
                <ul>
                  <li className={visibleSection === "CourseOverview" ? "active" : ""}>
                    <a
                      onClick={() => {
                        scrollTo(courseOverview.current);
                      }}
                    >
                      Course Overview
                    </a>
                  </li>
                  {activeTabType && (
                    <li>
                      <a href="#whats-included">What's Included</a>
                    </li>
                  )}
                  {/* <li>
                    <a href="#exam-info" className="scroll">
                      Exam Information
                    </a>
                  </li> */}
                  <li className={visibleSection === "reviews" ? "active" : ""}>
                    <a
                      onClick={() => {
                        scrollTo(reviews.current);
                      }}
                    >
                      Reviews
                    </a>
                  </li>
                  <li className={visibleSection === "faqs" ? "active" : ""}>
                    <a
                      onClick={() => {
                        scrollTo(faqs.current);
                      }}
                    >
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container">
            {/* <!-- content area part --> */}
            <div id="content-area" className="product-page">
              <div
                className="two-column"
                style={{ display: "flex", justifyContent: "center", width: "100%" }}
              >
                <div className="left-section left-new-prod">
                  {/* training-options */}
                  <div id="training-options" className="training-options">
                    <div className="container">
                      <div className="container-left"></div>
                    </div>
                  </div>
                  {/* <!-- course-overview --> */}

                  <div id="course-overview" className="course-overview">
                    <div className="container">
                      <div className="container-left" ref={top}>
                        {/* {showwizcard && (
                          <>
                            <div className="CSAA-whizCardsBlock" style={{ background: "#F5F7FA" }}>
                              <div className="left">
                                <p>
                                  <strong>Download WhizCard</strong> Quick Exam Reference -
                                  Hand-Picked for you
                                </p>
                              </div>
                              <div className="right">
                                <button className="btn whizcard" onClick={(e) => handlewhiz(e)}>
                                  <div style={{ display: "flex" }}>
                                    <i
                                      style={{ marginTop: "10px" }}
                                      className=" icon-font-download"
                                    ></i>
                                    <div style={{ marginLeft: "8px" }}>Download Whizcard</div>
                                  </div>
                                </button>
                              </div>
                            </div>
                          </>
                        )} */}
                      </div>
                    </div>
                  </div>
                  <div ref={courseOverview} style={{ margin: "0px" }}>
                    <div id="course-overview" className="course-overview">
                      <div className="container">
                        <div className="container-left">
                          <h2 className="title">{pageContent?.target_keyword}</h2>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: pageContent.description,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- learn-block --> */}
                    <div className="learn-block">
                      <div
                        className="container coursepage_overview"
                        dangerouslySetInnerHTML={{
                          __html: pageContent.other_attributes?.what_will_learn,
                        }}
                      />
                    </div>

                    {/* <!-- included-course --> */}
                    {activeTabType && (
                      <div id="whats-included" className="benifits-block">
                        <div className="container">
                          <div className="container-left">
                            <h2 className="title">Included in this course</h2>
                            <div className="tab_wrapper">
                              <ul className="tab_list">
                                {pageContent.detailedInfo?.praticetest_info?.length ? (
                                  <li
                                    className={
                                      activeTabType === "PT"
                                        ? "resp-tab-item hor_1 resp-tab-active"
                                        : ""
                                    }
                                    onClick={(e) => changeCourseLibrary(e, "PT")}
                                  >
                                    <i className="icon icon-font-note2"></i>
                                    <samp>
                                      Practice Tests
                                      <small
                                        style={{
                                          fontSize: "70%",
                                          margin: "3px 0 0 0",
                                        }}
                                      >
                                        {pageContent?.web_counts?.pt_count} Practice Tests
                                      </small>
                                    </samp>
                                  </li>
                                ) : (
                                  ""
                                )}

                                {pageContent.detailedInfo?.onlinecourse_info?.length ? (
                                  <li
                                    className={
                                      activeTabType === "OC"
                                        ? "resp-tab-item hor_1 resp-tab-active"
                                        : ""
                                    }
                                    onClick={(e) => changeCourseLibrary(e, "OC")}
                                  >
                                    <i className="icon icon-font-play"></i>
                                    <samp>
                                      Video Course
                                      <small
                                        style={{
                                          fontSize: "70%",
                                          margin: "3px 0 0 0",
                                        }}
                                      >
                                        {pageContent?.web_counts?.vid_count} Videos Available
                                      </small>
                                    </samp>
                                  </li>
                                ) : (
                                  ""
                                )}

                                {pageContent.detailedInfo?.lab_info?.length ? (
                                  <li
                                    className={
                                      activeTabType === "LAB"
                                        ? "resp-tab-item hor_1 resp-tab-active"
                                        : ""
                                    }
                                    onClick={(e) => changeCourseLibrary(e, "LAB")}
                                  >
                                    <i className="icon icon-font-bicker"></i>
                                    <samp>
                                      Hands-on Labs
                                      <small
                                        style={{
                                          fontSize: "70%",
                                          margin: "3px 0 0 0",
                                        }}
                                      >
                                        {pageContent?.web_counts?.lab_count} Labs Available
                                      </small>
                                    </samp>
                                  </li>
                                ) : (
                                  ""
                                )}
                              </ul>
                              <div className="resp-accordion resp-tabs-container hor_1 content_wrapper">
                                {pageContent.products.map((prod, index) => {
                                  if (
                                    prod.product_type === "PT" &&
                                    pageContent.detailedInfo?.praticetest_info?.length
                                  ) {
                                    return (
                                      <React.Fragment key={index}>
                                        <div
                                          className={
                                            activeTabType === "PT"
                                              ? "resp-accordion resp-tab-item hor_1 resp-tab-active"
                                              : "resp-accordion resp-tab-item hor_1"
                                          }
                                          onClick={(e) => changeCourseLibrary(e, prod.product_type)}
                                          style={{
                                            borderColor: "rgba(221, 221, 221, 0.51)",
                                            background: "none",
                                          }}
                                        >
                                          <span className="arrow"></span>
                                          <div>
                                            <i className="icon icon-font-note2"></i>
                                            <samp>
                                              Practice Tests
                                              <small
                                                style={{
                                                  fontSize: "70%",
                                                  margin: "0",
                                                }}
                                              >
                                                {pageContent?.web_counts?.pt_count} Practice Tests
                                              </small>
                                            </samp>
                                          </div>
                                        </div>
                                        <div
                                          // title="practice-test"
                                          className="tab_content"
                                          id="practice-test"
                                          style={{
                                            display: activeTabType === "PT" ? "block" : "none",
                                          }}
                                        >
                                          <p
                                            dangerouslySetInnerHTML={{
                                              __html: prod?.other_details?.short_description,
                                            }}
                                          />
                                          <div className="accordian-block">
                                            <div className="title">
                                              Topic-wise Content Distribution
                                            </div>
                                            <div className="accordian-list">
                                              <div className="item">
                                                {practiceTestData.length > 0 &&
                                                  practiceTestData.map((data, idx) => (
                                                    <Accordion
                                                      square
                                                      expanded={expanded === "panel" + idx}
                                                      onChange={handleChangeAccordion(
                                                        "panel" + idx
                                                      )}
                                                      key={idx}
                                                    >
                                                      <AccordionSummary
                                                        aria-controls={"panel1d-content" + idx}
                                                        id={"panel1d-header" + idx}
                                                        className={
                                                          expanded === "panel" + idx
                                                            ? "item-head open"
                                                            : "item-head"
                                                        }
                                                      >
                                                        <div className="left">
                                                          <samp></samp>
                                                          <span>{data.section_heading}</span>
                                                        </div>
                                                        <div className="right">
                                                          <div className="total-test">
                                                            {data.children?.length +
                                                              (data.children?.length > 1
                                                                ? " Tests"
                                                                : " Test")}
                                                          </div>
                                                        </div>
                                                      </AccordionSummary>
                                                      <AccordionDetails className="item-content">
                                                        <ul>
                                                          {data.children.map((itm, idxx) => (
                                                            <li key={idxx}>
                                                              <div className="title">
                                                                <i className="icon-font-note2"></i>
                                                                <span>{itm.quiz_name}</span>
                                                              </div>
                                                              <div className="right">
                                                                {itm.is_free && (
                                                                  <a
                                                                    className="btn-try"
                                                                    href="#"
                                                                    onClick={(e) =>
                                                                      handlePracticeTest(e, itm.id)
                                                                    }
                                                                  >
                                                                    Try now
                                                                  </a>
                                                                )}
                                                                <div className="total-que">
                                                                  {itm.questions_count} questions
                                                                </div>
                                                              </div>
                                                            </li>
                                                          ))}
                                                        </ul>
                                                      </AccordionDetails>
                                                    </Accordion>
                                                  ))}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </React.Fragment>
                                    );
                                  }

                                  if (
                                    prod.product_type === "OC" &&
                                    pageContent.detailedInfo?.onlinecourse_info?.length
                                  ) {
                                    return (
                                      <>
                                        <div
                                          className={
                                            activeTabType === "OC"
                                              ? "resp-accordion resp-tab-item hor_1 resp-tab-active"
                                              : "resp-accordion resp-tab-item hor_1"
                                          }
                                          onClick={(e) => changeCourseLibrary(e, prod.product_type)}
                                          style={{
                                            borderColor: "rgba(221, 221, 221, 0.51)",
                                            background: "none",
                                          }}
                                        >
                                          <span className="arrow"></span>
                                          <div>
                                            <i className="icon icon-font-play"></i>
                                            <samp>
                                              Video Course
                                              <small
                                                style={{
                                                  fontSize: "70%",
                                                  margin: "3px 0 0 0",
                                                }}
                                              >
                                                {pageContent?.web_counts?.vid_count} Videos
                                                Available
                                              </small>
                                            </samp>
                                          </div>
                                        </div>

                                        <div
                                          // title="video-course"
                                          className="tab_content"
                                          style={{
                                            display: activeTabType === "OC" ? "block" : "none",
                                          }}
                                        >
                                          <p
                                            dangerouslySetInnerHTML={{
                                              __html: prod?.other_details?.short_description,
                                            }}
                                          />
                                          <div className="accordian-block">
                                            <div className="title">
                                              Topic-wise Content Distribution
                                            </div>
                                            <div className="accordian-list">
                                              <div className="item">
                                                {videoCourseData.length > 0 &&
                                                  videoCourseData.map((vcData, vcIdx) => (
                                                    <Accordion
                                                      square
                                                      expanded={expanded === "panel" + vcIdx}
                                                      onChange={handleChangeAccordion(
                                                        "panel" + vcIdx
                                                      )}
                                                    >
                                                      <AccordionSummary
                                                        aria-controls={"panel1d-content" + vcIdx}
                                                        id={"panel1d-header" + vcIdx}
                                                        className={
                                                          expanded === "panel" + vcIdx
                                                            ? "item-head open"
                                                            : "item-head"
                                                        }
                                                      >
                                                        <div className="left">
                                                          <samp></samp>
                                                          <span>{vcData.section_heading}</span>
                                                        </div>
                                                        <div className="right">
                                                          {(() => {
                                                            let labCount = vcData.children.filter(
                                                              (val) => val.activity_id == 6
                                                            ).length;
                                                            return (
                                                              labCount > 0 && (
                                                                <div className="total-test labs-count">
                                                                  {labCount > 1
                                                                    ? labCount + " labs"
                                                                    : labCount + " lab"}
                                                                </div>
                                                              )
                                                            );
                                                          })()}
                                                          <div className="total-test">
                                                            {vcData.children?.length +
                                                              (vcData.children?.length > 1
                                                                ? " lectures"
                                                                : " lecture")}
                                                          </div>
                                                        </div>
                                                      </AccordionSummary>
                                                      <AccordionDetails className="item-content">
                                                        <ul>
                                                          {vcData.children?.map((data, idx) => (
                                                            <li key={idx}>
                                                              <div className="title">
                                                                {data.activity_id === 2 && (
                                                                  <>
                                                                    <i className="icon-play icon-font-play-btn-filled"></i>
                                                                    <span>{data.video_name}</span>
                                                                  </>
                                                                )}
                                                                {data.activity_id === 6 && (
                                                                  <>
                                                                    <i className="icon-font-bicker"></i>
                                                                    <span>{data.lab_name}</span>
                                                                  </>
                                                                )}
                                                              </div>
                                                              <div className="right">
                                                                {data.is_free && (
                                                                  <a
                                                                    className="btn-try"
                                                                    href="#"
                                                                    onClick={(e) =>
                                                                      handleOnlineCourse(e, data.id)
                                                                    }
                                                                  >
                                                                    Try now
                                                                  </a>
                                                                )}
                                                                {data.activity_id === 2 && (
                                                                  <div className="total-que">
                                                                    {data.time_hour > 0 &&
                                                                      data.time_hour + "h "}
                                                                    {data.time_minute > 0 &&
                                                                      data.time_minute + "m "}
                                                                    {data.time_second > 0 &&
                                                                      data.time_second + "s "}
                                                                  </div>
                                                                )}
                                                                {data.activity_id === 6 && (
                                                                  <div className="total-que">
                                                                    {data.duration_hour > 0 &&
                                                                      data.duration_hour + "h "}
                                                                    {data.duration_minutes > 0 &&
                                                                      data.duration_minutes + "m "}
                                                                  </div>
                                                                )}
                                                              </div>
                                                            </li>
                                                          ))}
                                                        </ul>
                                                      </AccordionDetails>
                                                    </Accordion>
                                                  ))}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    );
                                  }
                                })}

                                {pageContent.detailedInfo?.lab_info?.length > 0 && (
                                  <>
                                    <div
                                      className={
                                        activeTabType === "LAB"
                                          ? "resp-accordion resp-tab-item hor_1 resp-tab-active"
                                          : "resp-accordion resp-tab-item hor_1"
                                      }
                                      onClick={(e) => changeCourseLibrary(e, "LAB")}
                                      style={{
                                        borderColor: "rgba(221, 221, 221, 0.51)",
                                        background: "none",
                                      }}
                                    >
                                      <span className="arrow"></span>
                                      <div>
                                        <i className="icon icon-font-bicker"></i>
                                        <samp>
                                          Hands-on Labs
                                          <small
                                            style={{
                                              fontSize: "70%",
                                              margin: "3px 0 0 0",
                                            }}
                                          >
                                            {pageContent?.web_counts?.lab_count} Labs Available
                                          </small>
                                        </samp>
                                      </div>
                                    </div>
                                    <div
                                      // title="Hands-on Labs"
                                      className="tab_content"
                                      id="hands-on-labs"
                                      style={{
                                        display: activeTabType === "LAB" ? "block" : "none",
                                      }}
                                    >
                                      <div className="accordian-block">
                                        <div className="title">Topic-wise Content Distribution</div>
                                        <div className="accordian-list">
                                          <div className="item">
                                            {labInfoData.length > 0 &&
                                              labInfoData.map((labData, labIdx) => (
                                                <Accordion
                                                  square
                                                  expanded={expanded === "panel" + labIdx}
                                                  onChange={handleChangeAccordion("panel" + labIdx)}
                                                >
                                                  <AccordionSummary
                                                    aria-controls="panel1d-content"
                                                    id="panel1d-header"
                                                    className={
                                                      expanded === "panel" + labIdx
                                                        ? "item-head open"
                                                        : "item-head"
                                                    }
                                                  >
                                                    <div className="left">
                                                      <samp></samp>
                                                      <span>{labData.section_heading}</span>
                                                    </div>
                                                    <div className="right">
                                                      <div className="total-test">
                                                        {labData.children?.length +
                                                          (labData.children?.length > 1
                                                            ? " labs"
                                                            : " lab")}
                                                      </div>
                                                    </div>
                                                  </AccordionSummary>
                                                  <AccordionDetails className="item-content">
                                                    <ul>
                                                      {labData.children.map((data, idx) => (
                                                        <li key={idx}>
                                                          <div className="title">
                                                            <i className="icon-font-bicker"></i>
                                                            <span>{data.lab_name}</span>
                                                          </div>
                                                          <div className="right">
                                                            {data.is_free && (
                                                              <a
                                                                className="btn-try"
                                                                href="#"
                                                                onClick={(e) => handleLabs(e, data)}
                                                              >
                                                                Try now
                                                              </a>
                                                            )}
                                                            <div className="total-que">
                                                              {data?.duration_hour > 0 &&
                                                                `${data?.duration_hour}h `}
                                                              {data?.duration_minutes > 0 &&
                                                                `${data?.duration_minutes}m`}
                                                            </div>
                                                          </div>
                                                        </li>
                                                      ))}
                                                    </ul>
                                                  </AccordionDetails>
                                                </Accordion>
                                              ))}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* <!-- real-exam-block --> */}
                    {/* <div id="exam-info" className="exam-info">
                  <div className="container">
                    {pageContent.seo_details && pageContent.seo_details.description ? (
                      <div className="container-left">
                        <h2 className="title">Real Exam Format and Information</h2>
                        <div
                          className="item-content"
                          dangerouslySetInnerHTML={{
                            __html: pageContent.seo_details?.description,
                          }}
                        ></div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div> */}
                    {sandbox && (
                      <>
                        <div className="container">
                          <div className="container-left">
                            <SandboxContent
                              name={pageData.name}
                              sandbox={sandbox.data}
                            ></SandboxContent>
                          </div>
                        </div>
                      </>
                    )}

                    {/* <!-- why-choose-us --> */}
                    <div className="why-choose-us">
                      <div
                        style={{ color: "white" }}
                        className="container"
                        dangerouslySetInnerHTML={{
                          __html: pageContent.seo_details?.why_with_us,
                        }}
                      />
                    </div>
                  </div>
                  {/* <!-- student-review-block --> */}
                  <div id="reviews" className="review-block" ref={reviews}>
                    <div className="container">
                      <div className="container-left">
                        {/* {videoDatas ? (
                          <div className="video-review">
                            <div className="title">
                              <figure>
                                <img className="img-full" src="/images/quote-img.svg" alt="" />
                              </figure>
                              <h2>Video Reviews</h2>
                            </div>
                            <div className="video-group owl-carousel owl-theme">
                              {videoDatas.map((item, i) => (
                                <React.Fragment key={i}>
                                  <figure onClick={() => openVideoModal("https://www.youtube.com/embed/epHXT9wFopE")}>
                                    <div className="btn-play">
                                      <img
                                        className="img-full"
                                        src="/images/play-btn-big-white.svg"
                                        alt=""
                                      />
                                    </div>
                                    <img
                                      className="img-full"
                                      src={
                                        process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                                        pageContent.seo_details?.featured_image.replace(
                                          "media/",
                                          ""
                                        )
                                      }
                                      onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src = "/images/no-image.png";
                                      }}
                                      alt={pageContent.seo_details?.page_title}
                                      title={pageContent.seo_details?.page_title}
                                    />
                                    <div className="video-layover">
                                      <img
                                        src={
                                          process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                                          item.profile_image.replace("media/", "")
                                        }
                                        alt=""
                                      />
                                      <span>
                                        {item.first_name} {item.last_name}
                                      </span>
                                    </div>
                                  </figure>
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        ) : (
                          ""
                        )} */}

                        {reviewsDatas && reviewsDatas.data && reviewsDatas.data.length > 0 ? (
                          <div className="aboutus-block">
                            <h2 className="title">What our students say about us</h2>
                            <div className="students-review-block">
                              {reviewsDatas.data
                                // .filter((item, index) => index < 5)
                                .map((rev) => (
                                  <div className="block" key={rev.id}>
                                    <div className="student-img">
                                      <UserAvatar
                                        img={rev?.profile_pic}
                                        alt={rev.post_addition?.course?.name}
                                        username={rev.user_name}
                                      />
                                    </div>
                                    <div className="review-content">
                                      <div className="name">
                                        <span>{rev.user_name}</span>
                                        <StarRating
                                          isSingle={false}
                                          avgRating={rev.post_addition.rating}
                                          isSamp={false}
                                        />
                                        {/* {rev.linkedin || rev.post_addition.linkedin_profile_url ? (
                                        <figure>
                                          <img
                                            className="img-full"
                                            src="/images/linkedin.svg"
                                            alt=""
                                          />
                                        </figure>
                                      ) : (
                                        ""
                                      )} */}
                                      </div>
                                      {rev.is_verfied_buyer ? (
                                        <div className="verified-buyer">
                                          <i className="icon icon-font-verified-buyes"></i>
                                          <span>Verified buyer</span>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                      <div
                                        style={{ overflowWrap: "anywhere", marginRight: "50px" }}
                                      >
                                        <a
                                          href={`${process.env.NEXT_PUBLIC_FORUM_URL}/q/${rev?.post_question_id}/${rev?.post_question_slug}`}
                                          target="_blank"
                                          className="link-explain"
                                          style={{ textDecoration: "underline", color: "black" }}
                                        >
                                          {rev?.post_question_title}
                                        </a>
                                        <p
                                          dangerouslySetInnerHTML={{
                                            __html: rev.post_question_text,
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              <div className="total-feedback">
                                <span>{reviewsDatas.pagination.total} People added feedback</span>
                                <Link href={"/" + pageContent.seo_details?.slug + "/reviews/"}>
                                  <a className="link-showmore">Show more</a>
                                </Link>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <!-- faq-block --> */}
                  <div id="faq" className="faq-block" style={{ marginBottom: "40px" }} ref={faqs}>
                    <div className="container">
                      <div className="container-left">
                        <h2 className="title">Frequently Asked Questions</h2>
                        <div id="parentHorizontalTab2" className="tab_wrapper">
                          <ul className="resp-tabs-list hor_1 tab_list">
                            {tabs.map(
                              (Itm, i) =>
                                Itm.available && (
                                  <li
                                    onClick={() => changeFaqType(Itm.type)}
                                    className={faqType === Itm.type && "resp-tab-active"}
                                  >
                                    <samp>
                                      <i className={`icon ${Itm.icon}`}></i>
                                      {Itm.title}
                                    </samp>
                                  </li>
                                )
                            )}
                          </ul>
                          <div className="resp-tabs-container hor_1 content_wrapper">
                            {pageContent.faq_details.map((Itm, i) => {
                              return (
                                <>
                                  {showFaqTab(Itm.faq_type) && (
                                    <div
                                      onClick={() => changeFaqType(Itm.faq_type)}
                                      className={
                                        faqType === Itm.faq_type
                                          ? "resp-accordion hor_1 resp-tab-active"
                                          : "resp-accordion hor_1"
                                      }
                                    >
                                      <span className="arrow"></span>
                                      <samp>
                                        <i className={`icon ${tabs[Itm.faq_type]?.icon}`}></i>
                                        {tabs[Itm.faq_type]?.title}
                                      </samp>
                                    </div>
                                  )}
                                  <div
                                    key={i}
                                    // title={faqType}
                                    className="tab_content resp-tab-active"
                                    style={{
                                      display: faqType === Itm.faq_type ? "block" : "none",
                                    }}
                                  >
                                    <div className="accordian-block">
                                      <div className="accordian-list">
                                        {/* {Itm?.faq &&
                                        Itm.faq.length > 0 &&
                                        Itm.faq.map((item, ie) => (
                                          <React.Fragment key={ie}>
                                            {item &&
                                              item.is_active == 1 &&
                                              item.question &&
                                              item.answer && (
                                                <Accordions
                                                  data={{
                                                    key: ie,
                                                    question: item.question,
                                                    answer: item.answer,
                                                  }}
                                                />
                                              )}
                                          </React.Fragment>
                                        ))} */}
                                        {Itm.faq && Itm.faq.length > 0 && (
                                          <>
                                            <AccordianFaq data={Itm.faq} panel="panel0" />
                                          </>
                                        )}
                                      </div>
                                    </div>
                                    {/* <div className="accordian-block">
                                    <div className="accordian-list">
                                      {Itm.faq &&
                                        Itm.faq.length > 0 &&
                                        Itm.faq.map((item, ie) => (
                                          <React.Fragment key={ie}>
                                            {item &&
                                              item.is_active == 1 &&
                                              item.question &&
                                              item.answer && (
                                                <Accordions
                                                  data={{
                                                    key: ie,
                                                    question: item.question,
                                                    answer: item.answer,
                                                  }}
                                                />
                                              )}
                                          </React.Fragment>
                                        ))}
                                    </div>
                                  </div> */}
                                  </div>
                                </>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="right-section right-new-prod">
                  <div className={`buy-box ${crazyDealPromo && "crazy-deal"}`}>
                    {/* <img src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}dark-product-bf.webp`} alt="product BF banner" style={{width:"100%",objectFit:"contain"}}></img> */}
                    {cartLoading && (
                      <div
                        className="loader"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          background: "#e6e2e28a",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 9,
                        }}
                      >
                        <img
                          src="/images/loader.svg"
                          style={{
                            width: "50px",
                          }}
                        />
                      </div>
                    )}

                    {crazyDealPromo ? (
                      <CrazyDealSidebar crazyDealData={crazyDealData} currency={currency} />
                    ) : (
                      <>
                        <h6 className="head-txt">This includes</h6>
                        <div
                          className="option-group"
                          style={{ pointerEvents: cartLoading ? "none" : "all" }}
                        >
                          <ul>
                            {enrolledProductTypes.includes("SANDBOX") ? (
                              <li className="option">
                                <label className="custom-checkbox">
                                  <div className="name">
                                    Sandbox <div className="status"></div>
                                  </div>
                                  <div className="price-block">
                                    <a
                                      href="#"
                                      className="btn-access"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        if(task_slug == "aws-sandbox") {
                                          window.open(
                                            `${process.env.NEXT_PUBLIC_PLAY_URL}/sandbox/aws/${task_slug}`
                                          );
                                        } else {
                                          window.open(
                                            `${process.env.NEXT_PUBLIC_PLAY_URL}/${task_slug}` // todo fix
                                            // `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageContent.seo_details?.slug}/${pageContent.id}/sb`
                                          );
                                        }
                                      }}
                                    >
                                      Access Now
                                    </a>
                                  </div>
                                </label>
                              </li>
                            ) : (
                              // prettier-ignore
                              [...pageContent.products]
                                .sort((a,b) => a.sale_price[currency.type] - b.sale_price[currency.type])
                                .map((element, i) => {
                                  let data = notified?.find(itm => itm.id == pageData.id)
                                if (element.product_type.includes("SANDBOX")) {
                                  return (
                                    <li
                                      className="option active"
                                      onClick={(e) => {
                                        if (
                                          element.is_comingsoon === 1 ||
                                          element.is_comingsoon === 2
                                        ) {
                                          return;
                                        }
                                        handleToggle({
                                          e,
                                          type: element.product_type.toLowerCase(), // product Type - PT, OC, LAB
                                          discountPrice: element.regular_price[currency.type], // regular price
                                          originalPrice: element.sale_price[currency.type], // sale price
                                          disPercentage: getPercentage(
                                            element.regular_price[currency.type],
                                            element.sale_price[currency.type]
                                          ), // Percentage
                                        });
                                      }}
                                    >
                                      <label className="custom-checkbox">
                                        {!enrolledProductTypes.includes(element.product_type) &&
                                          !sandboxDiscontinued &&
                                          !sandboxComingSoon && (
                                            <>
                                              <input
                                                type="checkbox"
                                                readOnly
                                                checked={selctedCourses.includes(
                                                  element.product_type.toLowerCase()
                                                )}
                                              />
                                              <span className="checkbox-style"></span>
                                            </>
                                          )}
                                        <div className="name">
                                          {element.validity} Month{element.validity > 1 ? "s" : ""}
                                          {element.is_comingsoon == 1 ? (
                                            <div className="status">
                                              Coming Soon!{" "}
                                              <span
                                                // className={`btn-notify ${isNotifyButtonDisabled ? "disabled-btn-notify" : "disabled-btn-notify"}`}
                                                // onClick={(e) =>
                                                //   // openComingSoonOrNotifyModal(
                                                //   //   e,
                                                //   //   pageContent.id,
                                                //   //   element.product_type
                                                //   // )
                                                //   {
                                                //     e.preventDefault()
                                                //     handleNotifyButtonClick(element.product_type)
                                                //   }
                                                // }
                                              >
                                                <button 
                                                onClick={(e) =>{
                                                e.preventDefault()
                                                handleNotifyButtonClick(element.product_type);
                                              }
                                              }
                                              disabled={isNotifyButtonDisabled}>
                                              {data && data.product.includes(element.product_type)?<>Notification Enabled</>:<>Notify Me</>}</button>
                                              </span>
                                            </div>
                                          ) : element.is_comingsoon == 2 ? (
                                            <div className="status">Discontinued</div>
                                          ) : enrolledProductTypes.includes(
                                              element.product_type
                                            ) ? (
                                            <div className="status"></div>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                        <div className="price-block">
                                          {enrolledProductTypes.includes(element.product_type) &&
                                          !sandboxDiscontinued &&
                                          !sandboxComingSoon ? (
                                            <a
                                              href="#"
                                              className="btn-access"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                window.open(
                                                  `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageContent.seo_details?.slug}/${pageContent.id}/sb`
                                                );
                                              }}
                                            >
                                              Access Now
                                            </a>
                                          ) : (
                                            element.sale_price[currency.type] &&
                                            !sandboxDiscontinued &&
                                            !sandboxComingSoon && (
                                              <>
                                                <del className="old-price">
                                                  {currency.symbol}
                                                  {element.regular_price[currency.type]}
                                                </del>
                                                <span className="price">
                                                  {currency.symbol}
                                                  {element.sale_price[currency.type]}
                                                </span>
                                              </>
                                            )
                                          )}
                                        </div>
                                      </label>
                                    </li>
                                  );
                                }
                              })
                            )}
                          </ul>
                        </div>
                      </>
                    )}

                    {!checkIfUserEnrolledAllProducts() && totalFinalPrice > 0 && (
                      <div className="price-and-offer">
                        <span style={{ display: pageData.isCampaign ? "none" : "initial" }}></span>
                        <span
                          className="offer"
                          style={{ display: pageData.isCampaign ? "initial" : "none" }}
                        >
                          {Math.round(discountPercentage / selctedCourses.length)}% OFF
                        </span>
                        <div className="price-block">
                          <del className="old-price cds">
                            {currency.symbol}
                            {priceFormat(totalDiscountPrice)}
                          </del>
                          <span className="price">
                            {currency.symbol}
                            {priceFormat(totalFinalPrice)}
                          </span>
                        </div>
                      </div>
                    )}

                    {!checkIfUserEnrolledAllProducts() && totalFinalPrice > 0 && (
                      <div className="btn-group">
                        {/* {!crazyDealPromo && (
                          <button
                            className={
                              !checkIfUserEnrolledAllProducts() && selctedCourses.length > 0
                                ? "btn add-to-cart"
                                : "btn add-to-cart disabled"
                            }
                            style={{
                              maxWidth: "100%",
                            }}
                            onClick={(e) => {
                              if (selctedCourses.length > 0) {
                                handleCart(e);
                              }
                            }}
                          >
                            Add to Cart
                          </button>
                        )} */}

                        {/* <div
                        className={
                          activeWhislist && activeWhislist == "active"
                            ? "add-whishlist active"
                            : "add-whishlist"
                        }
                        onClick={() => toggleWhislist()}
                      >
                        <i
                          ref={wishlistIcon}
                          className="icon icon-font-heart animate__animated"
                        ></i>
                      </div> */}

                        {!crazyDealPromo && !checkIfUserEnrolledAllProducts() && selctedCourses.length > 0 && (
                          <button
                            // className="btn buy-now"
                            className={
                              !checkIfUserEnrolledAllProducts() && selctedCourses.length > 0
                                ? "btn buy-now"
                                : "btn buy-now disabled"
                            }
                            onClick={(e) => {
                              if (selctedCourses.length > 0) {
                                handleCart(e);
                              }
                            }}
                          >
                            Add to Cart
                          </button>
                        )}
                        {
                          crazyDealPromo && enrolledProductTypes.length == 0 && <button
                          className="btn buy-now"
                          onClick={(e) => handleBuyNow(e)}
                          style={{
                            width: "100%",
                          }}
                        >
                          Buy Now
                        </button>
                        }
                      </div>
                    )}
                    <div style={{fontSize:'11px', fontWeight:'400', color:'#51596C', marginTop:"17px", borderBottom:"1px solid #DFE6EF", margin:'0 0 14px 0', paddingBottom:'10px'}}>If you need a custom sandbox with an extended duration reach out to our team at <span style={{color:"#168FF8", textDecoration:'underline', cursor:'pointer'}}><a href='mailto:support@whizlabs.com' style={{color:"#168FF8"}}>support@whizlabs.com</a></span></div>

                    <div className="share-course">
                      <span>Share this course</span>
                      <a
                        className="btn-share"
                        style={{ cursor: "pointer" }}
                        onClick={(e) =>
                          openComingSoonOrNotifyModal(e, pageContent.id, null, pageContent, "SHARE")
                        }
                      >
                        <i className="icon icon-font-share"></i>
                        <samp>Share</samp>
                      </a>
                    </div>
                    { enrolledProductTypes.includes("PT") &&
                      enrolledProductTypes.includes("OC") &&
                      enrolledProductTypes.includes("SANDBOX") &&
                      enrolledProductTypes.includes("LAB") ? 
                      (null): (<div className="subscribe-course">
                      <div className="subscribe-course-in">
                        <div> Access all courses with our subscription plan.</div>
                        <div>All courses, One subscription! </div>
                           {enrolledProductTypes.includes("PT") &&
                      enrolledProductTypes.includes("OC") &&
                      enrolledProductTypes.includes("LAB") ?  ( 
                      <div className="subsc">
                        <Link href="/pricing">                  
                          <button className="sub-btn" 
                            >Upgrade now</button>
                        </Link>
                      </div>
                      ) : (
                        <div className="subsc">
                          <Link href="/pricing">                  
                            <button className="sub-btn" 
                            onClick={(e) => handleSubsClick()}
                              >Subscribe Now</button>
                          </Link>
                        </div> 
                        )}
                        <div className="amtt">Starts from ${priceToShow} /month</div>
                      </div>
                    </div>)}
                  </div>
                </div>

                {!checkIfUserEnrolledAllProducts() && totalFinalPrice > 0 && (
                  <div className="bottom-cart-sticky">
                    <div className="left">
                      <div className="title">{pageContent.seo_details?.page_title}</div>
                      <div className="bottom-group">
                        <div className="price-block">
                          {totalDiscountPrice > 0 ? (
                            <del className="old-price">
                              {currency.symbol}
                              {priceFormat(totalDiscountPrice)}
                            </del>
                          ) : (
                            ""
                          )}
                          <span className="price">
                            {currency.symbol}
                            {priceFormat(totalFinalPrice)}
                          </span>
                        </div>
                        <StarRating
                          isSamp={true}
                          avgRating={pageContent.ratings?.overall_rating}
                          totalRating={pageContent.ratings?.rating}
                        />
                      </div>
                    </div>
                    <div className="btn-group">
                      {!crazyDealPromo && !checkIfUserEnrolledAllProducts() && selctedCourses.length > 0 &&(
                        <button
                          className={
                            !checkIfUserEnrolledAllProducts() && selctedCourses.length > 0
                              ? "btn buy-now"
                              : "btn buy-now disabled"
                          }
                          onClick={(e) => {
                            if (selctedCourses.length > 0) {
                              handleCart(e);
                            }
                          }}
                        >
                          Add to Cart
                        </button>
                      )}
                      {
                        crazyDealPromo && enrolledProductTypes.length == 0 &&   <button className="btn buy-now" onClick={(e) => handleBuyNow(e)}>
                          Buy Now
                        </button>
                      }
                    </div>
                  </div>
                )}
              </div>

              {/* <!-- Frequently Bought Together --> */}
              {/* <FrequentCourses cartData={cartData} freqCoursesData={freqCoursesData} /> */}
            </div>
          </div>
          <br />

          <CallToAction />
          {pageContent.seo_details?.genuine_service && (
            <React.Fragment>
              <br />
              <div className="genuine-service">
                <div
                  className="container"
                  style={{ color: "black" }}
                  dangerouslySetInnerHTML={{
                    __html: pageContent.seo_details?.genuine_service,
                  }}
                />
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    cartData: state.cart.cart,
    userData: state.authData.userData,
    whislist: state.whislist.whislist,
    currencyData: state.ipDetails.currency_detail,
    redirectTo: state.redirectData.redirect_to,
    utmData: state.utmData,
    whizCard: state.whizCard.data,
    notified: state.userCourse.notified_course
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCartAction: (id, type,currency) => dispatch(addToCart(id, type,currency)),
    removeFromCartAction: (id, type) => dispatch(removeFromCart(id, type)),
    addWhislist: (course_id, user_id) => dispatch(StoreWhishlist(course_id, user_id)),
    alertBoxAction: (data) => dispatch(alertBox(data)),
    redirectionAction: (data, url) => dispatch(updateRedirection(data, url)),
    updateNotified:(user_id) => dispatch(NotifiedCourse(user_id)),
    buttonClickAction: (data, cookie) => dispatch(subsButtonClick(data, cookie)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sandbox);
