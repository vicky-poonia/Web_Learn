import { Accordions, ContactUsAction, Testimonials } from "@/components/import";
import axios from "axios";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { addSubscription } from "redux/AddToCart/cart-actions";
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
}) => {
  const [currentPlan, setCurrentPlan] = useState(null);
  const [buttonActive, setButtonActive] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    if (userData && userData.data && userData.data.user_id) {
      if (localStorage) {
        const togo = localStorage.getItem("togo");
        if (togo === "true") {
          localStorage.setItem("togo", "false");
          router.push("/pricing/checkout");
        }
      }
    }
  }, [userData]);

  const faqData = [
    {
      question: `Is $199 per year worth for your annual subscription?`,
      answer: `  <p>
        Absolutely. You gain access to 200+ courses across cloud, big data,
        devops, cybersecurity, project management, agile development,
        microsoft power platform etc. All our courses are designed by
        experienced professionals, we have a highly engaged and supportive
        community of practitioners to enhance your learning experience.
        Whizlabs is a popular e-learning platform and we have 2 million+
        active users.
      </p>`,
    },
    {
      question: `How is whizlabs Subscription different?`,
      answer: `  <p>Here are few differentiators as compared to available options.</p>
      <ol>
        <li>
          All our courses are always kept up to date, we update the courses
          regularly, even for a small change in certification curriculum.
        </li>
        <li>
          Our trainers are handpicked and selected by a panel of experts
        </li>
        <li>
          We offer a continuous support to our subscription customers which
          includes support by our team of experts, trainers and an engaged
          community
        </li>
        <li>
          There is no hidden cost; only one price for all courses. 100%
          access.
        </li>
      </ol>`,
    },
    {
      question: `How frequently do you update your courses?`,
      answer: `<p>
      Our courses are regularly updated even to reflect a smallest change in
      the certification curriculum. We take feedback from each participant
      who studies and takes a certification exam. The feedback is analyzed
      and included in the course material.
    </p>`,
    },
    {
      question: `Do I have access to all courses?`,
      answer: `<p>Yes. You will have access to all courses. </p>`,
    },
    {
      question: `Who are your training providers?`,
      answer: `<p>
      Our trainers are handpicked from industry expert professionals after a
      rigorous technical assessment. In order to become a trainer with
      whizlabs, a professional should have a proven track record of success
      in his area of expertise, a good communication skill and a strong
      commitment to give back to the community.
    </p>`,
    },
    {
      question: `How many labs can I access?`,
      answer: `  <p>
      As part of this course, you will have access to the cloud labs
      provided by whizlabs.
    </p>`,
    },
    {
      question: `What is your refund policy?`,
      answer: `<p>
      Our aim is to deliver a superior experience to our customers. In case
      you are not satisfied with the product, you can ask for a refund
      within 7 days of the purchase, for more information, please refer to
      the detailed <a href="/refund-policy">refund policy</a>.
    </p>`,
    },
  ];

  return (
    <>
      <Head>
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
      </Head>
      <div id="content-area" className="subscription-page">
        <div className="gradient-block">
          <div className="container">
            <div className="plans-block">
              <div className="heading">
                <h1>Technology skill development plans & pricing</h1>
                <p
                  style={{
                    fontSize: "2em",
                    width: "100%",
                    color: "#ec4834",
                    fontWeight: 400,
                  }}
                >
                  Most Affordable Learning Subscription, Save upto $1200 Annually
                </p>
                <span>Enroll now and take a step ahead to level up your career!</span>
              </div>
              <div className="choose-plans">
                <div className="block-group">
                  <div className="plan-toggle">
                    <span>Choose your Subscription plan</span>
                    <div className="toggle" style={{ display: "none" }}>
                      {/* <span>Monthly</span>
                      <span className="active">Yearly</span> */}
                    </div>
                  </div>
                  <div className="inner-block">
                    {subscriptionData.map((item) => (
                      <div className="block" key={item.id}>
                        <div className="head">
                          <div className="left">
                            <span>{item.title}</span>
                            <hr />
                          </div>
                          <div className="right"></div>
                        </div>
                        <div className="price-block">
                          <del className="old-price">US ${item.price.usd}</del>
                          <span className="price">US ${item.offer_price.usd}</span>
                        </div>
                        <ul>
                          <li className={"active"}>Unlimited access to all Video Course</li>
                          <li className={"active"}>Unlimited access to all Practice Tests</li>
                          <li className={item.is_unlimited_access_lab ? "active" : ""}>
                            Unlimited access to Hands-on-Labs
                          </li>
                          <li className={"active"}>
                            Accessed on PC, Mac, iPhone®, iPad®,Android™ Device
                          </li>
                          <li className={item.is_premium_support ? "active" : ""}>
                            Premium Support
                          </li>
                        </ul>
                        <a
                          role="button"
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
                          {/* {(currentPlan && currentPlan.plan_id === item.id)
          ? "Active"
          : "Upgrade Now"} */}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="block premium">
                  <div className="block-title">
                    Business
                    <br /> Plan for Team<span>For more than 5 Users</span>
                  </div>
                  <hr />
                  <div className="mid-content">
                    <p>
                      At an annual subscription of <strong>US $99</strong> per user per year
                    </p>
                  </div>
                  <a
                    className="btn btn-knowmore"
                    target="_blank"
                    href="https://business.whizlabs.com/"
                  >
                    Know More
                  </a>
                </div>
              </div>
            </div>
            <div className="brands-block">
              <div className="title">We help grow these great brands</div>
              <div className="brand-logoes">
                <figure>
                  <img className="img-full" src="/images/logo-accenture2x.png" alt="accenture" />
                </figure>
                <figure>
                  <img className="img-full" src="/images/logo-infosys2x.png" alt="infosys" />
                </figure>
                <figure>
                  <img className="img-full" src="/images/logo-campgemni2x.png" alt="campgemni" />
                </figure>
                <figure>
                  <img className="img-full" src="/images/logo-deloitte2x.png" alt="deloitte" />
                </figure>
                <figure>
                  <img className="img-full" src="/images/logo-cisco2x.png" alt="cisco" />
                </figure>
                {/* <figure>
                  <img className="img-full" src="/images/logo-bloomberge2x.png" alt="bloomberge" />
                </figure> */}
              </div>
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
  const link = context.params;

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

  let testResp = null;
  let subscriptionResp = null;
  try {
    testResp = await axios.get(baseUrl + "/users/testimonials");
    subscriptionResp = await axios.get(baseUrl + "/subscription/plans");
  } catch (e) {
    console.error(e);
  }

  return {
    props: {
      profile: profile,
      subscriptionData: subscriptionResp?.data?.data,
      testimonialsData: testResp?.data?.data,
    }, // will be passed to the page component as props
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
