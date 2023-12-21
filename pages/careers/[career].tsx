import Head from "next/head";
import { useEffect } from "react";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import FourOhFour from "pages/404";
import Link from "next/link";

const CareerDetail = ({ jobData, seoHomePageData }) => {
  useEffect(() => {
    document.querySelector("#wrapper").classList.add("carees-details-page");
  }, []);

  if (!jobData || !jobData.id) return <FourOhFour />;

  return (
    <>
      {/* <Head>
        <title>Career | Whizlabs</title>
        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
      </Head> */}
      <div id="content-area">
        <div className="job-apply-block">
          <div className="container">
            <div className="left">
              <h1>{jobData.position_title}</h1>
              <p>{jobData.job_type == 1 ? "Full Time" : "Part Time"}</p>
            </div>
            <div className="right">
              <a href={"/careers/apply/" + jobData.slug}>
                <button className="btn btn-apply-job">Apply For This Job</button>
              </a>
            </div>
          </div>
        </div>
        <div className="container career_page_li">
          <h5>Role and Key Responsibilities</h5>
          <div
            dangerouslySetInnerHTML={{
              __html: jobData.roles_responsibilities,
            }}
          ></div>
          <h5>Minimum Qualifications</h5>
          <div
            dangerouslySetInnerHTML={{
              __html: jobData.minimum_qualifications,
            }}
          ></div>
          <h5>About Whizlabs</h5>
          <div
            dangerouslySetInnerHTML={{
              __html: jobData.about_whizlabs,
            }}
          ></div>
          <Link href={"/careers/apply/" + jobData.slug}>
            <button className="btn btn-apply-job">Apply For This Job</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const slug = context.params.career;
  let jobData = [];
  const seoHomePageData = {
    seoPageType: "career",
    title: "Career | Whizlabs",
    metaTags: [
      { name: "facebook-domain-verification", property: "", content: "twh401qzi7r7o3n227q4sg3hghbpzh" },
    ],
    };
  try {
    let positionResponse = await axios.get(baseUrl + "/web/career-positions", {
      params: {
        slug: slug,
      },
    });

    if (
      positionResponse &&
      positionResponse.data &&
      positionResponse.data.data &&
      positionResponse.data.data[0]
    ) {
      jobData = positionResponse.data.data[0];
    }
  } catch (error) {
    console.error(error);
  }
  return {
    props: { jobData, seoHomePageData },
  };
};

export default CareerDetail;
