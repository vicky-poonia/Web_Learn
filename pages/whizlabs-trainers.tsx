import { ContactUsAction } from "@/components/import";
import Head from "next/head";

const PartnerWithUs = (seoHomePageData) => (
  <>
    {/* <Head>
      <title>Whizlabs Trainers | Whizlabs</title>

      <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />

      <meta name="title" content="Whizlabs Trainers - Whizlabs" />
      <meta
        name="description"
        content="Are you a certified technology enthusiast with a passion to share your knowledge with others? Become a Whizlabs trainer and help candidates in their certification preparation."
      />
      <meta name="keywords" content="Whizlabs Trainers" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Whizlabs Trainers - Whizlabs" />
      <meta
        property="og:description"
        content="Are you a certified technology enthusiast with a passion to share your knowledge with others? Become a Whizlabs trainer and help candidates in their certification preparation."
      />
      <meta property="og:url" content="https://www.whizlabs.com/whizlabs-trainers/" />
      <meta property="og:site_name" content="Whizlabs" />
      <meta
        property="og:image"
        content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ade62202700"}
      />
      <meta property="fb:app_id" content="502194103558420" />
      <meta property="og:image:width" content="500" />
      <meta property="og:image:height" content="500" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:description"
        content="Are you a certified technology enthusiast with a passion to share your knowledge with others? Become a Whizlabs trainer and help candidates in their certification preparation."
      />
      <meta name="twitter:title" content="Whizlabs Trainers - Whizlabs" />
      <meta name="twitter:site" content="@whizlabs" />
      <meta
        name="twitter:image"
        content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ade6220275b"}
      />
      <meta name="twitter:creator" content="@whizlabs" />
    </Head> */}
    <div id="content-area" className="terms-use-page">
      <div className="page-content" style={{ paddingBottom: "70px" }}>
        <div className="container-small">
          <div className="page-title">
            <h2>Whizlabs Trainers</h2>
          </div>

          <h3>How does it benefit you?</h3>
          <ul>
            <li>
              You will be joining one of the pioneers in the space of professional certification
              preparation
            </li>
            <li>No need to part away from your regular work</li>
            <li>Opportunity to work and train a truly global audience</li>
            <li>Earn &lsquo;best in industry&rsquo; remuneration</li>
          </ul>
          <h3>Whizlabs expectation from it&rsquo;s trainers:</h3>
          <ul>
            <li>
              You should have relevant certification Eg. PMP, ACP, CSM, SCJP 7, SCJA 7 etc. with
              very high passing percentage
            </li>
            <li>Prior experience of imparting training with excellent feedback</li>
            <li>Excellent communication skills &ndash; preferably in neutral accent</li>
          </ul>
        </div>
      </div>
    </div>
    <ContactUsAction text={"Give us your contact details, we will contact you back shortly."} />
  </>
);

export default PartnerWithUs;


export async function getServerSideProps() {
  const seoHomePageData = {
    seoPageType: "PartnerWithUs",
    title: "Whizlabs Trainers - Whizlabs",
    metaTags: [
      { name: "facebook-domain-verification", property: "", content: "twh401qzi7r7o3n227q4sg3hghbpzh" },
      { name: "title", property: "", content: "Whizlabs Trainers - Whizlabs" },
      {
        name: "description",
        property: "",
        content:
          "Are you a certified technology enthusiast with a passion to share your knowledge with others? Become a Whizlabs trainer and help candidates in their certification preparation.",
      },
      { name: "keywords", property: "", content: "Whizlabs Trainers" },
      { name: "", property: "og:locale", content: "en_US" },
      { name: "", property: "og:type", content: "website" },
      { name: "", property: "og:title", content: "Whizlabs Trainers - Whizlabs" },
      {
        name: "",
        property: "og:description",
        content:
          "Are you a certified technology enthusiast with a passion to share your knowledge with others? Become a Whizlabs trainer and help candidates in their certification preparation.",
      },
      { name: "", property: "og:url", content: "https://www.whizlabs.com/whizlabs-trainers/" },
      { name: "", property: "og:site_name", content: "Whizlabs" },
      {
        name: "",
        property: "og:image",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ade62202700",
      },
      { name: "", property: "fb:app_id", content: "502194103558420" },
      { name: "", property: "og:image:width", content: "500" },
      { name: "", property: "og:image:height", content: "500" },
      { name: "twitter:card", property: "", content: "summary" },
      {
        name: "twitter:description",
        property: "",
        content:
          "Are you a certified technology enthusiast with a passion to share your knowledge with others? Become a Whizlabs trainer and help candidates in their certification preparation.",
      },
      { name: "twitter:title", property: "", content: "Whizlabs Trainers - Whizlabs" },
      { name: "twitter:site", property: "", content: "@whizlabs" },
      {
        name: "twitter:image",
        property: "",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ade6220275b",
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