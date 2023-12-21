import Head from "next/head";

const Webinar = (seoHomePageData) => {
  return (
    <>
      {/* <Head>
        <title>Whizlabs Webinars | Whizlabs</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
      </Head> */}
      {/* webinar Banner */}
      <div className="webinars-banner">
        <div className="container-small">
          <div className="left-part">
            <h1 className="title">Webinars Series</h1>
            <p className="caption">
              Meet thought leaders in Cloud, Security, DevOps, Data Engineering, and more.
            </p>
          </div>
          <div className="right-part">
            <img className="img-full" src="/images/webinar-banner-img.png" alt="" />
          </div>
        </div>
      </div>

      {/* content area */}
      <div id="content-area" className="webinars-page">
        <div className="page-content">
          <div className="container-small">
            <div className="webinar-listing">
              <div className="upcoming-webinars">
                <div className="list-item">
                  <a className="img-block" href="/webinars/register">
                    <img className="img-full" src="/images/webinar-img12x.jpg" alt="" />
                  </a>
                  <div className="content">
                    <a className="title" href="/webinars/register">
                      Introduction to AWS Technical Essential for Developers
                    </a>
                    <div className="date-time-block">
                      <label className="label-upcoming">Upcoming</label>
                      <div className="date">
                        <i className="icon icon-font-calendar"></i>
                        <span>Aug 01, 2020 at 11 AM IST</span>
                      </div>
                    </div>
                    <p className="caption">
                      Discover how to train your workforce at scale and measure their success by
                      combining content consumption with measured quantifiable skills.
                    </p>
                    <a className="btn btn-watch" href="/webinars/register">
                      Register Now
                    </a>
                  </div>
                </div>
              </div>
              <div className="recorded-webinars">
                <div className="section-head">
                  <div className="title">
                    Our recorded <strong>Webinars</strong>
                  </div>
                  <div className="filterby-block">
                    <div className="box-title">Filter By</div>
                    <div className="custom-selectbox">
                      <select>
                        <option>All Categories</option>
                        <option>Categories 1</option>
                        <option>Categories 2</option>
                        <option>Categories 3</option>
                        <option>Categories 4</option>
                        <option>Categories 5</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="items-group">
                  <div className="list-item">
                    <a className="img-block" href="/webinars/register">
                      <img className="img-full" src="/images/webinar-img22x.jpg" alt="" />
                    </a>
                    <div className="content">
                      <a className="title" href="/webinars/register">
                        AWS, Azure, and Google Cloud: Demystifying Multi-Cloud for Your Organization
                      </a>
                      <div className="date-time-block">
                        <div className="date">
                          <i className="icon icon-font-calendar"></i>
                          <span>Aug 01, 2020</span>
                        </div>
                        <div className="time">
                          <i className="icon icon-font-play"></i>
                          <span>1:30:00</span>
                        </div>
                      </div>
                      <p className="caption">
                        Discover how to train your workforce at scale and measure their success by
                        combining content consumption with measured quantifiable skills.
                      </p>
                      <a className="btn btn-watch" href="/webinars/register">
                        Watch the Webinar
                      </a>
                    </div>
                  </div>
                  <div className="list-item">
                    <a className="img-block" href="/webinars/register">
                      <img className="img-full" src="/images/webinar-img32x.jpg" alt="" />
                    </a>
                    <div className="content">
                      <a className="title" href="/webinars/register">
                        An Introduction to Serverless with a Deep Dive on Container Services in AWS
                      </a>
                      <div className="date-time-block">
                        <div className="date">
                          <i className="icon icon-font-calendar"></i>
                          <span>July 25, 2020</span>
                        </div>
                        <div className="time">
                          <i className="icon icon-font-play"></i>
                          <span>1:10:00</span>
                        </div>
                      </div>
                      <p className="caption">
                        Discover how to train your workforce at scale and measure their success by
                        combining content consumption with measured quantifiable skills.
                      </p>
                      <a className="btn btn-watch" href="/webinars/register">
                        Watch the Webinar
                      </a>
                    </div>
                  </div>
                  <div className="list-item">
                    <a className="img-block" href="/webinars/register">
                      <img className="img-full" src="/images/webinar-img42x.jpg" alt="" />
                    </a>
                    <div className="content">
                      <a className="title" href="/webinars/register">
                        Acing the AWS Solutions Architect Associate Certification
                      </a>
                      <div className="date-time-block">
                        <div className="date">
                          <i className="icon icon-font-calendar"></i>
                          <span>July 15, 2020</span>
                        </div>
                        <div className="time">
                          <i className="icon icon-font-play"></i>
                          <span>45:15</span>
                        </div>
                      </div>
                      <p className="caption">
                        Discover how to train your workforce at scale and measure their success by
                        combining content consumption with measured quantifiable skills.
                      </p>
                      <a className="btn btn-watch" href="/webinars/register">
                        Watch the Webinar
                      </a>
                    </div>
                  </div>
                  <div className="list-item">
                    <a className="img-block" href="/webinars/register">
                      <img className="img-full" src="/images/webinar-img52x.jpg" alt="" />
                    </a>
                    <div className="content">
                      <a className="title" href="/webinars/register">
                        AWS Cost Savings: Ending Decision Paralysis When Trying to Optimize Spend
                        and Savings Plans
                      </a>
                      <div className="date-time-block">
                        <div className="date">
                          <i className="icon icon-font-calendar"></i>
                          <span>Jun 20, 2020</span>
                        </div>
                        <div className="time">
                          <i className="icon icon-font-play"></i>
                          <span>1:18:00</span>
                        </div>
                      </div>
                      <p className="caption">
                        Discover how to train your workforce at scale and measure their success by
                        combining content consumption with measured quantifiable skills.
                      </p>
                      <a className="btn btn-watch" href="/webinars/register">
                        Watch the Webinar
                      </a>
                    </div>
                  </div>
                  <div className="list-item">
                    <a className="img-block" href="/webinars/register">
                      <img className="img-full" src="/images/webinar-img62x.jpg" alt="" />
                    </a>
                    <div className="content">
                      <a className="title" href="/webinars/register">
                        Microsoft Ignite 2019: Get the Cloud Academy Post-Show Lowdown
                      </a>
                      <div className="date-time-block">
                        <div className="date">
                          <i className="icon icon-font-calendar"></i>
                          <span>Jun 5, 2020</span>
                        </div>
                        <div className="time">
                          <i className="icon icon-font-play"></i>
                          <span>45:00</span>
                        </div>
                      </div>
                      <p className="caption">
                        Discover how to train your workforce at scale and measure their success by
                        combining content consumption with measured quantifiable skills.
                      </p>
                      <a className="btn btn-watch" href="/webinars/register">
                        Watch the Webinar
                      </a>
                    </div>
                  </div>
                  <div className="list-item">
                    <a className="img-block" href="/webinars/register">
                      <img className="img-full" src="/images/webinar-img42x.jpg" alt="" />
                    </a>
                    <div className="content">
                      <a className="title" href="/webinars/register">
                        Acing the AWS Solutions Architect Associate Certification
                      </a>
                      <div className="date-time-block">
                        <div className="date">
                          <i className="icon icon-font-calendar"></i>
                          <span>July 15, 2020</span>
                        </div>
                        <div className="time">
                          <i className="icon icon-font-play"></i>
                          <span>45:15</span>
                        </div>
                      </div>
                      <p className="caption">
                        Discover how to train your workforce at scale and measure their success by
                        combining content consumption with measured quantifiable skills.
                      </p>
                      <a className="btn btn-watch" href="/webinars/register">
                        Watch the Webinar
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pagination-block">
              <a className="arrow disabled back-arrow icon-font-pagination-arrow" href="#"></a>
              <ul>
                <li className="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">...</a>
                </li>
                <li>
                  <a href="#">30</a>
                </li>
              </ul>
              <a className="arrow right-arrow icon-font-pagination-arrow" href="#"></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Webinar;

export async function getServerSideProps() {
  const seoHomePageData = {
    seoPageType: "webinar", // This should be changed to reflect the actual page type
    title: "Whizlabs Webinars | Whizlabs",
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
    }, // will be passed to the page component as props
  };
}