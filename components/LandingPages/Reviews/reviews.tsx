import { useEffect, useState } from 'react';
import styles from './Reviews.module.css'
import UserAvatar from "@/components/plugins/UserAvatar";
import Link from 'next/link';
import moment from "moment";
import { StarRating } from "@/components/import";
const Reviews = ({reviewsDatas,pageContent})=>{

    const [reviews,setReviews] = useState([])
    useEffect(()=>{
        setReviews(reviewsDatas)
    },[reviewsDatas])
    return <>
        <div className='container'>
            <div className={styles.lp_reviews_title}>
                What our students say about us
            </div>
            <div className={styles.lp_reviews_block}>
                {
                    reviews.map((rev,i)=>{
                        if(i<4){
                            return <>
                            <div className={styles.user_reviews}>
                                <div className={styles.user_img}>
                                <UserAvatar
                                            img={rev.profile_pic}
                                            alt={rev.post_addition?.course?.name}
                                            username={
                                              rev.post_addition.name
                                                ? rev.post_addition.name
                                                : rev.user_name
                                            }
                                          />
                                </div>
                                <div className={styles.user_content}>
                                    <div className={styles.top_section}>
                                        <div className={styles.name_starts}>
                                            <span style={{paddingRight:"10px"}}>{rev.post_addition.name ? (
                                                  <span> {rev.post_addition.name}</span>
                                                ) : (
                                                  <span>{rev.user_name}</span>
                                                )}</span>
                                            <span className='lp_rating_block'> 
                                            <StarRating
                                                isSingle={false}
                                                avgRating={rev.post_addition.rating}
                                                isSamp={false}
                                              />
                                            </span>
                                        </div>
                                        <div className={styles.posted_time}>
                                            <span>{moment(rev.created_at).fromNow()}</span>
                                            <span>
                                            {rev.is_verfied_buyer ? (
                                            <div className="verified-buyer" style={{paddingTop:"10px"}}>
                                              <i className="icon icon-font-verified-buyes" style={{color:"#2096f3"}}></i>
                                              <span style={{color:"black",paddingLeft:"5px"}}>Verified buyer</span>
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.review_title}>
                                    {rev.post_question_title}
                                    </div>
                                    <div className={styles.review_para}>
                                        {rev.post_question_text}
                                    </div>
                                </div>
                            </div>
                        </>
                        }
                    })
                }
            </div>
            <div className={styles.reviewsExtra}>
                    {pageContent.ratings.rating} People added feedback  <Link href={"/" + pageContent.seo_data?.slug + "/reviews/"}>
                                  <a className="link-showmore" target="_blank">
                                    Show more
                                  </a>
                                </Link>
                </div>
        </div>
    </>
}

export default Reviews;