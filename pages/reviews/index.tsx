import { ContactUsAction, StarRating, Pagination } from "@/components/import";
import { VideoReviewModal, ReviewCoursesModal } from "@/components/shared/Modals";
import React, { useEffect, useRef, useState } from "react";
import {
  getReviews,
  storeComments,
  getAllCoursesList,
  getCourseRatings,
  getVideoRatings,
} from "@/services/review-services/services";
import { connect } from "react-redux";
import moment from "moment";
import { useRouter } from "next/router";
import { alertBox } from "redux/AlertBox/alert-actions";
import UserAvatar from "@/components/plugins/UserAvatar";
import Head from "next/head";
import { LikeDislike } from "@/components/plugins/LikeDislike";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const Reviews = ({ ratingDatas, videoDatas, coursesList, userData, alertBoxAction,seoHomePageData }) => {
  const router = useRouter();
  const courseFilter = useRef(null);
  const [reviews, setReviews] = useState(null);
  const [authUserId, setAuthUserId] = useState(null);
  const [authUserName, setAuthUserName] = useState(null);
  const [authUserEmail, setAuthUserEmail] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isBreakpoint, setIsBreakpoint] = useState(0);
  const [commentFormValues, setCommentFormValues] = useState({
    name: "",
    comment: "",
    email: "",
  });
  const [activeCommentBox, setActiveCommentBox] = useState(null);
  const [ratings, setRatings] = useState({
    total_count: 0,
    avg_rating: 0,
    five_star: 0,
    four_star: 0,
    three_star: 0,
    two_star: 0,
    one_star: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [PaginationData, setPaginationData] = useState({});
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [filter, setFilter] = useState(0);
  const [activeFilter, setActiveFilter] = useState({
    five: "",
    four: "",
    three: "",
    two: "",
    one: "",
  });

  const toggleCommentBox = (postId) => {
    setCommentFormValues({
      name: "",
      comment: "",
      email: "",
    });
    if (activeCommentBox === postId) {
      setActiveCommentBox(null);
    } else {
      setActiveCommentBox(postId);
    }
  };

  const handleForm = (event) => {
    event.persist();
    setCommentFormValues({
      ...commentFormValues,
      [event.target.name]: event.target.value,
    });
  };

  const submitCommentForm = async (event, courseId) => {
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
    const reviewsData = await getReviews(null, filter, currentPage);
    if (reviewsData.data.data) {
      setReviews(reviewsData.data);
    }
  };

  

  const handlePaginate = (value) => {
    const selected = parseInt(value.selected) + 1;
    if (selected) {
      setCurrentPage(selected);
    }
  };

  const openVideoModal = (url) => setActiveVideoUrl(url);

  useEffect(() => {
    filterReviews(filter);
    setCurrentPage(1);
  }, [filter]);
  
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
      }
      setActiveFilter(filterValue);
    }
  };

  const changeCourseFilter = (e) =>{
    if (e.value !== "none") {
      if(e.value == "all"){
        router.push('/reviews');
      } else{
        router.push(`/${e.value}`);
      }
    }
  };

  useEffect(() => {
    if (ratingDatas) {
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
        const reviewsData = await getReviews(null, filter, currentPage); // course id, ratings, current page
        if (reviewsData.data.data) {
          setReviews(reviewsData.data || null);
          setPaginationData(reviewsData.data.pagination || null);
        }
      })();
    }
  }, [ratingDatas, currentPage, filter]);

  useEffect(() => {
    if (userData && userData.data && userData.data.user_id) {
      setAuthUserId(userData.data.user_id);
      setAuthUserName(userData.data.name.first + " " + userData.data.name.last);
      setAuthUserEmail(userData.data.user_email);
    } else {
      setAuthUserId(null);
      setAuthUserName(null);
      setAuthUserEmail(null);
    }
  }, [userData]);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView: isBreakpoint <= 450 ? 1 : 5,
    spacing: 5,
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
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
  // console.log("course Filter",coursesList)

  const total_rating = Math.ceil(ratings?.total_count/100)*100;

  const openModal = () => {
    document.querySelector("body").classList.add("open-modal-select-course");
};

  return (
    <>
      {/* <Head>
        <title>Whizlabs Reviews | AWS, Azure, Google Cloud, DevOps &amp; Cloud Labs / Playground</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />

        <meta
          name="description"
          content="We've helped 5M+ professionals to become certified and succeed in their career. Check what our customers say about our products."
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Whizlabs Reviews" />
        <meta
          property="og:description"
          content="We've helped 5M+ professionals to become certified and succeed in their career. Check what our customers say about our products."
        />
        <meta property="og:url" content="https://www.whizlabs.com/reviews/" />
        <meta property="og:site_name" content="Whizlabs" />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60aca935bd9fd"}
        />
        <meta property="fb:app_id" content="502194103558420" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="We've helped 5M+ professionals to become certified and succeed in their career. Check what our customers say about our products."
        />
        <meta name="twitter:title" content="Whizlabs Reviews" />
        <meta name="twitter:site" content="@whizlabs" />
        <meta
          name="twitter:image"
          content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60aca935bda41"}
        />
        <meta name="twitter:creator" content="@whizlabs" />
      </Head> */}
      {/* <script type="application/ld+json">
        {
          JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AggregateRating",
            "itemReviewed": {
              "@type": "Product",
              "name":"whizlabs",
              "image":"https://www.whizlabs.com/images/logo.svg",
              "offers": {
                "@type": "Offer",
                "priceCurrency":"USD",
                "price":"19",
                "availability": "https://schema.org/OnlineOnly"
              }
            },
            "ratingValue": ratings.avg_rating.toFixed(1),
            "reviewCount": ratings.total_count,
            "bestRating":5,
            "worstRating":1
          })
        }
      </script> */}
      <script type="application/ld+json">
        {
          JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: "Reviews",
            image: "https://www.whizlabs.com/logo.png",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: ratings.avg_rating.toFixed(1),
              bestRating: "5",
              worstRating: "1",
              ratingCount: ratings.total_count
            }
          })
        }
      </script>
      
      <ReviewCoursesModal coursesList={coursesList} />

      <VideoReviewModal videoUrl={activeVideoUrl} />

      {/* <!-- banner-part --> */}
      <div className="review-banner">
        <div className="container">
          <div className="left-part">
            {/* <div className="back-icon-btn">
              <a href="#">
                <img src="/images/Back-icon.svg" alt="back arrow" />
                <h5>Back</h5>
              </a>
            </div> */}
            <h1 className="banner-title">
              We have over {total_rating - 100}+ happy learners reviews
            </h1>
            <p className="banner-subtitle">Explore the feedback from lots of happy learners</p>

            <StarRating bigSizeStar={true} isSamp={true} avgRating={ratings.avg_rating} />

            <button className="btn btn-write-review" onClick={() => openModal()}>
              <figure>
                <img className="img-full" src="/images/review-comment.svg" alt="" />
              </figure>
              <span>Write a Review</span>
            </button>
          </div>
          {videoDatas && (
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
          )}
        </div>
      </div>

      {/* <!-- content area part --> */}
      <div id="content-area" className="bg-color review-page">
        {/* <!-- student-review-block --> */}
        {videoDatas && (
          <div className="review-block">
            <div className="container">
              <div className="video-review" >
                <h2 className="title">Video Reviews</h2>
                <div className=" keen-slider video-group" ref={sliderRef} >
                {videoDatas?.map((item, i) => (
                   <div className=" keen-slider__slide">
                    <figure key={i} onClick={() => openVideoModal(item?.video_url)}>
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
                          alt=""
                        />
                        <span style={{color: "currentColor"}}>
                          {item?.first_name} {item?.last_name}
                        </span>
                      </div>
                    </figure>
                    </div>
                  ))}
                </div>
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
        )}

        <div className="two-column">
          <div className="container">
            <h2 className="content-title">What our students say about us</h2>
            <div className="section-group">
              {reviews && reviews.data && (
                <div className="left-section" id="paginationAnchor">
                  <div className="students-review-block">
                    {reviews?.data?.map((rev, i) => 
                      {
                        return <>
                          <div key={i} className="block">
                        <UserAvatar
                          img={rev.profile_pic}
                          alt={rev.post_addition?.course?.name}
                          username={rev.post_addition.name ? rev.post_addition.name : rev.user_name}
                        />
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
                            {(rev.post_addition.occupation ? (
                              <span>{rev.post_addition.occupation} {(rev.post_addition.organization) ? (
                                <span className="profiledesignation"> at {rev.post_addition.organization}</span>
                              ) : (
                                ""
                              )
                              } </span>
                            ) : (
                              ""
                            )
                            )}
                          </div>
                          {/* <div className="review-date-sec review-adj">{c_date.date <10?<>{`0${c_date.date}`}</>:c_date.date}-{c_date.month}-{c_date.year}</div> */}
                          {rev.is_verfied_buyer ? (
                            <>
                              <div className="verified-buyer">
                                <i className="icon icon-font-verified-buyes"></i>
                                <span>Verified buyer</span>
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                          <div className="review-post">
                            <div className="review-for">
                              <span>Reviews For</span> {rev?.post_addition?.course?.name}
                            </div>
                            <p className="link-explain">
                              {rev?.post_question_title}
                            </p>
                            <p>{rev.post_question_text}</p>
                            {/* <div className="post-details">
                              <div className="left">
                                <LikeDislike
                                  likeCount={rev.like_count || 0} // value will be entered from table
                                  dislikeCount={rev.dislike_count || 0} // value will be entereed from table
                                />
                                <div
                                  className="total-comments"
                                  onClick={() => toggleCommentBox(rev.post_question_id)}
                                >
                                  {rev?.response?.length > 0
                                    ? "Comments(" + rev?.response?.length + ")"
                                    : "Add Comment"}
                                </div>
                              </div>
                            </div> */}
                          </div>
                          <div
                            className="comment-section"
                            style={{
                              display: activeCommentBox === rev.post_question_id ? "block" : "none",
                            }}
                          >
                            <ul className="all-comments">
                              {rev?.response?.length > 0 ? (
                                <>
                                  {rev?.response?.map((item, ei) => (
                                    <React.Fragment key={ei}>
                                      <li className="comment">
                                        <p>
                                          <span>By {item.name}</span>
                                          {item.response}
                                        </p>
                                      </li>
                                    </React.Fragment>
                                  ))}
                                </>
                              ) : (
                                ""
                              )}
                            </ul>
                            <div className="add-comment">
                              <div className="title">Add your Comment</div>
                              <form
                                onSubmit={(e) =>
                                  submitCommentForm(e, rev?.post_addition?.product_id)
                                }
                              >
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
                    ""
                  )}
                </div>
              )}
              <div className="right-section">
                <div className="filterby-block">
                  <div className="head">
                    <div className="title">View review for</div>
                    <div className="selectbox">
                      {/* <select style={{fontSize:"0.7rem",maxWidth:"310px",wordWrap:"break-word",padding:"10px"}} onChange={(e)=>{
                        e.preventDefault()
                        changeCourseFilter(e)
                      }}>
                        <option value={"none"} style={{width:"310px"}}>All Courses</option>
                        {coursesList.map((itm)=>{
                          return <option  style={{width:"310px"}} value ={itm.ratings > 0
                          ? itm.seo_details.slug + "/reviews"
                          : itm.seo_details.slug + "/reviews/write"
                      }>{itm.name}</option>
                        })}
                      </select> */}
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
                          { value: "none", label: 'All Courses' },
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
                        className={"five-star " + activeFilter.five}
                      >
                        <span>5 Stars</span>
                        <div className="line">
                          <span
                            className="fill"
                            style={{
                              width: `${ratings.total_count > 0
                                  ? ((ratings.five_star / ratings.total_count) * 100)
                                  : "0"
                                }%`,
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
                              width: `${ratings.total_count > 0
                                  ? ((ratings.four_star / ratings.total_count) * 100)
                                  : "0"
                                }%`,
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
                              width: `${ratings.total_count > 0
                                  ? ((ratings.three_star / ratings.total_count *100))
                                  : "0"
                                }%`,
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
                              width: `${ratings.total_count > 0
                                  ? ((ratings.two_star / ratings.total_count) * 100)
                                  : "0"
                                }%`,
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
                              width: `${ratings.total_count > 0
                                  ? ((ratings.one_star / ratings.total_count) * 100)
                                  : "0"
                                }%`,
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

export async function getStaticProps({ params }) {
  let ratingDatas = null;
  let videoDatas = null;
  let coursesList = [];
  let course_id = null;

  const courseListResponse = await getAllCoursesList();
  if (courseListResponse && courseListResponse.data && courseListResponse.data.data) {
    coursesList = courseListResponse.data.data;
  }
  const courseRatingResponse = await getCourseRatings(course_id);
  if (courseRatingResponse && courseRatingResponse.data && courseRatingResponse.data.data) {
    ratingDatas = courseRatingResponse.data.data;
  }
  const videoRatingResponse = await getVideoRatings(course_id);
  if (videoRatingResponse && videoRatingResponse.data && videoRatingResponse.data.data) {
    videoDatas = videoRatingResponse.data.data;
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
      {
        name: "description",
        property: "",
        content:
          "We've helped 5M+ professionals to become certified and succeed in their career. Check what our customers say about our products.",
      },
      { name: "", property: "og:locale", content: "en_US" },
      { name: "", property: "og:type", content: "website" },
      { name: "", property: "og:title", content: "Whizlabs Reviews" },
      {
        name: "",
        property: "og:description",
        content:
          "We've helped 5M+ professionals to become certified and succeed in their career. Check what our customers say about our products.",
      },
      { name: "", property: "og:url", content: "https://www.whizlabs.com/reviews/" },
      { name: "", property: "og:site_name", content: "Whizlabs" },
      {
        name: "",
        property: "og:image",
        content:
          process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60aca935bd9fd",
      },
      { name: "", property: "fb:app_id", content: "502194103558420" },
      { name: "", property: "og:image:width", content: "500" },
      { name: "", property: "og:image:height", content: "500" },
      { name: "twitter:card", property: "", content: "summary" },
      {
        name: "twitter:description",
        property: "",
        content:
          "We've helped 5M+ professionals to become certified and succeed in their career. Check what our customers say about our products.",
      },
      { name: "twitter:title", property: "", content: "Whizlabs Reviews" },
      { name: "twitter:site", property: "", content: "@whizlabs" },
      {
        name: "twitter:image",
        content:
          process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60aca935bda41",
      },
      { name: "twitter:creator", property: "", content: "@whizlabs" },
    ],
  };
  
  

  return {
    props: {
      ratingDatas,
      videoDatas,
      coursesList,
      seoHomePageData,
    },
    revalidate: 10
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

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
