import { ContactUsAction } from "@/components/import";
import { StarRating } from "@/components/import";
import Head from "next/head";
import { connect } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Recaptcha from "react-recaptcha";
import { alertBox } from "redux/AlertBox/alert-actions";
import axios from "axios";
import { convertToTitleCase } from "helpers/CustomHelpers";
import Link from "next/link";
import { loadScript } from "helpers/customHooks";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const JS_SCRIPT = "https://www.google.com/recaptcha/api.js";

const WhizScholar = ({ alertBoxAction, datas, currencyData, categoryList, seoHomePageData }) => {
  const recaptcha = useRef(null);
  const [recaptchaVerified, SetRecaptchaVerified] = useState(false);
  const { register, handleSubmit, watch, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const recaptchaLoader = () => {};
  const [currency, setCurrency] = useState(null);

  useEffect(() => {
    loadScript(JS_SCRIPT);
    }, []);

  useEffect(() => {
    if (currencyData) setCurrency(currencyData);
  }, [currencyData]);

  const verifyCallback = (response) => {
    if (response) SetRecaptchaVerified(true);
  };

  const onSubmit = async (formData, e) => {
    setLoading(true);

    const insertData = JSON.stringify({
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
      college_name: formData.college_name,
      college_website: formData.college_website,
    });

    if (recaptchaVerified) {
      const { data } = await axios.post(baseUrl + "/web/scholarship-program", insertData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      e.target.reset(); // reset form inputs
      recaptcha.current.reset();
      setLoading(false);
      alertBoxAction({
        type: "SUCCESS",
        title: "We have received your submission.",
        msg: "Your application for the Whizscholar program has successfully reached us.",
      });
    } else {
      alertBoxAction({
        type: "ERROR",
        title: "Recaptcha Error",
        msg: "Please verify recaptcha",
      });
      setLoading(false);
    }
  };

  const calculateOldPrice = (data) => {
    let returnTotal: any = 0;
    if (data && data.products && data.products?.length > 0) {
      data.products.map((item) => {
        if (
          item.product_type !== "FT" &&
          item.product_type !== "ILT" &&
          item &&
          item.regular_price &&
          item.regular_price[currency.type]
        ) {
          returnTotal = Number(returnTotal) + Number(item.regular_price[currency.type]);
        }
      });
    }
    return currency.symbol + parseFloat(returnTotal).toFixed(2);
  };

  const calculateFixedPrice = (data, forDisplay = true) => {
    let returnTotal: any = 0;
    if (data && data.products && data.products?.length > 0) {
      data.products.map((item) => {
        if (
          item.product_type !== "FT" &&
          item.product_type !== "ILT" &&
          item &&
          item.sale_price &&
          item.sale_price[currency.type]
        ) {
          returnTotal = Number(returnTotal) + Number(item.sale_price[currency.type]);
        }
      });
    }
    return currency.symbol + parseFloat(returnTotal).toFixed(2);
  };

  return (
    <>
      {/* <Head>
        <title>Whizlabs Trainers | Whizlabs</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />

        <meta name="title" content="Whizlabs Trainers - Whizlabs" />
        <meta
          name="description"
          content="Are you a certified technology enthusiast with a passion to share your knowledge with others? Become a Whizlabs trainer and help candidates in their certification preparation."
        />
        <meta name="keywords" content="Whizlabs Trainers" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Whizlabs Trainers - Whizlabs" />
        <meta
          property="og:description"
          content="Are you a certified technology enthusiast with a passion to share your knowledge with others? Become a Whizlabs trainer and help candidates in their certification preparation."
        />
        <meta property="og:url" content="https://www.whizlabs.com/whizlabs-trainers/" />
        <meta property="og:site_name" content="Whizlabs" />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ade62202700"}
        />
        <meta property="fb:app_id" content="502194103558420" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="Are you a certified technology enthusiast with a passion to share your knowledge with others? Become a Whizlabs trainer and help candidates in their certification preparation."
        />
        <meta name="twitter:title" content="Whizlabs Trainers - Whizlabs" />
        <meta name="twitter:site" content="@whizlabs" />
        <meta
          name="twitter:image"
          content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ade6220275b"}
        />
        <meta name="twitter:creator" content="@whizlabs" />
      </Head> */}

      <div className="scholarship-page">
        {/* <!-- banner-part --> */}
        <div className="banner-block">
          <div
            className="banner"
            style={{ background: "url('/images/scholar-banner.jpg') no-repeat center" }}
          >
            <div className="container-small">
              <div className="caption">
                <h1>
                  Whizlabs <span>Scholarship Program</span>
                </h1>
                <div className="sub-title">
                  Join our Whizscholar program today to offer your student best in class learning
                  experience and premium content from industry experts.
                </div>
                <a className="btn apply-now" href="#scholar-ship-form" target="_blank">
                  Apply Now
                </a>
              </div>
              <figure className="img-block">
                <img className="img-full" src="/images/scholarship-banner.png" alt="" />
              </figure>
            </div>
          </div>
        </div>

        {/* <!-- workforce-block --> */}
        <div className="workforce-block">
          <div className="container-small">
            <div className="caption">
              <div className="title">
                <span>Make your students ready to</span> join the global Workforce from day one
              </div>
              <p>
                With access to Whizlabs Premium content, Whizscholar will have the much required
                career-oriented learning boost in technologies such as Cloud Computing, Big Data,
                Devops, Cybersecurity, Java and Blockchain.
              </p>
            </div>
            <div className="box-group">
              <div className="box">
                <figure>
                  <img className="img-full" src="/images/no-joining.svg" alt="" />
                </figure>
                <div className="text">
                  <h2>No joining charges for Universities</h2>
                  <p>No Joining fee or annual charges for universities/ educational institutes.</p>
                </div>
              </div>
              <div className="box">
                <figure>
                  <img className="img-full" src="/images/minimal-cost.svg" alt="" />
                </figure>
                <div className="text">
                  <h2>Minimal cost of scholarships</h2>
                  <p>Best content at a minimal cost and scholarships for your students.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- unique-block --> */}
        <div className="unique-block">
          <div className="container-small">
            <div className="title">
              <span>How is Whizscholar</span> Program Unique?
            </div>
          </div>
          <div className="img-text-block">
            <div className="container-small">
              <div className="caption-group">
                <div className="caption">
                  <h6>1. Latest Technology</h6>
                  <p>
                    It’s a global initiative to transform millions of students by empowering them
                    with the latest technology.
                  </p>
                </div>
                <div className="caption">
                  <h6>2. Accelerating your Internship</h6>
                  <p>
                    Our industry leading courses can help you in accelerating your internships,
                    career opportunities and foster entrepreneurship.
                  </p>
                </div>
                <div className="caption">
                  <h6>3. Join Academia and Industry</h6>
                  <p>
                    You learn the latest technologies which can bridge the gap between academia and
                    the industry.
                  </p>
                </div>
              </div>
              <div className="img-block">
                <figure>
                  <img className="img-full" src="/images/unique-img.png" alt="" />
                </figure>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- offer-block --> */}
        <div className="offer-block">
          <div className="container-small">
            <div className="block-group">
              <figure className="img-block">
                <img className="img-full" src="/images/offer-img-1.png" alt="" />
              </figure>
              <div className="caption">
                <h4>
                  <span>What does Whizlabs</span> Scholarship Program offer?
                </h4>
                <ul>
                  <li>
                    This program provides universities and colleges a chance to help their students
                    learn various technologies and get certified once they graduate.
                  </li>
                  <li>
                    Your Eligible Students will get upto 60% Scholarship on all the courses that
                    Whizlabs offers.
                  </li>
                  <li>
                    A selected batch of brilliant students from each partner university will get
                    upto 100% scholarships as a part of Whizscholar.
                  </li>
                  <li>
                    Two top performing students (one male and one female) from the
                    college/university will get a chance to learn their course of interest free of
                    cost.
                  </li>
                </ul>
              </div>
            </div>
            <div className="block-group">
              <div className="caption">
                <h4>
                  <span>Eligibility for</span> Whizlabs Scholarship Program
                </h4>
                <ul>
                  <li>
                    This scholarship is open for all technical universities across the globe. Every
                    application goes through some quality checks before being approved.
                  </li>
                  <li>
                    Students cannot apply directly for this scholarship, if you want to bring this
                    scholarship to your university, connect your management with us so that we can
                    roll out for you.
                  </li>
                  <li>
                    You should have a .edu domain approved for your institute, in absence of a .edu
                    domain, we would need govt approvals etc to validate your request.
                  </li>
                </ul>
                <p>
                  If you have students of high calibre interested in learning in demand technologies
                  and bring the next set of innovations, please get in touch with us today.
                </p>
              </div>
              <figure className="img-block">
                <img className="img-full" src="/images/offer-img-2.png" alt="" />
              </figure>
            </div>
          </div>
        </div>

        {/* <!-- how-apply --> */}
        <div className="how-apply">
          <div className="container-small">
            <div className="title">
              <h2>How to apply for the scholarship</h2>
            </div>
            <div className="all-box">
              <div className="box">
                <div className="circle">01</div>
                <p>
                  If you are a student, faculty or an alumni, please get in touch with your
                  respective institution and fill out the application provided at the end of the
                  page.
                </p>
              </div>
              <div className="box">
                <div className="circle">02</div>
                <p>
                  Once we receive details of your institution, our internal team will review the
                  application and get in touch with your university. More details about the
                  application process will be shared with you on email.
                </p>
              </div>
              <div className="box">
                <div className="circle">03</div>
                <p>
                  Once the review is completed, the scholarship will be rolled out and will be
                  available for the students of the college/university.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- which-program --> */}
        <div className="which-program faq-block">
          <div className="container-small">
            <div className="caption">
              <h3 className="title">
                <span>Which programs/ courses are</span>covered in the scholarship program
              </h3>
              <p>
                Whizlabs offer around 160+ Certification and skill based industry leading training
                programs and the scholarship will be applicable to all our courses, here are some of
                the courses recommended for students by our experts
              </p>
            </div>
            <div id="default-tab" className="tab_wrapper">
              <ul className="resp-tabs-list hor_1 tab_list">
                <li>Amazon Web Services</li>
                <li>Microsoft Azure</li>
                <li>Google Cloud Platform</li>
                <li>DevOps & Linux</li>
                <li>Project Management</li>
                <li>Java</li>
              </ul>
              <div className="resp-tabs-container hor_1 content_wrapper">
                {categoryList.map((categ) =>
                  datas[categ]?.length > 0 && currency ? (
                    <>
                      <div className="tab_content active">
                        <div className="accordian-block">
                          <div className="accordian-list">
                            <div className="item">
                              <div className="course-group">
                                {datas[categ].map((item, idx) => (
                                  <>
                                    <div className="course" key={idx.toString()}>
                                      <div className="couser-img">
                                        <Link href={"/" + item.seo_details?.slug}>
                                          <a>
                                            <img
                                              className="img-full"
                                              src={
                                                process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                                                item.seo_details?.featured_image.replace(
                                                  "media/",
                                                  ""
                                                )
                                              }
                                              alt={item.seo_details?.title}
                                              title={item.seo_details?.title}
                                            />
                                          </a>
                                        </Link>
                                      </div>
                                      <div className="course-content">
                                        <div className="course-details">
                                          <h6 className="title">
                                            <Link href={"/" + item.seo_details?.slug}>
                                              <a>{item.seo_details?.title}</a>
                                            </Link>
                                          </h6>
                                          <div className="level-text">
                                            {/* <label className="bestseller">Bestseller</label> */}
                                            {item.other_attributes?.course_level &&
                                              item.other_attributes.course_level.toLowerCase() !==
                                                "select level" && (
                                                <span>
                                                  Level:{" "}
                                                  {convertToTitleCase(
                                                    item.other_attributes?.course_level
                                                  )}{" "}
                                                </span>
                                              )}
                                          </div>
                                          <p>
                                            {categ === "aws_list"
                                              ? "AWS Certification Training Courses"
                                              : categ === "microsoft_list"
                                              ? "Microsoft Azure Certifications"
                                              : categ === "google_list"
                                              ? "Google Cloud Certifications"
                                              : categ === "devops_list"
                                              ? "DevOps Certifications"
                                              : categ === "pmp_list"
                                              ? "Project Management Certifications"
                                              : categ === "java_list"
                                              ? "Oracle Java Certification"
                                              : ""}
                                          </p>
                                        </div>
                                        <div className="price-review-block">
                                          {item.ratings && item.ratings.rating > 0 ? (
                                            <StarRating
                                              isSamp={true}
                                              avgRating={item.ratings?.overall_rating}
                                              totalRating={item.ratings?.rating}
                                            />
                                          ) : (
                                            ""
                                          )}
                                          <div className="price-block">
                                            {(() => {
                                              const oldPrice = calculateOldPrice(item);
                                              const fixedPrice = calculateFixedPrice(item);

                                              if (fixedPrice === "₹0") {
                                                return (
                                                  <span className="price test">{oldPrice}</span>
                                                );
                                              } else {
                                                return (
                                                  <>
                                                    <del className="old-price test">{oldPrice}</del>
                                                    <span className="price test">{fixedPrice}</span>
                                                  </>
                                                );
                                              }
                                            })()}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <!-- form-block --> */}
        <div className="form-block" id="scholar-ship-form">
          <div className="container-small">
            <div className="caption-block">
              <div className="title">
                Applications are open for first 1000 universities only.{" "}
                <span>Apply now to save yourself from last minute hassles.</span>
              </div>
              <h5>Terms and Conditions</h5>
              <ul>
                <li>
                  The scholarship can only be applicable if you sign up using your university/
                  college email id
                </li>
                <li>In one semester, one student can purchase 2 courses at a scholarship price</li>
                <li>It's only applicable on individual courses and not on subscription</li>
              </ul>
              <h5>Who are we?</h5>
              <p>
                Founded in 2000, Whizlabs is one of the pioneers among online training providers all
                across the globe providing online certification training, free practice tests, and
                hands-on labs in various disciplines such as Cloud Computing, Java, Big Data,
                Project Management, Agile, DevOps, Microsoft Power Platform, Business Analysis, and
                others.
              </p>
            </div>
            <div className="right-block">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="title">Application Form</div>
                <div className="input-group">
                  <div className="input-box">
                    <label>
                      Name of the University/College
                      <span style={{ color: "red", fontSize: "15px" }}>
                        <b>*</b>
                      </span>
                    </label>
                    <input type="text" name="college_name" ref={register({ required: true })} />
                    {errors.college_name && (
                      <span style={{ color: "red" }}>This field is required</span>
                    )}
                  </div>
                  <div className="input-box">
                    <label>
                      Name
                      <span style={{ color: "red", fontSize: "15px" }}>
                        <b>*</b>
                      </span>
                    </label>
                    <input type="text" name="full_name" ref={register({ required: true })} />
                    {errors.full_name && (
                      <span style={{ color: "red" }}>This field is required</span>
                    )}
                  </div>
                  <div className="input-box">
                    <label>
                      E-Mail
                      <span style={{ color: "red", fontSize: "15px" }}>
                        <b>*</b>
                      </span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      ref={register({
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      })}
                    />
                    {errors.email && errors.email.type === "required" && (
                      <span style={{ color: "red" }}>This field is required</span>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                      <span style={{ color: "red" }}>Please enter valid email.</span>
                    )}
                  </div>
                  <div className="input-box">
                    <label>Phone</label>
                    <input
                      type="text"
                      className="input-style"
                      name="phone"
                      ref={register({ pattern: /^[0-9]+$/i })}
                    />
                    {errors.phone && errors.phone.type === "pattern" && (
                      <span style={{ color: "red" }}>Please enter valid phone number.</span>
                    )}
                  </div>
                  <div className="input-box">
                    <label>
                      University/College website
                      <span style={{ color: "red", fontSize: "15px" }}>
                        <b>*</b>
                      </span>
                    </label>
                    <input type="text" name="college_website" ref={register({ required: true })} />
                    {errors.college_website && errors.college_website.type === "required" && (
                      <span style={{ color: "red" }}>This field is required</span>
                    )}
                  </div>
                </div>
                <figure className="captcha">
                  <Recaptcha
                    ref={recaptcha}
                    sitekey="6LeuGo4UAAAAAIZ6-Na4KHV_sIEJNjt-XlRO-Jgk"
                    render="explicit"
                    verifyCallback={verifyCallback}
                    onloadCallback={recaptchaLoader}
                    theme="light"
                  />
                </figure>

                <button disabled={loading} className="btn btn-apply">
                  {!loading ? "Submit" : <img width={40} height={40} src="/images/loader.svg" />}
                </button>
              </form>
            </div>
          </div>
        </div>

        <ContactUsAction text={"Give us your contact details, we will contact you back shortly."} />
      </div>
    </>
  );
};

// [1,2,3,4,117,138]; // aws
// [12,144,163,165]; // micorsoft
// [14,85,124]; // google
// [83,95,73,130,77]; // devops
// [23]; // pmp
// [142]; // java

// aws =  219,153,160,158,302,326
// microsoft = 256,331,343,340
// google = 239,274,296
// devops = 282,261,265
// pmp = 235
// java = 334

const mapStateToProps = (state) => {
  return {
    currencyData: state.ipDetails.currency_detail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    alertBoxAction: (data) => dispatch(alertBox(data)),
  };
};

export async function getStaticProps(context) {
  const seoHomePageData = {
    seoPageType: "whizscholar",
    title: "Whizlabs Trainers - Whizlabs",
    metaTags: [
      { name: "facebook-domain-verification", property: "", content: "twh401qzi7r7o3n227q4sg3hghbpzh" },
      { name: "title", property: "", content: "Whizlabs Trainers - Whizlabs" },
      {
        name: "description",
        property: "",
        content:
          "Are you a certified technology enthusiast with a passion to share your knowledge with others? Become a Whizlabs trainer and help candidates in their certification preparation.",
      },
      { name: "keywords", property: "", content: "Whizlabs Trainers" },
      { name: "", property: "og:locale", content: "en_US" },
      { name: "", property: "og:type", content: "website" },
      { name: "", property: "og:title", content: "Whizlabs Trainers - Whizlabs" },
      {
        name: "",
        property: "og:description",
        content:
          "Are you a certified technology enthusiast with a passion to share your knowledge with others? Become a Whizlabs trainer and help candidates in their certification preparation.",
      },
      { name: "", property: "og:url", content: "https://www.whizlabs.com/whizlabs-trainers/" },
      { name: "", property: "og:site_name", content: "Whizlabs" },
      {
        name: "",
        property: "og:image",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ade62202700",
      },
      { name: "", property: "fb:app_id", content: "502194103558420" },
      { name: "", property: "og:image:width", content: "500" },
      { name: "", property: "og:image:height", content: "500" },
      { name: "twitter:card", property: "", content: "summary" },
      {
        name: "twitter:description",
        property: "",
        content:
          "Are you a certified technology enthusiast with a passion to share your knowledge with others? Become a Whizlabs trainer and help candidates in their certification preparation.",
      },
      { name: "twitter:title", property: "", content: "Whizlabs Trainers - Whizlabs" },
      { name: "twitter:site", property: "", content: "@whizlabs" },
      {
        name: "twitter:image",
        property: "",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ade6220275b",
      },
      { name: "twitter:creator", property: "", content: "@whizlabs" },
    ],
  };
  

  const categoryList = [
    "aws_list",
    "microsoft_list",
    "google_list",
    "devops_list",
    "pmp_list",
    "java_list",
  ];
  const aws = [219, 153, 160, 158, 302, 326];
  const microsoft = [256, 331, 343, 340];
  const google = [239, 274, 296];
  const devops = [282, 261, 265];
  const pmp = [235];
  const java = [334];

  let aws_list = [];
  let microsoft_list = [];
  let google_list = [];
  let devops_list = [];
  let pmp_list = [];
  let java_list = [];

  // AWs
  for (let i = 0; i < aws.length; i++) {
    try {
      let courseResponse = await axios.get(baseUrl + "/courses", {
        params: {
          course_id: aws[i],
          get_detail_info: 1,
        },
      });
      if (courseResponse && courseResponse.data.data.id) {
        aws_list.push(courseResponse.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Micorsoft
  for (let i = 0; i < microsoft.length; i++) {
    try {
      let courseResponse = await axios.get(baseUrl + "/courses", {
        params: {
          course_id: microsoft[i],
          get_detail_info: 1,
        },
      });
      if (courseResponse && courseResponse.data.data.id) {
        microsoft_list.push(courseResponse.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Google
  for (let i = 0; i < google.length; i++) {
    try {
      let courseResponse = await axios.get(baseUrl + "/courses", {
        params: {
          course_id: google[i],
          get_detail_info: 1,
        },
      });
      if (courseResponse && courseResponse.data.data.id) {
        google_list.push(courseResponse.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // devops
  for (let i = 0; i < devops.length; i++) {
    try {
      let courseResponse = await axios.get(baseUrl + "/courses", {
        params: {
          course_id: devops[i],
          get_detail_info: 1,
        },
      });
      if (courseResponse && courseResponse.data.data.id) {
        devops_list.push(courseResponse.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // pmp
  for (let i = 0; i < pmp.length; i++) {
    try {
      let courseResponse = await axios.get(baseUrl + "/courses", {
        params: {
          course_id: pmp[i],
          get_detail_info: 1,
        },
      });
      if (courseResponse && courseResponse.data.data.id) {
        pmp_list.push(courseResponse.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // java
  for (let i = 0; i < java.length; i++) {
    try {
      let courseResponse = await axios.get(baseUrl + "/courses", {
        params: {
          course_id: java[i],
          get_detail_info: 1,
        },
      });
      if (courseResponse && courseResponse.data.data.id) {
        java_list.push(courseResponse.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return {
    props: {
      datas: {
        aws_list: aws_list,
        microsoft_list: microsoft_list,
        google_list: google_list,
        devops_list: devops_list,
        pmp_list: pmp_list,
        java_list: java_list,
      },
      categoryList: categoryList,
      seoHomePageData,
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WhizScholar);
