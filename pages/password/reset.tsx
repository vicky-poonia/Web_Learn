import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { resetPassword, resetPasswordActive } from "@/services/reseller-services/services";
import { connect } from "react-redux";
import { alertBox } from "redux/AlertBox/alert-actions";
import Recaptcha from "react-recaptcha";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { loadScript } from "helpers/customHooks";

const JS_SCRIPT = "https://www.google.com/recaptcha/api.js";
const ResetPassword = ({ alertBox, seoHomePageData }) => {
  const router = useRouter();
  const recaptcha = useRef(null);
  const [recaptchaVerified, SetRecaptchaVerified] = useState(false);
  const [token, setToken] = useState(router.query.token);
  const [email, setEmail] = useState(router.query.email);
  const { register, handleSubmit, watch, errors } = useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [isExpired, setIsExpired] = useState(true);
  useEffect(() => {
    loadScript(JS_SCRIPT);
  }, []);

  const fetchActiveURL = async () => {
    setIsLoading(true);
    let response = await resetPasswordActive({
      token,
      email: email.toString().toLowerCase(),
    });
    setIsLoading(false);

    if (response && response.data) {
      if (response.data.status == 1) {
        setIsExpired(false);
      } else if (response.data?.message) {
        alertBox({
          type: "ERROR",
          title: "Error",
          msg: response.data?.message,
        });
      } else {
        alertBox({
          type: "ERROR",
          title: "Error",
          msg: "Invalid Token/Email Provided",
        });
      }
    } else {
      alertBox({
        type: "ERROR",
        title: "Recaptcha Error",
        msg: "Please verify recaptcha",
      });
    }
  };

  useEffect(() => {
    fetchActiveURL();
  }, [token, email]);

  const onSubmit = async (formData, e) => {
    if (recaptchaVerified) {
      let response = await resetPassword({
        token,
        email: email.toString().toLowerCase(),
        password: formData.confirm_password,
      });
      if (response && response.data) {
        if (response.data.status == 1) {
          alertBox({
            type: "SUCCESS",
            title: "Success",
            msg: "Password Updated.",
          });
          e.target.reset();
          router.push("/");
        } else if (response.data?.message) {
          alertBox({
            type: "ERROR",
            title: "Error",
            msg: response.data?.message,
          });
        } else {
          alertBox({
            type: "ERROR",
            title: "Error",
            msg: "Invalid Token/Email Provided",
          });
        }
      }
    } else {
      alertBox({
        type: "ERROR",
        title: "Recaptcha Error",
        msg: "Please verify recaptcha",
      });
    }
  };

  const recaptchaLoader = () => {};
  const verifyCallback = (response) => {
    if (response) SetRecaptchaVerified(true);
  };

  const validatePassword = (value) => {
    // if (/\s/.test(value)) {
    //   return "Space is not allowed";
    // }
    // if (!/(?=.*[A-Z])/.test(value)) {
    //   return "Password must contain at least 1 capital letter";
    // }
    // if (!/(?=.*\d)/.test(value)) {
    //   return "Password must contain at least 1 number";
    // }
    // if (!/(?=.*[@$!%*?&])/.test(value)) {
    //   return "Password must contain at least 1 special character";
    // }
    return true;
  };

  return (
    <>
      <Head>
        <title>Reset your password | Whizlabs</title>
        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
      </Head>
      <div
        id="content-area"
        className="reset-password-page"
        style={{ backgroundImage: "url('/images/reset-password-bg2x.jpg')" }}
      >
        <div className="reset-password">
          <div className="container-small">
            <figure>
              <img
                width={214}
                height={296}
                className="img-full"
                src="/images/reset-password-graphics.svg"
                alt=""
              />
            </figure>
            <div className="left">
              <a className="logo" href="index.html">
                <img width={200} height={27} className="img-full" src="/images/logo.svg" alt="Whizlabs Logo" />
              </a>
              <h1 className="thankyou-text">
                World-class online certification training courses & practice tests
              </h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="title">
                Reset <span>Password</span>
              </div>
              <div className="input-box-group">
                <div className="input-box">
                  <label>Email</label>
                  <input
                    disabled
                    type="email"
                    name="email"
                    value={email?.toString().toLowerCase()}
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
                <div className="input-box">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    ref={register({
                      required: true,
                      minLength: 8,
                      validate: validatePassword,
                    })}
                  />
                  {errors.password && errors.password.type === "required" && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )}
                  {errors.password && errors.password.type === "minLength" && (
                    <span style={{ color: "red" }}>Minimum length 8 characters</span>
                  )}
                  {errors.password && errors.password.message && (
                    <span style={{ color: "red" }}>{errors.password.message}</span>
                  )}
                </div>
                <div className="input-box">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirm_password"
                    ref={register({
                      required: true,
                      minLength: 8,
                      validate: (value) => value === watch("password"),
                    })}
                  />
                  {errors.confirm_password && errors.confirm_password.type === "required" && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )}
                  {errors.confirm_password && errors.confirm_password.type === "minLength" && (
                    <span style={{ color: "red" }}>Minimum length 8 characters</span>
                  )}
                  {errors.confirm_password && errors.confirm_password.type === "validate" && (
                    <span style={{ color: "red" }}>Passwords not match</span>
                  )}
                </div>

                <div className="input-box">
                  <Recaptcha
                    ref={recaptcha}
                    sitekey="6LeuGo4UAAAAAIZ6-Na4KHV_sIEJNjt-XlRO-Jgk"
                    render="explicit"
                    verifyCallback={verifyCallback}
                    onloadCallback={recaptchaLoader}
                    theme="light"
                  />
                </div>
              </div>
              <button
                className="btn btn-submit"
                disabled={isLoading || isExpired || !recaptchaVerified}
                style={{
                  backgroundColor:
                    isLoading || isExpired || !recaptchaVerified ? "#e2e2e2" : "#f06421",
                  cursor: isLoading || isExpired || !recaptchaVerified ? "not-allowed" : "pointer",
                }}
              >
                {isLoading ? (
                  <img
                    src="/images/loader.svg"
                    alt="loading..."
                    style={{
                      height: "100%",
                    }}
                  />
                ) : isExpired ? (
                  `Link Expired`
                ) : !recaptchaVerified ? (
                  `Verify Captcha`
                ) : (
                  `Reset Password`
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const seoHomePageData = {
    title: "Reset your password | Whizlabs",
    metaTags: [
      {
        name: "facebook-domain-verification",
        property: "",
        content: "twh401qzi7r7o3n227q4sg3hghbpzh",
      },
    ],
  };
  

  return {
    props: {
      seoHomePageData,
    }, // will be passed to the page component as props
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    alertBox: (data) => dispatch(alertBox(data)),
  };
};

export default connect(null, mapDispatchToProps)(ResetPassword);
