import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

const OnlineCourse = () => {
  return (
    <>
      <Head>
        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />

        <meta name="robots" content="noindex,nofollow" />
      </Head>
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
  const { res } = context;
  const { slug } = context.params;
  res.writeHead(301, { location: `${process.env.NEXT_PUBLIC_BASE_PATH}${slug}` });
  res.end();
};

export default OnlineCourse;
