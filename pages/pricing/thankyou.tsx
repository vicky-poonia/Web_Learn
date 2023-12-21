import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { clearCart, addSubscription, storeCartdetails } from "redux/AddToCart/cart-actions";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import Cookie from "js-cookie";
import * as ga from "../../lib/ga";
import * as fbq from "../../lib/fpixel";
import * as uetq from "../../lib/uetq";
import { clearUserProfile, storeUserProfile } from "redux/UserProfile/profile-actions";
import moment from "moment";

const Thankyou = ({
  clearCartAction,
  updateSubscriptionState,
  userData,
  profileData,
  updateuserprofile,
  clearprofile,
  getCartandStoreAfterpurchase,
  seoHomePageData,
}) => {
  const router = useRouter();
  const [lastOrderDetails, setLastOrderDetails] = useState(null);
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  const [lastActivePlan, setLastActivePlan] = useState(null);

  function dateDiff(start_date, end_date) {
    const startDate = moment.utc(start_date);
    const endDate = moment.utc(end_date);

    const diff = endDate.diff(startDate, "years", true);

    const years = Math.floor(diff);
    const months = Math.floor((diff - years) * 12);
    const days = Math.floor(moment.duration(diff - years - months / 12, "years").asDays());
    let output = "";
    if (years > 0) {
      output += `${years} ${years === 1 ? "year" : "years"}`;
    }

    if (months > 0) {
      output += `${output.length > 0 ? " " : ""}${months} ${months === 1 ? "month" : "months"}`;
    }

    if (days > 0) {
      output += `${output.length > 0 ? " " : ""}${days} ${days === 1 ? "day" : "days"}`;
    }

    return output;
  }

  useEffect(() => {
    updateSubscriptionState();
    updateuserprofile(userData.token);
    // clearCartAction();
    getCartandStoreAfterpurchase(userData?.token);
    if (!userData || !userData.user_id) {
      router.push("/");
    }
    if (document) {
      document.body.classList.remove("bg-color");
      const lastOrderId = Cookie.get("lastOrderId");
      if (lastOrderId) {
        axios
          .get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/subplan?order_id=${lastOrderId}`, {
            headers: {
              Authorization: userData.token,
            },
          })
          .then((resp) => {
            if (resp.data.data) {
              setLastOrderDetails(resp.data.data);

              if (
                resp?.data?.data?.id &&
                window &&
                process.env.NEXT_PUBLIC_BASE_PATH.includes("whizlabs.com")
              ) {
                ga.event({
                  action: "conversion",
                  params: {
                    send_to: "AW-1071861065/Z2kcCOfoy-YCEMmajf8D",
                    transaction_id: resp.data.data.id,
                    value: resp.data.data.order_total,
                    currency: resp.data.data.currency,
                  },
                });

                ga.ecommerceEvent({
                  eventType: "purchase",
                  currency: "",
                  productList: resp?.data?.data,
                  purchaseDetails: {
                    transaction_id: resp.data.data.id,
                    value: resp.data.data.order_total,
                    currency: resp.data.data.currency,
                    tax: 0,
                    shipping: 0,
                  },
                });

                ga.event({
                  action: `purchase`,
                  params: {
                    transaction_id: resp.data.data.id,
                    value: resp.data.data.order_total,
                    currency: resp.data.data.currency,
                    tax: 0,
                    shipping: 0,
                  },
                  ecommerce: true,
                  ecaction: "ec:setAction",
                });

                fbq.event({
                  action: "Subscribe",
                  params: {
                    content_name: "Facebook Pixel code in subscription thank you page",
                    currency: resp.data.data.currency,
                    value: resp.data.data.order_total,
                  },
                });

                uetq.event({
                  action: "/pricing/thankyou/",
                  params: {
                    revenue_value: resp.data.data.order_total,
                    currency: resp.data.data.currency,
                  },
                });
              }
            }
          });
      }
    }
  }, []);

  useEffect(() => {
    setLastActivePlan(
      profileData?.userSubscriptionData?.active_plans?.find(
        (item, index) => item.id === lastOrderDetails?.id
      )
    );
  }, [profileData, lastOrderDetails]);

  return (
    <>
      {/* <Head>
        <title>Purchase Success | Whizlabs</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />

        <meta httpEquiv="cache-control" content="no-cache" />
        <meta httpEquiv="expires" content="0" />
        <meta httpEquiv="pragma" content="no-cache" />
      </Head> */}
      <div
        style={{
          display: "flex",
        }}
      >
        <div id="content-area" className="thank-for-purchase">
          <div className="thankyou-block-purchase">
            <div className="">
              <div
                style={{
                  padding: "1px 0 0",
                }}
              >
                <figure>
                  <img className="img-full" src="/images/payment-success/success.svg" alt="" />
                </figure>
                <figure>
                  <img
                    className="img-full-bg"
                    src="/images/payment-success/bg-success.svg"
                    alt=""
                  />
                </figure>
              </div>
              <div
                style={{
                  marginBottom: "30px",
                  paddingBottom: "10px",
                }}
              >
                <h1 className="thankyou-text">Payment Successful</h1>
                <p className="thankyou-sub-text">
                  Thank you for your trust in Whizlabs! If you have any questions,
                  <br /> please contact us at{" "}
                  <span>
                    <a href="mailto:support@whizlabs.com">support@whizlabs.com</a>
                  </span>
                </p>

                <div className="order-details">
                  <div className="order-details-title">
                    <h3>Order Details</h3>
                  </div>

                  <div className="order-details-data">
                    <div className="order-details-data-details">
                      <p className="left-text">Order Id</p>
                      <p className="right-text">{lastOrderDetails ? lastOrderDetails.id : ""}</p>
                    </div>
                    <hr />
                    <div className="order-details-data-details">
                      <p className="left-text">Order Date</p>
                      <p className="right-text">
                        {lastOrderDetails
                          ? moment(lastOrderDetails.created_at).format("DD-MMM-YYYY")
                          : ""}
                      </p>
                    </div>
                    <hr />

                    <div className="order-details-data-details">
                      <p className="left-text">Transaction Id</p>
                      <p className="right-text">
                        {lastOrderDetails ? lastOrderDetails.transaction_id : ""}
                      </p>
                    </div>
                    <hr />
                    <div className="order-details-data-details">
                      {/* <p></p> */}
                      <button
                        onClick={async () => {
                          setInvoiceLoading(true);
                          const pdfResponse = await axios.get(
                            process.env.NEXT_PUBLIC_ADMIN_URL +
                              "/download-subscription-invoice/" +
                              lastOrderDetails?.id
                          );
                          if (pdfResponse && pdfResponse.data) {
                            var a = document.createElement("a");
                            a.href = pdfResponse.data;
                            a.download = "Whizlabs_Invoice.pdf";
                            a.click();
                          }
                          setInvoiceLoading(false);
                        }}
                      >
                        {" "}
                        {invoiceLoading ? "Downloading...." : "Download Invoice"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="purchased-products">
                  <div className="purchased-products-title">
                    <h3>Purchased Products</h3>
                  </div>

                  <div className="purchased-products-data">
                    <div className="purchased-products-subscription-data-details">
                      <div className="purchased-products-subscription-data-details-left">
                        <p className="left-text">
                          {lastActivePlan ? lastActivePlan.plan?.title : ""}
                          <span>
                            {lastActivePlan
                              ? ` ( ${dateDiff(
                                  lastActivePlan.start_date,
                                  lastActivePlan.end_date
                                )} )`
                              : ""}
                          </span>
                        </p>
                        <p
                          style={{
                            fontSize: "10px",
                          }}
                        >
                          {lastActivePlan
                            ? `(${lastActivePlan.plan?.description.replaceAll(",", " +")})`
                            : ""}
                        </p>
                      </div>
                      <a href={`${process.env.NEXT_PUBLIC_LMS_URL}/dashboard`}>
                        Take me to Dashboard
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* {lastOrderDetails && (
              <p style={{ display: "none" }}>
                Order ID: {lastOrderDetails.id} <br />
                Email ID: {lastOrderDetails.billing_email} <br />
                Plan: {lastOrderDetails.plan_id}
              </p>
            )}
            <div className="btn-group">
              <a href={process.env.NEXT_PUBLIC_LMS_URL + "/my-courses"} target="_blank">
                <a style={{ background: "#009688", textDecoration: "none" }} className="btn btn-no">
                  Take me to my courses
                </a>
              </a>
              {lastOrderDetails && (
                <img
                  src={`https://shareasale.com/sale.cfm?amount=${lastOrderDetails.order_total}&tracking=${lastOrderDetails.id}&transtype=SALE&merchantID=43514&currency=${lastOrderDetails.currency}`}
                  width="1"
                  height="1"
                />
              )}
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const seoHomePageData = {
    seoPageType: "thankyou",
    title: "Purchase Success | Whizlabs",
    metaTags: [
      {
        name: "facebook-domain-verification",
        property: "",
        content: "twh401qzi7r7o3n227q4sg3hghbpzh",
      },
      { name: "", httpEquiv: "cache-control", content: "no-cache" },
      { name: "", httpEquiv: "expires", content: "0" },
      { name: "", httpEquiv: "pragma", content: "no-cache" },
    ],
  };
  

  return {
    props: {
      seoHomePageData,
    }, // will be passed to the page component as props
  };
}

const mapStateToProps = (state) => {
  return {
    userData: state.authData?.userData?.data,
    profileData: state.userProfileData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSubscriptionState: (datas) => dispatch(addSubscription(datas)),
    clearCartAction: () => dispatch(clearCart()),
    updateuserprofile: (token) => dispatch(storeUserProfile(token)),
    clearprofile: () => dispatch(clearUserProfile),
    getCartandStoreAfterpurchase: (userToken) => dispatch(storeCartdetails(userToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Thankyou);
