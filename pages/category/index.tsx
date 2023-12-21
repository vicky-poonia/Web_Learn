import { Accordions, CallToAction, StarRating, Pagination } from "@/components/import";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Link from "next/link";
import { PreviewCourseModal } from "@/components/shared/Modals";
import { StoreWhishlist } from "redux/whislist/whislist-actions";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import { convertToTitleCase } from "helpers/CustomHelpers";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { alertBox } from "redux/AlertBox/alert-actions";
import AccordianPricing from "@/components/shared/Accordian-pricingfaq";
import { addToCart } from "redux/AddToCart/cart-actions";

const Categories = ({
  userData,
  addWhislist,
  whislist,
  pageData,
  alertBoxAction,
  currencyData,
  stateCart,
  userSubscriptionData,
  coursesEnrolled,
  seoHomePageData,
}) => {
  const categoryIds = [];
  const categorySelectDropdown = [];
  const pageLimit = 10;
  const router = useRouter();

  const [Courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [CourseType, setCourseType] = useState("all");
  const [PaginationData, setPaginationData] = useState(false);
  const [activeWhislist, setActiveWhislist] = useState(null);
  const [expanded, setExpanded] = useState("panelC0");
  const [currency, setCurrency] = useState(null);
  const [categorySelectVisible, setCategorySelectVisible] = useState(false);
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
  const [counts, setcounts] = useState({
    pt_count: 0,
    ft_count: 0,
    lab_count: 0,
    sandbox_count: 0,
    video_count: 0,
  });
  const [subscribesUser,setSubscribedUser] = useState(false)
  const [courseBought,setCoursesBought] = useState([])
  if (!pageData.parent_id && pageData.children.length > 0) {
    // means this is main category like cloudcomputing
    pageData.children.forEach((item) => {
      if (item.parent_id === pageData.id) {
        categoryIds.push(item.id);
        categorySelectDropdown.push({
          id: item.id,
          name: item.name,
          slug: item.slug,
        });
      }
    });
  } else {
    // this is sub category like aws,microsoft,google
    categoryIds.push(pageData.id);
  }
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
  useEffect(() => {
    if (currencyData) setCurrency(currencyData);
  }, [currencyData]);

  useEffect(() => {
    let getcourseCount = async () => {
      let temp = "[";
      temp += categoryIds + "]";
      let obj = { course_pageid: temp };
      await axios.post(baseUrl + "/categories/counts", obj).then((resp) => {
        setcounts({
          pt_count: resp.data.pt_count,
          ft_count: resp.data.free_test,
          sandbox_count: resp.data.sandbox,
          lab_count: resp.data.lab_count,
          video_count: resp.data.video_count,
        });
      });
    };
    if (pageData) {
      setCourseType("all");
      getcourseCount();
    }
  }, [pageData]);

  useEffect(() => {
    setLoading(true);
    setCourses([]);
    setCurrentPage(1);
    getCourseList(true);
  }, [pageData]);

  useEffect(() => {
    setCourses([]);
    setCurrentPage(1);
    getCourseList(true);
  }, [CourseType]);

  useEffect(() => {
    if (whislist && whislist.length > 0) {
      setActiveWhislist(whislist);
    } else {
      setActiveWhislist(null);
    }
  }, [whislist]);

  const getCourseList = async (isnew = false) => {
    try {
      if (categoryIds && CourseType && currentPage && pageLimit) {
        let responseData = [];
        for (const element of categoryIds) {
          const { data, status, statusText } = await axios.get(baseUrl + "/courses", {
            params: {
              course_page_id: element,
              product_type: CourseType == "all" ? "" : CourseType,
              per_page: categoryIds.length === 1 ? pageLimit : 500,
              page: isnew ? 1 : currentPage,
            },
          });

          if (status === 500) {
            console.error(statusText);
          }
          if (data && data.data && data.data.length > 0) {
            data.data.forEach((el) => {
              responseData.push(el);
            });
            if (categoryIds.length === 1) {
              if (data.pagination.to == data.pagination.total) {
                setPaginationData(false);
              } else {
                setPaginationData(true);
                setCurrentPage(parseInt(data.pagination.currentPage) + 1);
              }
            } else {
              setPaginationData(false);
            }
          } else {
            setPaginationData(false);
          }
        }

        let newCourses = isnew ? [] : [...Courses];
        setCourses([]);
        newCourses.push(...responseData);
        newCourses = newCourses.sort((a, b) => {
          return b.learners_count - a.learners_count;
        });
        newCourses = newCourses.filter(
          (item, index, self) => self.findIndex((t) => t.id === item.id) === index
        );
        setCourses(newCourses);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      return error;
    }
  };

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handlePaginationClick = (e) => {
    e.preventDefault();
    setLoading(true);
    getCourseList();
  };

  const handleCourseType = (e, value) => {
    if (value === CourseType) {
      return;
    }
    e.preventDefault();
    setCourses([]);
    setCurrentPage(1);
    if (CourseType !== value) {
      setLoading(true);
      setCourseType(value);
    }
  };

  const isTypeAvailable = (products, type) => {
    let result = false;
    if (products && products.length > 0) {
      products.map((item) => {
        if (item.product_type === type) {
          result = true;
        }
      });
    }
    return result;
  };
  const openPreviewModal = (datas) => {
    if (datas && datas.seo_details && datas.products && datas.products?.length > 0) {
      const product = datas.products.find(
        (item) => item.product_type === "OC" && item.other_details && item.other_details.video_link
      );
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
          datas.seo_details?.featured_image.replace("media/", ""),
        courseTitle: datas.seo_details?.title,
        courseSlug: datas.seo_details?.slug,
        totaRatingCount: datas.ratings.rating,
        averageRating: datas.ratings.overall_rating,
        courseLevel: datas.other_attributes.course_level,
        courseDescription: datas.description,
        detailedInfo: datas.detailedInfo,
        isPtComingSoon: PTvailable,
        isOcComingSoon: OCvailable,
      });
      document.querySelector("body").classList.add("open-modal-preview-course");
    }
  };

  const checkWhislistStatus = (course_id) => {
    if (whislist.includes(course_id)) {
      return "active";
    } else {
      return "";
    }
  };

  const faqData = pageData.faq.find((item) => item.faq_type === "C");

  const handlecategorySelectDropdownAction = (e) => {
    e.preventDefault();
    router.push(e.target.value);
  };

  const handleWhislist = (e, product_id, user_id) => {
    e.preventDefault();
    addWhislist(product_id, user_id, currency.type);
    alertBoxAction({
      type: "SUCCESS",
      title: "Success",
      msg: "Whislist Updated",
    });
  };
  // code for expired courses move down so i append at the bottom of courses array
  let all_courses = Courses;
  let expired_courses = all_courses?.filter((itm) => itm.is_expired == true);
  expired_courses?.forEach((itm) => {
    all_courses.splice(
      all_courses?.findIndex((x) => x.id == itm.id),
      1
    );
  });
  expired_courses?.sort((a, b) => {
    return new Date(b.course_expired_date).getTime() - new Date(a.course_expired_date).getTime();
  });
  if (expired_courses && expired_courses.length > 0) {
    all_courses.push(...expired_courses);
  }
  // code ends for expired courses
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
  const dispatch = useDispatch();

  const handleCart = (e) => {
    if(subscribesUser || courseBought.includes(e.id)){
      window.open(
        `${process.env.NEXT_PUBLIC_LMS_URL}/course/${e.seo_details?.slug}/${e.id}`
      );
    }else{
      let cartPresent = stateCart.find((itm)=> itm.courseId == e.id)
      if(!cartPresent){
        if(e.seo_details && e.seo_details.is_sandbox == true){
          //if it a sandbox we default add 6 months to it
          dispatch(addToCart(e.id,['sandbox-6'], currency.type.toUpperCase()));
        }else{
          let prods = []
          e.products.forEach((itm)=>{
            if(itm.product_type != 'FT' && itm.is_comingsoon == "0"){
               prods.push(itm.product_type.toLowerCase())
            }
          })
          dispatch(addToCart(e.id,prods, currency.type.toUpperCase()));
        }
      }
    }
  };

  return (
    <>
      {/* <Head>
        <title>{pageData.seo_details?.seo_title}</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />

        <meta name="title" content={pageData.seo_details?.seo_title} />
        <meta name="description" content={pageData.seo_details?.seo_desc} />
        <meta name="keywords" content={pageData.seo_details?.seo_keyword} />
      </Head> */}
      <PreviewCourseModal previewData={previewData} />
      {/* <!-- banner-part --> */}
      <div
        className="category-banner01"
        style={{
          background: "#3D4050 url(/images/new.png) no-repeat right",
        }}
      >
        <div className="container">
          <div className="left-part">
            <ul className="breadcrumbs">
              <li>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a>{pageData.name}</a>
                </Link>
              </li>
            </ul>
            <h1>{pageData.name}</h1>
            <div
              style={{ color: "white" }}
              dangerouslySetInnerHTML={{
                __html:
                  pageData.seo_details?.other_details.attributes.length > 184
                    ? pageData.seo_details?.other_details.attributes.substring(0, 184) + "..."
                    : pageData.seo_details?.other_details.attributes,
              }}
            ></div>
          </div>
          <div className="right-part">
            <img className="img-full" src="/images/become-an-expert.png" alt="" />
          </div>
        </div>
        <div className="overlay"></div>
      </div>

      {/* <!-- content area part -->  */}
      <div id="content-area" className="bg-color category-page">
        <div className="tab-courselisting">
          <div className="container">
            <div className="tab_wrapper">
              <ul className="tab_list" style={{ position: "relative" }}>
                <li
                  onClick={(e) => handleCourseType(e, "all")}
                  className={CourseType == "all" ? "resp-tab-active" : ""}
                >
                  All
                </li>
                {counts.ft_count > 0 && (
                  <li
                    onClick={(e) => handleCourseType(e, "ft")}
                    className={CourseType == "ft" ? "resp-tab-active" : ""}
                  >
                    Free Test
                  </li>
                )}
                {counts.pt_count > 0 && (
                  <li
                    onClick={(e) => handleCourseType(e, "pt")}
                    className={CourseType == "pt" ? "resp-tab-active" : ""}
                  >
                    Practice Test
                  </li>
                )}
                {counts.video_count > 0 && (
                  <li
                    onClick={(e) => handleCourseType(e, "oc")}
                    className={CourseType == "oc" ? "resp-tab-active" : ""}
                  >
                    Video
                  </li>
                )}
                {counts.lab_count > 0 && (
                  <li
                    onClick={(e) => handleCourseType(e, "lab")}
                    className={CourseType == "lab" ? "resp-tab-active" : ""}
                  >
                    Lab
                  </li>
                )}
                {counts.sandbox_count > 0 && (
                  <li
                    onClick={(e) => handleCourseType(e, "sandbox")}
                    className={CourseType == "sandbox" ? "resp-tab-active" : ""}
                  >
                    Sandbox
                  </li>
                )}
                {/* <li
                  onClick={(e) => handleCourseType(e, "lab")}
                  className={CourseType == "lab" ? "resp-tab-active" : ""}
                >
                  Hands-on Lab
                </li> */}
                {categoryIds.length > 1 ? (
                  <div
                    className={
                      categorySelectVisible
                        ? "custom_category_filter active"
                        : "custom_category_filter"
                    }
                  >
                    <select onChange={handlecategorySelectDropdownAction}>
                      <option>Select</option>
                      {categorySelectDropdown.map((el, i) => (
                        <option key={el.id} value={"/" + el.slug}>
                          {el.name}
                        </option>
                      ))}
                    </select>
                    <i
                      className="icon icon-font-equalizer"
                      onClick={() => setCategorySelectVisible(!categorySelectVisible)}
                    ></i>
                  </div>
                ) : (
                  ""
                )}
              </ul>
              <div className="tab_content" style={{ display: "block" }}>
                <div
                  className={loading ? "course-listing loading" : "course-listing"}
                  style={{ position: "relative", minHeight: "250px" }}
                  id="paginationAnchor"
                >
                  {/* SETTING MIN HEIGHT TO 600px TO MATCH LOADING IMG */}
                  {Courses.length > 0 ? (
                    <div className="list-group">
                      {Courses.map((data) => (
                        <div className="list-item" key={data.id}>
                          <div className="couser-img" key={data.id}>
                            {userData && userData.data && userData.data.user_id && (
                              <div
                                className={`icon-whishlist ${checkWhislistStatus(data.id)}`}
                                onClick={(e) => handleWhislist(e, data.id, userData.data.user_id)}
                              >
                                <img
                                  className="img-full whishlist"
                                  src="/images/heart.svg"
                                  alt=""
                                />
                                <img
                                  className="img-full whishlist-fill"
                                  src="/images/heart-border.svg"
                                  alt=""
                                />
                              </div>
                            )}

                            <img
                              className="img-full"
                              src={
                                process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                                data?.seo_details?.featured_image?.replace("media/", "")
                              }
                              alt={data.name}
                              title={data.name}
                            />

                            <div className="course-preview" onClick={() => openPreviewModal(data)}>
                              <figure>
                                {(() => {
                                  let videoData = data.products.find(
                                    (prod) => prod.product_type === "OC"
                                  );
                                  if (
                                    videoData &&
                                    videoData.other_details &&
                                    videoData.other_details.video_link
                                  ) {
                                    return (
                                      <img
                                        className="img-full"
                                        src="/images/play-button.svg"
                                        alt=""
                                      />
                                    );
                                  } else {
                                    return (
                                      <img className="img-full" src="/images/info-btn.svg" alt="" />
                                    );
                                  }
                                })()}
                                {/* <img className="course-img" src="/images/play-button.svg" alt="" /> */}
                              </figure>
                              <span>Preview Course</span>
                            </div>
                          </div>
                          <div className="item-content">
                            <div className="course-details">
                              <Link href={"/" + data.seo_details?.slug}>
                                <h3 className="title">
                                  <a>{data.seo_details?.title}</a>
                                </h3>
                              </Link>
                              {data.is_expired ? (
                                <>
                                  <span className="expired-lable">
                                    Expired on {gettime(data.course_expired_date)}
                                  </span>
                                </>
                              ) : (
                                <></>
                              )}
                              {/* <div className="learners">
                                       { /* {course.other_attributes?.course_level &&
                                          course.other_attributes.course_level.toLowerCase() !==
                                            "select level" && (
                                            <div className="level-text">
                                              <span>
                                              <b> Level:</b>{" "}
                                                {convertToTitleCase(
                                                  course.other_attributes?.course_level
                                                )}
                                              </span>
                                            </div>
                                                )} 

                                        {data.web_counts?.learners_count > 0 && (
                                          <div className="learners">
                                            <i className="icon icon-font-graduation-cap"></i>
                                            <span>
                                              <b>{data.web_counts?.learners_count}</b> Learners
                                            </span>
                                          </div>
                                        )}
                                      </div> */}

                              <div className="description">
                                <p>
                                  {data?.short_info ? (
                                    data?.short_info
                                  ) : (
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          data?.seo_details?.short_description
                                            ?.replace(/<[^>]*>?/gm, "")
                                            .substring(0, 200) + "...",
                                      }}
                                    ></div>
                                  )}
                                </p>
                              </div>

                              <div className="course-highlights">
                                {/* Learners */}
                                {data.web_counts?.learners_count > 0 && (
                                  <div>
                                    <i
                                      className="icon icon-font-graduation-cap"
                                      style={{ fontSize: "20px" }}
                                    ></i>
                                    <span>{data.web_counts?.learners_count} Learners</span>
                                  </div>
                                )}
                                {/* Free Test */}
                                {+data.web_counts?.ft_count > 0 && (
                                  <div>
                                    <i className="icon-font-thumb"></i>
                                    <span>{data.web_counts?.pt_count} Practice Tests</span>
                                  </div>
                                )}
                                {/* No.of Questions */}
                                {+data.web_counts?.ques_count > 0 && (
                                  <div>
                                    <i className="icon-font-note2"></i>
                                    <span>{data.web_counts?.ques_count} Questions</span>
                                  </div>
                                )}
                                {/* No.of Videos */}
                                {+data.web_counts?.vid_count > 0 && (
                                  <div>
                                    <i className="icon-font-play"></i>
                                    <span>{data.web_counts?.vid_count} Videos</span>
                                  </div>
                                )}
                                {/* No.of Labs */}
                                {+data.web_counts?.lab_count > 0 && (
                                  <div>
                                    <i className="icon-font-bicker"></i>
                                    <span>{data.web_counts?.lab_count} labs</span>
                                  </div>
                                )}
                                {/* No.of Flashcards */}
                                {+data.web_counts?.flashcard_count > 0 && (
                                  <div>
                                    <i className="icon-font-flash-card"></i>
                                    <span>{data.web_counts?.flashcard_count} Cards</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="price-review-block-updated">
                              {/* {data.ratings && data.ratings.rating > 0 ? ( */}
                              <div className="rating-block">
                                <StarRating
                                  isSamp={true}
                                  avgRating={data.ratings?.overall_rating}
                                  totalRating={data.ratings?.rating}
                                />
                              </div>
                              {/* ) : (
                                ""
                              )} */}

                              {/* <Link href={"/" + data.seo_details?.slug}> */}
                              <button
                                className="btn btn-add-cart "
                                style={{
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  minWidth:"98px",
                                  backgroundColor:subscribesUser == true? "#F06421":
                                  courseBought.includes(data.id)?"#0C66E4":
                                  stateCart
                                    .map((item) => item.courseId)
                                    .includes(data.id)
                                    ? "#f0642173"
                                    : "#F06421",
                                  fontWeight:subscribesUser || courseBought.includes(data.id)?"500":"",
                                }}
                                onClick={(e) => handleCart(data)}
                              >
                                {subscribesUser || courseBought.includes(data.id) ? (
                                  <>
                                    Access Now
                                  </>
                                ) : (
                                  <>
                                    {stateCart.map((item) => item.courseId).includes(data.id)
                                      ? "Added to Cart"
                                      : "Add to Cart"}
                                    {/* Add to Cart */}
                                  </>
                                )}
                              </button>

                              {/* </Link> */}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      className="no-courses-found"
                      style={{
                        backgroundColor: "#fff",
                        minHeight: "250px",
                        borderRadius: "10px",
                        position: "relative",
                      }}
                    >
                      {!loading && (
                        <p
                          style={{
                            textAlign: "center",
                            padding: "100px",
                            fontSize: "25px",
                            fontWeight: 500,
                            color: "#b1b1b1",
                          }}
                        >
                          {CourseType == "ft"
                            ? "No free test available for this category!"
                            : CourseType == "pt"
                            ? "No practice test available for this category!"
                            : CourseType == "oc"
                            ? "No video course available for this category!"
                            : "No course available for this category!"}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Load More */}
            {PaginationData ? (
              <div className="pagination-block">
                {loading ? (
                  <button
                    style={{
                      color: "#fff",
                      background: "#f0642173",
                      height: "35px",
                      lineHeight: "35px",
                      fontSize: "15px",
                      padding: "0 20px",
                      borderRadius: "30px",
                      boxShadow: "rgb(0 0 0 / 20%) 5px 5px 10px",
                    }}
                  >
                    Loading...
                  </button>
                ) : (
                  <button
                    onClick={(e) => handlePaginationClick(e)}
                    style={{
                      color: "#fff",
                      background: "#F06421",
                      height: "35px",
                      lineHeight: "35px",
                      fontSize: "20px",
                      padding: "0 20px",
                      borderRadius: "30px",
                      boxShadow: "rgb(0 0 0 / 20%) 5px 5px 10px",
                    }}
                  >
                    Load more
                  </button>
                )}
              </div>
            ) : (
              ""
            )}
            <br />
          </div>
        </div>

        <div
          dangerouslySetInnerHTML={{
            __html: pageData.seo_details?.other_details.web_details,
          }}
        ></div>

        <div className="white-box">
          <div
            dangerouslySetInnerHTML={{
              __html: pageData.seo_details?.other_details.description,
            }}
          ></div>
        </div>

        {/* <!-- faq-block --> */}
        {faqData?.faq && (
          <div className="faq-block">
            <div className="container-small">
              <div className="container-left">
                {/* <h3 className="title">Frequently ed Questions</h3> */}
                <div className="tab_content active">
                  <div className="accordian-block">
                    <div className="accordian-list">
                      {/* {faqData?.faq.map((e, i) => (
                        <div className="item">
                          <Accordion
                            TransitionProps={{ unmountOnExit: true }}
                            key={i}
                            expanded={expanded === `panelC` + i}
                            onChange={handleChangeAccordion(`panelC` + i)}>
                            <AccordionSummary className={
                              expanded === `panelC` + i
                                ? "item-head open"
                                : "item-head"
                            }
                            >
                              <>
                                <samp></samp>
                                <span>{e.question}</span>
                              </>
                            </AccordionSummary>
                            <AccordionDetails className="item-content">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: e.answer,
                                }}
                              ></div>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      ))} */}
                      <AccordianPricing data={faqData.faq} panel="panel0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FAQ's Schemas Sections */}
      <div itemScope itemType="https://schema.org/FAQPage" style={{ display: "none" }}>
        {faqData?.faq.map((e, i) => (
          <div
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
            style={{ display: "none" }}
          >
            <h3 itemProp="name">{e.question}</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <div
                itemProp="text"
                dangerouslySetInnerHTML={{
                  __html: e.answer,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <CallToAction />
      {() => setLoading(false)}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.authData.userData,
    whislist: state.whislist.whislist,
    currencyData: state.ipDetails.currency_detail,
    stateCart: state.cart.cart,
    userSubscriptionData:state.userProfileData.userSubscriptionData,
    coursesEnrolled:state.enrolled.enrolled
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addWhislist: (course_id, user_id, currency) =>
      dispatch(StoreWhishlist(course_id, user_id, currency)),
    alertBoxAction: (data) => dispatch(alertBox(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
