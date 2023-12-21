
import styles from "./GlobalReviews.module.css"

const GlobalReviews = ()=>{
    return <>
        <div className="container">
           <div className={styles.globalrevies}>
           <div className={styles.img_size}>
                <img src={'/images/worldlp.png'}/>
            </div>
            <div className={styles.innerImage}>
                    <div className={styles.images_inner_lp}>
                        <img src={"/images/tplp.png"}/>
                    </div>
                    <div className={styles.images_inner_lp}>
                        <img src={"/images/g2lp.png"}/>
                    </div>
                    <div className={styles.images_inner_lp}>
                        <img src={"/images/o2lp.png"}/>
                    </div>
                </div>
           </div>
        </div>
    </>
}

export default GlobalReviews;