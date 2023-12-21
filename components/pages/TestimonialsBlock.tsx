import React, { useState } from "react";
import { VideoReviewModal } from "@/components/shared/Modals";
function TestimonialsBlock() {
    const [activeVideoUrl, setActiveVideoUrl] = useState(null);

    const openVideoModal = (url) => {
        document.body.classList.add("open-modal-review-video");
        setActiveVideoUrl(url);
    };
    const datas = [
        {
            thumbnail: "Daniel-whizlabs-review.webp",
            VUrl: "https://www.youtube.com/embed/O4lC2QZ28D8",
            ialt:"daniel about his learning experience in whizlabs platform"
        },
        {
            thumbnail: "karthik-whizlabs-review.webp",
            VUrl: "https://www.youtube.com/embed/HDKi-4ISvvo",
            ialt:"karthik shares his review about whizlabs courses"
        },
        {
            thumbnail: "krishna-whizlabs-review.webp",
            VUrl: "https://www.youtube.com/embed/75HgZTcef3Y",
            ialt:"krishna shares his experience about the quality of whizlabs courses"
        },
        {
            thumbnail: "casey-whizlabs-review.webp",
            VUrl: "https://www.youtube.com/embed/iFbeWbZZ9FU",
            ialt:"casey shares her feedback on whizlabs training materials"
        },
    ]
    return (
        <>
            <div className="testimonialContainer" style={{ position: 'relative' }}>
                <h4>10 Million+ Global Learners</h4>
                <div className="reviewsectionleft">
                    <img src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}whizlabs-reviews.webp`} alt="whizlabs is the most trusted upskilling platform for your workforce" />
                </div>
                <div className="testimonialwrapper">
                    <VideoReviewModal videoUrl={activeVideoUrl} />
                    <div className="container">
                        {/* <h2>Why do our Learners love us?</h2> */}
                        <div className="learners" >
                            {datas && datas.map((item, i) => (
                                <div className="learner-box" key={i} >
                                    <figure className="main-img"><img className="img-full" src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}${item.thumbnail}`} alt={item.ialt} /></figure>
                                    <figure className="play-icon" id="playIcon"><a className="learner keen-slider__slide" onClick={() => openVideoModal(item.VUrl)} target="_blank"><img className="img-full" src={"/images/play-border.png"} alt="" /></a></figure>
                                    <div className="user-block"></div>
                                    <div className="gradient"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TestimonialsBlock;

{/* 
<a href="https://www.youtube.com/watch?v=O4lC2QZ28D8" target="_blank"></a>
<a href="https://www.youtube.com/watch?v=HDKi-4ISvvo" target="_blank"></a>
<a href="https://www.youtube.com/watch?v=75HgZTcef3Y" target="_blank"></a>
<a href="https://www.youtube.com/watch?v=O4lC2QZ28D8" target="_blank"></a> 
*/}
{/* <div className="reviewsectionright">
                    <div className="reviewCard" style={{backgroundImage:`url('/images/karthikreview.png')`}} >
                        <div className="playiconhome">
                            <img src="/images/homeplay.png"/>
                        </div>
                    </div>
                    <div className="reviewCard" style={{backgroundImage:`url('/images/reviewdaniel.png')`}} >
                        <div className="playiconhome">
                            <img src="/images/homeplay.png"/>
                        </div>
                    </div>
                    <div className="reviewCard" style={{backgroundImage:`url('/images/reviewkrishna.png')`}} >
                        <div className="playiconhome">
                            <img src="/images/homeplay.png"/>
                        </div>
                    </div>
                    <div className="reviewCard" style={{backgroundImage:`url('/images/reviewcasey.png')`}} >
                        <div className="playiconhome">
                            <img src="/images/homeplay.png"/>
                        </div>
                    </div>
                </div> */}