import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import axios from "axios";
import { useRouter } from "next/router";

const FourOhFour = (seoHomePageData) => {
  const router = useRouter();
  const currentPath = router.asPath;
  useEffect(() => {
    if (currentPath) {
      (async function () {
        await axios.post(baseUrl + "/web/store-404-errors", {
          url: process.env.NEXT_PUBLIC_BASE_PATH + currentPath,
          previous_url: "",
        });
      })();
    }
  }, []);

  return (
    <>
      {/* <Head>
        <title>Error | Whizlabs</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />

        <meta
          name="description"
          content="Ensure your success in AWS, Azure, Java, PMP, Agile, Big Data, Linux certification exams. Pass or 100% Money Back. Trained 5M+ professionals since 20 years. Start with Free Trial Now!"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Online Certification Training Courses for Professionals"
        />
        <meta
          property="og:description"
          content="Ensure your success in AWS, Azure, Java, PMP, Agile, Big Data, Linux certification exams. Pass or 100% Money Back. Trained 5M+ professionals since 20 years. Start with Free Trial Now!"
        />
        <meta property="og:url" content="https://www.whizlabs.com/all/" />
        <meta property="og:site_name" content="Whizlabs" />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ac8ab3bf47f"}
        />
        <meta property="fb:app_id" content="502194103558420" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="Ensure your success in AWS, Azure, Java, PMP, Agile, Big Data, Linux certification exams. Pass or 100% Money Back. Trained 5M+ professionals since 20 years. Start with Free Trial Now!"
        />
        <meta
          name="twitter:title"
          content="Online Certification Training Courses for Professionals"
        />
        <meta name="twitter:site" content="@whizlabs" />
        <meta
          name="twitter:image"
          content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ac8ab3bf4c3"}
        />
        <meta name="twitter:creator" content="@whizlabs" />
      </Head> */}
      <div id="content-area">
        <div className="error-page error-404">
          <div className="container">
            <figure>
              <img className="img-full" src="/images/404-graphics.svg" alt="404 Not Found 😒" />
            </figure>
            <div className="caption">
              <h1>
                Oops!
                <br /> Page not found!
              </h1>
              <p>
                The page you are looking for could not be found. The link to this address may be
                outdated or we may have moved the page since you last bookmarked it. <br /><br />
                It may also be temporarily unavailable.
              </p>
              <Link href="/">
                <a className="btn btn-backto-home">Back to Home</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export const getStaticProps = async () => {
  const seoHomePageData = {
    seoPageType: "errorPage", // This should be changed to reflect the actual page type
    title: "Error | Whizlabs",
    metaTags: [
      {
        name: "facebook-domain-verification",
        property: "",
        content: "twh401qzi7r7o3n227q4sg3hghbpzh",
      },
      {
        name: "description",
        property: "",
        content:
          "Ensure your success in AWS, Azure, Java, PMP, Agile, Big Data, Linux certification exams. Pass or 100% Money Back. Trained 5M+ professionals since 20 years. Start with Free Trial Now!",
      },
      { name: "", property: "og:locale", content: "en_US" },
      { name: "", property: "og:type", content: "website" },
      {
        name: "",
        property: "og:title",
        content: "Online Certification Training Courses for Professionals",
      },
      {
        name: "",
        property: "og:description",
        content:
          "Ensure your success in AWS, Azure, Java, PMP, Agile, Big Data, Linux certification exams. Pass or 100% Money Back. Trained 5M+ professionals since 20 years. Start with Free Trial Now!",
      },
      { name: "", property: "og:url", content: "https://www.whizlabs.com/all/" },
      { name: "", property: "og:site_name", content: "Whizlabs" },
      {
        name: "",
        property: "og:image",
        content:
          process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ac8ab3bf47f",
      },
      { name: "", property: "fb:app_id", content: "502194103558420" },
      { name: "", property: "og:image:width", content: "500" },
      { name: "", property: "og:image:height", content: "500" },
      { name: "twitter:card", property: "", content: "summary" },
      {
        name: "twitter:description",
        property: "",
        content:
          "Ensure your success in AWS, Azure, Java, PMP, Agile, Big Data, Linux certification exams. Pass or 100% Money Back. Trained 5M+ professionals since 20 years. Start with Free Trial Now!",
      },
      {
        name: "twitter:title",
        property: "",
        content: "Online Certification Training Courses for Professionals",
      },
      { name: "twitter:site", property: "", content: "@whizlabs" },
      {
        name: "twitter:image",
        content:
          process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ac8ab3bf4c3",
      },
      { name: "twitter:creator", property: "", content: "@whizlabs" },
    ],
  };  
  
  return {
    props: {
      seoHomePageData,
    }, // will be passed to the page component as props
  };
}

export default FourOhFour;