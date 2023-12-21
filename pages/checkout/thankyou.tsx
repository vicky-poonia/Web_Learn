import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { clearCart, addSubscription } from "redux/AddToCart/cart-actions";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import Cookie from "js-cookie";
import * as ga from "../../lib/ga";
import * as fbq from "../../lib/fpixel";
import * as uetq from "../../lib/uetq";

const Thankyou = ({ clearCartAction, userData, seoHomePageData}) => {
  const router = useRouter();
  const [lastOrderDetails, setLastOrderDetails] = useState(null);

  useEffect(() => {
    clearCartAction(); // clear cart data & coupon datas
    if (!userData || !userData.user_id) {
      router.push("/");
    }
    if (document) {
      document.body.classList.remove("bg-color");
      const lastOrderId = Cookie.get("lastOrderId");
      if (lastOrderId) {
        axios
          .get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/orders/${userData?.user_id}?order_id=${lastOrderId}`
          )
          .then((resp) => {
            if (resp.data.data) {
              setLastOrderDetails(resp.data.data);
            }

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
          });
      }
    }
  }, []);

  return (
    <>
      {/* <Head>
        <title>Purchase Success | Whizlabs</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />

        <meta httpEquiv="cache-control" content="no-cache" />
        <meta httpEquiv="expires" content="0" />
        <meta httpEquiv="pragma" content="no-cache" />
      </Head> */}
      <div id="content-area" className="thank-for-feedback">
        <div className="thankyou-block">
          <div className="container">
            <figure>
              <img className="img-full" src="/images/thankyou-for-feedback.svg" alt="" />
            </figure>
            <h1 className="thankyou-text">Thank you for your purchase!!</h1>
            <div className="btn-group">
              <Link href={process.env.NEXT_PUBLIC_LMS_URL + "/my-courses"}>
                <a style={{ background: "#009688", textDecoration: "none" }} className="btn btn-no">
                  Take me to my courses
                </a>
              </Link>
            </div>
            {lastOrderDetails && (
              <img
                src={`https://shareasale.com/sale.cfm?amount=${lastOrderDetails.order_total}&tracking=${lastOrderDetails.id}&transtype=SALE&merchantID=43514&currency=${lastOrderDetails.currency}`}
                width="1"
                height="1"
              />
            )}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCartAction: () => dispatch(clearCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Thankyou);
