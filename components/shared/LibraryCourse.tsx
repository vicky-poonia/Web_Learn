import Fade from "react-reveal";
import { StarRating } from "@/components/import";
import { StoreWhishlist } from "redux/whislist/whislist-actions";
import { alertBox } from "redux/AlertBox/alert-actions";
import { connect } from "react-redux";
import { removeFromCart } from "redux/AddToCart/cart-actions";
import { CircularProgress } from "@material-ui/core";

const LibraryCourses = ({
  course,
  checkWhislistStatus,
  handleWhislist,
  userData,
  idx,
  openPreviewModal,
  gettime,
  stateCart,
  handleCartForChild,
  currentLoading,
  subscribeUser,
  courseEnrolled
}) => {
  return (
    <>
      <Fade bottom key={idx.toString()}>
        <div className="list-item">
          <div className="couser-img">
            {userData && userData.data && userData.data.user_id && (
              <div
                className={`icon-whishlist ${checkWhislistStatus(course.id)}`}
                onClick={(e) => handleWhislist(e, course.id, userData.data.user_id)}
              >
                <img className="img-full whishlist" src="/images/heart.svg" alt="" />
                <img className="img-full whishlist-fill" src="/images/heart-border.svg" alt="" />
              </div>
            )}

            <img
              className="img-full"
              src={
                process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                course.seo_details?.featured_image?.replace("media/", "")
              }
              alt={course.seo_details?.title}
              title={course.seo_details?.title}
            />

            <div className="course-preview" onClick={() => openPreviewModal(course)}>
              <figure>
                {(() => {
                  let videosData = course.products?.find((prod) => prod.product_type === "OC");
                  if (
                    videosData &&
                    videosData.other_details &&
                    videosData.other_details.video_link
                  ) {
                    return <img className="img-full" src="/images/play-button.svg" alt="" />;
                  } else {
                    return <img className="img-full" src="/images/info-btn.svg" alt="" />;
                  }
                })()}
              </figure>
              <span>Preview Course</span>
            </div>
          </div>
          <div className="item-content">
            <div className="course-details">
              <a href={"/" + course.seo_details?.slug} target="_blank">
                <h3 className="title">
                  <a target="_blank">{course.seo_details?.title}</a>
                </h3>
              </a>
              {course.is_expired ? (
                <>
                  <span className="expired-lable">
                    Expired on {gettime(course.course_expired_date)}
                  </span>
                </>
              ) : (
                <></>
              )}
              <div
                className="description"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "0px",
                }}
              >
                <p>
                  {course?.short_info ? (
                    course?.short_info
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          course?.seo_details?.short_description
                            ?.replace(/<[^>]*>?/gm, "")
                            .substring(0, 200) + "...",
                      }}
                    ></div>
                  )}
                </p>
              </div>

              <div className="course-highlights">
                {/* Learners */}
                {+course.web_counts?.learners_count > 0 && (
                  <div>
                    <i className="icon icon-font-graduation-cap" style={{ fontSize: "20px" }}></i>
                    <span>{course.web_counts?.learners_count} Learners</span>
                  </div>
                )}

                {/* Free Test */}
                {+course.web_counts?.ft_count > 0 && (
                  <div>
                    <i className="icon-font-thumb"></i>
                    <span>{course.web_counts?.pt_count} Practice Tests</span>
                  </div>
                )}
                {/* No.of Questions */}
                {+course.web_counts?.ques_count > 0 && (
                  <div>
                    <i className="icon-font-note2"></i>
                    <span>{course.web_counts?.ques_count} Questions</span>
                  </div>
                )}
                {/* No.of Videos */}
                {+course.web_counts?.vid_count > 0 && (
                  <div>
                    <i className="icon-font-play"></i>
                    <span>{course.web_counts?.vid_count} Videos</span>
                  </div>
                )}
                {/* No.of Labs */}
                {+course.web_counts?.lab_count > 0 && (
                  <div>
                    <i className="icon-font-bicker"></i>
                    <span>{course.web_counts?.lab_count} labs</span>
                  </div>
                )}
                {/* No.of Flashcards */}
                {+course.web_counts?.flashcard_count > 0 && (
                  <div>
                    <i className="icon-font-flash-card"></i>
                    <span>{course.web_counts?.flashcard_count} Cards</span>
                  </div>
                )}
              </div>
            </div>
            <div className="price-review-block-updated">
              {/* <div className="price-block">
                                      {(() => {
                                        const oldPrice = calculateOldPrice(course);
                                        const fixedPrice = calculateFixedPrice(course);
  
                                        if (fixedPrice === "₹0") {
                                          return <span className="price test">{oldPrice}</span>;
                                        } else {
                                          return (
                                            <>
                                              <del className="old-price test">{oldPrice}</del>
                                              <span className="price test">{fixedPrice}</span>
                                            </>
                                          );
                                        }
                                      })()}
                                    </div> */}

              {/* {course.ratings && course.ratings.rating > 0 ? ( */}
              <div
                className="rating-block"
                style={{
                  marginRight: stateCart.map((item) => item.courseId).includes(course.id)
                    ? "10px"
                    : "25px",
                }}
              >
                <StarRating
                  isSamp={true}
                  avgRating={course.ratings?.overall_rating}
                  totalRating={course.ratings?.rating}
                />
              </div>
              {/* ) : (
                ""
              )} */}
              {/* {
                                          !sub_nt_exp && !userbought.includes(course.id) && (<>
                                            <button
                                            // style={{ padding: "0px" }}
                                            className="btn btn-add-cart"
                                            onClick={(e)=>handleCart(e,course)}
                                            style={findcartcourse(course.id) != -1 ? {background:"green",padding:"0px",alignItems:"center"}:{}}
                                          >
                                              {(selectedCourse.includes(course.id) && findcartcourse(course.id) ==-1) && <>
                                                <Oval
                                                  height={25}
                                                  width={25}
                                                  color="white"
                                                  wrapperStyle={{display:"block"}}
                                                  wrapperClass=""
                                                  visible={true}
                                                  ariaLabel='oval-loading'
                                                  secondaryColor="#f98600"
                                                  strokeWidth={10}
                                                  strokeWidthSecondary={10}
                                                  
                                                />
                                              </>}
                                              {
                                                findcartcourse(course.id) ==-1?<>Add to cart</>:<>Added to cart</>
                                              }
                                          </button>
                                          </>)
                                        } */}
              <button
                className={"btn btn-add-cart"}
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  minWidth: "85px",
                  backgroundColor:subscribeUser == true? "#F06421":
                  courseEnrolled.includes(course.id)?"#0C66E4":
                  stateCart
                    .map((item) => item.courseId)
                    .includes(course.id)
                    ? "#f0642173"
                    : "#F06421",
                fontWeight:subscribeUser || courseEnrolled.includes(course.id)?"500":"",
                  // width: stateCart.map((item) => item.courseId).includes(course.id) ? "42%" : "35%",
                }}
                onClick={(e) => handleCartForChild(course)}
              >
                {
                  subscribeUser || courseEnrolled.includes(course.id) ? <>Access Now</>
                  :<>
                                    {currentLoading.courseId == course.id ? (
                  <CircularProgress
                    style={{
                      color: "green",
                      width: "20px",
                      height: "20px",
                      padding: "5px",
                    }}
                  />
                ) : stateCart.map((item) => item.courseId).includes(course.id) ? (
                  "Added to Cart"
                ) : (
                  "Add to Cart"
                )}
                  </>
                }
                {/* Add to Cart */}
              </button>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    whislist: state.whislist.whislist,
    stateCart: state.cart.cart,
    updateaftersignin: state.cart.updateaftersignin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addWhislist: (course_id, user_id, currency) =>
      dispatch(StoreWhishlist(course_id, user_id, currency)),
    alertBoxAction: (data) => dispatch(alertBox(data)),
    removeFromCartStore: (id, type, currency) => dispatch(removeFromCart(id, type, currency)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LibraryCourses);
