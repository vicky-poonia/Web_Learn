import Head from "next/head";
import React from "react";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Career = ({ jobData, seoHomePageData }) => {
  return (
    <>
      <React.Fragment>
        {/* <Head>
          <title>Career | Whizlabs</title>
        </Head> */}
        {/* <!-- banner-part --> */}
        <div
          className="careers-banner"
          style={{
            background: "#FFF4F2 url('/images/carrers-banner-patten.svg') center",
            backgroundSize: "cover",
          }}
        >
          <div className="container-small">
            <div className="content">
              <span>Careers</span>
              <h1>Let’s start something big together.</h1>
            </div>
          </div>
        </div>

        {/* <!-- content area part -->  */}
        <div id="content-area" className="careers-page">
          <div className="technical-block">
            <div className="container-small">
              <figure>
                <img className="img-full" src="/images/technical-block-img2x.jpg" alt="" />
              </figure>
              <div className="heading">
                <h2>
                  Our roots are technical, our passion is contagious, and our people are the best.
                </h2>
                <span>Sounds interesting? Join the family!</span>
              </div>

              <div className="job-position">
                <div className="position-heading">
                  <div className="title">Open Positions</div>
                  <div className="total-position">{jobData.length} Job openings</div>
                </div>
                {jobData.length > 0 ? (
                  <div className="job-list-block">
                    {jobData.map((job) => (
                      <div className="block" key={job.id}>
                        <div className="left">
                          <div className="job-title">{job?.position_title}</div>
                          <span>
                            {job.max_exp == null ? <>{job.min_exp}</> :<>{job.min_exp} - {job.max_exp} Years Experience</>}
                            
                          </span>
                        </div>
                        <div className="right">
                          <a className="link-more-info" href={"/careers/" + job.slug} target="_blank">
                            <span>more info</span>
                            <i className="icon icon-font-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="job-list-block">
                    <h5 style={{ textAlign: "center", margin: "1.5em 0" }}>
                      No open positions available right now. Please check back later.
                    </h5>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="culture-values-block">
            <div className="container-small">
              <div className="left">
                <h3>Culture & Values</h3>
                <p>
                  Our values and culture are the identity of our company and define what we are. The
                  management has finalized a set of values to help employees in achieving their
                  goals as well as the company’s objectives.{" "}
                </p>
              </div>
              <div className="right">
                <ul style={{listStyle:"none"}}>
                  <li>
                    <div className="title">Quality</div>
                    <span>What we do, we do the best</span>
                  </li>
                  <li>
                    <div className="title">Passion</div>
                    <span>Committed to success by brain and heart</span>
                  </li>
                  <li>
                    <div className="title">Accountability</div>
                    <span>If it’s to be, it’s up to me</span>
                  </li>
                  <li>
                    <div className="title">Leadership</div>
                    <span>Courage to lead by helping others</span>
                  </li>
                </ul>
                <ul style={{listStyle:"none"}}>
                  <li>
                    <div className="title">Collaboration</div>
                    <span>Collecting all genius all together</span>
                  </li>
                  <li>
                    <div className="title">Diversity</div>
                    <span>Assortment of culture with a common goal</span>
                  </li>
                  <li>
                    <div className="title">Integrity</div>
                    <span>Being real and authentic</span>
                  </li>
                  <li>
                    <div className="title">Customer Success</div>
                    <span>Making customer happy and satisfied</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="perks-benifits-block">
            <div className="container-small">
              <div className="img-group">
                <figure>
                  <img className="img-full" src="/images/carrers-img12x.jpg" alt="" />
                </figure>
                <figure>
                  <img className="img-full" src="/images/carrers-img22x.jpg" alt="" />
                </figure>
                <figure>
                  <img className="img-full" src="/images/carrers-img32x.jpg" alt="" />
                </figure>
                <figure>
                  <img className="img-full" src="/images/carrers-img42x.jpg" alt="" />
                </figure>
              </div>
              <div className="heading">
                <h4>Perks and Benefits</h4>
                <p>
                  Your performance is outstanding only when you are satisfied. We have made our
                  Whizlabs family with love and support; to see our family more than happy, we
                  provide them a home-like environment at work. To support you, we provide:
                </p>
              </div>
              <div className="block-group">
                <div className="block">
                  <figure>
                    <img className="img-full" src="/images/compansastion.svg" alt="" />
                  </figure>
                  <div className="title">Employee recognition and rewards</div>
                  <p>Recognizing and rewarding employees for their hard work and achievements can improve employee morale and motivation. Consider offering bonuses, promotions, and other incentives to show your appreciation.</p>
                </div>
                <div className="block">
                  <figure>
                    <img className="img-full" src="/images/helth-insurance.svg" alt="" />
                  </figure>
                  <div className="title">Health Insurance</div>
                  <p>Whizlabs have health insurance for you and your kids.</p>
                </div>
                <div className="block">
                  <figure>
                    <img className="img-full" src="/images/insectives-bonus.svg" alt="" />
                  </figure>
                  <div className="title">Incentives and Bonus</div>
                  <p>We encourage people hard work through incentives and bonus. </p>
                </div>
                <div className="block">
                  <figure>
                    <img className="img-full" src="/images/take-off-policy.svg" alt="" />
                  </figure>
                  <div className="title">Vacation, Take-off policy</div>
                  <p>We always believe in a healthy work/life balance. Our company offers paid vacation, and outings, for full-time employees.</p>
                </div>
                <div className="block">
                  <figure>
                    <img className="img-full" src="/images/daily-food.svg" alt="" />
                  </figure>
                  <div className="title">Daily Food Allowance</div>
                  <p>No one can work with an empty stomach! Right? We offer healthy home-cooked-style meals for free!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </>
  );
};

export const getServerSideProps = async () => {
  let jobData = [];
  const seoHomePageData = {
    seoPageType: "career",
    title: "Career | Whizlabs",
    metaTags: [
      { name: "", property: "", content: "" },
    ],
    };
  try {
    let positionResponse = await axios.get(baseUrl + "/web/career-positions");
    if (positionResponse && positionResponse.data && positionResponse.data.data) {
      jobData = positionResponse.data.data;
      jobData.sort((a,b)=> {
        return a.order_by - b.order_by
      })
    }
    
  } catch (error) {
    console.error(error);
  }
  return {
    props: { jobData, seoHomePageData },
  };
};

export default Career;
