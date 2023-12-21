import axios from "axios";
import { useEffect } from "react";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Dashboard = ({ data }) => {
  useEffect(() => {
    document.getElementById("wrapper").classList.add("dashboard-page");
  }, []);

  return (
    <>
      <div id="content-area" className="bg-color">
        {/* <!-- sub header --> */}
        <div className="sub-header">
          <div className="container">
            <div className="left">
              <div className="breadcrumbs">
                <ul>
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">Dashboard</a>
                  </li>
                </ul>
              </div>
              <h1>Welcome to Whizlabs, John</h1>
            </div>
          </div>
        </div>
        <div className="my-dashboard">
          <div className="container">
            {/* <!-- info-block --> */}
            <div className="info-group">
              <div className="info">
                <figure>
                  <img className="img-full" src="/images/dashboard-info-img1.svg" alt="" />
                </figure>
                <div className="caption">
                  <strong>{data.UserCourseCount}</strong>
                  <span>My Courses</span>
                </div>
              </div>
              <div className="info">
                <figure>
                  <img className="img-full" src="/images/dashboard-info-img2.svg" alt="" />
                </figure>
                <div className="caption">
                  <strong>{data.UnreadNotifications}</strong>
                  <span>Notifications</span>
                </div>
              </div>
              <div className="info">
                <figure>
                  <img className="img-full" src="/images/dashboard-info-img3.svg" alt="" />
                </figure>
                <div className="caption">
                  <strong>{data.UserNewCoursesCount}</strong>
                  <span>New Courses</span>
                </div>
              </div>
              <div className="info">
                <figure>
                  <img className="img-full" src="/images/dashboard-info-img4.svg" alt="" />
                </figure>
                <div className="caption">
                  <strong>{data.UserCertificationsCount}</strong>
                  <span>My Certifications</span>
                </div>
              </div>
            </div>

            {/* <!-- recent-activity --> */}
            <div className="recent-activity">
              <div className="course-listing">
                <div className="heading">Your recent activity</div>
                <div className="list-group">
                  <div className="list-item">
                    <a className="couser-img" href="#">
                      <img className="img-full" src="/images/course-img12x.jpg" alt="" />
                    </a>
                    <div className="item-content">
                      <div className="course-details">
                        <div className="subtitle">AWS Certified Cloud Practitioner</div>
                        <a className="title" href="#">
                          Practice Tests 2
                        </a>
                        <div className="course-highlights">
                          <div>
                            <i className="icon icon-font-note2"></i>
                            <span>65 Questions</span>
                          </div>
                          <div className="attempts">
                            <span>6 Attempts</span>
                          </div>
                          <div className="completed">
                            <i className="icon icon-font-true-tick-filled-circle"></i>
                            <span>Completed</span>
                          </div>
                        </div>
                      </div>
                      <a className="btn btn-start" href="#">
                        Start Next
                      </a>
                    </div>
                  </div>
                  <div className="list-item">
                    <a className="couser-img" href="#">
                      <img className="img-full" src="/images/course-img42x.jpg" alt="" />
                    </a>
                    <div className="item-content">
                      <div className="course-details">
                        <div className="subtitle">AWS Lambda and API Gateway</div>
                        <a className="title" href="#">
                          API Practice Tests 1
                        </a>
                        <div className="course-highlights">
                          <div>
                            <i className="icon icon-font-note2"></i>
                            <span>35 Questions</span>
                          </div>
                          <div className="inprogress">
                            <span>In Progress</span>
                          </div>
                        </div>
                      </div>
                      <a className="btn btn-start" href="#">
                        Start
                      </a>
                    </div>
                  </div>
                  <div className="list-item">
                    <a className="couser-img" href="#">
                      <img className="img-full" src="/images/course-img22x.jpg" alt="" />
                    </a>
                    <div className="item-content">
                      <div className="course-details">
                        <div className="subtitle">Java Spring Framework basics course</div>
                        <a className="title" href="#">
                          How To Find The Resources
                        </a>
                        <div className="course-highlights">
                          <div>
                            <i className="icon icon-font-play"></i>
                            <span>10:30</span>
                          </div>
                          <div className="progress-bar">
                            <div className="line">
                              <samp className="fill"></samp>
                            </div>
                            <span>40%</span>
                          </div>
                        </div>
                      </div>
                      <a className="btn btn-start" href="#">
                        Start
                      </a>
                    </div>
                  </div>
                  <div className="list-item">
                    <a className="couser-img" href="#">
                      <img className="img-full" src="/images/course-img32x.jpg" alt="" />
                    </a>
                    <div className="item-content">
                      <div className="course-details">
                        <div className="subtitle">Ansible Basics</div>
                        <a className="title" href="#">
                          Ansible Basics
                        </a>
                        <div className="course-highlights">
                          <div>
                            <i className="icon icon-font-play"></i>
                            <span>14:20</span>
                          </div>
                          <div className="completed">
                            <i className="icon icon-font-true-tick-filled-circle"></i>
                            <span>Completed</span>
                          </div>
                        </div>
                      </div>
                      <a className="btn btn-start" href="#">
                        Start Next
                      </a>
                    </div>
                  </div>
                  <div className="list-item">
                    <a className="couser-img" href="#">
                      <img className="img-full" src="/images/course-img12x.jpg" alt="" />
                    </a>
                    <div className="item-content">
                      <div className="course-details">
                        <div className="subtitle">AWS Certified Cloud Practitioner</div>
                        <a className="title" href="#">
                          Access and tour AWS console
                        </a>
                        <div className="course-highlights">
                          <div>
                            <i className="icon icon-font-bicker"></i>
                            <span>20:15</span>
                          </div>
                          <div className="inprogress">
                            <span>In Progress</span>
                          </div>
                        </div>
                      </div>
                      <a className="btn btn-start" href="#">
                        Start
                      </a>
                    </div>
                  </div>
                  <div className="list-item">
                    <a className="couser-img" href="#">
                      <img className="img-full" src="/images/course-img62x.jpg" alt="" />
                    </a>
                    <div className="item-content">
                      <div className="course-details">
                        <div className="subtitle">Google Cloud Certified Associate Cloud Engineer</div>
                        <a className="title" href="#">
                          Setting up the GCP environment
                        </a>
                        <div className="course-highlights">
                          <div>
                            <i className="icon icon-font-bicker"></i>
                            <span>32:10</span>
                          </div>
                          <div className="completed">
                            <i className="icon icon-font-true-tick-filled-circle"></i>
                            <span>Completed</span>
                          </div>
                        </div>
                      </div>
                      <a className="btn btn-start" href="#">
                        Start Next
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Your Queries --> */}
            <div className="queries-block">
              <div className="heading">
                Your Queries{" "}
                <a className="link-vieall" href="#">
                  View All
                </a>
              </div>
              <div className="block-group">
                <div className="block">
                  <div className="left">
                    <span>
                      Posted on <strong>1 hours</strong> ago{" "}
                    </span>
                    <a href="#">How can I switch to a different project in GCP through CLI?</a>
                  </div>
                  <div className="right">
                    <samp>2</samp>
                    <span>Answer</span>
                  </div>
                </div>
                <div className="block">
                  <div className="left">
                    <span>
                      PPosted on <strong>2 Days</strong> ago{" "}
                    </span>
                    <a href="#">AWS Certified Solutions Architect Associate (Practice Test)</a>
                  </div>
                </div>
                <div className="block">
                  <div className="left">
                    <span>
                      PPosted on <strong>2 Weeks</strong> ago{" "}
                    </span>
                    <a href="#">Unable to access AWS practice tests</a>
                  </div>
                </div>
                <div className="block">
                  <div className="left">
                    <span>
                      PPosted on <strong>6th Fab, 2020</strong>
                    </span>
                    <a href="#">MS-500: Microsoft 365 Security Administration Guide</a>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- recent-added --> */}
            <div className="recent-added">
              <div className="course-listing">
                <div className="heading">Recently added Courses</div>
                <div className="list-group">
                  <div className="list-item">
                    <a className="couser-img" href="#">
                      <img className="img-full" src="/images/course-img62x.jpg" alt="" />
                    </a>
                    <div className="item-content">
                      <div className="course-details">
                        <div className="level">Level: Beginner</div>
                        <a className="title" href="#">
                          Google Cloud Certified Associate Engineer
                        </a>
                        <div className="course-highlights">
                          <div>
                            <i className="icon icon-font-note2"></i>
                            <span>230 Questions</span>
                          </div>
                          <div>
                            <i className="icon icon-font-play"></i>
                            <span>20 Videos</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="list-item">
                    <a className="couser-img" href="#">
                      <img className="img-full" src="/images/course-img32x.jpg" alt="" />
                    </a>
                    <div className="item-content">
                      <div className="course-details">
                        <div className="level">Level: Advanced</div>
                        <a className="title" href="#">
                          Ansible Basics
                        </a>
                        <div className="course-highlights">
                          <div>
                            <i className="icon icon-font-bicker"></i>
                            <span>17 labs</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="list-item">
                    <a className="couser-img" href="#">
                      <img className="img-full" src="/images/course-img22x.jpg" alt="" />
                    </a>
                    <div className="item-content">
                      <div className="course-details">
                        <div className="level">Level: Intermediate</div>
                        <a className="title" href="#">
                          How To Find The Resources
                        </a>
                        <div className="course-highlights">
                          <div>
                            <i className="icon icon-font-note2"></i>
                            <span>20 Questions</span>
                          </div>
                          <div>
                            <i className="icon icon-font-play"></i>
                            <span>25 Videos</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="list-item">
                    <a className="couser-img" href="#">
                      <img className="img-full" src="/images/course-img42x.jpg" alt="" />
                    </a>
                    <div className="item-content">
                      <div className="course-details">
                        <div className="level">Level: Advanced</div>
                        <a className="title" href="#">
                          AWS Lambda and API Gateway
                        </a>
                        <div className="course-highlights">
                          <div>
                            <i className="icon icon-font-bicker"></i>
                            <span>35 Labs</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="list-item">
                    <a className="couser-img" href="#">
                      <img className="img-full" src="/images/course-img32x.jpg" alt="" />
                    </a>
                    <div className="item-content">
                      <div className="course-details">
                        <div className="level">Level: Advanced</div>
                        <a className="title" href="#">
                          Ansible Basics
                        </a>
                        <div className="course-highlights">
                          <div>
                            <i className="icon icon-font-play"></i>
                            <span>25 Videos</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- business-offer --> */}
            <div className="business-offer">
              <p>
                <strong>Training 5 or more people? </strong>Get your team access to 1,000+ courses
              </p>
              <a className="btn btn-business" href="#">
                Whizlabs for <strong>Business</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps(context) {
  const resp = await axios.get(baseUrl + "/users/dashboard/1");
  const data = resp.data.data;

  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
}

export default Dashboard;
