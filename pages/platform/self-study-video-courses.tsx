import Link from "next/link";
import { useState,useEffect } from "react";
import { VideoReviewModal} from "@/components/shared/Modals";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const Videocouse = ({ }) => {
	const [activeVideoUrl, setActiveVideoUrl] = useState(null);
	const [isBreakpoint, setIsBreakpoint] = useState(1);

	useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        function handleResize() {
            const { innerWidth: width, innerHeight: height } = window;
            if (width <= 450) {
                setIsBreakpoint(1);
            } else if (width >= 451 && width <= 640) {
                setIsBreakpoint(2);
            }
            else if (width >= 641 && width <= 767) {
                setIsBreakpoint(3);
            }
            else {
                setIsBreakpoint(4)
            }
        }
    }, []);

    const [currentSlide, setCurrentSlide] = useState(0);
    const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
        slidesPerView: isBreakpoint,
        initial: 1,
        spacing: 20,
        slideChanged(s) {
            setCurrentSlide(s.details().relativeSlide);
        },
    });

	const openVideoModal = (url) => {	
		document.body.classList.add("open-modal-review-video");
		setActiveVideoUrl(url);
	}
	return <>
		 {/* <Head>
        <link href="/css/owl.carousel.css" rel="stylesheet" />
        <link href="/css/owl.theme.default.css" rel="stylesheet" />
      </Head> */}
		<div id="wrapper">
		<VideoReviewModal videoUrl={activeVideoUrl} />
		<div className="video-course-banner">
			<div className="container">
				<div className="caption-block">
					<span className="blue-txt">Whizlabs Video Courses</span>
					<h1 className="title">Deep dive into the latest tech skills with our expert-curated Video Courses</h1>
					<p>Visual learning is one of the fastest and most effective tools for technology training. With Whizlabs Video Courses, you can learn directly from the industry experts, anytime and anywhere. Get started on your upskilling journey and stay ahead of the crowd!</p>
					<Link href="/pricing" >
						<div className="btn btn-start link-videolp">
							Get Started
						</div>
					</Link>
				</div>
				<figure className="img-block">
					<img className="img-full" src="/images/right-videoBanner-img.webp" />
				</figure>
			</div>
		</div>
		<div id="content-area">
			<div className="shape-your-skills">
				<div className="container">
					<div className="caption-block">
						<h2>Shape your skills and transform your career</h2>
						<p>With new technologies being introduced on an everyday basis, upgrading your skills becomes a need, and not just a choice. Prepare yourself for a better IT career with our skill enriching video courses.</p>
					</div>
					<div className="skills-group">
						<div className="skill">
							<figure>
								<img className="img-full" src="/images/syllabus.webp" />
							</figure>
							<label>100% syllabus coverage</label>
							<p>To make sure you are well prepared for every topic that is a part of your exam syllabus.</p>
						</div>
						<div className="skill">
							<figure>
								<img className="img-full" src="/images/updated.webp" />
							</figure>
							<label>Regularly updated content</label>
							<p>To provide you with updated training resources as per the latest changes in the exam syllabus.</p>
						</div>
						<div className="skill">
							<figure>
								<img className="img-full" src="/images/24X7expert.webp" />
							</figure>
							<label>24X7 Expert Support</label>
							<p>To resolve your queries as and when they arise and offer you a smooth learning experience.</p>
						</div>
					</div>
				</div>
			</div>
			<div className="courses-sec">
				<div className="container">
					<div className="caption-block">
						<h2>Have you explored our Training Library of 250+ Courses?</h2>
						<p>Here are some of our popular course categories!</p>
					</div>
					<div className="courses-group">
						<a className="course course-vlp" onClick={(e) => {
							e.preventDefault()
							window.location.href = "/cloud-certification-training-courses"
						}}>
							<figure>
								<img className="img-full" src="/images/cloud-icon.svg" />
							</figure>
							<label>Cloud</label>
						</a>
						<a className="course course-vlp" onClick={(e) => {
							e.preventDefault()
							window.location.href = "/devops-certifications"
						}} >
							<figure>
								<img className="img-full" src="/images/DevOps-icon.svg" />
							</figure>
							<label>DevOps</label>
						</a>
						<a className="course course-vlp" onClick={(e) => {
							e.preventDefault()
							window.location.href = "/oracle-java-certifications"
						}}>
							<figure>
								<img className="img-full" src="/images/java-icon.svg" />
							</figure>
							<label>Java</label>
						</a>
						<a className="course course-vlp" onClick={(e) => {
							e.preventDefault()
							window.location.href = "/microsoft-certifications"
						}}>
							<figure>
								<img className="img-full" src="/images/microsoft-icon.svg" />
							</figure>
							<label>Microsoft</label>
						</a>
						<a className="course course-vlp" onClick={(e) => {
							e.preventDefault()
							window.location.href = "/cyber-security-certifications"
						}}>
							<figure>
								<img className="img-full" src="/images/security-icon.svg" />
							</figure>
							<label>Security</label>
						</a>
						<a className="course course-vlp" onClick={(e) => {
							e.preventDefault()
							window.location.href = "/linux-certifications"
						}}>
							<figure>
								<img className="img-full" src="/images/linux-icon.svg" />
							</figure>
							<label>Linux</label>
						</a>
						<a className="course course-vlp" onClick={(e) => {
							e.preventDefault()
							window.location.href = "/python"
						}}>
							<figure>
								<img className="img-full" src="/images/python-icon.svg" />
							</figure>
							<label>Python</label>
						</a>
						<a className="course link-more course-vlp" onClick={(e) => {
							e.preventDefault()
							window.location.href = "/library"
						}}>
							<figure>
								<img className="img-full" src="/images/more-icon.svg" />
							</figure>
							<label>More</label>
						</a>
					</div>
					<div className="btn-group course-vlp" onClick={(e) => {
						e.preventDefault()
						window.location.href = "/library"
					}}>
						<a className="btn btn-explore explore-vlp " >Explore Our Courses</a>
					</div>
				</div>
			</div>
			<div className="videos-detailed">
				<div className="container">
					<div className="img-caption">
						<div className="caption">
							<h3>Detailed videos on every topic</h3>
							<p>Don’t leave any topic unexplored. Get well prepared for your certification exam with our video courses that cover every topic in detail.</p>
						</div>
						<figure className="imgBlock">
							<img className="img-full" src="/images/video-detailed1.webp" />
						</figure>
					</div>
					<div className="img-caption">
						<div className="caption">
							<h3>Short and Simple Learning Modules</h3>
							<p>Exploring new skills can be overwhelming. We are here to ensure you of a comfortable learning journey with our short and simple learning modules. Learn at your own pace without getting bored of lengthy lectures.</p>
						</div>
						<figure className="imgBlock">
							<img className="img-full" src="/images/video-detailed2.webp" />
						</figure>
					</div>
					<div className="img-caption">
						<div className="caption">
							<h3>Continue from where you left!</h3>
							<p>Learning is a gradual process and cannot be done in one day. With Whizlabs Video Courses, you can continue from where you left without losing track of your completed lessons.</p>
						</div>
						<figure className="imgBlock">
							<img className="img-full" src="/images/video-detailed3.webp" />
						</figure>
					</div>
					<div className="img-caption">
						<div className="caption">
							<h3>Integration with Hands-On Labs</h3>
							<p>While Video Courses are to clear your theoretical concepts, Hands-on Labs allow you to apply your knowledge in a real-time environment. We offer you both by integrating our video courses with the suitable hands-on labs!</p>
						</div>
						<figure className="imgBlock">
							<img className="img-full" src="/images/video-detailed4.webp" />
						</figure>
					</div>
					<div className="img-caption">
						<div className="caption">
							<h3>Course Completion Certificate</h3>
							<p>Achievements deserve rewards! Get your own shiny Certification of Completion after finishing the video course and flaunt it on your LinkedIn profile.</p>
						</div>
						<figure className="imgBlock">
							<img className="img-full" src="/images/video-detailed5.webp" />
						</figure>
					</div>
					<div className="img-caption">
						<div className="caption">
							<h3>Ask The Experts</h3>
							<p>Getting stuck with a query? Our subject matter experts are there for you during your entire preparation journey to resolve your doubts on the go.</p>
						</div>
						<figure className="imgBlock">
							<img className="img-full" src="/images/video-detailed6.webp" />
						</figure>
					</div>
				</div>
			</div>
			<div className="compare-plans">
				<div className="container">
					<div className="caption-block">
						<p>Ace your certification exams with confidence and accomplish your career goals with Whizlabs</p>
						<a className="btn btn-plans"  onClick={(e)=>{
						e.preventDefault()
						window.location.href = '/pricing'
					}}>Compare Plans <i className="icon icon-font-arrow-right"></i></a>
					</div>
					<figure className="img-block">
						<img className="img-full" src="/images/right-compare.webp" alt="" />
					</figure>
				</div>
			</div>
			<section className="learners-sec">
                    <div className="container">
                        <h2>Listen To What <strong>Our Learners Have To Say</strong></h2>
                        <div
                            className="slider-blocks keen-slider"
                            ref={sliderRef}

                        >
                            <div className="learner keen-slider__slide"
                                onClick={() => openVideoModal("https://www.youtube.com/embed?v=44wakGMRAqA&list=PLE17r5uStneIqaxAoLVBrnvt3ZTzklWcZ&index=1")}
                            >
                                <figure className="main-img"><img className="img-full img-review" src="/images/review1.png" alt="" /></figure>
                                <figure className="play-icon" id="playIcon">
                                    <img className="img-full" src="/images/play-border.png" alt="" /></figure>
                                <div className="user-block">
                                    <label className="name">Wizlabs user</label>
                                    <span className="desi">Creator</span>
                                </div>
                                <div className="gradient"></div>
                            </div>
                            <div className="learner keen-slider__slide"
                                onClick={() => openVideoModal("https://www.youtube.com/embed?v=zSmMmA9v8qA&list=PLE17r5uStneIqaxAoLVBrnvt3ZTzklWcZ&index=2")}
                            >
                                <figure className="main-img"><img className="img-full img-review" src="/images/review2.png" alt="" /></figure>
                                <figure className="play-icon" id="playIcon"><img className="img-full" src="/images/play-border.png" alt="" /></figure>
                                <div className="user-block">
                                    <label className="name">Prithvi Muddagouni</label>
                                    <span className="desi">Software Engineer</span>
                                </div>
                                <div className="gradient"></div>
                            </div>
                            <div className="learner keen-slider__slide"
                                onClick={() => openVideoModal("https://www.youtube.com/embed?v=bPCKT73xOwM&list=PLE17r5uStneIqaxAoLVBrnvt3ZTzklWcZ&index=3")}
                            >
                                <figure className="main-img"><img className="img-full img-review" src="/images/review3.png" alt="" /></figure>
                                <figure className="play-icon" id="playIcon"><img className="img-full" src="/images/play-border.png" alt="" /></figure>
                                <div className="user-block">
                                    <label className="name">Juan Cardona</label>
                                    <span className="desi">Cloud Cybersecurity Engineer</span>
                                </div>
                                <div className="gradient"></div>
                            </div>
                            <div className="learner keen-slider__slide"
                                onClick={() => openVideoModal("https://www.youtube.com/embed?v=5SLzylxKIas&list=PLE17r5uStneIqaxAoLVBrnvt3ZTzklWcZ&index=4")}
                            >
                                <figure className="main-img"><img className="img-full img-review" src="/images/review6.jpeg" alt="" /></figure>
                                <figure className="play-icon" id="playIcon"><img className="img-full" src="/images/play-border.png" alt="" /></figure>
                                <div className="user-block">
                                    <label className="name">Agassi Joel</label>
                                    <span className="desi">Associate Solution Advisor</span>
                                </div>
                                <div className="gradient"></div>
                            </div>
                        </div>
                        {(isBreakpoint == 2 || isBreakpoint == 1) && <>
                            <div className="learners-arrow">
                                <div className="arrow1" onClick={(e) => {
                                    e.preventDefault()
                                    if (currentSlide != 0) {
                                        slider.prev()
                                    }
                                }}
                                    style={currentSlide == 0 ? { color: "grey", background: "#bcb6b6" } : { color: "black" }}
                                >&#8592;</div>
                                <div className="arrow2" onClick={(e) => {
                                    e.preventDefault()
                                    if (currentSlide != 3) {
                                        slider.next()
                                    }
                                }}
                                    style={currentSlide == 3 ? { color: "grey", background: "#bcb6b6" } : { color: "black" }}
                                >&#8594;</div>
                            </div>
                        </>}
                    <div className="btn-group course-vlp" onClick={(e)=>{
						e.preventDefault()
						window.location.href = '/pricing'
					}}>
                        <a  className="btn btn-start">Get Started</a>
                    </div>
                </div>
                <div className="gradient"></div>
            </section>
		</div>
		</div>
		
	</>
}

export default Videocouse;