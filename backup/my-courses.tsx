import { useEffect } from "react";

const MyCourses = () => {
  useEffect(() => {
    document.getElementById("wrapper").classList.add("dashboard-page");
  }, []);

  return (
    <>
      {/* <!-- content area part -->  */}
      <div id="content-area" className="bg-color contentArea tranning-page">
        {/* <!-- sub header --> */}
        <div className="sub-header">
          <div className="container">
            <div className="left">
              <div className="breadcrumbs">
                <ul>
                  <li>
                    <a href="Javascript:void(0)">Home</a>
                  </li>
                  <li>
                    <a href="#">Trainings</a>
                  </li>
                </ul>
              </div>
              <h1>Trainings</h1>
            </div>
          </div>
        </div>

        <div className="dashboard-tab">
          <div id="dashboard-tab">
            <div className="wrapper-list">
              <div className="container">
                <span className="previous">&lt;</span>
                <ul className="resp-tabs-list tabs-page-link hor_1 tab_list">
                  <li>My Courses</li>
                  <li>completed</li>
                  <li>Free Courses</li>
                  <li>Recommended</li>
                  <li>My Wishlist</li>
                  <li>My Certifications</li>
                </ul>
                <span className="next">&gt;</span>
              </div>
            </div>
            <div className="tab-wrap">
              <div className="resp-tabs-container hor_1 content_wrapper-tab">
                <div className="tab_content active" id="myCourses">
                  {/* <!-- <div className="empty-mycourse empty-block">
										<div className="container">
											<figure><img className="img-full" src="/images/dashboard-empty-course.svg" alt=""/></figure>
											<h2>Start learning from over 1000+ courses today.</h2>
											<p>When you buy or enroll in a course, it will appear here.</p>
											<a className="btn btn-browse" href="#">Browse Now</a>
										</div>
									</div> --> */}
                  <div className="container">
                    {/* <!-- search-filter-block --> */}
                    <div className="search-filter-block">
                      <div className="search-block">
                        <input type="search" placeholder="Search" />
                        <i className="icon icon-font-search"></i>
                      </div>
                      <div className="filter-block">
                        <i className="icon icon-font-advance-filter"></i>
                        <span>Advanced Filters</span>
                      </div>
                    </div>

                    {/* <!-- filter-options --> */}
                    <div className="filter-options">
                      <div className="input-box-group">
                        <div className="input-box">
                          <div className="head">
                            <label>Categories</label>
                          </div>
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
                        <div className="input-box">
                          <div className="head">
                            <label>Status</label>
                            <button>Clear</button>
                          </div>
                          <div className="custom-selectbox">
                            <select>
                              <option>
                                Not Started, In Progress, Completed
                              </option>
                              <option>Not Started</option>
                              <option>In Progress</option>
                              <option>Completed</option>
                            </select>
                          </div>
                        </div>
                        <div className="input-box">
                          <div className="head">
                            <label>Content</label>
                            <button>Clear</button>
                          </div>
                          <div className="custom-selectbox">
                            <select>
                              <option>Video, Labs</option>
                              <option>Video</option>
                              <option>Labs</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="save-block">
                        <strong>Save </strong>this filter setting for future{" "}
                        <button>Save</button>
                      </div>
                    </div>

                    {/* <!-- found courses --> */}
                    <div className="course-listing">
                      <div className="caption">
                        <strong>16 </strong>Courses found
                      </div>
                      <div className="list-group">
                        <div className="list-item">
                          <a className="couser-img" href="#">
                            <img
                              className="img-full"
                              src="/images/course-img12x.jpg"
                              alt=""
                            />
                          </a>
                          <div className="item-content">
                            <div className="course-details">
                              <div className="status">
                                <span className="not-started">Not Started</span>
                              </div>
                              <a className="title" href="#">
                                AWS Certified Cloud Practitioner
                              </a>
                              <div className="course-highlights">
                                <div>
                                  <i className="icon icon-font-thumb"></i>
                                  <span>1 Free test</span>
                                </div>
                                <div>
                                  <i className="icon icon-font-note2"></i>
                                  <span>350 Questions</span>
                                </div>
                                <div>
                                  <i className="icon icon-font-play"></i>
                                  <span>85 Videos</span>
                                </div>
                                <div className="disabled">
                                  <i className="icon icon-font-bicker"></i>
                                  <span>22 labs</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-item">
                          <a className="couser-img" href="#">
                            <img
                              className="img-full"
                              src="/images/course-img22x.jpg"
                              alt=""
                            />
                          </a>
                          <div className="item-content">
                            <div className="course-details">
                              <div className="status">
                                <span className="inprogress">In Progress</span>
                              </div>
                              <a className="title" href="#">
                                Java Spring Framework basics course
                              </a>
                              <div className="course-highlights">
                                <div>
                                  <i className="icon icon-font-play"></i>
                                  <span>47 Videos</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-item">
                          <a className="couser-img" href="#">
                            <img
                              className="img-full"
                              src="/images/course-img32x.jpg"
                              alt=""
                            />
                          </a>
                          <div className="item-content">
                            <div className="course-details">
                              <div className="status">
                                <span className="not-started">Not Started</span>
                              </div>
                              <a className="title" href="#">
                                Ansible Basics
                              </a>
                              <div className="course-highlights">
                                <div>
                                  <i className="icon icon-font-play"></i>
                                  <span>25 Videos</span>
                                </div>
                                <div className="disabled">
                                  <i className="icon icon-font-bicker"></i>
                                  <span>17 labs</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-item">
                          <a className="couser-img" href="#">
                            <img
                              className="img-full"
                              src="/images/course-img42x.jpg"
                              alt=""
                            />
                          </a>
                          <div className="item-content">
                            <div className="course-details">
                              <div className="status">
                                <span className="inprogress">In Progress</span>
                              </div>
                              <a className="title" href="#">
                                AWS Lambda and API Gateway
                              </a>
                              <div className="course-highlights">
                                <div>
                                  <i className="icon icon-font-thumb"></i>
                                  <span>1 Free test</span>
                                </div>
                                <div>
                                  <i className="icon icon-font-note2"></i>
                                  <span>321 Questions</span>
                                </div>
                                <div className="disabled">
                                  <i className="icon icon-font-play"></i>
                                  <span>36 Videos</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-item">
                          <a className="couser-img" href="#">
                            <img
                              className="img-full"
                              src="/images/course-img62x.jpg"
                              alt=""
                            />
                          </a>
                          <div className="item-content">
                            <div className="course-details">
                              <div className="status">
                                <span className="not-started">Not Started</span>
                              </div>
                              <a className="title" href="#">
                                Google Cloud Certified Associate Cloud Engineer
                              </a>
                              <div className="course-highlights">
                                <div>
                                  <i className="icon icon-font-note2"></i>
                                  <span>230 Questions</span>
                                </div>
                                <div className="disabled">
                                  <i className="icon icon-font-play"></i>
                                  <span>20 Videos</span>
                                </div>
                                <div className="disabled">
                                  <i className="icon icon-font-bicker"></i>
                                  <span>18 labs</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-item">
                          <a className="couser-img" href="#">
                            <img
                              className="img-full"
                              src="/images/course-img12x.jpg"
                              alt=""
                            />
                          </a>
                          <div className="item-content">
                            <div className="course-details">
                              <div className="status">
                                <span className="not-started">Not Started</span>
                              </div>
                              <a className="title" href="#">
                                AWS Certified Cloud Practitioner
                              </a>
                              <div className="course-highlights">
                                <div>
                                  <i className="icon icon-font-thumb"></i>
                                  <span>1 Free test</span>
                                </div>
                                <div>
                                  <i className="icon icon-font-note2"></i>
                                  <span>350 Questions</span>
                                </div>
                                <div>
                                  <i className="icon icon-font-play"></i>
                                  <span>85 Videos</span>
                                </div>
                                <div className="disabled">
                                  <i className="icon icon-font-bicker"></i>
                                  <span>22 labs</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-item">
                          <a className="couser-img" href="#">
                            <img
                              className="img-full"
                              src="/images/course-img12x.jpg"
                              alt=""
                            />
                          </a>
                          <div className="item-content">
                            <div className="course-details">
                              <div className="status">
                                <span className="inprogress">In Progress</span>
                              </div>
                              <a className="title" href="#">
                                AWS Certified Cloud Practitioner
                              </a>
                              <div className="course-highlights">
                                <div>
                                  <i className="icon icon-font-thumb"></i>
                                  <span>1 Free test</span>
                                </div>
                                <div>
                                  <i className="icon icon-font-note2"></i>
                                  <span>350 Questions</span>
                                </div>
                                <div>
                                  <i className="icon icon-font-play"></i>
                                  <span>85 Videos</span>
                                </div>
                                <div className="disabled">
                                  <i className="icon icon-font-bicker"></i>
                                  <span>22 labs</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-item">
                          <a className="couser-img" href="#">
                            <img
                              className="img-full"
                              src="/images/course-img22x.jpg"
                              alt=""
                            />
                          </a>
                          <div className="item-content">
                            <div className="course-details">
                              <div className="status">
                                <span className="inprogress">In Progress</span>
                              </div>
                              <a className="title" href="#">
                                Java Spring Framework basics course
                              </a>
                              <div className="course-highlights">
                                <div>
                                  <i className="icon icon-font-play"></i>
                                  <span>47 Videos</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-item">
                          <a className="couser-img" href="#">
                            <img
                              className="img-full"
                              src="/images/course-img32x.jpg"
                              alt=""
                            />
                          </a>
                          <div className="item-content">
                            <div className="course-details">
                              <div className="status">
                                <span className="not-started">Not Started</span>
                              </div>
                              <a className="title" href="#">
                                Ansible Basics
                              </a>
                              <div className="course-highlights">
                                <div>
                                  <i className="icon icon-font-play"></i>
                                  <span>25 Videos</span>
                                </div>
                                <div className="disabled">
                                  <i className="icon icon-font-bicker"></i>
                                  <span>17 labs</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-item">
                          <a className="couser-img" href="#">
                            <img
                              className="img-full"
                              src="/images/course-img42x.jpg"
                              alt=""
                            />
                          </a>
                          <div className="item-content">
                            <div className="course-details">
                              <div className="status">
                                <span className="inprogress">In Progress</span>
                              </div>
                              <a className="title" href="#">
                                AWS Lambda and API Gateway
                              </a>
                              <div className="course-highlights">
                                <div>
                                  <i className="icon icon-font-thumb"></i>
                                  <span>1 Free test</span>
                                </div>
                                <div>
                                  <i className="icon icon-font-note2"></i>
                                  <span>321 Questions</span>
                                </div>
                                <div className="disabled">
                                  <i className="icon icon-font-play"></i>
                                  <span>36 Videos</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-item">
                          <a className="couser-img" href="#">
                            <img
                              className="img-full"
                              src="/images/course-img62x.jpg"
                              alt=""
                            />
                          </a>
                          <div className="item-content">
                            <div className="course-details">
                              <div className="status">
                                <span className="not-started">Not Started</span>
                              </div>
                              <a className="title" href="#">
                                Google Cloud Certified Associate Cloud Engineer
                              </a>
                              <div className="course-highlights">
                                <div>
                                  <i className="icon icon-font-note2"></i>
                                  <span>230 Questions</span>
                                </div>
                                <div className="disabled">
                                  <i className="icon icon-font-play"></i>
                                  <span>20 Videos</span>
                                </div>
                                <div className="disabled">
                                  <i className="icon icon-font-bicker"></i>
                                  <span>18 labs</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-item">
                          <a className="couser-img" href="#">
                            <img
                              className="img-full"
                              src="/images/course-img12x.jpg"
                              alt=""
                            />
                          </a>
                          <div className="item-content">
                            <div className="course-details">
                              <div className="status">
                                <span className="not-started">Not Started</span>
                              </div>
                              <a className="title" href="#">
                                AWS Certified Cloud Practitioner
                              </a>
                              <div className="course-highlights">
                                <div>
                                  <i className="icon icon-font-thumb"></i>
                                  <span>1 Free test</span>
                                </div>
                                <div>
                                  <i className="icon icon-font-note2"></i>
                                  <span>350 Questions</span>
                                </div>
                                <div>
                                  <i className="icon icon-font-play"></i>
                                  <span>85 Videos</span>
                                </div>
                                <div className="disabled">
                                  <i className="icon icon-font-bicker"></i>
                                  <span>22 labs</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-item">
                          <a className="couser-img" href="#">
                            <img
                              className="img-full"
                              src="/images/course-img32x.jpg"
                              alt=""
                            />
                          </a>
                          <div className="item-content">
                            <div className="course-details">
                              <div className="status">
                                <span className="not-started">Not Started</span>
                              </div>
                              <a className="title" href="#">
                                Ansible Basics
                              </a>
                              <div className="course-highlights">
                                <div>
                                  <i className="icon icon-font-play"></i>
                                  <span>25 Videos</span>
                                </div>
                                <div className="disabled">
                                  <i className="icon icon-font-bicker"></i>
                                  <span>17 labs</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-item">
                          <a className="couser-img" href="#">
                            <img
                              className="img-full"
                              src="/images/course-img22x.jpg"
                              alt=""
                            />
                          </a>
                          <div className="item-content">
                            <div className="course-details">
                              <div className="status">
                                <span className="inprogress">In Progress</span>
                              </div>
                              <a className="title" href="#">
                                Java Spring Framework basics course
                              </a>
                              <div className="course-highlights">
                                <div>
                                  <i className="icon icon-font-play"></i>
                                  <span>47 Videos</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-item">
                          <a className="couser-img" href="#">
                            <img
                              className="img-full"
                              src="/images/course-img12x.jpg"
                              alt=""
                            />
                          </a>
                          <div className="item-content">
                            <div className="course-details">
                              <div className="status">
                                <span className="not-started">Not Started</span>
                              </div>
                              <a className="title" href="#">
                                AWS Certified Cloud Practitioner
                              </a>
                              <div className="course-highlights">
                                <div>
                                  <i className="icon icon-font-thumb"></i>
                                  <span>1 Free test</span>
                                </div>
                                <div>
                                  <i className="icon icon-font-note2"></i>
                                  <span>350 Questions</span>
                                </div>
                                <div>
                                  <i className="icon icon-font-play"></i>
                                  <span>85 Videos</span>
                                </div>
                                <div className="disabled">
                                  <i className="icon icon-font-bicker"></i>
                                  <span>22 labs</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-item">
                          <a className="couser-img" href="#">
                            <img
                              className="img-full"
                              src="/images/course-img42x.jpg"
                              alt=""
                            />
                          </a>
                          <div className="item-content">
                            <div className="course-details">
                              <div className="status">
                                <span className="inprogress">In Progress</span>
                              </div>
                              <a className="title" href="#">
                                AWS Lambda and API Gateway
                              </a>
                              <div className="course-highlights">
                                <div>
                                  <i className="icon icon-font-thumb"></i>
                                  <span>1 Free test</span>
                                </div>
                                <div>
                                  <i className="icon icon-font-note2"></i>
                                  <span>321 Questions</span>
                                </div>
                                <div className="disabled">
                                  <i className="icon icon-font-play"></i>
                                  <span>36 Videos</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <!-- pagination-block --> */}
                    <div className="pagination-block">
                      <a
                        className="arrow disabled back-arrow icon-font-pagination-arrow"
                        href="#"
                      ></a>
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
                      <a
                        className="arrow right-arrow icon-font-pagination-arrow"
                        href="#"
                      ></a>
                    </div>
                  </div>
                </div>

                <div className="tab_content" id="completed">
                  {/* <!-- empty-mycertification --> */}
                  <div className="completed-certification empty-block">
                    <div className="container">
                      <figure>
                        <img
                          className="img-full"
                          src="/images/dashboard-complete-certification.svg"
                          alt=""
                        />
                      </figure>
                      <h2>Complete your course and get the certification</h2>
                      <p>
                        <a href="#">Go to the My Courses</a> tab to my
                        certifications.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="tab_content" id="freeCourses">
                  <div className="container">
                    <p>Here is the Free Courses</p>
                  </div>
                </div>

                <div className="tab_content" id="recommended">
                  <div className="container">
                    <p>Here is the Recommended Courses</p>
                  </div>
                </div>

                <div className="tab_content" id="myWishlist">
                  <div className="container">
                    {/* <!-- search-filter-block --> */}
                    <div className="search-filter-block">
                      <div className="search-block">
                        <input type="search" placeholder="Search" />
                        <i className="icon icon-font-search"></i>
                      </div>
                    </div>

                    {/* <!-- couse-listing --> */}
                    <div className="course-listing">
                      <div className="caption">
                        <strong>5 </strong>Courses found
                      </div>
                      <div className="list-group">
                        <div className="list-item">
                          <a className="couser-img" href="#">
                            <img
                              className="img-full"
                              src="/images/course-img12x.jpg"
                              alt=""
                            />
                            <i className="active icon-font-heart"></i>
                          </a>
                          <div className="item-content">
                            <div className="course-details">
                              <div className="level">Level: Beginner</div>
                              <a className="title" href="#">
                                AWS Certified Cloud Practitioner
                              </a>
                              <div className="course-highlights">
                                <div>
                                  <i className="icon icon-font-thumb"></i>
                                  <span>1 Free test</span>
                                </div>
                                <div>
                                  <i className="icon icon-font-note2"></i>
                                  <span>350 Questions</span>
                                </div>
                                <div>
                                  <i className="icon icon-font-play"></i>
                                  <span>85 Videos</span>
                                </div>
                                <div>
                                  <i className="icon icon-font-bicker"></i>
                                  <span>22 labs</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-item">
                          <a className="couser-img" href="#">
                            <img
                              className="img-full"
                              src="/images/course-img22x.jpg"
                              alt=""
                            />
                            <i className="active icon-font-heart"></i>
                          </a>
                          <div className="item-content">
                            <div className="course-details">
                              <div className="level">Level: Advanced</div>
                              <a className="title" href="#">
                                Java Spring Framework basics course
                              </a>
                              <div className="course-highlights">
                                <div>
                                  <i className="icon icon-font-play"></i>
                                  <span>47 Videos</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-item">
                          <a className="couser-img" href="#">
                            <img
                              className="img-full"
                              src="/images/course-img32x.jpg"
                              alt=""
                            />
                            <i className="active icon-font-heart"></i>
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
                            <img
                              className="img-full"
                              src="/images/course-img42x.jpg"
                              alt=""
                            />
                            <i className="active icon-font-heart"></i>
                          </a>
                          <div className="item-content">
                            <div className="course-details">
                              <div className="level">Level: Advanced</div>
                              <a className="title" href="#">
                                AWS Lambda and API Gateway
                              </a>
                              <div className="course-highlights">
                                <div>
                                  <i className="icon icon-font-thumb"></i>
                                  <span>1 Free test</span>
                                </div>
                                <div>
                                  <i className="icon icon-font-note2"></i>
                                  <span>321 Questions</span>
                                </div>
                                <div>
                                  <i className="icon icon-font-play"></i>
                                  <span>36 Videos</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-item">
                          <a className="couser-img" href="#">
                            <img
                              className="img-full"
                              src="/images/course-img62x.jpg"
                              alt=""
                            />
                            <i className="active icon-font-heart"></i>
                          </a>
                          <div className="item-content">
                            <div className="course-details">
                              <div className="level">Level: Intermediate</div>
                              <a className="title" href="#">
                                Google Cloud Certified Associate Cloud Engineer
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
                                <div>
                                  <i className="icon icon-font-bicker"></i>
                                  <span>18 labs</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <!-- pagination-block --> */}
                    <div className="pagination-block">
                      <a
                        className="arrow disabled back-arrow icon-font-pagination-arrow"
                        href="#"
                      ></a>
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
                      <a
                        className="arrow right-arrow icon-font-pagination-arrow"
                        href="#"
                      ></a>
                    </div>
                  </div>
                </div>

                <div className="tab_content" id="myCertifications">
                  {/* <!-- empty-mycertification --> */}
                  <div className="empty-mycertification empty-block">
                    <div className="container">
                      <figure>
                        <img
                          className="img-full"
                          src="/images/dashboard-complete-certification.svg"
                          alt=""
                        />
                      </figure>
                      <h2>Complete your course and get the certification</h2>
                      <p>
                        <a href="#">Go to the My Courses</a> tab to my
                        certifications.
                      </p>
                    </div>
                  </div>
                  <div className="container">
                    {/* <!-- Some Content Here --> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCourses;
