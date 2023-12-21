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
import CrazyDealSidebar from "../../components/shared/CrazyDealSidebar";
import CrazyDealTopBanner from "@/components/shared/CrazyDealTopBanner";
import AccordianCourse from "@/components/shared/AccordianCourse";
import AccordianFaq from "@/components/shared/AccordianFaq";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  updateDownloadWhizCardStatus,
  getWhizCardDetail,
  getwhizcardstatus,
} from "@/services/review-services/services";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NotifiedCourse } from "redux/userCourse/usercourse-action";
import { subsButtonClick } from "redux/buttonClick/click-actions";
import cookie from "js-cookie";
import InboxIcon from "@material-ui/icons/Inbox";
import { gcp_course_id } from "lib/Library_lib";
import { ImageTwoTone } from "@material-ui/icons";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { WhizcardModal } from "@/components/shared/Modals";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Course = ({
  pageData,
  addToCartAction,
  freqCoursesData,
  cartData,
  userData,
  reviewsDatas,
  feedbackData,
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
  whizCard,
  notified,
  updateNotified,
  clientStatus,
  exampattern,
  language,
  examcode,
  timer_details,
  timerStatus,
  subscriptionRes,
  buttonClickAction,
  seoHomePageData,
}) => {
  const wishlistIcon = useRef(null);
  const router = useRouter();
  const path = router.pathname;
  const [demoVideoLink, setDemoVideoLink] = useState("");
  const [PTavailabe, isPTavailable] = useState(false);
  const [OCavailabe, isOCavailable] = useState(false);
  const [LABavailabe, isLABavailable] = useState(false);
  const [Sanboxavailable, isSandboxavaialble] = useState(false);
  const [courseAlreadyInCart, setCourseAlreadyInCart] = useState([]);
  const [selectedCourseType, setSelectedCourseType] = useState([]);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [totalDiscountPrice, setTotalDiscountPrice] = useState(0);
  const [totalFinalPrice, setTotalFinalPrice] = useState(0);
  const [pageContent, setPageContent] = useState(null);
  const [faqType, setFaqType] = useState("E");
  const [videoData, setVideoData] = useState([]);
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [activeWhislist, setActiveWhislist] = useState("");
  const [freeTestPresent, setfreeTestPresent] = useState(false);
  const [downloadlink, setdownloadlink] = useState("");
  const [isalertshow, setalertshow] = useState(true);
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
  const [isLabComingsoon, setlabComingSoon] = useState(false);
  const [isSandComingsoon, setSandcomingsoon] = useState(false);
  // const [showwhizcard, setShowwhizcard] = useState(false);
  const [crazyDealPromo, setCrazyDealPromo] = useState(false);
  const [discontinuesPT, setdiscontinuedPT] = useState(false);
  const [discontinuesOC, setdiscontinuedOC] = useState(false);
  const [discontinuesLAB, setdiscontinuedLAB] = useState(false);
  const [discountinuesSandbox, setdiscontinuedSandbox] = useState(false);
  const [purchaseDisabled, setPurchaseDisabled] = useState(false);
  const [FTAvailable, setFTAvailable] = useState(false);

  const [showmore, setShowmore] = useState(false);
  const [winwidth, setwinwidth] = useState(0);

  const [visibleSection, setVisibleSection] = useState("");
  const courseOverview = useRef(null);
  const examInfo = useRef(null);
  const whatsIncluded = useRef(null);
  const reviews = useRef(null);
  const faqs = useRef(null);
  const top = useRef(null);
  const [rmbutton, setRmbutton] = useState(false);
  const [whizcardstat, setwhizcardstat] = useState(false);
  const [activePlan, setActivePlan] = useState<"INDIVIDUAL" | "TEAMS">("INDIVIDUAL");

  const sectionref = [
    { section: "CourseOverview", ref: courseOverview },
    { section: "examInfo", ref: examInfo },
    { section: "whatsIncluded", ref: whatsIncluded },
    { section: "reviews", ref: reviews },
    { section: "faqs", ref: faqs },
  ];
  const dispatch = useDispatch();
  let count = 0;

  const [isBreakpoint, setIsBreakpoint] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView: isBreakpoint <= 450 ? 1 : 3,
    spacing: 20,
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });
  useEffect(() => {
    const handleResize = () => {
      setIsBreakpoint(window.innerWidth);
    };
    if (window) {
      setIsBreakpoint(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    if (window) {
      setwinwidth(window.innerWidth);
    }
    const handleResize = () => {
      if (window) {
        setwinwidth(window.innerWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //get all the product types and make sure what is available PT OC LABS SANDBOX
  useEffect(() => {
    if (pageData) {
      let prd = pageData.products;
      prd.forEach((itm: { product_type: string; is_comingsoon: string }) => {
        if (itm.product_type === "PT") {
          itm.is_comingsoon === "1"
            ? SetisPtComingSoon(true)
            : itm.is_comingsoon === "2"
            ? setdiscontinuedPT(true)
            : isPTavailable(true);
        }
        if (itm.product_type === "OC") {
          itm.is_comingsoon === "1"
            ? SetisOcComingSoon(true)
            : itm.is_comingsoon === "2"
            ? setdiscontinuedOC(true)
            : isOCavailable(true);
        }
        if (itm.product_type === "LAB") {
          itm.is_comingsoon === "1"
            ? setlabComingSoon(true)
            : itm.is_comingsoon === "2"
            ? setdiscontinuedLAB(true)
            : isLABavailable(true);
        }
        if (itm.product_type === "SANDBOX") {
          itm.is_comingsoon === "1"
            ? setSandcomingsoon(true)
            : itm.is_comingsoon === "2"
            ? setdiscontinuedSandbox(true)
            : isSandboxavaialble(true);
        }
        if (itm.product_type === "FT") {
          itm.is_comingsoon === "0" ? setFTAvailable(true) : setFTAvailable(false);
        }
      });
    }
    return () => {
      SetisPtComingSoon(false);
      SetisOcComingSoon(false);
      setlabComingSoon(false);
      setSandcomingsoon(false);
      setdiscontinuedPT(false);
      setdiscontinuedOC(false);
      setdiscontinuedLAB(false);
      setdiscontinuedSandbox(false);
      isPTavailable(false);
      isOCavailable(false);
      isLABavailable(false);
      isSandboxavaialble(false);
      setSelectedCourseType([]);
    };
  }, [pageData]);

  useEffect(() => {
    document.querySelector("body").classList.add("product-page-footer-banner");
    const freeQuizId = pageData.detailedInfo?.praticetest_info.find((Itm) => Itm.is_free === true);
    if (typeof freeQuizId !== "undefined") {
      setfreeTestPresent(true);
    }
  }, [pageData, enrolledProductTypes]);

  useEffect(() => {
    if (crazyDealData && enrolledProductTypes.length === 0) setCrazyDealPromo(crazyDealData);
    else setCrazyDealPromo(false);
  }, [crazyDealData, enrolledProductTypes]);

  useEffect(() => {
    let whizcard = () => {
      if (pageData && pageData.id) {
        if (pageData?.whizcard?.length > 0) {
          let link = process.env.NEXT_PUBLIC_WEB_MEDIA_URL;
          let fname = pageData.whizcard;
          let result = link.concat(fname);
          setdownloadlink(result);
        }
      }
    };
    whizcard();
  }, [pageData]);

  useEffect(() => {
    if (enrolledProductTypes.includes("PT") && enrolledProductTypes.includes("OC")) {
      pageData.products.map((prod) => {
        if (
          prod.product_type == "LAB" &&
          prod.regular_price[currency.type] === "0" &&
          prod.sale_price[currency.type] === "0"
        ) {
          setPurchaseDisabled(true);
        }
      });
    }
    // if (!enrolledProductTypes.includes("PT") && !enrolledProductTypes.includes("OC") && !selectedCourseType.includes("PT") && !selectedCourseType.includes("PT")){
    //   pageData.products.map((prod)=>{
    //     if (prod.product_type =="LAB" && prod.regular_price[currency.type] === "0" && prod.sale_price[currency.type] === "0")
    //     if (selectedCourseType.includes("LAB")){
    //     setPurchaseDisabled(true);
    //     }
    //   })
    // }
    if (selectedCourseType.length > 0) {
      if (!selectedCourseType.includes("sandbox")) {
        setalertshow(true);
      }
      if (selectedCourseType.includes("oc") && selectedCourseType.includes("sandbox")) {
        setalertshow(true);
      }
    }
  }, [enrolledProductTypes, pageData, selectedCourseType]);
  useEffect(() => {
    if (
      !selectedCourseType.includes("pt") &&
      !selectedCourseType.includes("oc") &&
      selectedCourseType.includes("lab")
    ) {
      pageData.products.map((prod) => {
        if (
          prod.product_type == "LAB" &&
          prod.regular_price[currency.type] === "0" &&
          prod.sale_price[currency.type] === "0"
        ) {
          setPurchaseDisabled(true);
        }
      });
    } else {
      setPurchaseDisabled(false);
    }
  }, [selectedCourseType, pageData]);

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

      if (
        isPtComingSoon == false &&
        PTavailabe &&
        pageData?.detailedInfo?.praticetest_info?.length > 0
      ) {
        setActiveTabType("PT");
        setExpanded("panel0");
      } else if (
        isOcComingSoon == false &&
        OCavailabe &&
        pageData?.detailedInfo?.onlinecourse_info?.length > 0
      ) {
        setActiveTabType("OC");
        setExpanded("panel0");
      } else if (pageData?.detailedInfo?.lab_info?.length > 0 && LABavailabe) {
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
        setSchemaProductReviews(schemaReviews);
      }

      pageData.products.forEach((prod) => {
        if (prod.product_type !== "FT" && prod.product_type !== "ILT" && prod.is_comingsoon < 1) {
          overall_price_of_product += parseFloat(prod.sale_price[currency.type]);
          if (prod.product_type == "PT") {
            available_product_types.push("Practice Tests");
          }
          if (prod.product_type == "OC") {
            available_product_types.push("Video Course");
          }
          if (prod.product_type == "LAB") {
            available_product_types.push("Hands-On Labs");
          }
          if (prod.product_type == "SANDBOX") {
            available_product_types.push("Sandbox");
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
      // for sandbox to product we have 1m 3m and 6m .. so sale_price[1] means price for 1 Month
      pageData.products.forEach((prod) => {
        if (prod.product_type === "SANDBOX") {
          let validity = Object.keys(prod.regular_price);
          let SB_sale_price = prod.sale_price[validity[0]];
          let SB_reg_price = prod.regular_price[validity[0]];
          if (!enrolledProductTypes.includes("SANDBOX") && prod.is_comingsoon < 1) {
            prodObj.prodType.push("sandbox");
            prodObj.finalPrice +=
              SB_sale_price[currency.type] > 0 ? parseFloat(SB_sale_price[currency.type]) : 0;
            prodObj.discountPrice +=
              SB_sale_price[currency.type] > 0 ? parseFloat(SB_reg_price[currency.type]) : 0;
            prodObj.discountPercent +=
              SB_sale_price[currency.type] > 0
                ? getPercentage(
                    parseFloat(SB_reg_price[currency.type]),
                    parseFloat(SB_sale_price[currency.type])
                  )
                : 0;
          }
        }
        if (
          prod.product_type !== "FT" &&
          prod.product_type !== "ILT" &&
          prod.product_type !== "SANDBOX" &&
          // prod.product_type !== "LAB" &&
          prod.is_comingsoon < 1 &&
          !enrolledProductTypes.includes(prod.product_type.toUpperCase())
        ) {
          if (clientStatus && gcp_course_id.includes(pageData.id) && prod.product_type == "LAB") {
          } else {
            prodObj.prodType.push(prod.product_type.toLowerCase());
            prodObj.finalPrice +=
              prod.sale_price[currency.type] > 0 ? parseFloat(prod.sale_price[currency.type]) : 0;
            prodObj.discountPrice +=
              prod.sale_price[currency.type] > 0
                ? parseFloat(prod.regular_price[currency.type])
                : 0;
            prodObj.discountPercent +=
              prod.sale_price[currency.type] > 0
                ? getPercentage(
                    parseFloat(prod.regular_price[currency.type]),
                    parseFloat(prod.sale_price[currency.type])
                  )
                : 0;
          }
        }
        // if(clientStatus && prod.product_type == "SANDBOX"){
        //   prodObj.prodType.push(prod.product_type.toLowerCase());
        //   validity = Object.keys(prod.regular_price)
        //   prodObj.finalPrice +=
        //   prod.sale_price[validity[0]][currency.type] > 0 ? parseFloat(prod.sale_price[validity[0]][currency.type]) : 0;
        // prodObj.discountPrice +=
        //   prod.sale_price[validity[0]][currency.type] > 0
        //     ? parseFloat(prod.regular_price[validity[0]][currency.type])
        //     : 0;
        // prodObj.discountPercent +=
        //   prod.sale_price[validity[0]][currency.type] > 0
        //     ? getPercentage(
        //       parseFloat(prod.regular_price[validity[0]][currency.type]),
        //       parseFloat(prod.sale_price[validity[0]][currency.type])
        //     )
        //     : 0;
        // }
      });
      let is_sandbox_crdeal = false;
      pageData.products.forEach((itm) => {
        if (itm.product_type == "SANDBOX") {
          is_sandbox_crdeal = true;
        }
      });
      if (crazyDealData && crazyDealPromo && is_sandbox_crdeal) {
        prodObj.prodType.push("sandbox");
      }
      setSelectedCourseType(prodObj.prodType);
      if (crazyDealData && crazyDealPromo) {
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

    // DETAILED INFO MAPPING START
    // PT
    const ptTree = [];
    let vcCount = 1;
    pageData?.detailedInfo?.praticetest_info.forEach((item, idx) => {
      if ("quiz_name" in item) {
        item.children = [];

        if (idx === 0 && item.activity_id != 4) {
          ptTree.push({
            section_heading: "Practice Tests",
            section_desc: null,
            order_by: 1,
            children: [],
          });
        }

        if (item.activity_id == 4) {
          ptTree.push(item);
          return;
        }

        if (idx == 0 && item.activity_id != 4) {
          item.quiz_serial = idx + 1;
        }

        if (item.activity_id != 4) {
          item.quiz_serial = vcCount;
        }

        ptTree.length > 0 ? ptTree[ptTree.length - 1].children.push(item) : ptTree.push(item);

        vcCount = vcCount + 1;
      }
    });
    setPracticeTestData(ptTree);

    // OC
    const vcTree = [];
    let filtered = [];
    pageData?.detailedInfo?.onlinecourse_info.forEach((item, idx) => {
      item.children = [];

      if (idx === 0 && !item["section_heading"]) {
        vcTree.push({
          section_heading: "Course Lectures",
          section_desc: null,
          order_by: 1,
          children: [],
        });
      }

      if ("section_heading" in item) {
        vcTree.push(item);
        return;
      }

      filtered = vcTree.filter(function (value, index, arr) {
        return value.activity_id != 1;
      });

      filtered.length > 0 && filtered[filtered.length - 1].children.push(item);
    });
    filtered.length > 0 &&
      filtered.forEach((itm, i) => {
        if (itm.children.length > 0) {
          itm.serial = i + 1;
        }
      });
    setVideoCourseData(filtered);

    // LAB
    const labTree = [];
    let labCount = 1;
    pageData?.detailedInfo?.lab_info
      .sort((a, b) => a.order_by - b.order_by)
      .forEach((item, idx) => {
        item.children = [];

        if (item.section_heading) {
          labTree.push(item);
          return;
        }

        // if(item.active){
        labTree.length > 0 ? labTree[labTree.length - 1].children.push(item) : labTree.push(item);
        // }

        labCount = labCount + 1;
      });

    setLabInfoData(labTree);

    // DETAILED INFO MAPPING END
  }, [
    cartData,
    pageData,
    currency,
    enrolledProductTypes,
    crazyDealData,
    crazyDealPromo,
    clientStatus,
  ]);

  useEffect(() => {
    if (whislist.includes(pageData.id)) {
      setActiveWhislist("active");
    } else {
      setActiveWhislist("");
    }
  }, [whislist]);

  useEffect(() => {
    let show_notify = cookie.get("show_notifymodal");
    // console.log("useEffect",show_notify)
    if (show_notify) {
      let type = "NOTIFY";
      if (document) {
        if (notified) {
          let data = notified.find((itm) => itm.id == pageData.id);
          if (!data?.product.includes(cookie.get("course_type"))) {
            // document.querySelector("body").classList.add("open-modal-notify");
            Notification_operation(cookie.get("course_type"));
            cookie.remove("show_notifymodal");
            cookie.remove("course_type");
          } else {
            cookie.remove("show_notifymodal");
            cookie.remove("course_type");
            alertBoxAction({
              type: "SUCCESS",
              title: "Success",
              msg: "Notification set already",
            });
          }
        }
      }
    }
  }, []);
  const handleToggle = async (e, type, discountPrice, originalPrice, disPercentage) => {
    e.preventDefault();
    if (clientStatus && gcp_course_id.includes(pageData.id)) {
      return;
    }
    if (enrolledProductTypes.includes(type.toUpperCase())) {
      return;
    }
    if (!crazyDealPromo) {
      setCartLoading(true);
      let index = selectedCourseType.indexOf(type);
      const newChecked = [...selectedCourseType];
      let newDiscountPrice = totalDiscountPrice;
      let newOriginalPrice = totalFinalPrice;
      let newDiscountPercentage = discountPercentage;

      if (index === -1) {
        newChecked.push(type);
        newDiscountPrice += parseFloat(discountPrice);
        newOriginalPrice += parseFloat(originalPrice);
        newDiscountPercentage += parseInt(disPercentage);
        selected += 1;
      } else {
        newChecked.splice(index, 1);
        newDiscountPrice -= parseFloat(discountPrice);
        newOriginalPrice -= parseFloat(originalPrice);
        newDiscountPercentage -= parseInt(disPercentage);
        selected -= 1;
      }

      setSelectedCourseType(newChecked);
      setTotalDiscountPrice(newDiscountPrice);
      setTotalFinalPrice(newOriginalPrice);
      setDiscountPercentage(newDiscountPercentage);
    }
  };
  useEffect(() => {
    if (cartLoading) {
      // deselect and removed from cart
      if (courseAlreadyInCart && courseAlreadyInCart.length > 0) {
        let filteredCourse = courseAlreadyInCart.filter(
          (item) => !selectedCourseType.includes(item)
        );
        filteredCourse.forEach(async (e) => removeFromCartAction(pageContent.id, e));
      }
    }

    return () => setCartLoading(false);
  }, [selectedCourseType, cartLoading]);

  const scrollTo = (ele) => {
    // ele?.scrollIntoView({
    //   behavior: "smooth",
    //   block: "start",
    // });
    var element = ele;
    var headerOffset = 128;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const checkIfUserEnrolledAllProducts = () => {
    let availableProdTypes = [];
    let enroll_count = 0;
    pageData.products.forEach((prod) => {
      if (prod.product_type !== "FT" && prod.product_type !== "ILT" && prod.is_comingsoon < 1) {
        availableProdTypes.push(prod.product_type.toUpperCase());
      }
    });
    availableProdTypes.forEach((item) => {
      if (enrolledProductTypes.includes(item.toUpperCase())) {
        enroll_count = enroll_count + 1;
      }
    });
    return availableProdTypes.length === enroll_count;
  };

  const priceFormat = (value) => {
    let is_decimal: any = value % 1;
    if (is_decimal != 0) {
      return Number(value).toFixed(2);
    } else {
      return Number(value);
    }
  };

  const getPercentage = (regular, sale) => {
    return Math.round(((regular - sale) / regular) * 100);
  };

  const openPreviewModal = () => {
    if (pageContent && pageContent.seo_details) {
      const product = pageContent.products.find(
        (item) => item.product_type === "OC" && item.other_details && item.other_details.video_link
      );
      let vailable = product ? isTypeAvailable("OC") : false;
      setPreviewData({
        courseTitle: pageContent.seo_details?.page_title,
        courseImage: `${
          process.env.NEXT_PUBLIC_WEB_MEDIA_URL
        }${pageContent.seo_details?.featured_image.replace("media/", "")}`,
        courseSlug: pageContent.seo_details?.slug,
        sellLevel: pageContent.seo_details?.sell_level,
        totaRatingCount: pageContent.ratings?.rating,
        averageRating: pageContent.ratings?.overall_rating,
        courseLevel: pageContent.other_attributes?.course_level,
        courseDescription: pageContent.description,
        demoVideoLink,
        isOcAvailable: vailable,
        page_type: "course",
        detailedInfo: pageContent.detailedInfo,
        isPtComingSoon: isPtComingSoon,
        isOcComingSoon: isOcComingSoon,
      });
    }
    if (document) document.body.classList.add("open-modal-preview-course");
  };

  const toggleWhislist = () => {
    if (userData && userData.data.user_id) {
      if (whislist.includes(pageData.id)) {
        wishlistIcon.current.classList.remove("animate__tada");
        setActiveWhislist("active");
      } else {
        wishlistIcon.current.classList.add("animate__tada");
      }
      addWhislist(pageContent.id, userData.data.user_id);
    } else {
      document.body.classList.add("open-modal-login");
      setActiveWhislist("");
    }
  };

  const isTypeAvailable = (type: string): boolean => {
    let result = false;
    if (pageData && pageData.id) {
      pageData.products.map((item) => {
        if (item.product_type === type && item.is_comingsoon < 1) {
          result = true;
        }
      });
    }
    return result;
  };

  const openVideoModal = (url) => {
    setActiveVideoUrl(url);
  };

  const openComingSoonOrNotifyModal = (
    course_id,
    course_type = null,
    course_data = null,
    type = "NOTIFY"
  ) => {
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
    if (type !== "NOTIFY") document.querySelector("body").classList.add("open-modal-share-course");
  };

  const handleCart = (e) => {
    e.preventDefault();
    const selProd = selectedCourseType.map((Itm) => Itm.toUpperCase()).sort();
    const enrollProd = enrolledProductTypes.map((Itm) => Itm.toUpperCase()).sort();
    if (selectedCourseType.includes("sandbox")) {
      if (
        !enrolledProductTypes.includes("OC") &&
        !selectedCourseType.includes("oc") &&
        isalertshow
      ) {
        // alertBoxAction({
        //   type: "WARNING",
        //   title: "INFO",
        //   msg: "Selected Sandbox type associated  with Video course! consider buying both (Video course + Sandbox)",
        // });
        setalertshow(false);
        return;
      }
    }
    if (JSON.stringify(selProd) === JSON.stringify(enrollProd)) return;
    addToCartAction(pageContent.id, selectedCourseType, currency.type.toUpperCase());
    if (selectedCourseType.length > 0) {
      setCartLoading(true);
      router.push("/cart");
    } else {
      alertBoxAction({
        type: "WARNING",
        title: "",
        msg: "Please select atleast one product.",
      });
    }
  };
  const handleFreeTest = async (e) => {
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
  };

  const handlewhiz = async (e) => {
    e.preventDefault();
    if (userData || whizCard.check) {
      try {
        // if (enrolledProductTypes.length >= 1) {
        await axios({
          method: "post",
          url: process.env.NEXT_PUBLIC_BASE_URL + "/users/dwonload-whizcard",
          data: {
            course_id: pageData.id,
            email: userData != null ? userData.data.user_email : whizCard.email,
            type: "website",
          },
        });
        window.open(process.env.NEXT_PUBLIC_WEB_MEDIA_URL + pageData.whizcard);
        // } else {
        //   setwhizcardstat(!whizcardstat);
        //   return;
        // }
      } catch (err) {
        console.error(err);
      }
    } else {
      // dispatch(
      //   whizCardLoader({
      //     data: {
      //       check: true,
      //       course_id: pageData.id,
      //       email: null,
      //       type: "website",
      //       url: pageData.whizcard,
      //     },
      //   })
      // );
      document.querySelector("body").classList.add("open-modal-download-whizcard");
      // document.querySelector("body").classList.add("open-modal-login");
    }
  };

  // useEffect(() => {
  //   let mount = true;
  //   if (mount) {
  //     const whizUpload = async () => {
  //       if (whizCard.check) {
  //         if (userData) {
  //           try {
  //             if (enrolledProductTypes.length >= 1) {
  //               await axios({
  //                 method: "post",
  //                 url: process.env.NEXT_PUBLIC_BASE_URL + "/users/dwonload-whizcard",
  //                 data: {
  //                   course_id: whizCard.course_id,
  //                   email: userData.data.user_email,
  //                   type: whizCard.type,
  //                 },
  //               });
  //               window.open(process.env.NEXT_PUBLIC_WEB_MEDIA_URL + whizCard.url, "_blank").focus();
  //               dispatch(
  //                 whizCardLoader({
  //                   data: {
  //                     check: false,
  //                     course_id: null,
  //                     email: null,
  //                     type: "",
  //                     url: "",
  //                   },
  //                 })
  //               );
  //             } else {
  //               setwhizcardstat(true);
  //             }
  //           } catch (err) {
  //             console.error(err);
  //           }
  //         }
  //       }
  //     };
  //     whizUpload();
  //   }
  // }, [userData]);

  const handlePracticeTest = (e, id) => {
    e.preventDefault();
    window.open(`${process.env.NEXT_PUBLIC_BASE_PATH}${pageContent.seo_details?.slug}-spanish`);
    // if (userData && userData.data.user_id) {
    //   window.open(
    //     `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageContent.seo_details?.slug}/${pageContent.id}/quiz/${id}`
    //   );
    // } else {
    //   let url =
    //     process.env.NEXT_PUBLIC_LMS_URL +
    //     "/course/" +
    //     pageContent.seo_details?.slug +
    //     "/" +
    //     pageContent.id +
    //     "/quiz/" +
    //     id;
    //   redirectionAction("LMS_ACTIVITY", url); // after sign in redirect to LMS PRACTICE TEST
    //   document.body.classList.add("open-modal-login");
    // }
  };

  const handleOnlineCourse = (e, videoId) => {
    e.preventDefault();
    const VideoURL = `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageContent.seo_details?.slug}/${pageContent.id}/video/${videoId}`;
    if (userData && userData.data.user_id) {
      window.open(VideoURL);
    } else {
      redirectionAction("LMS_ACTIVITY", VideoURL); // after sign in redirect to LMS ONLINE COURSE PAGE
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
    setExpanded(isExpanded ? panel : false);
  };

  const changeCourseLibrary = (e, type) => {
    e.preventDefault();
    setExpanded("panel0");
    setActiveTabType(type);
  };
  const handleBuyNowDirect = (e) => {
    // in banner we need to show if course is available show buy now .. if the user already has access show access now and redirect to lms .. if comming soon show coming soon
    e.preventDefault();
    if (isPtComingSoon && !OCavailabe && !LABavailabe) {
      openComingSoonOrNotifyModal(pageContent.id, "PT");
      return;
    }
    if (isOcComingSoon && !PTavailabe && !LABavailabe) {
      openComingSoonOrNotifyModal(pageContent.id, "OC");
      return;
    }
    if (isLabComingsoon && !PTavailabe && !OCavailabe) {
      openComingSoonOrNotifyModal(pageContent.id, "LAB");
      return;
    }

    if (
      enrolledProductTypes.includes("PT") ||
      enrolledProductTypes.includes("OC") ||
      enrolledProductTypes.includes("LAB") ||
      enrolledProductTypes.includes("SANDBOX")
    ) {
      if (
        enrolledProductTypes.includes("PT") &&
        !enrolledProductTypes.includes("OC") &&
        !enrolledProductTypes.includes("SANDBOX") &&
        !enrolledProductTypes.includes("LAB")
      ) {
        window.open(
          `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageContent.seo_details?.slug}/${pageContent.id}/pt`
        );
      }
      if (
        !enrolledProductTypes.includes("PT") &&
        enrolledProductTypes.includes("OC") &&
        !enrolledProductTypes.includes("LAB") &&
        !enrolledProductTypes.includes("SANDBOX")
      ) {
        window.open(
          `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageContent.seo_details?.slug}/${pageContent.id}/oc`
        );
      }
      if (
        !enrolledProductTypes.includes("PT") &&
        !enrolledProductTypes.includes("OC") &&
        enrolledProductTypes.includes("LAB") &&
        !enrolledProductTypes.includes("SANDBOX")
      ) {
        window.open(
          `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageContent.seo_details?.slug}/${pageContent.id}/lab`
        );
      }
      if (
        !enrolledProductTypes.includes("PT") &&
        !enrolledProductTypes.includes("OC") &&
        !enrolledProductTypes.includes("LAB") &&
        enrolledProductTypes.includes("SANDBOX")
      ) {
        window.open(
          `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageContent.seo_details?.slug}/${pageContent.id}/sb`
        );
      }
      if (
        enrolledProductTypes.includes("PT") ||
        enrolledProductTypes.includes("OC") ||
        enrolledProductTypes.includes("LAB") ||
        enrolledProductTypes.includes("SANDBOX")
      ) {
        window.open(
          `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageContent.seo_details?.slug}/${pageContent.id}`
        );
      }
    } else {
      if (pageData && pageData.slug) {
        if (!selectedCourseType.length) {
          if (
            !PTavailabe &&
            !OCavailabe &&
            !LABavailabe &&
            !Sanboxavailable &&
            (discontinuesLAB || discontinuesOC || discontinuesPT || discountinuesSandbox)
          ) {
            alertBoxAction({
              type: "WARNING",
              title: "",
              msg: "This Product is discontinued..",
            });
            return;
          } else {
            alertBoxAction({
              type: "WARNING",
              title: "",
              msg: "Please select atleast one product.",
            });
            return;
          }
        }

        selectedCourseType.forEach((prod) => removeFromCartAction(pageContent.id, prod));

        const redirectSlug = `/${slug}/checkout?prod=${selectedCourseType.join(":")}`;

        if (!userData || !userData.data || !userData.data.user_id) {
          redirectionAction("REDIRECT", redirectSlug); // after sign in redirect to direct checkout Page
          document.querySelector("body").classList.add("open-modal-login");
        }

        router.push(redirectSlug);
      }
    }
  };
  const handleBuyNow = (e) => {
    e.preventDefault();
    // console.log(selectedCourseType)
    if (!selectedCourseType.length) {
      alertBoxAction({
        type: "WARNING",
        title: "",
        msg: "Please select atleast one product.",
      });
    }
    if (selectedCourseType.includes("sandbox")) {
      if (
        !enrolledProductTypes.includes("OC") &&
        !selectedCourseType.includes("oc") &&
        isalertshow
      ) {
        // alertBoxAction({
        //   type: "WARNING",
        //   title: "",
        //   msg: "Selected Sandbox type Assosicated  with Video course! consider buying both (Video course + Sandbox)",
        // });
        setalertshow(false);
        return;
      }
    }
    selectedCourseType.forEach((prod) => removeFromCartAction(pageContent.id, prod));

    const redirectSlug = `/${slug}/checkout?prod=${selectedCourseType.join(":")}`;
    // console.log(redirectSlug)
    if (!userData || !userData.data || !userData.data.user_id) {
      redirectionAction("REDIRECT", redirectSlug); // after sign in redirect to direct checkout Page
      document.querySelector("body").classList.add("open-modal-login");
    }

    router.push(redirectSlug);
  };

  let structuredFaqsData = [];
  pageData?.faq_details.map((Itm) => {
    Itm.faq &&
      Itm.faq.length > 0 &&
      Itm.faq.map((item) => {
        if (item && item.is_active == 1 && item.question && item.answer) {
          structuredFaqsData.push({
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

  let shortdespt = "";
  let shortdesoc = "";
  let shortdeslab = "";
  pageContent?.products.forEach((itm) => {
    let obj = {};
    if (itm.other_details) {
      if (itm.product_type === "PT") {
        shortdespt = itm.other_details.short_description;
      }
      if (itm.product_type === "OC") {
        shortdesoc = itm.other_details.short_description;
      }
      if (itm.product_type === "LAB") {
        shortdeslab = itm.other_details.short_description;
      }
    }
  });
  const showFaqTab = (faqType) => {
    let returnRes: boolean = false;
    const faqArray = pageContent?.faq_details?.filter(
      (e) => e?.faq_type === faqType && e?.faq?.length > 0
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

  const changeFaqType = (type) => setFaqType(type);
  const tabs = {
    E: { title: "Exam & Products", icon: "icon-font-true-tick-with-circle" },
    T: { title: "Technical", icon: "icon-font-setting" },
    G: { title: "General", icon: "icon-font-general" },
    P: { title: "Payment", icon: "icon-font-payment-card" },
    S: { title: "Support", icon: "icon-font-support" },
  };

  // const checkFaqDatas = (data, faqType) => {
  //   let returnRes: boolean = false;
  //   const faqArray = data?.faq_details?.filter(
  //     (e) => e?.faq_type === faqType && e?.faq?.length > 0
  //   );
  //   if (faqArray?.length > 0) {
  //     const finalRes: any = faqArray[0]?.faq?.filter(
  //       (item) => item?.is_active == 1 && item?.question && item?.answer
  //     );

  //     if (finalRes?.length > 0) {
  //       returnRes = true;
  //     }
  //   }
  //   return returnRes;
  // };
  // let settings = {
  //   dots: true,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 2,
  //   responsive: [
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         initialSlide: 2
  //       }
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1
  //       }
  //     }
  //   ]
  // };
  useEffect(() => {
    let isMount = true;
    if (isMount) {
      if (pageContent) {
        const faqArray = pageContent?.faq_details?.filter((e) => e?.faq?.length > 0);

        if (faqArray?.length > 0) {
          faqArray[3]?.faq?.filter((item) => {
            if (item?.question === null) {
              setFaqType("G");
            }
          });
        }

        var ppp = document.querySelector(".readmore") as HTMLElement | null;
        var sss = document.querySelector(".learn-block .container") as HTMLElement | null;
        const isVisible = document.documentElement.contains(ppp);
        if (isVisible) {
          setRmbutton(true);
          ppp.style.display = showmore ? "block" : "none";
          if (!showmore) {
            sss.classList.add("showreadmore");
          } else if (showmore) {
            sss.classList.remove("showreadmore");
          }
        } else {
          setRmbutton(false);
        }
      }
      setVideoData(videoDatas);
    }
  }, [pageContent, showmore, rmbutton]);

  // // For DEBUGGING Purpose
  // ######
  // if (typeof Node === 'function' && Node.prototype) {
  //   const originalRemoveChild = Node.prototype.removeChild;
  //   Node.prototype.removeChild = function (child) {
  //     if (child.parentNode !== this) {
  //       if (console) {
  //         console.warn('Cannot remove a child from a different parent', child, this);
  //       }
  //       return child;
  //     }
  //     return originalRemoveChild.apply(this, arguments);
  //   };

  //   const originalInsertBefore = Node.prototype.insertBefore;
  //   Node.prototype.insertBefore = function (newNode, referenceNode) {
  //     if (referenceNode && referenceNode.parentNode !== this) {
  //       if (console) {
  //         console.warn(
  //           'Cannot insert before a reference node from a different parent',
  //           referenceNode,
  //           this
  //         );
  //       }
  //       return newNode;
  //     }
  //     return originalInsertBefore.apply(this, arguments);
  //   };
  // }
  // ###########

  const handleReadmore = (e) => {
    setShowmore(!showmore);
    if (showmore) {
      scrollTo(courseOverview.current);
    }
  };

  const randomCourseID = [
    { id: 153, count: 40 },
    { id: 219, count: 65 },
    { id: 160, count: 30 },
    { id: 256, count: 30 },
    { id: 168, count: 15 },
    { id: 298, count: 20 },
    { id: 239, count: 20 },
    { id: 67, count: 20 },
    { id: 300, count: 15 },
    { id: 337, count: 15 },
  ];
  let test_count = pageContent?.detailedInfo.praticetest_info.filter(
    (itm) => itm.quiz_name != null && itm.children.length == 0
  ).length;
  let video_count = pageContent?.detailedInfo.onlinecourse_info.filter(
    (itm) => itm.video_name != null && itm.activity_id == 2
  ).length;
  let lab_count = pageContent?.detailedInfo.lab_info.filter((itm) => itm.lab_name != null).length;
  let question_count_data = pageContent?.detailedInfo.praticetest_info.filter(
    (itm) => itm.quiz_name != null && itm.children.length == 0
  );
  let question_count = 0;
  for (let i = 0; i < question_count_data?.length; i++) {
    question_count += question_count_data[i]?.questions_count;
  }

  //for discount purpose to eleminate nan and undefined and infinity
  let selected = selectedCourseType.length;
  pageContent?.products.forEach((itm) => {
    if (itm.product_type != "FT" && itm.sale_price.usd === "0" && itm.is_comingsoon != 1) {
      selected -= 1;
    }
  });
  let SB_sale_price = null;
  let SB_reg_price = null;
  let validity = null;
  //from backend sandbox in products came first we need it at last only
  if (pageContent) {
    if (pageContent.products[0].product_type === "SANDBOX") {
      let sb = pageContent.products[0];
      // console.log(sb)
      pageContent.products.splice(0, 1);
      pageContent.products.push(sb);
    }
  }
  if (pageContent) {
    let SB = pageContent.products.find((itm) => itm.product_type === "SANDBOX");
    if (SB) {
      validity = Object.keys(SB.regular_price);
      SB_sale_price = SB.sale_price[validity[0]];
      SB_reg_price = SB.regular_price[validity[0]];
    }
  }
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
  const Notification_operation = async (type) => {
    if (userData) {
      let data = notified?.find((itm) => itm.id == pageData.id);
      if (data?.product.includes(type)) {
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
        updateNotified(userData.data.user_id);
      }
    } else {
      document.querySelector("body").classList.add("open-modal-login");
      cookie.set("show_notifymodal", true);
      cookie.set("course_type", type);
      return;
    }
  };

  if (!pageData || !pageData.id) return <FourOhFour />;

  const [priceToShow, setPriceToShow] = useState(null);

  useEffect(() => {
    if (subscriptionRes) {
      if (subscriptionRes[0]?.campaign_offer) {
        setPriceToShow(
          Math.trunc(
            subscriptionRes[0]?.campaign_offer?.price.usd / subscriptionRes[0].subscription_for
          )
        );
      } else {
        setPriceToShow(
          Math.trunc(subscriptionRes[0]?.offer_price.usd / subscriptionRes[0].subscription_for)
        );
      }
    }
  }, [subscriptionRes]);

  return (
    <>
      <Head>
      {
        /*   {pageData?.seo_details?.seo_title && <title>{`${pageData?.seo_details?.seo_title}`}</title>}
        {pageData?.seo_details?.seo_keyword && (
          <meta key="keywords" name="keywords" content={`${pageData?.seo_details?.seo_keyword}`} />
        )}
        {pageData?.seo_details?.seo_title && (
          <meta name="title" content={`${pageData?.seo_details?.seo_title}`} />
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
        */
      }
      {
        pageContent ? (
          <>
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
                name: pageContent.seo_details?.seo_title,
                seo_title: pageContent.seo_details?.seo_title,
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
          </>
        ) : null
      }
      </Head>

      {pageContent ? (
        <>
          {/* Schema Builder for Product Details */}
          {/* <script type="application/ld+json">
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
              seo_title: pageContent.seo_details?.seo_title,
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
          </script> */}
          {/* Schema Builder for Product Faqs */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: structuredFaqsData,
            })}
          </script>

          <ComingSoonNotifyModal
            data={comingSoonOrNotifyData}
            userData={userData}
            alertBox={alertBoxAction}
            updateNotified={updateNotified}
          />

          <ShareCourseModal
            userData={userData}
            data={comingSoonOrNotifyData}
            alertBox={alertBoxAction}
          />

          <PreviewCourseModal previewData={previewData} />

          <VideoReviewModal videoUrl={activeVideoUrl} />

          <WhizcardModal courseId={pageContent.id} whizCardLink={pageData.whizcard} />

          {/* <!-- banner-part --> */}
          <div
            className="product-banner"
            style={{
              background: "#3D4050 url('/images/product-page-banner-min.png') no-repeat center",
              backgroundSize: "cover",
            }}
          >
            <div className="container">
              <div className="bread-col">
                <div style={{ marginLeft: "0px" }}>
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
                </div>
                <div className="right-part-up">
                  {pageData?.slug === "aws-solutions-architect-associate" ? (
                    <>
                      <div
                        className="link-free-test"
                        onClick={(e) => handlePracticeTest(e, 59809)}
                        style={{
                          cursor: "pointer",
                          fontSize: "14px",
                          backgroundColor: "#F3F3F4",
                          borderRadius: "30px",
                          padding: "0 20px",
                          color: "black",
                          lineHeight: "30px",
                        }}
                      >
                        Try Practice Tests in Spanish!
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="product-details">
                <div className="left-part">
                  <div
                    className={demoVideoLink ? "course-img" : "course-img info"}
                    onClick={() => openPreviewModal()}
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
                    {demoVideoLink ? <div className="preview-text">Preview this course</div> : null}
                    {demoVideoLink ? (
                      <div className="play-btn">
                        <img className="img-full" src="/images/play-btn-big-2.svg" alt="" />
                      </div>
                    ) : (
                      <div className="info-btn">
                        <img className="img-full" src="/images/info-btn.svg" alt="" />
                      </div>
                    )}
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
                    {/* <div className="level-text">
                      {pageContent.seo_details?.is_bestseller && (
                        <label className="bestseller">Bestseller</label>
                      )}
                      {pageContent.other_attributes?.course_level && (
                        <span>
                          Level: {convertToTitleCase(pageContent.other_attributes?.course_level)}
                        </span>
                      )}
                    </div> */}
                    <div className="right-part">
                      <div className="btn-group">
                        <div>
                          <div>
                            <>
                              {FTAvailable == true &&
                              pageData?.slug === "aws-solutions-architect-associate" ? (
                                <>
                                  <div
                                    className="link-free-test"
                                    onClick={(e) => handleFreeTest(e)}
                                    style={{
                                      cursor: "pointer",
                                      fontSize: "14px",
                                      backgroundColor: "#00BE7E",
                                      padding: "0 20px",
                                      marginTop: "5px",
                                      color: "white",
                                      lineHeight: "30px",
                                    }}
                                  >
                                    Try Free Test
                                    <i className="icon icon-font-arrow-right"></i>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {FTAvailable == true && (
                                    <div
                                      className="link-free-test"
                                      onClick={(e) => handleFreeTest(e)}
                                      style={{ cursor: "pointer" }}
                                    >
                                      Try Free Test
                                      <i className="icon icon-font-arrow-right"></i>
                                    </div>
                                  )}
                                </>
                              )}
                            </>
                            <>
                              {discontinuesLAB &&
                              discontinuesOC &&
                              discontinuesPT &&
                              discountinuesSandbox ? (
                                <div className="buy-btn">Discontinued</div>
                              ) : (
                                <></>
                              )}
                            </>
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </div>

                    <div className="course-highlights">
                      {OCavailabe || LABavailabe || PTavailabe || Sanboxavailable ? null : (
                        <>
                          {isOcComingSoon ||
                          isPtComingSoon ||
                          isLabComingsoon ||
                          isSandComingsoon ? (
                            <div
                              className="right-part"
                              style={{
                                display:
                                  isOcComingSoon ||
                                  isPtComingSoon ||
                                  isLabComingsoon ||
                                  isSandComingsoon
                                    ? ""
                                    : "none",
                              }}
                            >
                              <div className="btn-group">
                                <div className="buy-btn buy-btn1">Coming Soon</div>
                              </div>
                            </div>
                          ) : null}
                        </>
                      )}
                      {isPtComingSoon == false &&
                      PTavailabe &&
                      pageContent.web_counts?.ques_count ? (
                        <div>
                          {/* <span>{pageContent.web_counts?.ques_count} Questions</span> */}
                          <span>{question_count} Questions</span>
                          <samp>Practice Tests</samp>
                        </div>
                      ) : (
                        ""
                      )}
                      {/* <div>
                        <span>170 Minutes</span>
                        <samp>Exam Duration</samp>
                      </div> */}
                      {isOcComingSoon == false &&
                      OCavailabe &&
                      pageContent.web_counts?.vid_count ? (
                        <div>
                          <span>{video_count} Videos</span>
                          <samp>Video Course</samp>
                        </div>
                      ) : (
                        ""
                      )}
                      {lab_count > 0 && LABavailabe ? (
                        <div>
                          <span>{pageContent.web_counts?.lab_count} Labs</span>
                          <samp>Hands-on Labs</samp>
                        </div>
                      ) : (
                        ""
                      )}
                      {pageContent.detailedInfo?.sandbox_info?.length > 0 && Sanboxavailable ? (
                        <div>
                          <span>Cloud Sandbox</span>
                          <samp>Available</samp>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="right-part right-part-d"></div>
              </div>
            </div>
          </div>

          {crazyDealPromo && <CrazyDealTopBanner crazyDealData={crazyDealData} />}

          {/* <!-- nav-group --> */}
          <div className="scroll-nav">
            <div className="container">
              <div className="nav-list">
                <ul style={{ listStyle: "none" }}>
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
                    <li className={visibleSection === "whatsIncluded" ? "active" : ""}>
                      <a
                        onClick={() => {
                          scrollTo(whatsIncluded.current);
                        }}
                      >
                        What's Included
                      </a>
                    </li>
                  )}
                  <li className={visibleSection === "examInfo" ? "active" : ""}>
                    <a
                      onClick={() => {
                        scrollTo(examInfo.current);
                      }}
                    >
                      Exam Information
                    </a>
                  </li>
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
                  <div className="container">
                    <div
                      className="container-left"
                      ref={top}
                      // style={whizcardstat ? { marginBottom: "60px" } : { marginBottom: "30px" }}
                    >
                      {pageData?.whizcard != "" &&
                        pageData?.whizcard != null &&
                        pageData?.whizcard != undefined && (
                          <>
                            <div
                              className="CSAA-whizCardsBlock"
                              style={{ background: "#F5F7FA", marginBottom: "5px" }}
                            >
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
                        )}
                      {/* {whizcardstat && (
                        <div
                          className="discount-block"
                          style={{ maxWidth: "fit-content", float: "right" }}
                        >
                          <figure>
                            <img className="img-full" src="/images/offer-percentage.svg" alt="" />
                          </figure>
                          <span>
                            You need to purchase <strong>one or more product items</strong> of this
                            course
                          </span>
                        </div>
                      )} */}
                    </div>
                  </div>

                  <div ref={courseOverview} style={{ margin: "0px" }}>
                    {/* <!-- course-overview --> */}
                    <div id="course-overview" className="course-overview">
                      <div className="container">
                        <div className="container-left">
                          <h2 className="title">
                            Course Overview{" "}
                            {pageContent?.target_keyword
                              ? ` - ${pageContent?.target_keyword}`
                              : null}
                          </h2>
                          <div
                            className="coursepage_overview"
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
                        style={{ height: "100%" }}
                        dangerouslySetInnerHTML={{
                          __html: pageContent.other_attributes?.what_will_learn,
                        }}
                      />
                    </div>
                    {rmbutton ? (
                      <button
                        style={{
                          marginLeft: "10px",
                          display: "flex",
                          marginBottom: "10px",
                          background: "none",
                          color: "#f06421",
                        }}
                        onClick={(e) => handleReadmore(e)}
                      >
                        {showmore ? "Read Less" : "Read More"}
                        {showmore ? (
                          <svg
                            className="arrclass"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path className="arrclass" d="M7 14l5-5 5 5z" />
                          </svg>
                        ) : (
                          <svg
                            className="arrclass"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path className="arrclass" d="M7 10l5 5 5-5z" />
                          </svg>
                        )}
                      </button>
                    ) : null}
                  </div>

                  {/* <!-- included-course --> */}
                  {activeTabType && (
                    <div id="whats-included" className="benifits-block" ref={whatsIncluded}>
                      <div className="container">
                        <div className="container-left">
                          <h2 className="title">Included in this course</h2>
                          {winwidth > 640 && (
                            <>
                              <div className="tab_wrapper">
                                <ul className="tab_list">
                                  {pageContent.detailedInfo?.praticetest_info?.length &&
                                  PTavailabe ? (
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
                                          {test_count} Practice Tests
                                        </small>
                                      </samp>
                                    </li>
                                  ) : (
                                    ""
                                  )}

                                  {pageContent.detailedInfo?.onlinecourse_info?.length &&
                                  OCavailabe ? (
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
                                          {video_count} Videos Available
                                        </small>
                                      </samp>
                                    </li>
                                  ) : (
                                    ""
                                  )}

                                  {pageContent.detailedInfo?.lab_info?.length && LABavailabe ? (
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
                                          {pageContent.web_counts?.lab_count} Labs Available
                                        </small>
                                      </samp>
                                    </li>
                                  ) : (
                                    ""
                                  )}
                                  {pageContent.detailedInfo?.sandbox_info?.length &&
                                  Sanboxavailable ? (
                                    <li
                                      className={
                                        activeTabType === "SANDBOX"
                                          ? "resp-tab-item hor_1 resp-tab-active"
                                          : ""
                                      }
                                      onClick={(e) => changeCourseLibrary(e, "SANDBOX")}
                                    >
                                      <InboxIcon
                                        className="icon"
                                        style={{ paddingRight: "4px", transform: "scale(1.2)" }}
                                      />
                                      <samp>
                                        Cloud Sandbox
                                        <small
                                          style={{
                                            fontSize: "70%",
                                            margin: "3px 0 0 0",
                                          }}
                                        >
                                          Available
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
                                        <div key={index}>
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
                                                  {practiceTestData && (
                                                    <>
                                                      <AccordianCourse
                                                        list={practiceTestData}
                                                        type="pt"
                                                        panel="panel0"
                                                        link={handleFreeTest}
                                                        mobile={false}
                                                      />
                                                    </>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }

                                    if (
                                      prod.product_type === "OC" &&
                                      pageContent.detailedInfo?.onlinecourse_info?.length
                                    ) {
                                      return (
                                        <div>
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
                                                {videoCourseData && videoCourseData.length > 0 && (
                                                  <>
                                                    <AccordianCourse
                                                      list={videoCourseData}
                                                      type="oc"
                                                      panel="panel0"
                                                      link={handleOnlineCourse}
                                                      mobile={false}
                                                    />
                                                  </>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }
                                  })}

                                  {pageContent.detailedInfo?.lab_info?.length > 0 &&
                                    LABavailabe && (
                                      <>
                                        <div
                                          // title="Hands-on Labs"
                                          className="tab_content"
                                          id="hands-on-labs"
                                          style={{
                                            display: activeTabType === "LAB" ? "block" : "none",
                                          }}
                                        >
                                          <div className="accordian-block">
                                            {pageContent.products.map((prod) => {
                                              if (
                                                prod.product_type === "LAB" &&
                                                prod.other_details?.short_description
                                              ) {
                                                return (
                                                  <p
                                                    dangerouslySetInnerHTML={{
                                                      __html: prod.other_details.short_description,
                                                    }}
                                                  ></p>
                                                );
                                              }
                                            })}

                                            <div className="title">
                                              Topic-wise Content Distribution
                                            </div>
                                            <div className="accordian-list">
                                              {labInfoData && labInfoData.length > 0 && (
                                                <>
                                                  <AccordianCourse
                                                    list={labInfoData}
                                                    type="lab"
                                                    panel="panel0"
                                                    link={handleLabs}
                                                    mobile={false}
                                                  />
                                                </>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    )}

                                  {pageContent.detailedInfo?.sandbox_info?.length > 0 &&
                                    Sanboxavailable && (
                                      <>
                                        <div
                                          // title="Sandbox"
                                          className="tab_content"
                                          id="sandbox"
                                          style={{
                                            display: activeTabType === "SANDBOX" ? "block" : "none",
                                          }}
                                        >
                                          <div className="accordian-block">
                                            <p
                                              dangerouslySetInnerHTML={{
                                                __html:
                                                  pageContent?.detailedInfo?.sandbox_info[0]
                                                    .sandbox_name,
                                              }}
                                            ></p>
                                            {/* <InboxIcon /> */}
                                            {pageContent.products.map((prod) => {
                                              if (
                                                prod.product_type === "SANDBOX" &&
                                                prod.other_details?.short_description
                                              ) {
                                                return (
                                                  <p
                                                    dangerouslySetInnerHTML={{
                                                      __html: prod.other_details.short_description,
                                                    }}
                                                  ></p>
                                                );
                                              }
                                            })}
                                          </div>
                                        </div>
                                      </>
                                    )}
                                </div>
                              </div>
                            </>
                          )}
                          {winwidth >= 1 && winwidth <= 640 && (
                            <>
                              {test_count > 0 && PTavailabe && (
                                <>
                                  <Accordion
                                    expanded={expanded === "panel0"}
                                    onChange={handleChangeAccordion("panel0")}
                                  >
                                    <AccordionSummary
                                      expandIcon={
                                        <ExpandMoreIcon
                                          style={expanded === "panel0" ? { color: "#f06421" } : {}}
                                        />
                                      }
                                    >
                                      <div
                                        className="pp-mobile-acc"
                                        style={expanded === "panel0" ? { color: "#f06421" } : {}}
                                      >
                                        <div className="icon">
                                          {" "}
                                          <i className="icon icon-font-note2"></i>
                                        </div>
                                        <div className="acc-title">
                                          <div>Practice Test</div>
                                          <div className="mini"> {test_count} Practice Tests</div>
                                        </div>
                                      </div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <div className="tab_wrapper" style={{ width: "100%" }}>
                                        <div
                                          // title="practice-test"
                                          className="tab_content"
                                          id="practice-test"
                                        >
                                          <p
                                            dangerouslySetInnerHTML={{
                                              __html: shortdespt,
                                            }}
                                          />
                                          <div className="accordian-block">
                                            <div className="title">
                                              Topic-wise Content Distribution
                                            </div>
                                            <div className="accordian-list">
                                              <div className="item">
                                                {practiceTestData && (
                                                  <>
                                                    <AccordianCourse
                                                      list={practiceTestData}
                                                      type="pt"
                                                      panel="panel0"
                                                      link={handleFreeTest}
                                                      mobile={true}
                                                    />
                                                  </>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </AccordionDetails>
                                  </Accordion>
                                </>
                              )}
                              {video_count > 0 && OCavailabe && (
                                <>
                                  <Accordion
                                    expanded={expanded === "panel1"}
                                    onChange={handleChangeAccordion("panel1")}
                                  >
                                    <AccordionSummary
                                      expandIcon={
                                        <ExpandMoreIcon
                                          style={expanded === "panel1" ? { color: "#f06421" } : {}}
                                        />
                                      }
                                    >
                                      <div
                                        className="pp-mobile-acc"
                                        style={expanded === "panel1" ? { color: "#f06421" } : {}}
                                      >
                                        <div className="icon">
                                          {" "}
                                          <i className="icon icon-font-play"></i>
                                        </div>
                                        <div className="acc-title">
                                          <div>Video Lectures</div>
                                          <div className="mini">{video_count} Videos Available</div>
                                        </div>
                                      </div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <div className="tab_wrapper" style={{ width: "100%" }}>
                                        <div className="tab_content">
                                          <p
                                            dangerouslySetInnerHTML={{
                                              __html: shortdesoc,
                                            }}
                                          />
                                          <div className="accordian-block">
                                            <div className="title">
                                              Topic-wise Content Distribution
                                            </div>
                                            <div className="accordian-list">
                                              {videoCourseData && videoCourseData.length > 0 && (
                                                <>
                                                  <AccordianCourse
                                                    list={videoCourseData}
                                                    type="oc"
                                                    panel="panel0"
                                                    link={handleOnlineCourse}
                                                    mobile={true}
                                                  />
                                                </>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </AccordionDetails>
                                  </Accordion>
                                </>
                              )}
                              {lab_count > 0 && LABavailabe && (
                                <>
                                  <Accordion
                                    expanded={expanded === "panel2"}
                                    onChange={handleChangeAccordion("panel2")}
                                  >
                                    <AccordionSummary
                                      expandIcon={
                                        <ExpandMoreIcon
                                          style={expanded === "panel2" ? { color: "#f06421" } : {}}
                                        />
                                      }
                                    >
                                      <div
                                        className="pp-mobile-acc"
                                        style={expanded === "panel2" ? { color: "#f06421" } : {}}
                                      >
                                        <div className="icon">
                                          {" "}
                                          <i className="icon icon-font-bicker"></i>
                                        </div>
                                        <div className="acc-title">
                                          <div style={{ margin: "0px" }}>Labs</div>
                                          <div className="mini">
                                            {pageContent.web_counts?.lab_count} Labs Available
                                          </div>
                                        </div>
                                      </div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <div className="tab_wrapper" style={{ width: "100%" }}>
                                        <div
                                          // title="Hands-on Labs"
                                          className="tab_content"
                                          id="hands-on-labs"
                                        >
                                          <p
                                            dangerouslySetInnerHTML={{
                                              __html: shortdeslab,
                                            }}
                                          />
                                          <div className="accordian-block">
                                            <div className="title">
                                              Topic-wise Content Distribution
                                            </div>
                                            <div className="accordian-list">
                                              {labInfoData && labInfoData.length > 0 && (
                                                <>
                                                  <AccordianCourse
                                                    list={labInfoData}
                                                    type="lab"
                                                    panel="panel0"
                                                    link={handleLabs}
                                                    mobile={true}
                                                  />
                                                </>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </AccordionDetails>
                                  </Accordion>
                                </>
                              )}

                              {pageContent?.detailedInfo?.sandbox_info[0] && Sanboxavailable ? (
                                <>
                                  <Accordion>
                                    <AccordionSummary
                                      expandIcon={
                                        <ExpandMoreIcon
                                          style={expanded === "panel2" ? { color: "#f06421" } : {}}
                                        />
                                      }
                                    >
                                      <div
                                        className="pp-mobile-acc"
                                        style={expanded === "panel2" ? { color: "#f06421" } : {}}
                                      >
                                        <div className="icon">
                                          {" "}
                                          <InboxIcon
                                            className="icon"
                                            style={{ paddingRight: "4px", transform: "scale(1.2)" }}
                                          />
                                        </div>
                                        <div className="acc-title">
                                          <div style={{ margin: "0px" }}>Cloud Sandbox</div>
                                          <div className="mini">Available</div>
                                        </div>
                                      </div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <div className="tab_wrapper" style={{ width: "100%" }}>
                                        {pageContent.products.map((prod) => {
                                          if (
                                            prod.product_type === "SANDBOX" &&
                                            prod.other_details?.short_description
                                          ) {
                                            return (
                                              <p
                                                dangerouslySetInnerHTML={{
                                                  __html: prod.other_details.short_description,
                                                }}
                                              ></p>
                                            );
                                          }
                                        })}
                                      </div>
                                    </AccordionDetails>
                                  </Accordion>
                                </>
                              ) : (
                                ""
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* <!-- real-exam-block --> */}
                  <div id="exam-info" className="exam-format-block" ref={examInfo}>
                    <div className="container">
                      {exampattern ? (
                        <>
                          <div className="title">
                            <h2>Real Exam Format and Information</h2>
                            {
                              <div style={{ fontSize: "18px", fontWeight: "300" }}>
                                {pageContent.seo_details.title} {examcode}
                              </div>
                            }
                          </div>
                          <div className="exam-box-group">
                            {exampattern?.map((itm, i) => {
                              return (
                                <>
                                  <div className="exam-box">
                                    <div>
                                      <figure>
                                        <img className="img-full" src={`/images/${itm.img}`} />
                                      </figure>
                                    </div>
                                    <div style={{ marginLeft: "15px" }}>
                                      <label>{itm.heading}</label>
                                      <span>{itm.value}</span>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                          <div className="languages-type">
                            <figure>
                              <img className="img-full" src="/images/language.webp" />
                            </figure>
                            <span>
                              <strong>Languages : </strong>
                              {language}
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          {pageContent.seo_details && pageContent.seo_details.description && (
                            <>
                              <div className="title">
                                <h2>Real Exam Format and Information</h2>
                              </div>
                              <div
                                className="item-content"
                                dangerouslySetInnerHTML={{
                                  __html: pageContent.seo_details?.description,
                                }}
                              ></div>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>

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

                  {/* <!-- student-review-block --> */}
                  <div id="reviews" className="review-block" ref={reviews}>
                    <div className="container">
                      <div className="container-left">
                        {videoData && videoData.length > 0 ? (
                          <div className="video-review">
                            <div className="title">
                              <figure>
                                <img className="img-full" src="/images/quote-img.svg" alt="" />
                              </figure>
                              {videoData.length > 0 ? <h2>Video Reviews</h2> : ""}
                            </div>

                            {/* // TODO : to be removed before moving to PRD */}

                            {/* <div className="video-group owl-carousel owl-theme">
                              {videoData.map((item, i) => (
                                <figure key={i} onClick={() => openVideoModal(item.video_url)}>
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
                                      pageContent.seo_details?.featured_image.replace("media/", "")
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
                              ))}
                            </div> */}
                            {/* <Slider {...settings}>
                              {videoData.map((item, i) => {
                                return (
                                  <>
                                    <div className="video-group">
                                      <figure key={i} onClick={() => openVideoModal(item.video_url)}>
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
                                            pageContent.seo_details?.featured_image.replace("media/", "")
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
                                    </div>
                                  </>
                                );
                              })}
                            </Slider> */}

                            {videoData && (
                              <div className="review-block">
                                <div className="container">
                                  <div className="video-review">
                                    <div
                                      className={
                                        videoData.length < 3
                                          ? "keen-slider video-group-length"
                                          : "keen-slider video-group"
                                      }
                                      ref={sliderRef}
                                    >
                                      {videoData?.map((item, i) => (
                                        <div
                                          className={
                                            videoData.length > 1
                                              ? " keen-slider__slide  video group"
                                              : "single-video-review keen-slider__slide video group"
                                          }
                                        >
                                          <figure
                                            key={i}
                                            onClick={() => openVideoModal(item.video_url)}
                                          >
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
                                                  item?.profile_image?.replace("media/", "")
                                                }
                                                alt=""
                                              />
                                              <span>
                                                {item.first_name} {item.last_name}
                                              </span>
                                            </div>
                                          </figure>
                                        </div>
                                      ))}
                                    </div>

                                    <div style={{ display: "flex" }}>
                                      {videoData.length > 1 ? (
                                        <>
                                          <div
                                            className="nav-btn"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              slider.prev();
                                            }}
                                          >
                                            Prev
                                          </div>
                                          <div
                                            className="nav-btn"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              slider.next();
                                            }}
                                          >
                                            / Next
                                          </div>
                                        </>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          ""
                        )}

                        {reviewsDatas && reviewsDatas.data && reviewsDatas.data.length > 0 ? (
                          <div className="aboutus-block">
                            <h2 className="title">What our students say about us</h2>
                            <div className="students-review-block">
                              {reviewsDatas.data
                                .filter((item, index) => index < 5)
                                .map((rev) => {
                                  return (
                                    <>
                                      <div className="block" key={rev.id}>
                                        <div className="student-img">
                                          <UserAvatar
                                            img={rev.profile_pic}
                                            alt={rev.post_addition?.course?.name}
                                            username={
                                              rev.post_addition.name
                                                ? rev.post_addition.name
                                                : rev.user_name
                                            }
                                          />
                                        </div>
                                        <div className="review-content">
                                          <div className="name">
                                            <div className="name-block">
                                              <span>
                                                {rev.post_addition.name ? (
                                                  <span> {rev.post_addition.name}</span>
                                                ) : (
                                                  <span>{rev.user_name}</span>
                                                )}
                                              </span>
                                              <StarRating
                                                isSingle={false}
                                                avgRating={rev.post_addition.rating}
                                                isSamp={false}
                                              />
                                            </div>
                                            <div className="posted-since">
                                              {moment(rev.created_at).fromNow()}
                                            </div>
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
                                            style={{
                                              overflowWrap: "anywhere",
                                              marginRight: "50px",
                                            }}
                                          >
                                            <p
                                              className="link-explain"
                                              // style={{ color: "black" }}
                                            >
                                              {rev?.post_question_title}
                                            </p>
                                            <p
                                              dangerouslySetInnerHTML={{
                                                __html: rev.post_question_text,
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}
                              <div className="total-feedback">
                                {/* <span>{reviewsDatas.pagination.total} People added feedback</span> */}
                                <span>{feedbackData.rating} People added feedback</span>
                                <Link href={"/" + pageContent.seo_details?.slug + "/reviews/"}>
                                  <a className="link-showmore" target="_blank">
                                    Show more
                                  </a>
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
                          {/* <ul className="resp-tabs-list hor_1 tab_list">
                          {checkFaqDatas(pageContent, "E") && (
                            <li
                              onClick={(e) => {
                                e.preventDefault();
                                setFaqType("E");
                              }}
                              className={faqType === "E" ? "resp-tab-active" : ""}
                            >
                              <samp>
                                <i className="icon icon-font-true-tick-with-circle"></i>
                                Exam & Products
                              </samp>
                            </li>
                          )}
                          {checkFaqDatas(pageContent, "T") && (
                            <li
                              onClick={(e) => {
                                e.preventDefault();
                                setFaqType("T");
                              }}
                              className={faqType === "T" ? "resp-tab-active" : ""}
                            >
                              <samp>
                                <i className="icon icon-font-setting"></i>
                                Technical
                              </samp>
                            </li>
                          )}
                          {checkFaqDatas(pageContent, "G") && (
                            <li
                              onClick={(e) => {
                                e.preventDefault();
                                setFaqType("G");
                              }}
                              className={faqType === "G" ? "resp-tab-active" : ""}
                            >
                              <samp>
                                <i className="icon icon-font-general"></i>General
                              </samp>
                            </li>
                          )}
                          {checkFaqDatas(pageContent, "P") && (
                            <li
                              onClick={(e) => {
                                e.preventDefault();
                                setFaqType("P");
                              }}
                              className={faqType === "P" ? "resp-tab-active" : ""}
                            >
                              <samp>
                                <i className="icon icon-font-payment-card"></i>
                                Payment
                              </samp>
                            </li>
                          )}
                          {checkFaqDatas(pageContent, "S") && (
                            <li
                              onClick={(e) => {
                                e.preventDefault();
                                setFaqType("S");
                              }}
                              className={faqType === "S" ? "resp-tab-active" : ""}
                            >
                              <samp>
                                <i className="icon icon-font-support"></i>Support
                              </samp>
                            </li>
                          )}
                        </ul> */}
                          <ul className="resp-tabs-list hor_1 tab_list">
                            {pageContent.faq_details.map(
                              (Itm, i) =>
                                // Itm.faq.length > 0 &&
                                // Itm.faq[0].question !== null &&
                                showFaqTab(Itm.faq_type) && (
                                  <li
                                    onClick={() => changeFaqType(Itm.faq_type)}
                                    className={faqType === Itm.faq_type && "resp-tab-active"}
                                  >
                                    <samp>
                                      <i className={`icon ${tabs[Itm.faq_type]?.icon}`}></i>
                                      {tabs[Itm.faq_type]?.title}
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
                                          <div key={ie}>
                                            {item &&
                                              item.is_active == 1 &&
                                              item.question &&
                                              item.answer && (
                                                // <Accordions
                                                //   data={{
                                                //     key: ie,
                                                //     question: item.question,
                                                //     answer: item.answer,
                                                //   }}
                                                // />
                                                <div className="item">
                                                <Accordion  
                                                TransitionProps={{ unmountOnExit: true }}
                                                key={ie} 
                                                expanded={expanded === `panel${Itm.faq_type}` + ie} 
                                                onChange={handleChangeAccordion(`panel${Itm.faq_type}` + ie)}>
                                                  <AccordionSummary className={
                                                    expanded === `panel${Itm.faq_type}` + ie
                                                    ? "item-head open"
                                                    : "item-head"
                                                  }
                                                  >
                                                    <>
                                                      <samp></samp>
                                                      <span>{item.question}</span>
                                                    </>
                                                  </AccordionSummary>
                                                  <AccordionDetails className="item-content">
                                                    <div
                                                      dangerouslySetInnerHTML={{
                                                        __html: item.answer,
                                                      }}
                                                    ></div>
                                                  </AccordionDetails>
                                                </Accordion>
                                              </div>
                                              )}
                                          </div>
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

                {/* right sidebar block */}
                <div className="right-section right-new-prod">
                  <div className={`buy-box ${crazyDealPromo && "crazy-deal"}`}>
                    <div className="plan-selection">
                      <div
                        style={{
                          borderBottom: activePlan === "INDIVIDUAL" ? "1px solid #E5A100" : "",
                          marginBottom: activePlan === "INDIVIDUAL" ? "-1px" : "",
                        }}
                      >
                        <span
                          className={activePlan === "INDIVIDUAL" ? "individual-active" : ""}
                          onClick={() => setActivePlan("INDIVIDUAL")}
                        >
                          <img
                            src={
                              activePlan !== "INDIVIDUAL"
                                ? "/images/plan-type-selecton/individual.svg"
                                : "/images/plan-type-selecton/individual-active.svg"
                            }
                            alt="individual"
                          />
                          Individual
                        </span>
                      </div>
                      <hr />
                      <div
                        style={{
                          borderBottom: activePlan === "TEAMS" ? "1px solid #391498" : "",
                          marginBottom: activePlan === "TEAMS" ? "-1px" : "",
                        }}
                      >
                        <span
                          className={activePlan === "TEAMS" ? "teams-active" : ""}
                          onClick={() => setActivePlan("TEAMS")}
                        >
                          <img
                            src={
                              activePlan === "TEAMS"
                                ? "/images/plan-type-selecton/teams.svg"
                                : "/images/plan-type-selecton/teams-active.svg"
                            }
                            alt="teams"
                          />
                          Teams
                        </span>
                      </div>
                    </div>
                    <div>
                      {activePlan === "INDIVIDUAL" ? (
                        <>
                          {timerStatus && (
                            <img
                              src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}banners/${timer_details?.details?.cartbox}`}
                              alt="product BF banner"
                              style={{ width: "100%", objectFit: "contain" }}
                            ></img>
                          )}
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
                              {/* <h6 className="head-txt">This course includes</h6> */}
                              <div
                                className="option-group"
                                style={{ pointerEvents: cartLoading ? "none" : "all" }}
                              >
                                <ul>
                                  {pageContent.products.map((element, i) => {
                                    let data = notified?.find((itm) => itm.id == pageContent.id);
                                    if (element.product_type === "PT") {
                                      return (
                                        <li
                                          className="option active"
                                          onClick={(e) => {
                                            if (
                                              element.is_comingsoon === "1" ||
                                              element.is_comingsoon === "2"
                                            ) {
                                              return;
                                            }
                                            handleToggle(
                                              e,
                                              "pt", // product Type - PT, OC, LAB
                                              element.regular_price[currency.type], // regular price
                                              element.sale_price[currency.type], // sale price
                                              getPercentage(
                                                element.regular_price[currency.type],
                                                element.sale_price[currency.type]
                                              ) // Percentage
                                            );
                                          }}
                                        >
                                          <label className="custom-checkbox">
                                            {!enrolledProductTypes.includes("PT") && (
                                              <>
                                                <input
                                                  type="checkbox"
                                                  readOnly
                                                  checked={selectedCourseType.includes("pt")}
                                                />
                                                {element.is_comingsoon == 0 ? (
                                                  <span className="checkbox-style"></span>
                                                ) : null}
                                              </>
                                            )}
                                            <div className="name">
                                              Practice Tests
                                              {element.is_comingsoon == 1 ? (
                                                <div className="status">
                                                  Coming Soon!{" "}
                                                  <span
                                                  // className={`btn-notify ${isNotifyButtonDisabled ? "disabled-btn-notify" : "disabled-btn-notify"}`}
                                                  // onClick={(e) =>{
                                                  //   e.preventDefault()
                                                  //   handleNotifyButtonClick("PT");
                                                  // }
                                                  // }
                                                  >
                                                    <button
                                                      onClick={(e) => {
                                                        e.preventDefault();
                                                        handleNotifyButtonClick("PT");
                                                      }}
                                                      disabled={isNotifyButtonDisabled}
                                                    >
                                                      {data?.product.includes("PT") ? (
                                                        <>Notification Enabled</>
                                                      ) : (
                                                        <>Notify me</>
                                                      )}
                                                    </button>
                                                  </span>
                                                </div>
                                              ) : enrolledProductTypes.includes("PT") &&
                                                PTavailabe &&
                                                !discontinuesPT ? (
                                                <div className="status"></div>
                                              ) : element.is_comingsoon === "2" ? (
                                                <div className="status">Discontinued</div>
                                              ) : (
                                                ""
                                              )}
                                            </div>
                                            <div className="price-block">
                                              {enrolledProductTypes.includes("PT") &&
                                              element.is_comingsoon != 1 &&
                                              element.is_comingsoon !== "2" ? (
                                                <a
                                                  href="#"
                                                  className="btn-access"
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    window.open(
                                                      `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageContent.seo_details?.slug}/${pageContent.id}/pt`
                                                    );
                                                  }}
                                                >
                                                  Access Now
                                                </a>
                                              ) : element.sale_price[currency.type] &&
                                                PTavailabe &&
                                                !discontinuesPT ? (
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
                                              ) : // for discontinued course we hiding price
                                              PTavailabe && !discontinuesPT ? (
                                                <span className="price">
                                                  {currency.symbol}
                                                  {element.regular_price[currency.type]}
                                                </span>
                                              ) : (
                                                ""
                                              )}
                                            </div>
                                          </label>
                                        </li>
                                      );
                                    }

                                    if (element.product_type === "OC") {
                                      return (
                                        <li
                                          className="option active"
                                          onClick={(e) => {
                                            if (
                                              element.is_comingsoon === "1" ||
                                              element.is_comingsoon === "2"
                                            ) {
                                              return;
                                            }
                                            handleToggle(
                                              e,
                                              "oc", // product Type - PT, OC, LAB
                                              element.regular_price[currency.type], // regular price
                                              element.sale_price[currency.type], // sale price
                                              getPercentage(
                                                element.regular_price[currency.type],
                                                element.sale_price[currency.type]
                                              ) // Percentage
                                            );
                                          }}
                                        >
                                          <label
                                            className={
                                              !isalertshow
                                                ? "custom-checkbox alert-border-sandbox"
                                                : "custom-checkbox "
                                            }
                                          >
                                            {!enrolledProductTypes.includes("OC") && (
                                              <>
                                                <input
                                                  type="checkbox"
                                                  readOnly
                                                  checked={selectedCourseType.includes("oc")}
                                                />
                                                {/* <span className="checkbox-style"></span> */}
                                                {element.is_comingsoon == 0 ? (
                                                  <span className="checkbox-style"></span>
                                                ) : null}
                                              </>
                                            )}
                                            <div className="name">
                                              Video Course
                                              {element.is_comingsoon == 1 ? (
                                                <div className="status">
                                                  Coming Soon!{" "}
                                                  <span>
                                                    <button
                                                      onClick={(e) => {
                                                        e.preventDefault();
                                                        handleNotifyButtonClick("OC");
                                                      }}
                                                      disabled={isNotifyButtonDisabled}
                                                    >
                                                      {data?.product.includes("OC") ? (
                                                        <>Notification Enabled</>
                                                      ) : (
                                                        <>Notify me</>
                                                      )}
                                                    </button>
                                                  </span>
                                                </div>
                                              ) : element.is_comingsoon == 2 ? (
                                                <div className="status">Discontinued</div>
                                              ) : enrolledProductTypes.includes("OC") ? (
                                                <div className="status"></div>
                                              ) : (
                                                ""
                                              )}
                                            </div>
                                            <div className="price-block">
                                              {enrolledProductTypes.includes("OC") &&
                                              OCavailabe &&
                                              !discontinuesOC ? (
                                                <a
                                                  href="#"
                                                  className="btn-access"
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    window.open(
                                                      `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageContent.seo_details?.slug}/${pageContent.id}/oc`
                                                    );
                                                  }}
                                                >
                                                  Access Now
                                                </a>
                                              ) : element.sale_price[currency.type] &&
                                                OCavailabe &&
                                                !discontinuesOC ? (
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
                                              ) : OCavailabe && !discontinuesOC ? (
                                                <span className="price">
                                                  {currency.symbol}
                                                  {element.regular_price[currency.type]}
                                                </span>
                                              ) : (
                                                ""
                                              )}
                                            </div>
                                          </label>
                                        </li>
                                      );
                                    }

                                    if (element.product_type === "LAB") {
                                      // FREE LABS
                                      if (element.sale_price[currency.type] === "0") {
                                        return (
                                          <li
                                            className={`option ${
                                              selectedCourseType.includes("pt") ||
                                              selectedCourseType.includes("oc")
                                                ? "active"
                                                : ""
                                            }`}
                                          >
                                            <label
                                              className="custom-checkbox"
                                              // style={{ pointerEvents: "none" }}
                                            >
                                              {(!enrolledProductTypes.includes("PT") ||
                                                !enrolledProductTypes.includes("OC")) && (
                                                <>
                                                  <input
                                                    type="checkbox"
                                                    readOnly
                                                    checked={
                                                      selectedCourseType.includes("pt") ||
                                                      (selectedCourseType.includes("oc") &&
                                                        !enrolledProductTypes.includes("LAB"))
                                                    }
                                                  />
                                                  {/* <span className="checkbox-style"></span> */}
                                                  {element.is_comingsoon == 0 ? (
                                                    <span className="checkbox-style"></span>
                                                  ) : null}
                                                </>
                                              )}
                                              <div className="name">
                                                Hands-on Labs
                                                {element.is_comingsoon == 1 ? (
                                                  <div className="status">
                                                    Coming Soon!{" "}
                                                    <span>
                                                      <button
                                                        onClick={(e) => {
                                                          e.preventDefault();
                                                          handleNotifyButtonClick("LAB");
                                                        }}
                                                        disabled={isNotifyButtonDisabled}
                                                      >
                                                        {data?.product.include("LAB") ? (
                                                          <>Notification Enabled</>
                                                        ) : (
                                                          <>Notify me</>
                                                        )}
                                                      </button>
                                                    </span>
                                                  </div>
                                                ) : enrolledProductTypes.includes("LAB") &&
                                                  LABavailabe &&
                                                  !discontinuesLAB ? (
                                                  <div className="status"></div>
                                                ) : element.is_comingsoon === "2" ? (
                                                  <div className="status">Discontinued</div>
                                                ) : (
                                                  ""
                                                )}
                                              </div>
                                              <div
                                                className="price-block"
                                                style={{ pointerEvents: "all" }}
                                              >
                                                {(enrolledProductTypes.includes("PT") ||
                                                  enrolledProductTypes.includes("OC")) &&
                                                element.is_comingsoon != 1 &&
                                                element.is_comingsoon !== "2" ? (
                                                  <a
                                                    href="#"
                                                    className="btn-access"
                                                    onClick={(e) => {
                                                      e.preventDefault();
                                                      window.open(
                                                        `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageContent.seo_details?.slug}/${pageContent.id}/lab`
                                                      );
                                                    }}
                                                  >
                                                    Access Now
                                                  </a>
                                                ) : element.sale_price[currency.type] &&
                                                  LABavailabe &&
                                                  !discontinuesLAB ? (
                                                  <>
                                                    <del className="old-price">
                                                      {element.regular_price[currency.type] === "0"
                                                        ? ""
                                                        : currency.symbol}
                                                      {element.regular_price[currency.type] === "0"
                                                        ? " "
                                                        : element.regular_price[currency.type]}
                                                    </del>
                                                    <span className="price">
                                                      {element.sale_price[currency.type] === "0"
                                                        ? ""
                                                        : currency.symbol}
                                                      {element.sale_price[currency.type] === "0"
                                                        ? "Free"
                                                        : element.sale_price[currency.type]}
                                                    </span>
                                                  </>
                                                ) : // for discontinued course we hiding price
                                                LABavailabe && !discontinuesLAB ? (
                                                  <span className="price">
                                                    {currency.symbol}
                                                    {element.regular_price[currency.type]}
                                                  </span>
                                                ) : (
                                                  ""
                                                )}
                                              </div>
                                            </label>
                                          </li>
                                        );
                                      } else {
                                        return (
                                          <li
                                            // className="option active"
                                            className={`option ${
                                              (selectedCourseType.includes("pt") ||
                                                selectedCourseType.includes("oc")) &&
                                              !enrolledProductTypes.includes("LAB")
                                                ? "active"
                                                : ""
                                            }`}
                                            onClick={(e) => {
                                              if (
                                                element.is_comingsoon === "1" ||
                                                element.is_comingsoon === "2"
                                              ) {
                                                return;
                                              }
                                              handleToggle(
                                                e,
                                                "lab", // product Type - PT, OC, LAB
                                                element.regular_price[currency.type], // regular price
                                                element.sale_price[currency.type], // sale price
                                                getPercentage(
                                                  element.regular_price[currency.type],
                                                  element.sale_price[currency.type]
                                                ) // Percentage
                                              );
                                            }}
                                          >
                                            <label className="custom-checkbox">
                                              {!enrolledProductTypes.includes("LAB") && (
                                                <>
                                                  <input
                                                    type="checkbox"
                                                    readOnly
                                                    checked={
                                                      selectedCourseType.includes("lab") &&
                                                      !enrolledProductTypes.includes("LAB")
                                                    }
                                                  />
                                                  {/* <span className="checkbox-style"></span> */}
                                                  {element.is_comingsoon == 0 ? (
                                                    <span className="checkbox-style"></span>
                                                  ) : null}
                                                </>
                                              )}
                                              <div className="name">
                                                Hands-on Labs
                                                {element.is_comingsoon == 1 ? (
                                                  <div className="status">
                                                    Coming Soon!{" "}
                                                    <span>
                                                      <button
                                                        onClick={(e) => {
                                                          e.preventDefault();
                                                          handleNotifyButtonClick("LAB");
                                                        }}
                                                        disabled={isNotifyButtonDisabled}
                                                      >
                                                        {data?.product.includes("LAB") ? (
                                                          <>Notification Enabled</>
                                                        ) : (
                                                          <>Notify Me</>
                                                        )}
                                                      </button>
                                                    </span>
                                                  </div>
                                                ) : enrolledProductTypes.includes("LAB") &&
                                                  LABavailabe &&
                                                  !discontinuesLAB ? (
                                                  <div className="status"></div>
                                                ) : element.is_comingsoon === "2" ? (
                                                  <div className="status">Discontinued</div>
                                                ) : (
                                                  ""
                                                )}
                                              </div>
                                              <div className="price-block">
                                                {enrolledProductTypes.includes("LAB") &&
                                                element.is_comingsoon != 1 &&
                                                element.is_comingsoon !== "2" ? (
                                                  <a
                                                    href="#"
                                                    className="btn-access"
                                                    onClick={(e) => {
                                                      e.preventDefault();
                                                      window.open(
                                                        `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageContent.seo_details?.slug}/${pageContent.id}/lab`
                                                      );
                                                    }}
                                                  >
                                                    Access Now
                                                  </a>
                                                ) : element.sale_price[currency.type] &&
                                                  LABavailabe &&
                                                  !discontinuesLAB ? (
                                                  <>
                                                    <del className="old-price">
                                                      {element.regular_price[currency.type] === "0"
                                                        ? ""
                                                        : currency.symbol}
                                                      {element.regular_price[currency.type] === "0"
                                                        ? " "
                                                        : element.regular_price[currency.type]}
                                                    </del>
                                                    <span className="price">
                                                      {element.sale_price[currency.type] === "0"
                                                        ? ""
                                                        : currency.symbol}
                                                      {element.sale_price[currency.type] === "0"
                                                        ? "Free"
                                                        : element.sale_price[currency.type]}
                                                    </span>
                                                  </>
                                                ) : // for discontinued course we hiding price
                                                LABavailabe && !discontinuesLAB ? (
                                                  <span className="price">
                                                    {currency.symbol}
                                                    {element.regular_price[currency.type]}
                                                  </span>
                                                ) : (
                                                  ""
                                                )}
                                              </div>
                                            </label>
                                          </li>
                                        );
                                      }
                                    }
                                    if (element.product_type === "SANDBOX") {
                                      return (
                                        <li
                                          className="option active"
                                          onClick={(e) => {
                                            if (
                                              element.is_comingsoon === "1" ||
                                              element.is_comingsoon === "2"
                                            ) {
                                              return;
                                            }
                                            handleToggle(
                                              e,
                                              "sandbox", // product Type - PT, OC, LAB , SANDBOX
                                              SB_reg_price ? SB_reg_price[currency.type] : 0, // regular price
                                              SB_sale_price ? SB_sale_price[currency.type] : 0, // sale price
                                              getPercentage(
                                                SB_reg_price ? SB_reg_price[currency.type] : 0,
                                                SB_sale_price ? SB_sale_price[currency.type] : 0
                                              ) // Percentage
                                            );
                                          }}
                                        >
                                          <label
                                            className={
                                              !isalertshow
                                                ? "custom-checkbox alert-border-sandbox"
                                                : "custom-checkbox "
                                            }
                                          >
                                            {!enrolledProductTypes.includes("SANDBOX") && (
                                              <>
                                                <input
                                                  type="checkbox"
                                                  readOnly
                                                  checked={selectedCourseType.includes("sandbox")}
                                                />
                                                {/* <span className="checkbox-style"></span> */}
                                                {element.is_comingsoon == 0 ? (
                                                  <span className="checkbox-style"></span>
                                                ) : null}
                                              </>
                                            )}
                                            <div className="name">
                                              Cloud Sandbox&nbsp;
                                              {enrolledProductTypes.includes("SANDBOX") ? null : (
                                                <div
                                                  style={{
                                                    color: "#FFAE28",
                                                    fontSize: "13px",
                                                    marginTop: "7px",
                                                  }}
                                                >
                                                  {validity[0] != "global" ? (
                                                    <>({validity[0]} Months)</>
                                                  ) : (
                                                    <></>
                                                  )}
                                                </div>
                                              )}
                                              {element.is_comingsoon == 1 ? (
                                                <div className="status">
                                                  Coming Soon!{" "}
                                                  <span>
                                                    <button
                                                      onClick={(e) => {
                                                        e.preventDefault();
                                                        handleNotifyButtonClick("SANDBOX");
                                                      }}
                                                      disabled={isNotifyButtonDisabled}
                                                    >
                                                      {data?.product.includes("SANDBOX") ? (
                                                        <>Notification Enabled</>
                                                      ) : (
                                                        <>Notify me</>
                                                      )}
                                                    </button>
                                                  </span>
                                                </div>
                                              ) : element.is_comingsoon == 2 ? (
                                                <div className="status">Discontinued</div>
                                              ) : enrolledProductTypes.includes("SANDBOX") ? (
                                                <div className="status"></div>
                                              ) : (
                                                ""
                                              )}
                                            </div>
                                            <div className="price-block">
                                              {enrolledProductTypes.includes("SANDBOX") &&
                                              Sanboxavailable &&
                                              !discountinuesSandbox ? (
                                                <a
                                                  href="#"
                                                  className="btn-access"
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    //TODO links needs to be updated
                                                    window.open(
                                                      `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageContent.seo_details?.slug}/${pageContent.id}/sb`
                                                    );
                                                  }}
                                                >
                                                  Access Now
                                                </a>
                                              ) : SB_reg_price &&
                                                SB_reg_price[currency.type] > 0 &&
                                                Sanboxavailable &&
                                                !discountinuesSandbox ? (
                                                <>
                                                  <del className="old-price">
                                                    {currency.symbol}
                                                    {SB_reg_price[currency.type]}
                                                  </del>
                                                  <span className="price">
                                                    {currency.symbol}
                                                    {SB_sale_price[currency.type]}
                                                  </span>
                                                </>
                                              ) : SB_reg_price[currency.type] == 0 ? (
                                                <span className="price">FREE</span>
                                              ) : (
                                                ""
                                              )}
                                            </div>
                                          </label>
                                        </li>
                                      );
                                    }
                                  })}
                                  {!isalertshow && (
                                    <p className="alert_sandbox_type">
                                      Selected Sandbox type associated with Video Course consider
                                      buying both (Cloud Sandbox + Video Course)
                                    </p>
                                  )}
                                  {clientStatus && gcp_course_id.includes(pageData.id) && (
                                    <>
                                      <p className="code-blue">
                                        Note: Only Practise Test and Video Course are applicable for
                                        this Offer!
                                      </p>
                                    </>
                                  )}
                                </ul>
                              </div>
                            </>
                          )}
                          {/* {!crazyDealPromo &&
                      pageData?.whizcard != "" &&
                      pageData?.whizcard != null &&
                      pageData?.whizcard != undefined &&
                      enrolledProductTypes.length == 0 &&
                      !timerStatus && (
                        <div className="discount-block">
                          <figure>
                            <img className="img-full" src="/images/offer-percentage.svg" alt="" />
                          </figure>
                          <span>
                            Buy one or more product items and get <strong>Whizcards</strong> as free
                          </span>
                        </div>
                      )} */}
                          {!checkIfUserEnrolledAllProducts() &&
                            totalFinalPrice > 0 &&
                            selected > 0 && (
                              <div className="price-and-offer">
                                <span
                                  style={{ display: pageData.isCampaign ? "none" : "initial" }}
                                ></span>
                                <span
                                  className="offer"
                                  style={{ display: pageData.isCampaign ? "initial" : "none" }}
                                >
                                  {Math.round(discountPercentage / selected)}% OFF
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

                          {!purchaseDisabled && !checkIfUserEnrolledAllProducts() && (
                            <div className="btn-group">
                              {!crazyDealPromo &&
                                !(clientStatus && gcp_course_id.includes(pageData.id)) && (
                                  <button
                                    className={
                                      !checkIfUserEnrolledAllProducts() &&
                                      selectedCourseType.length > 0
                                        ? "btn buy-now"
                                        : "btn buy-now disabled"
                                    }
                                    style={{
                                      maxWidth: "100%",
                                    }}
                                    onClick={(e) => {
                                      if (selectedCourseType.length > 0) {
                                        handleCart(e);
                                      }
                                    }}
                                    disabled={purchaseDisabled}
                                  >
                                    Add to Cart
                                  </button>
                                )}

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

                              {/* Buy now only visible on crazy on Individuval products */}

                              {!purchaseDisabled &&
                                crazyDealPromo &&
                                !checkIfUserEnrolledAllProducts() &&
                                selectedCourseType.length > 0 && (
                                  <button
                                    className={
                                      purchaseDisabled ? "btn buy-now disabled" : "btn buy-now"
                                    }
                                    onClick={(e) => handleBuyNow(e)}
                                    style={{
                                      width: "100%",
                                    }}
                                    disabled={purchaseDisabled}
                                  >
                                    Buy Now
                                  </button>
                                )}
                            </div>
                          )}

                          <div className="share-course">
                            <span>Share this course</span>
                            <a
                              className="btn-share"
                              style={{ cursor: "pointer" }}
                              onClick={(e) =>
                                openComingSoonOrNotifyModal(
                                  pageContent.id,
                                  null,
                                  pageContent,
                                  "SHARE"
                                )
                              }
                            >
                              <i className="icon icon-font-share"></i>
                              <samp>Share</samp>
                            </a>
                          </div>
                          {enrolledProductTypes.includes("PT") &&
                          enrolledProductTypes.includes("OC") &&
                          enrolledProductTypes.includes("SANDBOX") &&
                          enrolledProductTypes.includes("LAB") ? null : (
                            <div className="subscribe-course">
                              <div className="subscribe-course-in">
                                <div> Access all courses with our subscription plan.</div>
                                <div>All courses, One subscription! </div>
                                {enrolledProductTypes.includes("PT") &&
                                enrolledProductTypes.includes("OC") &&
                                enrolledProductTypes.includes("LAB") ? (
                                  <div className="subsc">
                                    <Link href="/pricing">
                                      <button className="sub-btn">Upgrade now</button>
                                    </Link>
                                  </div>
                                ) : (
                                  <div className="subsc">
                                    <Link href="/pricing">
                                      <button
                                        className="sub-btn"
                                        onClick={(e) => handleSubsClick()}
                                      >
                                        Subscribe Now
                                      </button>
                                    </Link>
                                  </div>
                                )}
                                <div className="amtt">Starts from ${priceToShow} /month</div>
                              </div>
                            </div>
                          )}
                        </>
                      ) : activePlan === "TEAMS" ? (
                        <div className="teams">
                          <div className="business">
                            <img
                              src="/images/plan-type-selecton/whizlabs-logo.png"
                              alt="whizlabs-logo"
                            />
                            <p>Business</p>
                          </div>
                          <p className="bussines-description">
                            Get access to all the Hands-on-Labs, Sandboxes, Videos and Assessments
                            for your organisation
                          </p>
                          <button className="request-demo" onClick={() => {
                            window.open("https://business.whizlabs.com/request-demo-page")
                          }}>Request a Demo</button>
                          <div className="business-benefits">
                            <p className="perks">
                              <img src="/images/plan-type-selecton/check.svg" alt="check" />
                              <span>  For teams of 5 or More Users</span>
                            </p>
                            <p className="perks">
                              <img src="/images/plan-type-selecton/check.svg" alt="check" />
                              <span>500+ Trending Courses</span>
                            </p>
                            <p className="perks">
                              <img src="/images/plan-type-selecton/check.svg" alt="check" />
                              <span>1000+ Hands-on Labs</span>
                            </p>
                            <p className="perks">
                              <img src="/images/plan-type-selecton/check.svg" alt="check" />
                              <span>200+ Cloud Challenges</span>
                            </p>
                            <p className="perks">
                              <img src="/images/plan-type-selecton/check.svg" alt="check" />
                              <span>100+ Projects</span>
                            </p>
                            <p className="perks">
                              <img src="/images/plan-type-selecton/check.svg" alt="check" />
                              <span>Unlimited Sandboxes</span>
                            </p>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      
                    </div>
                  </div>
                </div>

                {!checkIfUserEnrolledAllProducts() && (
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
                      {!checkIfUserEnrolledAllProducts() &&
                        selectedCourseType.length > 0 &&
                        !crazyDealPromo && (
                          <button
                            className="btn buy-now"
                            onClick={(e) => {
                              if (selectedCourseType.length > 0) {
                                handleCart(e);
                              }
                            }}
                          >
                            Add to Cart
                          </button>
                        )}
                      {!checkIfUserEnrolledAllProducts() &&
                        selectedCourseType.length > 0 &&
                        crazyDealPromo && (
                          <button className="btn buy-now" onClick={(e) => handleBuyNow(e)}>
                            Buy Now
                          </button>
                        )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <br />

          <CallToAction />
          {pageContent.seo_details?.genuine_service && (
            <div>
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
            </div>
          )}
        </>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cartData: state.cart.cart,
    userData: state.authData.userData,
    userSubscriptionData: state.userProfileData.userSubscriptionData,
    whislist: state.whislist.whislist,
    currencyData: state.ipDetails.currency_detail,
    redirectTo: state.redirectData.redirect_to,
    utmData: state.utmData,
    whizCard: state.whizCard.data,
    notified: state.userCourse.notified_course,
    clientStatus: state.client.client,
    timerStatus: state.timer.timer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCartAction: (id, type, currency) => dispatch(addToCart(id, type, currency)),
    removeFromCartAction: (id, type) => dispatch(removeFromCart(id, type)),
    addWhislist: (course_id, user_id) => dispatch(StoreWhishlist(course_id, user_id)),
    alertBoxAction: (data) => dispatch(alertBox(data)),
    redirectionAction: (data, url) => dispatch(updateRedirection(data, url)),
    updateNotified: (user_id) => dispatch(NotifiedCourse(user_id)),
    buttonClickAction: (data, cookie) => dispatch(subsButtonClick(data, cookie)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Course);
