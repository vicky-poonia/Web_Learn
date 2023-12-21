import { ContactUsAction, StarRating, Pagination } from "@/components/import";
import moment from "moment";
import { VideoReviewModal } from "@/components/shared/Modals";
import React, { useEffect, useState } from "react";
import FourOhFour from "pages/404";
import {
  getReviews,
  storeComments,
  getAllCoursesList,
  getCourseRatings,
  getVideoRatings,
  getSingleCourse,
} from "@/services/review-services/services";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { alertBox } from "redux/AlertBox/alert-actions";
import UserAvatar from "@/components/plugins/UserAvatar";
import Head from "next/head";
import { LikeDislike } from "@/components/plugins/LikeDislike";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const peoples = [];

const ProductReviews = ({
  ratingDatas,
  videoDatas,
  coursesList,
  courseDatas,
  courseId,
  userData,
  alertBoxAction,
  myname,
  myorg,
  mydes,
  seoHomePageData,
}) => {
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [authUserId, setAuthUserId] = useState(null);
  const [authUserName, setAuthUserName] = useState(null);
  const [authUserEmail, setAuthUserEmail] = useState(null);
  const [activeCommentBox, setactiveCommentBox] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [PaginationData, setPaginationData] = useState({});
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [filter, setFilter] = useState(0);
  const [isBreakpoint, setIsBreakpoint] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [commentFormValues, setCommentFormValues] = useState({
    name: "",
    comment: "",
    email: "",
  });
  const [ratings, setRatings] = useState({
    total_count: 0,
    avg_rating: 0,
    five_star: 0,
    four_star: 0,
    three_star: 0,
    two_star: 0,
    one_star: 0,
  });
  const [activeFilter, setActiveFilter] = useState({
    five: "",
    four: "",
    three: "",
    two: "",
    one: "",
  });

  useEffect(()=>{
    const handleResize = ()=>{
      setIsBreakpoint(window.innerWidth)
    }
    if(window)
    {
      setIsBreakpoint(window.innerWidth)
    }
    window.addEventListener("resize",handleResize)
    return (()=>{
      window.removeEventListener("resize",handleResize)
    })
  },[])

  useEffect(() => {
    if (ratingDatas && ratingDatas.rating > 0) {
      setRatings({
        total_count: ratingDatas.rating,
        avg_rating: ratingDatas.overall_rating,
        five_star: ratingDatas.star_rating.five_star,
        four_star: ratingDatas.star_rating.four_star,
        three_star: ratingDatas.star_rating.three_star,
        two_star: ratingDatas.star_rating.two_star,
        one_star: ratingDatas.star_rating.one_star,
      });
      (async () => {
        await getReviewsData();
      })();
    } else {
      router.push("/" + courseDatas.seo_details.slug + "/reviews/write/");
    }
  }, [ratingDatas, currentPage, filter]);

  useEffect(() => {
    if (userData && userData.data && userData.data.user_id) {
      setAuthUserId(userData.data.user_id);
      setAuthUserName(userData.data.name.first + " " + userData.data.name.last);
      setAuthUserEmail(userData.data.user_email);
      // setDesignation(userData.data.user_designation);
    } else {
      setAuthUserId(null);
      setAuthUserName(null);
      setAuthUserEmail(null);
      // setDesignation(null);
    }
  }, [userData]);

  const toggleCommentBox = (postId) => {
    setCommentFormValues({
      name: "",
      comment: "",
      email: "",
    });
    if (activeCommentBox === postId) {
      setactiveCommentBox(null);
    } else {
      setactiveCommentBox(postId);
    }
  };

  const handleForm = (event) => {
    event.persist();
    setCommentFormValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };
  const changeCourseFilter=(e)=>{
    if (e.value !== "none") {
      if(e.value == "all"){
        router.push('/reviews');
      } else{
        router.push(`/${e.value}`);
      }
    }
  }
  const submitCommentForm = async (event) => {
    event.preventDefault();
    if (activeCommentBox && commentFormValues.comment) {
      const formResult = await storeComments({
        review_id: activeCommentBox,
        product_id: courseId,
        user_id: authUserId,
        response: commentFormValues.comment,
        email: authUserEmail ? authUserEmail : commentFormValues.email,
        name: authUserName ? authUserName : commentFormValues.name,
      });

      if (formResult && formResult.data.status == "1") {
        alertBoxAction({
          type: "SUCCESS",
          title: "Success",
          msg: "Thank you for your comment",
        });
        setCommentFormValues({
          name: "",
          comment: "",
          email: "",
        });
        await getReviewsData();
      } else {
        alertBoxAction({
          type: "ERROR",
          title: "Error",
          msg: "Some Error occured. Please try again.",
        });
      }
    }
  };

  const getReviewsData = async () => {
    const { data: reviewsData } = await getReviews(courseId, filter, currentPage);
    if (reviewsData.data) {
      setReviews(reviewsData.data);
      setPaginationData(reviewsData.pagination || null);
    }
  };

  const handlePaginate = (value) => {
    const selected = parseInt(value.selected) + 1;
    if (selected) {
      setCurrentPage(selected);
    }
  };

  const openVideoModal = (url) => {
    setActiveVideoUrl(url);
  };

  const filterReviews = (e) => {
    const value = e;
    let filterValue = {
      five: "",
      four: "",
      three: "",
      two: "",
      one: "",
    };
    if (value) {
      setCurrentPage(prev => 1)
      setFilter(value);
      if (value == 1) {
        filterValue.one = "active";
      } else if (value == 2) {
        filterValue.two = "active";
      } else if (value == 3) {
        filterValue.three = "active";
      } else if (value == 4) {
        filterValue.four = "active";
      } else if (value == 5) {
        filterValue.five = "active";
      } else {
        setActiveFilter({ five: "", four: "", three: "", two: "", one: "" });
      }
      setActiveFilter(filterValue);
    }
  };

  
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView: isBreakpoint <= 450 ? 1 : 5,
    spacing: 5,
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });

  const total_rating = Math.ceil(ratings?.total_count / 100) * 100;

  if (!courseId) return <FourOhFour />;

  return (
    <>
      <Head>
        <title>{courseDatas.seo_details.title} - Reviews</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
      </Head>
      {/* <ReviewCoursesModal coursesList={coursesList} /> */}
      <VideoReviewModal videoUrl={activeVideoUrl} />
      {/* <!-- banner-part --> */}
      <div className="review-banner">
        <div className="container">
          <div className="left-part">
            {videoDatas.length > 0 ?
              <div className="back-icon-btn-vidact">
              <Link href={"/" + courseDatas.seo_details.slug}>
                <a href="#">
                  <img src="/images/Back-icon.svg" alt="back arrow" />
                  <p>Back to course details</p>
                </a>
              </Link>       
            </div> : 
            <div className="back-icon-btn">
            <Link href={"/" + courseDatas.seo_details.slug}>
              <a href="#">
                <img src="/images/Back-icon.svg" alt="back arrow" />
                <p>Back to course details</p>
              </a>
            </Link>       
          </div>
            }
            
            <h1 className="banner-title">{courseDatas.seo_details.title} - Reviews</h1>
            <h2 className="banner-reviewtitle">
              We have over {ratings?.total_count < 100 ? ratings?.total_count : `${total_rating - 100}+`} reviews for this course
            </h2>
            <h3 className="banner-subtitle">Read the feedbacks from our happy learners</h3>

            <StarRating bigSizeStar={true} isSamp={true} avgRating={ratings.avg_rating} />
            <Link href={"/" + courseDatas.seo_details.slug + "/reviews/write/"}>
              <button className="btn btn-write-review">
                <figure>
                  <img className="img-full" src="/images/review-comment.svg" alt="" />
                </figure>
                <span>Write a Review</span>
              </button>
            </Link>
          </div>
          {videoDatas ? (
            <div className="right-part">
              <div className="img-block" onClick={() => openVideoModal("https://www.youtube.com/embed/epHXT9wFopE")}>
                <img className="img-full" src="/images/overall_thumbail.svg" alt="" />
                <div className="btn-play">
                  <img className="img-full" src="/images/play-btn-big-white.svg" alt="" />
                </div>
                <div className="name-block">
                  <div className="queote-img icon icon-font-quates"></div>
                  <div>
                    <span style={{color: "currentColor"}}>
                      Happy Learners
                      {/* {videoDatas[0]?.first_name} {videoDatas[0]?.last_name} */}
                    </span>
                    {/* <p>Senior Sofrware Engineer</p> */}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* <!-- content area part --> */}
      <div id="content-area" className="bg-color review-page">
        {/* <!-- student-review-block --> */}
        {videoDatas && videoDatas.length > 0 ? (
          <div className="review-block">
            <div className="container">
              <div className="video-review">
                <h2 className="title">Video Reviews</h2>
                <div className={videoDatas.length < 3 ? "keen-slider video-group-length" : "keen-slider video-group"} ref={sliderRef} >
                  {videoDatas.map((item, i) => (
                   <div className="keen-slider__slide"> 
                     <figure onClick={() => openVideoModal(item?.video_url)} key={i}>
                      <div className="btn-play">
                        <img className="img-full" src="/images/play-btn-big-white.svg" alt="" />
                      </div>
                      <img
                        className="img-full"
                        src="/images/thumbnail_video.png"
                        // src={"https://picsum.photos/320/195?random=" + (i + 1)}
                        alt=""
                      />
                      <div className="video-layover">
                        <img
                          src={
                            process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                              item?.profile_image?.replace("media/", "") ||
                            "/images/user-not-found.svg"
                          }
                          // alt={item?.first_name}
                          // title={item?.first_name}
                        />
                        <span style={{color: "currentColor"}}>
                          {item?.first_name} {item?.last_name}
                        </span>
                      </div>
                    </figure>
                   </div>
                  ))}
               </div>
               <div style={{display:"flex"}}>
                <div className="nav-btn" onClick={(e)=>{
                  e.preventDefault()
                  slider.prev()
                }}>Prev</div>
                <div className="nav-btn"  onClick={(e)=>{
                  e.preventDefault()
                  slider.next()
                }}>/ Next</div>
              </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="two-column">
          <div className="container">
            <h2 className="content-title">What our students say about us</h2>
            <div className="section-group">
              {reviews.length > 0 ? (
                <div className="left-section" id="paginationAnchor">
                  <div className="students-review-block">
                    {reviews.map((rev, i) => 
                      {
                        return <>
                          <div className="block" key={i}>
                        <div className="student-img">
                          <UserAvatar
                            img={rev.profile_pic}
                            alt={rev.post_addition?.course?.name}
                            username={rev.post_addition.name ? rev.post_addition.name : rev.user_name}
                          />
                        </div>
                        <div className="review-content" style={{ width: "100%" }}>
                          <div className="name">
                            <div className="name-block">
                            <span>
                              {(rev.post_addition.name? (
                                <span> {rev.post_addition.name}</span>
                              ) : (
                                <span>{rev.user_name}</span>)
                              )}
                            </span>
                            <StarRating
                              isSingle={false}
                              avgRating={rev.post_addition.rating}
                              isSamp={false}
                            />
                            </div>
                            <div className="posted-since">{moment(rev.created_at).fromNow()}</div>
                          </div>
                          <div className="review-profileinfo">
                            {rev.post_addition.occupation ? (
                              <span>
                                {rev.post_addition.occupation}{" "}
                                {rev.post_addition.organization ? (
                                  <span className="profiledesignation">
                                    {" "}
                                    at {rev.post_addition.organization}
                                  </span>
                                ) : (
                                  ""
                                )}{" "}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                          {rev.is_verfied_buyer ? (
                            <div className="verified-buyer">
                              <i className="icon icon-font-verified-buyes"></i>
                              <span>Verified buyer</span>
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="review-post">
                            {/* <div className="review-for">
                              <span>Reviews For</span> {element.product_details.name}
                            </div> */}
                            <p
                              className="link-explain"
                            >
                              {rev.post_question_title}
                            </p>
                            <p>{rev.post_question_text}</p>
                            {/* <div className="post-details">
                              <div className="left">
                                // like dislike component
                                <LikeDislike
                                  likeCount={rev.like_count || 0} // value will be entered from table
                                  dislikeCount={rev.dislike_count || 0} // value will be entereed from table
                                />
                                <div
                                  className="total-comments"
                                  data-rev-id={rev.post_question_id}
                                  onClick={() => toggleCommentBox(rev.post_question_id)}
                                >
                                  {rev.response?.length > 0
                                    ? "Comments(" + rev.response.length + ")"
                                    : "Add Comment"}
                                </div>
                              </div>
                              // <div className="posted-since">
                              //   {moment(rev.created_at).fromNow()}
                              // </div>
                            </div> */}
                          </div>
                          <div
                            className="comment-section"
                            style={{
                              display: activeCommentBox === rev.post_question_id ? "block" : "none",
                            }}
                          >
                            <ul className="all-comments">
                              {rev.response?.length > 0 ? (
                                <>
                                  {rev.response.map((item, resI) => (
                                    <li className="comment" key={resI}>
                                      <p>
                                        <span>By {item.name}</span>
                                        {item.response}
                                      </p>
                                    </li>
                                  ))}
                                </>
                              ) : (
                                ""
                              )}
                            </ul>
                            <div className="add-comment">
                              <div className="title">Add your Comment</div>
                              <form onSubmit={submitCommentForm}>
                                <div className="input-box-group">
                                  <div className="input-box">
                                    <input
                                      type="text"
                                      className="bg-aliceblue"
                                      placeholder="Enter Name"
                                      name="name"
                                      required
                                      disabled={authUserName ? true : false}
                                      value={authUserName ? authUserName : commentFormValues.name}
                                      onChange={(e) => handleForm(e)}
                                    />
                                  </div>
                                  <div className="input-box">
                                    <input
                                      type="email"
                                      className="bg-aliceblue"
                                      placeholder="Enter Email"
                                      name="email"
                                      disabled={authUserEmail ? true : false}
                                      value={
                                        authUserEmail ? authUserEmail : commentFormValues.email
                                      }
                                      onChange={(e) => handleForm(e)}
                                    />
                                  </div>
                                  <div className="textarea-box">
                                    <textarea
                                      className="bg-aliceblue"
                                      placeholder="Enter your comment…"
                                      name="comment"
                                      required
                                      value={commentFormValues.comment}
                                      onChange={(e) => handleForm(e)}
                                    ></textarea>
                                  </div>
                                </div>
                                <button type="submit" className="btn-submit">
                                  submit
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                        </>
                      }
                    )}
                  </div>

                  {/* Pagination */}
                  {PaginationData && PaginationData["currentPage"] && PaginationData["lastPage"] ? (
                    <Pagination
                      handleClick={handlePaginate}
                      currentPage={PaginationData["currentPage"]}
                      totalPages={PaginationData["lastPage"]}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <p>No Records Found</p>
              )}
              <div className="right-section">
                <div className="filterby-block">
                  <div className="head">
                    {/* <div className="title">Filter By</div> */}
                    <div className="title">View review for </div>
                    <div className="selectbox">
                      <Autocomplete
                        sx={{
                          '& input': {
                            border: 'none',
                            borderColor: "inherit !important",
                            boxShadow: "inherit !important"
                          },
                          "& + .MuiAutocomplete-popper .MuiAutocomplete-option:hover": {
                            color:"white",
                            backgroundColor: "#1967d2",
                          },
                          "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']:hover":
                            { color:"white",
                              backgroundColor: "#1967d2",
                            },
                        }}
                        autoComplete={true}
                        disablePortal
                        id="combo-box-demo"
                        clearIcon={true}
                        options={[
                          { value: 'all', label: 'All Courses' },
                          ...coursesList.map((item) => ({
                            value: item.ratings > 0 ? item.seo_details.slug + '/reviews' : item.seo_details.slug + '/reviews/write',
                            label: item.name,
                          })),
                        ]}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} label="Select Course" variant="standard" />}
                        onChange={(e, newValue) => {
                          e.preventDefault();
                          changeCourseFilter(newValue);
                        }}
                        renderOption={(props, option) => (
                          <li
                            {...props}
                            style={{
                              fontSize: "14px",
                              fontWeight: "400",
                              paddingTop: "0",
                              paddingBottom: "0",
                            }}
                          >
                            {option.label}
                          </li>
                        )}
                      />
                    </div>
                  </div>
                  <div className="review-filter">
                    <div className="all-ratings">
                      <div className="total-review">{ratings.total_count} Reviews</div>
                      <StarRating avgRating={ratings.avg_rating} isSamp={true} />
                    </div>
                    <ul>
                      <li
                        onClick={() => filterReviews(5)}
                        className={"five-star" + activeFilter.five}
                      >
                        <span>5 Stars</span>
                        <div className="line">
                          <span
                            className="fill"
                            style={{
                              width:
                              `${ratings.total_count > 0
                                ? ((ratings.five_star / ratings.total_count) * 100)
                                : "0"
                              }%`
                            }}
                          ></span>
                        </div>
                        <small>
                          ({((ratings.five_star / ratings.total_count) * 100).toFixed(2)}
                          %)
                        </small>
                      </li>
                      <li
                        onClick={() => filterReviews(4)}
                        className={"four-star " + activeFilter.four}
                      >
                        <span>4 Stars</span>
                        <div className="line">
                          <span
                            className="fill"
                            style={{
                              width:
                              `${ratings.total_count > 0
                                ? ((ratings.four_star / ratings.total_count) * 100)
                                : "0"
                              }%`
                            }}
                          ></span>
                        </div>
                        <small>
                          ({((ratings.four_star / ratings.total_count) * 100).toFixed(2)}
                          %)
                        </small>
                      </li>
                      <li
                        onClick={() => filterReviews(3)}
                        className={"three-star " + activeFilter.three}
                      >
                        <span>3 Stars</span>
                        <div className="line">
                          <span
                            className="fill"
                            style={{
                              width:
                              `${ratings.total_count > 0
                                ? ((ratings.three_star / ratings.total_count) * 100)
                                : "0"
                              }%`
                            }}
                          ></span>
                        </div>
                        <small>
                          ({((ratings.three_star / ratings.total_count) * 100).toFixed(2)}
                          %)
                        </small>
                      </li>
                      <li
                        onClick={() => filterReviews(2)}
                        className={"two-star " + activeFilter.two}
                      >
                        <span>2 Stars</span>
                        <div className="line">
                          <span
                            className="fill"
                            style={{
                              width:
                              `${ratings.total_count > 0
                                ? ((ratings.two_star / ratings.total_count) * 100)
                                : "0"
                              }%`
                            }}
                          ></span>
                        </div>
                        <small>
                          ({((ratings.two_star / ratings.total_count) * 100).toFixed(2)}
                          %)
                        </small>
                      </li>
                      <li
                        onClick={() => filterReviews(1)}
                        className={"one-star " + activeFilter.one}
                      >
                        <span>1 Star</span>
                        <div className="line">
                          <span
                            className="fill"
                            style={{
                              width:
                              `${ratings.total_count > 0
                                ? ((ratings.one_star / ratings.total_count) * 100)
                                : "0"
                              }%`
                            }}
                          ></span>
                        </div>
                        <small>
                          ({((ratings.one_star / ratings.total_count) * 100).toFixed(2)}
                          %)
                        </small>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />

      <ContactUsAction />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const slug = params.slug;
  let ratingDatas = null;
  let videoDatas = null;
  let coursesList = null;
  let courseDatas = null;
  let courseId = null;

  const singleCourseResponse = await getSingleCourse(slug);
  if (singleCourseResponse && singleCourseResponse.data && singleCourseResponse.data.data) {
    courseDatas = singleCourseResponse.data.data;
    courseId = singleCourseResponse.data.data.id;

    const courseRatingResponse = await getCourseRatings(courseId);
    if (courseRatingResponse && courseRatingResponse.data && courseRatingResponse.data.data) {
      ratingDatas = courseRatingResponse.data.data;
    }
    const videoRatingResponse = await getVideoRatings(courseId);
    if (videoRatingResponse && videoRatingResponse.data && videoRatingResponse.data.data) {
      videoDatas = videoRatingResponse.data.data;
    }
  }

  const courseListResponse = await getAllCoursesList();
  if (courseListResponse && courseListResponse.data && courseListResponse.data.data) {
    coursesList = courseListResponse.data.data;
  }

  const seoHomePageData = {
    seoPageType: "reviewsPage", // This should be changed to reflect the actual page type
    title: "Whizlabs Reviews | AWS, Azure, Google Cloud, DevOps & Cloud Labs / Playground",
    metaTags: [
      {
        name: "facebook-domain-verification",
        property: "",
        content: "twh401qzi7r7o3n227q4sg3hghbpzh",
      },
    ],
  };

  return {
    props: {
      ratingDatas,
      videoDatas,
      coursesList,
      courseDatas,
      courseId,
      seoHomePageData
    },
  };
}

const mapStateToProps = (state) => {
  return {
    userData: state.authData.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    alertBoxAction: (data) => dispatch(alertBox(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductReviews);
