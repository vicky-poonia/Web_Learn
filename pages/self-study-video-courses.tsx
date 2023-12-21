import Link from "next/link";
import { useState, useEffect } from "react";
import { VideoReviewModal } from "@/components/shared/Modals";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Head from "next/head";
import { connect } from "react-redux";

const Videocouse = ({userSubscriptionData, seoHomePageData}) => {
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [isBreakpoint, setIsBreakpoint] = useState(1);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    function handleResize() {
      const { innerWidth: width, innerHeight: height } = window;
      if (width <= 450) {
        setIsBreakpoint(1);
      } else if (width >= 451 && width <= 640) {
        setIsBreakpoint(2);
      } else if (width >= 641 && width <= 767) {
        setIsBreakpoint(3);
      } else {
        setIsBreakpoint(4);
      }
    }
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView: isBreakpoint,
    initial: 1,
    spacing: 20,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });

  const openVideoModal = (url) => {
    document.body.classList.add("open-modal-review-video");
    setActiveVideoUrl(url);
  };

  // Checking login status
  const [hasPremiumPlan, setHasPremiumPlan] = useState(false);

  useEffect(() => {
    if (userSubscriptionData) {
      const filteredPlans = userSubscriptionData.active_plans.filter(event => {
        return (event.plan.title === 'Premium Plus' || event.plan.title === 'Premium') && event.plan.is_active === true;
      });
      if (filteredPlans.length > 0) {
        setHasPremiumPlan(true);
      } else {
        setHasPremiumPlan(false);
      }
    }
  }, [userSubscriptionData]);
  
  return (
    <>
      {/* <Head>
        <title>Video Courses for IT Certification Exam Training - Whizlabs</title>

        <meta name="title" content="Video Courses for IT Certification Exam Training - Whizlabs" />
        <meta
          name="description"
          content="Most advanced video courses for AWS, Azure, Google Cloud & Trending IT skills - Designed by the most popular and Industry recognized IT experts! "
        />
        <meta
          name="keywords"
          content="Video Courses for IT Certification Exam Training - Whizlabs"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Video Courses for IT Certification Exam Training - Whizlabs"
        />
        <meta
          property="og:description"
          content="Most advanced video courses for AWS, Azure, Google Cloud & Trending IT skills - Designed by the most popular and Industry recognized IT experts! "
        />
        <meta property="og:url" content="https://www.whizlabs.com/practice-exam-simulator/" />
        <meta property="og:site_name" content="Whizlabs" />
        <meta
          property="og:image"
          content={
            process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acb830d0173"
          }
        />
        <meta property="fb:app_id" content="502194103558420" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="Most advanced video courses for AWS, Azure, Google Cloud & Trending IT skills - Designed by the most popular and Industry recognized IT experts! "
        />
        <meta
          name="twitter:title"
          content="Video Courses for IT Certification Exam Training - Whizlabs"
        />
        <meta name="twitter:site" content="@whizlabs" />
        <meta
          name="twitter:image"
          content={
            process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acb830d01bb"
          }
        />
        <meta name="twitter:creator" content="@whizlabs" />
      </Head> */}
      <div>
        <VideoReviewModal videoUrl={activeVideoUrl} />
        <div className="video-course-banner">
          <div className="container">
            <div className="caption-block">
              <span className="blue-txt">Whizlabs Video Courses</span>
              <h1 className="title">
                Deep dive into the latest tech skills with our expert-curated Video Courses
              </h1>
              <p>
                Visual learning is one of the fastest and most effective tools for technology
                training. With Whizlabs Video Courses, you can learn directly from the industry
                experts, anytime and anywhere. Get started on your upskilling journey and stay ahead
                of the crowd!
              </p>
              <a href={hasPremiumPlan ? `${process.env.NEXT_PUBLIC_LMS_URL}/dashboard` : "/pricing"}>
                <div className="btn btn-start link-videolp">Get Started</div>
              </a>
            </div>
            <figure className="img-block">
              <img
                className="img-full"
                src="/images/whizlabs-video-courses.webp"
                alt="it certifications courses"
              />
            </figure>
          </div>
        </div>
        <div id="content-area">
          <div className="shape-your-skills">
            <div className="container">
              <div className="caption-block">
                <h2>Shape your skills and transform your career</h2>
                <p>
                  With new technologies being introduced on an everyday basis, upgrading your skills
                  becomes a need, and not just a choice. Prepare yourself for a better IT career
                  with our skill enriching video courses.
                </p>
              </div>
              <div className="skills-group">
                <div className="skill">
                  <figure>
                    <img
                      className="img-full"
                      src="/images/whizlabs-course-syllabus.webp"
                      alt="updated course syllabus"
                    />
                  </figure>
                  <label>100% syllabus coverage</label>
                  <p>
                    To make sure you are well prepared for every topic that is a part of your exam
                    syllabus.
                  </p>
                </div>
                <div className="skill">
                  <figure>
                    <img
                      className="img-full"
                      src="/images/whizlabs-course-update.webp"
                      alt="it certification training course"
                    />
                  </figure>
                  <label>Regularly updated content</label>
                  <p>
                    To provide you with updated training resources as per the latest changes in the
                    exam syllabus.
                  </p>
                </div>
                <div className="skill">
                  <figure>
                    <img
                      className="img-full"
                      src="/images/expert-support.webp"
                      alt="technical customer support"
                    />
                  </figure>
                  <label>24X7 Expert Support</label>
                  <p>
                    To resolve your queries as and when they arise and offer you a smooth learning
                    experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="courses-sec">
            <div className="container">
              <div className="caption-block">
                <h2>Have you explored our Training Library of 250+ Courses?</h2>
                <p>Here are some of our popular course categories!</p>
              </div>
              <div className="courses-group">
                <a
                  className="course course-vlp"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("/cloud-certification-training-courses");
                  }}
                >
                  <figure>
                    <img
                      className="img-full"
                      src="/images/whizlabs-cloud-training.svg"
                      alt="cloud training"
                    />
                  </figure>
                  <label>Cloud</label>
                </a>
                <a
                  className="course course-vlp"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("/devops-certifications");
                  }}
                >
                  <figure>
                    <img
                      className="img-full"
                      src="/images/whizlabs-devops-training.svg"
                      alt="devops course"
                    />
                  </figure>
                  <label>DevOps</label>
                </a>
                <a
                  className="course course-vlp"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("/oracle-java-certifications");
                  }}
                >
                  <figure>
                    <img
                      className="img-full"
                      src="/images/whizlabs-java-training.svg"
                      alt="java certification training"
                    />
                  </figure>
                  <label>Java</label>
                </a>
                <a
                  className="course course-vlp"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("/microsoft-certifications");
                  }}
                >
                  <figure>
                    <img
                      className="img-full"
                      src="/images/microsoft training courses.svg"
                      alt="microsoft certification training"
                    />
                  </figure>
                  <label>Microsoft</label>
                </a>
                <a
                  className="course course-vlp"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("/cyber-security-certifications");
                  }}
                >
                  <figure>
                    <img
                      className="img-full"
                      src="/images/cybersecurity-learning.svg"
                      alt="cybersecurity training"
                    />
                  </figure>
                  <label>Security</label>
                </a>
                <a
                  className="course course-vlp"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("/linux-certifications");
                  }}
                >
                  <figure>
                    <img
                      className="img-full"
                      src="/images/linux-training.svg"
                      alt="linux for learning"
                    />
                  </figure>
                  <label>Linux</label>
                </a>
                <a
                  className="course course-vlp"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("/python");
                  }}
                >
                  <figure>
                    <img
                      className="img-full"
                      src="/images/python-training-online.svg"
                      alt="python for learning"
                    />
                  </figure>
                  <label>Python</label>
                </a>
                <a
                  className="course link-more course-vlp"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("/library");
                  }}
                >
                  <figure>
                    <img
                      className="img-full"
                      src="/images/it-certifications.svg"
                      alt="it certifications"
                    />
                  </figure>
                  <label>More</label>
                </a>
              </div>
              <div
                className="btn-group"
                onClick={(e) => {
                  e.preventDefault();
                  window.open("/library");
                }}
              >
                <a className="btn btn-explore explore-vlp ">Explore Our Courses</a>
              </div>
            </div>
          </div>
          <div className="videos-detailed">
            <div className="container">
              <div className="img-caption">
                <div className="caption">
                  <h3>Detailed videos on every topic</h3>
                  <p>
                    Don’t leave any topic unexplored. Get well prepared for your certification exam
                    with our video courses that cover every topic in detail.
                  </p>
                </div>
                <figure className="imgBlock">
                  <img
                    className="img-full"
                    src="/images/whizlabs-video-training.webp"
                    alt="top it certifications 2022"
                  />
                </figure>
              </div>
              <div className="img-caption">
                <div className="caption">
                  <h3>Short and Simple Learning Modules</h3>
                  <p>
                    Exploring new skills can be overwhelming. We are here to ensure you of a
                    comfortable learning journey with our short and simple learning modules. Learn
                    at your own pace without getting bored of lengthy lectures.
                  </p>
                </div>
                <figure className="imgBlock">
                  <img
                    className="img-full"
                    src="/images/learning-modules.webp"
                    alt="software courses learning journey"
                  />
                </figure>
              </div>
              <div className="img-caption">
                <div className="caption">
                  <h3>Continue from where you left!</h3>
                  <p>
                    Learning is a gradual process and cannot be done in one day. With Whizlabs Video
                    Courses, you can continue from where you left without losing track of your
                    completed lessons.
                  </p>
                </div>
                <figure className="imgBlock">
                  <img
                    className="img-full"
                    src="/images/whizlabs-video-lessons.webp"
                    alt="video for learning"
                  />
                </figure>
              </div>
              <div className="img-caption">
                <div className="caption">
                  <h3>Integration with Hands-On Labs</h3>
                  <p>
                    While Video Courses are to clear your theoretical concepts, Hands-on Labs allow
                    you to apply your knowledge in a real-time environment. We offer you both by
                    integrating our video courses with the suitable hands-on labs!
                  </p>
                </div>
                <figure className="imgBlock">
                  <img
                    className="img-full"
                    src="/images/integration-hands-on-labs.webp"
                    alt="hands on labs"
                  />
                </figure>
              </div>
              <div className="img-caption">
                <div className="caption">
                  <h3>Course Completion Certificate</h3>
                  <p>
                    Achievements deserve rewards! Get your own shiny Certification of Completion
                    after finishing the video course and flaunt it on your LinkedIn profile.
                  </p>
                </div>
                <figure className="imgBlock">
                  <img
                    className="img-full"
                    src="/images/whizlabs-course-completion-certificate.webp"
                    alt="course completion certificate"
                  />
                </figure>
              </div>
              <div className="img-caption">
                <div className="caption">
                  <h3>Ask The Experts</h3>
                  <p>
                    Getting stuck with a query? Our subject matter experts are there for you during
                    your entire preparation journey to resolve your doubts on the go.
                  </p>
                </div>
                <figure className="imgBlock">
                  <img
                    className="img-full"
                    src="/images/ask-it-experts.webp"
                    alt="expert support for it certification"
                  />
                </figure>
              </div>
            </div>
          </div>
          <div className="compare-plans">
            <div className="container">
              <div className="caption-block">
                <p>
                  Ace your certification exams with confidence and accomplish your career goals with
                  Whizlabs
                </p>
                <a
                  className="btn btn-plans"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("/pricing","_self");
                  }}
                >
                  Compare Plans <i className="icon icon-font-arrow-right"></i>
                </a>
              </div>
              <figure className="img-block">
                <img className="img-full" src="/images/career-goals.webp" alt="it career goals" />
              </figure>
            </div>
          </div>
          <section className="learners-sec">
            <div className="container">
              <h2>
                Listen To What <strong>Our Learners Have To Say</strong>
              </h2>
              <div className="slider-blocks keen-slider" ref={sliderRef}>
                <div
                  className="learner keen-slider__slide"
                  onClick={() =>
                    openVideoModal(
                      "https://www.youtube.com/embed?v=44wakGMRAqA&list=PLE17r5uStneIqaxAoLVBrnvt3ZTzklWcZ&index=1"
                    )
                  }
                >
                  <figure className="main-img">
                    <img
                      className="img-full img-review"
                      src="/images/whizlabs-review.png"
                      alt="whizlabs course review"
                    />
                  </figure>
                  <figure className="play-icon" id="playIcon">
                    <img className="img-full" src="/images/play-border.png" alt="" />
                  </figure>
                  <div className="user-block">
                    <label className="name">Whizlabs user</label>
                    <span className="desi">Creator</span>
                  </div>
                  <div className="gradient"></div>
                </div>
                <div
                  className="learner keen-slider__slide"
                  onClick={() =>
                    openVideoModal(
                      "https://www.youtube.com/embed?v=zSmMmA9v8qA&list=PLE17r5uStneIqaxAoLVBrnvt3ZTzklWcZ&index=2"
                    )
                  }
                >
                  <figure className="main-img">
                    <img
                      className="img-full img-review"
                      src="/images/whizlabs-reviews-software-engineer.png"
                      alt="whizlabs reviews"
                    />
                  </figure>
                  <figure className="play-icon" id="playIcon">
                    <img className="img-full" src="/images/play-border.png" alt="" />
                  </figure>
                  <div className="user-block">
                    <label className="name">Prithvi Muddagouni</label>
                    <span className="desi">Software Engineer</span>
                  </div>
                  <div className="gradient"></div>
                </div>
                <div
                  className="learner keen-slider__slide"
                  onClick={() =>
                    openVideoModal(
                      "https://www.youtube.com/embed?v=bPCKT73xOwM&list=PLE17r5uStneIqaxAoLVBrnvt3ZTzklWcZ&index=3"
                    )
                  }
                >
                  <figure className="main-img">
                    <img
                      className="img-full img-review"
                      src="/images/whizlabs-cybersecurity-review.png"
                      alt="whizlabs review cybersecurity"
                    />
                  </figure>
                  <figure className="play-icon" id="playIcon">
                    <img className="img-full" src="/images/play-border.png" alt="" />
                  </figure>
                  <div className="user-block">
                    <label className="name">Juan Cardona</label>
                    <span className="desi">Cloud Cybersecurity Engineer</span>
                  </div>
                  <div className="gradient"></div>
                </div>
                <div
                  className="learner keen-slider__slide"
                  onClick={() =>
                    openVideoModal(
                      "https://www.youtube.com/embed?v=5SLzylxKIas&list=PLE17r5uStneIqaxAoLVBrnvt3ZTzklWcZ&index=4"
                    )
                  }
                >
                  <figure className="main-img">
                    <img
                      className="img-full img-review"
                      src="/images/whizlabs-review-associate-solution-advisor.jpeg"
                      alt="whizlabs review reddit"
                    />
                  </figure>
                  <figure className="play-icon" id="playIcon">
                    <img className="img-full" src="/images/play-border.png" alt="" />
                  </figure>
                  <div className="user-block">
                    <label className="name">Agassi Joel</label>
                    <span className="desi">Associate Solution Advisor</span>
                  </div>
                  <div className="gradient"></div>
                </div>
              </div>
              {(isBreakpoint == 2 || isBreakpoint == 1) && (
                <>
                  <div className="learners-arrow">
                    <div
                      className="arrow1"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentSlide != 0) {
                          slider.prev();
                        }
                      }}
                      style={
                        currentSlide == 0
                          ? { color: "grey", background: "#bcb6b6" }
                          : { color: "black" }
                      }
                    >
                      &#8592;
                    </div>
                    <div
                      className="arrow2"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentSlide != 3) {
                          slider.next();
                        }
                      }}
                      style={
                        currentSlide == 3
                          ? { color: "grey", background: "#bcb6b6" }
                          : { color: "black" }
                      }
                    >
                      &#8594;
                    </div>
                  </div>
                </>
              )}

              <div
                className="btn-group course-vlp"
                onClick={(e) => {
                  e.preventDefault();
                  window.open("/pricing","_self");
                }}
              >
                <a className="btn btn-start">Get Started</a>
              </div>
            </div>
            <div className="gradient"></div>
          </section>
        </div>
      </div>
    </>
  );
};

//export default Videocouse;

const mapStateToProps = (state) => {
  return {
    userData: state.authData.userData,
    userSubscriptionData: state.userProfileData.userSubscriptionData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Videocouse);


export async function getServerSideProps() {
  const seoHomePageData = {
    seoPageType: "videoCoursePage",
    title: "Video Courses for IT Certification Exam Training - Whizlabs",
    metaTags: [
      {
        name: "title",
        property: "",
        content: "Video Courses for IT Certification Exam Training - Whizlabs",
      },
      {
        name: "description",
        property: "",
        content:
          "Most advanced video courses for AWS, Azure, Google Cloud & Trending IT skills - Designed by the most popular and Industry recognized IT experts!",
      },
      {
        name: "keywords",
        property: "",
        content:
          "Video Courses for IT Certification Exam Training - Whizlabs",
      },
      { name: "", property: "og:locale", content: "en_US" },
      { name: "", property: "og:type", content: "website" },
      {
        name: "",
        property: "og:title",
        content: "Video Courses for IT Certification Exam Training - Whizlabs",
      },
      {
        name: "",
        property: "og:description",
        content:
          "Most advanced video courses for AWS, Azure, Google Cloud & Trending IT skills - Designed by the most popular and Industry recognized IT experts!",
      },
      { name: "", property: "og:url", content: "https://www.whizlabs.com/practice-exam-simulator/" },
      { name: "", property: "og:site_name", content: "Whizlabs" },
      {
        name: "",
        property: "og:image",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acb830d0173",
      },
      { name: "", property: "fb:app_id", content: "502194103558420" },
      { name: "", property: "og:image:width", content: "500" },
      { name: "", property: "og:image:height", content: "500" },
      { name: "twitter:card", property: "", content: "summary" },
      {
        name: "twitter:description",
        property: "",
        content:
          "Most advanced video courses for AWS, Azure, Google Cloud & Trending IT skills - Designed by the most popular and Industry recognized IT experts!",
      },
      {
        name: "twitter:title",
        property: "",
        content: "Video Courses for IT Certification Exam Training - Whizlabs",
      },
      { name: "twitter:site", property: "", content: "@whizlabs" },
      {
        name: "twitter:image",
        property: "",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acb830d01bb",
      },
      { name: "twitter:creator", property: "", content: "@whizlabs" },
    ],
  };
  
    
    
  return {
    props: {
      seoHomePageData,
    },
  };
}
