
import Link from "next/link";
import { useEffect, useState } from "react";
import { Accordions, CallToAction, StarRating, Pagination } from "@/components/import";
import { connect } from "react-redux";
import axios from "axios";
import router, { useRouter } from "next/router";
import {clientLoader,clientClear} from '../redux/ClientOffer/client-action'
import {removeFromCart} from 'redux/AddToCart/cart-actions'
import { updateRedirection } from "redux/Redirection/redirect-actions";
import cookie from 'js-cookie'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const GoogleIndia = ({ counts,Courses,userData,ClientLoader,enrolled,removeFromCartAction,redirectionAction,clientClear}) => {
  const [CourseType, setCourseType] = useState("all");
  const [courses,setCourses] = useState(Courses)

  let course_id = []
  if(enrolled){
    enrolled.forEach((itm)=>{
      course_id.push(itm.course_id)
    })
  }

  const router = useRouter();
  useEffect(()=>{
    if(CourseType != 'all'){
        let newCoures = []
         Courses.forEach((itm)=>{
            itm.products.forEach((x)=>{
                if(x.product_type == CourseType.toUpperCase()){
                    newCoures.push(itm)
                }
            })
        })
        setCourses(newCoures)
    }
    else{
        setCourses(Courses)
    }
  },[CourseType])

  const handleCourseType = (e, val) => {
    setCourseType(val)
  };


  const handleClick = (e)=>{
    if(!cookie.get('client')){
      ClientLoader()
      let time = 30 * 60 * 1000
      setTimeout(()=>{
        clientClear()
      },time)
    }
  }
  return (
    <>
      <div
        className="category-banner01"
        style={{
          background: "#3D4050 url(/images/new.png) no-repeat right",
        }}
      >
        <div className="container">
          <div className="left-part">
            <ul className="breadcrumbs">
              <li>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a>Google Cloud Certification</a>
                </Link>
              </li>
            </ul>
            <h1>Google Cloud Certification</h1>
            <div style={{ color: "white" }}>
              <p>
                Get certified with one of the Google Cloud Certifications, and demonstrate your
                expertise on Google Cloud Platform (GCP).
              </p>
            </div>
          </div>
          <div className="right-part">
            <img className="img-full" src="/images/become-an-expert.png" alt="" />
          </div>
        </div>
        <div className="overlay"></div>
      </div>
      <div id="content-area" className="bg-color category-page" style={{paddingBottom:"30px"}}>
        <div className="tab-courselisting">
          <div className="container">
            <div className="tab_wrapper">
              {/* <ul className="tab_list" style={{ position: "relative" }}>
                <li
                  onClick={(e) => handleCourseType(e, "all")}
                  className={CourseType == "all" ? "resp-tab-active" : ""}
                >
                  All
                </li>
                {counts.ft_count > 0 && (
                  <li
                    onClick={(e) => handleCourseType(e, "ft")}
                    className={CourseType == "ft" ? "resp-tab-active" : ""}
                  >
                    Free Test
                  </li>
                )}
                {counts.pt_count > 0 && (
                  <li
                    onClick={(e) => handleCourseType(e, "pt")}
                    className={CourseType == "pt" ? "resp-tab-active" : ""}
                  >
                    Practice Test
                  </li>
                )}
                {counts.video_count > 0 && (
                  <li
                    onClick={(e) => handleCourseType(e, "oc")}
                    className={CourseType == "oc" ? "resp-tab-active" : ""}
                  >
                    Video
                  </li>
                )}
              </ul> */}
              <div className="tab_content" style={{ display: "block" }}>
                <div
                  className={"course-listing"}
                  style={{ position: "relative", minHeight: "250px" }}
                  id="paginationAnchor"
                >
                  {/* SETTING MIN HEIGHT TO 600px TO MATCH LOADING IMG */}
                  {courses?.length > 0 ? (
                    <div className="list-group">
                      {courses.map((data) => (
                        <div className="list-item" key={data.id}>
                          <div className="couser-img" key={data.id}>
                          <Link href={"/" + data.seo_details?.slug}>
                          <img onClick={(e)=>{
                            handleClick(e)
                          }}
                              className="img-full"
                              src={
                                process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                                data?.seo_details?.featured_image?.replace("media/", "")
                              }
                              alt={data.name}
                              title={data.name}
                            />
                              </Link>
                          </div>
                          <div className="item-content">
                            <div className="course-details">
                              <Link href={"/" + data.seo_details?.slug}>
                                <h3 className="title" onClick={(e)=>{
                                     handleClick(e)
                                }}>
                                  <a>{data.seo_details?.title}</a>
                                </h3>
                              </Link>
                              {/* <div className="learners">
                                       { /* {course.other_attributes?.course_level &&
                                          course.other_attributes.course_level.toLowerCase() !==
                                            "select level" && (
                                            <div className="level-text">
                                              <span>
                                              <b> Level:</b>{" "}
                                                {convertToTitleCase(
                                                  course.other_attributes?.course_level
                                                )}
                                              </span>
                                            </div>
                                                )} 

                                        {data.web_counts?.learners_count > 0 && (
                                          <div className="learners">
                                            <i className="icon icon-font-graduation-cap"></i>
                                            <span>
                                              <b>{data.web_counts?.learners_count}</b> Learners
                                            </span>
                                          </div>
                                        )}
                                      </div> */}

                              <div className="description">
                                <p>
                                  {data?.short_info ? (
                                    data?.short_info
                                  ) : (
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          data?.seo_details?.short_description
                                            ?.replace(/<[^>]*>?/gm, "")
                                            .substring(0, 200) + "...",
                                      }}
                                    ></div>
                                  )}
                                </p>
                              </div>

                              <div className="course-highlights">
                                {/* Learners */}
                                {data.web_counts?.learners_count > 0 && (
                                  <div>
                                    <i
                                      className="icon icon-font-graduation-cap"
                                      style={{ fontSize: "20px" }}
                                    ></i>
                                    <span>{data.web_counts?.learners_count} Learners</span>
                                  </div>
                                )}
                                {/* Free Test */}
                                {+data.web_counts?.ft_count > 0 && (
                                  <div>
                                    <i className="icon-font-thumb"></i>
                                    <span>{data.web_counts?.pt_count} Practice Tests</span>
                                  </div>
                                )}
                                {/* No.of Questions */}
                                {+data.web_counts?.ques_count > 0 && (
                                  <div>
                                    <i className="icon-font-note2"></i>
                                    <span>{data.web_counts?.ques_count} Questions</span>
                                  </div>
                                )}
                                {/* No.of Videos */}
                                {+data.web_counts?.vid_count > 0 && (
                                  <div>
                                    <i className="icon-font-play"></i>
                                    <span>{data.web_counts?.vid_count} Videos</span>
                                  </div>
                                )}
                                {/* No.of Labs */}
                                {+data.web_counts?.lab_count > 0 && (
                                  <div>
                                    <i className="icon-font-bicker"></i>
                                    <span>{data.web_counts?.lab_count} labs</span>
                                  </div>
                                )}
                                {/* No.of Flashcards */}
                                {+data.web_counts?.flashcard_count > 0 && (
                                  <div>
                                    <i className="icon-font-flash-card"></i>
                                    <span>{data.web_counts?.flashcard_count} Cards</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="price-review-block">
                              {data.ratings && data.ratings.rating > 0 ? (
                                <div className="rating-block">
                                  <StarRating
                                    isSamp={true}
                                    avgRating={data.ratings?.overall_rating}
                                    totalRating={data.ratings?.rating}
                                  />
                                </div>
                              ) : (
                                ""
                              )}

                             
                                <button style={{ padding: "0px" }} className="btn btn-add-cart" onClick={(e)=>{
                                    e.preventDefault()
                                    if(course_id.includes(data.id)){
                                      //redirect to lms
                                      window.open(
                                        `${process.env.NEXT_PUBLIC_LMS_URL}/course/${data.seo_details?.slug}/${data.id}`
                                      );
                                    }
                                    else{
                                      handleClick(e)
                                      let selectedCourseType = []
                                      data.products.forEach((itm)=>{
                                        if(itm.product_type !== "FT" && itm.product_type != "LAB" && itm.product_type !="SANDBOX"){
                                          let temp = itm.product_type.toLowerCase()
                                          selectedCourseType.push(temp)
                                        }
                                      })
                                      selectedCourseType.forEach((prod) => removeFromCartAction(data.id, prod));
    
                                      const redirectSlug = `/${data.slug}/checkout?prod=${selectedCourseType.join(":")}`;
                                      // console.log(redirectSlug)
                                      if (!userData || !userData.data || !userData.data.user_id) {
                                        redirectionAction("REDIRECT", redirectSlug); // after sign in redirect to direct checkout Page
                                        document.querySelector("body").classList.add("open-modal-login");
                                      }else{
                                        router.push(redirectSlug);
                                      }
                                }}}>
                                 {course_id.includes(data.id) ? <>Access Now</>:<>Buy Now</>}
                                </button>
                             
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
let Courses = []
  let counts = {
    ft_count: 0,
    pt_count: 0,
    video_count: 0,
    lab_count: 0,
    sandbox_count: 0,
  };
  let gcp = true
  await axios.get(`${baseUrl}/courses/gcp`).then((resp)=>{
    if(resp.data.data){
        Courses = resp.data.data
    }
  })
  if(Courses.length > 0){
  
    Courses.forEach((itm)=>{
        itm.products.forEach((x)=>{
            if(x.product_type == "PT"){
                counts.pt_count += 1
            }
            if(x.product_type == "OC"){
                counts.video_count += 1
            }
            if(x.product_type == "LAB"){
                counts.lab_count += 1
            }
            if(x.product_type == "FT"){
                counts.ft_count += 1
            }
            if(x.product_type == "SANDBOX"){
                counts.sandbox_count += 1
            }
        })

    })
  }
  return {
    props: {
      counts,
      Courses
    },
  };
}
const mapStateToProps = (state) => {
    return {
      userData: state.authData.userData,
      enrolled: state.enrolled.enrolled
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        ClientLoader :()=> dispatch(clientLoader()),
        clientClear:()=> dispatch(clientClear()),
        removeFromCartAction: (id, type) => dispatch(removeFromCart(id, type)),
        redirectionAction: (data, url) => dispatch(updateRedirection(data, url)),
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(GoogleIndia);
