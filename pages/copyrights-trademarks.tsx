import Head from "next/head";

const CopyRights = (seoHomePageData) => (
  <>
    {/* <Head>
      <title>Copyrights & Trademarks | Whizlabs</title>

      <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
    </Head> */}
    <div id="content-area" className="terms-use-page">
      <div className="page-content">
        <div className="container-small">
          <div className="page-title">
            <h2>Copyrights & Trademarks</h2>
          </div>
          <h3>
            <strong>Copyrights</strong>
          </h3>
          <ul>
            <li>
              Whizlabs website, and all that it entails including all products, applications,
              software, images, study guides, articles and other documentation are a Copyright (c)
              Whizlabs Software Pvt. Ltd. 2014. All rights reserved.
            </li>
            <li>
              Whizlabs has independently developed all the content presented on its site and the
              same is pertaining to high standards and conforming to ISO 9001:2000 Standard.
            </li>
            <li>
              All Whizlabs Content, Product, and Materials are not sponsored by, endorsed by, and
              affiliated, implied or otherwise, with any other company except those partnerships
              explicitly announced at www.whizlabs.com.
            </li>
          </ul>
          <h3>
            <strong>Trademarks</strong>
          </h3>
          <ul>
            <li>
              Java and all Java-based marks are the trademarks or registered trademarks of Sun
              Microsystems, Inc. in the U.S. and other countries.
            </li>
            <li>
              All registered trademarks, logos or servicemarks, mentioned within this document or
              Whizlabs website, product, or content are trademarks of their respective owners.
            </li>
            <li>
              The use of any acronym or term on or within any Whizlabs product, content, website or
              other documentation should not be considered as impinging on the validity, ownership,
              or as a challenge to any trademark, logo or servicemark.
            </li>
            <li>
              All possible efforts have been made to acknowledge any third party trademark and
              servicemark with applicable Whizlabs Products, however Whizlabs, its staff, its
              management, nor the independent Contractor Author can attest to the accuracy of that
              information.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default CopyRights;

export async function getServerSideProps() {
  const seoHomePageData = {
    seoPageType: "corporateTrainingPage",
    title: "Copyrights & Trademarks | Whizlabs",
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
    },
  };
}