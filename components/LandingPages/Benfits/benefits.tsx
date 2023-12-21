import { useEffect, useState } from 'react'
import styles from './Benefits.module.css'

const Benefits = ({pageContent})=>{
    const [benefits,setBenefits] = useState([])

    useEffect(()=>{
     setBenefits(JSON.parse(pageContent.benefits))
    },[pageContent])

    return <>
        <div className='container'>
            <div className={styles.benefits_title}>
                Benefits of {pageContent.title}
            </div>
            <div className={styles.benefitsblock}>
                {
                    benefits.map((itm)=>{
                        return <>
                            <div className={styles.benefits_inner_block}>
                                <div className={styles.benefits_img}>
                                    <img src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}benefits/${itm.image}`}/>
                                </div>
                                <div className={styles.benefits_text}>
                                {itm.title}
                                </div>
                            </div>
                        </>
                    })
                }
            </div>
        </div>
    </>
}

export default Benefits;