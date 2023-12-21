import Link from "next/link";
import Image from "next/image";
import { connect, useSelector } from "react-redux";
import { searchAllCourses } from "redux/SearchAllCourses/search-actions";
import { Keyword } from "@/services/reseller-services/services";
import React, { useState, useEffect } from "react";
import { saveAfterSignupDetails } from "@/services/review-services/services";
import cookie from "js-cookie";

const AfterSignUpModal = ({ open, setOpen, userData, searchCourse, searchCourses }) => {
  const [openFlatModal, setOpenFlatModal] = useState(false);
  const [aboutUS, setAboutUs] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [certifications, setCertifications] = useState([]);
  const [skills, setSkills] = useState({ cloud: [], other: [] });
  const [timePeriod, setTimePeriod] = useState("");
  const [profileHire, setProfileHire] = useState(false);
  const [somethingElse, setSomethingElse] = useState("");
  const [moreskills, setMoreskills] = useState("");
  const searchResults = useSelector((state: any) => state.searchAllCourses.searchCourses);
  // const [searchResults, setSearchResults] = useState([]);
  const searchText = useSelector((state: any) => state.searchAllCourses.searchValue);
  const handleInput = (value) => {
    setSearchInput(value);
    if (value.length >= 3) {
      document.querySelector(".header-search").classList.add("show-content");
      setLoading(true);
      searchCourse(value);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  function onSkip() {
    cookie.remove("signupmodal");
    setTimeout(() => {
      window.location.href = "/pricing";
      setOpen(false);
    }, 1000);
  }

  function onSubmit(data) {
    setStep(6);
    setOpen(false);
    setOpenFlatModal(true);
    saveAfterSignupDetails({
      about_us: aboutUS,
      certifications: JSON.stringify(certifications),
      skills: JSON.stringify(skills),
      time_period: timePeriod,
      user_id: userData.data.user_id,
      other_certification: somethingElse,
      other_skills: moreskills,
      profile_hire: data?.profileHire ? data.profileHire : false,
    });
    cookie.remove("signupmodal");
  }
  function onYes() {
    let data = {
      profileHire: true,
    };
    onSubmit(data);
  }
  function onNo() {
    let data = {
      profileHire: false,
    };
    onSubmit(data);
    window.location.reload()
  }
  function BackButton() {
    return (
		<svg xmlns="http://www.w3.org/2000/svg" width="22" height="15" viewBox="0 0 22 15" fill="none">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M22 7.5C22 7.27902 21.9172 7.06708 21.7699 6.91083C21.6225 6.75457 21.4227 6.66678 21.2143 6.66678L2.68366 6.66678L7.62863 1.42419C7.77616 1.26773 7.85904 1.05553 7.85904 0.834269C7.85904 0.613007 7.77616 0.400807 7.62863 0.244351C7.4811 0.0878954 7.28102 0 7.07238 0C6.86375 0 6.66366 0.0878954 6.51613 0.244351L0.230818 6.91008C0.157652 6.98748 0.0996029 7.07943 0.0599953 7.18066C0.0203877 7.28188 0 7.3904 0 7.5C0 7.6096 0.0203877 7.71812 0.0599953 7.81934C0.0996029 7.92057 0.157652 8.01252 0.230818 8.08992L6.51613 14.7556C6.58918 14.8331 6.6759 14.8946 6.77134 14.9365C6.86678 14.9784 6.96908 15 7.07238 15C7.28102 15 7.4811 14.9121 7.62863 14.7556C7.77616 14.5992 7.85904 14.387 7.85904 14.1657C7.85904 13.9445 7.77616 13.7323 7.62863 13.5758L2.68366 8.33322L21.2143 8.33322C21.4227 8.33322 21.6225 8.24543 21.7699 8.08917C21.9172 7.93291 22 7.72098 22 7.5Z" fill="black"/>
		</svg>
    );
  }
  function certification(e, value) {
    let cert = certifications;

    if (e.target.checked) {
      if (!certifications.includes(value)) {
        cert.push(value);
      }
    } else {
      const index = cert.indexOf(value);
      if (index > -1) {
        cert.splice(index, 1);
      }
    }
    setCertifications([...cert]);
  }
  function skillsData(e, type, value) {
    let cert = skills;
    if (e.target.checked) {
      cert[type].push(value);
    } else {
      const index = cert[type].indexOf(value);
      if (index > -1) {
        cert[type].splice(index, 1);
      }
    }
    setSkills({ ...cert });
  }
  const removeCert = (course) => {
    // removing the value from certifications array
    const index = certifications.indexOf(course);
    if (index > -1) {
      certifications.splice(index, 1);
    }
    setCertifications([...certifications]);
  };
  // useEffect(() => {
  // 	// for each course in searchResults, check if the course name is in certifications array.. if yes, then set the checked property to true
  // 	searchResults.forEach((course) => {

  // }, [searchResults]);
  // console.log(userData, "userData")

  useEffect(() => {
    if(document){
      open? document.body.style.overflow = 'hidden': document.body.style.overflow = 'auto'
    }
  }, []);
  
  return (
    <>
      {/* // <!-- modal-after-signup--> */}
      {cookie.get("signupmodal") ? (
        <>
          <div
            className={`modal modal-after-signup ${open ? "aftersignupmode" : ""}`}
            style={{ opacity: open ? 1 : 0, visibility: open ? "visible" : "hidden" }}
          >
            <div className="modal-inner">
              <div className="modal-container">
                <div className="modal-header">
                </div>
                <div className="modal-content">
                  <div className="form-step-group">
                    <form>
                      {/* <!-- Steps --> */}
                      {step == 0 ? (
						<div className={`formStep ${step} ${step == 0 ? "formStep-active" : ""}`}>
							<div className="intro-screen">
                    			<div className="title">
									<h2 className="name-m">Hello {userData.data.name.first}!</h2>
								</div>
								<div className="welcom-block">
									<span>Welcome to </span>
									<img src="/images/logo.svg" alt="Whizlabs Logo"/>
								</div>
								<span className="text-sm">Your account has been created!</span>
								<img src="/images/login.svg" />
								<p>We would love to know you better. <span>Can you answer these 4 Questions?</span></p>
                  			</div>
							<div className="btns-group" onClick={() => setStep(1)}>
								<a href="#" className="btn btnNext width-50 ml-auto">
									Continue
								</a>
                          </div>
						</div>
                      ) : (
                        ""
                      )}
                      {step == 1 ? (
                        <div className={`formStep ${step} ${step == 1 ? "formStep-active" : ""}`}>
                          <div className="Step2 StepAll">
                            <div className="step-title">
                              Which <strong>Certifications</strong> are you interested in?
                            </div>
                            <div className="search-block">
                              <input
                                type="search"
                                placeholder="Search Certifications eg: AWS Cloud Practitioner"
                                value={searchInput}
                                onChange={(e) => handleInput(e.target.value)}
                              />
                              <i
                                className="icon icon-font-search"
                                style={{ cursor: "pointer" }}
                              ></i>
                              {/* <span className="MoreTxt selectTxt">{certifications.length > 0 ? certifications.length + ' Selected' : ''}</span> */}
                              {/* <span className="selectTxt" id="showSelectTxt" style={{ display: 'none' }}>1 Selected</span> */}
                            </div>
                            {searchInput.length > 0 ? (
                              <div className="search-checkbox-group">
                                {searchResults.map(
                                  (course, index) =>
                                    index < 4 && (
                                      <label className="custom-checkbox">
                                        <input
                                          type="checkbox"
                                          value={course.id}
                                          name="showSelectItem[]"
                                          onChange={(e) => certification(e, course.name)}
                                          className="showSelectItem"
                                          //if the course name is in certifications array, then set the checked property to true
                                          checked={certifications.includes(course.name)}
                                        />
                                        <span className="checkbox-style"></span>
                                        <div className="name">{course.name}</div>
                                      </label>
                                    )
                                )}
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="unable-block" style={{overflow: "auto", height: "auto", maxHeight: "200px", paddingRight:"20px"}}>
                              {certifications.map((course) => (
                                <label
                                  className="custom-checkbox"
                                  style={{ display: "block", marginTop: "5px" }}
                                >
                                  <div style={{ display: "flex" }}>
                                    <li style={{ margin: "3px auto 1px 15px" }}>{course}</li>
                                    <i
                                      className="icon-close icon-font-cross"
                                      onClick={(e) => removeCert(course)}
                                      style={{
                                        margin: "0",
                                        cursor: "pointer",
                                        fontSize: "11px",
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    ></i>
                                  </div>
                                </label>
                              ))}
                            </div>
                            <div className="unable-block">
                              <input
                                type="text"
                                placeholder="Something Else? Type here."
                                value={somethingElse}
                                onChange={(e) => setSomethingElse(e.target.value.toLowerCase())}
                              />
                            </div>
                          </div>
                          <div className="btns-group" onClick={() => setStep(2)}>
                            <a href="#" className="btn btnNext">
                              Continue
                            </a>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {step == 2 ? (
                        <div className={`formStep ${step} ${step == 2 ? "formStep-active" : ""}`}>
                          <div className="Step1 StepAll">
                            <div className="step-title" >
							<div
                              className="back-btn"
                              style={{ cursor: "pointer", margin: 0, width: "25px" }}
                              onClick={() => setStep(1)}
                            >
                              <BackButton />
                            </div>
                              How did you hear about <strong>Whizlabs?</strong>
                            </div>
                            <div className="radio-group">
                              <label className="radioStyle">
                                <input
                                  onChange={(e) => setAboutUs(e.target.value)}
                                  value="Friends/Colleagues"
                                  type="radio"
                                  name="about_us"
                                  defaultChecked={aboutUS == "Friends/Colleagues" ? true : false}
                                />
                                <span className="radiocheckmark"></span>
                                <small className="name">Friends/Colleagues </small>
                              </label>
                              <label className="radioStyle">
                                <input
                                  onChange={(e) => setAboutUs(e.target.value)}
                                  value="Social Media"
                                  type="radio"
                                  name="about_us"
                                  defaultChecked={aboutUS == "Social Media" ? true : false}
                                />
                                <span className="radiocheckmark"></span>
                                <small className="name">Social Media</small>
                              </label>
                              <label className="radioStyle">
                                <input
                                  onChange={(e) => setAboutUs(e.target.value)}
                                  value="Google / Search Engine"
                                  type="radio"
                                  name="about_us"
                                  defaultChecked={
                                    aboutUS == "Google / Search Engine" ? true : false
                                  }
                                />
                                <span className="radiocheckmark"></span>
                                <small className="name">Google / Search Engine</small>
                              </label>
                              <label className="radioStyle">
                                <input
                                  onChange={(e) => setAboutUs(e.target.value)}
                                  value="Others"
                                  type="radio"
                                  name="about_us"
                                  defaultChecked={aboutUS == "Others" ? true : false}
                                />
                                <span className="radiocheckmark"></span>
                                <small className="name">Others</small>
                              </label>
                            </div>
                          </div>
                          <div className="btns-group" onClick={() => setStep(3)}>
                            <a href="#" className="btn btnNext width-50 ml-auto">
                              Continue
                            </a>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      {step == 3 ? (
                        <div className={`formStep ${step} ${step == 3 ? "formStep-active" : ""}`}>
                          <div className="Step3 StepAll">
                            <div className="step-title">
                          <div
                            className="back-btn"
                            style={{ cursor: "pointer", margin: 0, width: "25px" }}
                            onClick={() => setStep(2)}
                          >
                            <BackButton />
                          </div>
                              What are the <strong>skills</strong> you are interested in?
                            </div>
                            <div className="tabs-checkbox-group">
                              <small className="label-txt">Cloud Computing</small>
                              <div className="inner-checkbox">
                                <label className="custom-checkbox">
                                  <input
                                    type="checkbox"
                                    value="1"
                                    onChange={(e) => skillsData(e, "cloud", "AWS")}
                                    defaultChecked={skills.cloud.includes("AWS") ? true : false}
                                  />
                                  <span className="checkbox-style"></span>
                                  <div className="name">AWS</div>
                                </label>
                                <label className="custom-checkbox">
                                  <input
                                    type="checkbox"
                                    value="1"
                                    onChange={(e) => skillsData(e, "cloud", "Azure")}
                                    defaultChecked={skills.cloud.includes("Azure")}
                                  />
                                  <span className="checkbox-style"></span>
                                  <div className="name">Azure</div>
                                </label>
                                <label className="custom-checkbox">
                                  <input
                                    type="checkbox"
                                    value="1"
                                    onChange={(e) => skillsData(e, "cloud", "Google Cloud")}
                                    defaultChecked={skills.cloud.includes("Google Cloud")}
                                  />
                                  <span className="checkbox-style"></span>
                                  <div className="name">Google Cloud</div>
                                </label>
                                <label className="custom-checkbox">
                                  <input
                                    type="checkbox"
                                    value="1"
                                    onChange={(e) => skillsData(e, "cloud", "Others")}
                                    defaultChecked={skills.cloud.includes("Others")}
                                  />
                                  <span className="checkbox-style"></span>
                                  <div className="name">Others</div>
                                </label>
                              </div>
                            </div>
                            <div className="tabs-checkbox-group">
                              <small className="label-txt">Other Certifications</small>
                              <div className="inner-checkbox">
                                <label className="custom-checkbox">
                                  <input
                                    type="checkbox"
                                    value="1"
                                    onChange={(e) => skillsData(e, "other", "DevOps")}
                                    defaultChecked={skills.other.includes("Others")}
                                  />
                                  <span className="checkbox-style"></span>
                                  <div className="name">DevOps</div>
                                </label>
                                <label className="custom-checkbox">
                                  <input
                                    type="checkbox"
                                    value="1"
                                    onChange={(e) => skillsData(e, "other", "Java")}
                                    defaultChecked={skills.other.includes("Java")}
                                  />
                                  <span className="checkbox-style"></span>
                                  <div className="name">Java</div>
                                </label>
                                <label className="custom-checkbox">
                                  <input
                                    type="checkbox"
                                    value="1"
                                    onChange={(e) => skillsData(e, "other", "Big Data")}
                                    defaultChecked={skills.other.includes("Big Data")}
                                  />
                                  <span className="checkbox-style"></span>
                                  <div className="name">Big Data</div>
                                </label>
                                <label className="custom-checkbox">
                                  <input
                                    type="checkbox"
                                    value="1"
                                    onChange={(e) => skillsData(e, "other", "BlockChain")}
                                    defaultChecked={skills.other.includes("BlockChain")}
                                  />
                                  <span className="checkbox-style"></span>
                                  <div className="name">BlockChain</div>
                                </label>
                                <label className="custom-checkbox">
                                  <input
                                    type="checkbox"
                                    value="1"
                                    onChange={(e) => skillsData(e, "other", "Cyber Security")}
                                    defaultChecked={skills.other.includes("Cyber Security")}
                                  />
                                  <span className="checkbox-style"></span>
                                  <div className="name">Cyber Security</div>
                                </label>
                                <label className="custom-checkbox">
                                  <input
                                    type="checkbox"
                                    value="1"
                                    onChange={(e) => skillsData(e, "other", "Microsoft")}
                                    defaultChecked={skills.other.includes("Microsoft")}
                                  />
                                  <span className="checkbox-style"></span>
                                  <div className="name">Microsoft</div>
                                </label>
                              </div>
                            </div>
                            <div className="unable-block">
                              <input
                                type="text"
                                placeholder="Something Else? Type here."
                                value={moreskills}
                                onChange={(e) => setMoreskills(e.target.value.toLowerCase())}
                              />
                            </div>
                          </div>
                          <div className="btns-group" onClick={() => setStep(4)}>
                            <a href="#" className="btn btnNext">
                              Continue
                            </a>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {step == 4 ? (
                        <div className={`formStep ${step == 4 ? "formStep-active" : ""}`}>
                          <div className="Step1 StepAll">
                            <div className="step-title">
                          <div
                            className="back-btn"
                            style={{ cursor: "pointer", margin: 0, width: "25px" }}
                            onClick={() => setStep(3)}
                          >
                            <BackButton />
                          </div>
                              How long do you plan to <strong>access Whizlabs platform?</strong>
                            </div>
                            <div className="radio-group">
                              <label className="radioStyle">
                                <input
                                  onChange={(e) => setTimePeriod(e.target.value)}
                                  value="1 to 3 Months"
                                  type="radio"
                                  name="time_period"
                                  defaultChecked={timePeriod == "1 to 3 Months" ? true : false}
                                />
                                <span className="radiocheckmark"></span>
                                <small className="name">1 to 3 Months</small>
                              </label>
                              <label className="radioStyle">
                                <input
                                  onChange={(e) => setTimePeriod(e.target.value)}
                                  value="6 to 12 Month"
                                  type="radio"
                                  name="time_period"
                                  defaultChecked={timePeriod == "6 to 12 Month" ? true : false}
                                />
                                <span className="radiocheckmark"></span>
                                <small className="name">6 to 12 Months</small>
                              </label>
                              <label className="radioStyle">
                                <input
                                  onChange={(e) => setTimePeriod(e.target.value)}
                                  value="More than a year"
                                  type="radio"
                                  name="time_period"
                                  defaultChecked={timePeriod == "More than a year" ? true : false}
                                />
                                <span className="radiocheckmark"></span>
                                <small className="name">More than a year</small>
                              </label>
                              <label className="radioStyle">
                                <input
                                  onChange={(e) => setTimePeriod(e.target.value)}
                                  value="Not sure yet"
                                  type="radio"
                                  name="time_period"
                                  defaultChecked={timePeriod == "Not sure yet" ? true : false}
                                />
                                <span className="radiocheckmark"></span>
                                <small className="name">Not sure yet</small>
                              </label>
                            </div>
                          </div>
                          <div className="btns-group" onClick={() => setStep(5)}>
                            <a href="#" className="btn btnNext">
                              Continue
                            </a>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {step == 5 ? (
                        <div className={`formStep ${step == 5 ? "formStep-active" : ""}`}>
                          <div className="Step1 StepAll">
                            <div className="step-title">
                          <div
                            className="back-btn"
                            style={{ cursor: "pointer", margin: 0, width: "25px" }}
                            onClick={() => setStep(4)}
                          >
                            <BackButton />
                          </div>
                              Do you want to update your profile details?
                            </div>
                            <div className="Step1 StepAll">
                              <div
                                className="btn-group"
                                style={{ display: "flex", justifyContent: "space-between" }}
                              >
                                <a
                                  href="/my-account"
                                  className="btn btnNext"
                                  style={{ background: "#0063ffeb", textDecoration: "none" }}
                                  onClick={() => onYes()}
                                >
                                  Yes
                                </a>
                                <a
                                  href="#"
                                  className="btn btnNext"
                                  style={{ background: "#0063ffeb", textDecoration: "none" }}
                                  onClick={() => onNo()}
                                >
                                  Skip
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {step == 7 ? (
                        <div className={`formStep ${step == 7 ? "formStep-active" : ""}`}>
                          <div className="Step1 StepAll">
                            <div className="step-title">
                          <div
                            className="back-btn"
                            style={{ cursor: "pointer", margin: 0, width: "25px" }}
                            onClick={() => setStep(5)}
                          >
                            <BackButton />
                          </div>
                              We will redirect you to my account page to complete your profile.
                            </div>
                            <div
                              className="btn-group"
                              style={{ display: "flex", justifyContent: "space-between" }}
                            >
                              <a
                                href="/my-account"
                                className="btn btnNext"
                                style={{ background: "#0063ffeb", textDecoration: "none" }}
                                onClick={() => {
                                  cookie.remove("signupmodal");
                                }}
                              >
                                Continue
                              </a>
                              <a
                                href="#"
                                className="btn btnNext"
                                style={{ background: "#0063ffeb", textDecoration: "none" }}
                                onClick={() => onSubmit(null)}
                              >
                                Skip
                              </a>
                            </div>
                          </div>
                        </div>
                      ) : null}
                      {step != 5 ? (
                        <>
                          <div className="stepper-nub">{step} out of 4</div>
                          <div className="modal-footer" onClick={() => onSkip()}>
                            <a href="/pricing" className="skip-link" style={{ color: "#0085FF" }}>
                              Skip for now
                            </a>
                          </div>
                        </>
                      ) : null}
                    </form>
                  </div>
                </div>
                {/* <div className="modal-footer" onClick={() => onSkip()}>
								<a href="#" className="skip-link">Skip for now</a>
							</div> */}
              </div>
            </div>
          </div>

          {step == 6 ? (
            <div
              className={`modal modal-features-plat  ${openFlatModal ? "aftersignupmode" : ""}`}
              style={{
                opacity: openFlatModal ? 1 : 0,
                visibility: openFlatModal ? "visible" : "hidden",
              }}
            >
              <div className="modal-inner">
                <div className="modal-container">
                  <div className="modal-header">
                    <div className="title-block">
                      <div className="title">
                        Whizlabs provides an <strong>Excellent Learning Experience.</strong>
                        <p className="para">Here are some of our key platform features!</p>
                      </div>
                    </div>
                  </div>
                  <div className="modal-content">
                    <div className="features-box-group">
                      <div className="FeaturesBox">
                        <a href="/platform/practice-test" className="img-block" target="_blank">
                          <figure>
                            <img className="img-full" src="/images/features1.png" alt="" />
                          </figure>
                        </a>
                        <div className="caption-block">
                          <p>
                            Preparing for <strong>certification exams?</strong> <br /> Get ready to
                            test your skill gaps!
                          </p>
                          <div className="learn-more">
                            <span>Exam Simulator</span>
                            <a className="more-link" href="/platform/practice-test" target="_blank">
                              Learn More
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="FeaturesBox">
                        <a
                          href="/platform/self-study-video-courses"
                          className="img-block"
                          target="_blank"
                        >
                          <figure>
                            <img className="img-full" src="/images/features2.png" alt="" />
                          </figure>
                        </a>
                        <div className="caption-block">
                          <p>
                            Deep dive into the <strong>latest tech skills</strong> <br /> with our
                            expert-curated Video Courses!
                          </p>
                          <div className="learn-more">
                            <span>Video Courses</span>
                            <a
                              className="more-link"
                              href="/platform/self-study-video-courses"
                              target="_blank"
                            >
                              Learn More
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="FeaturesBox">
                        <a className="img-block" href="labs" target="_blank">
                          <figure>
                            <img className="img-full" src="/images/features3.png" alt="" />
                          </figure>
                        </a>
                        <div className="caption-block">
                          <p>
                            <strong>Tired</strong> of <strong>basking in theory?</strong> <br /> Try
                            Real-time Learning!
                          </p>
                          <div className="learn-more">
                            <span>Hands-on Labs</span>
                            <a className="more-link" href="labs/library" target="_blank">
                              Learn More
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="FeaturesBox">
                        <a className="img-block" href="/labs/sandbox" target="_blank">
                          <figure>
                            <img className="img-full" src="/images/features4.png" alt="" />
                          </figure>
                        </a>
                        <div className="caption-block">
                          <p>
                            Practice your <strong>skills</strong> in your own <br />{" "}
                            <strong>isolated environment.</strong>
                          </p>
                          <div className="learn-more">
                            <span>Cloud Sandboxes</span>
                            <a className="more-link" href="/labs/sandbox" target="_blank">
                              Learn More
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="btn-dashboard"
                      onClick={(e) => {
                        cookie.remove("signupmodal");
                      }}
                    >
                      <a href="/" className="btn">
                        Next
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      ) : null}
    </>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    searchCourse: (value) => dispatch(searchAllCourses(value)),
  };
};
export default connect(null, mapDispatchToProps)(AfterSignUpModal);
