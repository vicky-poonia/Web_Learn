import Head from "next/head";
import Link from "next/link";

export default function FiveHundo(seoHomePageData) {
  return (
    <>
      {/* <Head>
        <title>Error | Whizlabs</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
      </Head> */}
      <div id="content-area">
        <div className="error-page error-500">
          <div className="container">
            <figure>
              <img className="img-full" src="/images/500-graphics.svg" alt="All is well... 🙏🏻" />
            </figure>
            <div className="caption">
              <h1>
                Error 500!
                <br />
                Internal Server Error
              </h1>
              <p>There was a server error while processing your request</p>
              <a className="btn btn-backto-home" href="#">
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export const getStaticProps = async () => {
  const seoHomePageData = {
    seoPageType: "fivezerofive", // This should be changed to reflect the actual page type
    title: "Error | Whizlabs",
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