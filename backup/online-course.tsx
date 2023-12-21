import { CallToAction, StarRating } from "@/components/import";
import FourOhFour from "pages/404";
import axios from "axios";
import Link from "next/link";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { addToCart } from "redux/AddToCart/cart-actions";
import Head from "next/head";

const OnlineCourse = ({
  userData,
  page,
  pageData,
  pageOcData,
  addToCart,
  cartData,
  currencyData,
  courseEnrollmentDatas,
}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedCourseType, setSelectedCourseType] = useState([]);
  const [currency, setCurrency] = useState(null);

  useEffect(() => {
    if (currencyData) setCurrency(currencyData);
  }, [currencyData]);

  const handleToggle = (course_id, type) => {
    const newChecked = [...selectedCourseType];
    newChecked.push(type);
    setSelectedCourseType(newChecked);
    addToCart(course_id, newChecked); // course_id , ['pt','oc']
  };

  useEffect(() => {
    if (userData && userData.data && userData.data.token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [userData]);

  useEffect(() => {
    const cartCourse = cartData.find((item) =>
      item.courseId === (pageData && pageData.id) ? pageData.id : 0
    );

    if (cartCourse) {
      let checked = [];
      cartCourse.selectedCourseType.forEach((e) => {
        if (e === "pt") {
          checked.push("pt");
        }
        if (e === "oc") {
          checked.push("oc");
        }
        if (e === "labs") {
          checked.push("labs");
        }
      });
      setSelectedCourseType(checked);
    } else {
      setSelectedCourseType([]);
    }
  }, [cartData, pageData]);

  return (
    <>
      {currency && page && pageData && pageOcData ? (
        <>
          <Head>
            <title>{pageOcData.seo_title}</title>

            <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />

            <meta name="title" content={pageOcData.seo_title} />
            <meta name="description" content={pageOcData.seo_description} />
            <meta name="keywords" content={pageOcData.seo_keyword} />
          </Head>
          {/* <!-- banner-part --> */}
          <div
            className="freetest-banner"
            style={{
              background: "url('/images/banner-free-test.jpg') no-repeat center",
            }}
          >
            <div className="container">
              <div className="left">
                <h1>{pageData.name}</h1>
                <div dangerouslySetInnerHTML={{ __html: pageData.description }}></div>
                <div className="product-ranting-block">
                  <StarRating
                    isSamp={true}
                    avgRating={pageData.ratings?.overall_rating}
                    totalRating={pageData.ratings?.rating}
                  />
                  <div className="product-learner icon icon-font-graduation-cap">
                    {pageData.web_counts.learners_count} Learners
                  </div>
                  <div className="product-discssion icon icon-font-chat-3">Discussions</div>
                </div>
              </div>
            </div>
            <div className="overlay"></div>
          </div>

          {/* <!-- content area part -->  */}
          <div id="content-area" className="freetest-page">
            <div className="two-columns">
              <div className="container">
                <div className="left-column">
                  <div className="visit-block">
                    <p>This page is old design, Please visit the new interface design</p>
                    <Link href={"/" + pageData.seo_details.slug + "/"}>
                      <a className="btn btn-visit">visit now</a>
                    </Link>
                  </div>

                  <div
                    className="content-section"
                    dangerouslySetInnerHTML={{
                      __html: pageOcData.other_details.description,
                    }}
                  ></div>
                  {pageData.products.length > 1 ? (
                    <>
                      <div className="all-test-block">
                        <h3>Other {pageData.name} Training Options</h3>
                        <div className="test-group">
                          {pageData.products.map((item, i) => (
                            <React.Fragment key={i}>
                              {item.product_type === "FT" ? (
                                <div className="test-block">
                                  <div className="title">Free Tests</div>
                                  <div className="test-details">
                                    <div className="img-block img1">
                                      <div className="overlay"></div>
                                      <i className="icon icon-font-note-3"></i>
                                    </div>
                                    <div className="description">
                                      <div
                                        className="details-block"
                                        dangerouslySetInnerHTML={{
                                          __html: item.page_attr,
                                        }}
                                      ></div>
                                      <div className="price-block">
                                        <span className="price">Free</span>
                                      </div>
                                      <div className="btn-group">
                                        {/* {loggedIn ? (
                                          <>
                                            <button className="btn btn-addcart">Access Now</button>
                                          </>
                                        ) : (
                                          <>
                                            <button className="btn btn-addcart" disabled>
                                              Access Now
                                            </button>
                                          </>
                                        )} */}
                                        <Link href={"/" + pageData.seo_details.slug + "/"}>
                                          <a className="btn btn-knowmore">Know More</a>
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : item.product_type === "PT" ? (
                                <div className="test-block">
                                  <div className="title">Practice Tests</div>
                                  <div className="test-details">
                                    <div className="img-block img2">
                                      <div className="overlay"></div>
                                      <i className="icon icon-font-pagination-arrow-1"></i>
                                    </div>
                                    <div className="description">
                                      <div
                                        className="details-block"
                                        dangerouslySetInnerHTML={{
                                          __html: item.page_attr,
                                        }}
                                      ></div>
                                      <div className="price-block">
                                        <span className="price">
                                          {currency.symbol}
                                          {item.sale_price[currency.type]}
                                        </span>
                                        <del className="old-price">
                                          {currency.symbol}
                                          {item.regular_price[currency.type]}
                                        </del>
                                      </div>
                                      <div className="btn-group">
                                        {/* {selectedCourseType.includes("pt") ? (
                                          <button
                                            className="btn btn-addcart"
                                            style={{
                                              background: "#259b1d",
                                            }}
                                            disabled
                                          >
                                            Added
                                          </button>
                                        ) : (
                                          <button
                                            className="btn btn-addcart"
                                            onClick={() => handleToggle(pageData.id, "pt")}
                                          >
                                            Add to Cart
                                          </button>
                                        )} */}
                                        <Link href={"/" + pageData.seo_details.slug + "/"}>
                                          <a className="btn btn-knowmore">Know More</a>
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="right-column">
                  <div className="price-bar">
                    <div className="top">
                      <div className="img-block">
                        <div className="overlay"></div>
                        <i className="icon icon-font-play-btn-2"></i>
                      </div>
                      <div className="title">Online Course</div>
                      <div className="price-block">
                        <span className="price">
                          {currency.symbol}
                          {pageOcData.sale_price[currency.type]}
                        </span>
                        <del className="old-price">
                          {currency.symbol}
                          {pageOcData.regular_price[currency.type]}
                        </del>
                        <p>Limited Period Offer</p>
                      </div>
                      <div className="all-benifits">
                        {/* <div
                          dangerouslySetInnerHTML={{
                            __html: pageOcData.other_details.detail_page,
                          }}
                        ></div> */}
                        <ul>
                          <li>
                            <a
                              href="https://www.whizlabs.com/refund-policy/"
                              target="_blank"
                              rel="follow noopener"
                              data-wpel-link="internal"
                            >
                              100% Unconditional Money Back Guarantee
                            </a>
                          </li>
                          <li>100% Syllabus covered: All Exam Objectives</li>
                          <li>Accessed on PC, Mac, iPhone®, iPad®, Android™ Device</li>
                        </ul>
                        <div className="btn-block">
                          {/* {selectedCourseType.includes("oc") ? (
                            <button
                              className="btn btn-white"
                              style={{
                                background: "#259b1d",
                                color: "#ffff",
                              }}
                              disabled
                            >
                              Added
                            </button>
                          ) : (
                            <button
                              className="btn btn-white"
                              onClick={() => handleToggle(pageData.id, "oc")}
                            >
                              Add to Cart
                            </button>
                          )} */}
                          <Link href={"/" + pageData.seo_details.slug + "/"}>
                            <button className="btn btn-white">Know more</button>
                          </Link>
                        </div>
                        <div className="share-block">
                          <span>Share this course</span>
                          <a className="link-share icon icon-font-share" href="#">
                            Share
                          </a>
                        </div>
                      </div>
                    </div>
                    <Link href={"/contact-us/"}>
                      <a className="help-link">Need a help?</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <CallToAction />
          </div>
        </>
      ) : (
        <>
          <FourOhFour />
        </>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie;
  const decoded = decodeURIComponent(cookie);
  const split1 = decoded.split("userData=")[1];
  let userId = null;
  let userToken = null;
  if (split1) {
    const split2 = split1.split(";")[0];
    const parsed = split2 ? JSON.parse(split2) : null;
    userId = parsed ? parsed.data.user_id : null;
    userToken = parsed ? parsed.data.token : null;
  }

  const slug = context.params.slug;
  let page = false;
  let pageData = "";
  let pageOcData = null;
  let courseEnrollmentDatas = [];

  const response = await axios.get(baseUrl + "/courses", {
    params: {
      slug: slug,
    },
  });

  const courseData = response.data.data || null;
  if (courseData && courseData.id && courseData.products.length > 0) {
    courseData.products.map((item) => {
      if (item.product_type === "OC") {
        page = true;
        pageData = courseData;
        pageOcData = item;
      }
    });

    // if (courseData.id && userToken) {
    //   const courseEnrolledResponse = await axios.post(
    //     baseUrl + "/users/user-course-enroll-status",
    //     {
    //       course_id: courseData.id,
    //     },
    //     { headers: { Authorization: userToken } }
    //   );
    //   if (
    //     courseEnrolledResponse &&
    //     courseEnrolledResponse.data &&
    //     courseEnrolledResponse.data.data &&
    //     courseEnrolledResponse.data.data.products
    //   ) {
    //     courseEnrollmentDatas = courseEnrolledResponse.data.data.products;
    //   }
    // }
  }

  return {
    props: {
      page,
      pageData,
      pageOcData,
      courseEnrollmentDatas,
    },
  };
}

const mapStateToProps = (state) => {
  return {
    cartData: state.cart.cart,
    userData: state.authData.userData,
    currencyData: state.ipDetails.currency_detail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id, type) => dispatch(addToCart(id, type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OnlineCourse);
