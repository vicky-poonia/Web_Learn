import Head from "next/head";
import Link from "next/link";

const Thankyou = (seoHomePageData) => {
  return (
    <>
      {/* <Head>
        <title>Thank you for your feedback | Whizlabs</title>

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
            <h1 className="thankyou-text">Thank you for your feedback!!</h1>
            <div className="btn-group">
              <a href={process.env.NEXT_PUBLIC_LMS_URL + "/my-courses"} target="_blank">
                <a style={{ background: "#009688", textDecoration: "none" }} className="btn btn-no">
                  Take me to my courses
                </a>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Thankyou;

export async function getServerSideProps() {
  const seoHomePageData = {
    seoPageType: "thankYouPage",
    title: "Thank you for your feedback | Whizlabs",
    metaTags: [
      { name: "facebook-domain-verification", property: "", content: "twh401qzi7r7o3n227q4sg3hghbpzh" },
      { httpEquiv: "cache-control", content: "no-cache" },
      { httpEquiv: "expires", content: "0" },
      { httpEquiv: "pragma", content: "no-cache" },
    ],
  };

    
  return {
      props: {
      seoHomePageData,
      }, 
  };
}
  
