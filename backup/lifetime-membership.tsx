import Link from "next/link";
import { Accordions, ContactUsAction } from "@/components/import";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { addSubscription } from "redux/AddToCart/cart-actions";
import { updateRedirection } from "redux/Redirection/redirect-actions";
import Head from "next/head";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { VideoReviewModal } from "@/components/shared/Modals";

import { useKeenSlider } from "keen-slider/react";

const LifeTimeMembership = ({
  profile,
  brandsData,
  moreBrandsData,
  testimonialsData,
  subscriptionData,
  faqData,
  videoDatas,
  userData,
  addToState,
  redirectionAction,
}) => {
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [buttonActive, setButtonActive] = useState(false);
  const router = useRouter();

  const [isBreakpoint, setIsBreakpoint] = useState(false);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    function handleResize() {
      const { innerWidth: width, innerHeight: height } = window;
      if (width > 1023) {
        setIsBreakpoint(false);
      } else {
        setIsBreakpoint(true);
      }
    }
  }, []);

  const openVideoModal = (url) => setActiveVideoUrl(url);

  useEffect(() => {
    if (profile && profile?.subscrptions && profile?.subscrptions?.active_plans?.length > 0) {
      profile?.subscrptions?.active_plans.forEach((data) => {
        // check if plan is active or not
        if (data && data.is_plan_active) {
          setCurrentPlan(data);
        }
      });
    }
  }, [profile]);

  const openCheckoutPage = (subscription) => {
    setButtonActive(true);
    addToState(subscription); // add datas to state
    if (userData && userData.data && userData.data.user_id) {
      router.push("/pricing/checkout");
    } else {
      redirectionAction("SUBSCRIPTION"); // after sign in redirect to subscription page
      if (localStorage) localStorage.setItem("togo", "true");
      document.querySelector("body").classList.add("open-modal-login");
    }
  };

  const disableButton = () => {};

  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView: isBreakpoint ? 1 : 3,
    spacing: 20,
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });

  return (
    <>
      <Head>
        <title>Lifetime Membership | Whizlabs</title>
        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
        <meta
          name="description"
          content="We offer most affordable subscription plans for your convenience. Enrol now and take a step ahead to level up your career!"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Most Affordable Subscription Plans - Whizlabs" />
        <meta
          property="og:description"
          content="We offer most affordable subscription plans for your convenience. Enrol now and take a step ahead to level up your career!"
        />
        <meta property="og:url" content="https://www.whizlabs.com/pricing/" />
        <meta property="og:site_name" content="Whizlabs" />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60b50e7ed1751"}
        />
        <meta property="fb:app_id" content="502194103558420" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="We offer most affordable subscription plans for your convenience. Enrol now and take a step ahead to level up your career!"
        />
        <meta name="twitter:title" content="Most Affordable Subscription Plans - Whizlabs" />
        <meta name="twitter:site" content="@whizlabs" />
        <meta
          name="twitter:image"
          content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60b50e7ed1795"}
        />
        <meta name="twitter:creator" content="@whizlabs" />
      </Head>

      <VideoReviewModal videoUrl={activeVideoUrl} />

      {/* <!-- life-time-banner --> */}
      <div className="life-time-banner">
        <div className="container-small">
          <div className="caption">
            <h1>Lifetime Membership</h1>
            <label>
              Trusted by over <strong>5 million professionals</strong> and counting!!{" "}
            </label>
            <p>
              This is your once in a lifetime opportunity. Pay one time and get access to our
              world-class Certification Training Courses, Practice Tests, and Hands-On Labs.
            </p>
            <h6>
              With Lifetime Membership, you will also get free access to all new courses and course
              updates by Whizlabs.
            </h6>
          </div>
          {subscriptionData.map((item) => (
            <>
              <div className="lifetime-access">
                <div className="title">{item.title}</div>
                <hr />
                <div className="para">
                  <label>Best for super learners who:</label>
                  <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
                </div>
                <div className="price-block">
                  <span className="price">${item.offer_price.usd}</span>
                  <del className="old-price">${item.price.usd}</del>
                </div>
                <a
                  style={{
                    color: currentPlan && currentPlan?.plan_id === item.id ? "#007cff" : "",
                    background: currentPlan && currentPlan?.plan_id === item.id ? "#007cff47" : "",
                    cursor: "pointer",
                  }}
                  className="btn btn-subscribe"
                  onClick={(e) =>
                    currentPlan && currentPlan?.plan_id === item.id
                      ? disableButton()
                      : openCheckoutPage(item)
                  }
                >
                  {currentPlan && currentPlan?.plan_id === item.id ? "Active" : "Subscribe Now"}
                </a>
              </div>
            </>
          ))}
          <div className="shape">
            <img className="img-full" src="/images/shape-lifetime.svg" alt="" />
          </div>
        </div>
      </div>

      {/* <!-- content area part -->  */}
      <div id="content-area" className="life-time-membership-page">
        {/* <!-- brands-block --> */}
        <div className="brands-block">
          <div className="container-small">
            <div className="title">We are blessed with some amazing clients. Here are just a few!</div>
            <div className="brand-logoes">
              {brandsData.map((e) => (
                <figure>
                  <img className="img-full" src={e.imgUrl} alt={e.alt} />
                </figure>
              ))}
            </div>
            <div className="more-slide">
            <div className="more-logo brand-logo">
              {moreBrandsData.map((brand) => (
                <figure key={brand.id}>
                  <img className="img-full" src={brand.imgUrl} alt="brand" />
                </figure>
              ))
              }
            </div>
          </div>
          <div className="moreless-button">View More</div>
          </div>
        </div>

        {/* <!-- whiz-life-time --> */}
        <div className="whiz-life-time">
          <div className="container-small">
            <div className="caption">
              <label>What do you get with</label>
              <h2>Whizlabs Lifetime Membership?</h2>
            </div>
            <div className="list-membership">
              <ul>
                <li>
                  <figure>
                    <img className="img-full" src="/images/best-play.svg" />
                  </figure>
                  <span>Best-in-class Video Courses and Practice Tests</span>
                </li>
                <li>
                  <figure>
                    <img className="img-full" src="/images/400-hand.svg" />
                  </figure>
                  <span>400+ Hands-On Labs to demonstrate your skills</span>
                </li>
                <li>
                  <figure>
                    <img className="img-full" src="/images/free-acc.svg" />
                  </figure>
                  <span>Free access to all future launches</span>
                </li>
                <li>
                  <figure>
                    <img className="img-full" src="/images/ru-right.svg" />
                  </figure>
                  <span>Regular upgradation to the existing content</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* <!-- enroll-today --> */}
        <div className="enroll-today">
          <div className="container-small">
            <div className="img-box">
              <p>
                Enroll today to <strong>Access 250+ Online Courses, Practice Tests</strong> across
                various disciplines
              </p>
              <div className="gradient"></div>
            </div>
          </div>
        </div>

        {/* <!-- txt-block --> */}
        <div className="txt-block">
          <div className="container-small">
            <p className="txt">
              Earn certifications that are significant in cloud tech, software development, software
              testing, cyber security, Java, Python, Big data, and establish yourself as an expert
              in your particular field.
            </p>
            <p>
              Launched in 2000, Whizlabs has helped more than 5 million professionals achieve their
              career goals, and 1000+ enterprises upskill in their workforce. With a dedicated team
              of subject matter experts, we ensure high quality training material for our learners,
              along with timely upgradation as per the latest syllabus changes. We keep adding new
              courses to our training library on a regular basis to cover all the latest
              technologies and disciplines.
            </p>
          </div>
        </div>

        {/* <!-- exam-instructions --> */}
        <div className="exam-instructions">
          <div className="container-small">
            <div className="caption-group">
              <div className="left">
                <div className="title">Why Lifetime Membership?</div>
                <div className="txt">
                  When you have access for a lifetime, you can keep learning at your own pace and
                  continue your upskilling journey with Whizlabs.
                </div>
              </div>
              <div className="right">
                <div className="title">
                  <span>Grow your skills and transform your career</span>
                </div>
                <ul>
                  <li>
                    Access various courses on Cloud Computing, Big Data, Cybersecurity, Power
                    Platform, Software Testing, etc.
                  </li>
                  <li>
                    Become a multicloud expert across Amazon AWS, Microsoft Azure, Google Cloud,
                    etc.
                  </li>
                  <li>Get certifications to validate your new skills</li>
                  <li>Learn from certified and experienced professionals</li>
                  <li>24x7 subject-matter-expert support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- video-review --> */}
        <div className="new-review-block">
          <div className="container-small">
            <div className="video-review">
              <h2 className="title">
                <figure>
                  <img className="img-full" src="/images/quote-img.svg" />
                </figure>
                Video Reviews
              </h2>

              <div className="video-group keen-slider" ref={sliderRef} style={{ display: "flex", overflow: "hidden" }}>
                {videoDatas?.map((item, i) => (
                  <figure
                    className="block keen-slider__slide"
                    key={i}
                    onClick={() => openVideoModal(item?.video_url)}
                  >
                    <div className="btn-play">
                      <img className="img-full" src="/images/play-btn-big-white.svg" alt="" />
                    </div>
                    <img
                      className="img-full"
                      src={item?.thumbnail || "https://picsum.photos/320/195?random=" + (i + 1)}
                      alt=""
                    />
                  </figure>
                ))}
              </div>
              {slider && (
                  <div className="dots">
                    {[...Array(slider.details().size).keys()].map((idx) => {
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            slider.moveToSlideRelative(idx);
                          }}
                          className={"dot" + (currentSlide === idx ? " active" : "")}
                        />
                      );
                    })}
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* <!-- aboutus-block --> */}
        <div className="aboutus-block">
          <div className="container-small">
            <h2 className="title">What our students say about us</h2>
            <div className="new-students-review-block">
              {testimonialsData.map((item, key) => (
                <div className="block" key={key}>
                  <div className="student-img">
                    <figure
                      style={{ borderRadius: "50%", overflow: "hidden", width: 60, height: 60 }}
                    >
                      <img
                        className="img-full"
                        src={
                          item.upload_picture
                            ? process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                              item.upload_picture.replace("media/", "")
                            : "/images/user-not-found.svg"
                        }
                        alt={item.customer_name}
                      />
                    </figure>
                  </div>
                  <div className="review-content">
                    <div
                      className="testimonial-message"
                      dangerouslySetInnerHTML={{ __html: item.message }}
                    ></div>
                    <div className="name">
                      <span>{item.customer_name}</span>
                      {/* <samp>{item.designation}</samp>
                      <figure>
                        <img className="img-full" src="/images/linkedin.svg" alt="" />
                      </figure> */}
                    </div>
                    {/* <div className="verified-buyer">
                    <i className="icon icon-font-verified-buyes"></i>
                    <span>Verified buyer</span>
                  </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* <!-- faq-block --> */}
        <div className="faq-block" style={{ background: "white" }}>
          <div className="container-small">
            <div className="container-left">
              <h3 className="title">Frequently Asked Questions</h3>
              <div className="tab_wrapper">
                <div className="resp-tabs-container hor_1 content_wrapper">
                  <div className="tab_content active" style={{ display: "block" }}>
                    <div className="accordian-block">
                      <div className="accordian-list">
                        {faqData.map((e, i) => (
                          <Accordions
                            key={i}
                            data={{
                              key: i,
                              question: e.question,
                              answer: e.answer,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- upgradation-block --> */}
        <ContactUsAction />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const brandsData = [
    {
      id: 1,
      imgUrl: "/images/logo-jp.png",
      alt: "JP",
    },
    {
      id: 2,
      imgUrl: "/images/logo-deloitte2x.png",
      alt: "deloitte",
    },
    {
      id: 3,
      imgUrl: "/images/logo-global-knowledge.png",
      alt: "Global Knowledge",
    },
    {
      id: 4,
      imgUrl: "/images/logo-campgemni2x.png",
      alt: "campgemini",
    },
    {
      id: 5,
      imgUrl: "/images/logo-telefonica.png",
      alt: "telefonica",
    },
    {
      id: 6,
      imgUrl: "/images/logo-tuv.png",
      alt: "tuv",
    },
  ];

  const moreBrandsData = [
    // {
    //   id: 1,
    //   imgUrl: "/images/logo-global-knowledge.png",
    //   alt: "Global Knowledge",
    // },
    {
      id: 1,
      imgUrl: "/images/logo-wavestone.png",
      alt: "wavestone",
    },
    {
      id: 2,
      imgUrl: "/images/logo-vivid-cloud.png",
      alt: "vivid cloud",
    },
    {
      id: 3,
      imgUrl: "/images/logo-TLG.png",
      alt: "TLG",
    },
    {
      id: 4,
      imgUrl: "/images/logo-miami.png",
      alt: "miami",
    },
    {
      id: 5,
      imgUrl: "/images/logo-versor.png",
      alt: "versor",
    },
    {
      id: 6,
      imgUrl: "/images/logo-kpmg.png",
      alt: "kpmg",
    },
    {
      id: 7,
      imgUrl: "/images/logo-stack.png",
      alt: "stack",
    },
    {
      id: 8,
      imgUrl: "/images/logo-digi.png",
      alt: "digi",
    },
    {
      id: 9,
      imgUrl: "/images/logo-mityo.png",
      alt: "mityo",
    },
    {
      id: 10,
      imgUrl: "/images/logo-spatial.png",
      alt: "spatial",
    },
  ];

  const faqData = [
    {
      question: `What all is included in the Lifetime Subscription?`,
      answer: `<p>You will get access to the entire Whizlabs platform which includes 250+ Online Courses, Practice Tests, and 400+ Hands-On Labs.</p>`,
    },
    {
      question: `Are there any hidden costs involved with this membership plan?`,
      answer: `<p>No. The amount you pay during your purchase is all it takes for you to get access to the entire Whizlabs training library for a lifetime.</p>`,
    },
    {
      question: `Will I get access to all future courses and updates?`,
      answer: `<p>Yes, you will be able to access all our future course launches and updates to the existing courses without paying a single extra penny.</p>`,
    },
    {
      question: `What is your refund policy in case of lifetime membership?`,
      answer: `<p>Our aim is to deliver a superior experience to our customers. In case you are not satisfied with the product, you can ask for a refund within 7 days of the purchase, for more information, please refer to the detailed <a href="/refund-policy">refund policy</a></p>`,
    },
    {
      question: `What are the new technologies/disciplines you plan to cover? Can I see your future course roadmap?`,
      answer: `<p>We have covered the multi cloud ( AWS, Azure and GCP) certification roadmap. Other technologies in focus are Big Data, DevOps, Cybersecurity, Microsoft certifications (Power Platform and MS 365), Software Testing, Robotic Automation, among many others. We will keep adding all the latest certifications, and as a lifetime subscription member you will get a free update on all existing courses and future releases.</p>`,
    },
  ];

  const videoDatas = [
    {
      video_url: "https://www.youtube.com/embed/44wakGMRAqA",
      thumbnail: "/images/y_video_2.jpg",
    },
    {
      video_url: "https://www.youtube.com/embed/zSmMmA9v8qA",
      thumbnail: "/images/y_video_4.jpg",
    },
    {
      video_url: "https://www.youtube.com/embed/ywP65Z0eIl8",
      thumbnail: "/images/y_video_3.jpg",
    },
    {
      video_url: "https://www.youtube.com/embed/5SLzylxKIas",
      thumbnail: "/images/y_video_1.jpg",
    },
  ];

  const cookie = context.req.headers.cookie;
  const decoded = decodeURIComponent(cookie);
  const split1 = decoded.split("userData=")[1];

  let userToken = null;
  if (split1) {
    const split2 = split1.split(";")[0];
    const parsed = split2 ? JSON.parse(split2) : null;
    userToken = parsed ? parsed.data.token : null;
  }

  let profile = null;
  if (userToken) {
    try {
      const profileResp = await axios.get(baseUrl + "/users/profile", {
        headers: { Authorization: userToken },
      });
      profile = profileResp.data.data;
    } catch (e) {
      console.error(e);
    }
  }

  const OfferLink = process.env.NEXT_PUBLIC_BASE_PATH.includes("whizlabs.com")
    ? "eyJpdiI6Ik1ZTkRYOE5IZW1sYjJ3U1F5aUcremc9PSIsInZhbHVlIjoiZDRoS0s5QWVIUzBJclNONTBWOTZMdz09IiwibWFjIjoiNTM5N2E3OWZjMzUyZWE0YTE1ZmIxYTU5YzRhZTE1Yjc3YjkwNGNmOGQxMTM2ZTU5NjQ3MzMzNDIwMzA3MGZiZCJ9"
    : "eyJpdiI6ImpNUVcwdUk1S04yUTE0QTZ6RVV4NVE9PSIsInZhbHVlIjoiTEdcL3l4UXFYZlBzOVd6MnVLWmRsU1E9PSIsIm1hYyI6ImY0NGYzODQzNmM2NjkzMGM3MzViYjY3NWNlOGRlMzE4MTM4ZTQ5ZGE1NDcxNmFiYzc1NmQxNTI0MDc1MGYwMDAifQ==";
  let subscriptionData = [];
  let testResp = null;
  try {
    testResp = await axios.get(baseUrl + "/users/testimonials");
    let subscriptionResp = await axios.get(
      baseUrl + "/subscription/plans?public_link=" + OfferLink
    );
    if (subscriptionResp?.data?.data[0].id !== 13) {
      subscriptionData.push(subscriptionResp?.data?.data[0]);
    }
  } catch (e) {
    console.error(e);
  }

  return {
    props: {
      brandsData,
      moreBrandsData,
      faqData,
      videoDatas,
      profile,
      subscriptionData: subscriptionData,
      testimonialsData: testResp?.data?.data,
    },
  };
}

const mapStateToProps = (state) => {
  return {
    userData: state.authData.userData,
    redirectTo: state.redirectData.redirect_to,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToState: (datas) => dispatch(addSubscription(datas)),
    redirectionAction: (data) => dispatch(updateRedirection(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LifeTimeMembership);
