import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const StaticPages = ({ pageData, seoHomePageData }) => {
  const [fullUrl, setFullUrl] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(window.location.href);
    }
  }, []);

  return (
    <>
      {/* <Head>
        <title>{pageData.seo_title}</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />

        <meta name="title" content={pageData.seo_title} />
        <meta name="description" content={pageData.seo_description} />
        <meta name="keywords" content={pageData.seo_keywords} />

        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Privacy Policy - Whizlabs" />
        <meta property="og:description" content={pageData.seo_description} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:site_name" content="Whizlabs" />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acaded793a0"}
        />
        <meta property="fb:app_id" content="502194103558420" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:description" content={pageData.seo_description} />
        <meta name="twitter:title" content={pageData.seo_title} />
        <meta name="twitter:site" content="@whizlabs" />
        <meta
          name="twitter:image"
          content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acaded793e8"}
        />
        <meta name="twitter:creator" content="@whizlabs" />
      </Head> */}

      <div id="content-area" className="terms-use-page">
        <div className="page-content">
          <div className="container-small"></div>

          <div className="container-small">
            <div className="page-title">
              <h1>{pageData.title}</h1>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: pageData.description,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StaticPages;


export async function getServerSideProps() {
  const seoHomePageData = {
    seoPageType: "privacyPolicyPage", // This should be changed to reflect the actual page type
    title: "", // Dynamic title from pageData
    // title: pageData.seo_title, // Dynamic title from pageData
    metaTags: [
      {
        name: "facebook-domain-verification",
        property: "",
        content: "twh401qzi7r7o3n227q4sg3hghbpzh",
      },
      // { name: "title", property: "", content: pageData.seo_title },
      // {
      //   name: "description",
      //   property: "",
      //   content: pageData.seo_description,
      // },
      // { name: "keywords", property: "", content: pageData.seo_keywords },
      { name: "", property: "og:locale", content: "en_US" },
      { name: "", property: "og:type", content: "website" },
      { name: "", property: "og:title", content: "Privacy Policy - Whizlabs" },
      // {
      //   name: "",
      //   property: "og:description",
      //   content: pageData.seo_description,
      // },
      // { name: "", property: "og:url", content: fullUrl },
      { name: "", property: "og:site_name", content: "Whizlabs" },
      {
        name: "",
        property: "og:image",
        content:
          process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
          "2019/03/07/meta_image.jpg?60acaded793a0",
      },
      { name: "", property: "fb:app_id", content: "502194103558420" },
      { name: "", property: "og:image:width", content: "500" },
      { name: "", property: "og:image:height", content: "500" },
      { name: "twitter:card", property: "", content: "summary" },
      // {
      //   name: "twitter:description",
      //   property: "",
      //   content: pageData.seo_description, 
      // { name: "twitter:title", property: "", content: pageData.seo_title },
      { name: "twitter:site", property: "", content: "@whizlabs" },
      {
        name: "twitter:image",
        content:
          process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
          "2019/03/07/meta_image.jpg?60acaded793e8",
      },
      { name: "twitter:creator", property: "", content: "@whizlabs" },
    ],
  };
  
  return {
    props: {
      seoHomePageData,
    },
  };
}

