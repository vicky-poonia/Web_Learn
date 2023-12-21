import { MessageError } from "@/components/import";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useRef, useState ,useEffect } from "react";
import { useForm } from "react-hook-form";
var Recaptcha = require("react-recaptcha");
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { connect } from "react-redux";
import { alertBox } from "redux/AlertBox/alert-actions";
import { Accordions } from "@/components/import";
import { loadScript } from "helpers/customHooks";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { isValidPhoneNumber } from 'react-phone-number-input'

const JS_SCRIPT = "https://www.google.com/recaptcha/api.js";
const Instructor = (seoHomePageData) => {
  const formRef = useRef(null);
  const router = useRouter();

  const recaptcha = useRef(null);

  const [recaptchaVerified, SetRecaptchaVerified] = useState(false);
  const [phonenumber,setPhonenumber] = useState("91");
  const [validPhone,setvalidPhone] = useState(null);
  const [countryData,setCountryData] = useState(null);
  const [phoneRequired,setPhoneRequired]=useState(false);

  const recaptchaLoader = () => {};
  const verifyCallback = (response) => {
    if (response) SetRecaptchaVerified(true);
  };

  useEffect(() => {
    loadScript(JS_SCRIPT);
    }, []);
  
  useEffect(()=>{
    if(countryData && phonenumber)
    {
      let new_phone = phonenumber.slice(countryData.countryCode.length)
      if(new_phone.length == 0)
      {
        setvalidPhone(null);
      }
    }
  },[phonenumber,countryData])  
  
  const goToInsturctorForm = () => {
    // onclick button to scroll into form section.
    window.scrollTo({
      behavior: "smooth",
      top: formRef.current.offsetTop,
    });
  };

  const { register, handleSubmit, watch, errors } = useForm();
  const validateInputFields = (value) => {
    if (value === " " || value==="") {
      return "Value can not be an empty string";
    }
    if (value.trim().length !== value.length) {
      return false;
    }
    return true;
  };
  const onSubmit = async (formData, e) => {
    if (phonenumber===countryData.countryCode){
      setPhoneRequired(true);
      return;
    }
    else{
      setPhoneRequired(false);
    }
    let new_phone = phonenumber.slice(countryData.countryCode.length)
    if(new_phone.length > 0 )
    {
      let number = "+" + phonenumber
      let valid = isValidPhoneNumber(number)
      if(!valid)
      {
        setvalidPhone(false)
        setPhoneRequired(false);
        return
      }
      else{
        setvalidPhone(null)
      }
    }

    const insertData = JSON.stringify(formData);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    
    if (recaptchaVerified) {
      const { data } = await axios.post(baseUrl + "/web/bai", insertData, config);
      setPhonenumber("91");
      setvalidPhone(null);
      e.target.reset(); // reset form inputs
      router.push("/become-an-instructor/thankyou");
    } else {
      alertBox({
        type: "ERROR",
        title: "Recaptcha Error",
        msg: "Please verify recaptcha",
      });
    }
  };

  const faqData = [
    {
      question: `Why should I become a Whizlabs instructor?`,
      answer: `<p>
      Not to mention, Whizlabs is a renowned name in the
      online certification training industry. If you
      want to build your career with a leading tech
      company, Whizlabs is the right choice for you.
      Here are some of the important benefits that you
      can get while working with Whizlabs:
    </p>
    <ul>
      <li>Earn extra income</li>
      <li>Be a part of a global team</li>
      <li>Get recognized across the world</li>
      <li>Inspire professionals to enrich career</li>
      <li>Work with an international organization</li>
    </ul>`,
    },
    {
      question: `Who can become an instructor at the Whizlabs?`,
      answer: `<p>
      Anyone, who has a passion for teaching and want to
      share his knowledge with the world, can become an
      instructor at Whizlabs. With significant knowledge
      and effective verbal communication skills, you can
      convey your thoughts to the millions of
      professionals across the world. So, all that is
      required to become a Whizlabs instructor is –
    </p>
    <ul>
      <li>
        A great passion for teaching and sharing
        knowledge
      </li>
      <li>
        Domain expertise with a relevant degree and
      </li>
      <li>
        certifications Excellent communication skills
      </li>
      <li>
        Commitment to create and deliver
        best-in-industry training courses
      </li>
    </ul>`,
    },
    {
      question: `How to become a Whizlabs instructor?`,
      answer: `<p>
      The application process is very simple to become
      an instructor at Whizlabs. You just need to submit
      the application form with the basic details, your
      expertise, Linkedin profile link, certification
      details, and any sample video of your work. We’ll
      review your application and get back to you
    </p>`,
    },
    {
      question: `How much can I earn as a Whizlabs instructor?`,
      answer: `<p>
      At Whizlabs, we value the effort and time you put
      to train our students. And so, we offer you a
      flexible and fair compensation for your work. As a
      Whizlabs instructor, you provide you a great
      opportunity to earn a significant amount for your
      work. We also motivate our instructors with
      appreciation and rewards, so Whizlabs is the right
      place for you to enrich your teaching career.
    </p>`,
    },
    {
      question: `Do I need to sign any contract to become a
      Whizlabs instructor?`,
      answer: `<p>
      Just like other business policies, we have one for
      the Whizlabs instructors. We ask our instructors
      to sign a Non-disclosure agreement (NDA) with some
      defined terms and conditions
    </p>`,
    },
    {
      question: `Do you bind instructors for a period or so?`,
      answer: `<p>
      Although we don’t bind instructors to work with us
      for a specific period, they can’t leave the
      project in between. Also, an instructor needs to
      inform in advance about his unavailability or
      termination of services.
    </p>`,
    },
  ];

  return (
    <>
      <Head>
        <title>Become an Instructor at Whizlabs</title>

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
        <meta property="og:url" content="https://www.whizlabs.com/become-an-instructor/" />
        <meta property="og:site_name" content="Whizlabs" />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acdf330250e"}
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
          content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acdf3302550"}
        />
        <meta name="twitter:creator" content="@whizlabs" />
      </Head>
      {/* affiliate-banner-part */}
      <div className="banner-become-instructor">
        <div className="container-small">
          <div className="left-block">
            <h1 className="title">Become an Instructor</h1>
            <p>
              Passionate about teaching? Become an instructor at Whizlabs and share your knowledge
              with the professionals to get ahead in their careers.
            </p>
            {/* <p>
              Convert your passion for teaching into the profession. We provide
              you platform where you can connect with professionals, share your
              knowledge with the world, enrich careers, and earn at the same
              time. We deal with a wide range of technologies, so just tell us
              your expertise and we’ll give you the opportunity
            </p> */}
            <a onClick={goToInsturctorForm} className="btn affiliate-btn">
              Become an Instructor
            </a>
          </div>
          <div className="right-block">
            <img className="img-full" src="/images/banner-becomean-instroctor2x.png" alt="" />
          </div>
        </div>
      </div>

      {/* <!-- content area part -->  */}
      <div id="content-area" className="become-instructor">
        {/* <!-- enterprice-block --> */}
        <div className="enterprice-block">
          <div className="container-small">
            <div className="block-group">
              <div className="block">
                <figure>
                  <img className="img-full" src="/images/enterprice-img1.svg" alt="" />
                </figure>
                <div className="content">
                  <strong>177+</strong>
                  <span>Learning Courses</span>
                </div>
              </div>
              <div className="block">
                <figure>
                  <img className="img-full" src="/images/enterprice-img2.svg" alt="" />
                </figure>
                <div className="content">
                  <strong>100+</strong>
                  <span>Countries</span>
                </div>
              </div>
              <div className="block">
                <figure>
                  <img className="img-full" src="/images/enterprice-img3.svg" alt="" />
                </figure>
                <div className="content">
                  <strong>2M+</strong>
                  <span>Learners worldwide</span>
                </div>
              </div>
              <div className="block">
                <figure>
                  <img className="img-full" src="/images/enterprice-img4.svg" alt="" />
                </figure>
                <div className="content">
                  <strong>2000+</strong>
                  <span>Enterprise Customers</span>
                </div>
              </div>
            </div>
            <div className="caption-block">
              <div className="left">
                <p>
                  Our mission at Whizlabs is to help professionals get certified with our
                  world-class training. If you help the same passion, become an instructor at
                  Whizlabs and share your knowledge with millions of students over the globe.
                </p>
              </div>
              <div className="right">
                <p>
                  At Whizabs, we are aimed to build a team of world-class instructors. We always
                  welcome industry-experts in various domains including Big Data, Cloud Computing,
                  Java, Project Management, Linux, Networking, and Digital Marketing. We invite
                  experts to join our team and create high-quality courses that can create a buzz.
                  <br />
                  <br />
                  <strong>Have a passion for teaching? You have reached the right place!</strong>
                </p>
                <p>
                  Whizlabs provides you a platform to share your knowledge, help professionals to
                  enrich their careers, and make huge earnings. The process to become an instructor
                  is very simple; just connect with us and we’ll get back to you in no time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- how-work-block --> */}
        <div className="how-work-block">
          <div className="container-small">
            <div className="head-block">
              <h2>How does it work?</h2>
              <p>
                You just reach us and we’ll do the rest. Submit the application form and we will get
                back to you to proceed further. Once your application is shortlisted, our training
                experts will help you with the course development and delivery.
              </p>
            </div>
            <div className="steps-group">
              <div className="step">
                <span>Step 1</span>
                <figure>
                  <img className="img-full" src="/images/howdoes-work-img1.svg" alt="" />
                </figure>
                <p>Choose a course topic you’re expertise in</p>
              </div>
              <div className="step">
                <span>Step 2</span>
                <figure>
                  <img className="img-full" src="/images/howdoes-work-img2.svg" alt="" />
                </figure>
                <p>Develop and deliver the course</p>
              </div>
              <div className="step">
                <span>Step 3</span>
                <figure>
                  <img className="img-full" src="/images/howdoes-work-img3.svg" alt="" />
                </figure>
                <p>Share your knowledge with the world</p>
              </div>
              <div className="step">
                <span>Step 4</span>
                <figure>
                  <img className="img-full" src="/images/howdoes-work-img4.svg" alt="" />
                </figure>
                <p>Earn! Earn! Earn! and Enjoy</p>
              </div>
            </div>
            <p ref={formRef}>
              All you need are the two things - one is knowledge and the other is passion. If you
              have both, we have a number of opportunities for you.
            </p>
            <div className="form-block">
              <h3>
                Apply now to <strong>Become a Instructor</strong>
              </h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-box-group">
                  <div className="input-box">
                    <label>
                      First Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="bg-ghostwhite"
                      name="first_name"
                      ref={register({ required: true , validate:validateInputFields })}
                    />
                    {errors.first_name && (
                      <span style={{ color: "red" }}>This field is required</span>
                    )}
                  </div>
                  <div className="input-box">
                    <label>
                      Last Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="bg-ghostwhite"
                      name="last_name"
                      ref={register({ required: true ,validate:validateInputFields })}
                    />
                    {errors.last_name && (
                      <span style={{ color: "red" }}>This field is required</span>
                    )}
                  </div>

                  <div className="input-box">
                    <label>
                      Email <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="email"
                      className="bg-ghostwhite"
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
                      <span style={{ color: "red" }}>Please enter valid email</span>
                    )}
                  </div>
                  <div className="input-box" style={{marginTop:"24px"}}>
                    {/* <label>Phone <span style={{ color: "red" }}>*</span></label>
                    <input
                      type="text"
                      className="bg-ghostwhite"
                      name="phone"
                      ref={register({required:true, pattern: /^[0-9]+$/i })}
                    />
                    {errors.phone && errors.phone.type === "required" && (
                      <span style={{ color: "red" }}>This field is required</span>
                    )}
                    {errors.phone && errors.phone.type === "pattern" && (
                      <span style={{ color: "red" }}>Please enter valid mobile number</span>
                    )} */}
                     <PhoneInput
                      enableSearch = {true}
                      enableTerritories ={true}
                      value={phonenumber}
                      countryCodeEditable={false}
                      inputProps={{
                        name:'phone',
                        required: true,
                      }}
                      onChange={phone=> {setPhonenumber(phone);setPhoneRequired(false);}}
                      isValid={(value,country)=>{
                        setCountryData(country)
                        return true
                      }}
                    />
                      <span style={{ color: "red" ,position:"relative",bottom:"64px", left:"43px"}}>*</span>
                    {validPhone != null  &&  validPhone == false &&<>
                      <span style={{color:"red"}}>Enter Valid Phone Number</span>
                    </>}
                    {phoneRequired==true&& <>
                      <span style={{color:"red"}}>This field is required</span>
                    </> }
                  </div>
                  <div className="input-box textarea-box">
                    <label>
                      Expertise/Skills <span style={{ color: "red" }}>*</span>
                    </label>
                    <textarea name="skills" ref={register({ required: true ,validate:validateInputFields })}></textarea>
                    {errors.skills && <span style={{ color: "red" }}>This field is required</span>}
                  </div>
                  <div className="input-box textarea-box">
                    <label>Certification <span style={{ color: "red" }}>*</span>

                    </label>
                    <textarea name="certification" ref={register({ required: true ,validate:validateInputFields })}></textarea>
                    {errors.certification && (
                      <span style={{ color: "red" }}>This field is required</span>
                    )}
                  </div>
                  <div className="input-box full">
                    <label>Add LinkedIn URL <span style={{ color: "red" }}>*</span></label>
                    <input
                      type="text"
                      className="bg-ghostwhite"
                      name="linkedin_url"
                      ref={register({ required: true ,validate:validateInputFields })}
                    />
                    {errors.linkedin_url && (
                      <span style={{ color: "red" }}>This field is required</span>
                    )}
                  </div>
                  <div className="input-box">
                    <label>Video Url <span style={{ color: "red" }}>*</span></label>
                    <input
                      type="text"
                      className="bg-ghostwhite"
                      name="video_url"
                      ref={register({ required: true ,validate:validateInputFields })}
                    />
                    {errors.video_url && (
                      <span style={{ color: "red" }}>This field is required</span>
                    )}
                  </div>
                  <div className="input-box upload-block">
                    {/* <label>&nbsp;</label>
                    <div className="drag-form">
                      <div className="dropzone-desc">
                        <i className="icon icon-font-upload"></i>
                        <span>Uploads & Drag Videos</span>
                      </div>
                      <input type="file" id="dropzone" className="dropzone" />
                    </div> */}
                    {/* <div className="min-requirement">
                      <div className="file-name">
                        <span></span>
                        <i className="icon icon-font-cross"></i>
                      </div>
                    </div> */}
                  </div>
                  <div className="info-block">
                    Your sample video will help us to evaluate your teaching and delivery
                  </div>
                </div>
                <div className="captcha-img">
                  <Recaptcha
                    sitekey="6LeuGo4UAAAAAIZ6-Na4KHV_sIEJNjt-XlRO-Jgk"
                    render="explicit"
                    verifyCallback={verifyCallback}
                    onloadCallback={recaptchaLoader}
                    ref={recaptcha}
                    theme="light"
                  />
                </div>

                <button type="submit" className="btn btn-applynow">
                  Apply Now
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* <!-- faq-block --> */}
        <div id="faq" className="faq-block">
          <div className="container-small">
            <div className="container-left">
              <h3 className="title">Frequently Asked Questions</h3>
              <div id="parentHorizontalTab2" className="tab_wrapper">
                <div className="resp-tabs-container hor_1 content_wrapper">
                  <div
                    // title="exam&products"
                    className="tab_content active"
                    id="exam&products"
                    style={{ display: "block" }}
                  >
                    <div className="accordian-block">
                      <div className="accordian-list">
                        {faqData.map((e, i) => (
                          <Accordions
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

        {/* <!-- discuss-team-block --> */}
        <div className="discuss-team-block">
          <div className="container-small">
            <div className="left-block">
              <figure>
                <img className="img-full" src="/images/discussion-team.png" alt="" />
              </figure>
            </div>
            <div className="right-block">
              <h5 className="title">
                <span>More Questions?</span>Discuss with our Support Team
              </h5>
              <div className="discuss-link">
                {/* <a href="tel:+916364678444" className="btn link">
                  <i className="icon icon-font-call"></i>+91-6364678444
                </a> */}
                <a href="mailto:support@whizlabs.com" className="btn link">
                  <i className="icon icon-font-mail"></i>support@whizlabs.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const seoHomePageData = {
    seoPageType: "becomeAnInstructorPage", // Updated to reflect the actual page type
    title: "Become an Instructor at Whizlabs",
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
      {
        name: "",
        property: "og:locale",
        content: "en_US",
      },
      {
        name: "",
        property: "og:type",
        content: "website",
      },
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
      {
        name: "",
        property: "og:url",
        content: "https://www.whizlabs.com/become-an-instructor/",
      },
      {
        name: "",
        property: "og:site_name",
        content: "Whizlabs",
      },
      {
        name: "",
        property: "og:image",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acdf330250e",
      },
      {
        name: "",
        property: "fb:app_id",
        content: "502194103558420",
      },
      {
        name: "twitter:card",
        property: "",
        content: "summary",
      },
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
      {
        name: "twitter:site",
        property: "",
        content: "@whizlabs",
      },
      {
        name: "twitter:image",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acdf3302550",
      },
      {
        name: "twitter:creator",
        property: "",
        content: "@whizlabs",
      },
    ],
  };  

  return {
    props: {
	  seoHomePageData,
    },
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    alertBox: (data) => dispatch(alertBox(data)),
  };
};

export default connect(null, mapDispatchToProps)(Instructor);
