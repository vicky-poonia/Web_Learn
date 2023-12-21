import Head from "next/head";
import Link from "next/link";
const ProgramGuarantee = (seoHomePageData) => (
  <>
    {/* <Head>
      <title>Our Learning Programs Guarantee | Whizlabs</title>

      <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />

      <meta name="title" content="Our Learning Programs Guarantee - Whizlabs" />
      <meta
        name="description"
        content="Whizlabs online certification training courses and practice tests come with 100% satisfaction guarantee and 100% unconditional money back guarantee. Check this page to know more."
      />
      <meta name="keywords" content="learning programs guarantee" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Our Learning Programs Guarantee - Whizlabs" />
      <meta
        property="og:description"
        content="Whizlabs online certification training courses and practice tests come with 100% satisfaction guarantee and 100% unconditional money back guarantee. Check this page to know more."
      />
      <meta property="og:url" content="https://www.whizlabs.com/our-learning-programs-guarantee/" />
      <meta property="og:site_name" content="Whizlabs" />
      <meta
        property="og:image"
        content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acd49dd883f"}
      />
      <meta property="fb:app_id" content="502194103558420" />
      <meta property="og:image:width" content="500" />
      <meta property="og:image:height" content="500" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:description"
        content="Whizlabs online certification training courses and practice tests come with 100% satisfaction guarantee and 100% unconditional money back guarantee. Check this page to know more."
      />
      <meta name="twitter:title" content="Our Learning Programs Guarantee - Whizlabs" />
      <meta name="twitter:site" content="@whizlabs" />
      <meta
        name="twitter:image"
        content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acd49dd8887"}
      />
      <meta name="twitter:creator" content="@whizlabs" />
    </Head> */}
    <div id="content-area" className="terms-use-page">
      <div className="page-content">
        <div className="container-small">
          <div className="page-title">
            <h2>Our Learning Programs Guarantee</h2>
          </div>
          <p>
            <span>
              Whizlabs is dedicated to helping professionals learn and validate the skills required
              to boost up their career. And so, we strive to provide the best-in-industry training
              with the utmost level of customer satisfaction possible. Our learning program
              comprises of online courses and practice tests on which our learning program guarantee
              is applied.{" "}
            </span>
          </p>
          <h2>Whizlabs learning program guarantee includes </h2>
          <br />
          <h4>100% Customer Satisfaction</h4>
          <p>
            <span>
              Along with providing high-quality training content, our aim is to provide as much
              satisfaction as possible to the customers. If the candidates don’t find our training
              and practice material satisfactory even after trying it after at least two sessions,
              they are free to raise a query and we’ll satisfy them.
            </span>
          </p>
          <br />
          <h4>100% Exam Objectives Covered</h4>
          <p>
            <span>
              Our courses have been developed with the main focus on the exam objectives. We ensure
              that each candidate who attends our training achieves his/her professional goals.
              However, if candidates find that the course does not cover the mentioned objectives,
              they can reach us anytime and we’ll clear their doubts.
            </span>
          </p>
          <br />
          <h4>100% Unconditional Money Back</h4>
          <p>
            <span>
              The main focus of our online courses is to help the candidates prepare with the
              domains covered in the exam while practice tests are meant to get you familiar with
              the real exam. In case, the candidates don’t find our training useful at all, we offer
              them the opportunity to ask for a refund.
            </span>
          </p>
          <br />
          <h4>Other Resources</h4>
          <p>
            <span>
              Whizlabs terms and conditions and refund policy are associated with the learning
              program guarantee. Check out the below links to get the details.
            </span>
          </p>
          <ul>
            <li>
              <Link href="/refund-policy">
                <a target="_blank">
                  <span>Refund Policy</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/terms-of-use">
                <a target="_blank">
                  <span>Terms and Conditions</span>
                </a>
              </Link>
            </li>
          </ul>
          <p>
            <span>
              Customer feedback is vital to us to ensure that we are offering a high standard of
              training possible. We welcome all comments whether good or bad and thank all our
              customers for taking time to communicate with us.{" "}
            </span>
          </p>
          <p>
            <strong>
              If you want to submit any feedback, please share it at{" "}
              <a href="https://www.whizlabs.com/forums/" target="_blank" rel="noopener">
                https://www.whizlabs.com/forums/
              </a>
            </strong>
          </p>
        </div>
      </div>
    </div>
  </>
);

export default ProgramGuarantee;

export async function getServerSideProps() {
  const seoHomePageData = {
    seoPageType: "learningProgram",
    title: "Our Learning Programs Guarantee - Whizlabs",
    metaTags: [
      { name: "facebook-domain-verification", property: "", content: "twh401qzi7r7o3n227q4sg3hghbpzh" },
      { name: "title", property: "", content: "Our Learning Programs Guarantee - Whizlabs" },
      {
        name: "description",
        property: "",
        content:
          "Whizlabs online certification training courses and practice tests come with 100% satisfaction guarantee and 100% unconditional money back guarantee. Check this page to know more.",
      },
      { name: "keywords", property: "", content: "learning programs guarantee" },
      { name: "", property: "og:locale", content: "en_US" },
      { name: "", property: "og:type", content: "website" },
      { name: "", property: "og:title", content: "Our Learning Programs Guarantee - Whizlabs" },
      {
        name: "",
        property: "og:description",
        content:
          "Whizlabs online certification training courses and practice tests come with 100% satisfaction guarantee and 100% unconditional money back guarantee. Check this page to know more.",
      },
      { name: "", property: "og:url", content: "https://www.whizlabs.com/our-learning-programs-guarantee/" },
      { name: "", property: "og:site_name", content: "Whizlabs" },
      {
        name: "",
        property: "og:image",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acd49dd883f",
      },
      { name: "", property: "fb:app_id", content: "502194103558420" },
      { name: "", property: "og:image:width", content: "500" },
      { name: "", property: "og:image:height", content: "500" },
      { name: "twitter:card", property: "", content: "summary" },
      {
        name: "twitter:description",
        property: "",
        content:
          "Whizlabs online certification training courses and practice tests come with 100% satisfaction guarantee and 100% unconditional money back guarantee. Check this page to know more.",
      },
      { name: "twitter:title", property: "", content: "Our Learning Programs Guarantee - Whizlabs" },
      { name: "twitter:site", property: "", content: "@whizlabs" },
      {
        name: "twitter:image",
        property: "",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acd49dd8887",
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
