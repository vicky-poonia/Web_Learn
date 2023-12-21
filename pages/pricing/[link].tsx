import { Accordions, ContactUsAction, Testimonials, Brands } from "@/components/import";
import axios from "axios";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { addSubscription } from "../../redux/AddToCart/cart-actions";
import Head from "next/head";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { updateRedirection } from "redux/Redirection/redirect-actions";

const Subscription = ({
  profile,
  testimonialsData,
  userData,
  addToState,
  subscriptionData,
  redirectionAction,
  redirectTo,
  brandsData,
  moreBrandsData,
  seoHomePageData,
}) => {
  const [currentPlan, setCurrentPlan] = useState(null);
  const [buttonActive, setButtonActive] = useState(false);
  const [fullPath, setFullPath] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (profile && profile.subscrptions && profile.subscrptions.active_plans.length > 0) {
      setCurrentPlan(profile.subscrptions.active_plans[0]);
    }
  }, [profile]);

  const openCheckoutPage = (pricing) => {
    setButtonActive(true);
    addToState(pricing); // add datas to state
    if (userData && userData.data && userData.data.user_id) {
      router.push("/pricing/checkout");
    } else {
      redirectionAction("SUBSCRIPTION");
      if (localStorage) localStorage.setItem("togo", "true");
      document.querySelector("body").classList.add("open-modal-login");
    }
  };

  const disableButton = () => {};

  useEffect(() => {
    if (userData && userData.data && userData.data.user_id) {
      if (localStorage) {
        const togo = localStorage.getItem("togo");
        if (togo === "true") {
          localStorage.setItem("togo", "false");
          /* router.push("/pricing/checkout"); */
        }
      }
    }

    if (window && window.location.pathname) {
      setFullPath(window.location.pathname);
    }
    
  }, [userData]);

  const faqData = [
    {
      question: `Is $149 per year worth for your Annual Subscription?`,
      answer: `<p>
      Absolutely! Whizlabs is a popular e-learning platform and we have helped more than 5 million learners achieve their career goals so far. 
      By enrolling in our Premium Subscription you gain access to 200+ premium quality courses, and practice tests across Cloud Computing, Big Data, Devops, Cybersecurity, Agile Development, Microsoft Power Platform etc., and world-class Hands-On Labs for cloud courses. 
      All our courses are designed by experienced certified professionals and we have a highly engaged and supportive community to enhance your learning experience.      
      </p>`
    },
    {
      question: `How is Whizlabs subscription different?`,
      answer: `Here are a few differentiators as compared to the other available options.
      <ul>
      <li>All our courses are always kept up-to-date. We update the courses timely, even for a small change in the certification curriculum</li>
      <li>Our trainers are handpicked and selected by a panel of industry experts</li>
      <li>We offer 24x7 support to our subscription users which includes support by our team of experts, trainers, and an engaged community</li>
      </ul>`
    },
    {
      question: `How frequently do you update your content?`,
      answer: `<p>Our courses are timely and frequently updated, even to reflect the smallest change in the official certification curriculum. We take feedback from each learner who studies and takes a certification exam using our training material. The feedback is analyzed and included in the course material on a regular basis.</p>`
    },
    {
      question: `Would I have access to all courses?`,
      answer: `Of course! When we say ALL, it means you will actually have access to the entire Whizlabs learning platform. Not just the existing courses, you will also be able to access all our future courses that will be launched during your subscription duration.`
    },
    {
      question: `Is your $9 offer for 1-Month Subscription applicable to future renewals?`,
      answer: `No, this is an introductory offer for the first month only. On subsequent renewals, the full price of the 1-Month plan ($19) will be applicable.`
    },
    {
      question: `Who are your training providers?`,
      answer: `Our trainers are handpicked from industry experts after a rigorous technical assessment. In order to become a trainer with whizlabs, a professional should have a proven track record of success in his area of expertise, good communication skills, and a strong commitment to give back to the community.`
    },
    {
      question: `How many Hands-On Labs would I be able to access?`,
      answer: `Being a Premium Subscription user, you will have access to all the Hands-On Labs for cloud courses provided by Whizlabs.`
    },
    {
      question: `What is your refund policy?`,
      answer: `Our aim is to deliver a superior experience to our customers. In case you are not satisfied with the product, you can ask for a refund within 7 days of the purchase, for more information, please refer to the detailed <a href="/refund-policy">refund policy</a>`
    }
  ];

  return (
    <>
      {/* <Head>
        <title>Most Affordable Subscription Plans - Whizlabs</title>

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
        <meta name="robots" content="noindex,nofollow" />
      </Head> */}
      <div id="content-area" className="subscription-page">
        <div className="gradient-block">
          <div className="container-small">
            <div className="heading">
              <h1>Enhance your skills and transform your career</h1>
              <p>Save up to $1200 annually with the most affordable learning plans</p>
            </div>
          </div>
        </div>
        {/* <!-- choose-plans --> */}
        <div className="container-small">
          <div className="choose-plans">
            <div className="block-group monthly-plan">
              <div className="plan-toggle">
                <div className="toggle" style={{ display: "none" }}></div>
              </div>

              <div className="plan">
                {subscriptionData.map((item) => (
                  <>
                    <div className="block" key={item.id}>
                      <div className="head">
                        <div className="left">
                          <span>{item.title}</span>
                        </div>
                      </div>
                      <hr />
                      <div className="price-block">
                        <del className="old-price">${item.price.usd}</del>
                        <span className="price">${item.offer_price.usd}</span>
                      </div>
                      <div className="para">
                        <label>Best for learners who:</label>
                        <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
                      </div>
                      <a
                        className="btn btn-subscribe"
                        style={{
                          color: currentPlan && currentPlan?.plan_id === item.id ? "#007cff" : "",
                          background:
                            currentPlan && currentPlan?.plan_id === item.id ? "#007cff47" : "",
                          cursor: "pointer",
                        }}
                        onClick={(e) =>
                          currentPlan && currentPlan?.plan_id === item.id
                            ? disableButton()
                            : openCheckoutPage(item)
                        }
                      >
                        {currentPlan
                          ? currentPlan.plan_id === item.id
                            ? "Active"
                            : "Upgrade Now"
                          : "Subscribe Now"}
                      </a>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>

          {/* <!-- subscription-block --> */}
          <div className="subscription-block">
            <div className="title">
              <h2>
                What do you get with <strong>Whizlabs Premium Subscription</strong>
              </h2>
            </div>
            <div className="block-group">
              <div className="block">
                <ul>
                  <li className="active">
                    Full access to 10,000+ hours of world-class video content
                  </li>
                  <li className="active">
                    Full access to premium quality Practice Tests and Quizzes
                  </li>
                  <li className="active">Detailed reports of your performance in each test</li>
                  <li className="active">
                    Hassle free access to 400+ Hands-on Labs to validate your skills
                  </li>
                  <li className="active">Enjoy access to cloud sandboxes and lab challenges</li>
                </ul>
              </div>
              <div className="block">
                <ul>
                  <li className="active">Certifications on completion of every course</li>
                  <li className="active">
                    Easily accessible on PC, Mac, iPhone®, iPad®,Android™ Device
                  </li>
                  <li className="active">24x7 Subject Matter Expert support</li>
                  <li className="active">Access to our forum for open discussions</li>
                  <li className="active">
                    Regular content upgradation based on the latest exam syllabus
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* <!-- brands-block --> */}
          <Brands data={brandsData} moreData={moreBrandsData} custom_title={`We are trusted by these great brands`} />

          {/* <!-- business-plan --> */}
          <div className="business-plan">
            <div className="caption">
              <h2>
                Empower your team <strong>with our Business Plan</strong>
              </h2>
              <span>Build Skills | Track Performance | Create Experts</span>
            </div>
            <div className="price-block">
              <label>For more than 5 Users at</label>
              <div className="price">
                US $149<span>/user/year</span>
              </div>
            </div>
            <a className="btn btn-more" href="https://business.whizlabs.com/">
              Know More<i className="icon icon-font-arrow-right"></i>
            </a>
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

        {/* <!-- testimonial-block --> */}
        <Testimonials data={testimonialsData} />

        <ContactUsAction />
      </div>
    </>
  );
};

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

export async function getServerSideProps(context) {
  const { link: comboOfferLink } = context.params;

  const seoHomePageData = {
    seoPageType: "pricingPage", // Updated to reflect the actual page type
    title: "Most Affordable Subscription Plans - Whizlabs",
    metaTags: [
      {
        name: "facebook-domain-verification",
        property: "",
        content: "twh401qzi7r7o3n227q4sg3hghbpzh",
      },
      {
        name: "robots",
        content: "noindex,nofollow",
      },
      {
        name: "description",
        property: "",
        content:
          "We offer most affordable subscription plans for your convenience. Enrol now and take a step ahead to level up your career!",
      },
      { name: "", property: "og:locale", content: "en_US" },
      { name: "", property: "og:type", content: "website" },
      {
        name: "",
        property: "og:title",
        content: "Most Affordable Subscription Plans - Whizlabs",
      },
      {
        name: "",
        property: "og:description",
        content:
          "We offer most affordable subscription plans for your convenience. Enrol now and take a step ahead to level up your career!",
      },
      { name: "", property: "og:url", content: "https://www.whizlabs.com/pricing/" },
      { name: "", property: "og:site_name", content: "Whizlabs" },
      {
        name: "",
        property: "og:image",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60b50e7ed1751",
      },
      { name: "", property: "fb:app_id", content: "502194103558420" },
      { name: "twitter:card", property: "", content: "summary" },
      {
        name: "twitter:description",
        property: "",
        content:
          "We offer most affordable subscription plans for your convenience. Enrol now and take a step ahead to level up your career!",
      },
      { name: "twitter:title", property: "", content: "Most Affordable Subscription Plans - Whizlabs" },
      { name: "twitter:site", property: "", content: "@whizlabs" },
      {
        name: "twitter:image",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60b50e7ed1795",
      },
      { name: "twitter:creator", property: "", content: "@whizlabs" },
    ],
  };   

  const cookie = context.req.headers.cookie;
  const decoded = decodeURIComponent(cookie);
  const split1 = decoded.split("userData=")[1];
  let subsData = [];

  let userToken = null;
  if (split1) {
    const split2 = split1.split(";")[0];
    const parsed = split2 ? JSON.parse(split2) : null;
    userToken = parsed ? parsed.data.token : null;
  }

  let profile = null;

  if (userToken) {
    const profileResp = await axios.get(baseUrl + "/users/profile", {
      headers: { Authorization: userToken },
    });
    profile = profileResp.data.data;
  }

  let testResp = await axios.get(baseUrl + "/users/testimonials");

  let subscriptionResp = await axios.get(
    baseUrl + "/subscription/plans?public_link=" + comboOfferLink
  );

  subsData.push(subscriptionResp?.data?.data[0] || []);



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

  return {
    props: {
      profile: profile,
      subscriptionData: subsData,
      testimonialsData: testResp.data.data,
      brandsData: brandsData,
      moreBrandsData: moreBrandsData,
      seoHomePageData,
    }, // will be passed to the page component as props
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
