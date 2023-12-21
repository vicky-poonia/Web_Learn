import { useEffect, useState } from "react";
import { getSingleCourse } from "@/services/review-services/services";
import { useKeenSlider } from "keen-slider/react";
import { useRouter } from "next/router";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { addToCart, removeFromCart } from "redux/AddToCart/cart-actions";
import React from "react";
import "keen-slider/keen-slider.min.css";
import { connect } from "react-redux";
import md5 from "md5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getReviews } from "@/services/review-services/services";
import { updateRedirection } from "redux/Redirection/redirect-actions";
const Awscsa = ({
  courseDatas,
  courseId,
  practiseques,
  userData,
  review,
  cartData,
  redirectionAction,
  currencyData,
  enrolledProductTypes,
}) => {
  const [isBreakpoint, setIsBreakpoint] = useState(false);
  const router = useRouter();
  const [reviewdata, setReviews] = useState([]);
  const [showfullfaq, setshowFullfaq] = useState(false);
  const [question_count, setQuestioncount] = useState([]);
  const [faq, setFaq] = useState([]);
  const [labcount, setLabcount] = useState(0);
  const [videocount, setVideocount] = useState(0);
  const [ratings, setRatings] = useState({});
  const [practicetest, setPractiseTest] = useState([]);
  const [onlinecourse, setOnlinecourse] = useState([]);
  const [labs, setLabs] = useState([]);
  const [activeTabType, setActiveTabType] = useState("");
  const [expanded, setExpanded] = useState("panel0");
  const [totalDiscountPrice, setTotalDiscountPrice] = useState(null);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [overallrating, setOverallrating] = useState(0);
  const [totalratings, setTotalrating] = useState(0);
  const [learnerscount, setLearnercount] = useState(0);
  const [totalprice, setTotalprice] = useState(null);
  const [sec, setSec] = useState([]);
  const [videossec, setVideossec] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currency, setCurrency] = useState({
    symbol: null,
    type: "inr",
  });
  // const [sectionwise,SetSection] = useState([])
  // const [topicwise,setTopic] = useState([])
  const getPercentage = (regular, sale) => Math.round(((regular - sale) / regular) * 100);

  const priceFormat = (value) => {
    let is_decimal: any = value % 1;
    if (is_decimal != 0) {
      return value.toFixed(2);
    } else {
      return value;
    }
  };

  useEffect(() => {
    if (currencyData) {
      setCurrency(currencyData);
    }
  }, [currencyData]);

  useEffect(() => {
    if (courseDatas && courseDatas.detailedInfo) {
      let a = courseDatas.detailedInfo.praticetest_info.map((item) => {
        return item.questions_count;
      });
      const initialValue = 0;
      const sumWithInitial = a.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        initialValue
      );
      let b = courseDatas.detailedInfo.praticetest_info.map((item) => {
        if (item != null) {
          return 1;
        }
      });

      let topic = [];
      let sectionwise = [];
      for (let j = 1; j < courseDatas.detailedInfo.praticetest_info.length; j++) {
        if (courseDatas.detailedInfo.praticetest_info[j].quiz_name == null) {
          sectionwise.push(topic);
          topic = [];
          // SetSection([...topicwise])
          // setTopic([])
        } else {
          topic.push(courseDatas.detailedInfo.praticetest_info[j]);

          // setTopic([...topicwise,courseDatas.detailedInfo.practicetest_info[j]])
        }

        if (j == courseDatas.detailedInfo.praticetest_info.length - 1) {
          sectionwise.push(topic);
        }
      }
      setSec(sectionwise);
      let videocut = [];
      let temp = [];
      for (let i = 0; i < courseDatas.detailedInfo.onlinecourse_info.length; i++) {
        if (courseDatas.detailedInfo.onlinecourse_info[i].section_heading) {
          let seched = courseDatas.detailedInfo.onlinecourse_info[i].section_heading;

          for (let k = i + 1; k < courseDatas.detailedInfo.onlinecourse_info.length; k++) {
            if (courseDatas.detailedInfo.onlinecourse_info[k].video_name) {
              temp.push(courseDatas.detailedInfo.onlinecourse_info[k]);
            } else {
              temp.push(seched);
              videocut.push(temp);
              temp = [];
              break;
            }
            if (k == courseDatas.detailedInfo.onlinecourse_info.length - 1) {
              videocut.push(temp);
              videocut.push(seched);
              temp = [];
            }
          }
        }
      }
      let currency_type = "inr";
      if (currency) {
        currency_type = currency.type;
        let ptcost_old = parseFloat(
          courseDatas.products[0].regular_price
            ? courseDatas.products[0].regular_price[`${currency_type}`]
            : 0
        );
        let ptcost_new = parseFloat(
          courseDatas.products[0].sale_price
            ? courseDatas.products[0].sale_price[`${currency_type}`]
            : 0
        );
        let occost_old = parseFloat(
          courseDatas.products[1].regular_price
            ? courseDatas.products[1].regular_price[`${currency_type}`]
            : 0
        );
        let occost_new = parseFloat(
          courseDatas.products[1].sale_price
            ? courseDatas.products[1].sale_price[`${currency_type}`]
            : 0
        );
        let ftcost_old = parseFloat(
          courseDatas.products[2].regular_price
            ? courseDatas.products[2].regular_price[`${currency_type}`]
            : 0
        );
        let ftcost_new = parseFloat(
          courseDatas.products[2].sale_price
            ? courseDatas.products[2].sale_price[`${currency_type}`]
            : 0
        );
        let percent =
          100 -
          ((ptcost_new + occost_new + ftcost_new) / (ptcost_old + ftcost_old + occost_old)) * 100;
        let per = parseInt(percent.toFixed(0));
        let tp = ptcost_new + occost_new + ftcost_new;
        let dp = ptcost_old + ftcost_old + occost_old;
        setDiscountPercentage(per);
        setTotalprice(tp.toFixed(2));
        setTotalDiscountPrice(dp.toFixed(2));
      }
      if (review && review.data) {
        let a = [];
        review.data.forEach((item) => {
          let obj = {};
          obj["title"] = item.post_question_title;
          obj["text"] = item.post_question_text;
          obj["name"] = item.user_name;
          a.push(obj);
        });

        setReviews(a);
      }
      setVideossec(videocut);
      setFaq(courseDatas.faq_details[0].faq);
      setPractiseTest(courseDatas.detailedInfo.praticetest_info);
      setLabs(courseDatas.detailedInfo.lab_info);
      setOnlinecourse(courseDatas.detailedInfo.onlinecourse_info);
      setRatings(courseDatas.ratings);
      setVideocount(courseDatas.detailedInfo.onlinecourse_info.length);
      setLabcount(courseDatas.detailedInfo.lab_info.length);
      setQuestioncount(sumWithInitial);
      setOverallrating(courseDatas.ratings.overall_rating.toFixed(1));
      setTotalrating(courseDatas.ratings.rating);
      setLearnercount(courseDatas.learners_count);
      setActiveTabType("PT");
    }
  }, [courseDatas, currency]);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView: isBreakpoint ? 1 : 5,
    spacing: 5,
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });
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

  const handlefaqexpand = (e) => {
    e.preventDefault();
    if (showfullfaq) {
      setshowFullfaq(false);
    } else {
      setshowFullfaq(true);
    }
  };
  const handlePracticeTest = (e, id) => {
    e.preventDefault();
    if (userData && userData.data.user_id) {
      window.open(
        `${process.env.NEXT_PUBLIC_LMS_URL}/course/${courseDatas.seo_details?.slug}/${courseDatas.id}/quiz/${id}`
      );
    } else {
      let url =
        process.env.NEXT_PUBLIC_LMS_URL +
        "/course/" +
        courseDatas.seo_details?.slug +
        "/" +
        courseDatas.id +
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
        `${process.env.NEXT_PUBLIC_LMS_URL}/course/${courseDatas.seo_details?.slug}/${courseDatas.id}/video/${videoId}`
      );
    } else {
      let url =
        process.env.NEXT_PUBLIC_LMS_URL +
        "/course/" +
        courseDatas.seo_details?.slug +
        "/" +
        courseDatas.id +
        "/video";
      redirectionAction("LMS_ACTIVITY", url); // after sign in redirect to LMS ONLINE COURSE PAGE
      document.body.classList.add("open-modal-login");
    }
  };
  const handleLabs = (e, labData) => {
    e.preventDefault();
    if (userData && userData.data.user_id) {
      const backLink = `${process.env.NEXT_PUBLIC_LMS_URL}/course/${courseDatas.seo_details?.slug}/${courseDatas.id}/lab`;
      const token = md5("1@sas" + userData.data.user_email + "%1@asa");
      const playRedirectLink = new URL("https://play.whizlabs.com/site/lms_login");
      playRedirectLink.searchParams.append("course_id", courseDatas.id);
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
        courseDatas.seo_details?.slug +
        "/" +
        courseDatas.id +
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
    setActiveTabType(type);
  };
  const handleoption = (e, slug) => {
    e.preventDefault();
    router.push(`/${slug}`);
  };
  const handleBuyNow = (e) => {
    e.preventDefault();
    if (userData) {
      router.push(`/aws-solutions-architect-associate/checkout?prod=pt:oc`); // after sign in redirect to direct checkout Page
    } else {
      redirectionAction("REDIRECT", `/aws-solutions-architect-associate/checkout?prod=pt:oc`);
      document.querySelector("body").classList.add("open-modal-login");
    }
  };
  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };
  return (
    <>
      <div id="content-area" className="lp-content-aws-page">
        <div className="lp-content-banner" id="home">
          <div className="container">
            <div className="caption-block">
              <h1>AWS Certified Solutions Architect Associate</h1>
              <div className="rating-block">
                <div className="stars-group">
                  <figure>
                    <img className="img-full" src="/images/star-on.svg" alt="" />
                  </figure>
                  <figure>
                    <img className="img-full" src="/images/star-on.svg" alt="" />
                  </figure>
                  <figure>
                    <img className="img-full" src="/images/star-on.svg" alt="" />
                  </figure>
                  <figure>
                    <img className="img-full" src="/images/star-on.svg" alt="" />
                  </figure>
                  <figure>
                    <img className="img-full" src="/images/star-half.svg" alt="" />
                  </figure>
                  <samp>{overallrating}</samp>
                  <div className="total-rating">
                    <span>
                      (<strong>{totalratings}</strong> ratings)
                    </span>
                  </div>
                </div>
                <div className="total-learners">
                  <i className="icon icon-font-graduation-cap"></i>
                  <span>
                    <strong>{learnerscount}</strong> Learners
                  </span>
                </div>
              </div>
              <p>
                Get the Best-in-class
                <strong> Training Package</strong>
                <br></br>
                <span>Pass your AWS Exam in first Attempt</span>
              </p>
              <div className="course-highlights">
                <div className="block-group">
                  <figure>
                    <img className="img-full" src="/images/lp-que.webp" alt="h" />
                  </figure>
                  <div className="txt-box">
                    <span>{question_count}</span>
                    <samp>Practice Questions</samp>
                  </div>
                </div>
                <div className="block-group">
                  <figure>
                    <img className="img-full" src="/images/lp-video.webp" />
                  </figure>
                  <div className="txt-box">
                    <span>{videocount}</span>
                    <samp>Videos</samp>
                  </div>
                </div>
                <div className="block-group">
                  <figure>
                    <img className="img-full" src="/images/lp-labs.webp" alt="h" />
                  </figure>
                  <div className="txt-box">
                    <span>{labcount}</span>
                    <samp>Hands on Labs</samp>
                  </div>
                </div>
              </div>
              <a className="btn btn-buy" onClick={(e) => handleBuyNow(e)}>
                Buy Now
              </a>
            </div>
            <div className="img-block">
              <figure>
                <img className="img-full" src="/images/lp-content-banner-img.webp" />
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
                <strong>Whizlabs AWS Certified Solutions Architect Associate practice tests</strong>
              </h2>
              <div className="block-group">
                <label>Key Features of the Course</label>
                <div className="block">
                  <ul>
                    <li className="active"> {question_count} Practice questions</li>
                    <li className="active">
                      <span>100% Syllabus</span> covered{" "}
                    </li>
                    <li className="active">
                      <span>{videossec.length} Sessions</span> Training Videos{" "}
                      <span>({videocount} Lectures)</span>
                    </li>
                    <li className="active">
                      <span>{labcount} Hands on Labs</span>
                    </li>
                    <li className="active">
                      <span>Unlimited Access</span> for lifetime
                    </li>
                    <li className="active">
                      Course designed by <span>AWS Certified Experts</span>
                    </li>
                    <li className="active">
                      <span>Auto-Updates</span> to the Course Content
                    </li>
                    <li className="active">
                      24x7 Subject Matter <span>Expert’s Support</span>
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
                      <span>Practice Tests</span>
                    </div>
                    <span className="status">{practicetest.length} Exams</span>
                  </li>
                  <li className="option">
                    <div className="name">
                      <figure>
                        <img className="img-full" src="/images/lp-video.webp" />
                      </figure>
                      <span>Video Courses</span>
                    </div>
                    <span className="status">{videossec.length} Sessions</span>
                  </li>
                  <li className="option">
                    <div className="name">
                      <figure>
                        <img className="img-full" src="/images/lp-labs.webp" />
                      </figure>
                      <span>Hands-on Labs</span>
                    </div>
                    <span className="status">{labcount} Labs</span>
                  </li>
                </ul>
              </div>
              <div className="price-and-offer">
                <span className="offer">{discountPercentage}% OFF</span>
                <div className="price-block">
                  <del className="old-price">
                    {currency.symbol}
                    {totalDiscountPrice}
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
        <div id="whats-included" className="benifits-block">
          <div className="container">
            <div className="container-left">
              <h2 className="title">Included in this course</h2>
              <div className="tab_wrapper">
                {/* <div className='tab_list'>
								<div>
									<li className={activeTabType === "PT" ? "resp-tab-item hor_1 resp-tab-active" : ""} onClick={(e) => changeCourseLibrary(e, "PT")}>
										<i className="icon icon-font-note2"></i>
										<samp>
											Practice Tests
											<small
												style={{
													fontSize: "70%",
													margin: "3px 0 0 0",
												}}
											>
												{question_count} Practice Tests
											</small>
										</samp>
									</li>
								</div>
								<div>
									<li className={activeTabType === "OC" ? "resp-tab-item hor_1 resp-tab-active" : ""} onClick={(e) => changeCourseLibrary(e, "OC")}>
										<i className="icon icon-font-play"></i>
										<samp>
											Video Course
											<small
												style={{
													fontSize: "70%",
													margin: "3px 0 0 0",
												}}
											>
												{videocount} Videos Available
											</small>
										</samp>
									</li>
								</div>
								<div>
									<li className={activeTabType === "LAB" ? "resp-tab-item hor_1 resp-tab-active" : ""} onClick={(e) => changeCourseLibrary(e, "LAB")}>
										<i className="icon icon-font-play"></i>
										<samp>
											Labs
											<small
												style={{
													fontSize: "70%",
													margin: "3px 0 0 0",
												}}
											>
												{labcount} Labs Available
											</small>
										</samp>
									</li>
								</div>
							</div> */}
                <div className="lp-tab-center">
                  <div className="lp-tabitem">
                    <div
                      className="lp-tab-content"
                      style={activeTabType == "PT" ? { background: "#fff", color: "#F06421" } : {}}
                      onClick={(e) => {
                        changeCourseLibrary(e, "PT");
                      }}
                    >
                      <i className="icon icon-font-note2"></i>
                      <samp style={{ marginLeft: "7px" }}>
                        Practice Tests<br></br>
                      </samp>
                    </div>
                    <div
                      className="lp-tab-content1"
                      style={activeTabType == "OC" ? { background: "#fff", color: "#F06421" } : {}}
                      onClick={(e) => {
                        changeCourseLibrary(e, "OC");
                      }}
                    >
                      <i className="icon icon-font-play"></i>
                      <samp style={{ marginLeft: "7px" }}>
                        Video Course <br></br>
                      </samp>
                    </div>
                    <div
                      className="lp-tab-content2"
                      style={activeTabType == "LAB" ? { background: "#fff", color: "#F06421" } : {}}
                      onClick={(e) => {
                        changeCourseLibrary(e, "LAB");
                      }}
                    >
                      <i className="icon icon-font-play"></i>
                      <samp style={{ marginLeft: "7px" }}>
                        Labs
                        <br></br>
                      </samp>
                    </div>
                  </div>
                </div>

                <div className="resp-accordion resp-tabs-container hor_1 content_wrapper">
                  {activeTabType === "PT" && (
                    <>
                      {/* <Accordion className="accord">
											<AccordionSummary sx={{
												position: "relative",
												display: "flex",
												justifyContent: "space-between",
												background: "#DFE6EF",
												cursor: "pointer"
											}}>Practice Test</AccordionSummary>
											{practicetest.map((item, idx) => {
												if (item.quiz_name) {
													return <>
														<AccordionDetails sx={{ padding: "0", listStyleType: "none" }} >
															<ul style={{ backgroundColor: "#EAEEF4", margin: "0 0 2px 0" }}>

																<li key={idx} style={{
																	content: "none",
																	display: "flex",
																	alignItems: "center",
																	justifyContent: "space-between",
																	listStyle: "none",
																	padding: "10px 15px",
																	margin: "0",
																	lineHeight: "1.2"
																}}>
																	<div style={{
																		display: "flex",
																		alignItems: "flex-start",
																		margin: "0"
																	}}>
																		<i className="icon-font-note2"></i>
																		<span style={{ marginLeft: "8px" }}>{item.quiz_name}</span>
																	</div>
																	<div style={{ display: "flex", alignItems: "center", margin: "0" }}>
																		<div style={{
																			color: "#51596C",
																			width: " 95px",
																			fontSize: "13px",
																			textAlign: "right",
																			margin: "0 0 0 20px"
																		}}>
																			{item.questions_count} questions
																		</div>

																	</div>
																</li>

															</ul>
														</AccordionDetails>
													</>
												}

											})}
										</Accordion> */}
                      {sec.map((item, index) => {
                        if (item.length > 0) {
                          return (
                            <>
                              <Accordion
                                className="accord"
                                defaultExpanded={index == 1 ? true : false}
                              >
                                <AccordionSummary
                                  sx={{
                                    position: "relative",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    background: "#DFE6EF",
                                    cursor: "pointer",
                                  }}
                                >
                                  {index == 1
                                    ? "Practise Test"
                                    : index == 0 && item.length > 0
                                    ? "Free Test"
                                    : "section Test"}
                                </AccordionSummary>
                                {item.map((x, ide) => {
                                  return (
                                    <>
                                      <AccordionDetails
                                        sx={{ padding: "0", listStyleType: "none" }}
                                      >
                                        <ul
                                          style={{
                                            backgroundColor: "#EAEEF4",
                                            margin: "0 0 2px 0",
                                          }}
                                        >
                                          <li
                                            style={{
                                              content: "none",
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "space-between",
                                              listStyle: "none",
                                              padding: "10px 15px",
                                              margin: "0",
                                              lineHeight: "1.2",
                                            }}
                                          >
                                            <div
                                              style={{
                                                display: "flex",
                                                alignItems: "flex-start",
                                                margin: "0",
                                              }}
                                            >
                                              <i className="icon-font-note2"></i>
                                              <span style={{ marginLeft: "8px" }}>
                                                {x.quiz_name}
                                              </span>
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                margin: "0",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  margin: "0",
                                                }}
                                              >
                                                {x.is_free && (
                                                  <a
                                                    className="btn-try"
                                                    href="#"
                                                    onClick={(e) => handlePracticeTest(e, x.id)}
                                                  >
                                                    Try now
                                                  </a>
                                                )}
                                              </div>
                                              <div
                                                style={{
                                                  color: "#51596C",
                                                  width: " 95px",
                                                  fontSize: "13px",
                                                  textAlign: "right",
                                                  margin: "0 0 0 20px",
                                                }}
                                              >
                                                {x.questions_count} questions
                                              </div>
                                            </div>
                                          </li>
                                        </ul>
                                      </AccordionDetails>
                                    </>
                                  );
                                })}
                              </Accordion>
                            </>
                          );
                        }
                      })}
                    </>
                  )}
                  {activeTabType === "LAB" && (
                    <>
                      <Accordion className="accord" defaultExpanded={true}>
                        <AccordionSummary
                          sx={{
                            position: "relative",
                            display: "flex",
                            justifyContent: "space-between",
                            background: "#DFE6EF",
                            cursor: "pointer",
                          }}
                        >
                          LAB
                        </AccordionSummary>
                        {labs.map((item, idx) => {
                          if (item.lab_name) {
                            return (
                              <>
                                <AccordionDetails sx={{ padding: "0" }}>
                                  <ul style={{ backgroundColor: "#EAEEF4", margin: "0 0 2px 0" }}>
                                    <li
                                      key={idx}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        listStyle: "none",
                                        padding: "10px 15px",
                                        margin: "0",
                                        lineHeight: "1.2",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "flex-start",
                                          margin: "0",
                                        }}
                                      >
                                        <i className="icon-font-note2"></i>
                                        <span style={{ marginLeft: "8px" }}>{item.lab_name}</span>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          margin: "0",
                                        }}
                                      >
                                        {/* {item.is_free && (
                                                              <a className="btn-try" href="#" onClick={(e) => handlePracticeTest(e, itm.id)}>
                                                                Try now
                                                              </a>
                                                            )} */}
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            margin: "0",
                                          }}
                                        >
                                          {item.is_free && (
                                            <a
                                              className="btn-try"
                                              href="#"
                                              onClick={(e) => handleLabs(e, item.id)}
                                            >
                                              Try now
                                            </a>
                                          )}
                                        </div>
                                        <div
                                          style={{
                                            color: "#51596C",
                                            width: " 95px",
                                            fontSize: "13px",
                                            textAlign: "right",
                                            margin: "0 0 0 20px",
                                          }}
                                        >
                                          {item.duration_hour}hours {item.duration_minutes}minutes
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </AccordionDetails>
                              </>
                            );
                          }
                        })}
                      </Accordion>
                    </>
                  )}
                  {activeTabType === "OC" && (
                    <>
                      {/* <Accordion className="accord">
											<AccordionSummary sx={{
												position: "relative",
												display: "flex",
												justifyContent: "space-between",
												background: "#DFE6EF",
												cursor: "pointer"
											}}>Online Course</AccordionSummary>
											{onlinecourse.map((item, idx) => {
												if (item.video_name) {
													return <>
														<AccordionDetails sx={{ padding: "0" }}>
															<ul style={{ backgroundColor: "#EAEEF4", margin: "0 0 2px 0" }}>

																<li key={idx} style={{
																	display: "flex",
																	alignItems: "center",
																	justifyContent: "space-between",
																	listStyle: "none",
																	padding: "10px 15px",
																	margin: "0",
																	lineHeight: "1.2"
																}}>
																	<div style={{
																		display: "flex",
																		alignItems: "flex-start",
																		margin: "0"
																	}}>
																		<i className="icon-font-note2"></i>
																		<span style={{ marginLeft: "8px" }}>{item.video_name}</span>
																	</div>
																	<div style={{ display: "flex", alignItems: "center", margin: "0" }}>
																		{/* {item.is_free && (
                                                              <a className="btn-try" href="#" onClick={(e) => handlePracticeTest(e, itm.id)}>
                                                                Try now
                                                              </a>
                                                            )} */}
                      {/* <div style={{
																			color: "#51596C",
																			width: " 95px",
																			fontSize: "13px",
																			textAlign: "right",
																			margin: "0 0 0 20px"
																		}}>{item.time_hour ? item.time_hour + " hours" : ""} {item.time_minute ? item.time_minute + " minutes" : ""} {item.time_second ? item.time_second + " seconds" : ""}</div>
																	</div>
																</li>

															</ul>
														</AccordionDetails>
													</>
												}

											})}
										</Accordion>  */}
                      {videossec.map((item, index) => {
                        return (
                          <>
                            <Accordion
                              className="accord"
                              defaultExpanded={index == 0 ? true : false}
                            >
                              <AccordionSummary
                                sx={{
                                  position: "relative",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  background: "#DFE6EF",
                                  cursor: "pointer",
                                }}
                              >
                                {item[item.length - 1]}
                              </AccordionSummary>
                              {item.map((x, idx) => {
                                if (x.video_name) {
                                  return (
                                    <>
                                      <AccordionDetails sx={{ padding: "0" }}>
                                        <ul
                                          style={{
                                            backgroundColor: "#EAEEF4",
                                            margin: "0 0 2px 0",
                                          }}
                                        >
                                          <li
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "space-between",
                                              listStyle: "none",
                                              padding: "10px 15px",
                                              margin: "0",
                                              lineHeight: "1.2",
                                            }}
                                          >
                                            <div
                                              style={{
                                                display: "flex",
                                                alignItems: "flex-start",
                                                margin: "0",
                                              }}
                                            >
                                              <i className="icon-font-note2"></i>
                                              <span style={{ marginLeft: "8px" }}>
                                                {x.video_name}
                                              </span>
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                margin: "0",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  margin: "0",
                                                }}
                                              >
                                                {x.is_free && (
                                                  <a
                                                    className="btn-try"
                                                    href="#"
                                                    onClick={(e) => handleOnlineCourse(e, x.id)}
                                                  >
                                                    Try now
                                                  </a>
                                                )}
                                              </div>
                                              <div
                                                style={{
                                                  color: "#51596C",
                                                  width: " 95px",
                                                  fontSize: "13px",
                                                  textAlign: "right",
                                                  margin: "0 0 0 20px",
                                                }}
                                              >
                                                {x.time_hour ? x.time_hour + " hours" : ""}{" "}
                                                {x.time_minute ? x.time_minute + " minutes" : ""}{" "}
                                                {x.time_second ? x.time_second + " seconds" : ""}
                                              </div>
                                            </div>
                                          </li>
                                        </ul>
                                      </AccordionDetails>
                                    </>
                                  );
                                }
                              })}
                            </Accordion>
                          </>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- benefits-section --> */}
        <div className="benefits-section">
          <div className="container">
            <div className="caption-block">
              <h2>
                Benefits of Attempting{" "}
                <strong>AWS Certified Solutions Architect Associate Exam</strong>
              </h2>
              <p>
                This AWS Certified Solutions Architect Associate Certification is an opportunity to
                get recognized for your hard-earned AWS skills and also for those who would like to
                upgrade their knowledge on AWS platforms. By learning the exam objectives for the
                AWS CSAA exam, you will be placed in a remarkable position in the journey of your
                AWS career.
              </p>
              <div className="benifits-group">
                <div className="block">
                  <figure>
                    <img className="img-full" src="/images/round-setting.webp" />
                  </figure>
                  <label>
                    Able to design architectures and demonstrate solutions on AWS for real-time
                    business applications.
                  </label>
                </div>
                <div className="block">
                  <figure>
                    <img className="img-full" src="/images/round-bulb.webp" />
                  </figure>
                  <label>
                    Able to work on sophisticated projects at top companies such as Amazon, IBM,
                    Infosys, Wipro, and so on.
                  </label>
                </div>
                <div className="block">
                  <figure>
                    <img className="img-full" src="/images/round-play.webp" />
                  </figure>
                  <label>
                    In demand and future-proof your architect career in the cloud environment.
                  </label>
                </div>
                <div className="block">
                  <figure>
                    <img className="img-full" src="/images/round-doller.webp" />
                  </figure>
                  <label>
                    Getting a higher salary around $153,142 annually on average according to the
                    Global Knowledge survey.
                  </label>
                </div>
              </div>
            </div>
            <figure className="img-block">
              <img className="img-full" src="/images/awscsaben.webp" />
            </figure>
          </div>
        </div>

        {/* <!-- exam-format-block --> */}
        <section className="exam-format-block" id="examformat">
          <div className="container">
            <div className="title">
              <h2>
                <label>Real Exam format</label>
                AWS Certified Solution Architect Associate (SAA-C02)
              </h2>
            </div>
            <div className="exam-box-group">
              <div className="exam-box">
                <figure>
                  <img className="img-full" src="/images/exam-1.webp" />
                </figure>
                <label>Prior Certification</label>
                <span>Not Required</span>
              </div>
              <div className="exam-box">
                <figure>
                  <img className="img-full" src="/images/exam-2.webp" />
                </figure>
                <label>Exam Validity</label>
                <span>3 Years</span>
              </div>
              <div className="exam-box">
                <figure>
                  <img className="img-full" src="/images/exam-3.webp" />
                </figure>
                <label>Exam Fee</label>
                <span>$150 USD</span>
              </div>
              <div className="exam-box">
                <figure>
                  <img className="img-full" src="/images/exam-4.webp" />
                </figure>
                <label>Exam Duration</label>
                <span>130 Minutes</span>
              </div>
              <div className="exam-box">
                <figure>
                  <img className="img-full" src="/images/exam-5.webp" />
                </figure>
                <label>No. of Questions</label>
                <span>60-70</span>
              </div>
              <div className="exam-box">
                <figure>
                  <img className="img-full" src="/images/exam-6.webp" />
                </figure>
                <label>Passing Marks</label>
                <span>70-75%</span>
              </div>
              <div className="exam-box">
                <figure>
                  <img className="img-full" src="/images/exam-7.webp" />
                </figure>
                <label>Recommended Experience</label>
                <span>
                  At least 1 year of hands-on experience desigining secure, high-performing,
                  cost-effective and Scalable Systems on AWS
                </span>
              </div>
              <div className="exam-box">
                <figure>
                  <img className="img-full" src="/images/exam-8.webp" />
                </figure>
                <label>Exam Format</label>
                <span>Multiple choice &amp; Multiple Select</span>
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
                No matter, whatever role you are playing in AWS as an Associate level{" "}
                <strong>
                  this certification can definitely boost your career to an Expert level.
                </strong>
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
              <h2 className="title">Frequently Asked Questions</h2>
              {/* <div id="faq-tab" className="tab_wrapper" style={{ display: "block", width: "100%", margin: "0px" }}>
							<div className="resp-tabs-container hor_1 content_wrapper" style={{ borderColor: "rgba(221, 221, 221, 0.51)" }}>
								<div className="resp-accordion hor_1 resp-tab-active" role="tab" aria-controls="hor_1_tab_item-0" style={{ borderColor: "rgba(221, 221, 221, 0.51)", background: "none" }}><span className="arrow"></span></div><div className="tab_content active resp-tab-content hor_1 resp-tab-content-active" id="exam&amp;products" style={{ display: "block" }}>
									<div className="accordian-block">
										<div className="accordian-list">
											<div className="item">
												<div className="item-head">
													<samp></samp>

													<span>What all is included in the Lifetime Subscription?</span>
												</div>
												<div className="item-content">
													<p>You will get access to the entire Whizlabs platform which includes 250+ Online Courses, Practice Tests, and 400+ Hands-On Labs.</p>
												</div>
											</div>
											<div className="item">
												<div className="item-head">
													<samp></samp>
													<span>Are there any hidden costs involved with this membership plan?</span>
												</div>
												<div className="item-content">
													<p>No. The amount you pay during your purchase is all it takes for you to get access to the entire Whizlabs training library for a lifetime.</p>
												</div>
											</div>
											<div className="item">
												<div className="item-head">
													<samp></samp>
													<span>Will I get access to all future courses and updates?</span>
												</div>
												<div className="item-content">
													<p>Yes, you will be able to access all our future course launches and updates to the existing courses without paying a single extra penny.</p>
												</div>
											</div>
											<div className="item">
												<div className="item-head">
													<samp></samp>
													<span>What is your refund policy in case of lifetime membership?</span>
												</div>
												<div className="item-content">
													<p>There is no pre-requisite for the AWS Certified Alexa Skill Builder - Specialty Certification Exam. You can directly appear for this amazon AWS certification exam.</p>
												</div>
											</div>
											<div className="item">
												<div className="item-head">
													<samp></samp>
													<span>What are the new technologies/disciplines you plan to cover? Can I see your future course roadmap?</span>
												</div>
												<div className="item-content">
													<p>There is no pre-requisite for the AWS Certified Alexa Skill Builder - Specialty Certification Exam. You can directly appear for this amazon AWS certification exam.</p>
												</div>
											</div>
											<div className="item">
												<div className="item-head">
													<samp></samp>
													<span>Do you bind instructors for a period or so?</span>
												</div>
												<div className="item-content">
													<p>There is no pre-requisite for the AWS Certified Alexa Skill Builder - Specialty Certification Exam. You can directly appear for this amazon AWS certification exam.</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div> */}
              {faq.map((item, index) => {
                if (showfullfaq ? true : index < 5) {
                  return (
                    <>
                      <Accordion
                        className="item-head open"
                        sx={{ padding: "24px 0", background: "#fff" }}
                      >
                        <AccordionSummary
                          sx={{ fontSize: "18px", fontWeight: "500", marginLeft: "0" }}
                        >
                          {item.question}
                        </AccordionSummary>
                        <AccordionDetails
                          sx={{ color: "#2E2E2E", fontSize: "14px", marginBottom: "15px" }}
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
            <Slider {...settings}>
              {reviewdata.map((item, idx) => {
                return (
                  <>
                    <div
                      style={{
                        background: "#fff",
                        borderRadius: "8px",
                        padding: "30px",
                        height: "250px",
                        marginLeft: "15px",
                      }}
                    >
                      <h5>{item.title}</h5>
                      <p>{item.text}</p>
                      <div className="user-block">
                        <div className="details">
                          <span>{item.name}</span>
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

        {/* <!-- brands-block --> */}
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

        {/* <!-- course-slider --> */}
        <div className="course-slider">
          <div className="container">
            <div className="heading">
              <h2 className="title">Recommends courses</h2>
              <div className="discount-block">
                <a
                  onClick={(e) => handleoption(e, "librarypage_static")}
                  style={{ cursor: "pointer" }}
                  className="viewallcourse"
                >
                  View All Courses
                </a>
              </div>
            </div>
            <div className=" keen-slider" ref={sliderRef}>
              <div className=" keen-slider__slide">
                <div className="courserc-lp">
                  <div>
                    <img className="img-full-lp" src="/images/awsdep.webp"></img>
                  </div>
                  <div className="course-content-lp">
                    <h6 className="title">Certified Devops Engineer Professional</h6>
                    <div className="level-text-lp-aws">
                      <span>Level: Advanced</span>
                    </div>
                    <p>AWS Certification</p>
                    <div className="stars-group-lp-aws">
                      <figure>
                        <img className="img-full" src="/images/star-on.svg" alt="" />
                      </figure>
                      <figure>
                        <img className="img-full" src="/images/star-on.svg" alt="" />
                      </figure>
                      <figure>
                        <img className="img-full" src="/images/star-on.svg" alt="" />
                      </figure>
                      <figure>
                        <img className="img-full" src="/images/star-on.svg" alt="" />
                      </figure>
                      <figure>
                        <img className="img-full" src="/images/star-half.svg" alt="" />
                      </figure>
                      <samp>4.5</samp>
                    </div>

                    <button
                      className="btn-add-cart-lp-aws"
                      onClick={(e) => handleoption(e, "awsdep")}
                    >
                      More Option
                    </button>
                  </div>
                </div>
              </div>
              <div className=" keen-slider__slide">
                <div className="courserc-lp">
                  <div>
                    <img className="img-full-lp" src="/images/awscsa.webp"></img>
                  </div>
                  <div className="course-content-lp">
                    <h6 className="title">Certified Solution Architect Associate</h6>
                    <div className="level-text-lp-aws">
                      <span>Level: Advanced</span>
                    </div>
                    <p>AWS Certification</p>
                    <div className="stars-group-lp-aws">
                      <figure>
                        <img className="img-full" src="/images/star-on.svg" alt="" />
                      </figure>
                      <figure>
                        <img className="img-full" src="/images/star-on.svg" alt="" />
                      </figure>
                      <figure>
                        <img className="img-full" src="/images/star-on.svg" alt="" />
                      </figure>
                      <figure>
                        <img className="img-full" src="/images/star-on.svg" alt="" />
                      </figure>
                      <figure>
                        <img className="img-full" src="/images/star-half.svg" alt="" />
                      </figure>
                      <samp>4.5</samp>
                    </div>

                    <button
                      className="btn-add-cart-lp-aws"
                      onClick={(e) => handleoption(e, "awscsa")}
                    >
                      More Option
                    </button>
                  </div>
                </div>
              </div>
              <div className=" keen-slider__slide">
                <div className="courserc-lp">
                  <div>
                    <img className="img-full-lp" src="/images/awssap.webp"></img>
                  </div>
                  <div className="course-content-lp">
                    <h6 className="title">Certified Solution Architect Professional</h6>
                    <div className="level-text-lp-aws">
                      <span>Level: Advanced</span>
                    </div>
                    <p>AWS Certification</p>
                    <div className="stars-group-lp-aws">
                      <figure>
                        <img className="img-full" src="/images/star-on.svg" alt="" />
                      </figure>
                      <figure>
                        <img className="img-full" src="/images/star-on.svg" alt="" />
                      </figure>
                      <figure>
                        <img className="img-full" src="/images/star-on.svg" alt="" />
                      </figure>
                      <figure>
                        <img className="img-full" src="/images/star-on.svg" alt="" />
                      </figure>
                      <figure>
                        <img className="img-full" src="/images/star-half.svg" alt="" />
                      </figure>
                      <samp>4.5</samp>
                    </div>

                    <button
                      className="btn-add-cart-lp-aws"
                      onClick={(e) => handleoption(e, "awssap")}
                    >
                      More Option
                    </button>
                  </div>
                </div>
              </div>

              <div className=" keen-slider__slide">
                <div className="courserc-lp">
                  <div>
                    <img className="img-full-lp" src="/images/awscda.webp"></img>
                  </div>
                  <div className="course-content-lp">
                    <h6 className="title">Certified Developer Associate</h6>
                    <div className="level-text-lp-aws">
                      <span>Level: Advanced</span>
                    </div>
                    <p>AWS Certification</p>
                    <div className="stars-group-lp-aws">
                      <figure>
                        <img className="img-full" src="/images/star-on.svg" alt="" />
                      </figure>
                      <figure>
                        <img className="img-full" src="/images/star-on.svg" alt="" />
                      </figure>
                      <figure>
                        <img className="img-full" src="/images/star-on.svg" alt="" />
                      </figure>
                      <figure>
                        <img className="img-full" src="/images/star-on.svg" alt="" />
                      </figure>
                      <figure>
                        <img className="img-full" src="/images/star-half.svg" alt="" />
                      </figure>
                      <samp>4.5</samp>
                    </div>

                    <button
                      className="btn-add-cart-lp-aws"
                      onClick={(e) => handleoption(e, "awscda")}
                    >
                      More Option
                    </button>
                  </div>
                </div>
              </div>
              <div className=" keen-slider__slide">
                <div className="courserc-lp">
                  <div>
                    <img className="img-full-lp" src="/images/awssaa.webp"></img>
                  </div>
                  <div className="course-content-lp">
                    <h6 className="title">Certified Sysops Adminstrate Associate</h6>
                    <div className="level-text-lp-aws">
                      <span>Level: Advanced</span>
                    </div>
                    <p>AWS Certification</p>
                    <div className="stars-group-lp-aws">
                      <figure>
                        <img className="img-full" src="/images/star-on.svg" alt="" />
                      </figure>
                      <figure>
                        <img className="img-full" src="/images/star-on.svg" alt="" />
                      </figure>
                      <figure>
                        <img className="img-full" src="/images/star-on.svg" alt="" />
                      </figure>
                      <figure>
                        <img className="img-full" src="/images/star-on.svg" alt="" />
                      </figure>
                      <figure>
                        <img className="img-full" src="/images/star-half.svg" alt="" />
                      </figure>
                      <samp>4.5</samp>
                    </div>

                    <button
                      className="btn-add-cart-lp-aws"
                      onClick={(e) => handleoption(e, "awssaa")}
                    >
                      More Option
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              {/* <div style={isBreakpoint?{marginLeft:"43.5%",marginTop:"10px"}:{marginLeft:"48%",marginTop:"10px"}}> */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "0 5px",
                  marginTop: "15px",
                }}
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
      </div>
    </>
  );
};
export async function getServerSideProps() {
  const slug = "aws-solutions-architect-associate";
  let ratingDatas = null;
  let videoDatas = null;
  let coursesList = null;
  let courseDatas = null;
  let courseId = null;
  let pqc = null;
  let vc = null;
  let lc = null;
  let practiseques = null;
  let onlinecourse = null;
  let labs = null;
  let review = null;

  const singleCourseResponse = await getSingleCourse(slug);
  if (singleCourseResponse && singleCourseResponse.data && singleCourseResponse.data.data) {
    courseDatas = singleCourseResponse.data.data;
    courseId = singleCourseResponse.data.data.id;
  }
  if (courseDatas && courseDatas.detailedInfo.practisetest_info) {
    practiseques = courseDatas.detailedInfo.practisetest_info;
  }

  if (courseDatas && courseDatas.id) {
    const reviewsResponse = await getReviews(courseDatas.id, 5, 1); // course_id,ratings,current-page
    if (reviewsResponse && reviewsResponse.data && reviewsResponse.data.data) {
      review = reviewsResponse.data;
    }
  }

  return {
    props: {
      courseDatas,
      courseId,
      practiseques,
      review,
    },
  };
}

const mapStateToProps = (state) => {
  return {
    cartData: state.cart.cart,
    userData: state.authData.userData,
    whislist: state.whislist.whislist,
    currencyData: state.ipDetails.currency_detail,
    redirectTo: state.redirectData.redirect_to,
    utmData: state.utmData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCartAction: (id, type) => dispatch(addToCart(id, type)),
    removeFromCartAction: (id, type) => dispatch(removeFromCart(id, type)),
    redirectionAction: (data, url) => dispatch(updateRedirection(data, url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Awscsa);
