import { useState, useEffect } from "react";
import { sendTokenEmail } from "@/services/reseller-services/services";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import {SendAmazonlink} from "../../services/review-services/services"
export const LoginModal = ({
  redirectUrl,
  redirectTo,
  redirectionAction,
  authLogin,
  userData,
  session,
  loginmessage,
}) => {
  const router = useRouter();
  let pathname_cur = router.pathname;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [msgClass, setMsgClass] = useState("error-field");
  const [resendLink,setResendlink] = useState(false)
  const [values, setValues] = useState({
    email: "",
    password: "",
    isAmazonUser: router.pathname.includes("/amazon") ? true : false,
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (router.pathname.includes("/amazon")) {
      setValues({
        ...values,
        isAmazonUser: true,
      });
    }
  }, [router]);

  useEffect(() => {
    if (session && session.user && session.user.name && session.user.email) {
      setMsgClass("error-field");
    }
  }, [session]);

  useEffect(() => {
    let isMounted = true;
    setLoading(false);
    setMessage("");

    if (isMounted) {
      if (loginmessage && loginmessage.status === "error") {
        setMessage(loginmessage.message);
        if(loginmessage.message === "Please verify your account to continue accessing free courses"){
          setResendlink(true)
        }
        setMsgClass("error-field");
      } else if (userData && userData.data && userData.msg && userData.data.token) {
        redirectionAction("");
        setMessage("Login Successfull..");
        setMsgClass("success-field");
        setValues({ email: "", password: "", isAmazonUser: values.isAmazonUser }); // clear form data
        setTimeout(function () {
          setMessage("");
          document.body.classList.remove("open-modal-login");
          document.body.classList.remove("open-modal-signup");
        }, 3000);
      } else {
        setMessage("");
        setMsgClass("error-field");
      }
    }

    return () => {
      isMounted = false;
    };
  }, [userData,loginmessage]);

  const handleChange = (event) => {
    event.persist();
    setMessage("");
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    let status = true;
    let error_values = {
      email: "",
      password: "",
    };
    if (values.email.length == 0) {
      error_values.email = "Email address is required";
      status = false;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      error_values.email = "Email address is invalid";
      status = false;
    } else {
    }

    if (!values.password) {
      error_values.password = "Password is required";
      status = false;
    } else {
    }
    setErrors(error_values);
    return status;
  };

  const loginHandler = (event) => {
    event.preventDefault();
    setMsgClass("error-field");
    if (validateForm()) {
      // if (!redirectTo) {
      //   redirectionAction("LIBRARY"); // after sign in redirect to Library
      // }
      setLoading(true);
      authLogin(values,pathname_cur);
    }
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    setMsgClass("error-field");
    signIn("google");
  };

  const handleFacebookSignIn = (e) => {
    e.preventDefault();
    setMsgClass("error-field");
    signIn("facebook");
  };

  const handleLinkedInSignIn = (e) => {
    e.preventDefault();
    setMsgClass("error-field");
    signIn("linkedin");
  };

  const handleAppleSignIn = (e) => {
    e.preventDefault();
    setMsgClass("error-field");
    signIn("apple");
  };

  const closeSignInModal = (e) => {
    e.preventDefault();
    document.body.classList.remove("open-modal-login");
    setLoading(false);
    setMessage("");
    setMsgClass("error-field");
    setValues({
      email: "",
      password: "",
      isAmazonUser: router.pathname.includes("/amazon") ? true : false,
    });
    setErrors({
      email: "",
      password: "",
    });
    setResendlink(false)
  };

  return (
    <>
      {/* <!-- modal-account-login--> */}
      <div className="modal modal-account login">
        <div className="modal-inner" onClick={(e)=>{
          document.querySelector("body").classList.remove("open-modal-login");
        }}>
          <div className="modal-container" onClick={(e)=>{
            e.stopPropagation()
          }}>
            <div className="modal-header">
              <div className="title-block">
                <div className="title">Sign in To Whizlabs</div>
              </div>
              {/* <div
                className="icon-close icon-font-cross-bold"
                onClick={(e) => closeSignInModal(e)}
                style={{pointerEvents:'none'}}
              ></div> */}
            </div>
            <div className="modal-content">
              {!values.isAmazonUser && (
                <>
                  <div className="login-with-group">
                    <a style={{ cursor: "pointer" }} onClick={(e) => handleFacebookSignIn(e)}>
                      Continue with <span>Facebook</span>
                      <figure>
                        <img className="img-full" src="/images/filled-facebook.svg" alt="" />
                      </figure>
                    </a>
                    <a style={{ cursor: "pointer" }} onClick={(e) => handleGoogleSignIn(e)}>
                      Continue with <span>Google</span>
                      <figure>
                        <img className="img-full" src="/images/filled-google.svg" alt="" />
                      </figure>
                    </a>
                    <a style={{ cursor: "pointer" }} onClick={(e) => handleLinkedInSignIn(e)}>
                      Continue with <span>Linkedin</span>
                      <figure>
                        <img className="img-full" src="/images/filled-linkedin.svg" alt="" />
                      </figure>
                    </a>
                    <a style={{ cursor: "pointer" }} onClick={(e) => handleAppleSignIn(e)}>
                      Continue with <span>Apple</span>
                      <figure>
                        <img className="img-full" src="/images/Apple_logo_black.svg" alt="" />
                      </figure>
                    </a>
                  </div>
                  <div className="sepretor">
                    <span>OR</span>
                  </div>
                </>
              )}
              <span className={msgClass} dangerouslySetInnerHTML={{ __html: message }} />
              <form onSubmit={loginHandler} autoComplete="off" noValidate>
                <input type="email" name="email" style={{ display: "none" }} />
                <input type="password" name="password" style={{ display: "none" }} />
                <div className="input-box-group">
                  <div className="input-box">
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={values.email.toLowerCase()}
                      onChange={(e) => handleChange(e)}
                      autoComplete="off"
                    />
                    <span className="error-field">{errors.email ? errors.email : ""}</span>
                  </div>
                  <div className="input-box">
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      onChange={(e) => handleChange(e)}
                      autoComplete="off"
                    />
                    <span className="error-field">{errors.password ? errors.password : ""}</span>
                  </div>
                </div>
                {values.isAmazonUser && resendLink && <>
                <span><a onClick={async(e)=>{
                  e.preventDefault()
                   SendAmazonlink(values.email)
                   setTimeout(()=>{
                    setResendlink(false)
                    setMessage("Verfication Email Sent Successfully!. Please Check your Email")
                   },2000)
                }} style={{cursor:"pointer"}}>Resend Verification Link</a></span>
              </>}
                {loading ? (
                  <button
                    type="button"
                    disabled
                    className="btn"
                    style={{ background: "#f0642169" }}
                  >
                    <img src="/images/loader.svg" width={40} height={40} />
                  </button>
                ) : (
                  <button type="submit" className="btn btn-orange">
                    Sign in
                  </button>
                )}
              </form>
              <div className="forgot-password">Forgot Password?</div>
            </div>
            <div className="modal-footer" style={{maxHeight:"auto"}}> 
              <div className="have-an-account">
                {!values.isAmazonUser && <> Don’t have an account? <span className="link-signup">Sign up</span></>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const SignupModal = ({
  authRegister,
  authDataRegister,
  redirectionAction,
  redirectUrl,
  redirectTo,
}) => {
  const router = useRouter();
  let pathname_cur = router.pathname;

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    isAmazonUser: router.pathname.includes("/amazon") ? true : false,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [msgClass, setMsgClass] = useState("error-field");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    if (authDataRegister.msg && authDataRegister.data) {
      setMessage("Registration successfull. Redirecting...");
      setMsgClass("success-field");
      setValues({ ...values, name: "", email: "", password: "" }); // clear form data
      setTimeout(function () {
        setMessage("");
        document.body.classList.remove("open-modal-login");
        document.body.classList.remove("open-modal-signup");
      }, 3000);

      if (values.isAmazonUser) {
        window.location.href = window.location.origin + "/amazon/verify";
      }
    } else if (authDataRegister.msg && !authDataRegister.data) {
      setMessage(authDataRegister.msg);
      setMsgClass("error-field");
    }else if(authDataRegister.message && authDataRegister.status === "error")
    {
      setMessage(authDataRegister.message);
      setMsgClass("error-field");
    } 
    else {
      setMessage("");
      setMsgClass("error-field");
    }
  }, [authDataRegister]);

  useEffect(() => {
    if (router.pathname.includes("/amazon")) {
      setValues({
        ...values,
        isAmazonUser: true,
      });
    }
  }, [router]);

  const handleChange = (event) => {
    event.persist();
    setMessage("");
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    let status = true;
    let error_values = {
      name: "",
      email: "",
      password: "",
    };
    if (values.email.length == 0) {
      error_values.email = "Email address is required";
      status = false;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      error_values.email = "Email address is invalid";
      status = false;
    } else {
    }

    if (values.name.length == 0) {
      error_values.name = "Name is required";
      status = false;
    }

    if (!values.password) {
      error_values.password = "Password is required";
      status = false;
    } 
    // else if (values.password.length < 6) {
    //   error_values.password = "Minimum 6 characters is required";
    //   status = false;
    // } 
    else if (values.password.length < 8) {
      error_values.password = "Minimum 8 characters is required";
      status = false;
    } 
    // else if (!/(?=.*[A-Z])/.test(values.password)) {
    //   error_values.password = "Password must contain at least 1 capital letter";
    //   status = false;
    // } else if (!/(?=.*\d)/.test(values.password)) {
    //   error_values.password = "Password must contain at least 1 number";
    //   status = false;
    // } 
    // else if (!/(?=.*[@$!%*?&])/.test(values.password)) {
    //   error_values.password = "Password must contain at least 1 special character";
    //   status = false;
    // } else if (/\s/.test(values.password)) {
    //   error_values.password = "Space is not allowed";
    //   status = false;
    // }
     else {
    }

    setErrors(error_values);
    return status;
  };

  const signupHandler = (event) => {
    event.preventDefault();
    let pricing_link = `${process.env.NEXT_PUBLIC_BASE_PATH}pricing`
    // redirectionAction("PRICING")
    if (validateForm()) {
      setLoading(true);
      authRegister(values,pathname_cur);
    }
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    signIn("google");
  };

  const handleFacebookSignIn = (e) => {
    e.preventDefault();
    signIn("facebook");
  };

  const handleLinkedInSignIn = (e) => {
    e.preventDefault();
    signIn("linkedin");
  };

  const handleAppleSignIn = (e) => {
    e.preventDefault();
    signIn("apple");
  };

  const closeSignUpModal = (e) => {
    e.preventDefault();
    document.body.classList.remove("open-modal-signup");
    setValues({
      name: "",
      email: "",
      password: "",
      isAmazonUser: router.pathname.includes("/amazon") ? true : false,
    });
    setErrors({
      name: "",
      email: "",
      password: "",
    });
    setMessage("");
    setMsgClass("error-field");
    setLoading(false);
  };

  return (
    <>
      {/* <!-- modal-account-signup--> */}
      <div className="modal modal-account signup">
        <div className="modal-inner"
        onClick={(e)=>{
          document.querySelector("body").classList.remove("open-modal-signup");
        }}
        >
          <div className="modal-container"  onClick={(e)=>{
        e.stopPropagation()
        }}>
            <div className="modal-header">
              <div className="title-block">
                <div className="title">Sign up To Whizlabs</div>
              </div>
              {/* <div
                className="icon-close icon-font-cross-bold"
                onClick={(e) => closeSignUpModal(e)}
              ></div> */}
            </div>
            <div className="modal-content">
              {!values.isAmazonUser && (
                <>
                  <div className="login-with-group">
                    <a style={{ cursor: "pointer" }} onClick={(e) => handleFacebookSignIn(e)}>
                      Continue with <span>Facebook</span>
                      <figure>
                        <img className="img-full" src="/images/filled-facebook.svg" alt="" />
                      </figure>
                    </a>
                    <a style={{ cursor: "pointer" }} onClick={(e) => handleGoogleSignIn(e)}>
                      Continue with <span>Google</span>
                      <figure>
                        <img className="img-full" src="/images/filled-google.svg" alt="" />
                      </figure>
                    </a>
                    <a style={{ cursor: "pointer" }} onClick={(e) => handleLinkedInSignIn(e)}>
                      Continue with <span>Linkedin</span>
                      <figure>
                        <img className="img-full" src="/images/filled-linkedin.svg" alt="" />
                      </figure>
                    </a>
                    <a style={{ cursor: "pointer" }} onClick={(e) => handleAppleSignIn(e)}>
                      Continue with <span>Apple</span>
                      <figure>
                        <img className="img-full" src="/images/Apple_logo_black.svg" alt="" />
                      </figure>
                    </a>
                  </div>
                  <div className="sepretor">
                    <span>OR</span>
                  </div>
                </>
              )}
              {/* <span className={msgClass}>{message}</span> */}
              <span className={msgClass} dangerouslySetInnerHTML={{ __html: message }} />
              <form onSubmit={signupHandler} noValidate>
                <div className="input-box-group">
                  <div className="input-box">
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="Name"
                      name="name"
                      value={values.name || ""}
                      onChange={(e) => handleChange(e)}
                    />
                    <span className="error-field">{errors.name ? errors.name : ""}</span>
                  </div>
                  <div className="input-box">
                    <input
                      type="email"
                      autoComplete="off"
                      placeholder="Email"
                      name="email"
                      value={values.email.toLowerCase() || ""}
                      onChange={(e) => handleChange(e)}
                    />
                    <span className="error-field">{errors.email ? errors.email : ""}</span>
                  </div>
                  <div className="input-box">
                    <input
                      type="password"
                      autoComplete="off"
                      placeholder="Create a Password"
                      name="password"
                      minLength={8}
                      maxLength={50}
                      value={values.password || ""}
                      onChange={(e) => handleChange(e)}
                    />
                    <span className="error-field">{errors.password ? errors.password : ""}</span>
                  </div>
                </div>
                <div></div>
                {loading ? (
                  <button
                    type="button"
                    disabled
                    className="btn"
                    style={{ background: "#f0642169" }}
                  >
                    <img src="/images/loader.svg" width={40} height={40} />
                  </button>
                ) : (
                  <button type="submit" className="btn btn-orange">
                    Sign up
                  </button>
                )}
              </form>
              <div className="terms-conditions-block">
                By signing up, you agree to our{" "}
                <Link href="/terms-of-use">
                  <a target="_blank">Terms of Use</a>
                </Link>
                ,{" "}
                <Link href="/end-user-license-agreement">
                  <a target="_blank">EULA</a>
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy">
                  <a target="_blank">Privacy Policy</a>
                </Link>
                .
              </div>
            </div>
            <div className="modal-footer">
              <div className="have-an-account">
                Already have an account? <span className="link-login">Sign in</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const ResetPassModal = () => {
  const [values, setValues] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    class: "error-field",
    msg: "",
  });

  const handleChange = (event) => {
    event.persist();
    setStatus({
      class: "",
      msg: "",
    });
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    let check = true;
    if (values.email.length == 0) {
      setErrors({
        ...errors,
        email: "Email address is required",
      });
      check = false;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      setErrors({ ...errors, email: "Invalid Email Address!" });
      check = false;
    } else {
      setErrors({ ...errors, email: "" });
    }
    return check;
  };

  const resetPassHandler = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setLoading(true);
      if (validateForm()) {
        let response = await sendTokenEmail({
          email: values.email,
        });

        if (response.data) {
          if (response.data.status == 1) {
            setStatus({
              ...status,
              class: "success-field",
              msg: "You will receive an email in a few minutes containing a link that will allow you to reset your password.",
            });
            setTimeout(() => {
              window.location.href = "/";
            }, 5000);
          } else {
            setStatus({ ...status, class: "error-field", msg: response.data.message });
          }
        }
        setValues({ email: "" });
        setLoading(false);
      }
    }
  };

  return (
    <>
      {/* <!-- modal-account pass-reset--> */}
      <div className="modal modal-account pass-reset">
        <div className="modal-inner">
          <div className="modal-container">
            <div className="modal-header">
              <div className="title-block">
                <div className="title">Reset Password</div>
                {status.class != "success-field" && (
                  <span className="title-note">
                    Please enter your email address, and we will send a link to reset your password
                  </span>
                )}
              </div>
              {/* <div className="icon-close icon-font-cross-bold" style={{pointerEvents:'none'}}></div> */}
            </div>
            <div className="modal-content">
              <form onSubmit={resetPassHandler}>
                <span className={status.class}>{status.msg}</span>
                <div style={{ display: `${status.class != "success-field" ? "block" : "none"}` }}>
                  <div className="input-box-group">
                    <div className="input-box">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={values.email.toLowerCase()}
                        onChange={(e) => handleChange(e)}
                      />
                      <span className="error-field">{errors.email ? errors.email : ""}</span>
                    </div>
                  </div>
                  {loading ? (
                    <button
                      type="button"
                      disabled
                      className="btn"
                      style={{ background: "#f0642169" }}
                    >
                      Loading....
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-orange">
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <div className="backto-login">
                Back to <span className="link-login">Sign in</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
