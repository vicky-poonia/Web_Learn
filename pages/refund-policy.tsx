const RefundPolicy = () => {
  return (
    <>
      <div id="content-area" className="terms-use-page">
        <div className="page-content">
          <div className="refund-banner">
            <div className="container">
              <div className="head-img-refund">
                <div className="heading">
                  {/* heading with first line */}
                  <div>
                    <h1 className="mainhead">Whizlabs Refund Policy</h1>
                  </div>
                  <div className="sub-text">
                    <p>
                      Thank you for choosing whizlabs for your learning requirements. We at
                      Whizlabs, aim to provide a gratifying experience to our users and ensure that
                      you are satisfied with our products and services.
                    </p>
                  </div>
                </div>
                {/* <div className="image-refund">
                                <img className="img-refund-banner"src="/images/refund-img.jpg"></img>
                            </div> */}
              </div>
            </div>
          </div>
          <div className="extra-info-refund">
            <div className="container">
              <p>
                When you purchase a product from Whizlabs, you submit your consent and agree to our{" "}
                <a href="/terms-of-use" target="_blank">
                  {" "}
                  Terms of Use
                </a>
                ,{" "}
                <a href="/privacy-policy" target="_blank">
                  Privacy Policy
                </a>
                , and Refund Policy(this page).This is applicable to all individual users purchasing
                courses, subscriptions & sandboxes. Below terms are not applicable for Business
                Clients and any type of companies / organizations.
              </p>
            </div>
          </div>
          <div className="category-2-refund">
            <div className="container">
              <h3>
                <strong>KIND NOTE</strong>
              </h3>
              {/* 
                        Black friday, Christmas and New year which are already bound with higher discounts and offers cannot be refunded.
                         */}
              <p>
                Any purchases made during the sales period such as{" "}
                <strong>Black friday, Christmas and New year or any deals at 40% or more than 40% discounts</strong> which are already bound with{" "}
                <strong>higher discounts and offers cannot be refunded. </strong>
                Also, trying to apply additional coupon codes is not applicable during any of the sales period.
              </p>
            </div>
          </div>
          <div className="categort-1-refund">
            <div className="container">
              <h3>Purchases related to: Video Courses/Practice tests/Hands-on Labs</h3>
              <p className="subtext">
                If you are not happy with our video courses, practice tests or hands-on labs, we are
                ready to initiate refunds as per the below terms
              </p>
              <div className="table-1">
                <table>
                  <thead>
                    <tr>
                      <th className="align-vertical">Criteria or Refund Request (Duration)</th>
                      <th className="width-it">Refund Value</th>
                    </tr>
                  </thead>
                  <tr>
                    <td>
                      On or Before 3<sup>rd</sup> day of purchase
                    </td>
                    <td className="snd-td">100% Refund</td>
                  </tr>
                  <tr>
                    <td>
                      Between 4<sup>th</sup> day to 6th day of purchase
                    </td>
                    <td className="snd-td">50% Refund</td>
                  </tr>
                  <tr>
                    <td>
                      On or After 7<sup>th</sup> day of purchase
                    </td>
                    <td className="snd-td">No Refund</td>
                  </tr>
                  <tr>
                    <td>
                      In case of failure in exams,but must be initiated within 7 days after exam
                      result
                    </td>
                    <td className="snd-td">100% Refund</td>
                  </tr>
                </table>
              </div>
              <div className="list">
                <p>
                  <strong>
                    Even If, you have requested for refund as in the listed criterias mentioned in
                    the above table, your refund will not be processed if you met these conditions:
                  </strong>
                </p>
                <div className="listinner">
                  <div className="info">
                    If you have passed the actual certification exam from the official vendor
                    <br></br> (ex: AWS, Azure, Google) and accessed our (Whizlabs) training videos,
                    attempted practice tests, other documentations and hands-on labs.
                  </div>
                  <div className="info">
                    If you are not able to submit the acceptable proof of failure<br></br> (such as
                    e-mail from the Vendor, scorecard, etc.)
                  </div>
                  <div className="info last-info">If your purchase is more than 5 months old.</div>
                </div>
              </div>
            </div>
          </div>
          <div className="category-2-refund">
            <div className="container">
              <h3>
                <strong>Purchases related to: </strong>Subscription Plans
              </h3>
              <p>
                If you are not happy with any of our subscription plans, we are ready to initiate
                refunds as per the below terms.
              </p>
              <div className="table-2">
                <table>
                  <thead>
                    <tr>
                      <th>Subscription-Type</th>
                      <th>Criteria or Refund Request (Duration)</th>
                      <th>Refund Value</th>
                    </tr>
                  </thead>
                  <tr>
                    <td rowSpan={3} className="row-span">
                      1 Months
                    </td>
                    <td>
                      On or Before 2<sup>nd</sup> day of purchase
                    </td>
                    <td className="snd-row">100% Refund</td>
                  </tr>
                  <tr>
                    <td>
                      Between 2<sup>nd</sup> day to 4<sup>th</sup> day of purchase
                    </td>
                    <td className="snd-row">50% Refund</td>
                  </tr>
                  <tr>
                    <td>
                      On or After 5<sup>th</sup> day of purchase
                    </td>
                    <td className="snd-row">No Refund</td>
                  </tr>
                  <tr>
                    <td rowSpan={3} className="row-span">
                      1 Year
                    </td>
                    <td>
                      On or Before 3<sup>rd</sup> day of purchase
                    </td>
                    <td className="snd-row">100% Refund</td>
                  </tr>
                  <tr>
                    <td>
                      Between 4<sup>th</sup> day to 29<sup>th</sup> day of purchase
                    </td>
                    <td className="snd-row">50% Refund</td>
                  </tr>
                  <tr>
                    <td>
                      On or After 30<sup>th</sup> day of purchase
                    </td>
                    <td className="snd-row">No Refund</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="category-3-refund">
            <div className="container">
              <h3>
                <strong>Purchases related to:</strong> Sandboxes of any technology <br></br> (AWS,
                Azure, Google Cloud, Power platform, kubernetes etc.,)
              </h3>
              <p>
                If you are not happy with any of our sandboxes, we are ready to initiate refunds as
                per the below terms
              </p>
              <div className="table-3">
                <table>
                  <thead>
                    <tr>
                      <th>Criteria or Refund Request (Duration)</th>
                      <th>Refund Value</th>
                    </tr>
                  </thead>
                  <tr>
                    <td>
                      On or Before 2<sup>nd</sup> day of purchase
                    </td>
                    <td className="snd-cell">100% Refund</td>
                  </tr>
                  <tr>
                    <td>
                      Between 3<sup>rd</sup> day to 6<sup>th</sup> day of purchase
                    </td>
                    <td className="snd-cell">50% Refund</td>
                  </tr>
                  <tr>
                    <td>
                      On or After 7<sup>th</sup> day of purchase
                    </td>
                    <td className="snd-cell">No Refund</td>
                  </tr>
                </table>
              </div>
              <p>
                <strong>
                  Even If, you have requested for refund as in the listed criterias mentioned in the
                  above table, your refund will not be processed if you met these conditions:
                </strong>
              </p>
              <div className="list">
                <div className="inner-list">
                  <div className="inner1">
                    If you use our sandbox feature for other than learning purpose
                  </div>
                  <div className="inner2">
                    If you record any session in the form of video or images within the sandbox
                    environment, without prior approval from the concerned team in Whizlabs and try
                    to indulge in business activities.
                  </div>
                </div>
                <div className="inner-list">
                  <div className="inner3">
                    If you use the sandbox for business purposes without becoming an authorized
                    business partner or learner.
                  </div>
                  <div className="inner4">
                    If looking for additional services which are not listed as part of the package
                    in our webpage.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="repayment">
            <div className="container">
              <h3>How to Initiate the Refund Request?</h3>
              <p>
                You can write an email to:{" "}
                <a href="mailto:support@whizlabs.com">support@whizlabs.com</a> with the below
                details:
              </p>
              <div className="list">
                <div className="l1">Registered email address used to access in our platform</div>
                <div className="l1">Email Subject: “Request for Refund”</div>
                <div className="l1">
                  The reason asking for refund, order details as applicable and any other feedback
                </div>
                <div className="l1">Attach files (if any)</div>
              </div>
              <div className="info">
                <blockquote>
                  <em>
                    Please note that all refunds and cancellations will be processed within 10
                    business days after the request is received and approved.
                  </em>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RefundPolicy;

export async function getServerSideProps() {
  const seoHomePageData = {
    seoPageType: "refundPage", // This should be changed to reflect the actual page type
    title: "Refund Policy - Whizlabs",
    metaTags: [
      { name: "facebook-domain-verification", property: "", content: "twh401qzi7r7o3n227q4sg3hghbpzh" },
      { name: "title", property: "", content: "Refund Policy - Whizlabs" },
      {
        name: "description",
        property: "",
        content:
          "When you purchase an online course or practice test from Whizlabs, you agree to our Privacy Policy, Terms of Use, and Refund Policy. Read our refund policy now.",
      },
      { name: "keywords", property: "", content: "Refund Policy" },
      { name: "", property: "og:locale", content: "en_US" },
      { name: "", property: "og:type", content: "website" },
      { name: "", property: "og:title", content: "Refund Policy - Whizlabs" },
      {
        name: "",
        property: "og:description",
        content:
          "When you purchase an online course or practice test from Whizlabs, you agree to our Privacy Policy, Terms of Use, and Refund Policy. Read our refund policy now.",
      },
      { name: "", property: "og:url", content: "https://www.whizlabs.com/refund-policy/" },
      { name: "", property: "og:site_name", content: "Whizlabs" },
      {
        name: "",
        property: "og:image",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acad8b53e56",
      },
      { name: "", property: "fb:app_id", content: "502194103558420" },
      { name: "", property: "og:image:width", content: "500" },
      { name: "", property: "og:image:height", content: "500" },
      { name: "twitter:card", property: "", content: "summary" },
      {
        name: "twitter:description",
        property: "",
        content:
          "When you purchase an online course or practice test from Whizlabs, you agree to our Privacy Policy, Terms of Use, and Refund Policy. Read our refund policy now.",
      },
      { name: "twitter:title", property: "", content: "Refund Policy - Whizlabs" },
      { name: "twitter:site", property: "", content: "@whizlabs" },
      {
        name: "twitter:image",
        property: "",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acad8b53e9e",
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