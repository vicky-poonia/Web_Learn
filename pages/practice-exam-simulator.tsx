import { useState, useEffect } from "react";
import { VideoReviewModal } from "@/components/shared/Modals";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Head from "next/head";
import { connect } from "react-redux";

const Examsimulator = ({userSubscriptionData, seoHomePageData}) => {
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [isBreakpoint, setIsBreakpoint] = useState(1);
  const [expanded, setExpanded] = useState("panel1");

  const openVideoModal = (url) => {
    document.body.classList.add("open-modal-review-video");
    setActiveVideoUrl(url);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
        <title>Practice Tests for IT Certification Exam Preparation - Whizlabs</title>

        <meta
          name="title"
          content="Practice Tests for IT Certification Exam Preparation - Whizlabs"
        />
        <meta
          name="description"
          content="Whizlabs offers practice tests / mock exams for IT certification exams like AWS, Azure & GCP. Prepare for your certification with our advanced exam simulator!"
        />
        <meta
          name="keywords"
          content="Practice Tests for IT Certification Exam Preparation - Whizlabs"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Practice Tests for IT Certification Exam Preparation - Whizlabs"
        />
        <meta
          property="og:description"
          content="Whizlabs offers practice tests / mock exams for IT certification exams like AWS, Azure & GCP. Prepare for your certification with our advanced exam simulator!"
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
          content="Whizlabs offers practice tests / mock exams for IT certification exams like AWS, Azure & GCP. Prepare for your certification with our advanced exam simulator!"
        />
        <meta
          name="twitter:title"
          content="Practice Tests for IT Certification Exam Preparation - Whizlabs"
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
            <div className="caption-block exam-caption-block">
              <span className="blue-txt">Whizlabs Practice Exams</span>
              <h1 className="title exam-title">
                Preparing for certification exams? Get ready to test your skill gaps!
              </h1>
              <p>
                For every certification exam, it is always the best idea to familiarize yourself
                with the real exam format before attempting the actual exam. This is where Whizlabs
                Exam Simulators come into the picture. Get yourself exam-ready with our Practice
                Tests and achieve your certification goals!
              </p>
              <a href={hasPremiumPlan ? `${process.env.NEXT_PUBLIC_LMS_URL}/dashboard` : "/pricing"} className="btn btn-start" target="_blank">
                Get Started
              </a>
            </div>
            <figure className="img-block">
              <img
                className="img-full"
                src="/images/whizlabs-practice-exam-simulator.webp"
                alt="exam simulator for it certification"
              />
            </figure>
          </div>
        </div>
        <div id="content-area">
          <div className="shape-your-skills">
            <div className="container">
              <div className="caption-block exam-caption-block">
                <h2>Achievement Incoming!!</h2>
                <h2>We know what success in the 1st attempt means to you!</h2>
                <p>
                  Preparing for certification exams can be overwhelming but why worry, when you can
                  gain that much-needed confidence with our globally loved expert-curated practice
                  exams?
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
                  <h3>Practice Mode vs Exam Mode</h3>
                  <p>
                    Want to take your own sweet time and practice each question in detail? Select
                    the Practice Mode.
                  </p>
                  <p>
                    All set for your exam and ready to test your preparation? Exam Mode is for you.
                  </p>
                </div>
                <figure className="imgBlock">
                  <img
                    className="img-full"
                    src="/images/practice-mode-vs-exam mode.webp"
                    alt="whizlabs practice mode"
                    loading="lazy"
                  />
                </figure>
              </div>
              <div className="img-caption">
                <div className="caption">
                  <h3>Section Tests for topic-wise preparation</h3>
                  <p>
                    Ensure your complete grasp on every exam topic with the Section Tests. No more
                    skimming through all the questions to practice your weak areas!
                  </p>
                </div>
                <figure className="imgBlock">
                  <img
                    className="img-full"
                    src="/images/whizlabs-section-tests.webp"
                    alt="whizlabs section tests"
                    loading="lazy"
                  />
                </figure>
              </div>
              <div className="img-caption">
                <div className="caption">
                  <h3>Continue from where you left!</h3>
                  <p>
                    Practicing is a gradual process and cannot be done in one day. With Whizlabs
                    Practice Exams, you can continue from where you left without losing previous
                    records of your performance.
                  </p>
                </div>
                <figure className="imgBlock">
                  <img
                    className="img-full"
                    src="/images/whizlabs-practice-exams.webp"
                    alt="it certifications roadmap"
                    loading="lazy"
                  />
                </figure>
              </div>
              <div className="img-caption">
                <div className="caption">
                  <h3>Detailed Performance Reports</h3>
                  <p>
                    Skip the hustle of reviewing the result of every test because we will do that
                    for you. Get an instant and comprehensive analysis of your performance everytime
                    you take a test.
                  </p>
                </div>
                <figure className="imgBlock">
                  <img
                    className="img-full"
                    src="/images/performance-report.webp"
                    alt="it exam performance report"
                    loading="lazy"
                  />
                </figure>
              </div>
              <div className="img-caption">
                <div className="caption">
                  <h3>Questions integrated with Hands-On Labs</h3>
                  <p>
                    While Practice Exams familiarize you with the exam format, Hands-on Labs allow
                    you to apply your knowledge in a real-time environment. We offer you both by
                    integrating our practice questions with the suitable hands-on labs!
                  </p>
                </div>
                <figure className="imgBlock">
                  <img
                    className="img-full"
                    src="/images/whizlabs-hands-on-labs.webp"
                    alt="hands on labs"
                    loading="lazy"
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
                    loading="lazy"
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
                  className="btn btn-plans course-vlp"
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
                      loading="lazy"
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
                      loading="lazy"
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
                      loading="lazy"
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
                      loading="lazy"
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
            <div id="faq" className="faq-block" style={{ marginBottom: "40px" }}>
              <div className="container">
                <div className="container-left">
                  <h2 className="title" style={{ textAlign: "left" }}>
                    FAQs
                  </h2>
                </div>
                <div className="accordian-block">
                  <div className="accordian-list">
                    <div className="item">
                      <Accordion
                        TransitionProps={{ unmountOnExit: true }}
                        expanded={expanded === "panel1"}
                        onChange={handleChange("panel1")}
                      >
                        <AccordionSummary
                          className={expanded === "panel1" ? "item-head open" : "item-head"}
                        >
                          <>
                            <samp style={{ top: "16px" }}></samp>
                            <span>What is an Exam Simulator?</span>
                          </>
                        </AccordionSummary>
                        <AccordionDetails className="item-content">
                          <div style={{ padding: "20px", background: "#fff" }}>
                            Exam Simulator is a computer generated environment where you get the
                            experience of the real exam format to make you confident enough to
                            attempt the exam and pass it in the first try. It helps you analyze your
                            strengths and weaknesses.
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="gradient" style={{ height: "65px" }}></div>
          </section>
        </div>
      </div>
    </>
  );
};

//export default Examsimulator;

export async function getServerSideProps() {
  const seoHomePageData = {
    seoPageType: "practiceExamSimulator",
    title: "Practice Tests for IT Certification Exam Preparation - Whizlabs",
    metaTags: [
      {
        name: "title",
        property: "",
        content:
          "Practice Tests for IT Certification Exam Preparation - Whizlabs",
      },
      {
        name: "description",
        property: "",
        content:
          "Whizlabs offers practice tests / mock exams for IT certification exams like AWS, Azure & GCP. Prepare for your certification with our advanced exam simulator!",
      },
      {
        name: "keywords",
        property: "",
        content:
          "Practice Tests for IT Certification Exam Preparation - Whizlabs",
      },
      { name: "", property: "og:locale", content: "en_US" },
      { name: "", property: "og:type", content: "website" },
      {
        name: "",
        property: "og:title",
        content:
          "Practice Tests for IT Certification Exam Preparation - Whizlabs",
      },
      {
        name: "",
        property: "og:description",
        content:
          "Whizlabs offers practice tests / mock exams for IT certification exams like AWS, Azure & GCP. Prepare for your certification with our advanced exam simulator!",
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
          "Whizlabs offers practice tests / mock exams for IT certification exams like AWS, Azure & GCP. Prepare for your certification with our advanced exam simulator!",
      },
      {
        name: "twitter:title",
        property: "",
        content:
          "Practice Tests for IT Certification Exam Preparation - Whizlabs",
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

export default connect(mapStateToProps, mapDispatchToProps)(Examsimulator);