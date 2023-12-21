import Head from "next/head";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const VerifyUser = ({ userEmail, isVerifiedUser, seoHomePageData }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    code: "",
    message: "",
  });

  useEffect(() => {
    if (isVerifiedUser || !userEmail) {
      window.location.href = `${process.env.NEXT_PUBLIC_BASE_PATH}login`;
    }
  }, []);

  const onSubmit = async (formData, e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response: any = await axios.post(baseUrl + "/auth/vepsun/reset_password", {
        email: userEmail,
        current_password: formData.current_password,
        new_password: formData.password,
      });

      if (response.data && response.data && response.data.status == "error") {
        setStatus({
          code: "ERROR",
          message: response.data.message,
        });
      }

      if (response.data && response.data && response.data.status == 1) {
        setStatus({
          code: "SUCCESS",
          message: response.data.message,
        });
        e.target.reset();
        setTimeout(() => {
          window.location.href = `${process.env.NEXT_PUBLIC_BASE_PATH}login`;
        }, 1000);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      {/* <Head>
        <title>Reset your password | Whizlabs</title>
        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
      </Head> */}
      <div
        id="content-area"
        className="reset-password-page"
        style={{
          display: isVerifiedUser ? "none" : "block",
          backgroundImage: "url('/images/reset-password-bg2x.jpg')",
        }}
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
                  <label>
                    Email <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    disabled
                    type="email"
                    name="email"
                    value={userEmail}
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
                  <label>
                    Current Password <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="password"
                    name="current_password"
                    ref={register({
                      required: true,
                    })}
                  />
                  {errors.current_password && errors.current_password.type === "required" && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )}
                </div>
                <div className="input-box">
                  <label>
                    New Password <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    ref={register({
                      required: true,
                      minLength: 6,
                    })}
                  />
                  {errors.password && errors.password.type === "required" && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )}
                  {errors.password && errors.password.type === "minLength" && (
                    <span style={{ color: "red" }}>Minimum length 6 characters</span>
                  )}
                </div>
                <div className="input-box">
                  <label>
                    Confirm Password <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="password"
                    name="confirm_password"
                    ref={register({
                      required: true,
                      minLength: 6,
                      validate: (value) => value === watch("password"),
                    })}
                  />
                  {errors.confirm_password && errors.confirm_password.type === "required" && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )}
                  {errors.confirm_password && errors.confirm_password.type === "minLength" && (
                    <span style={{ color: "red" }}>Minimum length 6 characters</span>
                  )}
                  {errors.confirm_password && errors.confirm_password.type === "validate" && (
                    <span style={{ color: "red" }}>Password not match</span>
                  )}
                </div>

                {status && status.code == "ERROR" ? (
                  <span style={{ color: "red" }}>{`${status.message}`}</span>
                ) : (
                  ""
                )}
                {status && status.code == "SUCCESS" ? (
                  <span
                    style={{ color: "green" }}
                  >{`Password updated successfull... Please wait... Page is redirecting.`}</span>
                ) : (
                  ""
                )}
              </div>

              {loading ? (
                <button style={{ backgroundColor: "#ff530069" }} className="btn btn-submit">
                  Loading...
                </button>
              ) : (
                <button className="btn btn-submit">Reset Password</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { encrypted_email } = context.params;
  let userEmail = "";
  let isVerifiedUser = false;

  const seoHomePageData = {
    seoPageType: "awsConsultingPage", // This should be changed to reflect the actual page type
    title: "Reset your password | Whizlabs",
    metaTags: [
      {
        name: "facebook-domain-verification",
        property: "",
        content: "twh401qzi7r7o3n227q4sg3hghbpzh",
      },
    ],
  };
  
  try {
    let response = await axios.post(baseUrl + "/auth/vepsun/verify_user", {
      encrypted_email: encrypted_email,
    });
    if (response && response.data && response.data.data && response.data.data.email) {
      userEmail = response.data.data.email;
      isVerifiedUser = response.data.data.is_verified_user;
    }
  } catch (error) {
    console.error(error);
  }
  return {
    props: {
      userEmail,
      isVerifiedUser,
      seoHomePageData,
    },
  };
}

export default VerifyUser;


