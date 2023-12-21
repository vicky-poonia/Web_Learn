import React, { useEffect } from "react";
import Head from "next/head";
import "keen-slider/keen-slider.min.css";
import { Accordions, CallToAction, StarRating } from "@/components/import";
import { useKeenSlider } from "keen-slider/react";
import { connect } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";
import { updateRedirection } from "redux/Redirection/redirect-actions";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Slider from "react-slick";
import md5 from "md5";
import { PPCDATA } from "../components/ppcdata";
const Ppc = ({ pageData, userData, reviewsDatas, currencyData, redirectionAction, extraData }) => {
  const [isBreakpoint, setIsBreakpoint] = useState(false);
  const [showfullfaq, setshowFullfaq] = useState(false);
  const router = useRouter();
  const [labInfoData, setLabInfoData] = useState([]);
  const [videoCourseData, setVideoCourseData] = useState([]);
  const [activeTabType, setActiveTabType] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(null);
  const [totalprice, setTotalprice] = useState(null);
  const [totalregprice, setTotalregprice] = useState(null);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [practiceTestData, setPracticeTestData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isOcComingSoon, SetisOcComingSoon] = useState(false);
  const [isPtComingSoon, SetisPtComingSoon] = useState(false);
  const [currency, setCurrency] = useState({
    symbol: null,
    type: "inr",
  });
  const [additionalDatas, setadditionalData] = useState({
    courseid: null,
    faqdetails: [],
    products: [],
    ratings: 0,
    overall_rating: 0.0,
    seo_details: null,
    question_count: 0,
    video_count: 0,
    video_hours: "0",
    learners_count: 0,
    lab_count: 0,
  });

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView: isBreakpoint ? 1 : 5,
    spacing: 5,
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });
  useEffect(() => {
    if (currencyData) {
      setCurrency(currencyData);
    }
  }, [currencyData]);
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    function handleResize() {
      const { innerWidth: width, innerHeight: height } = window;
      if (width < 450) {
        setIsBreakpoint(true);
      } else {
        setIsBreakpoint(false);
      }
    }
  }, []);

  useEffect(() => {
    if (pageData?.detailedInfo?.praticetest_info?.length > 0) {
      setActiveTabType("PT");
      setExpanded("panel0");
    } else if (pageData?.detailedInfo?.onlinecourse_info?.length > 0) {
      setActiveTabType("OC");
      setExpanded("panel0");
    } else if (pageData?.detailedInfo?.lab_info?.length > 0) {
      setActiveTabType("LAB");
      setExpanded("panel0");
    }

    if (pageData && pageData.id && currency) {
      let faq = pageData.faq_details.find(({ faq_type }) => faq_type === "G");
      setadditionalData({
        courseid: pageData.id,
        faqdetails: faq.faq,
        products: pageData.products,
        ratings: pageData.ratings.rating,
        overall_rating: pageData.ratings.overall_rating,
        seo_details: pageData.seo_details,
        question_count: pageData.web_counts.ques_count,
        video_count: pageData.web_counts.vid_count,
        video_hours: pageData.web_counts.video_duration,
        learners_count: pageData.learners_count,
        lab_count: pageData.web_counts.lab_count,
      });
      let pt_sp = 0;
      let pt_rp = 0;
      let oc_sp = 0;
      let oc_rp = 0;
      if (additionalDatas.products != null) {
        additionalDatas.products.map((item) => {
          if (item.product_type === "PT") {
            pt_sp = parseFloat(item.sale_price[currency.type]);
            pt_rp = parseFloat(item.regular_price[currency.type]);
          }
          if (item.product_type === "OC") {
            oc_sp = parseFloat(item.sale_price[currency.type]);
            oc_rp = parseFloat(item.regular_price[currency.type]);
          }
        });
        let total_saleprice = pt_sp + oc_sp;
        let total_regularprice = pt_rp + oc_rp;
        let total_discount = (100 - (total_saleprice * 100) / total_regularprice).toFixed(0);
        setDiscountPercentage(total_discount);
        setTotalprice(total_saleprice.toFixed(2));
        setTotalregprice(total_regularprice.toFixed(2));
      }

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

          labTree.length > 0 ? labTree[labTree.length - 1].children.push(item) : labTree.push(item);

          labCount = labCount + 1;
        });

      setLabInfoData(labTree);
    }
  }, [pageData, currency]);

  const handleChangeAccordion =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const changeCourseLibrary = (e, type) => {
    e.preventDefault();
    setExpanded("panel0");
    setActiveTabType(type);
  };
  const handlefaqexpand = (e) => {
    e.preventDefault();
    if (showfullfaq) {
      setshowFullfaq(false);
    } else {
      setshowFullfaq(true);
    }
  };
  const handleoption = (e, slug) => {
    e.preventDefault();
    router.push(`/${slug}`);
  };
  const handlePracticeTest = (e, id) => {
    e.preventDefault();
    if (userData && userData.data.user_id) {
      window.open(
        `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageData.seo_details?.slug}/${pageData.id}/quiz/${id}`
      );
    } else {
      let url =
        process.env.NEXT_PUBLIC_LMS_URL +
        "/course/" +
        pageData.seo_details?.slug +
        "/" +
        pageData.id +
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
        `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageData.seo_details?.slug}/${pageData.id}/video/${videoId}`
      );
    } else {
      let url =
        process.env.NEXT_PUBLIC_LMS_URL +
        "/course/" +
        pageData.seo_details?.slug +
        "/" +
        pageData.id +
        "/video";
      redirectionAction("LMS_ACTIVITY", url); // after sign in redirect to LMS ONLINE COURSE PAGE
      document.body.classList.add("open-modal-login");
    }
  };

  const handleLabs = (e, labData) => {
    e.preventDefault();
    if (userData && userData.data.user_id) {
      const backLink = `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageData.seo_details?.slug}/${pageData.id}/lab`;
      const token = md5("1@sas" + userData.data.user_email + "%1@asa");
      const playRedirectLink = new URL("https://play.whizlabs.com/site/lms_login");
      playRedirectLink.searchParams.append("course_id", pageData.id);
      playRedirectLink.searchParams.append("lab_id", labData.id);
      playRedirectLink.searchParams.append("points", labData.credits);
      playRedirectLink.searchParams.append("ref", labData.play_link);
      playRedirectLink.searchParams.append("user_token", userData.data.token);
      playRedirectLink.searchParams.append("back", backLink);
      playRedirectLink.searchParams.append("token", token);
      playRedirectLink.searchParams.append("version", "3");
      playRedirectLink.searchParams.append("api_origin", process.env.NEXT_PUBLIC_BASE_URL);
      window.open(playRedirectLink.href);
    } else {
      let url =
        process.env.NEXT_PUBLIC_LMS_URL +
        "/course/" +
        pageData.seo_details?.slug +
        "/" +
        pageData.id +
        "/lab";
      redirectionAction("LMS_ACTIVITY", url); // after sign in redirect to LMS ONLINE COURSE PAGE
      document.body.classList.add("open-modal-login");
    }
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    if (userData) {
      router.push(`/${pageData.slug}/checkout?prod=pt:oc`); // after sign in redirect to direct checkout Page
    } else {
      redirectionAction("REDIRECT", `/${pageData.slug}/checkout?prod=pt:oc`);
      document.querySelector("body").classList.add("open-modal-login");
    }
  };
  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: isBreakpoint ? 1 : 2,
    slidesToScroll: 2,
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div className="lp-content-banner" id="home">
        <div className="container">
          <div className="caption-block">
            <h1 className="font_head_lp">{extraData.coursename}</h1>
            <div className="rating-block">
              <div className="stars-group">
                <figure>
                  <img
                    className="img-full"
                    src={
                      additionalDatas.overall_rating > 1 || additionalDatas.overall_rating == 1
                        ? "/images/star-on.svg"
                        : additionalDatas.overall_rating < 1 && additionalDatas.overall_rating > 0
                        ? "/images/star-half.svg"
                        : "/images/star-off.svg"
                    }
                    alt=""
                  />
                </figure>
                <figure>
                  <img
                    className="img-full"
                    src={
                      additionalDatas.overall_rating > 2 || additionalDatas.overall_rating == 2
                        ? "/images/star-on.svg"
                        : additionalDatas.overall_rating < 2 && additionalDatas.overall_rating > 1
                        ? "/images/star-half.svg"
                        : "/images/star-off.svg"
                    }
                    alt=""
                  />
                </figure>
                <figure>
                  <img
                    className="img-full"
                    src={
                      additionalDatas.overall_rating > 3 || additionalDatas.overall_rating == 3
                        ? "/images/star-on.svg"
                        : additionalDatas.overall_rating < 3 && additionalDatas.overall_rating > 2
                        ? "/images/star-half.svg"
                        : "/images/star-off.svg"
                    }
                    alt=""
                  />
                </figure>
                <figure>
                  <img
                    className="img-full"
                    src={
                      additionalDatas.overall_rating > 4 || additionalDatas.overall_rating == 4
                        ? "/images/star-on.svg"
                        : additionalDatas.overall_rating < 4 && additionalDatas.overall_rating > 3
                        ? "/images/star-half.svg"
                        : "/images/star-off.svg"
                    }
                    alt=""
                  />
                </figure>
                <figure>
                  <img
                    className="img-full"
                    src={
                      additionalDatas.overall_rating == 5
                        ? "/images/star-on.svg"
                        : additionalDatas.overall_rating < 5 && additionalDatas.overall_rating > 4
                        ? "/images/star-half.svg"
                        : "/images/star-off.svg"
                    }
                    alt=""
                  />
                </figure>
                <samp>{additionalDatas.overall_rating.toFixed(1)}</samp>
                <div className="total-rating">
                  <span>
                    (<strong>{additionalDatas.ratings}</strong> ratings)
                  </span>
                </div>
              </div>
              <div className="total-learners">
                <i className="icon icon-font-graduation-cap"></i>
                <span>
                  <strong>{additionalDatas.learners_count}</strong> Learners
                </span>
              </div>
            </div>
            <p>
              Get the Best-in-class
              <strong> Training Package</strong>
              <br></br>
              <span>
                <strong>Pass your {extraData.type} Exam in first Attempt</strong>
              </span>
            </p>
            <div
              className="course-highlights"
              style={additionalDatas.lab_count == 0 ? { width: "40%" } : {}}
            >
              {additionalDatas.question_count != 0 && (
                <>
                  <div className="block-group">
                    <figure>
                      <img className="img-full" src="/images/lp-que.webp" alt="h" />
                    </figure>
                    <div className="txt-box">
                      <span>{additionalDatas.question_count}</span>
                      <samp>Practice Questions</samp>
                    </div>
                  </div>
                </>
              )}
              {additionalDatas.video_count != 0 && (
                <>
                  <div className="block-group">
                    <figure>
                      <img className="img-full" src="/images/lp-video.webp" />
                    </figure>
                    <div className="txt-box">
                      <span>{additionalDatas.video_count}</span>
                      <samp>Videos</samp>
                    </div>
                  </div>
                </>
              )}

              {additionalDatas.lab_count != 0 && (
                <>
                  <div className="block-group">
                    <figure>
                      <img className="img-full" src="/images/lp-labs.webp" alt="h" />
                    </figure>
                    <div className="txt-box">
                      <span>{additionalDatas.lab_count}</span>
                      <samp>Hands on Labs</samp>
                    </div>
                  </div>
                </>
              )}
            </div>
            <a className="btn btn-buy" onClick={(e) => handleBuyNow(e)}>
              Buy Now
            </a>
          </div>
          <div className="img-block">
            <figure>
              <img className="img-full" src={extraData.content_banner} />
            </figure>
          </div>
        </div>
      </div>

      {/* <!-- unlock-courses-block --> */}
      <section className="unlock-courses-block" id="exam-info">
        <div className="container">
          <div className="caption">
            <h2>
              Give your preparation a New edge with{" "}
              <strong>{extraData.coursename} Practice Tests</strong>
            </h2>
            <div className="block-group">
              <label>Key Features of the Course</label>
              <div className="block">
                <ul>
                  <li className="active">
                    {" "}
                    <strong>{additionalDatas.question_count} Practice questions</strong>
                  </li>
                  <li className="active">
                    <span>
                      <strong>100% Syllabus</strong>
                    </span>{" "}
                    covered{" "}
                  </li>
                  <li className="active">
                    <span>
                      <strong>
                        {parseInt(additionalDatas.video_hours.substring(1, 2))}+ hours
                      </strong>
                    </span>{" "}
                    Training Videos <span>({additionalDatas.video_count} Lectures)</span>
                  </li>
                  <li className="active">
                    <span>
                      <strong>{additionalDatas.lab_count}+ Hands on Labs</strong>
                    </span>
                  </li>
                  <li className="active">
                    <span>
                      <strong>Unlimited Access</strong>
                    </span>{" "}
                    for lifetime
                  </li>
                  <li className="active">
                    Course designed by{" "}
                    <span>
                      <strong>{extraData.type} Certified Experts</strong>
                    </span>
                  </li>
                  <li className="active">
                    <span>
                      <strong>Auto-Updates</strong>
                    </span>{" "}
                    to the Course Content
                  </li>
                  <li className="active">
                    24x7 Subject Matter{" "}
                    <span>
                      <strong>Expert’s Support</strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="unlock-box">
            <figure className="lock-img">
              <img className="img-full" src="/images/lock.webp" />
            </figure>
            <h6 className="head-txt">Unlock Courses</h6>
            <div className="option-group">
              <ul>
                <li className="option">
                  <div className="name">
                    <figure>
                      <img className="img-full" src="/images/lp-que.webp" />
                    </figure>
                    <span>Practice Test</span>
                  </div>
                  <span className="status">{additionalDatas.question_count} Questions</span>
                </li>
                <li className="option">
                  <div className="name">
                    <figure>
                      <img className="img-full" src="/images/lp-video.webp" />
                    </figure>
                    <span>Video Courses</span>
                  </div>
                  <span className="status">{videoCourseData.length} Sessions</span>
                </li>
                {additionalDatas.lab_count != 0 && (
                  <>
                    <li className="option">
                      <div className="name">
                        <figure>
                          <img className="img-full" src="/images/lp-labs.webp" />
                        </figure>
                        <span>Hands-on Labs</span>
                      </div>
                      <span className="status">{additionalDatas.lab_count} Labs</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="price-and-offer">
              <span className="offer">{discountPercentage}% OFF</span>
              <div className="price-block">
                <del className="old-price">
                  {currency.symbol}
                  {totalregprice}
                </del>
                <span className="price">
                  {currency.symbol}
                  {totalprice}
                </span>
              </div>
            </div>
            <div className="btn-group">
              <button className="btn add-to-cart" onClick={(e) => handleBuyNow(e)}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- included-course --> */}
      {activeTabType && (
        <div id="whats-included" className="benifits-block">
          <div className="container">
            <div className="container-left">
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h2 className="title">Included in this course</h2>
              </div>
              <div className="tab_wrapper">
                <ul className="tab_list lp-tablist">
                  {isPtComingSoon == false && pageData.detailedInfo?.praticetest_info?.length ? (
                    <li
                      className={
                        activeTabType === "PT" ? "resp-tab-item hor_1 resp-tab-active" : ""
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
                          {pageData?.web_counts?.pt_count} Practice Tests
                        </small>
                      </samp>
                    </li>
                  ) : (
                    ""
                  )}

                  {pageData.detailedInfo?.onlinecourse_info?.length ? (
                    <li
                      className={
                        activeTabType === "OC" ? "resp-tab-item hor_1 resp-tab-active" : ""
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
                          {pageData?.web_counts?.vid_count} Videos Available
                        </small>
                      </samp>
                    </li>
                  ) : (
                    ""
                  )}

                  {pageData.detailedInfo?.lab_info?.length ? (
                    <li
                      className={
                        activeTabType === "LAB" ? "resp-tab-item hor_1 resp-tab-active" : ""
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
                          {pageData?.web_counts?.lab_count} Labs Available
                        </small>
                      </samp>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
                <div className="resp-accordion resp-tabs-container hor_1 content_wrapper">
                  {pageData.products.map((prod, index) => {
                    if (
                      prod.product_type === "PT" &&
                      pageData.detailedInfo?.praticetest_info?.length
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
                                  {pageData?.web_counts?.pt_count} Practice Tests
                                </small>
                              </samp>
                            </div>
                          </div>
                          <div
                            title="practice-test"
                            className="tab_content"
                            id="practice-test"
                            style={{ display: activeTabType === "PT" ? "block" : "none" }}
                          >
                            <p
                              dangerouslySetInnerHTML={{
                                __html: prod?.other_details?.short_description,
                              }}
                            />
                            <div className="accordian-block">
                              <div className="title">Topic-wise Content Distribution</div>
                              <div className="accordian-list">
                                <div className="item">
                                  {practiceTestData.length > 0 &&
                                    practiceTestData.map((data, idx) => (
                                      <Accordion
                                        square
                                        expanded={expanded === "panel" + idx}
                                        onChange={handleChangeAccordion("panel" + idx)}
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
                                                (data.children?.length > 1 ? " Tests" : " Test")}
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
                                                      onClick={(e) => handlePracticeTest(e, itm.id)}
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
                      pageData.detailedInfo?.onlinecourse_info?.length
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
                                  {pageData?.web_counts?.vid_count} Videos Available
                                </small>
                              </samp>
                            </div>
                          </div>

                          <div
                            title="video-course"
                            className="tab_content"
                            style={{ display: activeTabType === "OC" ? "block" : "none" }}
                          >
                            <p
                              dangerouslySetInnerHTML={{
                                __html: prod?.other_details?.short_description,
                              }}
                            />
                            <div className="accordian-block">
                              <div className="title">Topic-wise Content Distribution</div>
                              <div className="accordian-list">
                                <div className="item">
                                  {videoCourseData.length > 0 &&
                                    videoCourseData.map((vcData, vcIdx) => (
                                      <Accordion
                                        square
                                        expanded={expanded === "panel" + vcIdx}
                                        onChange={handleChangeAccordion("panel" + vcIdx)}
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
                                                      {data.time_hour > 0 && data.time_hour + "h "}
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

                  {pageData.detailedInfo?.lab_info?.length > 0 && (
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
                              {pageData?.web_counts?.lab_count} Labs Available
                            </small>
                          </samp>
                        </div>
                      </div>
                      <div
                        title="Hands-on Labs"
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
                                            (labData.children?.length > 1 ? " labs" : " lab")}
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
      <div className="enroll-now-block">
        <div className="container-small">
          <div className="inner">
            <div className="caption">
              Succeed in Your {extraData.type} Certification Journey With Us! <br />
              <strong>Learn at your own pace!</strong>
            </div>
            <a href="#" className="btn btn-now" onClick={(e) => handleBuyNow(e)}>
              Buy Now
            </a>
          </div>
        </div>
      </div>
      {/* <!-- benefits-section --> */}
      <div className="benefits-section">
        <div className="container">
          <div className="caption-block">
            <h2>
              Benefits of Attempting <strong>{extraData.coursename} Exam</strong>
            </h2>
            <p>{extraData.benefits[0].title}</p>
            <div className="benifits-group">
              <div className="block">
                <figure>
                  <img className="img-full" src="/images/round-setting.svg" />
                </figure>
                <label>{extraData.benefits[1]}</label>
              </div>
              <div className="block">
                <figure>
                  <img className="img-full" src="/images/round-bulb.svg" />
                </figure>
                <label>{extraData.benefits[2]}</label>
              </div>
              <div className="block">
                <figure>
                  <img className="img-full" src="/images/round-play.svg" />
                </figure>
                <label>{extraData.benefits[3]}</label>
              </div>
              <div className="block">
                <figure>
                  <img className="img-full" src="/images/round-doller.svg" />
                </figure>
                <label>{extraData.benefits[4]}</label>
              </div>
            </div>
          </div>
          <figure className="img-block">
            <img className="img-full" src={extraData.benefits_img} />
          </figure>
        </div>
      </div>
      {/* <!-- exam-format-block --> */}
      <section className="exam-format-block" id="examformat">
        <div className="container">
          <div className="title">
            <h2>
              <label>Real Exam format</label>
              {extraData.realexam.title}
            </h2>
          </div>
          <div className="exam-box-group">
            <div className="exam-box">
              <figure>
                <img className="img-full" src="/images/exam-1.webp" />
              </figure>
              <label>Prior Certification</label>
              <span> {extraData.realexam.prior_certification}</span>
            </div>
            <div className="exam-box">
              <figure>
                <img className="img-full" src="/images/exam-2.webp" />
              </figure>
              <label>Exam Validity</label>
              <span> {extraData.realexam.exam_validity}</span>
            </div>
            <div className="exam-box">
              <figure>
                <img className="img-full" src="/images/exam-3.webp" />
              </figure>
              <label>Exam Fee</label>
              <span> {extraData.realexam.exam_fees}</span>
            </div>
            <div className="exam-box">
              <figure>
                <img className="img-full" src="/images/exam-4.webp" />
              </figure>
              <label>Exam Duration</label>
              <span> {extraData.realexam.exam_duration}</span>
            </div>
            <div className="exam-box">
              <figure>
                <img className="img-full" src="/images/exam-5.webp" />
              </figure>
              <label>No. of Questions</label>
              <span> {extraData.realexam.no_of_question}</span>
            </div>
            <div className="exam-box">
              <figure>
                <img className="img-full" src="/images/exam-6.webp" />
              </figure>
              <label>Passing Marks</label>
              <span> {extraData.realexam.passing_mark}</span>
            </div>
            <div className="exam-box">
              <figure>
                <img className="img-full" src="/images/exam-7.webp" />
              </figure>
              <label>Recommended Experience</label>
              <span>{extraData.realexam.recomended_experience}</span>
            </div>
            <div className="exam-box">
              <figure>
                <img className="img-full" src="/images/exam-8.webp" />
              </figure>
              <label>Exam Format</label>
              <span>{extraData.realexam.exam_format}</span>
            </div>
          </div>
          <div className="languages-type">
            <figure>
              <img className="img-full" src="/images/language.webp" />
            </figure>
            <span>
              <strong>Languages:</strong> English, French, German, Indonesian, Italian, Japanese,
              Korean, Portuguese, Simplified Chinese, and Spanish
            </span>
          </div>
        </div>
        <div className="container-small">
          <div className="enroll-block">
            <p>
              {extraData.enroll} <strong>{extraData.enrollstrong}</strong>
            </p>
            <a className="btn btn-now" onClick={(e) => handleBuyNow(e)}>
              Buy Now
            </a>
          </div>
        </div>
      </section>

      {/* <!-- faq-block --> */}
      <div className="faq-block" id="faq">
        <div className="container-small">
          <div className="container-left">
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <h2 className="title">Frequently Asked Questions</h2>
            </div>

            {additionalDatas.faqdetails.map((item, index) => {
              if (showfullfaq ? true : index < 5) {
                return (
                  <>
                    <Accordion
                      className="item-head open"
                      style={{ padding: "24px 0", background: "#fff" }}
                    >
                      <AccordionSummary
                        className="faq-acc-lp"
                        style={{ fontWeight: "500", marginLeft: "0" }}
                      >
                        {item.question}
                      </AccordionSummary>
                      <AccordionDetails
                        style={{ color: "#2E2E2E", fontSize: "14px", marginBottom: "15px" }}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.answer,
                          }}
                        ></div>
                      </AccordionDetails>
                    </Accordion>
                  </>
                );
              }
            })}
            <div className="expandmore" onClick={(e) => handlefaqexpand(e)}>
              {showfullfaq ? "View Less" : "View More"}
            </div>
          </div>
        </div>
      </div>

      {/* <!-- testimonial-block --> */}
      <div className="testimonial-block" id="reviews">
        <div className="container">
          <div className="heading">
            <figure>
              <img className="img-full" src="/images/quote-img.svg" alt="" />
            </figure>
            <h5>
              Trusted by over <strong>5 Million+ Learners</strong>
            </h5>
          </div>
          <div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
            <Slider {...settings}>
              {reviewsDatas?.data.map((item, idx) => {
                return (
                  <>
                    <div
                      style={{
                        background: "#fff",
                        borderRadius: "8px",
                        padding: "30px",
                        height: "330px",
                        marginLeft: "15px",
                      }}
                    >
                      <h5>{item.post_question_title}</h5>
                      <p>{item.post_question_text}</p>
                      <div className="user-block">
                        <div className="details">
                          <span>{item.user_name}</span>
                          <samp></samp>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
      <div className="brands-block">
        <div className="container">
          <div className="title">
            We are blessed with some amazing clients.<strong>Here are just a few!</strong>
          </div>
          <div className="brand-logoes">
            <figure>
              <img className="img-full" src="/images/logo-accenture@2x.png" alt="" />
            </figure>
            <figure>
              <img className="img-full" src="/images/logo-infosys@2x.png" alt="" />
            </figure>
            <figure>
              <img className="img-full" src="/images/logo-campgemni@2x.png" alt="" />
            </figure>
            <figure>
              <img className="img-full" src="/images/logo-deloitte@2x.png" alt="" />
            </figure>
            <figure>
              <img className="img-full" src="/images/logo-cisco@2x.png" alt="" />
            </figure>
            <figure>
              <img className="img-full" src="/images/logo-bloomberge@2x.png" alt="" />
            </figure>
            <figure>
              <img className="img-full" src="/images/logo-global-knowledge.png" alt="" />
            </figure>
            <figure>
              <img className="img-full" src="/images/logo-wavestone.png" alt="" />
            </figure>
            <figure>
              <img className="img-full" src="/images/logo-vivid-cloud.png" alt="" />
            </figure>
            <figure>
              <img className="img-full" src="/images/logo-TLG.png" alt="" />
            </figure>
            <figure>
              <img className="img-full" src="/images/logo-miami.png" alt="" />
            </figure>
            <figure>
              <img className="img-full" src="/images/logo-versor.png" alt="" />
            </figure>

            <figure>
              <img className="img-full" src="/images/logo-kpmg.png" alt="" />
            </figure>
            <figure>
              <img className="img-full" src="/images/logo-stack.png" alt="" />
            </figure>
            <figure>
              <img className="img-full" src="/images/logo-digi.png" alt="" />
            </figure>
            <figure>
              <img className="img-full" src="/images/logo-mityo.png" alt="" />
            </figure>
            <figure>
              <img className="img-full" src="/images/logo-spatial.png" alt="" />
            </figure>
          </div>
        </div>
      </div>
      <div className="course-slider">
        <div className="container">
          <div className="heading">
            <h2 className="title">Recommends courses</h2>
            <div className="discount-block">
              <a
                onClick={(e) => handleoption(e, "training/library")}
                style={{ cursor: "pointer" }}
                className="viewallcourse"
              >
                View All Courses
              </a>
            </div>
          </div>
          <div className=" keen-slider" ref={sliderRef}>
            {PPCDATA.map((item, id) => {
              return (
                <>
                  <div className=" keen-slider__slide">
                    <div className=" courserc-lp">
                      <div>
                        <img className="img-full-lp" src={item.image}></img>
                      </div>
                      <div className="course-content-lp">
                        <h6 className="title">{item.title}</h6>
                        <div className="level-text-lp-aws">
                          <span>Level: {item.level}</span>
                        </div>
                        <p>{item.certification}</p>
                        <div className="stars-group-lp-aws">
                          <figure>
                            <img
                              className="img-full"
                              src={
                                parseFloat(item.rating) == 1 || parseFloat(item.rating) > 1
                                  ? "/images/star-on.svg"
                                  : parseFloat(item.rating) < 1 && parseFloat(item.rating) > 0
                                  ? "/images/star-half.svg"
                                  : "/images/star-off.svg"
                              }
                              alt=""
                            />
                          </figure>
                          <figure>
                            <img
                              className="img-full"
                              src={
                                parseFloat(item.rating) == 2 || parseFloat(item.rating) > 2
                                  ? "/images/star-on.svg"
                                  : parseFloat(item.rating) < 2 && parseFloat(item.rating) > 1
                                  ? "/images/star-half.svg"
                                  : "/images/star-off.svg"
                              }
                              alt=""
                            />
                          </figure>
                          <figure>
                            <img
                              className="img-full"
                              src={
                                parseFloat(item.rating) == 3 || parseFloat(item.rating) > 3
                                  ? "/images/star-on.svg"
                                  : parseFloat(item.rating) < 3 && parseFloat(item.rating) > 2
                                  ? "/images/star-half.svg"
                                  : "/images/star-off.svg"
                              }
                              alt=""
                            />
                          </figure>
                          <figure>
                            <img
                              className="img-full"
                              src={
                                parseFloat(item.rating) == 4 || parseFloat(item.rating) > 4
                                  ? "/images/star-on.svg"
                                  : parseFloat(item.rating) < 4 && parseFloat(item.rating) > 3
                                  ? "/images/star-half.svg"
                                  : "/images/star-off.svg"
                              }
                              alt=""
                            />
                          </figure>
                          <figure>
                            <img
                              className="img-full"
                              src={
                                parseFloat(item.rating) == 5
                                  ? "/images/star-on.svg"
                                  : parseFloat(item.rating) < 5 && parseFloat(item.rating) > 4
                                  ? "/images/star-half.svg"
                                  : "/images/star-off.svg"
                              }
                              alt=""
                            />
                          </figure>
                          <samp style={{ marginLeft: "8px" }}>{item.rating}</samp>
                          <samp style={{ marginLeft: "4px", color: "darkgray", fontSize: "12px" }}>
                            ({item.ratings} ratings)
                          </samp>
                        </div>

                        <button
                          className="btn-add-cart-lp-aws"
                          onClick={(e) => handleoption(e, item.link)}
                        >
                          More Option
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {/* <div style={isBreakpoint?{marginLeft:"43.5%",marginTop:"10px"}:{marginLeft:"48%",marginTop:"10px"}}> */}
            <div
              style={{ display: "flex", flexDirection: "row", padding: "0 5px", marginTop: "15px" }}
            >
              <div>
                <button
                  className="button_for_slider slider-block__controls_left"
                  onClick={(e) => {
                    e.preventDefault();
                    slider.prev();
                  }}
                  style={{ opacity: "0.7" }}
                >
                  &lt;
                </button>
              </div>
              <div>
                <button
                  className="button_for_slider button_right_margin slider-block__controls_right"
                  onClick={(e) => slider.next()}
                  style={{ opacity: "0.7" }}
                >
                  &gt;
                </button>
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
    userData: state.authData.userData,
    currencyData: state.ipDetails.currency_detail,
    redirectTo: state.redirectData.redirect_to,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    redirectionAction: (data, url) => dispatch(updateRedirection(data, url)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Ppc);
