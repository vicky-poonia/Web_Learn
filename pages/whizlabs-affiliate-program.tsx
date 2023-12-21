import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Head from "next/head";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { useKeenSlider } from "keen-slider/react";

const AffiliateProgram = (seoHomePageData) => {
  const [activefaqTab, setActivefaqTab] = useState(1);

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const testimonials = [
    {
      title: "The explanations are very detailed",
      explanation: `Whizlabs sells in-demand online & digital products which makes it very easy for an
      affiliate to sell. If you have targeted traffic, just sit and watch the sales
      soar. They have a very helping & a dedicated affiliate team who will help you in
      case you need customized creatives to suit your audience. They think win-win and
      this becomes very easy to work with them.`,
      user_name: "Ravikiran Srinivasulu",
    },
    {
      title: "The practice tests are very useful",
      explanation: `Joined Whizlabs Affiliate Program in 2018 and I am very happy with their affiliate
      program. Thank you Whizlabs team for giving me an opportunity to earn through the
      affiliate program.`,
      user_name: `JeffRyan`,
    },
  ];

  const marketingFaqs = [
    {
      id: "panel1",
      ques: "What is Affiliate Marketing?",
      ans: "Affiliate marketing is a way to earn by promoting the products of others [individual or company]",
    },
    {
      id: "panel2",
      ques: "What is Whizlabs Affiliate Program?",
      ans: "Whizlabs Affiliate Program makes you earn by promoting its products and driving business. You will get 20% commission on every sale made through your affiliate link.",
    },
    {
      id: "panel3",
      ques: "Why should I join Whizlabs Affiliate Program?",
      ans: "With Whizlabs Affiliate Program, you get a chance to earn 20% commission on every sale. You can promote as many products as you want on multiple blogs or websites.",
    },
    {
      id: "panel4",
      ques: "What is the fee to join Whizlabs Affiliate program?",
      ans: "Whizlabs Affiliate program is absolutely free, you don’t need to pay anything to sign up for Whizlabs Affiliate program.",
    },
    {
      id: "panel5",
      ques: "What is the procedure to join Whizlabs Affiliate program?",
      ans: "It is very simple to join our affiliate program. You can apply by filling and submitting sign up form. Once your application gets approved, you will get a confirmation mail with the unique username and password.",
    },
    {
      id: "panel6",
      ques: "What types of websites/blogs are eligible for Whizlabs Affiliate program?",
      ans: "The technical websites/blogs dealing with following domains are eligible to enter into Whizlabs Affiliate program – Java, Cloud Computing, Big Data, Project Management, Agile & Scrum, Linux, Networking, and Digital Marketing.",
    },
  ];

  const promotionFaqs = [
    {
      id: "panel7",
      ques: "What promotional method can I use to promote Whizlabs products?",
      ans: "There are various promotional methods to promote our products such as you can place promotional banner or link. Also, you can write reviews for Whizlabs products and publish on your blog or website. You will receive customized links i.e. affiliate links for all the promotions that will help us to track the sales. You will get paid for every sale made through your affiliate links.",
    },
    {
      id: "panel8",
      ques: "How will I get promotional resources?",
      ans: "Once your application has been approved, you will be provided with a unique username and password via email. You can login to your affiliate account through your login details. In Banner Manager, you will find different banners with the links. All you need to do is just copy the link and put it on your blog or website.",
    },
    {
      id: "panel9",
      ques: "What types of promotional resources do you provide to your affiliates?",
      ans: "We provide banners, links, and coupons to the affiliates as promotional resources. We provide promotional banners in different sizes, you can choose as convenient. ",
    },
    {
      id: "panel10",
      ques: "Except for promotional resources, what are the other ways to promote your products?",
      ans: "There are many other White Hat SEO techniques for product promotion. You can opt to write SEO blog articles, post product reviews, and conduct email marketing campaigns.",
    },
    {
      id: "panel11",
      ques: "What kind of promotion is not allowed?",
      ans: "The promotion through the techniques like article spinning, spamdexing, and social media spamming with links are not allowed at all.",
    },
    {
      id: "panel12",
      ques: "Where should I place links on my website/blog?",
      ans: "You should place the affiliate links on your website/blog where the visitors pay more attention. These areas on a webpage are – left/right sidebars, above/below the top navigation bar or below the blog post.",
    },
    {
      id: "panel13",
      ques: "Can I promote Whizlabs products on multiple blogs and websites?",
      ans: "Of course! You can promote our products on a number of blogs and websites. The only requirement is that the blog/website should be related to our courses. If you promote our products on multiple blogs/websites, it will drive more visitors to our site which may result in more conversions and thus you will earn more!",
    },
  ];
  
  const paymentFaqs = [
    {
      id: "panel14",
      ques: "How will I get paid for Whizlabs Affiliate program?",
      ans: "We use various payment methods like PayPal, cheque, and online transfer you can choose one as per your convenience. ",
    },
    {
      id: "panel15",
      ques: "When will I get paid under Whizlabs Affiliate program?",
      ans: "You will get paid on 20th of every month for the sales generated in the previous month.",
    },
    {
      id: "panel16",
      ques: "How much will I be paid for a sale?",
      ans: "You will get 20-40% commission (as per the performance, we revise the commission percentage) on every sale made through your affiliate link.If your question is not listed here, contact us on affiliate@whizlabs.com and we will get in touch with you in no time.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView: 1,
    spacing: 250,
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });

  return (
    <>
      {/* <Head>
        <title>Whizlabs Affiliate Program | Whizlabs</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />

        <meta name="title" content="Whizlabs Affiliate Program - Whizlabs" />
        <meta
          name="description"
          content="Whizlabs Affiliate Program allows you to promote our products and earn upto 30% commission on each sale you refer. Sign up now!"
        />
        <meta name="keywords" content="Whizlabs Affiliate Program, Become our affiliate partner" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Whizlabs Affiliate Program - Whizlabs" />
        <meta
          property="og:description"
          content="Whizlabs Affiliate Program allows you to promote our products and earn upto 30% commission on each sale you refer. Sign up now!"
        />
        <meta property="og:url" content="https://www.whizlabs.com/whizlabs-affiliate-program/" />
        <meta property="og:site_name" content="Whizlabs" />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acd7f7b40c5"}
        />
        <meta property="fb:app_id" content="502194103558420" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="Whizlabs Affiliate Program allows you to promote our products and earn upto 30% commission on each sale you refer. Sign up now!"
        />
        <meta name="twitter:title" content="Whizlabs Affiliate Program - Whizlabs" />
        <meta name="twitter:site" content="@whizlabs" />
        <meta
          name="twitter:image"
          content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acd7f7b410b"}
        />
        <meta name="twitter:creator" content="@whizlabs" />
      </Head> */}
      {/* <!-- affiliate-banner-part --> */}
      <div className="affiliate-banner-block">
        <div className="container">
          <div className="header-block">
            <div className="container-small">
              <div className="left-block">
                <h1 className="title">Whizlabs Affiliate Program</h1>
                <p>
                  Whizlabs affiliate program values all the efforts you put in the promotion of
                  products through your website/blog and thus reward you with the highest commission
                  in the industry.
                </p>
                <a
                  href="https://www.shareasale.com/shareasale.cfm?merchantID=43514"
                  target="_blank"
                  className="btn affiliate-btn"
                >
                  Become an Affiliate
                </a>
              </div>
              <div className="right-block">
                <figure>
                  <img
                    width={383}
                    height={282}
                    className="img-full"
                    src="/images/affiliate-img2x.png"
                    alt=""
                  />
                </figure>
              </div>
            </div>
          </div>
          <div className="feature-block">
            <div className="feature-box">
              <figure>
                <img width={80} height={80} className="img-full" src="/images/rates.svg" alt="" />
              </figure>
              <div className="content">
                <div className="title">High Commission Rates</div>
                <p>
                  You can earn up to 30% affiliate commission on every sale of our training courses,
                  generated via your affiliate link.
                </p>
              </div>
            </div>
            <div className="feature-box">
              <figure>
                <img width={80} height={80} className="img-full" src="/images/earn.svg" alt="" />
              </figure>
              <div className="content">
                <div className="title">Earn at Your Own Pace</div>
                <p>
                  You are a SUPER affiliate and our dedicated affiliate commission structure will
                  keep you on the top-earning tier.
                </p>
              </div>
            </div>
            <div className="feature-box">
              <figure>
                <img width={80} height={80} className="img-full" src="/images/sale.svg" alt="" />
              </figure>
              <div className="content">
                <div className="title">No Minimum Sale Requirements</div>
                <p>
                  We haven’t set up any minimum requirement on sale, whatever be the commission
                  amount, you’ll get that every month.
                </p>
              </div>
            </div>
            <div className="feature-box">
              <figure>
                <img width={80} height={80} className="img-full" src="/images/support.svg" alt="" />
              </figure>
              <div className="content">
                <div className="title">Premium Affiliate Support</div>
                <p>
                  Our affiliate team helps you throughout your affiliate journey with Whizlabs and
                  make sure you earn a high commission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- content area part -->  */}
      <div id="content-area" className="affiliate-program">
        {/* <!-- join the whizlab solution --> */}
        <div className="affiliate-join-block">
          <div className="container-small">
            <div className="join-program-block">
              <div className="left-block">
                <h2 className="title">
                  {" "}
                  Why Join the Whizlabs<strong> Affiliate Program? </strong>
                </h2>
                <p>
                  Whizlabs is a renowned name in the online certification training industry and we
                  are targeted to offer the best affiliate program in the industry with the highest
                  conversion rates!
                </p>
              </div>
              <div className="right-block">
                <figure>
                  <img
                    width={640}
                    height={266}
                    className="img-full"
                    src="/images/join-program-img2x.jpg"
                    alt=""
                  />
                </figure>
              </div>
            </div>
            <div className="join-feature-block">
              <div className="feature-box">
                <figure>
                  <img
                    width={80}
                    height={80}
                    className="img-full"
                    src="/images/choice2x.png"
                    alt=""
                  />
                </figure>
                <div className="content">
                  <div className="title">Freedom of Choice</div>
                  <p>
                    We don’t bound you with specific products. Choose any of our high converting
                    products as per your interest, promote, and earn.
                  </p>
                </div>
              </div>
              <div className="feature-box">
                <figure>
                  <img
                    width={80}
                    height={80}
                    className="img-full"
                    src="/images/optimize2x.png"
                    alt=""
                  />
                </figure>
                <div className="content">
                  <div className="title">Optimized Performance</div>
                  <p>
                    We provide promotional banners to optimize your performance, just place them on
                    your website/blog and start earning a commission.
                  </p>
                </div>
              </div>
              <div className="feature-box">
                <figure>
                  <img width={80} height={80} className="img-full" src="/images/fee2x.png" alt="" />
                </figure>
                <div className="content">
                  <div className="title">No Hidden Affiliate Fee</div>
                  <p>
                    There is no hidden affiliate fee to join Whizlabs Affiliate Program, it’s
                    absolutely free. All you need is sign up and start earning.
                  </p>
                </div>
              </div>
              <div className="feature-box">
                <figure>
                  <img
                    width={80}
                    height={80}
                    className="img-full"
                    src="/images/quick2x.png"
                    alt=""
                  />
                </figure>
                <div className="content">
                  <div className="title">Simple and Quick</div>
                  <p>
                    We offer a hassle-free, simple, and straight affiliate program for your
                    convenience. You can join our affiliate program in three easy steps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- affiliate-steps-block --> */}
        <div className="affiliate-steps-block">
          <div className="container">
            <div className="step-group">
              <div className="container-small">
                <div className="left-block">
                  <h2 className="title">Become an Affiliate in Three Simple Steps</h2>
                  <hr />
                  <p>
                    You don’t need to fill long forms or wait for any approval call. Join the
                    Whizlabs affiliate program in three simple steps.
                  </p>
                  <a
                    target="_blank"
                    href="https://www.shareasale.com/shareasale.cfm?merchantID=43514"
                    className="btn affiliate-btn"
                  >
                    Become an Affiliate
                  </a>
                </div>
                <div className="right-block">
                  <div className="step">
                    <span className="step-no">1</span>
                    <div className="step-content">
                      <div className="step-title">Join</div>
                      <p>
                        Signup for our Whizlabs account and fill in the required details to access
                        your affiliate panel.
                      </p>
                    </div>
                  </div>
                  <div className="step">
                    <span className="step-no">2</span>
                    <div className="step-content">
                      <div className="step-title">Promote</div>
                      <p>
                        Create affiliate links using our promotional banners, exclusive offers, and
                        seasonal campaigns.
                      </p>
                    </div>
                  </div>
                  <div className="step">
                    <span className="step-no">3</span>
                    <div className="step-content">
                      <div className="step-title">Earn</div>
                      <p>
                        Earn high paying commission for all the efforts you put into the promotion
                        of our products.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- testimonial-block --> */}
        <div className="testimonial-block">
          <div className="container">
            <div className="heading">
              <figure>
                <img
                  width={50}
                  height={36}
                  className="img-full"
                  src="/images/quote-img.svg"
                  alt=""
                />
              </figure>
              <h5>
                What our <strong>Affiliates are Saying</strong>
              </h5>
            </div>
            <div className="keen-theme" style={{ overflow: "hidden" }}>
              <div
                className="slider-blocks keen-slider"
                ref={sliderRef}
                style={{ maxWidth: "830px !important" }}
              >
                {testimonials.map((x, index) => (
                  <>
                    <div className="block keen-slider__slide" key={index}>
                      <div className="title">{x.title}</div>
                      <p dangerouslySetInnerHTML={{ __html: x.explanation }}></p>
                      <div className="user-block">
                        <figure>
                          <img
                            width={60}
                            height={60}
                            className="img-full"
                            src="/images/user-not-found.svg"
                            alt=""
                          />
                        </figure>
                        <div className="details">
                          <span>{x.user_name}</span>
                        </div>
                      </div>
                    </div>
                  </>
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

        {/* <!-- faq-block --> */}
        <div id="faq" className="faq-block">
          <div className="container-small">
            <div className="container-left">
              <h3 className="title">Frequently Asked Questions</h3>
              <div id="default-tab" className="tab_wrapper">
                <ul className="tab_list">
                  <li
                    onClick={() => setActivefaqTab(1)}
                    className={activefaqTab == 1 ? "resp-tab-active" : ""}
                  >
                    <samp>
                      <i className="icon icon-font-true-tick-with-circle"></i>
                      Affiliate Marketing
                    </samp>
                  </li>
                  <li
                    onClick={() => setActivefaqTab(2)}
                    className={activefaqTab == 2 ? "resp-tab-active" : ""}
                  >
                    <samp>
                      <i className="icon icon-font-promotion"></i>Promotion
                    </samp>
                  </li>
                  <li
                    onClick={() => setActivefaqTab(3)}
                    className={activefaqTab == 3 ? "resp-tab-active" : ""}
                  >
                    <samp>
                      <i className="icon icon-font-payment-card"></i>Payment
                    </samp>
                  </li>
                </ul>
                <div>
                  {activefaqTab == 1 && <div
                    title="MarketingFAQ"
                    className="tab_content active"
                    id="MarketingFAQ"
                    style={{ 
                      display: activefaqTab == 1 ? "block" : "none", 
                      // transition: "height 300ms"
                    }}
                  >
                    <div className="accordian-block">
                      <div className="accordian-list">
                        {marketingFaqs.map((item) => (
                          <div className="item">
                            <Accordion expanded={expanded === item.id} key={item.id} onChange={handleChange(item.id)}>
                              <AccordionSummary className={expanded === item.id ? "item-head  open" : "item-head"}>
                                <>
                                  <samp></samp>
                                  <span>{item.ques}</span>
                                </>
                              </AccordionSummary>
                              <AccordionDetails className="item-content">
                                {item.ans}
                              </AccordionDetails>
                            </Accordion>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>}
                  {activefaqTab == 2 && <div
                    title="technical"
                    className="tab_content"
                    id="technical"
                    style={{ display: activefaqTab == 2 ? "block" : "none" }}
                  >
                    <div className="accordian-block">
                      <div className="accordian-list">
                        {promotionFaqs.map((item) => (
                          <div className="item">
                          <Accordion expanded={expanded === item.id} key={item.id} onChange={handleChange(item.id)}>
                            <AccordionSummary className={expanded === item.id ? "item-head  open" : "item-head"}>
                              <>
                                <samp></samp>
                                <span>{item.ques}</span>
                              </>
                            </AccordionSummary>
                            <AccordionDetails className="item-content">
                              {item.ans}
                            </AccordionDetails>
                          </Accordion>
                        </div>
                        ))}
                      </div>
                    </div>
                  </div>}
                  {activefaqTab == 3 && <div
                    title="payment"
                    className="tab_content"
                    id="payment"
                    style={{ display: activefaqTab == 3 ? "block" : "none" }}
                  >
                    <div className="accordian-block">
                      <div className="accordian-list">
                        {paymentFaqs.map((item, i) => (
                          <div className="item">
                          <Accordion expanded={expanded === item.id} key={item.id} onChange={handleChange(item.id)}>
                            <AccordionSummary className={expanded === item.id ? "item-head  open" : "item-head"}>
                              <>
                                <samp></samp>
                                <span>{item.ques}</span>
                              </>
                            </AccordionSummary>
                            <AccordionDetails className="item-content">
                              {item.ans}
                            </AccordionDetails>
                          </Accordion>
                        </div>
                        ))}
                      </div>
                    </div>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- discuss-team-block --> */}
        <div className="discuss-team-block">
          <div className="container-small">
            <div className="left-block">
              <figure>
                <img
                  width={285}
                  height={380}
                  className="img-full"
                  src="/images/discussion-team.png"
                  alt=""
                />
              </figure>
            </div>
            <div className="right-block">
              <h5 className="title">
                <span>More Questions?</span>Discuss with our Affiliate Team
              </h5>
              <div className="discuss-link">
                {/* <a href="tel:+91 9431313204" className="btn link">
                  <i className="icon icon-font-call"></i>+91 9431313204
                </a> */}
                <a href="mailto:affiliate@whizlabs.com" className="btn link">
                  <i className="icon icon-font-mail"></i>affiliate@whizlabs.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- upgradation-block --> */}
      </div>
    </>
  );
};

export default AffiliateProgram;

export async function getServerSideProps() {
  const seoHomePageData = {
    seoPageType: "affiliatePage",
    title: "Whizlabs Affiliate Program - Whizlabs",
    metaTags: [
      { name: "facebook-domain-verification", property: "", content: "twh401qzi7r7o3n227q4sg3hghbpzh" },
      { name: "title", property: "", content: "Whizlabs Affiliate Program - Whizlabs" },
      {
        name: "description",
        property: "",
        content:
          "Whizlabs Affiliate Program allows you to promote our products and earn upto 30% commission on each sale you refer. Sign up now!",
      },
      { name: "keywords", property: "", content: "Whizlabs Affiliate Program, Become our affiliate partner" },
      { name: "", property: "og:locale", content: "en_US" },
      { name: "", property: "og:type", content: "website" },
      { name: "", property: "og:title", content: "Whizlabs Affiliate Program - Whizlabs" },
      {
        name: "",
        property: "og:description",
        content:
          "Whizlabs Affiliate Program allows you to promote our products and earn upto 30% commission on each sale you refer. Sign up now!",
      },
      { name: "", property: "og:url", content: "https://www.whizlabs.com/whizlabs-affiliate-program/" },
      { name: "", property: "og:site_name", content: "Whizlabs" },
      {
        name: "",
        property: "og:image",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acd7f7b40c5",
      },
      { name: "", property: "fb:app_id", content: "502194103558420" },
      { name: "", property: "og:image:width", content: "500" },
      { name: "", property: "og:image:height", content: "500" },
      { name: "twitter:card", property: "", content: "summary" },
      {
        name: "twitter:description",
        property: "",
        content:
          "Whizlabs Affiliate Program allows you to promote our products and earn upto 30% commission on each sale you refer. Sign up now!",
      },
      { name: "twitter:title", property: "", content: "Whizlabs Affiliate Program - Whizlabs" },
      { name: "twitter:site", property: "", content: "@whizlabs" },
      {
        name: "twitter:image",
        property: "",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acd7f7b410b",
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
