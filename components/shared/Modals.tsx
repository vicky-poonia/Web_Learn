import { StarRating } from "@/components/import";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import moment from "moment";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import CloseIcon from '@material-ui/icons/Close';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import cookie from "js-cookie";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  InstapaperShareButton,
  InstapaperIcon,
} from "next-share";
import { convertToTitleCase } from "helpers/CustomHelpers";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import InboxIcon from '@material-ui/icons/Inbox';
// import Accordianmodal from "./Accordian-modal";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL;
import styles from "../../public/styles/Modals.module.css"
import { whizCardLoader } from "redux/WhizCard/whizcard-action";
import { useDispatch } from "react-redux";

export const VideoReviewModal = ({ videoUrl }) => {
  const closeModal=()=>{
    document.querySelector("body").classList.remove("open-modal-review-video");
  }
  return (
    <>
      {/* <!-- modal-review-video --> */}
      <div className="modal modal-review-video">
        <div className="modal-inner" onClick={(e)=>document.querySelector("body").classList.remove("open-modal-review-video")}>
          <div className="modal-container" onClick={(e)=>e.stopPropagation()}>
            <div className="modal-content">
              <img className="img-full" src="/images/modal-review-video-placeholder.png" alt="" />
              <iframe id="video" src={videoUrl} frameBorder="0" allowFullScreen></iframe>
              <div className="icon-close icon-font-cross-bold"  onClick={closeModal}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const PreviewCourseModal = ({ previewData }) => {
  // console.log(previewData, "p data")
  const [expanded, setExpanded] = useState("panel0");
  const closeModal = () => {
    var videos = document.querySelectorAll("iframe, video");
    Array.prototype.forEach.call(videos, function (video) {
      if (video.tagName.toLowerCase() === "video") {
        video.pause();
      } else {
        var src = video.src;
        video.src = src;
      }
    });
    document.querySelector("body").classList.remove("open-modal-preview-course");
  };

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (!previewData) return <></>;

  const videoData = previewData?.detailedInfo?.onlinecourse_info?.filter((item) => {
    if (item.activity_id != 2) {
    } else {
      return item;
    }
  });

  const labData = previewData?.detailedInfo?.lab_info?.filter((item) => {
    if (item.activity_id != 6) {
    } else {
      return item;
    }
  });

  const particeData = previewData?.detailedInfo?.praticetest_info?.filter((item) => {
    if (item.activity_id != 1) {
    } else {
      return item;
    }
  });

  const sandboxData = previewData?.detailedInfo?.sandbox_info?.filter((item) => {
    if (item.activity_id == 7) {
    } else {
      return item;
    }
  });

  return (
    <div className="modal modal-preview-course">
      <div className="modal-inner">
        <div className={`modal-container ${previewData.isOcAvailable ? "no-img" : "no-video"}`}>
          <div className="modal-content">
            {previewData.isOcAvailable ? (
              <div className="preview-video">
                <iframe
                  className="myvideo"
                  id="video"
                  src={previewData.demoVideoLink}
                  frameBorder="0"
                  allowFullScreen
                  width={600}
                  height={430}
                ></iframe>
                <img className="img-full" src="images/video-placeholder.png" alt="" />
              </div>
            ) : (
              <div className="preview-img">
                <img
                  width={600}
                  height={430}
                  className="img-full"
                  src={previewData.courseImage}
                  alt={previewData.courseTitle}
                  title={previewData.courseTitle}
                />
              </div>
            )}
            <div className="course-details"  
               style={{ minHeight: previewData.page_type === "course" && window.innerWidth >= 1024 ? "480px" : "" }}>
              <div className="head-section">
                <div className="level-text">
                  {previewData.sellLevel && (
                    <label className="bestseller">{previewData.sellLevel}</label>
                  )}
                  {previewData.courseLevel && (
                    <span>Level: {convertToTitleCase(previewData.courseLevel)}</span>
                  )}
                </div>
                <div className="title">{previewData.courseTitle}</div>

                <StarRating
                  isSamp={true}
                  avgRating={previewData.averageRating}
                  totalRating={previewData.totaRatingCount}
                />
              </div>
              <div
                className={`course-content ${previewData.page_type !== "course" ? "" : "no-btn"}`}
              >
                <div className="accordian-block">
                  <div className="title">What you will learn</div>
                  <div className="accordian-list">
                    {previewData.isPtComingSoon == false &&
                      previewData.detailedInfo?.praticetest_info?.length ? (
                      <div className="item">
                        <Accordion
                          square
                          expanded={expanded === "panel0"}
                          onChange={handleChangeAccordion("panel0")}
                          TransitionProps={{ unmountOnExit: true }}
                        >
                          <AccordionSummary
                            className="item-head"
                            aria-controls={"panel1d-content"}
                            id={"panel1d-header"}
                            expandIcon={
                              expanded === `panel0` ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />
                            }
                          >
                            <span>Practice Tests</span>
                            <div className="total">
                              {previewData.detailedInfo?.praticetest_info?.length
                                ? particeData.length
                                : 0}{" "}
                              Tests
                            </div>
                          </AccordionSummary>
                          <AccordionDetails className="item-content">
                            <ul style={{listStyle:"none"}}>
                              {previewData.detailedInfo?.praticetest_info.map(
                                (data, idx) =>
                                  data.quiz_name &&
                                  data.id &&
                                  data.questions_count && (
                                    <li key={idx}>
                                      <div className="title">
                                        <i className="icon-font-note2"></i>
                                        <span>{data.quiz_name}</span>
                                      </div>
                                      <div className="total-que">
                                        {data.questions_count} questions
                                      </div>
                                    </li>
                                  )
                              )}
                            </ul>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    ) : (
                      ""
                    )}
                    {previewData.isOcComingSoon == false &&
                      previewData.detailedInfo?.onlinecourse_info?.length ? (
                      <div className="item">
                        <Accordion
                          square
                          expanded={expanded === "panel1"}
                          onChange={handleChangeAccordion("panel1")}
                          TransitionProps={{ unmountOnExit: true }}
                        >
                          <AccordionSummary
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                            className="item-head"
                            expandIcon={
                              expanded === `panel1` ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />
                            }
                          >
                            <span>Video Lectures</span>
                            <div className="total">
                              {previewData.detailedInfo?.onlinecourse_info?.length
                                ? videoData.length
                                : 0}{" "}
                              lectures
                            </div>
                          </AccordionSummary>
                          <AccordionDetails className="item-content">
                            <ul style={{listStyle:"none"}}>
                              {previewData.detailedInfo?.onlinecourse_info
                                .filter((item) => {
                                  if (item.activity_id == 2) {
                                    return item;
                                  }
                                })
                                .map(
                                  (data, idx) =>
                                    data.video_name && (
                                      <li key={idx}>
                                        <div className="title">
                                          <i className="icon-font-note2"></i>
                                          <span>{data.video_name}</span>
                                        </div>
                                        <div className="total-que">
                                          {`${data.time_hour ? data.time_hour : 0}:${
                                            data.time_minute
                                            }:${data.time_second ? data.time_second : 0}`}
                                        </div>
                                      </li>
                                    )
                                )}
                            </ul>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    ) : (
                      ""
                    )}
                    {previewData.detailedInfo?.lab_info?.length ? (
                      <div className="item">
                        <Accordion
                          square
                          expanded={expanded === "panel2"}
                          onChange={handleChangeAccordion("panel2")}
                          TransitionProps={{ unmountOnExit: true }}
                        >
                          <AccordionSummary
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                            className="item-head"
                            expandIcon={
                              expanded === `panel2` ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />
                            }
                          >
                            <span>Labs</span>
                            <div className="total">
                              {previewData.detailedInfo?.lab_info?.length ? labData.length : 0} labs
                            </div>
                          </AccordionSummary>
                          <AccordionDetails className="item-content">
                            <ul style={{listStyle:"none"}}>
                              {previewData.detailedInfo?.lab_info.map(
                                (data, idx) =>
                                  data.lab_name && (
                                    <li key={idx}>
                                      <div className="title">
                                        <i className="icon-font-note2"></i>
                                        <span>{data.lab_name}</span>
                                      </div>
                                      <div className="total-que">
                                        {data.duration_hour > 0 && `${data.duration_hour}H `}
                                        {data.duration_minutes > 0 && `${data.duration_minutes}M`}
                                      </div>
                                    </li>
                                  )
                              )}
                            </ul>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    ) : (
                      ""
                    )}

                    {previewData.detailedInfo?.sandbox_info?.length ? (
                      <div className="item">
                        <Accordion
                          square
                          expanded={expanded === "panel3"}
                          onChange={handleChangeAccordion("panel3")}
                          TransitionProps={{ unmountOnExit: true }}
                        >
                          <AccordionSummary
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                            className="item-head"
                            expandIcon={
                              expanded === `panel3` ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />
                            }
                          >
                            <span>Cloud Sandbox</span>
                            <div className="total">
                              Available
                            </div>
                          </AccordionSummary>
                          <AccordionDetails className="item-content">
                            <ul style={{listStyle:"none"}}>
                              {previewData.detailedInfo?.sandbox_info.map(
                                (data, idx) =>
                                  data.sandbox_name && (
                                    <li key={idx}>
                                      <div className="title">
                                      <i className="icon" style={{fontSize:'1rem'}}> <InboxIcon fontSize='inherit'/></i>
                                        <span>{data.sandbox_name}</span>
                                      </div>
                                    </li>
                                  )
                              )}
                            </ul>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    ) : (
                      ""
                    )}

                  </div>
                </div>

                <div className="decaption-block">
                  <span>Description:</span>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: previewData.courseDescription,
                    }}
                  ></div>
                </div>
              </div>
              {previewData.page_type !== "course" && (
                <div className="btn-course-details">
                  <Link href={"/" + previewData.courseSlug}>
                    <a className="btn" target="_blank">Course Details</a>
                  </Link>
                </div>
              )}
            </div>
            <div className="icon-close icon icon-font-cross" onClick={() => closeModal()}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReviewCoursesModal = ({ coursesList }) => {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    setCourses(coursesList);
  }, [coursesList]);

  const searchCourse = (e) => {
    const value = e.target.value;
    if (value) {
      const filterCourses = coursesList.filter((item) => {
        if (item.name.toLowerCase().includes(value.toLowerCase())) {
          return item;
        }
      });
      setCourses(filterCourses);
    } else {
      setCourses(coursesList);
    }
  };

  const selectCourse = (slug) => {
    if (slug) {
      setSelectedCourse(slug);
    }
  };

  const openNewPage = () => {
    if (selectedCourse) {
      document.querySelector("body").classList.remove("open-modal-select-course");
      router.push(`/${selectedCourse}/reviews/write`);
    }
  };

  const closeModalSelect = () => {
    document.querySelector("body").classList.remove("open-modal-select-course");
  };

  return (
    <div className="modal modal-select-course">
      <div className="modal-inner">
        <div className="modal-container">
          <div className="modal-header">
            <div className="title-block">
              <div className="title">Select course to leave a Feedback</div>
            </div>
            <div className="seach-box">
              <input
                type="text"
                className="bg-ghostwhite"
                placeholder="Find Course…"
                onKeyUp={(e) => searchCourse(e)}
              />
              <div className="icon-search icon icon-font-search"></div>
            </div>
            <div className="icon-close icon-font-cross" onClick={closeModalSelect}></div>
          </div>
          <div className="modal-content">
            <div className="course-list" style={{ height: "300px", overflowY: "auto" }}>
              {courses?.map((item, i) => (
                <React.Fragment key={i}>
                  {item.seo_details && item.seo_details.slug ? (
                    <>
                      <div className="item">
                        <label>
                          <div className="left">
                            <figure>
                              <img
                                className="img-full"
                                src={
                                  item.seo_details.featured_image &&
                                  process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                                  item.seo_details.featured_image.replace("media/", "")
                                }
                                alt={item.name}
                                title={item.name}
                              />
                            </figure>
                            <span>{item.name}</span>
                          </div>
                          <div className="right">
                            <label className="custom-radiobutton">
                              <input
                                type="radio"
                                name="seletct-course"
                                checked={selectedCourse === item.seo_details.slug ? true : false}
                                onChange={() => selectCourse(item.seo_details.slug)}
                              />
                              <span className="radio-style"></span>
                            </label>
                          </div>
                        </label>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-continue" onClick={() => openNewPage()}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OrderDetailsModal = ({ data = null, setPreviewData }) => {
  const [loading, setLoading] = useState(false);
  const closeModal = () => {
    setPreviewData(null);
    document.querySelector("body").classList.remove("open-modal-order-details");
  };
  const downloadPdf = async (order_id) => {
    setLoading(true);
    try {
      const pdfResponse = await axios.get(ADMIN_URL + "/download-invoice/" + order_id);
      if (pdfResponse && pdfResponse.data) {
        var a = document.createElement("a");
        a.href = pdfResponse.data;
        a.download = "Whizlabs_Invoice.pdf";
        a.click();
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      return;
    }
  };

  const getCurrencyType = (currency) => {
    const type = currency ? currency.toUpperCase() : "";
    switch (type) {
      case "INR":
        return "Rs.";
      case "GBP":
        return "£";
      case "EUR":
        return "€";
      default:
        return "$";
    }
  };
  // console.log(data)
  return (
    <>
      {data ? (
        <>
          <div className="modal modal-order-details">
            <div className="modal-inner" onClick={closeModal}>
              <div
                className="modal-container"
                style={{ maxHeight: "90vh" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <div className="title-block">
                    <div className="title">Order Details</div>
                  </div>
                  <div className="icon-close icon-font-cross" onClick={() => closeModal()}></div>
                </div>
                <div className="modal-content">
                  <div className="block-group">
                    <div className="block order-info">
                      <div className="block-head">Order Information</div>
                      <div className="block-content">
                        <div className="detail-group">
                          <div className="detail">
                            <label>Order ID</label>
                            <span>#{data.id || ""}</span>
                          </div>
                          <div className="detail">
                            <label>Order Date</label>
                            <span>
                              {data.order_date
                                ? moment(new Date(data.order_date)).format("ll")
                                : ""}
                            </span>
                          </div>
                          <div className="detail">
                            <label>Payment Mode</label>
                            <span>{data.payment_mode || ""}</span>
                          </div>
                          {data.transaction_id && (
                            <div className="detail">
                              <label>Transaction ID</label>
                              <span>#{data.transaction_id}</span>
                            </div>
                          )}
                          <div className="detail">
                            <label>Status</label>
                            <span>
                              {data.order_status == "" ? "Incomplete" : data.order_status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="block billing-info">
                      <div className="block-head">Billing Information</div>
                      <div className="block-content">
                        <div className="detail-group">
                          <div className="detail">
                            <label>Name</label>
                            <span>
                              {data.billing_first_name} {data.billing_last_name}
                            </span>
                          </div>
                          <div className="detail email">
                            <label>Email ID</label>
                            <span>{data.billing_email}</span>
                          </div>
                          {data?.billing_address1 || data?.billing_address2 ? (
                            <div className="detail">
                              <label>Address</label>
                              <span>
                                {data.billing_address1}, {data.billing_address2}
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                          {
                            data.billing_phone !== "0000000000" && <><div className="detail">
                              <label>Phone</label>
                              <span>{data.billing_phone || ""}</span>
                            </div></>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="order-details">
                    <div className="block-head">
                      <span>Order Details</span>
                      {loading ? (
                        <span>Downloading...</span>
                      ) : (
                        <a
                          className="link-invoice"
                          style={{ cursor: "pointer" }}
                          onClick={() => downloadPdf(data.id)}
                        >
                          Download Invoice
                        </a>
                      )}
                    </div>
                    <div className="order-table">
                      <div className="heading">
                        <ul style={{listStyle:"none"}}>
                          <li>Product</li>
                          <li></li>
                          <li>Amount</li>
                        </ul>
                      </div>
                      <div className="order-content">
                        {data.order_details && data.order_details.length > 0 ? (
                          <ul style={{listStyle:"none"}}>
                            {data.order_details.map((item, i) => {
                              let temp = new Date(item.course_period.end_date).getTime() - new Date(item.course_period.start_date).getTime();
                              let a = moment(new Date(item.course_period.end_date))
                              let b = moment(new Date(item.course_period.start_date))
                              let months = a.diff(b,"month")
                              return <>
                                <li className="list" key={i}>
                                  <div data-label="Product">
                                    {item.course_details.name}
                                    {item.product_type?.toUpperCase() == "PT"
                                      ? " (Practice Tests)"
                                      : ""}{" "}
                                    {item.product_type?.toUpperCase() == "OC"
                                      ? " (Video Course)"
                                      : ""}
                                    {item.product_type?.toUpperCase() == "LAB"
                                      ? " (Hands-on Labs)"
                                      : ""}
                                    {item.product_type?.toUpperCase().includes("SANDBOX")
                                    ? item.product_type.split("-")[1]?` (Sandbox) (${item.product_type.split("-")[1]}M - Ends on ${moment(
                                        new Date(item?.course_period?.end_date)
                                    ).format("ll")})`: item.course_period.end_date ?`(Cloud Sandbox) ${months}M - Ends on ${moment(new Date(item.course_period?.end_date)).format("ll")}` :"(Cloud Sandbox)"
                                      : ""}
                                    {/* `(${item.product_type.split("-")[1]}M - Ends on ${moment(
                                        new Date(item?.course_period?.end_date)
                                      ).format("ll")})` */}
                                  </div>
                                  {item.price !== 0 ? (
                                    <div data-label="Amount">
                                      {data.currency ? getCurrencyType(data.currency) : ""}
                                      {item.price?.toFixed(2)}
                                    </div>
                                  ) : (
                                    <div data-label="Amount">Free</div>
                                  )}
                                </li>
                              </>
                            })}
                            <li className="footer-list">
                              <div className="">
                                <span>Cart Subtotal</span>
                                <span>
                                  {data.currency ? getCurrencyType(data.currency) : ""}
                                  {data.sub_total?.toFixed(2)}
                                </span>
                              </div>
                              <div className="">
                                <span>
                                  Discount{" "}
                                  {data.promotion_id
                                    ? `(${data.promotion.promotion_type})`
                                    : data?.coupon_code
                                      ? `(${data?.coupon_code.toUpperCase()})`
                                      : `(-)`}
                                </span>
                                <span>
                                  - {data.currency ? getCurrencyType(data.currency) : ""}
                                  {data.order_discount ? data.order_discount?.toFixed(2) : "0.00"}
                                </span>
                              </div>
                              <div className="">
                                <strong>Order Total</strong>
                                <strong>
                                  {data.currency ? getCurrencyType(data.currency) : ""}
                                  {data.order_total?.toFixed(2)}
                                </strong>
                              </div>
                            </li>
                          </ul>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export const ComingSoonNotifyModal = ({ data, alertBox ,userData,updateNotified}) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (formData, e) => {
    e.preventDefault();
    closeModalPopup();
    if (data && data.course_id && formData.email) {
      const response = await axios.post(baseUrl + "/users/notify", {
        email: formData.email,
        course_id: data.course_id,
        product_type: data.course_type || null,
      });
      if (response && response.data.status) {
        e.target.reset();
        alertBox({
          type: "SUCCESS",
          title: "Success",
          msg: "Notification sent successfully",
        });
        updateNotified(userData.data.user_id)
      } else {
        //
      }
    }
  };

  const closeModalPopup = () => {
    document.querySelector("body").classList.remove("open-modal-notify");
  };

  return (
    <>
      {/* <!-- modal-notify --> */}
      <div className="modal modal-notify">
        <div className="modal-inner">
          <div className="modal-container">
            <div className="modal-header">
              <div className="title-block">
                <div className="title">
                  {data.type === "NOTIFY" ? "Notify me" : "Share this course"}
                </div>
                {data.type === "NOTIFY" ? (
                  <span className="title-note">
                    You will be notified when we release this course
                  </span>
                ) : (
                  <span className="title-note">We will share the details about this course</span>
                )}
              </div>
              <div className="icon-close icon-font-cross" onClick={() => closeModalPopup()}></div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-content">
                <div className="box-borderd">
                  <div className="input-box">
                    <label>
                      Enter your email ID<small>*</small>
                    </label>
                    <input
                      className="bg-ghostwhite"
                      type="email"
                      name="email"
                      required
                      placeholder="Enter Email"
                      defaultValue={data.user_email || ""}
                      ref={register({
                        required: true,
                        pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                      })}
                    />
                    {errors.email && errors.email.type === "required" && (
                      <span className="error-msg">This field is required</span>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                      <span className="error-msg">Please enter valid email</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export const ShareCourseModal = ({ userData = null, data, alertBox }) => {
  const shareEmailIp = useRef(null);
  const pathIp = useRef(null);
  const [msg, setMsg] = useState("")
  const path = data.course_slug
    ? `${process.env.NEXT_PUBLIC_BASE_PATH + data.course_slug}`
    : `${process.env.NEXT_PUBLIC_BASE_PATH}`;
  const quote = `Thought you might enjoy this course on @whizlabs: ${data.course_title}`;

  const onSubmit = (e) => {
    e.preventDefault();
    const email = shareEmailIp.current.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      // console.log("working..")
      setMsg("Invalid email address!");
      setTimeout(() => {
        setMsg("");
      }, 2000);
      return;
    }
    if (shareEmailIp.current.value && data?.user_email && data?.course_title && data?.course_slug) {
      axios
        .post(baseUrl + "/users/share-course", {
          to_email: shareEmailIp.current.value,
          from_name: data.user_email,
          to_name: shareEmailIp.current.value,
          course_name: data.course_title,
          course_url: `${process.env.NEXT_PUBLIC_BASE_PATH + data.course_slug}`,
        })
        .then((response) => {
          if (response && response.data.status) {
            shareEmailIp.current.value = "";
            closeModalPopup();
            alertBox({
              type: "SUCCESS",
              title: "Success",
              msg: "Notification sent successfully",
            });
          } else {
            alertBox({
              type: "ERROR",
              title: "Error",
              msg: "Something went wrong. Please try again.",
            });
          }
        });
    } else {
      alertBox({
        type: "ERROR",
        title: "Error",
        msg: "Oops! something went wrong...",
      });
    }
  };

  const closeModalPopup = () => {
    document.querySelector("body").classList.remove("open-modal-share-course");
  };

  const copyPath = () => {
    pathIp.current.select();
    document.execCommand("copy");
  };

  return (
    <div className="modal modal-share-course">
      <div className="modal-inner">
        <div className="modal-container">
          <div className="modal-header">
            <div className="title-block">
              <div className="title">Share this Course</div>
              <span className="title-note">
                We will share this course to your friend/colleague as recommend.
              </span>
            </div>
            <div className="icon-close icon-font-cross" onClick={closeModalPopup}></div>
          </div>
          <div className="modal-content">
            <div className="social-group">
              <FacebookShareButton url={path} quote={quote}>
                <FacebookIcon size={50} round />
              </FacebookShareButton>
              <TwitterShareButton url={path} title={quote}>
                {/* <TwitterIcon size={50} round /> */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    zoomAndPan="magnify"
                    viewBox="0 0 375 374.9999"
                    preserveAspectRatio="xMidYMid meet"
                    version="1.0"
                    fill="#2D3B4D"
                  >
                    <defs>
                      <path
                        d="M 7.09375 7.09375 L 367.84375 7.09375 L 367.84375 367.84375 L 7.09375 367.84375 Z M 7.09375 7.09375 "
                        fill="#2D3B4D"
                      ></path>
                    </defs>
                    <g>
                      <path
                        d="M 187.46875 7.09375 C 87.851562 7.09375 7.09375 87.851562 7.09375 187.46875 C 7.09375 287.085938 87.851562 367.84375 187.46875 367.84375 C 287.085938 367.84375 367.84375 287.085938 367.84375 187.46875 C 367.84375 87.851562 287.085938 7.09375 187.46875 7.09375 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                        fill="#2D3B4D"
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
                          fill="#ffffff"
                        ></path>
                      </svg>
                    </g>
                  </svg>
              </TwitterShareButton>
              <LinkedinShareButton url={path} title={quote}>
                <LinkedinIcon size={50} round />
              </LinkedinShareButton>
              <InstapaperShareButton url={path} title={quote}>
                <InstapaperIcon size={50} round />
              </InstapaperShareButton>
              <EmailShareButton url={path} title={quote}>
                <EmailIcon size={50} round />
              </EmailShareButton>
            </div>
            <div className="share-link-block">
              <div className="block-title">Or copy link</div>
              <div className="block-content">
                <div className="input-block">
                  <input ref={pathIp} readOnly type="text" value={path} />
                  <div className="btn-copy" onClick={copyPath}>
                    Copy
                  </div>
                </div>
              </div>
            </div>
            {userData && userData.data.user_id && (
              <div className="box-borderd">
                <div className="input-box">
                  <label>
                    Or enter your friend/colleague email ID<small>*</small>
                  </label>
                  <input className="bg-ghostwhite" 
                    type="text" 
                    ref={shareEmailIp} 
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    required 
                  />
                  <div className="btn-send btn" onClick={onSubmit}>
                    send
                  </div>
                </div>
                {msg && <div style={{ color: "red" }}>{msg}</div>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SubscriptionAutoRenewModal = ({ handleAutoRenew }) => {
  const closeModalPopup = () => {
    setDisableError("");
    setDisableReason("");
    document.body.classList.remove("open-modal-auto-renew");
  };
  const [disableReason, setDisableReason] = useState("");
  const [disableError, setDisableError] = useState("");
  
  const toggleAutoRenew = () => {
    if (disableReason) {
      handleAutoRenew(disableReason);
      setDisableError("");
      setDisableReason("");
    } else {      
      setDisableError("This field is required.");
      document.body.classList.add("open-modal-auto-renew");
    }
  };

  return (
    <div className="modal modal-auto-renew">
      <div className="modal-inner" onClick={closeModalPopup}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="title-block">
              <div className="title">Would you like to disable auto-renew?</div>
            </div>
            <div className="icon-close icon-font-cross" onClick={() => closeModalPopup()}></div>
          </div>
          <div className="modal-content">
            <p>Your subscription will no longer renew if you disable auto-renew option</p>
            <textarea
              required
              placeholder="Please mention reason for disable auto-renew"
              name="Disable_reason_msg_from_user"
              value={disableReason}
              onChange={(e) => setDisableReason(e.target.value)}
              style={{ marginBottom: "12px" }}
            />
            {disableError ? <p style={{ color: "red", fontSize: "15px" }}>{disableError}</p> : ""}
            <div className="btn-group">
              <button className="btn submit" onClick={toggleAutoRenew}>
                Yes, Disable
              </button>
              <button className="btn cancel" onClick={() => closeModalPopup()}>
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SubscriptionCancelModal = ({ handleSubCancel }) => {
  const closeModalPopup = () => {
    setError("");
    setReason("");
    document.body.classList.remove("open-modal-cancel-subscription");
  };
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const cancelSubscription = () => {
    if (reason) {
      handleSubCancel(reason);
      setError("");
      setReason("");
    } else {
      setError("This field is required.");
    }
  };

  return (
    <div className="modal modal-cancel-subscription">
      <div className="modal-inner" onClick={closeModalPopup}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="title-block">
              <div className="title">Are you sure to Cancel Subscription?</div>
            </div>
            <div className="icon-close icon-font-cross" onClick={(e) => closeModalPopup()}></div>
          </div>
          <div className="modal-content">
            <p>
              Your subscription will be Cancelled within 24 hours and No longer you will be able to
              use this subscription.{" "}
            </p>
            <textarea
              placeholder="Reason for cancel subscription"
              name="reason_msg_from_user"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              style={{ marginBottom: "12px" }}
            />
            {error ? <p style={{ color: "red", fontSize: "15px" }}>{error}</p> : ""}
            <div className="btn-group">
              <button className="btn submit" onClick={cancelSubscription}>
                Yes, Cancel
              </button>
              <button className="btn cancel" onClick={(e) => closeModalPopup()}>
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SubscriptionOrderDetailsModal = ({ data = null, setSubsOrderData }) => {
  const [loading, setLoading] = useState(false);
  const closeModal = () => {
    setSubsOrderData(null);
    document.querySelector("body").classList.remove("open-modal-order-details");
  };

  const downloadSubscriptionPdf = async (order_id) => {
    setLoading(true);
    try {
      const pdfResponse = await axios.get(ADMIN_URL + "/download-subscription-invoice/" + order_id);
      if (pdfResponse && pdfResponse.data) {
        var a = document.createElement("a");
        a.href = pdfResponse.data;
        a.download = "Whizlabs_Invoice.pdf";
        a.click();
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      return;
    }
  };

  return data ? (
    <div className="modal modal-order-details" id="subscription_order_invoice">
      <div className="modal-inner" onClick={closeModal}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="title-block">
              <div className="title">Order Details</div>
            </div>
            <div className="icon-close icon-font-cross" onClick={() => closeModal()}></div>
          </div>
          <div className="modal-content">
            <div className="block-group">
              <div className="block order-info">
                <div className="block-head">Order Information</div>
                <div className="block-content">
                  <div className="detail-group">
                    <div className="detail">
                      <label>Order ID</label>
                      <span>#{data?.id || ""}</span>
                    </div>
                    <div className="detail">
                      <label>Order Date</label>
                      <span>
                        {data?.order_date ? moment(new Date(data.order_date)).format("ll") : ""}
                      </span>
                    </div>
                    <div className="detail">
                      <label>Payment Mode</label>
                      <span>{data?.payment_mode || ""}</span>
                    </div>
                    {data?.transaction_id && (
                      <div className="detail">
                        <label>Transaction ID</label>
                        <span>#{data?.transaction_id}</span>
                      </div>
                    )}
                    <div className="detail">
                      <label>Status</label>
                      <span>{data?.order_status == "" ? "Incomplete" : data?.order_status}</span>
                    </div>
                    {/* <div className="detail">
                        <label>Amount</label>
                        <span>$25</span>
                      </div> */}
                  </div>
                </div>
              </div>
              <div className="block billing-info">
                <div className="block-head">Billing Information</div>
                <div className="block-content">
                  <div className="detail-group">
                    <div className="detail">
                      <label>Name</label>
                      <span>
                        {data?.billing_first_name} {data?.billing_last_name}
                      </span>
                    </div>
                    <div className="detail email">
                      <label>Email ID</label>
                      <span>{data?.billing_email || ""}</span>
                    </div>
                    {data?.billing_address1 || data?.billing_address2 ? (
                      <div className="detail">
                        <label>Address</label>
                        <span>
                          {data.billing_address1}, {data.billing_address2}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="detail">
                      <label>Phone</label>
                      <span>{data?.billing_phone || ""}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-details">
              <div className="block-head">
                <span>Order Details</span>
                {loading ? (
                  <span>Downloading....</span>
                ) : (
                  <a
                    className="link-invoice"
                    style={{ cursor: "pointer" }}
                    onClick={() => downloadSubscriptionPdf(data?.id)}
                  >
                    Download Invoice
                  </a>
                )}
              </div>
              <div className="order-table">
                <div className="heading">
                  <ul style={{listStyle:"none"}}>
                    <li>Product</li>
                    <li></li>
                    <li>Amount</li>
                  </ul>
                </div>
                <div className="order-content">
                  <ul style={{listStyle:"none"}}>
                    <li className="list">
                      <div data-label="Product">{data?.plan?.title || ""}</div>
                      <div data-label="Amount">
                        {"US $"}
                        {data?.plan?.price.usd || ""}
                      </div>
                    </li>
                    <li className="footer-list">
                      <div className="">
                        <span>Cart Subtotal</span>
                        <span>
                          {"US $"}
                          {data?.sub_total?.toFixed(2) || ""}
                        </span>
                      </div>
                      <div className="">
                        <span>
                          Discount {data?.coupon_code ? " (" + data?.coupon_code.toUpperCase() + ")" : " (-)"}
                        </span>
                        <span>
                          {" "}
                          - {"US $"}
                          {data?.order_discount?.toFixed(2) || "0.00"}
                        </span>
                      </div>
                      <div className="">
                        <strong>Order Total</strong>
                        <strong>
                          {"US $"}
                          {data?.order_total?.toFixed(2) || ""}
                        </strong>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export const UserAccountCloseModal = ({ handleUserAccountClose }) => {
  const closeModalPopup = () => document.body.classList.remove("open-modal-close-user-account");

  const cancelUserAccount = (value) => handleUserAccountClose(value);

  return (
    <div className="modal modal-close-user-account">
      <div className="modal-inner">
        <div className="modal-container">
          <div className="modal-header">
            <div className="title-block">
              <div className="title" style={{ textAlign: "center" }}>
                Are you sure to close your account?
              </div>
            </div>
            <div className="icon-close icon-font-cross" onClick={(e) => closeModalPopup()}></div>
          </div>
          <div className="modal-content">
            <p style={{ textAlign: "center" }}>
              Your account will be closed within 24 hours. You will not be able to view courses
              after that.{" "}
            </p>
            <div
              className="btn-group"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                className="btn submit"
                onClick={cancelUserAccount}
                style={{
                  color: "#fff",
                  background: "#F06421",
                  minWidth: "130px",
                  margin: 0,
                  border: 0,
                }}
              >
                Yes, Continue
              </button>
              <button
                className="btn cancel"
                onClick={(e) => closeModalPopup()}
                style={{
                  color: "#1F2430",
                  background: "#F3F3F4",
                  marginLeft: "10px",
                }}
              >
                No, I changed my mind!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PopupModal = ({subs,user_type,addSubscriptionToState,plan}) => {
  const [open, setopen] = useState(false)
  const [planType,setPlanType] = useState(false)
  const[expired,setexpired] = useState(false)
  const [otherplan,setotherplan] = useState(false)
  let router = useRouter();
  useEffect(()=>{
    let banner_active = cookie.get("popup")
    if(!banner_active && subs && subs.length > 0 && user_type == "amazon")
    {
      let arramazon = [];
      let otherplans = [];
      let expired_plans = []
      subs.forEach((itm)=>{
        let obj = {}
        if(itm.is_plan_active)
        {
          if(itm.plan_id == 9 || itm.plan_id == 727){
            obj['id'] = itm.plan_id;
            obj['is_active'] = itm.is_plan_active
            obj['end_date'] = itm.end_date
            obj['renewal'] = !itm.is_cancelled
            arramazon.push(obj)
          }
        else{
            obj['id'] = itm.plan_id;
            obj['is_active'] = itm.is_plan_active
            obj['end_date'] = itm.end_date
            obj['renewal'] = !itm.is_cancelled
            otherplans.push(obj)
          }
        }
        else{
          obj['id'] = itm.plan_id;
          obj['is_active'] = itm.is_plan_active
          obj['end_date'] = itm.end_date
          obj['renewal'] = !itm.is_cancelled
          expired_plans.push(obj)
        }
      })
      if(otherplans.length > 0 && arramazon.length == 0){
        let otherdays = [];
        otherplans.forEach((itm)=>{
          let obj = {}
          let end_date = moment(new Date(itm.end_date))
          let now = moment(new Date())
          let days = end_date.diff(now,'days');
          obj['plan_id'] = itm.id;
          obj['days'] = days
          otherdays.push(obj)
        })
        otherdays.sort((a,b)=> b.days - a.days)
        if(otherdays[0].days > -7 && otherdays[0].days < 31){
          setopen(true)
          setotherplan(true)
        }
      }
      if(arramazon.length > 0 && otherplans.length == 0)
      {
        let amazondays = []

        arramazon.forEach((itm)=>{
          let obj = {}
          let end_date = moment(new Date(itm.end_date))
          let now = moment(new Date())
          let days = end_date.diff(now,'days');
          obj['plan_id'] = itm.id;
          obj['days'] = days
          obj['renewal'] = itm.renewal
          amazondays.push(obj)
        })
        amazondays.sort((a,b)=> b.days - a.days)
        if(amazondays[0].days >= -7 && amazondays[0].days < 31){
          if(amazondays[0].plan_id == 9)
          {
            setPlanType(true)
            setopen(true)
            document.querySelector('body').classList.add('avoid-overflow')
          }
          if(amazondays[0].plan_id == 727 && !amazondays[0].renewal){
            setopen(true)
            document.querySelector('body').classList.add('avoid-overflow')
          }
        }
      }
      if(expired_plans.length > 0 && arramazon.length == 0 && otherplans.length == 0){
        let plan_6m = expired_plans.find((itm) => itm.id == 9)
        let plan_12m = expired_plans.find((itm) => itm.id == 727)
        let other_subs = expired_plans.filter((itm)=> itm.id != 9 && itm.id != 727)
        if(plan_12m){
          let end_date = moment(new Date(plan_6m.end_date))
          let now = moment(new Date())
          let days = end_date.diff(now,'days');
          if(days >= -7 && days < 31 && !plan_12m.renewal){
            if(!plan_12m.is_active){
              setexpired(true)
            }
            setopen(true)
            document.querySelector('body').classList.add('avoid-overflow')
          }
        }
        if(plan_6m && !plan_12m && other_subs.length == 0){
          let end_date = moment(new Date(plan_6m.end_date))
          let now = moment(new Date())
          let days = end_date.diff(now,'days');
          if(days >= -7 && days < 31){
            setPlanType(true)
            if(!plan_6m.is_active){
              setexpired(true)
            }
            setopen(true)
            document.querySelector('body').classList.add('avoid-overflow')
          }
        }
        if(!plan_12m && other_subs.length > 0){
          setotherplan(true)
          setexpired(true)
          setopen(true)
          document.querySelector('body').classList.add('avoid-overflow')
        }
      }
    }
  },[subs])
  const redirectCheckout = (e)=>{
    e.preventDefault();
    addSubscriptionToState(plan)
    router.push('/pricing/checkout');
  }

  return <>
    {
      open && <>
        <div className="modal-popup-bf" onClick={(e)=>{
          setopen(false)
          cookie.set('popup', true, { expires: 3})
          document.querySelector("body").classList.remove("avoid-overflow")
        }}>
          <div className="popup" onClick={(e)=>{
            e.stopPropagation();
          }}>
            <div className="header-close">
              <CloseIcon onClick={(e)=>{
                e.preventDefault();
                setopen(false)
                cookie.set('popup', true, { expires: 3 })
                document.querySelector("body").classList.remove("avoid-overflow")
              }}/>
            </div>
            <div className="icon">
              {/* <InfoIcon/> */}
              {/* <h3 style={{color:"#e05613"}}>Uh Oh!</h3> */}
            </div>
            <div className="content">
            <div className="amazon-user">{planType ?<>Your 6 Month FREE subscription {expired ? <>has expired</>:<>is going to expire </>}</>
            :<>Your {otherplan ? <></>:<>Amzazon</>}  subscription {expired ? <>has expired</>:<>is going to expire </>}</>}</div>
            <p style={{margin:"10px"}}>RENEW your Access <br/><strong>@ Just $5/Month </strong><br/> our Regular Price <del>$155</del>/year<br/> Renew Now!</p>
              <div className="btn link-pricing" onClick={(e)=>{
                cookie.set('popup', true, { expires: 3 })
                document.querySelector("body").classList.remove("avoid-overflow")
                redirectCheckout(e)
              }}>
                Stay Unlimited
              </div>
              <p>{otherplan && !expired ? <><span style={{color:"red"}}>*</span><span style={{fontSize:"11px"}}>To avail this offer make sure auto renewal is disabled for current plan</span></>:<></>}</p>
            </div>
          </div>
        </div>
      </>
    }
  </>
}

export const Courseexpirypopup = ({userEnrolled,subs})=>{
  const [open,setopen] = useState(false)
  const [expdays,setexpdays] = useState(false)


  useEffect(()=>{
    let expiry = cookie.get("course_expiry")
    if(userEnrolled && userEnrolled.length > 0 && !expiry){
      let expired_products = []
      userEnrolled.forEach((itm)=>{
        let enroll_detail = itm.enrollment_details
       for(const key in enroll_detail)
       {
          if(key !== "FT" && enroll_detail[key] && itm.course_id != 2578)
          {
            let endDate = new Date(enroll_detail[key].end_date);
            // endDate.setHours(0,0,0,0);
            let a = moment(endDate)
            let b = moment(new Date())
            let remaining =  a.diff(b,'days',true)
            if(remaining <= 6 && remaining >= -6){
              if(remaining <= 0)
              {
                setexpdays(true)
              }
              if(!expired_products.includes(key)){
                expired_products.push(key)
              }
            }
          }
        }
      })
      //if no susbscription expired_product lenght > 0 show popup
      // if standard subscription  - if expired_products include lab and sandbox show poup
      // if premium subscription - if expired_products include sandbox show popup
      // if premiumpuls subscription = no popup
      //sort the maximum plan
      //calling a below function
      let plantypes = {
        standard:false,
        premium:false,
        premium_plus:false
      }
      if(subs && subs.length  > 0){
        for(var i = 0 ; i<subs.length ; i++)
        {
          let plan = subs[i].plan;
          if(plan.is_active){

            if(plan.is_unlimited_access_lab == true && plan.is_sandbox_access == true)
            {
              plantypes.premium_plus = true
            }
            if(plan.is_unlimited_access_lab == true && plan.is_sandbox_access == false)
            {
              plantypes.premium = true
            }
            if(plan.is_unlimited_access_lab == false && plan.is_sandbox_access == false)
            {
              plantypes.standard = true
            }
          }
        }
         plantypes.premium_plus ? "" : (plantypes.premium?(expired_products.includes("SANDBOX")?setopen(true):""):(
          plantypes.standard?( expired_products.includes("LAB") || expired_products.includes("SANDBOX") ?setopen(true):""):""
        ))
        let active_plans = subs.filter((itm)=> itm.plan.is_active == true)
        if(active_plans.lenght == 0)
        {
          if(expired_products.length > 0)
          {
            setopen(true)
          }
        }
      }
      if(subs && subs.length == 0)
      {
        if(expired_products.length > 0)
        {
          setopen(true)
        }
      }
    }
    },[userEnrolled,subs])

  const closepoup = ()=>{
    if(open)
    {
      setopen(false)
      cookie.set("course_expiry",true,{expires : 7 })
    }
  }
  return (
    <>
      {open && (
        <>
          <div
            className="courseexpiry_popup_full"
            onClick={(e) => {
              e.preventDefault();
              closepoup();
            }}
          >
              <div className="coursepopup" onClick={(e)=>{
              e.stopPropagation();
            }}>
              <div className="content">
                <div className="close-icon"
                  onClick={(e) => {
                    e.preventDefault();
                    closepoup();
              }}><CloseIcon/></div>
                <div className="section">
                  <div className="left-section">
                    <img width="200" height="30" className="img-full imgpopup" src="/images/logo.svg" alt="Whizlabs Logo"/>
                    <p className="para">
                      Explore our <a href="/pricing"  onClick={(e)=>{closepoup()}}>Premium Subscription Plans</a> and enjoy unlimited access to Practice Tests, Videos, Labs, Sandbox, and a host of other exclusive features.
                    </p>
                  </div>
                  <div className="right-section">
                      <p className="title">One or more product(s) you have purchased {expdays?<>got expired</>:<>is going to expire</>} . Please visit <a href="/my-account/?ref=true" onClick={(e)=>{closepoup()}}>My Account</a> page to know more.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export const EmailPopup = ({user_id,email,redirect,alert,Mailsentaction})=>{
  let [open,setOpen] = useState(false)
  let [disabled,setDisabled] = useState(false)
  const Process = async()=>{
    let res = await axios.get(`${baseUrl}/users/email_check/?user_id=${user_id}`)
    if(res.data.userData && !res.data.userData.is_email_verified){
      document.querySelector('body').classList.add('avoid-overflow')
      setOpen(true)
      cookie.set('email_pop','true',{expires:0.04})
    }
  }
  useEffect(()=>{
    if(!cookie.get('email_pop')){
      Process()
    }
    return ()=>{
      document.querySelector('body').classList.remove('avoid-overflow')
    }
  },[])
  return <>
      { <>
          <div className={`email-outer-modal ${open?"email-active":""}`} onClick={(e)=>{
            setOpen(false)
          }}>
          <div className={`email-inner-modal ${open?"email-inner-animation":""}`} onClick={(e)=>{
            e.stopPropagation()
          }}>
            <div className="top" style={{float:"right"}} onClick={(e)=>{
              setOpen(false)
              document.querySelector('body').classList.remove('avoid-overflow')
            }}>
              <CloseIcon/>
            </div>
            <div className="content"> 
              <div className="text-bold">
                Verify your email
              </div>
             
              <button className="verifybtn" onClick={async(e)=>{
                                            setDisabled(true)
                                            Mailsentaction()
                                             await axios
                                             .post(
                                               `${baseUrl}/auth/mail/send_verify_mail`,{
                                                email:email,
                                                ref:redirect
                                               }
                                             )
                                             .then((resp) => {
                                               if (resp.data.status == 1) {
                                                alert({
                                                  type: "SUCCESS",
                                                  title: "Success",
                                                  msg: "Verification Mail has been sent",
                                                }); 
                                                setOpen(false)
                                                document.querySelector('body').classList.remove('avoid-overflow')
                                               }
                                             });
              }}
              disabled={disabled}
              >
                Send verification email!
              </button>
            </div>
          </div>
      </div>
        </>
      }
  </>
}

export const WhizcardModal = ({courseId, whizCardLink}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(null);
  const [errNew, setErrNew] = useState(null);
  const dispatch = useDispatch();

  // console.log("firstName", firstName);
  // console.log("lastName", lastName);
  // console.log("designation", designation);  
  // console.log("email", email);  
  // console.log("courseId", courseId);  
  // console.log("whizCardLink", whizCardLink);  

  const closeModalPopup = () => document.body.classList.remove("open-modal-download-whizcard");
  const handleWhizcardDownload = async () => {
    if (!email || email === "" || email === null || !/\S+@\S+\.\S+/.test(email)) {
      setErr("Invalid email address");
      return;
    } else if(!firstName || firstName == "" || firstName === null || !/[a-zA-Z]/.test(firstName) ||
              !lastName || lastName == "" ||lastName === null || !/[a-zA-Z]/.test(lastName) ||
              !designation || designation == "" || designation === null || !/[a-zA-Z]/.test(designation) 
              ){
        setErrNew("Please enter all valid fields");
        return;
    } else {
      try {
          await axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_BASE_URL + "/users/dwonload-whizcard",
            data: {
              course_id: courseId,
              email: email,
              type: "website",
            },
          });
          window.open(process.env.NEXT_PUBLIC_WEB_MEDIA_URL + whizCardLink);
          dispatch(
              whizCardLoader({
                data: {
                  check: true,
                  email: email,
                },
              })
            );
      } catch (err) {
        console.error(err);
      }
    }

    closeModalPopup();

    // const toMail = email.trim().toLowerCase();
    // if(enrolled.includes("PT") && enrolled.includes("OC")){
    //   axios({
    //     method: "post",
    //     url: baseUrl + "/users/dwonload-whizcard",
    //     data: {
    //       course_id: courseId,
    //       email: toMail,
    //       type: "website",
    //     },
    //   });
    // }
  };

  return (
    <div className="modal modal-download-whizcard">
      <div className="modal-inner">
        <div className="modal-container">
          <div className="modal-header">
            <div className="title-block">
              <div className="title">Help us serve you better by providing these details</div>
              <span className="title-note">And download this WhizCard</span>
            </div>
            <div
              className="icon-close icon-font-cross"
              onClick={(e) => {
                e.preventDefault();
                closeModalPopup();
              }}
            ></div>
          </div>
          <div className="modal-content">
            <div className="box-borderd">
              <div className="input-box">
                <label className={styles.label_size}>
                  First Name<small>*</small>
                </label>
                <input
                  className={`bg-ghostwhite ${styles.bg_ghostwhite}`}
                  type="text"
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={(e) => {
                    e.preventDefault();
                    setErr(null);
                    setErrNew(null);
                    setFirstName(e.target.value);
                  }}
                  required
                />
                <label className={styles.label_size}>
                  Last Name<small>*</small>
                </label>
                <input
                  className={`bg-ghostwhite ${styles.bg_ghostwhite}`}
                  type="text"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => {
                    e.preventDefault();
                    setErr(null);
                    setErrNew(null);
                    setLastName(e.target.value);
                  }}
                  required
                />
                <label className={styles.label_size}>
                  Current Designation <small>*</small>
                </label>
                <input
                  className={`bg-ghostwhite ${styles.bg_ghostwhite}`}
                  type="text"
                  placeholder="Enter Current Designation"
                  value={designation}
                  onChange={(e) => {
                    e.preventDefault();
                    setErr(null);
                    setErrNew(null);
                    setDesignation(e.target.value);
                  }}
                  required
                />
                <label className={styles.label_size}>
                  Work Email Address<small>*</small>
                </label>
                <input
                  className={`bg-ghostwhite ${styles.bg_ghostwhite}`}
                  type="text"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => {
                    e.preventDefault();
                    setErr(null);
                    setErrNew(null);
                    setEmail(e.target.value);
                  }}
                  style={{
                    border: err ? "1px solid red" : "none",
                  }}
                />
                {err && <small style={{ fontSize: "90%", color: "#ef6537" }}>{err}</small>}
                {errNew && <small style={{ fontSize: "90%", color: "#ef6537" }}>{errNew}</small>}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-orange submit"
              onClick={(e) => {
                e.preventDefault();
                handleWhizcardDownload();
              }}
            >
              Download
            </button>
            <button
              className="btn btn-ghostwhite cancel"
              onClick={(e) => {
                e.preventDefault();
                closeModalPopup();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};