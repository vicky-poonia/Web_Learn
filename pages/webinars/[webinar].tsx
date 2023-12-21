
import Head from "next/head";

const WebinarDetail = (seoHomePageData) => {
  return (
    <>
      <Head>
        <title>Whizlabs Webinars Series - Whizlabs</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
      </Head>
      {/* webinar Banner */}
      <div className="webinars-record-detail-banner">
        <div className="container-small">
          <a href="/webinars" className="backto-webinar">
            <i className="icon icon-font-arrow-right"></i>
            <span>Webinars Series</span>
          </a>
          <h1 className="title">Introduction to AWS Technical Essential for Developers</h1>
          <div className="date-time-block">
            <div className="date">
              <i className="icon icon-font-calendar"></i>
              <span>Aug 01, 2020</span>
            </div>
            <div className="time">
              <i className="icon icon-font-clock"></i>
              <span>11:00 AM IST (2 hrs)</span>
            </div>
          </div>
        </div>
      </div>

      {/* content area */}
      <div id="content-area" className="webinars-page subpage upcoming">
        <div className="two-column">
          <div className="container-small">
            <div className="left-section">
              <div className="img-block">
                <img className="img-full" src="/images/webinar-img12x.jpg" alt="" />
              </div>
              <div className="overview-block">
                <h2 className="title">Overview</h2>
                <p>
                  Serverless & container-related skills are witnessing a huge surge in demand.
                  Whether you are a beginner or an expert in AWS, you need to be familiar with
                  various concepts of Serverless Computing and AWS Container Services. With the aim
                  of helping you enhance your skills, Whizlabs is organizing a FREE webinar on “An
                  Introduction to Serverless with a Deep Dive on Container Services in AWS”.
                </p>
                <p>
                  Learn from Dan and Crystal the best way to ask survey questions, what questions to
                  ask and when to ask them. In this webinar, they walk you through which questions
                  types are better for certain circumstances, where you can expand or simplify and
                  set you up for success in your next survey.
                </p>
              </div>
              <div className="what-learn-block">
                <ul>
                  <li>Serverless on AWS</li>
                  <li>AWS Lambda</li>
                  <li>AWS Fargate</li>
                  <li>API Gateway</li>
                  <li>AWS AppSync</li>
                  <li>AWS Step Functions</li>
                </ul>
                <ul>
                  <li>AWS Kinesis</li>
                  <li>Amazon Athena</li>
                  <li>Developer tools</li>
                  <li>Amazon Elastic Container Service (ECS)</li>
                  <li>Amazon Elastic Kubernetes Service (Amazon EKS)</li>
                </ul>
              </div>
              <div className="speaker-block">
                <h2 className="title">Speakers</h2>
                <div className="block">
                  <figure>
                    <img className="img-full" src="/images/user-img82x.png" alt="" />
                  </figure>
                  <div className="block-content">
                    <span>Dan Fleetwood</span>
                    <p>Director, Cloud Consultant</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-section">
              <div className="reg-form">
                <div className="title">Book your Spot!</div>
                <form>
                  <div className="input-box-group">
                    <div className="input-box">
                      <label>
                        Your Name <small>*</small>
                      </label>
                      <input type="text" placeholder="Name" />
                    </div>
                    <div className="input-box">
                      <label>
                        Email Address <small>*</small>
                      </label>
                      <input type="email" placeholder="info@yourwebsite.com" />
                    </div>
                    <div className="input-box">
                      <label>Phone number</label>
                      <input type="text" placeholder="+1 415 555 2671" />
                    </div>
                    <div className="input-box">
                      <label>
                        Country/Region <small>*</small>
                      </label>
                      <div className="custom-selectbox">
                        <select>
                          <option>All Categories</option>
                          <option>Categories 1</option>
                          <option>Categories 2</option>
                          <option>Categories 3</option>
                          <option>Categories 4</option>
                          <option>Categories 5</option>
                        </select>
                      </div>
                    </div>
                    <button className="btn btn-register">Register Now</button>
                  </div>
                </form>
              </div>
              <p>
                Whizlabs needs the contact information you provide to us to contact you about our
                products and services. You may unsubscribe from these communications at anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context){
  const seoHomePageData = {
    seoPageType: "webinar", // This should be changed to reflect the actual page type
    title: "Whizlabs Webinars Series - Whizlabs",
    metaTags: [
      {
        name: "facebook-domain-verification",
        property: "",
        content: "twh401qzi7r7o3n227q4sg3hghbpzh",
      },
    ],
  };
  return {
    redirect: {
      destination: `/webinars`,
      permanent: false,
    },
    seoHomePageData,
  };
}


export default WebinarDetail;
