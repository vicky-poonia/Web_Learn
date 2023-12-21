import Link from "next/link";
import Head from "next/head";
import StarRating from "../plugins/StarRating";

const FTLibraryBlock = ({ pageData, catList }) => {
  return (
    <>
      <Head>
        <title>Free Course Library | Whizlabs</title>
        <meta name="robots" content="noindex" />
        <meta name="robots" content="nofollow" />
        <meta httpEquiv="cache-control" content="no-cache" />
        <meta httpEquiv="expires" content="0" />
        <meta httpEquiv="pragma" content="no-cache" />
      </Head>
      <div className="library-banner">
        <div className="container">
          <div className="content">
            <div className="left">
              <div className="title">Get Started With Your Certification Preparation </div>
              <div className="free-txt">FOR FREE</div>
              <p>
                Start your preparation now with the industry pioneers and build a dynamic career in
                Cloud Computing.
              </p>
              <a className="btn" href="#amazon">
                Start Now
              </a>
            </div>
            <div className="right">
              <figure>
                <img className="img-full" src="/images/library-banner.png" alt="" />
              </figure>
            </div>
          </div>
          <div className="click-jump-block">
            <div className="txt">
              Click and Jump to the <span>Courses</span>
            </div>
            <div className="img-group">
              {catList.includes(1) && (
                <figure>
                  <a href="#amazon">
                    <img className="img-full" src="/images/aws.svg" alt="" />
                  </a>
                </figure>
              )}
              {catList.includes(2) && (
                <figure>
                  <a href="#microsoft">
                    <img className="img-full" src="/images/microsoft.svg" alt="" />
                  </a>
                </figure>
              )}
              {catList.includes(3) && (
                <figure>
                  <a href="#google">
                    <img className="img-full" src="/images/goggle.svg" alt="" />
                  </a>
                </figure>
              )}
              {catList.includes(4) && (
                <figure>
                  <a href="#devOps">
                    <img className="img-full" src="/images/devops.svg" alt="" />
                  </a>
                </figure>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <!-- content area part -->  */}
      <div id="content-area" className="ft-library-page">
        {/* <!-- amazon-web-services-section --> */}
        {catList.includes(1) && (
          <div className="courses-section amazon" id="amazon">
            <div className="container">
              <div className="caption">
                <div className="title">Amazon Web Services</div>
                <p>
                  Benchmark your AWS knowledge with one or more of the highly demanded Amazon Web
                  Services (AWS) certifications.
                </p>
              </div>
              <div className="list-group">
                {pageData.map((c) => c.category === 1 && <ListItem course={c} />)}
              </div>
            </div>
          </div>
        )}
        {/* <!-- microsoft-certifications-section --> */}
        {catList.includes(2) && (
          <div className="courses-section microsoft" id="microsoft">
            <div className="container">
              <div className="caption">
                <div className="title">Microsoft Azure Certifications</div>
                <p>
                  With the Microsoft Azure certifications bring your cloud career one level up with
                  the world’s leading online learning platform.
                </p>
              </div>
              <div className="list-group">
                {pageData.map((c) => c.category === 2 && <ListItem course={c} />)}
              </div>
            </div>
          </div>
        )}
        {/* <!-- google-certifications-section --> */}
        {catList.includes(3) && (
          <div className="courses-section" id="google">
            <div className="container">
              <div className="caption">
                <div className="title">Google Cloud Certifications</div>
                <p>
                  Get certified with one of the Google Cloud Certifications, and demonstrate your
                  expertise on Google Cloud Platform (GCP).
                </p>
              </div>
              <div className="list-group">
                {pageData.map((c) => c.category === 3 && <ListItem course={c} />)}
              </div>
            </div>
          </div>
        )}
        {/* <!-- devOps-certifications-section --> */}
        {catList.includes(4) && (
          <div className="courses-section microsoft" id="devOps">
            <div className="container">
              <div className="caption">
                <div className="title">DevOps Certifications</div>
                <p>
                  Validate and demonstrate your skills of using DevOps tools with one of the most
                  demanded DevOps certifications.
                </p>
              </div>
              <div className="list-group">
                {pageData.map((c) => c.category === 4 && <ListItem course={c} />)}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const ListItem = ({ course }) => (
  <div className="list-item">
    <div className="course-img">
      <Link href={"/" + course.page_slug}>
        <a target="_blank"> 
          <figure>
            <img
              className="img-full"
              style={{ borderRadius: "6px" }}
              src={
                process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                course.course?.featured_image?.replace("media/", "")
              }
              alt={course.page_name}
            />
          </figure>
        </a>
      </Link>
    </div>
    <div className="course-details">
      <div className="top">
        <Link href={"/" + course.page_slug}>
          <a target="_blank" className="title">{course.page_name}</a>
        </Link>
        <div className="highlights">
          <div className="box">
            <i className="icon icon-font-note2"></i>
            <span>{course.web_counts.ftQuestionCount} Free Questions</span>
          </div>
          <div className="box">
            <i className="icon icon-font-graduation-cap"></i>
            <span>
              {new Intl.NumberFormat("en-IN").format(course.web_counts.learners_count)} Learners
            </span>
          </div>
        </div>
      </div>
      <div className="bottom">
        <StarRating
          avgRating={course.ratings.overall_rating}
          totalRating={course.ratings.rating}
          starBox={true}
          isSingle={true}
          isSamp={true}
        >
          <div className="try-free">
            <Link href={"/" + course.page_slug}>
              <a target="_blank">
                Try Free Test Now! <i className="icon icon-font-arrow-right"></i>
              </a>
            </Link>
          </div>
        </StarRating>
      </div>
    </div>
  </div>
);

export default FTLibraryBlock;
