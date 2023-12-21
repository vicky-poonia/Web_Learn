import { image } from "html2canvas/dist/types/css/types/image";
import styles from "./CourseIncludes.module.css";
import { useEffect, useState } from "react";
import AccordianCourse from "@/components/shared/AccordianCourse";
import InboxIcon from "@material-ui/icons/Inbox";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import md5 from "md5";
import { updateRedirection } from "redux/Redirection/redirect-actions";
import { connect, useDispatch } from "react-redux";
import { useRouter } from "next/router";

const CourseIncludes = ({ pageContent,currencyData,userData,  redirectionAction,utmData}) => {
  const [activeTabType, setActiveTabType] = useState("OC");
  const [practiceTestData, setPracticeTestData] = useState([]);
  const [videoCourseData, setVideoCourseData] = useState([]);
  const [LABavailabe, setLABavailable] = useState(false);
  const [labInfoData, setLabInfoData] = useState([]);
  const [Sanboxavailable, setsandboxavailble] = useState(false);
  const [expanded, setExpanded] = useState("panel0");
  const [winwidth, setwinwidth] = useState(0);
  const [sale_price,setSaleprice] = useState(0)
  const [regular_price,setRegularPrice] = useState(0)
  const [selectedCourseType,setselectedCourseType] = useState([])
  const [currency, setCurrency] = useState({
    type: "inr",
    symbol: "₹",
  });
  const router = useRouter();
  const path = router.pathname;

  useEffect(() => {
    if (currencyData) {
      setCurrency(currencyData);
    }
  }, [currencyData]);

  useEffect(()=>{
    if(currency.type){
      let sale_price = 0
      let regular_price = 0
      let selectedCourse = []
      pageContent.products?.forEach((itm)=>{
          if(!pageContent.enrolledProductTypes?.includes(itm.product_type)){
            sale_price = sale_price + parseFloat(itm.sale_price[currency.type])
            regular_price = regular_price + parseFloat(itm.regular_price[currency.type])
            selectedCourse.push(itm.product_type.toLowerCase())
          }
      })
      setSaleprice(sale_price)
      setRegularPrice(regular_price)
      setselectedCourseType(selectedCourse)
    }
  },[currency,pageContent,userData])

  useEffect(() => {
    // DETAILED INFO MAPPING START
    // PT
    const ptTree = [];
    let vcCount = 1;
    pageContent?.detailedInfo?.praticetest_info.forEach((item, idx) => {
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
    pageContent?.detailedInfo?.onlinecourse_info.forEach((item, idx) => {
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
    pageContent?.detailedInfo?.lab_info
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
  }, [pageContent]);

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

  const handleSubmit = ()=>{
    if(userData && userData.data){
      const redirectSlug = `/${pageContent.course_slug.slug}/checkout?prod=${selectedCourseType.join(":")}&landing=true&landing_slug=${pageContent.page_slug}`;
      router.push(redirectSlug);
    }else{
      const redirectSlug = `/${pageContent.course_slug.slug}/checkout?prod=${selectedCourseType.join(":")}&landing=true&landing_slug=${pageContent.page_slug}`;
      // console.log(redirectSlug)
      if (!userData || !userData.data || !userData.data.user_id) {
        redirectionAction("REDIRECT", redirectSlug); // after sign in redirect to direct checkout Page
        document.querySelector("body").classList.add("open-modal-login");
      }
    }
  }

  const changeCourseLibrary = (e, type) => {
    e.preventDefault();
    setExpanded("panel0");
    setActiveTabType(type);
  };

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleFreeTest = async (e) => {
    const freeQuizId = pageContent.detailedInfo?.praticetest_info.find(
      (Itm) => Itm.is_free === true
    ).id;

    const freeTestLmsLink = new URL(
      `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageContent.seo_details?.slug}/${pageContent.course_id}/quiz/${freeQuizId}/ft/`
    );
    // console.log(freeTestLmsLink)
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

  const handleOnlineCourse = (e, videoId) => {
    e.preventDefault();
    const VideoURL = `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageContent.seo_data?.slug}/${pageContent.course_id}/video/${videoId}`;
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
      const backLink = `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageContent.seo_data?.slug}/${pageContent.course_id}/lab`;
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

  // console.log(pageContent);
  let test_count = pageContent?.detailedInfo?.praticetest_info?.filter(
    (itm) => itm.quiz_name != null && itm.children?.length == 0
  ).length;
  let video_count = pageContent?.detailedInfo?.onlinecourse_info?.filter(
    (itm) => itm.video_name != null && itm.activity_id == 2
  ).length;
  let lab_count = pageContent?.detailedInfo?.lab_info?.filter((itm) => itm.lab_name != null).length;
  let question_count_data = pageContent?.detailedInfo?.praticetest_info?.filter(
    (itm) => itm.quiz_name != null && itm.children?.length == 0
  );
  let question_count = 0;
  for (let i = 0; i < question_count_data?.length; i++) {
    question_count += question_count_data[i]?.questions_count;
  }
  return (
    <>
      <div className="container">
        <div className={styles.includes_section}>
          <div className={styles.includes_section_left}>
            <div className={styles.includes_course_hl_txt}>Course Highlights</div>
            <div
              className={styles.include_course_hl_des}
              dangerouslySetInnerHTML={{
                __html: pageContent.course_highlights,
              }}
            ></div>
            <div>
              {activeTabType && (
                <div id="whats-included" className="benifits-block">
                  <div className="container">
                    <div className="container-left">
                      <h2 className={`${styles.includes_includes_text} title`}>
                        Included in this course
                      </h2>
                      {winwidth > 640 && (
                        <>
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
                                      {test_count} Practice Tests
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
                                      {video_count} Videos Available
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
                                      {pageContent.webcounts?.lab_count} Labs Available
                                    </small>
                                  </samp>
                                </li>
                              ) : (
                                ""
                              )}
                              {pageContent.detailedInfo?.sandbox_info?.length ? (
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

                              {pageContent.detailedInfo?.lab_info?.length > 0 && (
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

                                      <div className="title">Topic-wise Content Distribution</div>
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
                               (
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
                                            prod.product_type === "SANDBOX"
                                          ) {
                                            return (
                                              <p
                                                dangerouslySetInnerHTML={{
                                                  __html: pageContent?.sandbox_description?.other_details?.short_description,
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
                          {test_count > 0 && (
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
                                      // dangerouslySetInnerHTML={{
                                      //   __html: :,
                                      // }}
                                      />
                                      <div className="accordian-block">
                                        <div className="title">Topic-wise Content Distribution</div>
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
                          {video_count > 0 && (
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
                                      // dangerouslySetInnerHTML={{
                                      //   __html: shortdesoc,
                                      // }}
                                      />
                                      <div className="accordian-block">
                                        <div className="title">Topic-wise Content Distribution</div>
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
                          {lab_count > 0 && (
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
                                        {pageContent.webcounts?.lab_count} Labs Available
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
                                      // dangerouslySetInnerHTML={{
                                      //   __html: shortdeslab,
                                      // }}
                                      />
                                      <div className="accordian-block">
                                        <div className="title">Topic-wise Content Distribution</div>
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

                          {pageContent?.detailedInfo?.sandbox_info[0] ? (
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
                                        prod.product_type === "SANDBOX"
                                      ) {
                                        return (
                                          <p
                                            dangerouslySetInnerHTML={{
                                              __html: pageContent?.sandbox_description?.other_details?.short_description,
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
            </div>
          </div>
          <div className={styles.includes_section_right}>
            <div className={styles.includes_inner_box}>
              {pageContent.products?.map((itm) => {
                let productName = ""
                if(itm.product_type == "PT"){
                  productName = "Practice Test"
                }else if(itm.product_type == "OC") {
                  productName = "Video Course"
                }else if (itm.product_type == "LAB"){
                  productName = "Hands-on Labs"
                }else if(itm.product_type == "SANDBOX") {
                  productName = "Cloud Sandbox"
                }
                return (
                  <>
                    <div className={styles.includes_course_item}>
                      <div className={styles.includes_course_item_inner}>
                        <img className={styles.icons_course_type} src={`/images/${itm.product_type.toLowerCase()}lp.svg`} />
                        <div className={styles.includes_course_type_name}>{productName}<br></br>
                        {
                          pageContent.enrolledProductTypes?.includes(itm.product_type) && <span className={styles.purchased}>You purchased</span>
                        }
                        </div>
                      </div>
                      <div className={styles.price_box_includes}>
                        {
                          pageContent.enrolledProductTypes?.includes(itm.product_type)?<span className={styles.accessnow}onClick={(e) => {
                            e.preventDefault();
                            window.open(
                              `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageContent.seo_data?.slug}/${pageContent.course_id}/${itm.product_type =="SANDBOX"?"sb":itm.product_type.toLowerCase()}`
                            );
                          }}>Access Now</span>:<>
                            <span className={styles.regular_price}>{currency.symbol}{itm.regular_price[`${currency.type}`]}</span>
                           <span className={styles.sale_price}>{currency.symbol}{itm.sale_price[`${currency.type}`]}</span>
                          </>
                        }
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            {
              selectedCourseType.length > 1 && 
              <>
                            <div
              className={styles.includes_course_item}
              style={{ justifyContent: "flex-end", border: "none" }}
            >
              <div className={styles.price_box_includes}>
                <span className={styles.regular_price}>{currency.symbol}{parseFloat(regular_price.toString()).toFixed(2)}</span>
                <span className={styles.sale_price}>{currency.symbol}{parseFloat(sale_price.toString()).toFixed(2)}</span>
              </div>
            </div>
           <div className={styles.buy_now_btn} onClick={(e)=>{
                handleSubmit()
              }}>
                  Buy Now
              </div>
              </>
            }
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
    utmData: state.utmData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    redirectionAction: (data, url) => dispatch(updateRedirection(data, url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseIncludes);

