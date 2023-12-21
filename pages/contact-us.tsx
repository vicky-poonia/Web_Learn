import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Recaptcha from "react-recaptcha";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { connect } from "react-redux";
import { alertBox } from "redux/AlertBox/alert-actions";
import { loadScript } from "helpers/customHooks";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { isValidPhoneNumber,parsePhoneNumber } from 'react-phone-number-input'
const JS_SCRIPT = "https://www.google.com/recaptcha/api.js";

const Contact = ({ alertBoxAction, seoHomePageData }) => {
  const recaptcha = useRef(null);
  const [recaptchaVerified, SetRecaptchaVerified] = useState(false);
  const { register, handleSubmit, watch, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [phonenumber,setPhonenumber] = useState("91")
  const [phonewithoutdails,setPhonewithoutdail] = useState("")
  const [validPhone,setvalidPhone] = useState(null)
  const [countryData,setCountryData] = useState(null)
  
  
  const validateInputFields = (value) => {
    if (value.trim().length !== value.length) {
      return false;
    }
    return true;
  };
  const validateInputFieldName = (value) => {
    if (!value.trim()) {
      return 'This field is required';
    }
    if (!/^(?!^\s+$)[a-zA-Z ]+$/.test(value)) {
      return 'Only alphabetic characters are allowed';
    }
    return true;
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
        setvalidPhone(null)
      }
    }
  },[phonenumber,countryData])
  const subjectOptions = {
    data: [
      {
        key: "Account_Information_Delete_Account",
        value: "Account Information - Delete account",
      },
      {
        key: "Account_Information_Course_Issues",
        value: "Account Information - Course Issues",
      },
      {
        key: "Account_Information_Others",
        value: "Account Information - Others",
      },
      {
        key: "Account_Information_Password_Reset",
        value: "Account Information - Password Reset",
      },
      {
        key: "Account_Information_Update_Account_Details",
        value: "Account Information - Update Account Details",
      },
      {
        key: "AWS_Feedback_to_Questions",
        value: "AWS - Feedback to Questions",
      },
      {
        key: "Azure_Feedback_to_Questions",
        value: "Azure - Feedback to Questions",
      },
      {
        key: "Course_Clarification_Amazon_Web_Service",
        value: "Course Clarification - Amazon Web Service (AWS)",
      },
      {
        key: "Course_Clarification_Azure",
        value: "Course Clarification - Azure",
      },
      {
        key: "Course_Clarification_Big_Data",
        value: "Course Clarification - Big Data",
      },
      {
        key: "Course_Clarification_Java",
        value: "Course Clarification - Java",
      },
      {
        key: "Course_Clarification_Others",
        value: "Course Clarification - Others",
      },
      {
        key: "Course_Clarification_Project_Management",
        value: "Course Clarification - Project Management",
      },
      { key: "Course_Discount_Quality", value: "Course Discount - Quality" },
      { key: "Duplicate_Ticket", value: "Duplicate Ticket" },
      {
        key: "Feedback_Course_Content_Ticket",
        value: "Feedback - Course Content Ticket",
      },
      {
        key: "Feedback_Customer_Support",
        value: "Feedback - Customer Support",
      },
      { key: "Feedback_Website", value: "Feedback - Website" },
    ],
  };

  const recaptchaLoader = () => {};
  const verifyCallback = (response) => {
    if (response) SetRecaptchaVerified(true);
  };

  const onSubmit = async (formData, e) => {
    let new_phone = phonenumber.slice(countryData.countryCode.length)
    if(new_phone.length > 0 )
    {
      let number = "+" + phonenumber
      let valid = isValidPhoneNumber(number)
      if(!valid)
      {
        setvalidPhone(false)
        return
      }
      else{
        setvalidPhone(null)
      }
    }
    setLoading(true);


    const insertData = JSON.stringify({
      name: formData.full_name,
      email: formData.email,
      phone:new_phone.length > 0 ?"+" + phonenumber:"",
      subject: formData.subject,
      description: formData.description,
    });

    if (recaptchaVerified) {
      const { data } = await axios.post(baseUrl + "/web/contact", insertData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // setErrMsg("Thank you for contacting us. Our team will contact you shortly.");
      setPhonenumber("91")
      setvalidPhone(null)
      e.target.reset(); // reset form inputs
      alertBoxAction({
        type: "SUCCESS",
        title: "",
        msg: "Thank you. We have received your inquiry. We will contact you shortly.",
      });
      recaptcha.current.reset();
      setLoading(false);
    } else {
      alertBoxAction({
        type: "ERROR",
        title: "Recaptcha Error",
        msg: "Please verify recaptcha",
      });
      setLoading(false);
    }
  };
  return (
    <>
      {/* <Head>
        <title>Contact Us | Whizlabs</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />

        <meta name="title" content="Contact Us - Whizlabs" />
        <meta
          name="description"
          content="Have any query or concern? We provide 24/7 customer and expert support. Submit your query and reach out to us, we&#039;ll respond in no time. You can also reach us at support@whizlabs.com"
        />
        <meta name="keywords" content="contact us" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact Us - Whizlabs" />
        <meta
          property="og:description"
          content="Have any query or concern? We provide 24/7 customer and expert support. Submit your query and reach out to us, we&#039;ll respond in no time. You can also reach us at support@whizlabs.com"
        />
        <meta property="og:url" content="https://www.whizlabs.com/contact-us/" />
        <meta property="og:site_name" content="Whizlabs" />
        <meta
          property="og:image"
          content={
            process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ac9513d04f1"
          }
        />
        <meta property="fb:app_id" content="502194103558420" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="Have any query or concern? We provide 24/7 customer and expert support. Submit your query and reach out to us, we&#039;ll respond in no time. You can also reach us at support@whizlabs.com"
        />
        <meta name="twitter:title" content="Contact Us - Whizlabs" />
        <meta name="twitter:site" content="@whizlabs" />
        <meta
          name="twitter:image"
          content={
            process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ac9513d0549"
          }
        />
        <meta name="twitter:creator" content="@whizlabs" />
      </Head> */}
      {/* <!-- contactus-banner --> */}
      <div className="contactus-banner">
        <div className="container">
          <div className="heading">
            <h1>We’re here to help!</h1>
            <p>Ask us everything and we would love to hear from you</p>
          </div>
          <div className="block-group">
            <div className="block">
              <figure>
                <img className="img-full" src="/images/customer-support.svg" alt="" />
              </figure>
              <div className="title">Customer Support</div>
              <a href="mailto:support@whizlabs.com">support@whizlabs.com</a>
              <br />
              <a href="tel:916364678444">+91-6364678444</a>
            </div>
            <div className="block">
              <figure>
                <img className="img-full" src="/images/corporate-building.svg" alt="" />
              </figure>
              <div className="title">For Business</div>
              <a href="mailto:corporate@whizlabs.com">contact@whizlabs.com</a>
              <br />
              <a href="tel:919091849091">+91-9091849091</a>
            </div>
            {/* <div className="block">
              <figure>
                <img className="img-full" src="/images/invoice.svg" alt="" />
              </figure>
              <div className="title">Invoice</div>
              <a href="mailto:finance@whizlabs.com">finance@whizlabs.com</a>
            </div>
            <div className="block">
              <figure>
                <img className="img-full" src="/images/labs-icons.svg" alt="" />
              </figure>
              <div className="title">Hands on Labs</div>
              <a href="mailto:labsupport@whizlabs.com">labsupport@whizlabs.com</a>
            </div> */}
          </div>
        </div>
      </div>

      {/* <!-- content area part -->  */}
      <div id="content-area" className="contactus-page">
        <div className="contact-block">
          <div className="container-small">
            <div className="left-block">
              <ul className="social-block">
                <li>
                  <a
                    href="https://www.facebook.com/whizlabs.software/"
                    className="icon icon-font-facebook"
                    target="_blank"
                  ></a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/whizlabs"
                    className="icon"
                    target="_blank"
                  >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="30"
                    zoomAndPan="magnify"
                    viewBox="0 0 375 374.9999"
                    preserveAspectRatio="xMidYMid meet"
                    version="1.0"
                    fill="#ffffff"
                  >
                    <defs>
                      <path
                        d="M 7.09375 7.09375 L 367.84375 7.09375 L 367.84375 367.84375 L 7.09375 367.84375 Z M 7.09375 7.09375 "
                        fill="#ffffff"
                      ></path>
                    </defs>
                    <g>
                      <path
                        d="M 187.46875 7.09375 C 87.851562 7.09375 7.09375 87.851562 7.09375 187.46875 C 7.09375 287.085938 87.851562 367.84375 187.46875 367.84375 C 287.085938 367.84375 367.84375 287.085938 367.84375 187.46875 C 367.84375 87.851562 287.085938 7.09375 187.46875 7.09375 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                        fill="#ffffff"
                      ></path>
                    </g>
                    <g transform="translate(85, 75)">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        version="1.1"
                        height="215"
                        width="215"
                      >
                        <path
                          d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                          fill="#000000"
                        ></path>
                      </svg>
                    </g>
                  </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/whizlabs-software/"
                    className="icon icon-font-linkedin"
                    target="_blank"
                  ></a>
                </li>
                {/* <li><a href="#" className="icon icon-font-instagram" target="_blank"></a></li> */}
              </ul>
              <h2>Find us on the Socials</h2>
              <p>Want to keep in touch? Follow us on your preferred social media platforms</p>
            </div>
            <div className="right-block">
              {errMsg && (
                <p
                  style={{
                    margin: "0",
                    color: "coral",
                    fontSize: "1.3em",
                  }}
                >
                  {errMsg}
                </p>
              )}
              <div className="title">
                Send us a <strong>Message</strong>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-box-group">
                  <div className="input-box">
                    <label>
                      Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="bg-ghostwhite"
                      name="full_name"
                      ref={register({ required: true , pattern: /^(?!^\s+$)[a-zA-Z ]+$/ ,validate:validateInputFieldName  })}
                    />
                    {errors.full_name?.type === "required" && (
                      <span style={{ color: "red" }}>This field is required</span>
                    )}
                    {errors.full_name?.type === "pattern" && (
                      <span style={{ color: "red" }}>Only alphabetic characters are allowed</span>
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
                      <span style={{ color: "red" }}>Please enter valid email.</span>
                    )}
                  </div>
                  <div className="input-box" style={{marginTop:"24px"}}>
                    {/* <input
                      type="tel"
                      className="bg-ghostwhite"
                      name="phone"
                      ref={register({ pattern: /[0-9]{10}/})}
                      minLength={10}
                      maxLength={10}
                    />
                    {errors.phone && errors.phone.type =="pattern" &&  (
                      <span style={{ color: "red" }}>Please enter valid phone number.</span>
                    )} */}
                    <PhoneInput
                    enableSearch = {true}
                    enableTerritories ={true}
                      value={phonenumber}
                      countryCodeEditable={false}
                      onChange={phone => setPhonenumber(phone)}
                      isValid={(value,country)=>{
                        setCountryData(country)
                        return true
                      }}
                    />
                    {validPhone != null  &&  validPhone == false &&<>
                      <span style={{color:"red"}}>Enter Valid Phone Number</span>
                    </>}
                  </div>
                  <div className="input-box">
                    <label>
                      Subject Type <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="selectbox">
                      <select
                        name="subject"
                        ref={register({ required: true })}
                        style={{
                          display: "block",
                          background: " #f3f3f4",
                          height: " 40px",
                          border: " none",
                          borderRadius: "6px",
                        }}
                      >
                        <option value="">Select Subject</option>
                        {subjectOptions.data.map(function (data, key) {
                          return (
                            <option key={key} value={data.key}>
                              {data.value}
                            </option>
                          );
                        })}
                      </select>
                      {errors.subject && errors.subject.type === "required" && (
                        <span style={{ color: "red" }}>This field is required</span>
                      )}
                    </div>
                  </div>
                  <div className="textarea-box">
                    <label>
                      Describe Briefly <span style={{ color: "red" }}>*</span>
                    </label>
                    <textarea name="description" ref={register({ required: true ,validate:validateInputFields  })}></textarea>
                    {errors.description &&( errors.description.type === "required" || errors.description.type==="validate") && (
                      <span style={{ color: "red" }}>This field is required</span>
                    )}
                  </div>
                </div>
                <div className="captcha-img">
                  <Recaptcha
                    ref={recaptcha}
                    sitekey="6LeuGo4UAAAAAIZ6-Na4KHV_sIEJNjt-XlRO-Jgk"
                    render="explicit"
                    verifyCallback={verifyCallback}
                    onloadCallback={recaptchaLoader}
                    theme="light"
                  />
                </div>
                <button disabled={loading} className="btn btn-submit">
                  {!loading ? "Submit" : <img width={40} height={40} src="/images/loader.svg" />}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="address-block">
          <div className="container-small">
            <div className="block-group">
              <div className="block">
                <h3>
                  Registered Office
                  <br />
                  <span>Whizlabs Software India Pvt. Ltd.</span>
                </h3>
                <p>
                  C-7/6, Mianwali Nagar,
                  <br />
                  Paschim Vihar, North West Delhi,
                  <br />
                  Delhi – 110041
                </p>
              </div>
              <div className="block">
                <h3>
                Head Office
                  <br />
                  <span>Whizlabs Software Private Limited</span>
                </h3>
                <p>
                  3rd Floor , Dev Complex
                  <br />
                  Namachivaya Nagar, Saravanampatti
                  <br /> Coimbatore – 641035, Tamilnadu
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    alertBoxAction: (data) => dispatch(alertBox(data)),
  };
};

export default connect(null, mapDispatchToProps)(Contact);


export async function getServerSideProps() {
  const seoHomePageData = {
    seoPageType: "contactUsPage", 
    title: "Contact Us | Whizlabs",
    metaTags: [
      {
        name: "facebook-domain-verification",
        property: "",
        content: "twh401qzi7r7o3n227q4sg3hghbpzh",
      },
      { name: "title", property: "", content: "Contact Us - Whizlabs" },
      {
        name: "description",
        property: "",
        content:
          "Have any query or concern? We provide 24/7 customer and expert support. Submit your query and reach out to us, we'll respond in no time. You can also reach us at support@whizlabs.com",
      },
      { name: "keywords", property: "", content: "contact us" },
      { name: "", property: "og:locale", content: "en_US" },
      { name: "", property: "og:type", content: "website" },
      { name: "", property: "og:title", content: "Contact Us - Whizlabs" },
      {
        name: "",
        property: "og:description",
        content:
          "Have any query or concern? We provide 24/7 customer and expert support. Submit your query and reach out to us, we'll respond in no time. You can also reach us at support@whizlabs.com",
      },
      { name: "", property: "og:url", content: "https://www.whizlabs.com/contact-us/" },
      { name: "", property: "og:site_name", content: "Whizlabs" },
      {
        name: "",
        property: "og:image",
        content:
          process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ac9513d04f1",
      },
      { name: "", property: "fb:app_id", content: "502194103558420" },
      { name: "", property: "og:image:width", content: "500" },
      { name: "", property: "og:image:height", content: "500" },
      { name: "twitter:card", property: "", content: "summary" },
      {
        name: "twitter:description",
        property: "",
        content:
          "Have any query or concern? We provide 24/7 customer and expert support. Submit your query and reach out to us, we'll respond in no time. You can also reach us at support@whizlabs.com",
      },
      { name: "twitter:title", property: "", content: "Contact Us - Whizlabs" },
      { name: "twitter:site", property: "", content: "@whizlabs" },
      {
        name: "twitter:image",
        content:
          process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ac9513d0549",
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