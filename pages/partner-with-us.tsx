import Link from "next/link";
import Image from "next/image";
import { ContactUsAction } from "@/components/import";
import Head from "next/head";

const PartnerWithUs = (seoHomePageData) => (
  <>
    {/* <Head>
      <title>Partner with Us | Whizlabs</title>

      <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />

      <meta name="title" content="Partner with Us - Whizlabs" />
      <meta
        name="description"
        content="Whizlabs Associate&#039;s program gives an opportunity to the individuals and organizations to partner with us to sell our products, become a trainer or join as a content writer."
      />
      <meta name="keywords" content="Partner with Us" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Partner with Us - Whizlabs" />
      <meta
        property="og:description"
        content="Whizlabs Associate&#039;s program gives an opportunity to the individuals and organizations to partner with us to sell our products, become a trainer or join as a content writer."
      />
      <meta property="og:url" content="https://www.whizlabs.com/partner-with-us/" />
      <meta property="og:site_name" content="Whizlabs" />
      <meta
        property="og:image"
        content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acb830d0173"}
      />
      <meta property="fb:app_id" content="502194103558420" />
      <meta property="og:image:width" content="500" />
      <meta property="og:image:height" content="500" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:description"
        content="Whizlabs Associate&#039;s program gives an opportunity to the individuals and organizations to partner with us to sell our products, become a trainer or join as
       a content writer."
      />
      <meta name="twitter:title" content="Partner with Us - Whizlabs" />
      <meta name="twitter:site" content="@whizlabs" />
      <meta
        name="twitter:image"
        content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acb830d01bb"}
      />
      <meta name="twitter:creator" content="@whizlabs" />
    </Head> */}
    <div className="parner-banner-block">
      <div className="container-small">
        <div className="left">
          <div className="title">Partner with Us</div>
        </div>
        <div className="right">
          <figure>
            <img
              width={620}
              height={360}
              className="img-full"
              src="/images/partner-banner-graphics.svg"
              alt=""
            />
          </figure>
        </div>
      </div>
    </div>

    {/* <!-- content area part -->  */}
    <div id="content-area" className="partner-with-us">
      {/* <!-- associates-block --> */}
      <div className="associates-block">
        <div className="container-small">
          <div className="left">
            <h2>
              <strong>Whizlabs</strong>Associates Program
            </h2>
            <p>
              Whizlabs Associates program is an initiative to partner with individuals and
              organizations who are interested in selling Whizlabs products.
            </p>
            <span>i.e. Exam Simulators and Self Study Training courses.</span>
          </div>
          <div className="right">
            <p>
              Whizlabs Associates are independent companies/individuals working to solve everyday
              business problems. To enhance opportunities for individuals, medium and small business
              customers, and/or training institutes, Whizlabs brings a partner program that is not
              only helpful to build sales but also a convenient revenue-generating source for our
              associates.
            </p>
            <p>
              Whizlabs Partners are provided with Whizlabs Product Licenses for various purposes
              such as testing, marketing, training, and support. They also have access to
              pre-release product information, sales, and marketing resources. The associates can
              communicate with Whizlabs staff for any concern at any time.
            </p>
            <p>
              To become a member of Whizlabs Associates Program all you need involves trust in our
              products, a medium, and willingness to sell the products. Whizlabs Associates Programs
              are FREE to join, easy to implement, and suitable for individuals/organizations with
              diverse resources and/or job profiles.
            </p>
          </div>
        </div>
      </div>

      {/* <!-- participation-types --> */}
      <div className="participation-types">
        <div className="type type1">
          <div className="container-small">
            <div className="head">
              <h3>Types of Participation</h3>
              <p>
                We are looking for partners to work with us in providing certification training
                courses to professionals worldwide
              </p>
            </div>
            <div className="block-group">
              <div className="left-block">
                <h4>
                  Become Whizlabs
                  <br />
                  <strong>Affiliate Partner</strong> and help us to promote our offerings!
                </h4>
                <Link href="/whizlabs-affiliate-program/">
                  <a className="btn">Join Now</a>
                </Link>
              </div>
              <div className="right-block">
                <figure>
                  <img
                    width={440}
                    height={430}
                    className="img-full"
                    src="/images/partner-type-graphic1.svg"
                    alt=""
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
        <div className="type type2">
          <div className="container-small">
            <div className="block-group">
              <div className="right-block">
                <figure>
                  <img
                    width={440}
                    height={445}
                    className="img-full"
                    src="/images/partner-type-graphic2.svg"
                    alt=""
                  />
                </figure>
              </div>
              <div className="left-block">
                <h4>
                  Become
                  <br />
                  <strong>Whizlabs Trainer</strong> & lead our live online training programs!
                </h4>
                <Link href="/whizlabs-trainers/">
                  <a className="btn">Apply Now</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="type type3">
          <div className="container-small">
            <div className="block-group">
              <div className="left-block">
                <h4>
                  Join Whizlabs as a<br />
                  <strong>Content Writer</strong> & create great content for our products.
                </h4>
                <Link href="/whizlabs-content-writers/">
                  <a className="btn">Apply Now</a>
                </Link>
              </div>
              <div className="right-block">
                <figure>
                  <img
                    width={440}
                    height={395}
                    className="img-full"
                    src="/images/partner-type-graphic3.svg"
                    alt=""
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- upgradation-block --> */}
      <ContactUsAction />
    </div>
  </>
);

export default PartnerWithUs;

export async function getServerSideProps() {
  const seoHomePageData = {
    seoPageType: "partnerPage", 
    title: "Partner with Us - Whizlabs",
    metaTags: [
      { name: "facebook-domain-verification", property: "", content: "twh401qzi7r7o3n227q4sg3hghbpzh" },
      { name: "title", property: "", content: "Partner with Us - Whizlabs" },
      {
        name: "description",
        property: "",
        content:
          "Whizlabs Associate's program gives an opportunity to the individuals and organizations to partner with us to sell our products, become a trainer or join as a content writer.",
      },
      { name: "keywords", property: "", content: "Partner with Us" },
      { name: "", property: "og:locale", content: "en_US" },
      { name: "", property: "og:type", content: "website" },
      { name: "", property: "og:title", content: "Partner with Us - Whizlabs" },
      {
        name: "",
        property: "og:description",
        content:
          "Whizlabs Associate's program gives an opportunity to the individuals and organizations to partner with us to sell our products, become a trainer or join as a content writer.",
      },
      { name: "", property: "og:url", content: "https://www.whizlabs.com/partner-with-us/" },
      { name: "", property: "og:site_name", content: "Whizlabs" },
      {
        name: "",
        property: "og:image",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acb830d0173",
      },
      { name: "", property: "fb:app_id", content: "502194103558420" },
      { name: "", property: "og:image:width", content: "500" },
      { name: "", property: "og:image:height", content: "500" },
      { name: "twitter:card", property: "", content: "summary" },
      {
        name: "twitter:description",
        property: "",
        content:
          "Whizlabs Associate's program gives an opportunity to the individuals and organizations to partner with us to sell our products, become a trainer or join as a content writer.",
      },
      { name: "twitter:title", property: "", content: "Partner with Us - Whizlabs" },
      { name: "twitter:site", property: "", content: "@whizlabs" },
      {
        name: "twitter:image",
        property: "",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acb830d01bb",
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