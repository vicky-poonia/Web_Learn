import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { clearCart, storeCartdetails } from "redux/AddToCart/cart-actions";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import Cookie from "js-cookie";
import * as ga from "../../../lib/ga";
import * as fbq from "../../../lib/fpixel";
import * as uetq from "../../../lib/uetq";
import { alertBox } from "redux/AlertBox/alert-actions";
import { enrollCourseDetail } from "redux/UserEnrolled/enroll-action";
import { clientClear } from "redux/ClientOffer/client-action";
import moment from "moment";
const ccAvRedirect = ({
  status,
  clearCartAction,
  userData,
  alertBoxAction,
  EnrolledcoursesAction,
  clearClient,
  getCartandStoreAfterpurchase,
  seoHomePageData,
}) => {
  const router = useRouter();
  const [lastOrderDetails, setLastOrderDetails] = useState(null);
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  useEffect(() => {
    if (!userData || !userData.user_id) {
      router.push("/");
    }
    if (document) {
      document.body.classList.remove("bg-color");
      const lastOrderId = Cookie.get("lastOrderId");
      if (lastOrderId && status !== "fail") {
        // clearCartAction();
        axios
          .get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/orders/${userData?.user_id}?order_id=${lastOrderId}`
          )
          .then((resp) => {
            if (resp.data.status === "error") {
              if (userData && userData.user_id) {
                alertBoxAction({
                  type: "ERROR",
                  title: "Error",
                  msg: "Error in making Purchase!",
                });
              }
              return;
            }

            setLastOrderDetails(resp.data.data);
            EnrolledcoursesAction(userData?.user_id);
            getCartandStoreAfterpurchase(userData?.token);
            alertBoxAction({
              type: "SUCCESS",
              title: "success",
              msg: "Payment Successful",
            });
            clearClient();
            if (
              resp?.data?.data?.id &&
              process.env.NEXT_PUBLIC_BASE_PATH.includes("whizlabs.com")
            ) {
              let orderItems = [];
              resp.data.data.order_details.map((item) => {
                orderItems.push({
                  id: item.product_id,
                  name: item?.course_details?.name,
                  variant: "",
                  price: item.price_discount,
                  list_name: "",
                  brand: "",
                  category: "",
                  list_position: "",
                  quantity: 1,
                });
              });
              ga.event({
                action: "conversion",
                params: {
                  send_to: "AW-1071861065/5MzACLrYhWwQyZqN_wM",
                  transaction_id: resp.data.data.id,
                  value: resp.data.data.order_total,
                  currency: resp.data.data.currency,
                },
              });

              ga.event({
                action: "purchase",
                params: {
                  transaction_id: resp.data.data.id,
                  value: resp.data.data.order_total,
                  currency: resp.data.data.currency,
                  tax: 0,
                  shipping: 0,
                  items: orderItems,
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
                  items: orderItems,
                },
                ecommerce: true,
                ecaction: "ec:setAction",
              });

              ga.ecommerceEvent({
                eventType: "purchase",
                currency: "",
                productList: orderItems,
                purchaseDetails: {
                  transaction_id: resp.data.data.id,
                  value: resp.data.data.order_total,
                  currency: resp.data.data.currency,
                  tax: 0,
                  shipping: 0,
                },
              });

              fbq.event({
                action: "Purchase",
                params: {
                  content_name: "Facebook Pixel code in thank you page",
                  currency: resp.data.data.currency,
                  value: resp.data.data.order_total,
                },
              });

              uetq.event({
                action: "/redirect/success/",
                params: {
                  revenue_value: resp.data.data.order_total,
                  currency: resp.data.data.currency,
                },
              });

              if (Cookie.get("landing")) {
                ga.event({
                  action: "conversion",
                  params: {
                    send_to: "AW-1071861065/got3COGakO4YEMmajf8D",
                  },
                });
                setTimeout(() => {
                  Cookie.remove("landing");
                }, 3000);
              }
            }
          });
      }
    }
  }, []);

  return (
    <>
      {/* <Head>
        <title>{status === "fail" ? "Error!" : "Success"} | Whizlabs</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
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
                      <p className="right-text">
                        {lastOrderDetails?.id ? lastOrderDetails?.id : ""}
                      </p>
                    </div>
                    <hr />
                    <div className="order-details-data-details">
                      <p className="left-text">Order Date</p>
                      <p className="right-text">
                        {lastOrderDetails?.created_at
                          ? moment(lastOrderDetails.created_at).format("DD-MMM-YYYY")
                          : ""}
                      </p>
                    </div>
                    <hr />

                    <div className="order-details-data-details">
                      <p className="left-text">Transaction Id</p>
                      <p className="right-text">
                        {lastOrderDetails?.transaction_id ? lastOrderDetails?.transaction_id : ""}
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
                              "/download-invoice/" +
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
                        {invoiceLoading ? "Downloading...." : "Download Invoice"}
                      </button>
                    </div>
                  </div>
                </div>
                {lastOrderDetails && lastOrderDetails.order_details?.length ? (
                  <div className="purchased-products">
                    <div className="purchased-products-title">
                      <h3>Purchased Products</h3>
                    </div>

                    <div className="purchased-products-data">
                      {lastOrderDetails?.order_details.map((item, index) => (
                        <>
                          <div className="purchased-products-data-details" key={index}>
                            <p className="left-text">
                              {item.course_details.name} ({item.product_type})
                            </p>
                            <a
                              className="right-text"
                              href={`${process.env.NEXT_PUBLIC_LMS_URL}/course/${item.course_details.slug}/${item.product_id}`}
                              target="_blank"
                            >
                              View Course
                            </a>
                          </div>
                          <hr />
                        </>
                      ))}

                      <hr />
                    </div>
                  </div>
                ) : (
                  ""
                )}
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
      {/* <div id="content-area" className="thank-for-feedback">
        <div className="thankyou-block">
          <div className="container">
            {status !== "fail" && (
              <figure>
                <img className="img-full" src="/images/thankyou-for-feedback.svg" alt="" />
              </figure>
            )}
            <h1 className="thankyou-text">{status === "fail" ? "" : "Success!!"}</h1>
            <div className="servey-box">
              <div className="title">
                {status === "fail" ? (
                  <p>Payment Transaction Cancelled. You can go to cart to retry the payment.</p>
                ) : (
                  lastOrderDetails && (
                    <>
                      <p>Payment successful.</p>
                      <br />
                      <p style={{ display: "none" }}>
                        Order ID: {lastOrderDetails.id} <br />
                        Email ID: {lastOrderDetails.billing_email} <br />
                        Product: {lastOrderDetails.order_details[0].course_details.name} (
                        {lastOrderDetails.order_details.map((Itm) => Itm.product_type).join(", ")})
                      </p>
                    </>
                  )
                )}
              </div>
              <div className="btn-group">
                {status === "fail" ? (
                  <Link href={"/cart"}>
                    <a
                      style={{ background: "#009688", textDecoration: "none" }}
                      className="btn btn-no"
                    >
                      Go to Cart
                    </a>
                  </Link>
                ) : (
                  <Link href={process.env.NEXT_PUBLIC_LMS_URL + "/my-courses"}>
                    <a
                      style={{ background: "#009688", textDecoration: "none" }}
                      className="btn btn-no"
                    >
                      Take me to my courses
                    </a>
                  </Link>
                )}
              </div>
              {lastOrderDetails && status !== "fail" && (
                <img
                  src={`https://shareasale.com/sale.cfm?amount=${lastOrderDetails.order_total}&tracking=${lastOrderDetails.id}&transtype=SALE&merchantID=43514&currency=${lastOrderDetails.currency}`}
                  width="1"
                  height="1"
                />
              )}
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export async function getServerSideProps(context) {
  const { status } = context.params;

  const seoHomePageData = {
    seoPageType: "checkoutRedirect",
    title: `${status === "fail" ? "Error!" : "Success"} | Whizlabs`,
    metaTags: [
      { name: "facebook-domain-verification", httpEquiv: "", property: "", content: "twh401qzi7r7o3n227q4sg3hghbpzh" },
    ],
  };

  return {
    props: {
      status,
      seoHomePageData,
    }, // will be passed to the page component as props
  };
}

const mapStateToProps = (state) => {
  return {
    userData: state.authData?.userData?.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCartAction: () => dispatch(clearCart()),
    alertBoxAction: (data) => dispatch(alertBox(data)),
    EnrolledcoursesAction: (user_id) => dispatch(enrollCourseDetail(user_id)),
    clearClient: () => dispatch(clientClear()),
    getCartandStoreAfterpurchase: (userToken) => dispatch(storeCartdetails(userToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ccAvRedirect);
