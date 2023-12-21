import axios from "axios";
import { StarRating } from "@/components/import";
import { getReviews } from "../../services/review-services/services";
import { getVideoRatings } from "@/services/review-services/services";
import React, { useState, useEffect } from "react";
import UserAvatar from "../../components/plugins/UserAvatar";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { updateRedirection } from "../../redux/Redirection/redirect-actions";
import Link from "next/link";
import { VideoReviewModal } from "../../components/shared/Modals";
import Head from "next/head";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const AzureFT = (props) => {
  
  const { pageData = null, reviewsDatas, videoDatas, userData, utmData, redirectionAction, seoHomePageData } = props;

  const [activeVideoUrl, setActiveVideoUrl] = useState(null);

  const openVideoModal = (url) => {
    setActiveVideoUrl(url);
    document.body.classList.add("open-modal-review-video");
  };

  useEffect(() => {
    if (pageData) {
      document.querySelectorAll(".try_ft_btn").forEach((Itm) => {
        Itm.addEventListener("click", (e) => {
          e.preventDefault();
          handleFreeTest();
        });
      });
    }
  }, [pageData]);

  const handleFreeTest = async () => {
    // e.preventDefault();
    const freeQuizId = pageData.detailed_info?.praticetest_info.find(
      (Itm) => Itm.is_free === true
    ).id;

    if (userData && userData.data && pageData?.course_id) {
      window.open(
        `${process.env.NEXT_PUBLIC_LMS_URL}/course/${pageData.slug}/${pageData.course_id}/quiz/${freeQuizId}/ft/`
      );
      try {
        await axios.post(
          baseUrl + "/users/user-free-course-enroll",
          {
            course_id: pageData.course_id,
            utm_source: utmData?.utm_source || "",
            utm_campaign: utmData?.utm_campaign || "",
            utm_medium: utmData?.utm_medium || "",
            utm_term: utmData?.utm_term || "",
            utm_content: utmData?.utm_content || "",
            share_a_sale: utmData?.share_a_sale || false,
          },
          { headers: { Authorization: userData?.data?.token } }
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      let url =
        process.env.NEXT_PUBLIC_LMS_URL +
        "/course/" +
        pageData.seo_details?.slug +
        "/" +
        pageData.id +
        "/quiz/" +
        freeQuizId +
        "/ft/";
      redirectionAction("LMS_ACTIVITY", url); // after sign in redirect to LMS FREE TEST
      document.querySelector("body").classList.add("open-modal-login");
    }
  };

  return pageData ? (
    <>
      {/* <Head>
        <title>{pageData.page_name} | Whizlabs</title>
        <meta name="robots" content="noindex" />
        <meta name="robots" content="nofollow" />
        <meta httpEquiv="cache-control" content="no-cache" />
        <meta httpEquiv="expires" content="0" />
        <meta httpEquiv="pragma" content="no-cache" />
      </Head> */}
      <div className="ft-banner-block">
        <div className="container-small">
          <div className="breadcrumbs">
            <ul>
              <li>
                <Link href="/ft-course-library">
                  <a>Free Courses Libray</a>
                </Link>
              </li>
              <li>
                <Link href="/azure#microsoft">
                  <a>Azure Web Services</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a>{pageData.title}</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="content">
            <div className="left">
              <div className="title">{pageData.page_name} Free Practice Test</div>
              <StarRating
                isSamp={true}
                avgRating={pageData.ratings?.overall_rating}
                totalRating={pageData.ratings?.rating}
              >
                <div className="learner-group">
                  <figure>
                    <img className="img-full" src="/images/learners.svg" alt="" />
                  </figure>
                  <span>
                    <strong>
                      {new Intl.NumberFormat("en-IN").format(pageData.web_counts.learners_count)}
                    </strong>{" "}
                    Learners
                  </span>
                </div>
              </StarRating>
              <p>
                {pageData.web_counts?.ft_count} free test with{" "}
                {pageData.web_counts?.ftQuestionCount} questions to give you an idea of real exam
                format and test your current level of preparation. Detailed report and analysis will
                be available in your dashboard after submitting the exam.
              </p>
              <a className="btn try_ft_btn" href="#">
                Try free Test
              </a>
            </div>
            <div className="right">
              <figure>
                <img
                  style={{ borderRadius: "6px" }}
                  className="img-full"
                  src={
                    process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                    pageData?.featured_image?.replace("media/", "")
                  }
                  alt={pageData.page_name}
                />
              </figure>
            </div>
          </div>
          <div className="inside">
            <div className="title">What's Inside</div>
            <div className="inside-group">
              <div className="box">
                <figure>
                  <img className="img-full" src="/images/questions.svg" alt="" />
                </figure>
                <span>
                  {pageData.web_counts?.ftQuestionCount} Unique Questions across{" "}
                  {pageData.web_counts?.ft_count} Free Practice Test
                </span>
              </div>
              <div className="box">
                <figure>
                  <img className="img-full" src="/images/hands-on.svg" alt="" />
                </figure>
                <span>
                  {pageData.web_counts?.ft_lab_count > 0 ? pageData.web_counts?.ft_lab_count : ""}{" "}
                  Free Hands-On Labs
                </span>
              </div>
              <div className="box">
                <figure>
                  <img className="img-full" src="/images/detailed-answer.svg" alt="" />
                </figure>
                <span>Detailed Answer Explanations and Reports</span>
              </div>
              <div className="box">
                <figure>
                  <img className="img-full" src="/images/lifetime.svg" alt="" />
                </figure>
                <span>Lifetime Validity and Unlimited Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- content area part --> */}
      <div id="content-area" className="ft-web-page">
        <div dangerouslySetInnerHTML={{ __html: pageData.section_1 }} />
        <div dangerouslySetInnerHTML={{ __html: pageData.section_2 }} />
        <div dangerouslySetInnerHTML={{ __html: pageData.section_3 }} />

        {/* <!-- video-review --> */}
        <div className="review-block">
          <div className="container-small">
            <div className="video-review">
              <h2 className="title">
                <figure>
                  <img className="img-full" src="/images/quote-img.svg" />
                </figure>
                Video Reviews
              </h2>
              <div className="video-group owl-carousel owl-theme">
                {videoDatas &&
                  videoDatas.length > 0 &&
                  videoDatas.map((item, i) => (
                    <React.Fragment key={i}>
                      <figure onClick={() => openVideoModal(item.video_url)}>
                        <div className="btn-play">
                          <img className="img-full" src="/images/play-btn-big-white.svg" alt="" />
                        </div>
                        <img
                          className="img-full"
                          src={
                            process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                            pageData?.featured_image?.replace("media/", "")
                          }
                          alt={pageData?.title}
                          title={pageData?.title}
                        />
                        <div className="video-layover">
                          <img
                            src={
                              process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                              item.profile_image?.replace("media/", "")
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
          </div>
        </div>

        {/* <!-- student reviews --> */}
        <div className="aboutus-block">
          <div className="container-small">
            <h2 className="title">What our students say about us</h2>
            <div className="students-review-block">
              {reviewsDatas &&
                reviewsDatas.length > 0 &&
                reviewsDatas.map((rev) => (
                  <div className="block" key={rev.id}>
                    <div className="student-img">
                      <UserAvatar
                        img={rev.profile_pic}
                        alt={rev.post_addition?.course?.name}
                        username={rev.user_name}
                      />
                    </div>
                    <div className="review-content">
                      <p dangerouslySetInnerHTML={{ __html: rev.post_question_text }} />
                      <div className="name">
                        <span>{rev.user_name}</span>
                        {rev.linkedin || rev.post_addition.linkedin_profile_url ? (
                          <figure>
                            <img className="img-full" src="/images/linkedin.svg" alt="" />
                          </figure>
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
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* <!-- course-slider --> */}
        <div className="course-slider learners">
          <div className="container-small">
            <div className="heading">
              <h2 className="title">Popular Among Learners</h2>
            </div>
            <div className="course-group owl-carousel owl-theme owl-loaded owl-drag">
              <div className="owl-stage-outer">
                <div
                  className="owl-stage"
                  style={{
                    transform: "translate3d(0px, 0px, 0px)",
                    transition: " all 0s ease 0s",
                    width: " 1320px",
                  }}
                >
                  {pageData?.linked_courses &&
                    pageData?.linked_courses.length > 0 &&
                    pageData?.linked_courses?.map((course) => (
                      <div
                        className="owl-item active"
                        style={{ width: "255px", marginRight: "20px" }}
                        key={course.id}
                      >
                        <div className="course">
                          <div className="couser-img">
                            <img
                              className="img-full"
                              src={
                                process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                                course?.featured_image?.replace("media/", "")
                              }
                              alt=""
                            />
                          </div>
                          <div className="course-content">
                            <div className="course-details">
                              <h6 className="title">{course.title}</h6>
                            </div>
                            <div className="price-review-block">
                              <StarRating
                                isSamp={true}
                                avgRating={course.ratings?.overall_rating}
                                totalRating={course.ratings?.rating}
                                onlyCount={true}
                              >
                                <div className="learner-group">
                                  <figure>
                                    <img className="img-full" src="/images/learners.svg" alt="" />
                                  </figure>
                                  <span>{course.web_counts?.learners_count} Learners</span>
                                </div>
                              </StarRating>
                              <Link href={`/${course.page_slug}`}>
                                <a className="btn btn-add-cart">Try Now</a>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="owl-nav disabled">
                <button type="button" role="presentation" className="owl-prev disabled">
                  <span aria-label="Previous">‹</span>
                </button>
                <button type="button" role="presentation" className="owl-next disabled">
                  <span aria-label="Next">›</span>
                </button>
              </div>
              <div className="owl-dots disabled"></div>
            </div>
          </div>
        </div>
      </div>

      <VideoReviewModal videoUrl={activeVideoUrl} />
    </>
  ) : (
    <>Loading...</>
  );
};

export async function getServerSideProps({ params }) {
  const ftPageResp = await axios.post(`${baseUrl}/courses/ft`, { slug: "azure/" + params.slug });

  if (!ftPageResp.data || !ftPageResp.data.data) {
    return {
      redirect: {
        destination: "/azure",
        permanent: false,
      },
    };
  }

  const seoHomePageData = {
    seoPageType: "azure",
    title: "",
    // title: `${pageData.page_name} | Whizlabs`, // Use dynamic title from pageData
    metaTags: [
      {
        name: "robots",
        content: "noindex,nofollow", // Combined both "robots" meta tags
      },
      {
        httpEquiv: "cache-control",
        content: "no-cache",
      },
      {
        httpEquiv: "expires",
        content: "0",
      },
      {
        httpEquiv: "pragma",
        content: "no-cache",
      },
    ],
  };
  

  let reviewsDatas = [];
  let videoDatas = [];
  const reviewsResponse = await getReviews(ftPageResp.data.data.id, 5, 1); // course_id,ratings,current-page

  if (reviewsResponse && reviewsResponse.data && reviewsResponse.data.data) {
    reviewsDatas = reviewsResponse.data.data;
  }

  const videoRatingResponse = await getVideoRatings(ftPageResp.data.data.id);

  if (videoRatingResponse && videoRatingResponse.data && videoRatingResponse.data.data) {
    videoDatas = videoRatingResponse.data.data;
  }

  return {
    props: {
      pageData: ftPageResp.data.data,
      reviewsDatas,
      videoDatas,
      seoHomePageData,
    },
  };
}

const mapStateToProps = (state) => {
  return {
    userData: state.authData.userData,
    utmData: state.utmData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    redirectionAction: (data, url) => dispatch(updateRedirection(data, url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AzureFT);
