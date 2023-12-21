import Head from "next/head";
import { useRef, useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import Recaptcha from "react-recaptcha";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import FourOhFour from "pages/404";
import { connect } from "react-redux";
import { alertBox } from "redux/AlertBox/alert-actions";
import { useDropzone } from "react-dropzone";
const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL;
import { useRouter } from "next/router";
import { loadScript } from "helpers/customHooks";

const JS_SCRIPT = "https://www.google.com/recaptcha/api.js";

const ApplyPositions = ({ jobData, experienceList, alertBoxAction, seoHomePageData }) => {
  const router = useRouter();
  const recaptcha = useRef(null);
  const [recaptchaVerified, SetRecaptchaVerified] = useState(false);
  const { register, handleSubmit, watch, errors } = useForm();
  const validateInputField = (value) => {
    if (value.trim().length !== value.length) {
      return "Value cannot contain only spaces";
    }
    return true;
  };
  const [resume, setResume] = useState({
    name: "",
    path: "",
  });
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    document.querySelector("#wrapper").classList.add("carees-upload-resume-page");
  }, []);

  useEffect(() => {
    loadScript(JS_SCRIPT);
    }, []);

  const onDrop = useCallback((acceptedFiles) => {
    uploadImage(acceptedFiles);
  }, []);

  const uploadImage = async (file) => {
    setUploadLoading(true);
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("fs3folderpath", "assist/career/");
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    let uploadResponse: any = await axios.post(ADMIN_URL + "/file-upload", formData, config);
    if (uploadResponse && uploadResponse.data.msg && uploadResponse.data.status == "failed") {
      alertBoxAction({
        type: "ERROR",
        title: "Error",
        msg: uploadResponse.data.msg,
      });
      setUploadLoading(false);
      return;
    }
    if (uploadResponse && uploadResponse.data.url && uploadResponse.data.status == "success") {
      setResume({
        name: file[0]?.name,
        path: uploadResponse.data.url,
      });
    }
    setUploadLoading(false);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const recaptchaLoader = () => {};
  const verifyCallback = (response) => {
    if (response) SetRecaptchaVerified(true);
  };

  const onSubmit = async (formData, e) => {
    const insertData = JSON.stringify({
      position_id: jobData.id,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      contact_no: formData.phone,
      total_experience: formData.total_experience,
      expertise: formData.skills,
      resume: resume.path,
      status: 1,
    });

    if (!resume?.path) {
      alertBoxAction({
        type: "ERROR",
        title: "Error",
        msg: "Resume field is required...Please upload your resume.",
      });
      return;
    }

    if (!recaptchaVerified) {
      alertBoxAction({
        type: "ERROR",
        title: "Recaptcha Error",
        msg: "Please verify recaptcha",
      });
      return;
    }

    if (resume?.path && recaptchaVerified) {
      const { data } = await axios.post(baseUrl + "/web/career-candidates", insertData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data && data.status && data.status == "error") {
        recaptcha.current.reset();
        SetRecaptchaVerified(false);
        alertBoxAction({
          type: "ERROR",
          title: "Error",
          msg: data.message,
        });
      }
      if (data && data.data && !data.status) {
        e.target.reset();
        setResume({
          name: "",
          path: "",
        });
        alertBoxAction({
          type: "SUCCESS",
          title: "success",
          msg: "Details submitted successfully...",
        });
        setTimeout(() => {
          router.push("/careers");
        }, 2000);
      }
      recaptcha.current.reset();
    }
  };

  if (!jobData || !jobData.id) return <FourOhFour />;

  return (
    <>
      {/* <Head>
        <title>Career | Whizlabs</title>
      </Head> */}
      <div id="content-area">
        <div className="banner-empty"></div>
        <div className="container">
          <div className="apply-block">
            <h1>
              Apply for the <strong>{jobData.position_title}</strong>
            </h1>
            <div className="template-area">
              {!resume?.path && !uploadLoading ? (
                <div className="upload-group" {...getRootProps()}>
                  <div className="drag-form">
                    <div className="dropzone-desc">
                      <figure>
                        <img className="img-full" src="/images/drag-icon.svg" />
                      </figure>
                      <span>
                        Drag/Drop your Resume or <a>Browse</a>
                      </span>
                      <input {...getInputProps()} />
                    </div>
                    <label>
                      Only DOC or PDF with max file size of <strong>15MB</strong>
                    </label>
                  </div>
                  <div className="file-add">
                    {/* <div className="google-icons">
                          <a href="#" className="icon-img">
                            <figure><img className="img-full" src="images/onedrive.png"></figure>
                          </a>
                          <a href="#" className="icon-img">
                            <figure><img className="img-full" src="images/dropbox.png"></figure>
                          </a>
                          <a href="#" className="icon-img">
                            <figure><img className="img-full" src="images/googledrive.png"></figure>
                          </a>
                        </div> */}
                    <div className="uploader-file">
                      <label className="btn-upload">Upload</label>
                      <input
                        className="file-add__input"
                        type="file"
                        onChange={(e) => uploadImage(e.target.files)}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}

              {uploadLoading && (
                <div className="status">
                  <strong>File Uploading....</strong>
                </div>
              )}

              {resume && resume.path && resume.name && (
                <div className="status">
                  {resume.name}
                  <figure style={{ cursor: "pointer" }}>
                    <img
                      className="img-full"
                      src="/images/round-cross.svg"
                      onClick={(e) => setResume({ name: "", path: "" })}
                    />
                  </figure>
                </div>
              )}
            </div>
            <div className="info-block">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="title">Personal Information</div>
                <div className="input-box-group">
                  <div className="input-box">
                    <label>
                      First Name<span>*</span>
                    </label>
                    <input
                      type="text"
                      className="bg-ghostwhite"
                      placeholder="Enter First Name"
                      name="first_name"
                      ref={register({ required: true ,validate:validateInputField})}
                    />
                    {errors.first_name && (
                      <span style={{ color: "red" }}>This field is required</span>
                    )}
                  </div>
                  <div className="input-box">
                    <label>
                      Last Name<span>*</span>
                    </label>
                    <input
                      type="text"
                      className="bg-ghostwhite"
                      placeholder="Enter Last Name"
                      name="last_name"
                      ref={register({ required: true ,validate:validateInputField})}
                    />
                    {errors.last_name && (
                      <span style={{ color: "red" }}>This field is required</span>
                    )}
                  </div>
                  <div className="input-box">
                    <label>
                      Email<span>*</span>
                    </label>
                    <input
                      type="email"
                      className="bg-ghostwhite"
                      placeholder="Enter Email address"
                      name="email"
                      ref={register({ required: true })}
                    />
                    {errors.email && <span style={{ color: "red" }}>This field is required</span>}
                  </div>
                  <div className="input-box">
                    <label>
                      Phone<span>*</span>
                    </label>
                    <input
                      type="text"
                      className="bg-ghostwhite"
                      placeholder="Enter Phone number"
                      name="phone"
                      ref={register({ required: true, pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i })}
                    />
                    {errors.phone && errors.phone.type === "pattern" && (
                      <span style={{ color: "red" }}>Please enter valid phone number.</span>
                    )}
                    {errors.phone && errors.phone.type === "required" && (
                      <span style={{ color: "red" }}>This field is required</span>
                    )}
                  </div>
                  <div className="input-box box">
                    <label>
                      Total Experience<span>*</span>
                    </label>
                    <div className="">
                      <select
                        name="total_experience"
                        ref={register({ required: true })}
                        style={{
                          borderColor: "#c3c3c3 !important",
                          display: "block",
                        }}
                      >
                        <option value="">Select your Experience</option>
                        <option value="26">Student</option>
                        <option value="27">Fresher</option>
                        {experienceList &&
                          experienceList.map(function (data, key) {
                            return (
                              <>
                              <option key={key} value={data}>
                                {data} {data == 1 ? "Year" : "Years"}
                              </option>
                              </>
                            );
                          })}
                      </select>
                      {errors.total_experience && (
                        <span style={{ color: "red" }}>This field is required</span>
                      )}
                    </div>
                  </div>
                  <div className="input-box box">
                    <label>
                      Expertise/Skills<span>*</span>
                    </label>
                    <textarea
                      placeholder="Enter Skills"
                      name="skills"
                      ref={register({ required: true ,validate:validateInputField})}
                    ></textarea>
                    {errors.skills && <span style={{ color: "red" }}>This field is required</span>}
                  </div>
                  <div className="input-box box">
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
                <div className="btn-group">
                  {uploadLoading ? (
                    <p className="btn btn-submit">Submit</p>
                  ) : (
                    <button className="btn btn-submit">Submit</button>
                  )}
                  {/* <button className="btn btn-cancel">Cancel</button> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const slug = context.params.slug;
  let jobData = [];
  const seoHomePageData = {
    seoPageType: "career",
    title: "Career | Whizlabs",
    metaTags: [
      { name: "", property: "", content: "" },
    ],
    };
  try {
    let positionResponse = await axios.get(baseUrl + "/web/career-positions", {
      params: {
        slug: slug,
      },
    });

    if (
      positionResponse &&
      positionResponse.data &&
      positionResponse.data.data &&
      positionResponse.data.data[0]
    ) {
      jobData = positionResponse.data.data[0];
    }
  } catch (error) {
    console.error(error);
  }

  const experienceList = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
  ];
  return {
    props: { jobData, experienceList, seoHomePageData },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    alertBoxAction: (data) => dispatch(alertBox(data)),
  };
};

export default connect(null, mapDispatchToProps)(ApplyPositions);
