import { useEffect, useState } from "react";
import styles from "./CourseHeader.module.css";
import { StarRating } from "@/components/import";
import { PreviewCourseModal } from "@/components/shared/Modals";
const CourseHeader = ({ pageContent }) => {
  const [previewData, setPreviewData] = useState({
    courseImage: "",
    isOcAvailable: false,
    demoVideoLink: "",
    courseTitle: "",
    courseSlug: "",
    sellLevel: "",
    totaRatingCount: 0,
    averageRating: 0,
    courseLevel: "",
    courseDescription: "",
    detailedInfo: [],
    isOcComingSoon: false,
    isPtComingSoon: false,
  });

  const openPreviewModal = (datas) => {
    if (datas && datas.seo_data && datas.products && datas.products?.length > 0) {
      const product = datas.products.find((item) => item.product_type === "OC");
      let ptavailable = datas.products.find((item) => item.product_type == "PT");
      // console.log(ptavailable)
      let vailable = false;
      if (pageContent?.video_url?.length > 0 || datas.other_attributes.other_details.video_link.length > 0) {
        vailable = true;
      }

      let vailableDemo = pageContent?.video_url ? pageContent?.video_url :pageContent.other_attributes.other_details.video_link? pageContent.other_attributes.other_details.video_link: false;
      setPreviewData({
        isOcAvailable: vailable,
        demoVideoLink: vailableDemo,
        sellLevel: datas.seo_details?.sell_level,
        courseImage:
          process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
          datas.seo_data?.featured_image.replace("media/", ""),
        courseTitle: datas.seo_data?.title,
        courseSlug: datas.seo_data?.slug,
        totaRatingCount: datas.ratings.rating,
        averageRating: datas.ratings.overall_rating,
        courseLevel: datas.other_attributes.course_level,
        courseDescription: pageContent.short_description,
        detailedInfo: datas.detailedInfo,
        isOcComingSoon: product ? false : true,
        isPtComingSoon: ptavailable ? false : true,
      });
      document.querySelector("body").classList.add("open-modal-preview-course");
    }
  };
  return (
    <>
      <PreviewCourseModal previewData={previewData} />
      <div className={styles.landing_page_header}>
        <div className="container">
          <div className={styles.lp_header_container}>
            <div className={styles.lp_header_container_left}>
              <div className={styles.lp_course_title}>{pageContent.title}</div>
              <div className={styles.lp_course_description}>{pageContent.short_description}</div>
              <div className={styles.lp_ratings_learners}>
                <div className={styles.lp_ratings_top_block}>
                  <div className={styles.lp_rating_block}>
                    <div>
                      {(Math.floor(pageContent.ratings?.overall_rating * 2) / 2).toFixed(1)}
                    </div>
                  </div>
                  <div className={`${styles.lp_rating_stars} lp_rating_block`}>
                    <StarRating
                      isSamp={true}
                      avgRating={pageContent.ratings?.overall_rating}
                      totalRating={pageContent.ratings?.rating}
                    />
                  </div>
                </div>
                <div className={styles.lp_learners_count}>
                  <i className={`${styles.icons_size} icon icon-font-graduation-cap`}></i>
                  <span>{pageContent.webcounts?.learners_count} Learners</span>
                </div>
              </div>
              <div className={styles.lp_course_hls}>
                {pageContent.webcounts?.ques_count > 0 && (
                  <div className={styles.lp_course_hls_inner}>
                    <div>
                      <img className={styles.lp_course_hls_icon} src="/images/ptlp.svg" />
                    </div>
                    <div className={styles.lp_course_hls_txt}>
                      {pageContent.webcounts?.ques_count} Questions
                    </div>
                  </div>
                )}
                {pageContent.webcounts?.vid_count > 0 && (
                  <div className={styles.lp_course_hls_inner}>
                    <div>
                      <img className={styles.lp_course_hls_icon} src="/images/oclp.svg" />
                    </div>
                    <div className={styles.lp_course_hls_txt}>
                      {pageContent.webcounts?.vid_count} Videos
                    </div>
                  </div>
                )}
                {pageContent.webcounts?.lab_count > 0 && (
                  <div className={styles.lp_course_hls_inner}>
                    <div>
                      <img className={styles.lp_course_hls_icon} src="/images/lablp.svg" />
                    </div>
                    <div className={styles.lp_course_hls_txt}>
                      {pageContent.webcounts.lab_count} Labs
                    </div>
                  </div>
                )}
                {pageContent.detailedInfo?.sandbox_info?.length > 0 && (
                  <div className={styles.lp_course_hls_inner}>
                    <div>
                      <img className={styles.lp_course_hls_icon} src="/images/sandbox2.svg" />
                    </div>
                    <div className={styles.lp_course_hls_txt}>Cloud Sandbox</div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.lp_header_container_right}>
              <img
                src={
                  process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                  pageContent.seo_data?.featured_image.replace("media/", "")
                }
              />
              {pageContent.other_attributes?.other_details.video_link.length > 0 ||
              pageContent?.video_url?.length > 0 && false ? (
                <div
                  className={styles.lp_play_icon}
                  onClick={(e) => {
                    openPreviewModal(pageContent);
                  }}
                >
                  <img src="/images/playiconlp.svg" />
                </div>
              ) : (
                <div
                  className={styles.lp_play_icon}
                  onClick={(e) => {
                    openPreviewModal(pageContent);
                  }}
                >
                  <img src="/images/info-btn.svg" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseHeader;
