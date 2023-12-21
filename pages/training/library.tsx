import { useRouter } from "next/router"
import React from "react"
import Head from "next/head";

const LibraryStatic = (seoHomePageData) => {
	let router = useRouter()
	let handleroute = (e, slug) => {
		e.preventDefault()
		router.push(`/${slug}`)
	}
	return <>
	{/* <Head>
            <meta name="robots" content="noindex,nofollow" />
        </Head> */}
		<div className="wrapper">
			<div className="library-banner">
				<div className="container">
					<div className="content">
						<div className="left">
							<div className="title">Get Started With Your Certification Preparation </div>
							{/* <div className="free-txt">FOR FREE</div> */}
							<p>Start your preparation now with the industry pioneers and build a dynamic career in Cloud Computing.</p>
							{/* <a className="btn" >Start Now</a> */}
						</div>
						<div className="right">
							<figure><img className="img-full" src="/images/library-banner.png" alt="" /></figure>
						</div>
					</div>
					<div className="click-jump-block">
						<div className="txt">
							Click and Jump to the <span>Courses</span>
						</div>
						<div className="img-group">
							<figure><a href="#amazon"><img className="img-full" src="/images/aws.svg" alt="" /></a></figure>
							<figure><a href="#microsoft"><img className="img-full" src="/images/microsoft.svg" alt="" /></a></figure>
							<figure><a href="#google"><img className="img-full" src="/images/goggle.svg" alt="" /></a></figure>
						</div>
					</div>
				</div>
			</div>
			<div className="ft-library-page" id="content-area">
				{/* <!-- amazon-web-services-section --> */}
				<div className="courses-section amazon" id="amazon">
					<div className="container">
						<div className="caption">
							<div className="title">Amazon Web Services</div>
							<p>With the Amazon certifications bring your cloud career one level up with the world’s leading online learning platform.
							</p>
						</div>
						<div className="list-group">
							<div className="list-item">
								<div className="course-img">
									<a>
										<figure>
											<img className="img-full" src="/images/awsccp.webp" alt="" />
										</figure>
									</a>
								</div>
								<div className="course-details">
									<div className="top">
										<a className="title" href="/aws-ccp" >AWS Certified Cloud Practitioner</a>
										<div className="highlights">
											<div className="box"><i className="icon icon-font-note2"></i><span>390 Questions</span></div>
											<div className="box"><i className="icon icon-font-graduation-cap"></i><span>46,040Learners</span></div>
										</div>
									</div>
									<div className="bottom">
										<div className="rating-block">
											<div className="stars-box">
												<figure><img className="img-full" src="/images/star-on.svg" alt="" /></figure>
												<samp>4.5</samp>
												<span>(833 ratings)</span>
											</div>
											<div className="try-free">
												<a href="/aws-ccp">Know more <i className="icon icon-font-arrow-right"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="list-item">
								<div className="course-img">
									<a >
										<figure>
											<img className="img-full" src="/images/awscda.webp" alt="" />
										</figure>
									</a>
								</div>
								<div className="course-details">
									<div className="top">
										<a className="title" onClick={(e) => { handleroute(e, 'aws-cda') }} style={{ cursor: "pointer" }}>AWS Certified Developer Associate</a>
										<div className="highlights">
											<div className="box"><i className="icon icon-font-note2"></i><span>539 Questions</span></div>
											<div className="box"><i className="icon icon-font-graduation-cap"></i><span>44,379 Learners</span></div>
										</div>
									</div>
									<div className="bottom">
										<div className="rating-block">
											<div className="stars-box">
												<figure><img className="img-full" src="/images/star-on.svg" alt="" /></figure>
												<samp>4.5</samp>
												<span>(481 ratings)</span>
											</div>
											<div className="try-free">
												<a href="/aws-cda">Know More <i className="icon icon-font-arrow-right"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="list-item">
								<div className="course-img">
									<a >
										<figure>
											<img className="img-full" src="/images/awscsa.webp" alt="" />
										</figure>
									</a>
								</div>
								<div className="course-details">
									<div className="top">
										<a className="title" href="/aws-csaa" >AWS Certified Solution Architect Associate</a>
										<div className="highlights">
											<div className="box"><i className="icon icon-font-note2"></i><span>765 Questions</span></div>
											<div className="box"><i className="icon icon-font-graduation-cap"></i><span>110,767 Learners</span></div>
										</div>
									</div>
									<div className="bottom">
										<div className="rating-block">
											<div className="stars-box">
												<figure><img className="img-full" src="/images/star-on.svg" alt="" /></figure>
												<samp>4.5</samp>
												<span>(1578 ratings)</span>
											</div>
											<div className="try-free">
												<a href="/aws-csaa">Know More <i className="icon icon-font-arrow-right"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="list-item">
								<div className="course-img">
									<a >
										<figure>
											<img className="img-full" src="/images/awsdep.webp" alt="" />
										</figure>
									</a>
								</div>
								<div className="course-details">
									<div className="top">
										<a className="title" href="/aws-devops" >AWS Certified Devops Engineer Professional </a>
										<div className="highlights">
											<div className="box"><i className="icon icon-font-note2"></i><span>520 Questions</span></div>
											<div className="box"><i className="icon icon-font-graduation-cap"></i><span>24,474 Learners</span></div>
										</div>
									</div>
									<div className="bottom">
										<div className="rating-block">
											<div className="stars-box">
												<figure><img className="img-full" src="/images/star-on.svg" alt="" /></figure>
												<samp>4.5</samp>
												<span>(69 ratings)</span>
											</div>
											<div className="try-free">
												<a href="/aws-devops">Know More <i className="icon icon-font-arrow-right"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="list-item">
								<div className="course-img">
									<a >
										<figure>
											<img className="img-full" src="/images/awssaa.webp" alt="" />
										</figure>
									</a>
								</div>
								<div className="course-details">
									<div className="top">
										<a className="title" href="/aws-sysops" >AWS Certified Sysops Adminstrator Associate</a>
										<div className="highlights">
											<div className="box"><i className="icon icon-font-note2"></i><span>395 Questions</span></div>
											<div className="box"><i className="icon icon-font-graduation-cap"></i><span>33,075 Learners</span></div>
										</div>
									</div>
									<div className="bottom">
										<div className="rating-block">
											<div className="stars-box">
												<figure><img className="img-full" src="/images/star-on.svg" alt="" /></figure>
												<samp>4.5</samp>
												<span>(148 ratings)</span>
											</div>
											<div className="try-free">
												<a href="/aws-sysops">Know More <i className="icon icon-font-arrow-right"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="list-item">
								<div className="course-img">
									<a >
										<figure>
											<img className="img-full" src="/images/awssap.webp" alt="" />
										</figure>
									</a>
								</div>
								<div className="course-details">
									<div className="top">
										<a className="title" href="/aws-csap" >AWS Certified Solution Architect Professional</a>
										<div className="highlights">
											<div className="box"><i className="icon icon-font-note2"></i><span>545 Questions</span></div>
											<div className="box"><i className="icon icon-font-graduation-cap"></i><span>35,544 Learners</span></div>
										</div>
									</div>
									<div className="bottom">
										<div className="rating-block">
											<div className="stars-box">
												<figure><img className="img-full" src="/images/star-on.svg" alt="" /></figure>
												<samp>4.5</samp>
												<span>(153 ratings)</span>
											</div>
											<div className="try-free">
												<a href="/aws-csap">Know More <i className="icon icon-font-arrow-right"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <!-- microsoft-certifications-section --> */}
				<div className="courses-section microsoft" id="microsoft">
					<div className="container">
						<div className="caption">
							<div className="title">Microsoft Azure Certifications</div>
							<p>With the Microsoft Azure certifications bring your cloud career one level up with the world’s leading online learning platform.
							</p>
						</div>
						<div className="list-group">
							<div className="list-item">
								<div className="course-img">
									<a >
										<figure>
											<img className="img-full" src="/images/msdp203.webp" alt="" />
										</figure>
									</a>
								</div>
								<div className="course-details">
									<div className="top">
										<a className="title" onClick={(e) => { handleroute(e, 'dp-203') }} style={{ cursor: "pointer" }} >Exam DP-203: Data Engineering on Microsoft Azure</a>
										<div className="highlights">
											<div className="box"><i className="icon icon-font-note2"></i><span>240 Questions</span></div>
											<div className="box"><i className="icon icon-font-graduation-cap"></i><span>703 Learners</span></div>
										</div>
									</div>
									<div className="bottom">
										<div className="rating-block">
											<div className="stars-box">
												<figure><img className="img-full" src="/images/star-on.svg" alt="" /></figure>
												<samp>5.0</samp>
												<span>(3 ratings)</span>
											</div>
											<div className="try-free">
												<a onClick={(e) => { handleroute(e, 'dp-203') }} style={{ cursor: "pointer" }}>Know More <i className="icon icon-font-arrow-right"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* <div className="list-item">
										<div className="course-img">
											<a>
												<figure>
													<img className="img-full" src="/images/ms900-365.webp" alt=""/>
												</figure>
											</a>
										</div>
										<div className="course-details">
											<div className="top">
												<a className="title" onClick={(e)=>{handleroute(e,'ms900-365')}} style={{cursor:"pointer"}}>MS-900: Microsoft 365 Fundamentals</a>
												<div className="highlights">
													<div className="box"><i className="icon icon-font-note2"></i><span>185 Questions</span></div>
													<div className="box"><i className="icon icon-font-graduation-cap"></i><span>200 Learners</span></div>
												</div>
											</div>
											<div className="bottom">
												<div className="rating-block">
													<div className="stars-box">
														<figure><img className="img-full" src="/images/star-on.svg" alt=""/></figure>
														<samp>0.0</samp>
													</div>
													<div className="try-free">
														<a onClick={(e)=>{handleroute(e,'ms900-365')}} style={{cursor:"pointer"}}>Know More <i className="icon icon-font-arrow-right"></i></a>
													</div>
												</div>
											</div>
										</div>
									</div> */}
							<div className="list-item">
								<div className="course-img">
									<a >
										<figure>
											<img className="img-full" src="/images/msaz400.webp" alt="" />
										</figure>
									</a>
								</div>
								<div className="course-details">
									<div className="top">
										<a className="title" onClick={(e) => { handleroute(e, 'az-400') }} style={{ cursor: "pointer" }}>Exam AZ-400: Designing and Implementing Microsoft DevOps Solutions</a>
										<div className="highlights">
											<div className="box"><i className="icon icon-font-note2"></i><span>375 Questions</span></div>
											<div className="box"><i className="icon icon-font-graduation-cap"></i><span>9,475 Learners</span></div>
										</div>
									</div>
									<div className="bottom">
										<div className="rating-block">
											<div className="stars-box">
												<figure><img className="img-full" src="/images/star-on.svg" alt="" /></figure>
												<samp>4.7</samp>
												<span>(118 ratings)</span>
											</div>
											<div className="try-free">
												<a onClick={(e) => { handleroute(e, 'az-400') }} style={{ cursor: "pointer" }}>Know More <i className="icon icon-font-arrow-right"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="list-item">
								<div className="course-img">
									<a >
										<figure>
											<img className="img-full" src="/images/msaz204.webp" alt="" />
										</figure>
									</a>
								</div>
								<div className="course-details">
									<div className="top">
										<a className="title" onClick={(e) => { handleroute(e, 'az-204') }} style={{ cursor: "pointer" }}>Exam AZ-204: Developing Solutions for Microsoft Azure</a>
										<div className="highlights">
											<div className="box"><i className="icon icon-font-note2"></i><span>273 Questions</span></div>
											<div className="box"><i className="icon icon-font-graduation-cap"></i><span>9,661 Learners</span></div>
										</div>
									</div>
									<div className="bottom">
										<div className="rating-block">
											<div className="stars-box">
												<figure><img className="img-full" src="/images/star-on.svg" alt="" /></figure>
												<samp>4.5</samp>
												<span>(199 ratings)</span>
											</div>
											<div className="try-free">
												<a onClick={(e) => { handleroute(e, 'az-204') }} style={{ cursor: "pointer" }}>Know More<i className="icon icon-font-arrow-right"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="list-item">
								<div className="course-img">
									<a >
										<figure>
											<img className="img-full" src="/images/msaz305.webp" alt="" />
										</figure>
									</a>
								</div>
								<div className="course-details">
									<div className="top">
										<a className="title" onClick={(e) => { handleroute(e, 'az-305') }} style={{ cursor: "pointer" }} >Designing Microsoft Azure Infrastructure Solutions: AZ-305</a>
										<div className="highlights">
											<div className="box"><i className="icon icon-font-note2"></i><span>145 Questions</span></div>
											<div className="box"><i className="icon icon-font-graduation-cap"></i><span>541 Learners</span></div>
										</div>
									</div>
									<div className="bottom">
										<div className="rating-block">
											<div className="stars-box">
												<figure><img className="img-full" src="/images/star-on.svg" alt="" /></figure>
												<samp>4.0</samp>
												<span>(3 ratings)</span>
											</div>
											<div className="try-free">
												<a onClick={(e) => { handleroute(e, 'az-305') }} style={{ cursor: "pointer" }}>Know More<i className="icon icon-font-arrow-right"></i></a>
											</div>
										</div>
									</div>
								</div>

							</div>

							<div className="list-item">
								<div className="course-img">
									<a >
										<figure>
											<img className="img-full" src="/images/msaz104.webp" alt="" />
										</figure>
									</a>
								</div>
								<div className="course-details">
									<div className="top">
										<a className="title" onClick={(e) => { handleroute(e, 'az-104') }} style={{ cursor: "pointer" }}>Exam AZ-104: Microsoft Azure Administrator</a>
										<div className="highlights">
											<div className="box"><i className="icon icon-font-note2"></i><span>280 Questions</span></div>
											<div className="box"><i className="icon icon-font-graduation-cap"></i><span>14,395 Learners</span></div>
										</div>
									</div>
									<div className="bottom">
										<div className="rating-block">
											<div className="stars-box">
												<figure><img className="img-full" src="/images/star-on.svg" alt="" /></figure>
												<samp>4.5</samp>
												<span>(368 ratings)</span>
											</div>
											<div className="try-free">
												<a onClick={(e) => { handleroute(e, 'az-104') }} style={{ cursor: "pointer" }}>Know More<i className="icon icon-font-arrow-right"></i></a>
											</div>
										</div>
									</div>
								</div>

							</div>
							<div className="list-item">
								<div className="course-img">
									<a >
										<figure>
											<img className="img-full" src="/images/msaz9001.webp" alt="" />
										</figure>
									</a>
								</div>
								<div className="course-details">
									<div className="top">
										<a className="title" onClick={(e) => { handleroute(e, 'az-900') }} style={{ cursor: "pointer" }}>Exam AZ-900: Microsoft Azure Fundamentals</a>
										<div className="highlights">
											<div className="box"><i className="icon icon-font-note2"></i><span>440 Questions</span></div>
											<div className="box"><i className="icon icon-font-graduation-cap"></i><span>38,665 Learners</span></div>
										</div>
									</div>
									<div className="bottom">
										<div className="rating-block">
											<div className="stars-box">
												<figure><img className="img-full" src="/images/star-on.svg" alt="" /></figure>
												<samp>4.5</samp>
												<span>(1612 ratings)</span>
											</div>
											<div className="try-free">
												<a onClick={(e) => { handleroute(e, 'az-900') }} style={{ cursor: "pointer" }}>Know More<i className="icon icon-font-arrow-right"></i></a>
											</div>
										</div>
									</div>
								</div>

							</div>
							<div className="list-item">
								<div className="course-img">
									<a >
										<figure>
											<img className="img-full" src="/images/dp-900.webp" alt="" />
										</figure>
									</a>
								</div>
								<div className="course-details">
									<div className="top">
										<a className="title" onClick={(e) => { handleroute(e, 'dp-900') }} style={{ cursor: "pointer" }}>Microsoft Azure Data Fundamentals ( DP-900 ) </a>
										<div className="highlights">
											<div className="box"><i className="icon icon-font-note2"></i><span>125 Questions</span></div>
											<div className="box"><i className="icon icon-font-graduation-cap"></i><span>1,528 Learners</span></div>
										</div>
									</div>
									<div className="bottom">
										<div className="rating-block">
											<div className="stars-box">
												<figure><img className="img-full" src="/images/star-on.svg" alt="" /></figure>
												<samp>4.5</samp>
												<span>(38 ratings)</span>
											</div>
											<div className="try-free">
												<a onClick={(e) => { handleroute(e, 'dp-900') }} style={{ cursor: "pointer" }}>Know More<i className="icon icon-font-arrow-right"></i></a>
											</div>
										</div>
									</div>
								</div>

							</div>
							<div className="list-item">
								<div className="course-img">
									<a >
										<figure>
											<img className="img-full" src="/images/ai-900.webp" alt="" />
										</figure>
									</a>
								</div>
								<div className="course-details">
									<div className="top">
										<a className="title" onClick={(e) => { handleroute(e, 'ai-900') }} style={{ cursor: "pointer" }}>Microsoft Azure AI Fundamentals ( AI-900 )</a>
										<div className="highlights">
											<div className="box"><i className="icon icon-font-note2"></i><span>125 Questions</span></div>
											<div className="box"><i className="icon icon-font-graduation-cap"></i><span>1,023 Learners</span></div>
										</div>
									</div>
									<div className="bottom">
										<div className="rating-block">
											<div className="stars-box">
												<figure><img className="img-full" src="/images/star-on.svg" alt="" /></figure>
												<samp>4.5</samp>
												<span>(29 ratings)</span>
											</div>
											<div className="try-free">
												<a onClick={(e) => { handleroute(e, 'ai-900') }} style={{ cursor: "pointer" }}>Know More<i className="icon icon-font-arrow-right"></i></a>
											</div>
										</div>
									</div>
								</div>

							</div>
							<div className="list-item">
								<div className="course-img">
									<a >
										<figure>
											<img className="img-full" src="/images/sc-900.webp" alt="" />
										</figure>
									</a>
								</div>
								<div className="course-details">
									<div className="top">
										<a className="title" onClick={(e) => { handleroute(e, 'sc-900') }} style={{ cursor: "pointer" }}>Microsoft Security, Compliance, and Identity Fundamentals ( SC-900 ) </a>
										<div className="highlights">
											<div className="box"><i className="icon icon-font-note2"></i><span>135 Questions</span></div>
											<div className="box"><i className="icon icon-font-graduation-cap"></i><span>690 Learners</span></div>
										</div>
									</div>
									<div className="bottom">
										<div className="rating-block">
											<div className="stars-box">
												<figure><img className="img-full" src="/images/star-on.svg" alt="" /></figure>
												<samp>4.5</samp>
												<span>(15 ratings)</span>
											</div>
											<div className="try-free">
												<a onClick={(e) => { handleroute(e, 'sc-900') }} style={{ cursor: "pointer" }}>Know More<i className="icon icon-font-arrow-right"></i></a>
											</div>
										</div>
									</div>
								</div>

							</div>
							<div className="list-item">
								<div className="course-img">
									<a >
										<figure>
											<img className="img-full" src="/images/ai-102.webp" alt="" />
										</figure>
									</a>
								</div>
								<div className="course-details">
									<div className="top">
										<a className="title" onClick={(e) => { handleroute(e, 'ai-102') }} style={{ cursor: "pointer" }}>Designing and Implementing a Microsoft Azure AI Solution ( AI-102 )  </a>
										<div className="highlights">
											<div className="box"><i className="icon icon-font-note2"></i><span>187 Questions</span></div>
											<div className="box"><i className="icon icon-font-graduation-cap"></i><span>125 Learners</span></div>
										</div>
									</div>
									<div className="bottom">
										<div className="rating-block">
											<div className="stars-box">
												<figure><img className="img-full" src="/images/star-on.svg" alt="" /></figure>
												<samp>4.5</samp>
												<span>(3 ratings)</span>
											</div>
											<div className="try-free">
												<a onClick={(e) => { handleroute(e, 'ai-102') }} style={{ cursor: "pointer" }}>Know More<i className="icon icon-font-arrow-right"></i></a>
											</div>
										</div>
									</div>
								</div>

							</div>
							
							
						</div>
					</div>
				</div>
				{/* <!-- google-certifications-section --> */}
				<div className="courses-section" id="google">
					<div className="container">
						<div className="caption">
							<div className="title">Google Cloud Certifications</div>
							<p>Get certified with one of the Google Cloud Certifications, and demonstrate your expertise on Google Cloud Platform (GCP).
							</p>
						</div>
						<div className="list-group">
							<div className="list-item">
								<div className="course-img">
									<a >
										<figure>
											<img className="img-full" src="/images/googleace.webp" alt="" />
										</figure>
									</a>
								</div>
								<div className="course-details">
									<div className="top">
										<a className="title" onClick={(e) => handleroute(e, 'gccace')} style={{ cursor: "pointer" }}>Google Cloud Certified Associate Cloud Engineer</a>
										<div className="highlights">
											<div className="box"><i className="icon icon-font-note2"></i><span>185 Questions</span></div>
											<div className="box"><i className="icon icon-font-graduation-cap"></i><span>9,874 Learners</span></div>
										</div>
									</div>
									<div className="bottom">
										<div className="rating-block">
											<div className="stars-box">
												<figure><img className="img-full" src="/images/star-on.svg" alt="" /></figure>
												<samp>4.5</samp>
												<span>(72 ratings)</span>
											</div>
											<div className="try-free">
												<a onClick={(e) => handleroute(e, 'gccace')} style={{ cursor: "pointer" }}>Know More <i className="icon icon-font-arrow-right"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="list-item">
								<div className="course-img">
									<a >
										<figure>
											<img className="img-full" src="/images/googledl.webp" alt="" />
										</figure>
									</a>
								</div>
								<div className="course-details">
									<div className="top">
										<a className="title" onClick={(e) => handleroute(e, 'gcccdl')} style={{ cursor: "pointer" }}>Google Cloud Digital Leader Certification</a>
										<div className="highlights">
											<div className="box"><i className="icon icon-font-note2"></i><span>152 Questions</span></div>
											<div className="box"><i className="icon icon-font-graduation-cap"></i><span>772 Learners</span></div>
										</div>
									</div>
									<div className="bottom">
										<div className="rating-block">
											<div className="stars-box">
												<figure><img className="img-full" src="/images/star-on.svg" alt="" /></figure>
												<samp>4.5</samp>
												<span>(72 ratings)</span>
											</div>
											<div className="try-free">
												<a onClick={(e) => handleroute(e, 'gcccdl')} style={{ cursor: "pointer" }}>Know More <i className="icon icon-font-arrow-right"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="list-item">
								<div className="course-img">
									<a >
										<figure>
											<img className="img-full" src="/images/googlecpc.webp" alt="" />
										</figure>
									</a>
								</div>
								<div className="course-details">
									<div className="top">
										<a className="title" onClick={(e) => handleroute(e, 'gccpca')} style={{ cursor: "pointer" }}>Google Cloud Certified Professional Cloud Architect</a>
										<div className="highlights">
											<div className="box"><i className="icon icon-font-note2"></i><span>305 Questions</span></div>
											<div className="box"><i className="icon icon-font-graduation-cap"></i><span>13,847Learners</span></div>
										</div>
									</div>
									<div className="bottom">
										<div className="rating-block">
											<div className="stars-box">
												<figure><img className="img-full" src="/images/star-on.svg" alt="" /></figure>
												<samp>4.5</samp>
												<span>(168 ratings)</span>
											</div>
											<div className="try-free">
												<a onClick={(e) => handleroute(e, 'gccpca')} style={{ cursor: "pointer" }}>Know More <i className="icon icon-font-arrow-right"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="list-item">
								<div className="course-img">
									<a >
										<figure>
											<img className="img-full" src="/images/googlepde.webp" alt="" />
										</figure>
									</a>
								</div>
								<div className="course-details">
									<div className="top">
										<a className="title" onClick={(e) => handleroute(e, 'gccpde')} style={{ cursor: "pointer" }}>Google Cloud Certified Professional Data Engineer</a>
										<div className="highlights">
											<div className="box"><i className="icon icon-font-note2"></i><span>220 Questions</span></div>
											<div className="box"><i className="icon icon-font-graduation-cap"></i><span>5,985 Learners</span></div>
										</div>
									</div>
									<div className="bottom">
										<div className="rating-block">
											<div className="stars-box">
												<figure><img className="img-full" src="/images/star-on.svg" alt="" /></figure>
												<samp>4.0</samp>
												<span>(59 ratings)</span>
											</div>
											<div className="try-free">
												<a onClick={(e) => handleroute(e, 'gccpde')} style={{ cursor: "pointer" }}>Know More<i className="icon icon-font-arrow-right"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	</>
}

	export default LibraryStatic;


export async function getServerSideProps() {
	const seoHomePageData = {
		seoPageType: "training", // This should be changed to reflect the actual page type
		title: "",
		metaTags: [{
			name: "robots",
			property: "",
			content: "noindex,nofollow",
		},
		],
	};
	
	return {
		props: {
		seoHomePageData,
		}, // will be passed to the page component as props
	};
}