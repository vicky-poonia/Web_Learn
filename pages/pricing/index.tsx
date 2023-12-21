import { Accordions, ContactUsAction, Testimonials, Brands } from "@/components/import";
import axios from "axios";
import { connect } from "react-redux";
import router, { useRouter } from "next/router";
import React, { useState, useEffect, useCallback } from "react";
import { addSubscription } from "../../redux/AddToCart/cart-actions";
import Head from "next/head";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { updateRedirection } from "redux/Redirection/redirect-actions";
import LabsData from "./data.json";
import AccordianPricing from "@/components/shared/Accordian-pricingfaq";
import VideoReview from "./videoreview";
import { SortRounded } from "@material-ui/icons";

const faqanswer = `<p>Yes, whizlabs does have an app for both iOS and Android devices. You can find it in the <a href="https://play.google.com/store/apps/details?id=learning.app.whizlabs&hl=en&gl=US" target="_blank">Google Play Store</a> or the <a href="https://apps.apple.com/us/app/whizlabs/id1631714050?ign-itscg=30200&ign-itsct=apps_box_link" target="_blank">Apple App Store.</a> With the Whizlabs app, you can access your courses and practice tests, track your progress, and get personalized recommendations.</p>`;
const Subscription = ({
  profile,
  userData,
  subscriptionData,
  testimonialsData,
  brandsData,
  moreBrandsData,
  addSubscriptionToState,
  redirectionAction,
  redirectTo,
  user_type,
  timerState,
  seoHomePageData,
}) => {
  const router = useRouter();
  const [planType, setPlanType] = useState(1); // 1 - yearly plan, 0 - monthly plan
  const [monthlyPlans, setMonthlyPlans] = useState([]);
  const [yearlyPlans, setYearlyPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [buttonActive, setButtonActive] = useState(false);
  const [expanded, setExpanded] = useState("panel0");
  const [y, setY] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // useEffect(() => {
  //   var mybutton = document.getElementById("myBtn");
  //   window.onscroll = function () {
  //     scrollFunction();
  //   };

  //   function scrollFunction() {
  //     if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
  //       mybutton.style.display = "block";
  //     } else {
  //       mybutton.style.display = "none";
  //     }
  //   }
  // }, []);
  // useEffect(()=>{
  //   if(user_type){
  //     if(user_type == "amazon")
  //     {
  //       router.push('/amazon/employees')
  //     }
  //   }
  // },[])
  // console.log(subscriptionData)
  useEffect(() => {
    if (subscriptionData) {
      let oneMonthplans = subscriptionData
        .filter((Itm) => Itm.subscription_for === 1)
        ?.sort((a, b) => a.order_by - b.order_by);
      let oneYearPlans = subscriptionData
        .filter((Itm) => Itm.subscription_for === 12)
        ?.sort((a, b) => a.order_by - b.order_by);
      setMonthlyPlans(oneMonthplans);
      setYearlyPlans(oneYearPlans);
    }
  }, [subscriptionData]);

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

  // setting plan type as per user subscription
  useEffect(()=>{
    if(currentPlan && currentPlan !== null){
      setPlanType(currentPlan.plan.subscription_for === 12 ? 1 : 0)
    }
  },[currentPlan])

  const openCheckoutPage = (subscription) => {
    setButtonActive(true);
    addSubscriptionToState(subscription); // add datas to state
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

  const handleScroll = useCallback(
    (e) => {
      const window = e.currentTarget;
      if (y > window.scrollY) {
        setIsActive(false);
      } else if (y < window.scrollY) {
        setIsActive(true);
      }
      setY(window.scrollY);
    },
    [y]
  );

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const faqData = [
    {
      question: `How is Whizlabs subscription different?`,
      answer: `Here are a few differentiators as compared to the other available options.
      <ul>
      <li>All our courses are always kept up-to-date. We update the courses timely, even for a small change in the certification curriculum</li>
      <li>Our trainers are handpicked and selected by a panel of industry experts</li>
      <li>We offer 24x7 support to our subscription users which includes support by our team of experts, trainers, and an engaged community</li>
      </ul>`,
    },
    {
      question: `How frequently do you update your content?`,
      answer: `<p>Our courses are timely and frequently updated, even to reflect the smallest change in the official certification curriculum. We take feedback from each learner who studies and takes a certification exam using our training material. The feedback is analyzed and included in the course material on a regular basis.</p>`,
    },
    {
      question: `Would I have access to all courses?`,
      answer: `Of course! When we say ALL, it means you will actually have access to the entire Whizlabs learning platform. Not just the existing courses, you will also be able to access all our future courses that will be launched during your subscription duration.`,
    },
    {
      question: `Does whizlabs have an app?`,
      answer: `${faqanswer}`,
    },
    {
      question: `Who are your training providers?`,
      answer: `Our trainers are handpicked from industry experts after a rigorous technical assessment. In order to become a trainer with whizlabs, a professional should have a proven track record of success in his area of expertise, good communication skills, and a strong commitment to give back to the community.`,
    },
    {
      question: `How many Hands-On Labs would I be able to access?`,
      answer: `Being a Premium Subscription user, you will have access to all the Hands-On Labs for courses provided by Whizlabs.`,
    },
    {
      question: `What is your refund policy?`,
      answer: `Our aim is to deliver a superior experience to our customers. In case you are not satisfied with the product, you can ask for a refund within 7 days of the purchase, for more information, please refer to the detailed <a href="/refund-policy">refund policy</a>`,
    },
  ];

  // const topFunction = () => {
  //   document.body.scrollTop = 0;
  //   document.documentElement.scrollTop = 0;
  // };
  let color_type = ["rgb(208, 82, 120)", "rgb(124, 16, 209)"];
  let course_type = [
    ["Practice Test", "Videos", "Hands-on Labs"],
    ["Includes Everything in Premium", "Sandboxes"],
  ];
  // console.log(monthlyPlans, yearlyPlans);
  return (
    <>
      {/* <Head>
        <title>Plans &amp; Pricing - Whizlabs</title>
        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
        <meta
          name="description"
          content="We offer most affordable subscription plans for your convenience. Enrol now and take a step ahead to level up your career!"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Plans &amp; Pricing - Whizlabs" />
        <meta
          property="og:description"
          content="We offer most affordable subscription plans for your convenience. Enrol now and take a step ahead to level up your career!"
        />
        <meta property="og:url" content="https://www.whizlabs.com/pricing/" />
        <meta property="og:site_name" content="Whizlabs" />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}2022/07/pricing-new.webp`}
        />
        <meta property="fb:app_id" content="502194103558420" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="We offer most affordable subscription plans for your convenience. Enrol now and take a step ahead to level up your career!"
        />
        <meta name="twitter:title" content="Plans &amp; Pricing - Whizlabs" />
        <meta name="twitter:site" content="@whizlabs" />
        <meta
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}2022/07/pricing-new.webp`}
        />
        <meta name="twitter:creator" content="@whizlabs" />
      </Head> */}
      {/* <button
        style={{ marginBottom: "80px" }}
        className="btn-go-back"
        id="myBtn"
        onClick={() => topFunction()}
      >
        Go back to Pricing
      </button> */}
      <div id="content-area" className="subscription-page">
        <div className="banner-pricing" id="back-top">
          <div className="container">
            <div className="caption">
              <h1>Start Learning Smarter</h1>
              <p>Save BIG with our Premium Subscriptions</p>
            </div>
          </div>
        </div>

        <div className="choose-plans">
          <div className={`block-group ${planType === 0 ? "monthly-plan" : "yearly-plan"}`}>
            <div className="plan-toggle">
              <div className="toggle">
                {monthlyPlans.length > 0 && (
                  <span className={planType === 0 && "active"} onClick={(e) => setPlanType(0)}>
                    {" "}
                    Monthly
                  </span>
                )}
                {yearlyPlans.length > 0 && (
                  <label className={planType === 1 && "active"} onClick={(e) => setPlanType(1)}>
                    Yearly
                    <small>Save Up to 50%</small>
                  </label>
                )}
              </div>
            </div>

            {/* <!-- pricing-block --> */}
            {planType === 0 && (
              <div className="pricing-block plan plan-1">
                <div className="container">
                  <table>
                    <thead>
                      <tr>
                        <th className="features-section">
                          <div className="title">
                            Choose the best plan for your upskilling goals
                          </div>
                        </th>
                        {monthlyPlans.length > 0 &&
                          monthlyPlans.map((monthlyPlan, idx) => {
                            return (
                              <th
                                key={`${monthlyPlan.id}-pbpm`}
                                className={
                                  idx === 0
                                    ? "standard-section border-right-std"
                                    : "premium-section boder-pre-down"
                                }
                              >
                                {idx === 2 && (
                                  <>
                                    <div className="period-offer" style={{ display: "none" }}>
                                      Limited Period Offer!
                                      <figure className="arrow-img">
                                        <img className="img-full" src="/images/down-arrows.webp" />
                                      </figure>
                                    </div>
                                  </>
                                )}
                                {idx == 1 && <div className="popular-label">Popular Choice</div>}
                                <div className="plan-type">{monthlyPlan.title}</div>

                                {/* {idx === 0 && <div className="title">Get Certified</div>} */}
                                {idx === 0 && <div className="title">Become Expert</div>}
                                {idx === 1 && <div className="title">Attain Mastery</div>}

                                <div className="sub-title">{monthlyPlan.description}</div>
                                <hr />
                                <div className="class-global-height">
                                  {monthlyPlan.campaign_offer && timerState && (
                                    <>
                                      {" "}
                                      <div
                                        className="plan-type"
                                        style={{ fontSize: "40px", margin: "6px auto" }}
                                      >
                                        {
                                          monthlyPlan.campaign_offer?.campaign_details
                                            ?.discount_percent
                                        }
                                        % OFF
                                      </div>
                                    </>
                                  )}
                                  {/* <div className="super-saver" style={idx != 2? {boxShadow:"none",border:"none"}:{} }>
                                      {idx == 2 && <>
                                        <div className="enjoy-text">Enjoy</div>
                                      <div className="discount">20% OFF</div>
                                      <div className="coupon">Use this Coupon</div>
                                      <div className="coupon-txt">20PRWHIZ</div>
                                      </>}
                                    </div> */}
                                  {/* <div className="save-label">
                                    SAVE ${+monthlyPlan.price.usd - +monthlyPlan.offer_price.usd}
                                  </div> */}
                                  {/* style={{ color: "#9095A3", textDecoration: "line-through" }} */}

                                  <div
                                    className={
                                      monthlyPlan.campaign_offer
                                        ? "price-block"
                                        : "fixed-margin-pr price-block"
                                    }
                                  >
                                    {/* <del className="old-price">${monthlyPlan.price.usd}</del> */}
                                    <span
                                      className="price"
                                      style={
                                        monthlyPlan.campaign_offer && timerState
                                          ? { color: "#9095A3", textDecoration: "line-through" }
                                          : {}
                                      }
                                    >
                                      {monthlyPlan.campaign_offer ? (
                                        <>
                                          {monthlyPlan.campaign_offer?.campaign_details
                                            .calculation_based_on_regular == 0 ? (
                                            <>
                                              {" "}
                                              $
                                              {(
                                                monthlyPlan.offer_price.usd /
                                                monthlyPlan.subscription_for
                                              ).toFixed(2)}
                                            </>
                                          ) : (
                                            <>
                                              {" "}
                                              $
                                              {(
                                                monthlyPlan.price.usd / monthlyPlan.subscription_for
                                              ).toFixed(2)}
                                            </>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          $
                                          {(
                                            monthlyPlan.offer_price.usd /
                                            monthlyPlan.subscription_for
                                          ).toFixed(2)}
                                        </>
                                      )}
                                    </span>
                                    <div className="price-dis">
                                      per month
                                      <br />
                                      {/* <strong style={monthlyPlan.campaign_offer && timerState ?{textDecoration:"line-through"}:{}}>${monthlyPlan.offer_price.usd} </strong>
                                    <strong> billed quarterly</strong> */}
                                    </div>
                                  </div>

                                  {monthlyPlan.campaign_offer && timerState && (
                                    <>
                                      {" "}
                                      <div className="price-block">
                                        <span className="price" style={{ color: "#007CFF" }}>
                                          $
                                          {parseFloat(
                                            monthlyPlan.campaign_offer?.price.usd
                                          ).toFixed(2)}
                                        </span>
                                        <div className="price-dis" style={{ color: "#007CFF" }}>
                                          per month,
                                          <br />
                                          {monthlyPlan.campaign_offer?.campaign_details
                                            .calculation_based_on_regular == 1 ? (
                                            <strong style={{ color: "#007CFF" }}>
                                              ${monthlyPlan.campaign_offer?.price.usd} billed for
                                              the {monthlyPlan.subscription_for}
                                              <sup>st</sup> month, ${monthlyPlan.offer_price.usd}{" "}
                                              thereafter
                                            </strong>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                      </div>
                                    </>
                                  )}
                                  {/* {idx == 2 && (
                                  <>
                                    <div className="premiumplus_pricing">
                                      <span className="price">${monthlyPlan.offer_price.usd}</span>
                                      /Quarter
                                    </div>
                                    <div className="premiumplus_pricing-1">
                                      <span className="price">
                                        ${monthlyPlan.campaign_offer?.price.usd}
                                      </span>
                                      /Quarter
                                      <br />
                                      <strong style={{ color: "#007CFF" }}>
                                        ${monthlyPlan.campaign_offer?.price.usd} billed for the 1
                                        <sup>st</sup> quarter, ${monthlyPlan.offer_price.usd}{" "}
                                        thereafter
                                      </strong>
                                    </div>
                                  </>
                                )} */}
                                </div>
                                <a
                                  href="/pricing/checkout/"
                                  style={{
                                    color:
                                      currentPlan && currentPlan?.plan_id === monthlyPlan.id
                                        ? "#007cff"
                                        : "",
                                    background:
                                      currentPlan && currentPlan?.plan_id === monthlyPlan.id
                                        ? "#007cff47"
                                        : "",
                                    cursor: "pointer",
                                  }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    openCheckoutPage(monthlyPlan);
                                  }}
                                  className="btn btn-Buy"
                                >
                                  {currentPlan
                                    ? currentPlan.plan_id === monthlyPlan.id
                                      ? "Active"
                                      : +currentPlan.plan.offer_price.usd >
                                        +monthlyPlan.offer_price.usd
                                      ? "Downgrade Now"
                                      : "Upgrade Now"
                                    : "Buy Now"}
                                </a>
                              </th>
                            );
                          })}
                      </tr>
                    </thead>
                    <tbody>
                      {LabsData.map((data, idx) => (
                        <tr
                          className={`list-item ${data.special && " bg"}`}
                          key={data.title + `idx-1`}
                        >
                          <td
                            className={`features-section ${data.special && " bg"}`}
                            dangerouslySetInnerHTML={{ __html: data.title }}
                          ></td>

                          {/* removed due to standard plan removal  */}
                          {/* 
                          <td className={`free-section ${data.special && " bg"}`}>
                            <div className={`circle ${data.l1 && "active"}`}>
                              <figure>
                                <img
                                  className="img-full"
                                  src={`/images/${data.l1 ? "true" : "cross"}-sign.svg`}
                                />
                              </figure>
                            </div>
                          </td> */}
                          {/* removeal ends */}
                          <td
                            className={`standard-section ${data.special && " bg"} table-border-pr`}
                          >
                            <div className={`circle ${data.l2 && "active"}`}>
                              <figure>
                                <img
                                  className="img-full"
                                  src={`/images/${data.l2 ? "true" : "cross"}-sign.svg`}
                                />
                              </figure>
                            </div>
                          </td>
                          <td
                            className={`premium-section ${
                              data.special && " bg"
                            } index${idx} table-border-pr-1`}
                          >
                            <div className={`circle ${data.l3 && "active"}`}>
                              <figure>
                                <img
                                  className="img-full"
                                  src={`/images/${data.l3 ? "true" : "cross"}-sign.svg`}
                                />
                              </figure>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="pricing-respo monthlyplans">
                    <div className="block-group">
                      {monthlyPlans.length > 0 &&
                        monthlyPlans.map((monthlyPlan, idx) => {
                          return (
                            <>
                              <div
                                key={idx + `pricing-respo-monthlyplans`}
                                className={`
                            block ${idx === 0 ? "standard-section" : "premium-section"}
                          `}
                              >
                                {idx === 2 && (
                                  <>
                                    <div className="period-offer" style={{ display: "none" }}>
                                      Limited Period Offer!
                                      <figure className="arrow-img">
                                        <img className="img-full" src="/images/down-arrows.webp" />
                                      </figure>
                                    </div>
                                  </>
                                )}
                                <div className="heading">
                                  {monthlyPlans.length - 1 === idx && (
                                    <div className="popular-label">Popular Choice</div>
                                  )}
                                  <div className="plan-type">{monthlyPlan.title}</div>

                                  {/* {idx === 0 && <div className="title">Get Certified</div>} */}
                                  {idx === 0 && <div className="title">Become Expert</div>}
                                  {idx === 1 && <div className="title">Attain Mastery</div>}

                                  <div className="sub-title">{monthlyPlan.description}</div>
                                  <hr />
                                  {/* <div className="save-label">
                                SAVE ${+monthlyPlan.price.usd - +monthlyPlan.offer_price.usd}
                              </div> */}
                                  <div className="class-global-height">
                                    {monthlyPlan.campaign_offer && timerState && (
                                      <>
                                        {" "}
                                        <div
                                          className="plan-type"
                                          style={{ fontSize: "28px", margin: "6px auto" }}
                                        >
                                          {
                                            monthlyPlan.campaign_offer?.campaign_details
                                              ?.discount_percent
                                          }
                                          % OFF
                                        </div>
                                      </>
                                    )}
                                    {/* <div className="super-saver" style={idx != 2? {boxShadow:"none",border:"none",minHeight:"0px"}:{} }>
                                      {idx == 2 && <>
                                        <div className="enjoy-text">Enjoy</div>
                                      <div className="discount">20% OFF</div>
                                      <div className="coupon">Use this Coupon</div>
                                      <div className="coupon-txt">20PRWHIZ</div>
                                      </>}
                                    </div> */}
                                    {/* style={{ textDecoration: "line-through", color: "#A4AFBE" }} */}
                                    <div
                                      className={
                                        monthlyPlan.campaign_offer
                                          ? "price-block"
                                          : "fixed-margin-pr price-block"
                                      }
                                    >
                                      {/* <del className="old-price">${monthlyPlan.price.usd}</del> */}
                                      {/* style={{color:"#9095A3",textDecoration:"line-through"}} */}
                                      <span
                                        className="price"
                                        style={
                                          monthlyPlan.campaign_offer && timerState
                                            ? { color: "#9095A3", textDecoration: "line-through" }
                                            : {}
                                        }
                                      >
                                        {
                                          monthlyPlan.campaign_offer ?
                                          <>  {monthlyPlan.campaign_offer?.campaign_details
                                            .calculation_based_on_regular == 0 ? (
                                            <>
                                              $
                                              {(
                                                monthlyPlan.offer_price.usd /
                                                monthlyPlan.subscription_for
                                              ).toFixed(2)}
                                            </>
                                          ) : (
                                            <>
                                              $
                                              {(
                                                monthlyPlan.price.usd / monthlyPlan.subscription_for
                                              ).toFixed(2)}
                                            </>
                                          )}</>:
                                          <> $
                                          {(
                                            monthlyPlan.offer_price.usd / monthlyPlan.subscription_for
                                          ).toFixed(2)}</>
                                        }
                                      
                                      </span>
                                      <div className="price-dis">
                                        per month
                                        <br />
                                        {/* <strong style={monthlyPlan.campaign_offer && timerState ?{textDecoration:"line-through"}:{}}>${monthlyPlan.offer_price.usd} </strong>{" "}
                                      <strong>billed quarterly</strong> */}
                                      </div>
                                    </div>
                                    {monthlyPlan.campaign_offer && timerState && (
                                      <>
                                        <div className="price-block">
                                          <span className="price" style={{ color: "#007CFF" }}>
                                            $
                                            {(
                                              parseFloat(monthlyPlan.campaign_offer?.price.usd) /
                                              monthlyPlan.subscription_for
                                            ).toFixed(2)}
                                          </span>
                                          <div className="price-dis" style={{ color: "#007CFF" }}>
                                            per month,
                                            <br />
                                            {monthlyPlan.campaign_offer.campaign_details == 0 ? (
                                              <>
                                                <strong style={{ color: "#007CFF" }}>
                                                  ${monthlyPlan.campaign_offer?.price.usd} billed
                                                  for the
                                                  {monthlyPlan.subscription_for}
                                                  <sup>st</sup> quarter, $
                                                  {monthlyPlan.offer_price.usd} thereafter
                                                </strong>
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </div>
                                        </div>
                                      </>
                                    )}
                                    {/* {idx == 2 && (
                                    <>
                                      <div style={{ marginBottom: "10px" }}>
                                        <div style={{ color: "rgb(144, 149, 163)" }}>
                                          <span
                                            style={{
                                              fontSize: "22px",
                                              textDecoration: "line-through",
                                            }}
                                          >
                                            ${monthlyPlan.offer_price.usd}
                                          </span>
                                          /Quarter
                                        </div>
                                        <div style={{ color: "#037CF9" }}>
                                          <span style={{ fontSize: "28px", fontWeight: "500" }}>
                                            ${monthlyPlan.campaign_offer?.price.usd}
                                          </span>
                                          /Quarter
                                        </div>
                                        <strong style={{ color: "#007CFF" }}>
                                            ${monthlyPlan.campaign_offer?.price.usd} billed for the
                                            1<sup>st</sup> quarter, ${monthlyPlan.offer_price.usd}{" "}
                                            thereafter
                                          </strong>
                                      </div>
                                    </>
                                  )} */}
                                  </div>
                                  <a
                                    href="/pricing/checkout/"
                                    style={{
                                      color:
                                        currentPlan && currentPlan?.plan_id === monthlyPlan.id
                                          ? "#007cff"
                                          : "",
                                      background:
                                        currentPlan && currentPlan?.plan_id === monthlyPlan.id
                                          ? "#007cff47"
                                          : "",
                                      cursor: "pointer",
                                    }}
                                    onClick={(e) => {
                                      e.preventDefault();

                                      currentPlan && currentPlan?.plan_id === monthlyPlan.id
                                        ? disableButton()
                                        : openCheckoutPage(monthlyPlan);
                                    }}
                                    className="btn btn-Buy"
                                  >
                                    {currentPlan
                                      ? currentPlan.plan_id === monthlyPlan.id
                                        ? "Active"
                                        : +currentPlan.plan.offer_price.usd >
                                          +monthlyPlan.offer_price.usd
                                        ? "Downgrade Now"
                                        : "Upgrade Now"
                                      : "Buy Now"}
                                  </a>
                                </div>
                                {idx === 0 && (
                                  <ul>
                                    <li>
                                      <div className="text">
                                        <span>25,000+ Practice Questions</span>
                                      </div>
                                      <div className={`circle active`}>
                                        <figure>
                                          <img className="img-full" src="/images/true-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="text">
                                        <span>4,500+ Training Videos</span>
                                      </div>
                                      <div className={`circle active`}>
                                        <figure>
                                          <img className="img-full" src="/images/true-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="text">
                                        <span>Latest Updates to Practice Tests</span>
                                      </div>
                                      <div className={`circle active`}>
                                        <figure>
                                          <img className="img-full" src="/images/true-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="text">
                                        <span>Latest Updates to Video Courses</span>
                                      </div>
                                      <div className={`circle active`}>
                                        <figure>
                                          <img className="img-full" src="/images/true-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="text">
                                        <span>Progress Tracker</span>
                                      </div>
                                      <div className={`circle active`}>
                                        <figure>
                                          <img className="img-full" src="/images/true-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="text">
                                        <span>Detailed Performance Reports</span>
                                      </div>
                                      <div className={`circle active`}>
                                        <figure>
                                          <img className="img-full" src="/images/true-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="text">
                                        <span>Access to Expert Webinars</span>
                                      </div>
                                      <div className={`circle active`}>
                                        <figure>
                                          <img className="img-full" src="/images/true-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="text">
                                        <span>Course Completion Certificates</span>
                                      </div>
                                      <div className={`circle active`}>
                                        <figure>
                                          <img className="img-full" src="/images/true-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="text">
                                        <span>24x7 Tech Support</span>
                                      </div>
                                      <div className={`circle active`}>
                                        <figure>
                                          <img className="img-full" src="/images/true-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                    <li className="bg">
                                      <div className="text">
                                        <span>Labs Integrated with training content</span>
                                      </div>
                                      <div className={`circle active`}>
                                        <figure>
                                          <img className="img-full" src="/images/true-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                    <li className="bg">
                                      <div className="text">
                                        <span>750+ Guided Hands-on Labs</span>
                                      </div>
                                      <div className={`circle active`}>
                                        <figure>
                                          <img className="img-full" src="/images/true-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                    <li className="bg">
                                      <div className="text">
                                        <span>Test Your Cloud Skills</span>
                                      </div>
                                      <div className={`circle active`}>
                                        <figure>
                                          <img className="img-full" src="/images/true-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                    <li className="bg">
                                      <div className="text">
                                        <span>
                                          Projects
                                          <small>
                                            Detailed Case Studies and Scenarios Simulating Real-Time
                                            Cloud Infrastructures and Applications.
                                          </small>
                                        </span>
                                      </div>
                                      <div className={`circle`}>
                                        <figure>
                                          <img className="img-full" src="/images/cross-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                    <li className="bg">
                                      <div className="text">
                                        <span>
                                          Cloud Sandboxes{" "}
                                          <small>
                                            AWS, Azure, Google Cloud, Power Platform, Python etc...
                                          </small>
                                        </span>
                                      </div>
                                      <div className={`circle`}>
                                        <figure>
                                          <img className="img-full" src="/images/cross-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                  </ul>
                                )}
                                {idx === 1 && (
                                  <ul>
                                    <li>
                                      <div className="text">
                                        <span>25,000+ Practice Questions</span>
                                      </div>
                                      <div className={`circle active`}>
                                        <figure>
                                          <img className="img-full" src="/images/true-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="text">
                                        <span>4,500+ Training Videos</span>
                                      </div>
                                      <div className={`circle active`}>
                                        <figure>
                                          <img className="img-full" src="/images/true-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="text">
                                        <span>Latest Updates to Practice Tests</span>
                                      </div>
                                      <div className={`circle active`}>
                                        <figure>
                                          <img className="img-full" src="/images/true-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="text">
                                        <span>Latest Updates to Video Courses</span>
                                      </div>
                                      <div className={`circle active`}>
                                        <figure>
                                          <img className="img-full" src="/images/true-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="text">
                                        <span>Progress Tracker</span>
                                      </div>
                                      <div className={`circle active`}>
                                        <figure>
                                          <img className="img-full" src="/images/true-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="text">
                                        <span>Detailed Performance Reports</span>
                                      </div>
                                      <div className={`circle active`}>
                                        <figure>
                                          <img className="img-full" src="/images/true-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="text">
                                        <span>Access to Expert Webinars</span>
                                      </div>
                                      <div className={`circle active`}>
                                        <figure>
                                          <img className="img-full" src="/images/true-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="text">
                                        <span>Course Completion Certificates</span>
                                      </div>
                                      <div className={`circle active`}>
                                        <figure>
                                          <img className="img-full" src="/images/true-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="text">
                                        <span>24x7 Tech Support</span>
                                      </div>
                                      <div className={`circle active`}>
                                        <figure>
                                          <img className="img-full" src="/images/true-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                    <li className="bg">
                                      <div className="text">
                                        <span>Labs Integrated with training content</span>
                                      </div>
                                      <div className={`circle active`}>
                                        <figure>
                                          <img className="img-full" src="/images/true-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                    <li className="bg">
                                      <div className="text">
                                        <span>750+ Guided Hands-on Labs</span>
                                      </div>
                                      <div className={`circle active`}>
                                        <figure>
                                          <img className="img-full" src="/images/true-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                    <li className="bg">
                                      <div className="text">
                                        <span>Test Your Cloud Skills</span>
                                      </div>
                                      <div className={`circle active`}>
                                        <figure>
                                          <img className="img-full" src="/images/true-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                    <li className="bg">
                                      <div className="text">
                                        <span>
                                          Projects
                                          <small>
                                            Detailed Case Studies and Scenarios Simulating Real-Time
                                            Cloud Infrastructures and Applications.
                                          </small>
                                        </span>
                                      </div>
                                      <div className={`circle active`}>
                                        <figure>
                                          <img className="img-full" src="/images/true-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                    <li className="bg">
                                      <div className="text">
                                        <span>
                                          Cloud Sandboxes{" "}
                                          <small>
                                            AWS, Azure, Google Cloud, Power Platform, Python etc...
                                          </small>
                                        </span>
                                      </div>
                                      <div className={`circle active`}>
                                        <figure>
                                          <img className="img-full" src="/images/true-sign.svg" />
                                        </figure>
                                      </div>
                                    </li>
                                  </ul>
                                )}
                              </div>
                            </>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* <!-- pricing-block --> */}
            {planType === 1 && (
              <div className="pricing-block plan plan-2">
                <div className="container">
                  <table>
                    <thead>
                      <tr>
                        <th className="features-section">
                          <div className="title">
                            Choose the best plan for your upskilling goals
                          </div>
                        </th>
                        {yearlyPlans.length > 0 &&
                          yearlyPlans.map((yearlyPlan, idx) => {
                            return (
                              <th
                                key={`${yearlyPlan.id}-pbpy`}
                                className={
                                  idx === 0
                                    ? "standard-section border-right-std"
                                    : "premium-section"
                                }
                              >
                                {idx === 2 && (
                                  <>
                                    <div className="period-offer" style={{ display: "none" }}>
                                      Limited Period Offer!
                                      <figure className="arrow-img arr-adj-desks">
                                        <img className="img-full" src="/images/down-arrows.webp" />
                                      </figure>
                                    </div>
                                  </>
                                )}
                                {yearlyPlans.length - 1 === idx && (
                                  <div className="popular-label">Popular Choice</div>
                                )}
                                <div className="plan-type">{yearlyPlan.title}</div>

                                {/* {idx === 0 && <div className="title">Get Certified</div>} */}
                                {idx === 0 && <div className="title">Become Expert</div>}
                                {idx === 1 && <div className="title">Attain Mastery</div>}

                                <div className="sub-title">{yearlyPlan.description}</div>
                                <hr />
                                {/* {yearlyPlan.campaign_offer && timerState ? (
                                  <>
                                    <div className="save-label">
                                     
                                      SAVE $
                                      {monthlyPlans[idx].campaign_offer ? (
                                        <>
                                          {(
                                            monthlyPlans[idx].campaign_offer.price.usd * 12 -
                                            +yearlyPlan.campaign_offer.price.usd
                                          ).toFixed(2)}
                                        </>
                                      ) : (
                                        <>
                                          {(
                                            monthlyPlans[idx].offer_price.usd * 12 -
                                            +yearlyPlan.campaign_offer.price.usd
                                          ).toFixed(2)}
                                        </>
                                      )}
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="save-label">
                                    
                                      SAVE $
                                      {(
                                        monthlyPlans[idx].offer_price.usd * 12 -
                                        +yearlyPlan.offer_price.usd
                                      ).toFixed(2)}
                                    </div>
                                  </>
                                )} */}
                                <div className="class-global-height">
                                  {yearlyPlan.campaign_offer && timerState && (
                                    <>
                                      {" "}
                                      <div
                                        className="plan-type"
                                        style={{
                                          color: "#007CFF",
                                          fontSize: "40px",
                                          margin: "6px auto",
                                        }}
                                      >
                                        {" "}
                                        {`${yearlyPlan.campaign_offer.campaign_details.discount_percent}%`}
                                        OFF
                                      </div>
                                    </>
                                  )}

                                  {/* <div className="super-saver" style={idx != 2? {boxShadow:"none",border:"none"}:{} }>
                                      {idx == 2 && <>
                                        <div className="enjoy-text">Enjoy</div>
                                      <div className="discount">20% OFF</div>
                                      <div className="coupon">Use this Coupon</div>
                                      <div className="coupon-txt">20PRWHIZ</div>
                                      </>}
                                    </div> */}
                                  {
                                    <>
                                      <div
                                        className={
                                          yearlyPlan.campaign_offer
                                            ? "price-block"
                                            : "fixed-margin-pr-pl price-block"
                                        }
                                      >
                                        {/* <del className="old-price">${yearlyPlan.price.usd}</del> */}
                                        <span
                                          className="price"
                                          style={
                                            yearlyPlan.campaign_offer && timerState
                                              ? { color: "#9095A3", textDecoration: "line-through" }
                                              : {}
                                          }
                                        >
                                          {yearlyPlan.campaign_offer ? (
                                            <>
                                              {yearlyPlan.campaign_offer?.campaign_details
                                                .calculation_based_on_regular == 0 ? (
                                                <>${(yearlyPlan.offer_price.usd / 12).toFixed(2)}</>
                                              ) : (
                                                <>${(yearlyPlan.price.usd / 12).toFixed(2)}</>
                                              )}
                                            </>
                                          ) : (
                                            <>${(yearlyPlan.offer_price.usd / 12).toFixed(2)}</>
                                          )}
                                        </span>
                                        <div className="price-dis">
                                          per month,
                                          <br />
                                          <strong
                                            style={
                                              yearlyPlan.campaign_offer && timerState
                                                ? { textDecoration: "line-through" }
                                                : {}
                                            }
                                          >
                                            {yearlyPlan.campaign_offer ? (
                                              <>
                                                {yearlyPlan.campaign_offer?.campaign_details
                                                  .calculation_based_on_regular == 0 ? (
                                                  <>${yearlyPlan.offer_price.usd}</>
                                                ) : (
                                                  <>${yearlyPlan.price.usd}</>
                                                )}
                                              </>
                                            ) : (
                                              <>${yearlyPlan.offer_price.usd}</>
                                            )}
                                          </strong>
                                          <strong> billed yearly</strong>
                                        </div>
                                      </div>
                                    </>
                                  }

                                  {yearlyPlan.campaign_offer && timerState && (
                                    <>
                                      <div
                                        className="price-block"
                                        style={idx == 2 ? { marginTop: "43px" } : {}}
                                      >
                                        <span
                                          className="price"
                                          style={
                                            idx != 2
                                              ? { color: "#007CFF" }
                                              : { color: "rgb(245, 124, 0)" }
                                          }
                                        >
                                          {idx != 2 ? (
                                            <>
                                              {" "}
                                              $
                                              {(
                                                parseFloat(yearlyPlan.campaign_offer.price.usd) / 12
                                              ).toFixed(2)}
                                            </>
                                          ) : (
                                            <>${yearlyPlan.campaign_offer.price.usd}</>
                                          )}
                                        </span>
                                        <div
                                          className="price-dis"
                                          style={
                                            idx != 2
                                              ? { color: "#007CFF" }
                                              : { color: "rgb(245, 124, 0)" }
                                          }
                                        >
                                          {idx != 2 ? <> per month,</> : <>per year,</>}
                                          <br />
                                          {yearlyPlan.campaign_offer.campaign_details
                                            .calculation_based_on_regular == 1 ? (
                                            <>
                                              <strong
                                                style={
                                                  idx != 2
                                                    ? { color: "#007CFF" }
                                                    : { color: "rgb(245, 124, 0)" }
                                                }
                                              >
                                                ${yearlyPlan.campaign_offer.price.usd} billed for
                                                the 1<sup>st</sup> year
                                                {/* $ {yearlyPlan.offer_price.usd} thereafter */}
                                              </strong>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                                <a
                                  href="/pricing/checkout/"
                                  style={{
                                    color:
                                      currentPlan && currentPlan?.plan_id === yearlyPlan.id
                                        ? "#007cff"
                                        : "",
                                    background:
                                      currentPlan && currentPlan?.plan_id === yearlyPlan.id
                                        ? "#007cff47"
                                        : "",
                                    cursor: "pointer",
                                  }}
                                  onClick={(e) => {
                                    e.preventDefault();

                                    currentPlan && currentPlan?.plan_id === yearlyPlan.id
                                      ? disableButton()
                                      : openCheckoutPage(yearlyPlan);
                                  }}
                                  className="btn btn-Buy"
                                >
                                  {currentPlan
                                    ? currentPlan.plan_id === yearlyPlan.id
                                      ? "Active"
                                      : +currentPlan.plan.offer_price.usd >
                                        +yearlyPlan.offer_price.usd
                                      ? "Downgrade Now"
                                      : "Upgrade Now"
                                    : "Buy Now"}
                                </a>
                              </th>
                            );
                          })}
                      </tr>
                    </thead>
                    <tbody>
                      {LabsData.map((data, idx) => (
                        <tr className="list-item border-pre-mix" key={data.title + `idx-1`}>
                          <td
                            className={`features-section ${data.special && " bg"}`}
                            dangerouslySetInnerHTML={{ __html: data.title }}
                          ></td>

                          {/* <td className={`free-section ${data.special && " bg"}`}>
                            <div className={`circle ${data.l1 && "active"}`}>
                              <figure>
                                <img
                                  className="img-full"
                                  src={`/images/${data.l1 ? "true" : "cross"}-sign.svg`}
                                />
                              </figure>
                            </div>
                          </td> */}
                          <td
                            className={`standard-section ${data.special && " bg"}  table-border-pr`}
                          >
                            <div className={`circle ${data.l2 && "active"}`}>
                              <figure>
                                <img
                                  className="img-full"
                                  src={`/images/${data.l2 ? "true" : "cross"}-sign.svg`}
                                />
                              </figure>
                            </div>
                          </td>
                          <td
                            className={`premium-section ${
                              data.special && " bg"
                            } table-border-pr-1 index${idx}`}
                          >
                            <div className={`circle ${data.l3 && "active"}`}>
                              <figure>
                                <img
                                  className="img-full"
                                  src={`/images/${data.l3 ? "true" : "cross"}-sign.svg`}
                                />
                              </figure>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="pricing-respo yearlyplans">
                    <div className="block-group">
                      {yearlyPlans.length > 0 &&
                        yearlyPlans.map((yearlyPlan, idx) => (
                          <div
                            key={idx + `pricing-respo-yearlyplans`}
                            className={`
                            block ${idx === 0 ? "standard-section" : "premium-section"}
                          `}
                          >
                            {idx === 2 && (
                              <>
                                <div className="period-offer" style={{ display: "none" }}>
                                  Limited Period Offer!
                                  <figure className="arrow-img arrow-adj">
                                    <img className="img-full" src="/images/down-arrows.webp" />
                                  </figure>
                                </div>
                              </>
                            )}
                            <div className="heading">
                              {yearlyPlans.length - 1 === idx && (
                                <div className="popular-label">Popular Choice</div>
                              )}
                              <div className="plan-type">{yearlyPlan.title}</div>

                              {/* {idx === 0 && <div className="title">Get Certified</div>} */}
                              {idx === 0 && <div className="title">Become Expert</div>}
                              {idx === 1 && <div className="title">Attain Mastery</div>}
                              {/* <div className="title">{yearlyPlan.title}</div> */}
                              <div className="sub-title">{yearlyPlan.description}</div>
                              <hr />
                              {/* {
                                  yearlyPlan.campaign_offer && timerState ? <>
                                  <div className="save-label">
                                  SAVE $
                                  {
                                    monthlyPlans[idx].campaign_offer ? <>
                                      {(
                                    monthlyPlans[idx].campaign_offer.price.usd * 12 -
                                    +yearlyPlan.campaign_offer.price.usd
                                  ).toFixed(2)}
                                    </> : <>
                                    {(
                                    monthlyPlans[idx].offer_price.usd * 12 -
                                    +yearlyPlan.campaign_offer.price.usd
                                  ).toFixed(2)}
                                    </>
                                  }
                                </div>
                                  </>:<>
                                  <div className="save-label">
                                  SAVE $
                                  {(
                                    monthlyPlans[idx].offer_price.usd * 12 -
                                    +yearlyPlan.offer_price.usd
                                  ).toFixed(2)}
                                </div>
                                  </>
                                } */}
                              <div className="class-global-height">
                                {yearlyPlan.campaign_offer && timerState && (
                                  <>
                                    <div
                                      className="plan-type"
                                      style={{
                                        color: "#007CFF",
                                        fontSize: "40px",
                                        margin: "6px auto",
                                      }}
                                    >
                                      {" "}
                                      {yearlyPlan.campaign_offer.campaign_details.discount_percent}%
                                      OFF
                                    </div>
                                  </>
                                )}
                                {/* <div className="super-saver" style={idx != 2? {boxShadow:"none",border:"none",minHeight:"0px"}:{} }>
                                      {idx == 2 && <>
                                        <div className="enjoy-text">Enjoy</div>
                                      <div className="discount">20% OFF</div>
                                      <div className="coupon">Use this Coupon</div>
                                      <div className="coupon-txt">20PRWHIZ</div>
                                      </>}
                                    </div> */}
                                {/* style={{ color: "#9095A3", textDecoration: "line-through" }} */}
                                {
                                  <>
                                    <div
                                      className={
                                        yearlyPlan.campaign_offer
                                          ? "price-block"
                                          : "fixed-margin-pr-pl price-block"
                                      }
                                    >
                                      <span
                                        className="price"
                                        style={
                                          yearlyPlan.campaign_offer && timerState
                                            ? { color: "#9095A3", textDecoration: "line-through" }
                                            : {}
                                        }
                                      >
                                        {yearlyPlan.campaign_offer ? (
                                          <>
                                            {yearlyPlan.campaign_offer.campaign_details
                                              .calculation_based_on_regular == 0 ? (
                                              <> ${(yearlyPlan.offer_price.usd / 12).toFixed(2)}</>
                                            ) : (
                                              <>${(yearlyPlan.price.usd / 12).toFixed(2)}</>
                                            )}
                                          </>
                                        ) : (
                                          <> ${(yearlyPlan.offer_price.usd / 12).toFixed(2)}</>
                                        )}
                                      </span>
                                      <div className="price-dis">
                                        per month,
                                        <br />
                                        <strong
                                          style={
                                            yearlyPlan.campaign_offer && timerState
                                              ? { textDecoration: "line-through" }
                                              : {}
                                          }
                                        >
                                          {yearlyPlan.campaign_offer ? (
                                            <>
                                              {yearlyPlan.campaign_offer.campaign_details
                                                .calculation_based_on_regular == 0 ? (
                                                <>${yearlyPlan.offer_price.usd}</>
                                              ) : (
                                                <>${yearlyPlan.price.usd}</>
                                              )}
                                            </>
                                          ) : (
                                            <>${yearlyPlan.offer_price.usd}</>
                                          )}
                                        </strong>
                                        &nbsp;billed yearly
                                      </div>
                                    </div>
                                  </>
                                }
                                {yearlyPlan.campaign_offer && timerState && (
                                  <>
                                    <div className="price-block">
                                      <span className="price" style={{ color: "#007CFF" }}>
                                        $
                                        {(
                                          parseFloat(yearlyPlan.campaign_offer?.price.usd) / 12
                                        ).toFixed(2)}
                                      </span>
                                      <div className="price-dis" style={{ color: "#007CFF" }}>
                                        per month,
                                        <br />
                                        {yearlyPlan.campaign_offer.campaign_details
                                          .calculation_based_on_regular == 1 ? (
                                          <>
                                            {" "}
                                            <strong style={{ color: "#007CFF" }}>
                                              ${yearlyPlan.campaign_offer?.price.usd} billed for the
                                              1<sup>st</sup> year
                                              {/* ${yearlyPlan.offer_price.usd}{" "}
                                              thereafter */}
                                            </strong>
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                              <a
                                href="/pricing/checkout/"
                                style={{
                                  color:
                                    currentPlan && currentPlan?.plan_id === yearlyPlan.id
                                      ? "#007cff"
                                      : "",
                                  background:
                                    currentPlan && currentPlan?.plan_id === yearlyPlan.id
                                      ? "#007cff47"
                                      : "",
                                  cursor: "pointer",
                                }}
                                onClick={(e) => {
                                  e.preventDefault();

                                  currentPlan && currentPlan?.plan_id === yearlyPlan.id
                                    ? disableButton()
                                    : openCheckoutPage(yearlyPlan);
                                }}
                                className="btn btn-Buy"
                              >
                                {currentPlan
                                  ? currentPlan.plan_id === yearlyPlan.id
                                    ? "Active"
                                    : +currentPlan.plan.offer_price.usd >
                                      +yearlyPlan.offer_price.usd
                                    ? "Downgrade Now"
                                    : "Upgrade Now"
                                  : "Buy Now"}
                              </a>
                            </div>

                            {idx === 0 && (
                              <ul>
                                <li>
                                  <div className="text">
                                    <span>25,000+ Practice Questions</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>4,500+ Training Videos</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Latest Updates to Practice Tests</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Latest Updates to Video Courses</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Progress Tracker</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Detailed Performance Reports</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Access to Expert Webinars</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Course Completion Certificates</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>24x7 Tech Support</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>Labs Integrated with training content</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>750+ Guided Hands-on Labs</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>Test Your Cloud Skills</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>
                                      Projects
                                      <small>
                                        Detailed Case Studies and Scenarios Simulating Real-Time
                                        Cloud Infrastructures and Applications.
                                      </small>
                                    </span>
                                  </div>
                                  <div className={`circle`}>
                                    <figure>
                                      <img className="img-full" src="/images/cross-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>
                                      Cloud Sandboxes{" "}
                                      <small>
                                        AWS, Azure, Google Cloud, Power Platform, Python etc...
                                      </small>
                                    </span>
                                  </div>
                                  <div className={`circle`}>
                                    <figure>
                                      <img className="img-full" src="/images/cross-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                              </ul>
                            )}
                            {idx === 1 && (
                              <ul>
                                <li>
                                  <div className="text">
                                    <span>25,000+ Practice Questions</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>4,500+ Training Videos</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Latest Updates to Practice Tests</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Latest Updates to Video Courses</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Progress Tracker</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Detailed Performance Reports</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Access to Expert Webinars</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>Course Completion Certificates</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li>
                                  <div className="text">
                                    <span>24x7 Tech Support</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>Labs Integrated with training content</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>750+ Guided Hands-on Labs</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>Test Your Cloud Skills</span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>
                                      Projects
                                      <small>
                                        Detailed Case Studies and Scenarios Simulating Real-Time
                                        Cloud Infrastructures and Applications.
                                      </small>
                                    </span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                                <li className="bg">
                                  <div className="text">
                                    <span>
                                      Cloud Sandboxes{" "}
                                      <small>
                                        AWS, Azure, Google Cloud, Power Platform, Python etc...
                                      </small>
                                    </span>
                                  </div>
                                  <div className={`circle active`}>
                                    <figure>
                                      <img className="img-full" src="/images/true-sign.svg" />
                                    </figure>
                                  </div>
                                </li>
                              </ul>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="container-small">
          {/* <!-- brands-block --> */}
          <Brands
            data={brandsData}
            moreData={moreBrandsData}
            custom_title={`We are blessed with some amazing clients. Here are just a few!`}
          />
          <br />
          <br />
          {/* <!-- business-plan --> */}
          <div className="business-plan">
            <h2>
              Looking for Enterprise License?{" "}
              <strong>Empower your Teams with Up-To-Date Skills</strong>
            </h2>
            <label>With Our Business Plan specially crafted for organisations</label>
            <a
              className="btn btn-more"
              rel="noopener"
              target="_blank"
              href={process.env.NEXT_PUBLIC_BUSINESS_URL}
            >
              Explore in Detail<i className="icon icon-font-arrow-right"></i>
            </a>
          </div>
        </div>

        {/* video-review-section */}
        <div className="video-container">
          <VideoReview />
        </div>

        {/* <!-- testimonial-block --> */}
        <Testimonials data={testimonialsData} />

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
                        {/* {faqData.map((e, i) => (
                          <div className="item">
                            <Accordion expanded={expanded === `panel${i}`}
                              TransitionProps={{ unmountOnExit: true }}
                              onChange={handleChange(`panel${i}`)}>
                              <AccordionSummary className={expanded === `panel${i}` ? "item-head open" : "item-head"}>
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
                        <AccordianPricing data={faqData} panel="panel0" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ContactUsAction />

        {/* <div className={isActive ? "pricing-popup active-popup" : "pricing-popup"}>
          {planType == 0 && (
            <>
              {monthlyPlans.map((itm, index) => {
                return (
                  <>
                    <div className="popup-plans">
                      <div className="popup-content">
                        <div className="popup-heading">
                          <h4 style={{ color: `${color_type[index]}` }}>{itm.title}</h4>
                          <div className="plantype-div">
                            <div className="span-div">
                              <span>$</span>&nbsp;
                              <span>
                               
                                <strong>{itm.offer_price.usd}</strong>
                              </span>
                              &nbsp;
                              <span>/ quarter</span>
                            </div>
                          </div>
                        </div>
                        <div className="unlist">
                          <ul>
                            {course_type[index].map((x) => {
                              return (
                                <>
                                  <li>{x}</li>
                                </>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                      <div className="pricing-btn" style={index==1?{marginTop:"45px"}:{}}>
                        <button
                          className={
                            currentPlan?.plan_id === itm?.id ? "btn-active" : "btn-not-active"
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            currentPlan && currentPlan?.plan_id === itm.id
                              ? disableButton()
                              : openCheckoutPage(itm);
                          }}
                        >
                          {currentPlan
                            ? currentPlan.plan_id === itm.id
                              ? "Active"
                              : +currentPlan.plan.offer_price.usd > +itm.offer_price.usd
                              ? "Buy Now"
                              : "Upgrade Now"
                            : "Buy Now"}
                        </button>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          )}
          {planType == 1 && (
            <>
              {yearlyPlans.map((itm, index) => {
                return (
                  <>
                    <div className="popup-plans">
                      <div className="popup-content">
                        <div className="popup-heading">
                          <h4 style={{ color: `${color_type[index]}` }}>{itm.title}</h4>
                          <div className="plantype-div">
                            <div className="span-div">
                              <span>$</span>&nbsp;
                              <span>
                              
                                <strong>{itm.offer_price.usd}</strong>
                              </span>
                              &nbsp;
                              <span>/ year</span>
                            </div>
                          </div>
                        </div>
                        <div className="unlist">
                          <ul>
                            {course_type[index].map((x) => {
                              return (
                                <>
                                  <li>{x}</li>
                                </>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                      <div className="pricing-btn" style={index==1?{marginTop:"45px"}:{}}>
                        <button
                          className={
                            currentPlan?.plan_id === itm?.id ? "btn-active" : "btn-not-active"
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            currentPlan && currentPlan?.plan_id === itm.id
                              ? disableButton()
                              : openCheckoutPage(itm);
                          }}
                        >
                          {currentPlan
                            ? currentPlan.plan_id === itm.id
                              ? "Active"
                              : +currentPlan.plan.offer_price.usd > +itm.offer_price.usd
                              ? "Buy Now"
                              : "Upgrade Now"
                            : "Buy Now"}
                        </button>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          )}
        </div> */}
      </div>
      {/* <div className="bottom-super-saver">
                <div className="bottom-deal">(20% OFF - Super Saver Deal is Live! )</div>
                <div><span className="bottom-coupon">Use this "COUPON"</span> - <span className="bottom-coupon-name">20PRWHIZ</span> </div>
                <div className="bottom-date">Valid till: <strong>31.01.2023</strong></div>
              </div> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.authData.userData,
    redirectTo: state.redirectData.redirect_to,
    user_type: state.userProfileData.user_type,
    timerState: state.timer.timer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSubscriptionToState: (datas) => dispatch(addSubscription(datas)),
    redirectionAction: (data) => dispatch(updateRedirection(data)),
  };
};

export async function getServerSideProps(context) {
  const link = context.params;

  const cookie = context.req.headers.cookie;
  const decoded = decodeURIComponent(cookie);
  const split1 = decoded.split("userData=")[1];
  const split21 = decoded.split("userProfile=")[1]?.split(";")[0];
  if (split21) {
    let userType = JSON.parse(split21).user_type;
    if (userType == "amazon") {
      return {
        redirect: {
          destination: `/amazon/employees`,
          permanent: false,
        },
      };
    }
  }
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

  const seoHomePageData = {
    seoPageType: "pricingPage", // This should reflect the actual page type
    title: "Plans & Pricing - Whizlabs",
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
          "We offer most affordable subscription plans for your convenience. Enrol now and take a step ahead to level up your career!",
      },
      { name: "", property: "og:locale", content: "en_US" },
      { name: "", property: "og:type", content: "website" },
      {
        name: "",
        property: "og:title",
        content: "Plans & Pricing - Whizlabs",
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
        content: `${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}2022/07/pricingog.jpeg`,
      },
      { name: "", property: "fb:app_id", content: "502194103558420" },
      { name: "twitter:card", property: "", content: "summary_large_image" },
      {
        name: "twitter:description",
        property: "",
        content:
          "We offer most affordable subscription plans for your convenience. Enrol now and take a step ahead to level up your career!",
      },
      { name: "twitter:title", property: "", content: "Plans & Pricing - Whizlabs" },
      { name: "twitter:site", property: "", content: "@whizlabs" },
      {
        name: "twitter:image",
        content: `${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}2022/07/pricingog.jpeg`,
      },
      { name: "twitter:creator", property: "", content: "@whizlabs" },
    ],
  };
  


  return {
    props: {
      profile: profile,
      subscriptionData: subscriptionResp?.data?.data,
      testimonialsData: testResp?.data?.data,
      brandsData: brandsData,
      moreBrandsData: moreBrandsData,
      seoHomePageData,
    }, // will be passed to the page component as props
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
