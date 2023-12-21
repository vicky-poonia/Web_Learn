import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import bf_offer from "../black-friday-offers";
import MyTimer from "./Timer";
import axios from "axios";
import { motion } from "framer-motion";

const Banner = ({details,timerState }) => {
  const [width, setwidth] = useState(0);
  useEffect(() => {
    if (window) {
      setwidth(window.innerWidth);
    }
    const handleResize = () => {
      setwidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  const handleClick = () => {
    if (details.clicks.headerOnclick == 1) {
      window.open(`${details.clicks.header}`, "_self");
    } else {
      window.open(`${details.clicks.header}`);
    }
  };

  //subscribtion price save
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [subscriptionSaving, setSubscriptionSaving] = useState("");
  const [subscriptionData, setSubscriptionData] = useState([]);

  let fetchSubscriptionData = async () => {
    try {
      const response = await axios.get(baseUrl + "/subscription/plans");
      setSubscriptionData(response.data.data);
    } catch (error) {
      console.error("Error fetching subscription data:", error);
    }
  };

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  useEffect(() => {
    if (subscriptionData.length > 0) {
      let oneMonthplans = subscriptionData.filter((Itm) => Itm.subscription_for === 1 && Itm.title === "Premium Plus");
      let oneYearPlans = subscriptionData.filter((Itm) => Itm.subscription_for === 12 && Itm.title === "Premium Plus");
      let saving =(oneMonthplans[0].offer_price.usd * 12 - oneYearPlans[0].offer_price.usd).toFixed(2);
      setSubscriptionSaving(saving);
    }
  }, [subscriptionData]);
  
  return (
    <>
      {timerState && details? (
        <div
          className="banner-front"
          style={{
            margin: "0px",
            height: "100%",
            background: `${details?.gradient}`,
            width: "100%",
          }}
        >
          <div className="container">
            {width > 450 && (
              <div
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick();
                }}
              >
                <img
                  style={{ width: "100%", objectFit: "fill", height: "auto" }}
                  src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}banners/${details?.desktopImg}`}
                  alt="Desktop-Homepage-header.webp"
                />
              </div>
            )}
            {width <= 450 && (
              <div
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick();
                }}
              >
                <img
                  style={{ width: "100%", objectFit: "fill", height: "auto" }}
                  src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}banners/${details?.mobileheader}`}
                  alt="Mobile-Homepage-Header"
                />
              </div>
            )}
            {width > 1022 && (
              <div className="timer">
                { timerState && <MyTimer design={details?.design} />}
              </div>
            )}
            {width > 1 && width < 480 && (
              <div className="timer">
                {timerState && <MyTimer design={details?.mdesign} />}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bannerContainer">
          <div className="bannerText">
            <div>
              <h1>
                OutSmart <br />
                Yourself
              </h1>
              <p>with our</p>
              <span>Premium+ Subscription</span>
              <div >
                  {subscriptionSaving !== '' &&
                    <Link href="/pricing">
                      <motion.button className="bannerButton" whileHover={{ scale: 1.2, transition: { duration: 0.8 } }} whileTap={{ scale: 0.9 }}>
                        <b>Save upto</b>${subscriptionSaving}<i className="icon-font-arrow-right"></i>
                      </motion.button>
                    </Link>
                  }
              </div>
            </div>
          </div>
          <div className="bannerImage">
            <img
              src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}whizlabs-it-certifications-training.webp`}
              alt="whizlabs it certifications online training provider"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
