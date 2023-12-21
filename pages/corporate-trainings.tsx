import Head from "next/head";

const CorporateTrainings = (seoHomePageData) => (
  <>
    {/* <Head>
      <title>Whizlabs Corporate Training | Whizlabs</title>

      <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />

      <meta name="title" content="Whizlabs Corporate Training - Whizlabs" />
      <meta
        name="description"
        content="Whizlabs offers best-in-industry, online corporate training solutions to help professional get the skills required to succeed in this IT world. Join us now!"
      />
      <meta name="keywords" content="Corporate Training, Corporate Offering" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Whizlabs Corporate Training - Whizlabs" />
      <meta
        property="og:description"
        content="Whizlabs offers best-in-industry, online corporate training solutions to help professional get the skills required to succeed in this IT world. Join us now!"
      />
      <meta property="og:url" content="https://www.whizlabs.com/corporate-trainings/" />
      <meta property="og:site_name" content="Whizlabs" />
      <meta
        property="og:image"
        content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acbc1740e4b"}
      />
      <meta property="fb:app_id" content="502194103558420" />
      <meta property="og:image:width" content="500" />
      <meta property="og:image:height" content="500" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:description"
        content="Whizlabs offers best-in-industry, online corporate training solutions to help professional get the skills required to succeed in this IT world. Join us now!"
      />
      <meta name="twitter:title" content="Whizlabs Corporate Training - Whizlabs" />
      <meta name="twitter:site" content="@whizlabs" />
      <meta
        name="twitter:image"
        content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acbc1740e90"}
      />
      <meta name="twitter:creator" content="@whizlabs" />
    </Head> */}
    <div id="content-area" className="terms-use-page">
      <div className="page-content">
        <div className="container-small">
          <div className="page-title">
            <h2>Whizlabs Corporate Training</h2>
          </div>
          <blockquote>
            <p>Empower your teams in IT skills with the high-end technology training!</p>
          </blockquote>
          <p>
            Whizlabs offers corporate training in multiple technologies like Cloud Computing (AWS,
            Azure, Google Cloud Platform, Cloud Security), Big Data, Project Management, Agile &amp;
            Scrum, Java, Linux, Networking, and Digital Marketing. With our online training
            solutions, we help professionals to get the skills required to succeed in this IT world.
          </p>
          <h3>Why Whizlabs Corporate Training?</h3>
          <ul>
            <li>
              <strong>Flexible Training Modules:</strong> Choose one of the online training modules
              as per your convenience.
            </li>
            <li>
              <strong>25+ Technology Courses:</strong> Get trained in high-end technologies across
              various technology domains by our experts.
            </li>
            <li>
              <strong>Hands-on Learning:</strong> Collect hands-on experience with our spearhead
              training system.
            </li>
            <li>
              <strong>Delivery by Industry-experts:&nbsp;</strong>Become a technology expert with
              the courses designed and delivered by the industry experts.
            </li>
          </ul>
          <p>
            <em>
              We provide certification study offerings in various disciplines. Our distinctive
              online learning model incorporates online self-study training with a series of
              practice tests wrapped in an exam simulator to prepare candidates for the
              certification exam.
            </em>
          </p>
          <h3>Benefits of Whizlabs Certification Training to Employer</h3>
          <ul>
            <li>
              Gets a competitive advantage as it&rsquo;s easy to market the skills of the certified
              employee
            </li>
            <li>
              Spending on employee&rsquo;s training and development lowers the employee turn-over
            </li>
            <li>
              Results in high productivity; with the certification employee remains updated with the
              latest in the industry
            </li>
            <li>
              Certification acts an endorsement of skills; customers feel more comfortable with
              certified resources
            </li>
          </ul>
          <h3>Benefits of Whizlabs Certification Training to Employee</h3>
          <ul>
            <li>
              Certification gives you a structure to learn and master new skills; thus you become a
              technology expert
            </li>
            <li>
              Certification is one of the major educational milestones in one&rsquo;s career,
              results in improved morale and self-confidence
            </li>
            <li>
              Certification credentials support in establishing oneself as an expert in a given
              field which in turn, helps in career growth
            </li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default CorporateTrainings;

export async function getServerSideProps() {
  const seoHomePageData = {
    seoPageType: "corporateTrainingPage",
    title: "Whizlabs Corporate Training | Whizlabs",
    metaTags: [
      {
        name: "facebook-domain-verification",
        property: "",
        content: "twh401qzi7r7o3n227q4sg3hghbpzh",
      },
      { name: "title", property: "", content: "Whizlabs Corporate Training - Whizlabs" },
      {
        name: "description",
        property: "",
        content:
          "Whizlabs offers best-in-industry, online corporate training solutions to help professional get the skills required to succeed in this IT world. Join us now!",
      },
      { name: "keywords", property: "", content: "Corporate Training, Corporate Offering" },
      { name: "", property: "og:locale", content: "en_US" },
      { name: "", property: "og:type", content: "website" },
      { name: "", property: "og:title", content: "Whizlabs Corporate Training - Whizlabs" },
      {
        name: "",
        property: "og:description",
        content:
          "Whizlabs offers best-in-industry, online corporate training solutions to help professional get the skills required to succeed in this IT world. Join us now!",
      },
      { name: "", property: "og:url", content: "https://www.whizlabs.com/corporate-trainings/" },
      { name: "", property: "og:site_name", content: "Whizlabs" },
      {
        name: "",
        property: "og:image",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acbc1740e4b",
      },
      { name: "", property: "fb:app_id", content: "502194103558420" },
      { name: "", property: "og:image:width", content: "500" },
      { name: "", property: "og:image:height", content: "500" },
      { name: "twitter:card", property: "", content: "summary" },
      {
        name: "twitter:description",
        property: "",
        content:
          "Whizlabs offers best-in-industry, online corporate training solutions to help professional get the skills required to succeed in this IT world. Join us now!",
      },
      { name: "twitter:title", property: "", content: "Whizlabs Corporate Training - Whizlabs" },
      { name: "twitter:site", property: "", content: "@whizlabs" },
      {
        name: "twitter:image",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acbc1740e90",
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
