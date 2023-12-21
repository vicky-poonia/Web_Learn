import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const redirect = process.env.NEXT_PUBLIC_BASE_PATH;
import { useRouter } from "next/router";
import Link from "next/link";
import { UserAccountCloseModal } from "./Modals";
import cookie from "js-cookie";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

import { color } from "html2canvas/dist/types/css/types/color";

const MyAccountUpdate = ({ tabActive,
                            profile,
                            userId,
                            authLogout,
                            alertBox,
                            clearCart,
                            email_verified,
                            UpdateUserProfile,
                            userData,
                            mailSent,
                            Mailsentaction
                           }) => {

  const router = useRouter();
  useEffect(() => {
    if (!userData) {
      router.push("/");
    }
  }, []);

 
  const is_socialLogin = cookie.get("is_socialLogin");
  const { register, handleSubmit, watch, errors } = useForm();

  const [email, setEmail] = useState(profile && profile.email ? profile.email : null);
  const [hideresenemail,setresend] = useState(false)

  const updateEmailForm = async (e) => {
    e.preventDefault();
    const response = await axios.put(baseUrl + "/users/profile/" + userId, {
      email: email,
    });
    if (response && response.data.status && response.data.status === 1) {
      alertBox({
        type: "SUCCESS",
        title: "Success",
        msg: "Email updated",
      });
    }
  };
  const updatePasswordForm = async (formData, e) => {
    e.preventDefault();
    const response = await axios.put(baseUrl + "/users/profile/" + userId, {
      current_password: formData.current_password,
      password: formData.confirm_password,
    });
    if (response && response.data.status && response.data.status === 1) {
      alertBox({
        type: "SUCCESS",
        title: "Success",
        msg: "Password updated",
      });
    } else if (response && response.data.status && response.data.status == "error") {
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "Current password does not match",
      });
    }
    e.target.reset();
  };

  const openCloseUserAccountModal = async (e) => {
    e.preventDefault();
    document.body.classList.add("open-modal-close-user-account");
  };

  const closeUserAccount = async (e) => {
    e.preventDefault();
    document.body.classList.remove("open-modal-close-user-account");
    const response = await axios.delete(baseUrl + "/users/profile/" + userId + "/close");
    if (response && response.data.msg) {
      alertBox({
        type: "SUCCESS",
        title: "Success",
        msg: "You account close request is submitted. Out team will get in touch with you shortly.",
      });
      return;
    }
  };

  return (
    <>
      <UserAccountCloseModal handleUserAccountClose={closeUserAccount} />
      <div style={{ display: tabActive ? "block" : "none" }} id="account">
        <div className="container">
          <div className="tab-account">
            <div className="white-box">
              <div className="head-section">Your account email</div>
              <div className="box-content">
                {/* <form onSubmit={updateEmailForm}> */}
                <div className="input-box-group">
                  <div className="input-box">
                    <label>Email Address</label>
                    <input
                      style={{ backgroundColor: "#e2e2e294" }}
                      readOnly
                      required
                      type="email"
                      placeholder="Enter Your Email"
                      defaultValue={email}
                      // onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                {email_verified == false && (
                  <div className="verify-acc">
                    {!mailSent && (
                      <div
                        className="txt"
                        onClick={async (e) => {
                          e.preventDefault();
                          await axios
                            .post(
                              `${baseUrl}/auth/mail/send_verify_mail`,{
                                email:email,
                                ref:redirect
                              }
                            )
                            .then((resp) => {
                              if (resp.data.status == 1) {
                                Mailsentaction()
                                alertBox({
                                  type: "SUCCESS",
                                  title: "Success",
                                  msg: "Verification Mail has been sent",
                                });
                              }
                            });
                        }}
                      >
                        Verify your email address
                      </div>
                    )}
                    {mailSent && <>
                      <a className="txt" 
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Please check your inbox and verify your email address"
                      data-tooltip-place="top"
                      style={{marginRight:"5px"}}
                    >Verification pending!
                    </a>
                    <span onClick={async(e)=>{
                             e.preventDefault();
                             await axios
                               .post(
                                 `${baseUrl}/auth/mail/send_verify_mail`,{
                                  email:email,
                                  ref:redirect
                                 }
                               )
                               .then((resp) => {
                                 if (resp.data.status == 1) {
                                  alertBox({
                                    type: "SUCCESS",
                                    title: "Success",
                                    msg: "Verification Mail has been sent",
                                  });
                                 }
                               });
                    }}
                    style={{margin:"0",cursor:"pointer",color:"#ff6c00"}}
                    >Resend Email!</span>
                    <Tooltip id="my-tooltip" />
                    </>
                    }
                  </div>
                )}
                {email_verified == true && (
                  <>
                    <div className="verified-buyer">
                      <i className="icon icon-font-verified-buyes" style={{color:"#4CAF50"}}></i>
                      <span style={{color:"black",marginLeft:"5px"}}>Verified</span>
                    </div>
                  </>
                )}
                {/* <button type="submit" className="btn btn-update">
                    Update
                  </button> */}
                {/* </form> */}
              </div>
            </div>
            {!is_socialLogin ? (
              <div className="white-box">
                <div className="head-section">Update your account password</div>
                <div className="box-content">
                  <form onSubmit={handleSubmit(updatePasswordForm)}>
                    <div className="input-box-group">
                      <div className="input-box">
                        <label>
                          Current Password<small>*</small>
                        </label>
                        <input
                          type="password"
                          maxLength={50}
                          placeholder="Current Password"
                          name="current_password"
                          ref={register({ required: true })}
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
                          minLength={8}
                          maxLength={50}
                          placeholder="New Password"
                          name="new_password"
                          ref={register({ required: true })}
                        />
                        {errors.new_password && errors.new_password.type === "required" && (
                          <span style={{ color: "red" }}>This field is required</span>
                        )}
                        {errors.new_password && errors.new_password.type === "minLength" && (
                          <span style={{ color: "red" }}>
                            Password length must be 8 characters.
                          </span>
                        )}
                      </div>
                      <div className="input-box">
                        <label>
                          Confirm Password <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="password"
                          placeholder="Confirm Password"
                          name="confirm_password"
                          minLength={8}
                          maxLength={50}
                          ref={register({
                            required: true,
                            validate: (value) => value === watch("new_password"),
                          })}
                        />
                        {errors.confirm_password && errors.confirm_password.type === "required" && (
                          <span style={{ color: "red" }}>This field is required</span>
                        )}
                        {errors.confirm_password &&
                          errors.confirm_password.type === "minLength" && (
                            <span style={{ color: "red" }}>
                              Confirm Password length must be 6 characters.
                            </span>
                          )}
                        {errors.confirm_password && errors.confirm_password.type === "validate" && (
                          <span style={{ color: "red" }}>
                            New password and confirm password does not match
                          </span>
                        )}
                      </div>
                    </div>
                    <button type="submit" className="btn btn-update">
                      Update
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              ""
            )}

            {/* <div className={!is_socialLogin ? "white-box full" : "white-box"}>
              <div className="head-section">Close Your Account</div>
              <div className="box-content">
                <p>
                  If you’re facing problem, please consider{" "}
                  <Link href="/contact-us/">
                    <a>Contacting us</a>
                  </Link>{" "}
                  about it before closing your account.
                </p>
                <p className="warning-text">
                  <strong>Warning:</strong> If you close your account, you will be unsubscribed from
                  all your courses, and will lose access forever.{" "}
                </p>
                <button onClick={(e) => openCloseUserAccountModal(e)} className="btn btn-acc-close">
                  Close My Account
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccountUpdate;
