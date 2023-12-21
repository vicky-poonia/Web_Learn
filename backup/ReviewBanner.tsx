import Link from "next/link";
import { StarRating } from "../components/import";

const ReviewBanner = ({
  courseDatas,
  ratings,
  videoDatas,
  handleOpenVideoModal,
}) => {
  return (
    <div className="review-banner">
      <div className="container">
        <div className="left-part">
          <p className="banner-subtitle">{courseDatas.seo_details.title}</p>
          <h1 className="banner-title">
            We have over {ratings.total_count}+ happy learners reviews
          </h1>
          <p className="banner-subtitle">
            Explore the feedback from lots of happy learners
          </p>

          <StarRating
            bigSizeStar={true}
            isSamp={true}
            avgRating={ratings.avg_rating}
          />
          <Link href={"/" + courseDatas.seo_details.slug + "/reviews/write/"}>
            <button className="btn btn-write-review">
              <figure>
                <img
                  className="img-full"
                  src="/images/review-comment.svg"
                  alt=""
                />
              </figure>
              <span>Write a Review</span>
            </button>
          </Link>
        </div>
        {videoDatas && videoDatas.length > 0 ? (
          <div className="right-part">
            <div
              className="img-block"
              onClick={() => handleOpenVideoModal(videoDatas[0].video_url)}
            >
              <img className="img-full" src="/images/video-img42x.jpg" alt="" />
              <div className="btn-play">
                <img
                  className="img-full"
                  src="/images/play-btn-big-white.svg"
                  alt=""
                />
              </div>
              <div className="name-block">
                <div className="queote-img icon icon-font-quates"></div>
                <div>
                  <span>
                    {videoDatas[0].first_name} {videoDatas[0].last_name}
                  </span>
                  {/* <p>Senior Sofrware Engineer</p> */}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ReviewBanner;
