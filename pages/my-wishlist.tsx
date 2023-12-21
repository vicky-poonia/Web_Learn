import { StarRating } from "@/components/import";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { alertBox } from "redux/AlertBox/alert-actions";
import { StoreWhishlist } from "redux/whislist/whislist-actions";
import {SANDBOX_PRD} from "../lib/Library_lib"
import InboxIcon from '@material-ui/icons/Inbox';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const MyWishList = ({
  wishListCourseList,
  userData,
  whislist,
  addWhislist,
  currencyData,
  promoData,
  seoHomePageData,
}) => {
  const [currency, setCurrency] = useState(null);
  const [whislistCourses, setWhislistCourses] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [showOffer, setShowOffer] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (currencyData) setCurrency(currencyData);
  }, [currencyData]);

  useEffect(() => {
    if (!userData || !userData.data.user_id) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (currency && wishListCourseList.length > 0 && whislist.length > 0) {
      let list = [];
      wishListCourseList.map((item) => {
        if (whislist.includes(item.id)) {
          promoData.data.forEach((promo) => {
            if (promo.course_slug === item.seo_details.slug) {
              item.crazyDealData = promo;
            }
          });
          list.push(item);
        }
      });

      setWhislistCourses(list);
    } else {
      setWhislistCourses([]);
    }
  }, [currency, whislist, wishListCourseList]);

  const calculateOldPrice = (data, promo = false) => {
    let returnTotal: any = 0;
    if (data && data.products && data.products?.length > 0) {
      if(!SANDBOX_PRD.includes(data.id)){
        data.products.map((item) => {
          if (item.product_type !== "FT" && item.product_type !== "ILT" && item.product_type != "SANDBOX") {
            if (item.regular_price && item.regular_price[currency.type]) {
              returnTotal = Number(returnTotal) + Number(item.regular_price[currency.type]);
            }
          }
          if(item.product_type == "SANDBOX"){
            let validity = Object.keys(item.regular_price)
            if (item.regular_price[validity[0]] && item.regular_price[validity[0]][currency.type]) {
              returnTotal = Number(returnTotal) + Number(item.regular_price[validity[0]][currency.type]);
            }
          }
        });
      }else{
        let sandbox_prd = data.products
        let prd_6 = sandbox_prd.find((itm)=> itm.product_type == "SANDBOX-6")
        if(prd_6){
          if (prd_6.regular_price && prd_6.regular_price[currency.type]) {
            returnTotal = Number(returnTotal) + Number(prd_6.regular_price[currency.type]);
          }
        }else{
          let prd_3 = sandbox_prd.find((itm)=> itm.product_type == "SANDBOX-3")
          if(prd_3){
            if (prd_3.regular_price && prd_3.regular_price[currency.type]) {
              returnTotal = Number(returnTotal) + Number(prd_3.regular_price[currency.type]);
            }
          }else{
            let prd_1 = sandbox_prd.find((itm)=> itm.product_type == "SANDBOX-1")
            returnTotal = Number(returnTotal) + Number(prd_1.regular_price[currency.type]);
          }
        }
      }

    }
    return currency.symbol + parseFloat(returnTotal).toFixed(2);
  };

  const calculateFixedPrice = (data, promo = false) => {
    let returnTotal: any = 0;
    if (data && data.products && data.products?.length > 0) {
      if (promo) {
        returnTotal = Number(data.crazyDealData.discounted_price[currency.type]);
      } else {
        if(!SANDBOX_PRD.includes(data.id)){
          data.products.map((item) => {
            if (item.product_type !== "FT" && item.product_type !== "ILT") {
              if (item.sale_price && item.sale_price[currency.type]) {
                returnTotal = Number(returnTotal) + Number(item.sale_price[currency.type]);
              }
            }
            if(item.product_type == "SANDBOX"){
              let validity = Object.keys(item.sale_price)
              if (item.sale_price[validity[0]] && item.sale_price[validity[0]][currency.type]) {
                returnTotal = Number(returnTotal) + Number(item.sale_price[validity[0]][currency.type]);
              }
            }
          });
        }else{
          let sandbox_prd = data.products
          let prd_6 = sandbox_prd.find((itm)=> itm.product_type == "SANDBOX-6")
          if(prd_6){
            if (prd_6.sale_price && prd_6.sale_price[currency.type]) {
              returnTotal = Number(returnTotal) + Number(prd_6.sale_price[currency.type]);
            }
          }else{
            let prd_3 = sandbox_prd.find((itm)=> itm.product_type == "SANDBOX-3")
            if(prd_3){
              if (prd_3.sale_price && prd_3.sale_price[currency.type]) {
                returnTotal = Number(returnTotal) + Number(prd_3.sale_price[currency.type]);
              }
            }else{
              let prd_1 = sandbox_prd.find((itm)=> itm.product_type == "SANDBOX-1")
              returnTotal = Number(returnTotal) + Number(prd_1.sale_price[currency.type]);
            }
          }
        }
      }
    }
    return currency.symbol + parseFloat(returnTotal).toFixed(2);
  };

  const handleWhislist = (e, product_id, user_id) => {
    e.preventDefault();

    document
      .querySelector(`.list-item[data-id="${product_id}"]`)
      .classList.add("animate__backOutDown");

    addWhislist(product_id, user_id,currency.type);
  };

  return (
    <>
      {/* <Head>
        <title>My Wishlist | Whizlabs</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
      </Head> */}

      <div id="content-area" className="bg-color my-wishlist-page">
        {/* <!-- sub-header --> */}
        <div className="sub-header">
          <div className="container">
            <div className="left">
              <div className="breadcrumbs">
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/">My Wishlist</a>
                  </li>
                </ul>
              </div>
              <h1>My Wishlist</h1>
            </div>
          </div>
        </div>
        <div className="two-column">
          {/* <!-- empty-block --> */}
          {whislistCourses.length === 0 && (
            <div className="my-wishlist empty-block">
              <div className="container">
                <figure>
                  <img className="img-full" src="/images/empty-wishlist.svg" alt="" />
                </figure>
                <h2>Explore course and add in your Wishlist</h2>
                <p>When you add the course in your Wishlist, it will appear here.</p>
                <Link href="/library">
                  <a className="btn btn-browse" target="_blank">Browse Now</a>
                </Link>
              </div>
            </div>
          )}

          {whislistCourses.length > 0 && (
            <div className="container">
              <div className="left-column">
                <div className="course-listing">
                  <div className="heading">
                    <div className="title">
                      {whislistCourses.length === 0
                        ? `No Course(s) in your Wishlist`
                        : whislistCourses.length === 1
                        ? `1 Course(s) in your Wishlist`
                        : `${whislistCourses.length} Course(s) in your Wishlist`}
                    </div>
                    <div className="right-part">
                      <div className="search-block">
                        {/* <input
                          type="search"
                          placeholder="Search"
                          defaultValue={searchValue}
                          onChange={(e) => {
                            setSearchValue(e.target.value);
                          }}
                        />
                        <i className="icon icon-font-search"></i> */}
                      </div>
                    </div>
                  </div>
                  <div className="list-group">
                    {whislistCourses.map((Itm) => {
                      let vc = false
                      Itm.products.forEach((itm)=>{
                        if(itm.product_type == "SANDBOX"){
                          vc=  true
                        }
                      })
                    return <>
                        <div
                        className="list-item animate__animated"
                        key={Itm.id}
                        data-coursename={Itm.seo_details?.title}
                        data-id={Itm.id}
                      >
                        <div className="couser-img">
                          <div
                            className={`icon-whishlist active`}
                            onClick={(e) => handleWhislist(e, Itm.id, userData.data.user_id)}
                          >
                            <img className="img-full whishlist" src="/images/heart.svg" alt="" />
                            <img
                              className="img-full whishlist-fill"
                              src="/images/heart-border.svg"
                              alt=""
                            />
                          </div>
                          <img
                            className="img-full"
                            src={
                              process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                              Itm.seo_details?.featured_image.replace("media/", "")
                            }
                            alt={Itm.seo_details?.title}
                            title={Itm.seo_details?.title}
                          />
                          {Itm.crazyDealData && (
                            <span
                              className="promo-banner"
                              style={{
                                position: "absolute",
                                width: "100%",
                                textAlign: "center",
                                background: "#f06521",
                                bottom: "0",
                                fontWeight: "bold",
                                color: "white",
                              }}
                            >
                              {Itm.crazyDealData.promotion_type}
                            </span>
                          )}
                        </div>
                        <div className="item-content">
                          <div className="course-details">
                            <Link href={"/" + Itm.seo_details?.slug}>
                              <a className="title" target="_blank">{Itm.seo_details?.title}</a>
                            </Link>

                            <div>
                              {Itm.seo_details?.sell_level && (
                                <div className="level-text">
                                  <label className="bestseller">
                                    {Itm.seo_details?.sell_level}
                                  </label>

                                  {Itm.other_attributes?.course_level && (
                                    <span>{Itm.other_attributes?.course_level}</span>
                                  )}
                                </div>
                              )}

                              {Itm.web_counts?.learners_count > 0 && (
                                <div className="learners" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                                  <i className="icon icon-font-graduation-cap" style={{margin:"0px"}}></i>
                                  <span style={{marginLeft:"5px"}}>{Itm.web_counts?.learners_count + " Learners"}</span>
                                </div>
                              )}
                            </div>
                            <p>                            <div
                      dangerouslySetInnerHTML={{
                        __html:
                          Itm?.seo_details?.short_description
                            ?.replace(/<[^>]*>?/gm, "")
                            .substring(0, 200) + "...",
                      }}
                    ></div></p>
                            {/* <p>{Itm.seo_details?.short_description.substr(0, 100)}</p> */}
                            <div className="course-highlights">
                              {/* Free Test */}
                              {+Itm.web_counts?.ft_count > 0 && (
                                <div>
                                  <i className="icon-font-thumb"></i>
                                  <span>{Itm.web_counts?.ft_count} Free test</span>
                                </div>
                              )}
                              {/* No.of Questions */}
                              {+Itm.web_counts?.ques_count > 0 && (
                                <div>
                                  <i className="icon-font-note2"></i>
                                  <span>{Itm.web_counts?.ques_count} Questions</span>
                                </div>
                              )}
                              {/* No.of Videos */}
                              {+Itm.web_counts?.vid_count > 0 && (
                                <div>
                                  <i className="icon-font-play"></i>
                                  <span>{Itm.web_counts?.vid_count} Videos</span>
                                </div>
                              )}
                              {/* No.of Labs */}
                              {+Itm.web_counts?.lab_count > 0 && (
                                <div>
                                  <i className="icon-font-bicker"></i>
                                  <span>{Itm.web_counts?.lab_count} labs</span>
                                </div>
                              )}
                              { vc &&
                                <div>
                                 <InboxIcon style={{fontSize:"16px"}}/>
                                <span> Cloud Sandbox</span>
                              </div>
                              }
                              {/* No.of Flashcards */}
                              {+Itm.web_counts?.flashcard_count > 0 && (
                                <div>
                                  <i className="icon-font-flash-card"></i>
                                  <span>{Itm.web_counts?.flashcard_count} Cards</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="price-review-block">
                            <div className="price-block">
                              {(() => {
                                const isPromo = Itm.crazyDealData ? true : false;
                                const oldPrice = calculateOldPrice(Itm, isPromo);
                                const fixedPrice = calculateFixedPrice(Itm, isPromo);

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
                            </div>
                            <StarRating
                              isSamp={true}
                              avgRating={Itm.ratings?.overall_rating}
                              totalRating={Itm.ratings?.rating}
                            />
                            <a href={"/" + Itm.seo_details?.slug} target="_blank">
                              <button className="btn btn-add-cart">Start Now</button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </>
})}
                  </div>
                </div>
              </div>
              <div className="right-column">
                <div className="block-group">
                  <a href="/pricing">
                    <img src="/images/wishsub.webp" alt="banner" />
                  </a>
                  {/* <div className="block premium-plan">
                    <div>
                      <div className="block-title">
                        Premium Subscription
                        <br />
                        for Individuals
                      </div>
                      <div className="mid-content">
                        <p>
                          Access the entire training library of video courses, practice tests, and
                          hands-on labs
                        </p>
                        <div className="price-block">
                          <del className="old-price">$69</del>&nbsp;&nbsp;
                          <span className="price">$19</span>
                        </div>
                      </div>
                      <Link href="/pricing">
                        <a className="btn btn-subscribe" target="_blank">Browse All Plans</a>
                      </Link>
                    </div>
                  </div>
                  <div className="block business-plan">
                    <div className="block-title">
                      Business Plan
                      <br />
                      for Team
                    </div>
                    <div className="mid-content">
                      <p>For more than 5 Users</p>
                      <hr />
                      <p>At an annual subscription of</p>
                      <div className="price-block">
                        <del className="old-price">$299</del>&nbsp;&nbsp;
                        <span className="price">$149</span>
                      </div>
                      <label>per user per year</label>
                    </div>
                    <a
                      className="btn btn-knowmore"
                      href="https://business.whizlabs.com/"
                      target="_blank"
                    >
                      Know More
                    </a>
                  </div>

                   //  SHOW OFFER CONDITIONALLY 
                  {showOffer && (
                    <div className="block products-plan">
                      <p>On your Wishlist Products offer</p>
                      <div className="mid-content">
                        <div className="off-block">
                          50% <small>Off</small>
                        </div>
                        <label>Coupon code</label>
                        <div className="code">TODAY50</div>
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
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

  let wishListCourseList = [];

  if (userToken) {
    const wishListResp = await axios.get(baseUrl + "/users/wishlist?user_id=" + userId);

    for (const courseData of wishListResp.data.userWishlistData) {
      const courseResp = await axios.get(baseUrl + "/courses?course_id=" + courseData.course_id);

      wishListCourseList.push(courseResp.data.data);
    }
  }

  const seoHomePageData = {
    seoPageType: "wishlist",
    title: "My Wishlist | Whizlabs",
    metaTags: [
      { name: "facebook-domain-verification", property: "", content: "twh401qzi7r7o3n227q4sg3hghbpzh" },
    ],
  };

  return {
    props: {
      wishListCourseList,
      seoHomePageData,
    }, 
  };
}

const mapStateToProps = (state) => {
  return {
    cartData: state.cart.cart,
    userData: state.authData.userData,
    whislist: state.whislist.whislist,
    currencyData: state.ipDetails.currency_detail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addWhislist: (course_id, user_id) => dispatch(StoreWhishlist(course_id, user_id)),
    alertBoxAction: (data) => dispatch(alertBox(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyWishList);
