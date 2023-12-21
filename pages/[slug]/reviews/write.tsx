import { StarRating, StarRatingInput } from "@/components/import";
import Slider from "react-slick";
import { useForm } from "react-hook-form";
import Recaptcha from "react-recaptcha";
import { useEffect, useRef, useState } from "react";
import FourOhFour from "pages/404";
import {
  getCourseRatings,
  getSingleCourse,
  getReviews,
  storeReviews,
  getReviewById,
} from "@/services/review-services/services";
import { connect } from "react-redux";
import Link from "next/link";
import React from "react";
import { alertBox } from "redux/AlertBox/alert-actions";
import Head from "next/head";
import { loadScript } from "helpers/customHooks";
import UserAvatar from "../../../components/plugins/UserAvatar";
import { useRouter } from 'next/router';

const JS_SCRIPT = "https://www.google.com/recaptcha/api.js";

const WriteReview = ({
  ratingDatas,
  courseDatas,
  reviewsDatas,
  userData,
  alertBoxAction,
  myname,
  mydes,
  myorg,
  seoHomePageData,
}) => {
  const [starRatingInput, setStartRatingInput] = useState(null);
  const recaptcha = useRef(null);
  const [Formerrors, setFormErrors] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, errors,clearErrors } = useForm();
  const [authUserId, setAuthUserId] = useState("");
  const [authUserName, setAuthUserName] = useState("");
  const [authUserEmail, setAuthUserEmail] = useState("");
  const [recaptchaVerified, SetRecaptchaVerified] = useState(false);
  const [recommendEmailProduct, setRecommendEmailProduct] = useState(1);
  const [recommendEmail, setRecommendEmail] = useState([""]);
  const [reviewHead, setReviewHead] = useState(null);
  const [reviewDesc, setReviewDesc] = useState(null);
  const [questionId, setquestionId] = useState(null);
  const [additionalId, setAdditionalId] = useState(null);
  const router = useRouter();

  const userLog = () => {
    if (!userData) {
    document.querySelector("body").classList.add("open-modal-login");
    }
  };

  const slickOptions = {
    dots: false,
    vertical: true,
    arrows:false,
    centerMode: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 12000,
    cssEase: "linear",
  };

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const res = await getReviewById(courseDatas.id, userData);
        setReviewHead(res.data.data[0].post_question_title);
        setReviewDesc(res.data.data[0].post_question_text);
        setquestionId(res.data.data[0].post_question_id);
        setAdditionalId(res.data.data[0].post_addition[0].post_review_additionals_id)
        setStartRatingInput(res.data.data[0].post_addition[0].rating)
      } catch (error) {
        console.log(error)
      }
    };
  
    const resp = fetchData();
  }, [userData])

  useEffect(() => {
    loadScript(JS_SCRIPT);
  }, []);

  useEffect(() => {
    if (userData && userData.data && userData.data.user_id) {
      setAuthUserId(userData.data.user_id);
      setAuthUserName(userData.data.name.first + " " + userData.data.name.last);
      setAuthUserEmail(userData.data.user_email);
    } else {
      setAuthUserId("");
      setAuthUserName("");
      setAuthUserEmail("");
    }
  }, [userData]);

  const recaptchaLoader = () => {};
  const verifyCallback = (response) => {
    if (response) SetRecaptchaVerified(true);
  };

  const changeRecommendProduct = (index) => {
    setRecommendEmailProduct(index);
    if (index == 0) {
      setRecommendEmail([""]);
    }
  };

  const addEmail = () => {
    setRecommendEmail([...recommendEmail, ""]);
  };

  const removeEmail = (index) => {
    const list = [...recommendEmail];
    list.splice(index, 1);
    setRecommendEmail(list);
  };

  const changeRecomEmail = (event, index) => {
    const value = event.target.value;
    const list = [...recommendEmail];
    list[index] = value;
    setRecommendEmail(list);
  };

  const onSubmit = async (data, e) => {
    setLoading(true);
    setSuccessMsg(null);
    let errorMsg = [];
    setFormErrors([]);
    // if (data.review == reviewDesc && reviewHead == data.subject) {
    //   errorMsg.push("Nothing to update!");
    //   setFormErrors(errorMsg);
    //   setLoading(false);
    // }
    if (!starRatingInput) {
      errorMsg.push("Please fill ratings");
      setFormErrors(errorMsg);
      setLoading(false);
    }
    if (!recaptchaVerified) {
      errorMsg.push("Please fill captcha field");
      setFormErrors(errorMsg);
      setLoading(false);
    }
    if (starRatingInput && recaptchaVerified && courseDatas && courseDatas.id && data.review) {
      if (recaptchaVerified) {
        const formResponse = await storeReviews({
          additionalId: additionalId,
          questionId: questionId,
          product_id: courseDatas.id,
          user_id: authUserId ? authUserId : null,
          name: data.name,
          email: data.email,
          rating: starRatingInput,
          reviews: data.review,
          certificate_image: null,
          suggestion: data.suggestion,
          subject: data.subject,
          occupation: mydes,
          organization: myorg,
          recommend_product: recommendEmailProduct,
          rec_email_address: recommendEmail,
        });
      
        if (formResponse && formResponse.data.status == "1") {
          e.target.reset(); // reset form inputs
          recaptcha.current.reset(); // reset captcha
          setStartRatingInput(null); // reset start ratings
          setLoading(false);
          if(userData)
          {
            setAuthUserName(userData.data.name.first + " " + userData.data.name.last);
            setAuthUserEmail(userData.data.user_email);
          }
          SetRecaptchaVerified(false);
          setRecommendEmailProduct(1);
          setRecommendEmail([""]);
          alertBoxAction({
            type: "SUCCESS",
            title: "Success",
            msg: formResponse.data.msg,
          });
         clearErrors();
         router.push(`/${courseDatas.seo_details.slug}/reviews`);
        } else {
          setLoading(false);
        }
      }
    }
  };

  return !courseDatas || !courseDatas.id ? (
    <FourOhFour />
  ) : (
    <>
      {/* <Head>
        <title>Write review for {courseDatas.seo_details.seo_title}</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
      </Head> */}
      <div id="content-area" className="write-review-page">
        <div className="two-columns">
          <div className="container">
            <div className="left-column">
              <div className="course-reviews">
                <figure className="course-img">
                  <img
                    className="img-full"
                    src={
                      process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                      courseDatas.seo_details.featured_image.replace("media/", "")
                    }
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "/images/no-image.png";
                    }}
                    alt={courseDatas.seo_details.title}
                    title={courseDatas.seo_details.title}
                  />
                </figure>
                <div className="content">
                  <div className="title">
                    {ratingDatas.rating > 0
                      ? `We have ${ratingDatas.rating} Happy Reviews`
                      : `No reviews found. Be the first one.`}
                  </div>
                  <p>For {courseDatas.seo_details.title}</p>

                  {ratingDatas.rating > 0 ? (
                    <StarRating
                      bigSizeStar={true}
                      isSamp={true}
                      avgRating={ratingDatas.overall_rating}
                    />
                  ) : (
                    ``
                  )}
                  <Link href={"/" + courseDatas.seo_details.slug + "/reviews"}>
                    <a>View All Reviews</a>
                  </Link>
                </div>
              </div>
              {userData ? (<>
              <div className="white-box">
                <div className="box-title">Write your Review Tell us what you think!</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <StarRatingInput
                    starRatingInput={starRatingInput}
                    setStartRatingInput={setStartRatingInput}
                  />
                  <div className="input-box-group">
                    <div className="input-box">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        ref={register({ required: true})}
                        disabled={userData && userData.data ? true : false}
                        defaultValue={userData?userData.data.name.first + " " + userData.data.name.last:""}
                        placeholder="John Doe"
                      />
                      {errors.name && errors.name.type === "required" && (
                        <span style={{ color: "red" }}>This field is required</span>
                      )}
                    </div>
                    <div className="input-box">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        defaultValue={userData?userData.data.user_email:""}
                        ref={register({
                          required: true,
                          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        })}
                        disabled={userData && userData.data ? true : false}
                        placeholder="john@doe.com"
                      />
                      {errors.email && errors.email.type === "required" && (
                        <span style={{ color: "red" }}>This field is required</span>
                      )}
                      {errors.email && errors.email.type === "pattern" && (
                        <span style={{ color: "red" }}>Please enter valid email.</span>
                      )}
                    </div>
                    <div className="input-box full">
                      <label>Review Headline <span style={{ color: "red" }}>*</span></label>
                      <input
                        type="text"
                        name="subject"
                        disabled={reviewHead ? true : false}
                        ref={register({ required: true })}
                        placeholder="Awesome Product"
                        defaultValue={reviewHead}
                      />
                      {errors.subject && errors.subject.type === "required" && (
                        <span style={{ color: "red" }}>This field is required</span>
                      )}
                    </div>
                    <div className="textarea-box">
                      <label>Please write your feedback about this course <span style={{ color: "red" }}>*</span></label>
                      <textarea
                        name="review"
                        disabled={reviewHead ? true : false}
                        ref={register({ required: true })}
                        placeholder="I think..."
                        defaultValue={reviewDesc}
                      ></textarea>
                      {errors.review && errors.review.type === "required" && (
                        <span style={{ color: "red" }}>This field is required</span>
                      )}
                    </div>
                    <div className="textarea-box">
                      <label>Suggestion for improvements</label>
                      <textarea
                        disabled={reviewHead ? true : false}
                        name="suggestion"
                        ref={register({ required: false })}
                        placeholder="It's better if..."
                      ></textarea>
                      {errors.suggestion && errors.suggestion.type === "required" && (
                        <span style={{ color: "red" }}>This field is required</span>
                      )}
                    </div>
                    <div className="textarea-box">
                      <label>Do you recommend this product?</label>
                      <input
                        type="radio"
                        disabled={reviewHead ? true : false}
                        name="recommend_product"
                        value="1"
                        onChange={(e) => changeRecommendProduct(1)}
                        defaultChecked={true}
                      />{" "}
                      Yes
                      <input
                        type="radio"
                        disabled={reviewHead ? true : false}
                        name="recommend_product"
                        value="0"
                        onChange={(e) => changeRecommendProduct(0)}
                        defaultChecked={false}
                      />{" "}
                      No
                    </div>
                    {recommendEmailProduct == 1 ? (
                      <>
                        <div className="textarea-box">
                          <label>Recommend your friend (optional)</label>
                          {recommendEmail.map((x, i) => (
                            <>
                              <input
                                type="email"
                                value={x}
                                disabled={reviewHead ? true : false}
                                name="rec_email_address"
                                placeholder="Enter email"
                                onChange={(event) => changeRecomEmail(event, i)}
                              />
                              <div style={{ padding: "10px 0px 10px 0px" }}>
                                {recommendEmail.length - 1 === i && (
                                  <a
                                    style={{
                                      cursor: "pointer",
                                      textDecoration: "none",
                                      fontWeight: 400,
                                      paddingRight: "20px",
                                    }}
                                    onClick={() => addEmail()}
                                  >
                                    + Add
                                  </a>
                                )}

                                {recommendEmail.length !== 1 && (
                                  <a
                                    style={{
                                      cursor: "pointer",
                                      textDecoration: "none",
                                      fontWeight: 400,
                                    }}
                                    onClick={() => removeEmail(i)}
                                  >
                                    - Remove
                                  </a>
                                )}
                              </div>
                            </>
                          ))}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  {/* <div className="upload-block">
                    <label>Upload your Certification</label>
                    <div className="drag-form">
                      <div className="dropzone-desc">
                        <i className="icon icon-font-upload"></i>
                        <span>Drag and Drop your Certification file here</span>
                      </div>
                      <input
                        type="file"
                        id="dropzone"
                        className="dropzone"
                        name="file"
                        ref={register()}
                      />
                    </div>
                    <div className="min-requirement">
                      <div className="file-name">
                        <span></span>
                        <i className="icon icon-font-cross"></i>
                      </div>
                      <div className="max-size">
                        Only jpg, jpeg or png with max file size of{" "}
                        <strong>1MB</strong>
                      </div>
                    </div>
                  </div> */}
                  {reviewHead == null ? (
                  <div className="captcha-img captcha-img-review">
                    <Recaptcha
                      ref={recaptcha}
                      sitekey="6LeuGo4UAAAAAIZ6-Na4KHV_sIEJNjt-XlRO-Jgk"
                      render="explicit"
                      verifyCallback={verifyCallback}
                      onloadCallback={recaptchaLoader}
                      theme="light"
                    />
                  </div>):(null)}
                  <div className="btn-submit">
                    {loading ? (
                      <>
                        <button type="button" disabled className="btn">
                          Loading......
                        </button>
                      </>
                    ) : (
                      <>{
                      reviewHead == null ? (
                        <button type="submit" className="btn">
                          Submit Review
                        </button> ) : (
                          <button disabled className="btn">
                            Review already submitted
                        </button>
                        )}
                      </>
                    )}
                  </div>
                  <ul>
                    {Formerrors.map((item, i) => (
                      <li key={i} style={{ color: "red", textAlign: "center" }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </form>
                </div>
                </>
                ):(
                <span className="white-box" style={{ display:"flex", justifyContent:"center" }}>
                  <button style={{ background: "#F06421" }} className="btn" onClick={userLog}>
                    Sign in to Submit Review
                  </button>
                </span>
              )}
            </div>
            {reviewsDatas && (
              <div className="right-column">
                <div className="title">
                  <figure>
                    <img className="img-full" src="/images/reviewer-thumb.svg" alt="" />
                  </figure>
                  <span>
                    <strong>98% of reviewers</strong> recommends us
                  </span>
                </div>

                <div className="reviewer-slider">
                  <Slider {...slickOptions}>
                    {reviewsDatas[0]?.map((item, i) => (
                      <div key={i} style={{ marginBottom: "1em" }}>
                        <div className="block">
                          <figure>
                            <img className="img-full" src="/images/quote-img.svg" alt="" />
                          </figure>
                          <div className="content">
                            <div className="block-title">{item.post_question_title}</div>
                            <p>{item.post_question_text}</p>
                            <div className="user-block">
                              <figure>
                                {/* <img
                                  src={
                                    item.profile_pic != null
                                      ? process.env.NEXT_PUBLIC_LEARN_MEDIA_URL + item.profile_pic
                                      : `https://ui-avatars.com/api/?name=${item.user_name}`
                                  }
                                  alt={item.post_addition?.course?.title}
                                  title={item.post_addition?.course?.title}
                                  className="img-full"
                                  style={{ borderRadius: "100%" }}
                                /> */}
                                <UserAvatar
                                  img={item.profile_pic}
                                  alt={item.post_addition?.course?.title}
                                  username={item?.post_addition?.name || item?.user_name}
                                  background={"#F98600"}
                                  width={30}
                                  height={30}
                                  fsize={1}
                                />
                              </figure>
                              <span>{item.user_name ? item.user_name : item.post_addition.name}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const slug = params.slug;
  let ratingDatas = null;
  let courseDatas = null;
  let reviewsDatas = [];
  const seoHomePageData = {
    seoPageType: "reviewsPage", // This should be changed to reflect the actual page type
    title: "Write a review",
    metaTags: [
      {
        name: "facebook-domain-verification",
        property: "",
        content: "twh401qzi7r7o3n227q4sg3hghbpzh",
      },
    ],
  };

  const singleCourseResponse = await getSingleCourse(slug);
  if (singleCourseResponse && singleCourseResponse.data && singleCourseResponse.data.data) {
    courseDatas = singleCourseResponse.data.data;

    const courseRatingResponse = await getCourseRatings(courseDatas.id);
    if (courseRatingResponse && courseRatingResponse.data && courseRatingResponse.data.data) {
      ratingDatas = courseRatingResponse.data.data;
    }

    const reviewsResponse = await getReviews("", 0, 1, 10); // course_id,ratings,current-page

    if (reviewsResponse && reviewsResponse.data && reviewsResponse.data.data) {
      reviewsDatas.push(reviewsResponse.data.data);
    }
  }

  return {
    props: {
      ratingDatas,
      courseDatas,
      reviewsDatas,
      seoHomePageData,
    },
  };
}

const mapStateToProps = (state) => {
  return {
    userData: state.authData.userData,
    myname: state.userProfileData.myname,
    myorg: state.userProfileData.organizationData,
    mydes: state.userProfileData.designationData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    alertBoxAction: (data) => dispatch(alertBox(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WriteReview);
