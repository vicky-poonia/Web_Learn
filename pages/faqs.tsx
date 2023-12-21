import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Accordions } from "@/components/import";
import ContactUsAction from "../components/plugins/ContactUsAction";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Faq = (seoHomePageData) => {
  const [faqType, setFaqType] = useState("E");
  const [expanded, setExpanded] = useState("panel0E");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [faq, setFaq] = useState([]);

  useEffect(() => {
    axios.get(baseUrl + "/web/global_faqs").then(({ data }) => {
      const orderedFaqs = [];
      Object.keys(tabs).map((key) =>
        orderedFaqs.push(data.data.find((faq) => faq.faq_type === key))
      );
      setFaq(orderedFaqs);
    });
  }, []);

  const showFaqTab = (type) => {
    return (
      faq.filter(
        (faq) =>
          faq.faq_type === type &&
          faq.faq[0].question !== null &&
          faq.faq.find((f) => f.is_active == 1)
      ).length > 0
    );
  };
  const changeFaqType = (type) => {
    setFaqType(type)
    setExpanded(`panel0${type}`)
  };
  const tabs = {
    E: { title: "Exam & Products", icon: "icon-font-true-tick-with-circle" },
    T: { title: "Technical", icon: "icon-font-setting" },
    G: { title: "General", icon: "icon-font-general" },
    P: { title: "Payment", icon: "icon-font-payment-card" },
    S: { title: "Support", icon: "icon-font-support" },
  };
  return (
    <>
      {/* <Head>
        <title>Frequently Asked Questions (FAQs) - Whizlabs</title>
        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
        <meta name="title" content="Frequently Asked Questions (FAQs) - Whizlabs" />
        <meta
          name="description"
          content="Established in 2000, Whizlabs is the pioneer of the online certification training industry. We&#039;ve helped over 5M+ professionals to get ahead in their careers."
        />
        <meta name="keywords" content="Frequently Asked Questions (FAQs)" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Frequently Asked Questions (FAQs) - Whizlabs" />
        <meta
          property="og:description"
          content="Established in 2000, Whizlabs is the pioneer of the online certification training industry. We&#039;ve helped over 5M+ professionals to get ahead in their careers."
        />
        <meta property="og:url" content="https://www.whizlabs.com/faq/" />
        <meta property="og:site_name" content="Whizlabs" />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ac8e8025822"}
        />
        <meta property="fb:app_id" content="502194103558420" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="Established in 2000, Whizlabs is the pioneer of the online certification training industry. We&#039;ve helped over 5M+ professionals to get ahead in their careers."
        />
        <meta name="twitter:title" content="Frequently Asked Questions (FAQs) - Whizlabs" />
        <meta name="twitter:site" content="@whizlabs" />
        <meta
          name="twitter:image"
          content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ac8e8025869"}
        />
        <meta name="twitter:creator" content="@whizlabs" />
      </Head> */}
      {/* <!-- faq-banner --> */}
      <div className="faq-banner">
        <div className="container-small">
          <h1>Frequently Asked Questions (FAQs) - Whizlabs</h1>
        </div>
      </div>

      {/* <!-- content area part -->  */}
      <div id="content-area" className="faq-page">
        {/* <!-- faq-block --> */}
        <div id="faq" className="faq-block">
          <div className="gradient-box"></div>
          <div className="container-small">
            <div id="faq-tab" className="tab_wrapper">
              <ul className="resp-tabs-list hor_1 tab_list">
                {faq.map(
                  (Itm, i) =>
                    Itm.faq.length > 0 &&
                    Itm.faq[0].question !== null &&
                    showFaqTab(Itm.faq_type) && (
                      <li
                        onClick={() => changeFaqType(Itm.faq_type)}
                        className={faqType === Itm.faq_type && "resp-tab-active"}
                      >
                        <samp>
                          <i className={`icon ${tabs[Itm.faq_type].icon}`}></i>
                          {tabs[Itm.faq_type].title}
                        </samp>
                      </li>
                    )
                )}
              </ul>
              <div className="resp-tabs-container hor_1 content_wrapper">
                {faq.length > 0 &&
                  faq.map((Itm, i) => {
                    return (
                      <>
                        {showFaqTab(Itm.faq_type) && (
                          <div
                            onClick={() => changeFaqType(Itm.faq_type)}
                            className={
                              faqType === Itm.faq_type
                                ? "resp-accordion hor_1 resp-tab-active"
                                : "resp-accordion hor_1"
                            }
                          >
                            <span className="arrow"></span>
                            <samp>
                              <i className={`icon ${tabs[Itm.faq_type].icon}`}></i>
                              {tabs[Itm.faq_type].title}
                            </samp>
                          </div>
                        )}
                        <div
                          key={i}
                          // title={Itm.faq_type}
                          className="tab_content active"
                          style={{
                            display: faqType === Itm.faq_type ? "block" : "none",
                            transition: "height 300ms",
                          }}
                        >
                          <div className="accordian-block">
                            <div className="accordian-list">
                              {Itm?.faq?.map((item, ie) => (
                                <React.Fragment key={ie}>
                                  {item && item.is_active == 1 && item.question && item.answer && (
                                    // <Accordions
                                    //   data={{
                                    //     key: ie,
                                    //     question: item.question,
                                    //     answer: item.answer,
                                    //   }}
                                    // />
                                    <div className="item">
                                    <Accordion expanded={expanded === `panel${ie}${Itm.faq_type}`}
                                      TransitionProps={{ unmountOnExit: true }}
                                      onChange={handleChange(`panel${ie}${Itm.faq_type}`)}>
                                      <AccordionSummary className={expanded === `panel${ie}${Itm.faq_type}` ? "item-head open" : "item-head"}>
                                        <>
                                          <samp></samp>
                                          <span>{item.question}</span>
                                        </>
                                      </AccordionSummary>
                                      <AccordionDetails className="item-content">
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: item.answer,
                                          }}
                                        ></div>
                                      </AccordionDetails>
                                    </Accordion>
                                  </div>
                                  )}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
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

export default Faq;

export async function getServerSideProps() {
  const seoHomePageData = {
    seoPageType: "faqPage",
    title: "Frequently Asked Questions (FAQs) - Whizlabs",
    metaTags: [
      { name: "facebook-domain-verification", property: "", content: "twh401qzi7r7o3n227q4sg3hghbpzh" },
      { name: "title", property: "", content: "Frequently Asked Questions (FAQs) - Whizlabs" },
      {
        name: "description",
        property: "",
        content:
          "Established in 2000, Whizlabs is the pioneer of the online certification training industry. We've helped over 5M+ professionals to get ahead in their careers.",
      },
      { name: "keywords", property: "", content: "Frequently Asked Questions (FAQs)" },
      { name: "", property: "og:locale", content: "en_US" },
      { name: "", property: "og:type", content: "website" },
      { name: "", property: "og:title", content: "Frequently Asked Questions (FAQs) - Whizlabs" },
      {
        name: "",
        property: "og:description",
        content:
          "Established in 2000, Whizlabs is the pioneer of the online certification training industry. We've helped over 5M+ professionals to get ahead in their careers.",
      },
      { name: "", property: "og:url", content: "https://www.whizlabs.com/faq/" },
      { name: "", property: "og:site_name", content: "Whizlabs" },
      {
        name: "",
        property: "og:image",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ac8e8025822",
      },
      { name: "", property: "fb:app_id", content: "502194103558420" },
      { name: "", property: "og:image:width", content: "500" },
      { name: "", property: "og:image:height", content: "500" },
      { name: "twitter:card", property: "", content: "summary" },
      {
        name: "twitter:description",
        property: "",
        content:
          "Established in 2000, Whizlabs is the pioneer of the online certification training industry. We've helped over 5M+ professionals to get ahead in their careers.",
      },
      { name: "twitter:title", property: "", content: "Frequently Asked Questions (FAQs) - Whizlabs" },
      { name: "twitter:site", property: "", content: "@whizlabs" },
      {
        name: "twitter:image",
        property: "",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ac8e8025869",
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