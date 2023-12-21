import Head from "next/head";
const Login = ({seoHomePageData}) => {
  return (
    <>
      {/* <Head>
        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />

        <meta name="robots" content="noindex,nofollow" />
      </Head> */}
      <div id="content-area">
        <div className="error-page error-500">
          <div className="container">
            <div className="btn-group">
              <h2>Loading....</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const seoHomePageData = {
    seoPageType: "login",
    title: "",
    metaTags: [
      { name: "facebook-domain-verification", property: "", content: "twh401qzi7r7o3n227q4sg3hghbpzh" },
      { name: "robots", property: "", httpEquiv: "", content: "noindex,nofollow" },
    ],
  };
  const { res } = context;
  res.writeHead(301, { location: `${process.env.NEXT_PUBLIC_BASE_PATH}?ref=website&login=true` });
  res.end();
  return {
    props: {},
    seoHomePageData,
  };
};

export default Login;
