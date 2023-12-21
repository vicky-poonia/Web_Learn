import Link from "next/link";
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import { LinkedinShareButton } from "next-share";
import axios from "axios";
import Head from "next/head";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { useForm } from "react-hook-form";

const MagicBox = ({ userData }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [userEmail, setUserEmail] = useState(userData?.data?.user_email);
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState({
    code: 0,
    result: null,
  }); // 0 - default, 1 - won prize, 2 - try again
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const cookie_magic_box = cookie.get("magic_box");
    if (cookie_magic_box != 1) {
      setTimeout(() => {
        setShow(true);
      }, 20000);
    }
  }, []);

  // const onSubmit = async (formData, e) => {
  //   setLoader(true);
  //   axios.get(baseUrl + `/web/magicbox?email=${formData.email}`).then((res) => {
  //     if (res?.data?.data?.id) {
  //       setStatus({
  //         code: 1,
  //         result: res?.data?.data,
  //       });
  //       cookie.set("magic_box", 1, { expires: 1 });
  //     } else {
  //       setStatus({
  //         code: 2,
  //         result: res?.data,
  //       });
  //       if (res?.data?.status === "error" && res?.data?.message === "Kindly register to particatpate.") {
  //         cookie.remove("magic_box");
  //       } else {
  //         cookie.set("magic_box", 1, { expires: 1 });
  //       }
  //     }
  //     setLoader(false);
  //   });
  // };

  // const closeBanner = () => {
  //   if (status?.result?.status === "error" && status?.result?.message === "Kindly register to particatpate.") {
  //     cookie.remove("magic_box");
  //   } else {
  //     cookie.set("magic_box", 1, { expires: 1 });
  //   }
  //   setShow(false);
  // };

  return (
    <>
      {/* <div className="open-modal-magic" style={{ display: `${show ? "block" : "none"}` }}>
        <div className="modal modal-magic">
          <div className="modal-inner">
            <div className="modal-container">
              <div className="icon-close icon-font-cross-bold" onClick={closeBanner}></div>
              <div className="modal-content">
                {status.code === 0 && (
                  <div className="participate" style={{ display: "flex" }}>
                    <div className="left-block">
                      <h6>Magic Box</h6>
                    </div>
                    <div className="right-block">
                      <h4>
                        <strong>Participate</strong> and get a <strong>chance</strong> to <strong>win exciting gifts</strong>
                      </h4>
                      <figure className="magic-box">
                        <img className="img-full" src="/images/magic-box.svg" />
                      </figure>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-box-group">
                          <div className="input-box">
                            <label>Enter your email to participate</label>
                            <input
                              type="email"
                              placeholder="Enter Email ID"
                              name="email"
                              ref={register({
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              })}
                              value={userEmail}
                            />
                            {errors.email && errors.email.type === "required" && <span style={{ color: "red" }}>This field is required</span>}
                            {errors.email && errors.email.type === "pattern" && <span style={{ color: "red" }}>Please enter valid email.</span>}
                          </div>
                        </div>
                        {!loader ? (
                          <button type="submit" className="btn">
                            Try my luck
                          </button>
                        ) : (
                          <p>Loading.....</p>
                        )}
                      </form>
                    </div>
                  </div>
                )}

                {status.code === 1 && (
                  <div className="winner" style={{ display: "flex" }}>
                    <div className="left-block"></div>
                    <div className="right-block">
                      <h4>Congratulations!</h4>
                      <label>You have won</label>
                      <span>{status?.result?.offer_title}</span>
                      <br />

                      <p>
                        <span>To claim your gift,</span>Share about your win on LinkedIn and tag us at <strong>@Whizlabs</strong>
                      </p>
                      <LinkedinShareButton url={"https://www.whizlabs.com/"}>
                        <button className="btn">
                          Share on <strong>LinkedIn</strong>
                        </button>
                      </LinkedinShareButton>
                    </div>
                  </div>
                )}
                {status.code === 2 && (
                  <div className="try-again" style={{ display: "flex" }}>
                    <div className="right-block">
                      <figure className="emoj">
                        <img className="img-full" src="/images/emoj.svg" />
                      </figure>
                      {status?.result?.status === "error" && status?.result?.message === "Kindly register to particatpate." ? (
                        <>
                          <div className="caption">
                            <label>This email doesn't exists. please signup and try agian</label>
                          </div>
                        </>
                      ) : (
                        <>
                          <h4>Ahh!</h4>
                          <div className="caption">
                            <label>No luck today</label>
                            <span>Try Again Tomorrow!</span>
                          </div>
                        </>
                      )}

                      <button className="btn" onClick={closeBanner}>
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default MagicBox;
