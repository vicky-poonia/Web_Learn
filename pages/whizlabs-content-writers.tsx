import { ContactUsAction } from "@/components/import";
import Head from "next/head";

const PartnerWithUs = (seoHomePageData) => (
  <>
    {/* <Head>
      <title>Whizlabs Content Writers | Whizlabs</title>

      <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />

      <meta name="title" content="Whizlabs Content Writers - Whizlabs" />
      <meta
        name="description"
        content="Are you skilled enough and have a passion for writing? If yes, submit your application with your domain and experience, we&#039;ll connect with you."
      />
      <meta name="keywords" content="Content Writers, writers" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Whizlabs Content Writers - Whizlabs" />
      <meta
        property="og:description"
        content="Are you skilled enough and have a passion for writing? If yes, submit your application with your domain and experience, we&#039;ll connect with you."
      />
      <meta property="og:url" content="https://www.whizlabs.com/whizlabs-content-writers/" />
      <meta property="og:site_name" content="Whizlabs" />
      <meta
        property="og:image"
        content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ade756e70f6"}
      />
      <meta property="fb:app_id" content="502194103558420" />
      <meta property="og:image:width" content="500" />
      <meta property="og:image:height" content="500" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:description"
        content="Are you skilled enough and have a passion for writing? If yes, submit your application with your domain and experience, we&#039;ll connect with you."
      />
      <meta name="twitter:title" content="Whizlabs Content Writers - Whizlabs" />
      <meta name="twitter:site" content="@whizlabs" />
      <meta
        name="twitter:image"
        content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ade756e7153"}
      />
      <meta name="twitter:creator" content="@whizlabs" />
    </Head> */}
    <div id="content-area" className="terms-use-page">
      <div className="page-content" style={{ paddingBottom: "70px" }}>
        <div className="container-small">
          <div className="page-title">
            <h2>Whizlabs Content Writers</h2>
          </div>
          <p>
            <span>
              <strong>
                <em>Are you</em>
              </strong>
              <strong>
                <em>
                  {" "}
                  expertise in any particular domain of technology with a passion for writing? If
                  yes, you are welcome to join our team of subject matter experts and certified
                  professionals to create high-quality content.
                </em>
              </strong>
              <br />
            </span>
          </p>
          <h4>Whizlabs’ expectations from its trainers:</h4>
          <ul>
            <li style={{ fontWeight: 400 }}>
              <span>
                You should have relevant certification Eg. PMP, ACP, CSM, SCJP 7, SCJA 7, AWS,
                Azure, Google Cloud, Big Data, Linux etc. with a good passing percentage
              </span>
            </li>
            <li style={{ fontWeight: 400 }}>
              <span>Prior experience of writing high-quality content with excellent feedback</span>
            </li>
            <li style={{ fontWeight: 400 }}>
              <span>Excellent writing skills in terms of unique content</span>
            </li>
          </ul>

          <h4>How does it benefit you?</h4>
          <ul>
            <li style={{ fontWeight: 400 }}>
              <span>
                You will be joining one of the pioneers in the space of professional certification
                preparation
              </span>
            </li>
            <li style={{ fontWeight: 400 }}>
              <span>No need to part away from your regular work</span>
            </li>
            <li style={{ fontWeight: 400 }}>
              <span>Opportunity to share your content with global audience</span>
            </li>
            <li style={{ fontWeight: 400 }}>
              <span>Earn best in industry; remuneration</span>
            </li>
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
    seoPageType: "contentWriterPage",
    title: "Whizlabs Content Writers - Whizlabs",
    metaTags: [
      { name: "facebook-domain-verification", property: "", content: "twh401qzi7r7o3n227q4sg3hghbpzh" },
      { name: "title", property: "", content: "Whizlabs Content Writers - Whizlabs" },
      {
        name: "description",
        property: "",
        content:
          "Are you skilled enough and have a passion for writing? If yes, submit your application with your domain and experience, we'll connect with you.",
      },
      { name: "keywords", property: "", content: "Content Writers, writers" },
      { name: "", property: "og:locale", content: "en_US" },
      { name: "", property: "og:type", content: "website" },
      { name: "", property: "og:title", content: "Whizlabs Content Writers - Whizlabs" },
      {
        name: "",
        property: "og:description",
        content:
          "Are you skilled enough and have a passion for writing? If yes, submit your application with your domain and experience, we'll connect with you.",
      },
      { name: "", property: "og:url", content: "https://www.whizlabs.com/whizlabs-content-writers/" },
      { name: "", property: "og:site_name", content: "Whizlabs" },
      {
        name: "",
        property: "og:image",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ade756e70f6",
      },
      { name: "", property: "fb:app_id", content: "502194103558420" },
      { name: "", property: "og:image:width", content: "500" },
      { name: "", property: "og:image:height", content: "500" },
      { name: "twitter:card", property: "", content: "summary" },
      {
        name: "twitter:description",
        property: "",
        content:
          "Are you skilled enough and have a passion for writing? If yes, submit your application with your domain and experience, we'll connect with you.",
      },
      { name: "twitter:title", property: "", content: "Whizlabs Content Writers - Whizlabs" },
      { name: "twitter:site", property: "", content: "@whizlabs" },
      {
        name: "twitter:image",
        property: "",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ade756e7153",
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
