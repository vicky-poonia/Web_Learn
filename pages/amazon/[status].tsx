import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { clearCart, addSubscription } from "redux/AddToCart/cart-actions";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import Cookie from "js-cookie";
// import * as ga from "../../../lib/ga";
// import * as fbq from "../../../lib/fpixel";
// import * as uetq from "../../../lib/uetq";

const hostName = "";

const ccAvRedirect = ({ status, clearCartAction, userData, seoHomePageData }) => {
  const router = useRouter();
  // const [lastOrderDetails, setLastOrderDetails] = useState(null);

  /* useEffect(() => {
    clearCartAction(); // clear cart data & coupon datas
    if (!userData || !userData.user_id) {
      router.push("/");
    }
    if (document) {
      document.body.classList.remove("bg-color");
      const lastOrderId = Cookie.get("lastOrderId");
      if (lastOrderId && status !== "fail") {
        axios
          .get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/orders/${userData.user_id}?order_id=${lastOrderId}`
          )
          .then((resp) => {
            if (resp.data.data) {
              setLastOrderDetails(resp.data.data);

              if (resp?.data?.data?.id && window.location.hostname==="www.whizlabs.com") {
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
              }
            }
          });
      }
    }
  }, []); */

  return (
    <>
      {/* <Head>
        <title>Processing | Whizlabs</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
      </Head> */}
      <div id="content-area" className="thank-for-feedback">
        <div className="thankyou-block">
          <div className="container">
            <figure>
              <img className="img-full" src="/images/thankyou-for-feedback.svg" alt="" />
            </figure>

            <h1 className="thankyou-text">
              {status === "verify" ? "Account verification mail sent" : "Account verified"}
            </h1>
            <div className="servey-box">
              <div className="title">
                {status === "verify" ? (
                  <p>Please check you mail for account verification link</p>
                ) : (
                  <p>Your account is verified. Please login to continue</p>
                )}
              </div>
              <div className="btn-group">
                {status === "verify" ? (
                  ""
                ) : (
                  <Link href={"/amazon/employees"}>
                    <a
                      style={{ background: "#009688", textDecoration: "none" }}
                      className="btn btn-no"
                    >
                      Login
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { status } = context.params;

  const seoHomePageData = {
    seoPageType: "amazonn",
    title: "Processing | Whizlabs",
    metaTags: [
      {
        name: "facebook-domain-verification",
        property: "",
        content: "twh401qzi7r7o3n227q4sg3hghbpzh",
      },
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ccAvRedirect);
