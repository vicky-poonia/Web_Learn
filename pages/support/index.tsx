import Head from "next/head";
import { useEffect } from "react";
import Link from "next/link";

const Support = (seoHomePageData) => {
  useEffect(() => {
    document.getElementById("wrapper").classList.add("dashboard-page");
  }, []);

  return (
    <>
      {/* <Head>
        <title>Whizlabs - A world class technology training platform for your teams</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />

        <meta
          name="description"
          content="Ensure your success in AWS, Azure, Java, PMP, Agile, Big Data, Linux certification exams. Pass or 100% Money Back. Trained 5M+ professionals since 20 years. Start with Free Trial Now!"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Online Certification Training Courses for Professionals"
        />
        <meta
          property="og:description"
          content="Ensure your success in AWS, Azure, Java, PMP, Agile, Big Data, Linux certification exams. Pass or 100% Money Back. Trained 5M+ professionals since 20 years. Start with Free Trial Now!"
        />
        <meta property="og:url" content="https://www.whizlabs.com/support/" />
        <meta property="og:site_name" content="Whizlabs" />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60b50f261fa03" }
        />
        <meta property="fb:app_id" content="502194103558420" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="Ensure your success in AWS, Azure, Java, PMP, Agile, Big Data, Linux certification exams. Pass or 100% Money Back. Trained 5M+ professionals since 20 years. Start with Free Trial Now!"
        />
        <meta
          name="twitter:title"
          content="Online Certification Training Courses for Professionals"
        />
        <meta name="twitter:site" content="@whizlabs" />
        <meta
          name="twitter:image"
          content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60b50f261fa47"}
        />
        <meta name="twitter:creator" content="@whizlabs" />
      </Head> */}
      <div id="content-area" className="bg-color support-page">
        {/* <!-- sub header --> */}
        <div className="sub-header">
          <div className="container">
            <div className="left">
              <div className="breadcrumbs">
                <ul>
                  <li>
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a>Your queries</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <h1>Support</h1>
            </div>
          </div>
        </div>

        <div className="dashboard-tab">
          <div id="dashboard-tab">
            <div className="wrapper-list">
              <div className="container">
                <span className="previous">&lt;</span>
                <ul className="resp-tabs-list tabs-page-link hor_1 tab_list">
                  <li>Your queries</li>
                  <li>Discussions</li>
                  <li>Ask our expert</li>
                </ul>
                <span className="next">&gt;</span>
              </div>
            </div>
            <div className="tab-wrap">
              <div className="resp-tabs-container hor_1 content_wrapper-tab">
                <div className="tab_content active" id="tab-queries">
                  <div className="container">
                    <div className="container-small">
                      <div className="head">
                        <span>
                          There’s no such thing as a stupid question. Ask. Discuss. Learn.
                        </span>
                        <a className="btn btn-question" href="#">
                          Ask a Question
                        </a>
                      </div>
                      <div className="question-summary">
                        <div className="block">
                          <div className="left">
                            <span>
                              Posted on <strong>1 hours</strong> ago
                            </span>
                            <a href="#">
                              How can I switch to a different project in GCP through CLI?
                            </a>
                          </div>
                          <div className="right">
                            <div className="box answered">
                              <samp>2</samp>
                              <span>Answer</span>
                            </div>
                          </div>
                        </div>
                        <div className="block">
                          <div className="left">
                            <span>
                              Posted on <strong>2 Days</strong> ago
                            </span>
                            <a href="#">Unable to access AWS practice tests</a>
                          </div>
                        </div>
                        <div className="block">
                          <div className="left">
                            <span>
                              Posted on <strong>3 Oct</strong> 2020
                            </span>
                            <a href="#">
                              How can I switch to a different project in GCP through CLI?
                            </a>
                          </div>
                          <div className="right">
                            <div className="box answered">
                              <samp>2</samp>
                              <span>Answer</span>
                            </div>
                          </div>
                        </div>
                        <div className="block">
                          <div className="left">
                            <span>
                              Posted on <strong>1 hours</strong> ago
                            </span>
                            <a href="#">
                              How can I switch to a different project in GCP through CLI?
                            </a>
                          </div>
                          <div className="right">
                            <div className="box answered">
                              <samp>2</samp>
                              <span>Answer</span>
                            </div>
                          </div>
                        </div>
                        <div className="block">
                          <div className="left">
                            <span>
                              Posted on <strong>2 Days</strong> ago
                            </span>
                            <a href="#">Unable to access AWS practice tests</a>
                          </div>
                        </div>
                        <div className="block">
                          <div className="left">
                            <span>
                              Posted on <strong>3 Oct</strong> 2020
                            </span>
                            <a href="#">
                              How can I switch to a different project in GCP through CLI?
                            </a>
                          </div>
                          <div className="right">
                            <div className="box answered">
                              <samp>2</samp>
                              <span>Answer</span>
                            </div>
                          </div>
                        </div>
                        <div className="block">
                          <div className="left">
                            <span>
                              Posted on <strong>1 hours</strong> ago
                            </span>
                            <a href="#">
                              How can I switch to a different project in GCP through CLI?
                            </a>
                          </div>
                          <div className="right">
                            <div className="box answered">
                              <samp>2</samp>
                              <span>Answer</span>
                            </div>
                          </div>
                        </div>
                        <div className="block">
                          <div className="left">
                            <span>
                              Posted on <strong>2 Days</strong> ago
                            </span>
                            <a href="#">Unable to access AWS practice tests</a>
                          </div>
                        </div>
                      </div>
                      <div className="btn-viewall">
                        <a className="btn" href="#">
                          View All
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab_content" id="tab-discussion">
                  <div className="container">
                    <div className="container-small">
                      <div className="head">
                        <span>Latest Discussion Topics</span>
                        <a className="link-viewall" href="#">
                          View All
                        </a>
                      </div>
                      <div className="question-summary">
                        <div className="block">
                          <div className="left">
                            <div className="top">
                              <a href="#">
                                How can I switch to a different project in GCP through CLI?
                              </a>
                              <p>
                                When will you release Professional Data Engineer questions? I have
                                been waiting for this for several months and I haven’t heard
                                anything!
                              </p>
                            </div>
                            <div className="bottom">
                              <div className="tag-group">
                                <a className="tag" href="#">
                                  Google
                                </a>
                                <a className="tag" href="#">
                                  Certification
                                </a>
                              </div>
                              <div className="started">
                                <a className="modified icon icon-font-chat-1" href="#">
                                  modified yesterday&nbsp;
                                </a>
                                <a className="user-link" href="#">
                                  Modermo 122
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="right">
                            <div className="box answered">
                              <samp>2</samp>
                              <span>Answer</span>
                            </div>
                            <div className="box">
                              <samp>37</samp>
                              <span>Views</span>
                            </div>
                          </div>
                        </div>
                        <div className="block">
                          <div className="left">
                            <div className="top">
                              <a href="#">Passed SysOps Administrator New Exam</a>
                              <p>
                                Had only about 5 questions from Whizlabs set of questions.My opinion
                                is that these questions are not reflecting exam objectives.Update
                                needed with Kubrenetes, AD Connect, JSON ARM tem…
                              </p>
                            </div>
                            <div className="bottom">
                              <div className="tag-group">
                                <a className="tag" href="#">
                                  SysOps
                                </a>
                                <a className="tag" href="#">
                                  Administrator
                                </a>
                                <a className="tag" href="#">
                                  Exam
                                </a>
                              </div>
                              <div className="started">
                                <a className="modified icon icon-font-question" href="#">
                                  asked 10 min ago&nbsp;
                                </a>
                                <a className="user-link" href="#">
                                  Bobby 475
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="right">
                            <div className="box">
                              <samp>0</samp>
                              <span>Answer</span>
                            </div>
                            <div className="box">
                              <samp>10</samp>
                              <span>Views</span>
                            </div>
                          </div>
                        </div>
                        <div className="block">
                          <div className="left">
                            <div className="top">
                              <a href="#">AWS CSAA Practice Tests are not working</a>
                              <p>
                                I am wondering if it is possible to specify resource url in spring
                                configuration file that is gonna be recognized on windows and unix
                                based os. Windows OS loads resource from following location…
                              </p>
                            </div>
                            <div className="bottom">
                              <div className="tag-group">
                                <a className="tag" href="#">
                                  AWS
                                </a>
                                <a className="tag" href="#">
                                  Javascript
                                </a>
                              </div>
                              <div className="started">
                                <a className="modified icon icon-font-edit" href="#">
                                  modified 1 min ago&nbsp;
                                </a>
                                <a className="user-link" href="#">
                                  Clusterdude 322
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="right">
                            <div className="box answered">
                              <samp>7</samp>
                              <span>Answer</span>
                            </div>
                            <div className="box">
                              <samp>22</samp>
                              <span>Views</span>
                            </div>
                          </div>
                        </div>
                        <div className="block">
                          <div className="left">
                            <div className="top">
                              <a href="#">
                                How can I switch to a different project in GCP through CLI?
                              </a>
                              <p>
                                When will you release Professional Data Engineer questions? I have
                                been waiting for this for several months and I haven’t heard
                                anything!
                              </p>
                            </div>
                            <div className="bottom">
                              <div className="tag-group">
                                <a className="tag" href="#">
                                  Google
                                </a>
                                <a className="tag" href="#">
                                  Certification
                                </a>
                              </div>
                              <div className="started">
                                <a className="modified icon icon-font-chat-1" href="#">
                                  modified yesterday&nbsp;
                                </a>
                                <a className="user-link" href="#">
                                  Modermo 122
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="right">
                            <div className="box answered">
                              <samp>2</samp>
                              <span>Answer</span>
                            </div>
                            <div className="box">
                              <samp>37</samp>
                              <span>Views</span>
                            </div>
                          </div>
                        </div>
                        <div className="block">
                          <div className="left">
                            <div className="top">
                              <a href="#">Passed SysOps Administrator New Exam</a>
                              <p>
                                Had only about 5 questions from Whizlabs set of questions.My opinion
                                is that these questions are not reflecting exam objectives.Update
                                needed with Kubrenetes, AD Connect, JSON ARM tem…
                              </p>
                            </div>
                            <div className="bottom">
                              <div className="tag-group">
                                <a className="tag" href="#">
                                  SysOps
                                </a>
                                <a className="tag" href="#">
                                  Administrator
                                </a>
                                <a className="tag" href="#">
                                  Exam
                                </a>
                              </div>
                              <div className="started">
                                <a className="modified icon icon-font-question" href="#">
                                  asked 10 min ago&nbsp;
                                </a>
                                <a className="user-link" href="#">
                                  Bobby 475
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="right">
                            <div className="box">
                              <samp>0</samp>
                              <span>Answer</span>
                            </div>
                            <div className="box">
                              <samp>10</samp>
                              <span>Views</span>
                            </div>
                          </div>
                        </div>
                        <div className="block">
                          <div className="left">
                            <div className="top">
                              <a href="#">AWS CSAA Practice Tests are not working</a>
                              <p>
                                I am wondering if it is possible to specify resource url in spring
                                configuration file that is gonna be recognized on windows and unix
                                based os. Windows OS loads resource from following location…
                              </p>
                            </div>
                            <div className="bottom">
                              <div className="tag-group">
                                <a className="tag" href="#">
                                  AWS
                                </a>
                                <a className="tag" href="#">
                                  Javascript
                                </a>
                              </div>
                              <div className="started">
                                <a className="modified icon icon-font-edit" href="#">
                                  modified 1 min ago&nbsp;
                                </a>
                                <a className="user-link" href="#">
                                  Clusterdude 322
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="right">
                            <div className="box answered">
                              <samp>7</samp>
                              <span>Answer</span>
                            </div>
                            <div className="box">
                              <samp>22</samp>
                              <span>Views</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="btn-viewall">
                        <a className="btn" href="#">
                          View All
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab_content" id="tab-ask-expert">
                  <div className="container">
                    <div className="white-box">
                      <div className="head-section">Have any query? Ask our expert</div>
                      <div className="box-content">
                        <form action="">
                          <div className="input-box-group">
                            <div className="input-box">
                              <label>Your Email</label>
                              <input type="text" placeholder="Address line one" />
                            </div>
                            <div className="input-box">
                              <label>Subject</label>
                              <div className="custom-selectbox">
                                <select>
                                  <option>What are you looking for? </option>
                                  <option value="">Job chnage?</option>
                                  <option value="">Job chnage?</option>
                                  <option value="">Job chnage?</option>
                                </select>
                              </div>
                            </div>
                            <div className="input-box full">
                              <label>Description: </label>
                              <figure>
                                <img
                                  className="img-full"
                                  src="/images/support-page-discription.png"
                                  alt=""
                                />
                              </figure>
                            </div>
                          </div>
                          <button className="btn btn-send">Send</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;

export async function getServerSideProps() {

  const seoHomePageData = {
    seoPageType: "supportPage", // This should be changed to reflect the actual page type
    title: "Whizlabs - A world class technology training platform for your teams",
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
          "Ensure your success in AWS, Azure, Java, PMP, Agile, Big Data, Linux certification exams. Pass or 100% Money Back. Trained 5M+ professionals since 20 years. Start with Free Trial Now!",
      },
      { name: "", property: "og:locale", content: "en_US" },
      { name: "", property: "og:type", content: "website" },
      {
        name: "",
        property: "og:title",
        content: "Online Certification Training Courses for Professionals",
      },
      {
        name: "",
        property: "og:description",
        content:
          "Ensure your success in AWS, Azure, Java, PMP, Agile, Big Data, Linux certification exams. Pass or 100% Money Back. Trained 5M+ professionals since 20 years. Start with Free Trial Now!",
      },
      { name: "", property: "og:url", content: "https://www.whizlabs.com/support/" },
      { name: "", property: "og:site_name", content: "Whizlabs" },
      {
        name: "",
        property: "og:image",
        content:
          process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60b50f261fa03",
      },
      { name: "", property: "fb:app_id", content: "502194103558420" },
      { name: "", property: "og:image:width", content: "500" },
      { name: "", property: "og:image:height", content: "500" },
      { name: "twitter:card", property: "", content: "summary" },
      {
        name: "twitter:description",
        property: "",
        content:
          "Ensure your success in AWS, Azure, Java, PMP, Agile, Big Data, Linux certification exams. Pass or 100% Money Back. Trained 5M+ professionals since 20 years. Start with Free Trial Now!",
      },
      {
        name: "twitter:title",
        property: "",
        content: "Online Certification Training Courses for Professionals",
      },
      { name: "twitter:site", property: "", content: "@whizlabs" },
      {
        name: "twitter:image",
        content:
          process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60b50f261fa47",
      },
      { name: "twitter:creator", property: "", content: "@whizlabs" },
    ],
  };  

  return {
    props: {
      seoHomePageData,
    }, // will be passed to the page component as props
  };
}