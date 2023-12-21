import Head from "next/head";
import Link from "next/link";

const Thankyou = (seoHomePageData) => {
  return (
    <>
      {/* <Head>
        <title>Thank you | Whizlabs</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
      </Head> */}
      <div id="content-area" className="thank-for-feedback">
        <div className="thankyou-block">
          <div className="container">
            <figure>
              <img className="img-full" src="/images/thankyou-for-feedback.svg" alt="" />
            </figure>
            <h1 className="thankyou-text">
              Thank you for your request!! Our team will get back to you shortly.
            </h1>
            <div className="btn-group">
              <Link href={process.env.NEXT_PUBLIC_LMS_URL + "/my-courses"}>
                <a target="_blank" style={{ background: "#009688", textDecoration: "none" }} className="btn btn-no">
                  Take me to my courses
                </a>
              </Link>
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
    seoPageType: "thankyouu",
    title: "Thank you | Whizlabs",
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
        seoHomePageData,
      }, // will be passed to the page component as props
  };
}
