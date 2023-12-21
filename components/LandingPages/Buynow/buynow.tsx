import { connect } from 'react-redux';
import styles from './Buynow.module.css'
import { updateRedirection } from 'redux/Redirection/redirect-actions';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';

const Buynow = ({pageContent,userData,redirectionAction})=>{

  const [selectedCourseType,setselectedCourseType] = useState([])

  const router = useRouter();
  const path = router.pathname;

  useEffect(()=>{
    if(pageContent){
      let selectedCourse = []
      pageContent.products?.forEach((itm)=>{
        if(!pageContent.enrolledProductTypes?.includes(itm.product_type)){
          selectedCourse.push(itm.product_type.toLowerCase())
        }
      })
      setselectedCourseType(selectedCourse)
    }
  },[pageContent,userData])

   const handlebuyNow = ()=>{
    if(userData && userData.data){
      const redirectSlug = `/${pageContent.course_slug.slug}/checkout?prod=${selectedCourseType.join(":")}&landing=true&landing_slug=${pageContent.page_slug}`;
      router.push(redirectSlug);
    }else{
      const redirectSlug = `/${pageContent.course_slug.slug}/checkout?prod=${selectedCourseType.join(":")}&landing=true&landing_slug=${pageContent.page_slug}`;
      // console.log(redirectSlug)
      if (!userData || !userData.data || !userData.data.user_id) {
        redirectionAction("REDIRECT", redirectSlug); // after sign in redirect to direct checkout Page
        document.querySelector("body").classList.add("open-modal-login");
      }
    }
   }

    return<>
    <div className="container">
        <div className={styles.buynowbox}>
            <div className={styles.buynowtxt}>
            {pageContent.buy_now_text}
            </div>
            <div className={styles.buynow_btn} onClick={(e)=>{
                handlebuyNow()
            }}>
                Buy Now
            </div>
        </div>
    </div>
    </>
}

const mapStateToProps = (state) => {
    return {
      userData: state.authData.userData,
      currencyData: state.ipDetails.currency_detail,
      redirectTo: state.redirectData.redirect_to,
      utmData: state.utmData,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      redirectionAction: (data, url) => dispatch(updateRedirection(data, url)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Buynow);
