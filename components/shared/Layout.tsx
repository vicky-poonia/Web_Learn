import Header from "./Header";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { AlertBox } from "@/components/import";
import CookieConsent from "./CookieConsent";
import { storeIp } from "redux/IpToLocation/ip-actions";
import { alertBox } from "redux/AlertBox/alert-actions";
import { storeUtm } from "redux/UTM/utm-actions";
import React, { Children, useEffect, useState } from "react";
import cookie from "js-cookie";
import Head from "next/head";
import FooterWrapper from "./FooterWrapper";
import path from "path";
import axios from "axios";
import { PopupModal,Courseexpirypopup } from "./Modals";
import {OfferStart,StoreCampaignInfo,offerClear} from "redux/campaign/campaign-action"
import CommonTimer from "../Timer/Timer";
import OfferHeader from "../Offerheader/OfferHeader";
import { storeUserProfile } from "redux/UserProfile/profile-actions";
import {enrollCourseDetail} from "redux/UserEnrolled/enroll-action"


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const Layout = ({
  children,
  menusList,
  alertBoxAction,
  alertMessage,
  footerData,
  slackData,
  websiteSettings,
  ip_details,
  userData,
  storeIpDetails,
  storeUtmAction,
  userSubscriptionData,
  promoData,
  user_type,
  user_enrolled,
  timer_details,
  stopTimer,
  timerRunning,
  timerState,
  maintenance_details,
  offerHeader,
  storeCampaignAction,
  updateuserprofile,
  userEnrolledStoreAction
}) => {

  const router = useRouter();
  const pathName = router.pathname;
  let headerCss = "";
  let headerScripts = "";
  let googleAnalyticCode = "";
  let footerScripts = "";

  const [bottomBannerCondition, setBottomBannerCondition] = useState("");
  const [bannerActive, setBannerActive] = useState(false);
  const [lifetimeBannerActive, setLifetimeBannerActive] = useState(false);
  const [oneMonthBannerActive, setOneMonthBannerActive] = useState(false);
  const [cookieConsent, setCookieConsent] = useState(false);
  const [subscribedUser, setSubscribedUser] = useState(false);
  const [sub_notexpired,set_sub_notexpired] = useState(false)
  const [subs_curr,setsub_current] = useState(null)
  const [showOfferHeaderTimer, setShowOfferHeaderTimer] = useState(false);
  // const [waIconVisible, setWAIconVisible] = useState(true)

  // const [countDown,SetCountDown]= useState({
  //   days:null,
  //   hours:null,
  //   min:null,
  //   sec:null
  // })

  useEffect(()=>{
    if(timer_details){
      // console.log(timer_details)
      let end_date = new Date(timer_details.details.utc_endtime).getTime()
      let start_date = new Date(timer_details.details.utc_starttime).getTime()
      let nowTime = new Date().toISOString()
      let now_time = new Date(nowTime).getTime()
      if( now_time < start_date || now_time > end_date || !timer_details.details.state){
        stopTimer();
      }else{
        timerRunning()
        processTimer(timer_details)
        storeCampaignAction(timer_details.details.offer_details.offer_type)
      }
    }
  },[timer_details])

  const processTimer = async(itm)=>{
    if(itm){
      if(itm.details?.state){
        let end_date = new Date(timer_details.details.utc_endtime).getTime()
        const timerIntraval  = setInterval(()=>{
          let nowTime = new Date().toISOString()
          let now = new Date(nowTime).getTime()
          let diff = end_date - now
          if(diff > 0){
            let diff_sec = diff/1000

            let days = Math.floor(diff_sec / 86400);
            let hours = Math.floor((diff_sec - days * 86400) / 3600);
            let min = Math.floor((diff_sec - days * 86400 - hours * 3600) / 60);
            let sec = Math.floor(diff_sec - days * 86400 - hours * 3600 - min* 60);
            
            let d = days > 9 ? `${days}`: `0${days}`
            let h = hours > 9 ? `${hours}` : `0${hours}`
            let m = min > 9 ? `${min}` : `0${min}`
            let s = sec > 9 ? `${sec}` : `0${sec}`

            if(document){
              if(document.getElementById("mytimer-days") &&
              document.getElementById("mytimer-hours") &&
              document.getElementById("mytimer-min") &&
              document.getElementById("mytimer-sec")
              ){
                document.getElementById("mytimer-days").innerHTML = d;
                document.getElementById("mytimer-hours").innerHTML = h;
                document.getElementById("mytimer-min").innerHTML = m;
                document.getElementById("mytimer-sec").innerHTML = s;
              }
            }

            // SetCountDown({
            //   days:Math.floor(days),
            //   hours:Math.floor(hours),
            //   min:Math.floor(min),
            //   sec:Math.floor(sec)
            // })
          }else{
            //make the timer state to false
            //remove all timer functions
            //clear the intraval
            stopTimer()
            router.push('/')
            // SetCountDown(null)
            clearInterval(timerIntraval)
          }
        },1000)
      }
    }
  }

  websiteSettings.forEach(function (item) {
    if (item.key == "website_header_script") {
      headerScripts = item.value;
    }

    if (item.key == "website_header_css") {
      headerCss = item.value;
    }
    if (item.key == "website_googleanalyticcode") {
      googleAnalyticCode = item.value;
    }
    if (item.key == "website_footer_script") {
      footerScripts = item.value;
    }
  });



  useEffect(()=>{
    if(userData)
    {
      updateuserprofile(userData.data.token)
      userEnrolledStoreAction(userData.data.user_id)
    }
  },[userData])

  useEffect(()=>{
    if(userSubscriptionData &&  userSubscriptionData.active_plans){
      setsub_current(userSubscriptionData?.active_plans)
    } 
  },[userSubscriptionData])
  
  useEffect(() => {
    // Store UTM Data
    if (window && window.location.search && window.location.search.includes("utm_source")) {
      storeUtmAction(window.location.search);
    }

    if (
      window &&
      (window.location.pathname === "/login/" || window.location.pathname === "/register/")
    ) {
      if (!userData) {
        document.body.classList.add("open-modal-login");
      }
      router.push("/");
    }

    const bottomBannerActive = cookie.get("subs_bottom_banner");
    setBannerActive(bottomBannerActive ? false : true);

    const bannerCondition = cookie.get("bottom_banner_condition");
    setBottomBannerCondition(typeof bannerCondition != "undefined" ? bannerCondition : "");

    const lifetimeBanner = cookie.get("lifetime_membership_banner");
    setLifetimeBannerActive(lifetimeBanner ? false : true);

    const oneMonthBanner = cookie.get("one_month_offer_banner");
    setOneMonthBannerActive(oneMonthBanner ? false : true);

    const cookieAccepted = cookie.get("cookie_consent_accept");
    setCookieConsent(cookieAccepted ? false : true);

    // if(pathName.includes('checkout') || pathName.includes('amazon/employees') || pathName.includes('thankyou')){
    //   setWAIconVisible(false)
    // }
  }, []);
  
  useEffect(() => {
    if (
      subs_curr &&
      subs_curr.length > 0
    ) {
      let status = sub_notexpired;
      subs_curr.map((itm)=>{
        status = status || itm.is_plan_active
      })
      // setExpireduser = false users still have active subcription /// setExpireduser = true user
      // subscription expired
      set_sub_notexpired(status)
      setSubscribedUser(true);
    } else {
      setSubscribedUser(false);
    }
  }, [subs_curr]);

  useEffect(() => {
    storeIpDetails(ip_details);
  }, [ip_details]);

  const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <>
      <div id="googleAnalyticCode" dangerouslySetInnerHTML={{ __html: googleAnalyticCode }} />
      <div id="headerScripts" dangerouslySetInnerHTML={{ __html: headerScripts }} />
      <div id="headerCss" dangerouslySetInnerHTML={{ __html: headerCss }} />
      {router.asPath == '/' &&  <Courseexpirypopup userEnrolled = {user_enrolled} subs = {subs_curr}/>}
      <CommonTimer offerHeader={offerHeader} setOfferHeaderTimer={setShowOfferHeaderTimer} showTimer={showOfferHeaderTimer}/>
      <div id="wrapper" className={pathName.includes("/amazon/employees") ? "employees-page" : ""} style={pathName.includes("register") || pathName.includes("login")?{margin:"0px"}:{}}>
        <AlertBox alertMessage={alertMessage} alertBoxAction={alertBoxAction} />
        <OfferHeader userData={userData} showTimer={showOfferHeaderTimer} data={offerHeader}/>
        {!pathName.includes("/register") &&
          !pathName.includes("/verifyuser") &&
          !pathName.includes("/login") &&
          !pathName.includes("/password/reset") &&
          !pathName.includes("/beta-login") &&
          !pathName.includes("/azure-ad-login") && (
            <Header
              subscribedUser={subscribedUser}
              pathName={pathName}
              menusList={menusList}
              userSubscriptionData = {subs_curr}
              user_type = {user_type}
              maintenance_details = {maintenance_details}
              headless={
                pathName.includes("/aws") ||
                pathName.includes("/azure") ||
                pathName.includes("/devops") ||
                pathName.includes("/gcp") ||
                pathName.includes("/ft-course-library") ||
                (router.asPath === `/aws-ccp/`) ||
                (router.asPath === `/aws-cda/`) ||
                (router.asPath === `/aws-sysops/`) ||
                (router.asPath === `/aws-csap/`) ||
                (router.asPath === `/aws-devops/`) ||
                (router.asPath === `/aws-csaa/`) ||
                (router.asPath === `/az-900/`) ||
                (router.asPath === `/az-104/`) ||
                (router.asPath === `/az-305/`) ||
                (router.asPath === `/az-204/`) ||
                (router.asPath === `/az-400/`) ||
                (router.asPath === `/dp-203/`) ||
                (router.asPath === `/gccace/`) ||
                (router.asPath === `/gccpca/`) ||
                (router.asPath === `/gcccdl/`) ||
                (router.asPath === `/gccpde/`) ||
                (router.asPath === `/dp-900/`) ||
                (router.asPath === `/ai-900/`) ||
                (router.asPath === `/sc-900/`) ||
                (router.asPath === `/ai-102/`) ||
                pathName.includes('/training/library')||
                pathName.includes('/gdgcloudpune')
              }
              staticpage={
                (router.asPath === `/aws-ccp/`) ||
                (router.asPath === `/aws-cda/`) ||
                (router.asPath === `/aws-sysops/`) ||
                (router.asPath === `/aws-csap/`) ||
                (router.asPath === `/aws-devops/`) ||
                (router.asPath === `/aws-csaa/`) ||
                (router.asPath === `/az-900/`) ||
                (router.asPath === `/az-104/`) ||
                (router.asPath === `/az-305/`) ||
                (router.asPath === `/az-204/`) ||
                (router.asPath === `/az-400/`) ||
                (router.asPath === `/dp-203/`) ||
                (router.asPath === `/gccace/`) ||
                (router.asPath === `/gccpca/`) ||
                (router.asPath === `/gcccdl/`) ||
                (router.asPath === `/gccpde/`) ||
                (router.asPath === `/dp-900/`) ||
                (router.asPath === `/ai-900/`) ||
                (router.asPath === `/sc-900/`) ||
                (router.asPath === `/ai-102/`) ||
                pathName.includes('/training/library')
              }
              containerSmall={
                pathName.includes("/aws/[slug]") ||
                pathName.includes("/azure/[slug]") ||
                pathName.includes("/devops/[slug]") ||
                pathName.includes("/gcp/[slug]")
              }
              // waIconVisible = {waIconVisible}
            />
          )}
        {children}
        <FooterWrapper
          data={footerData}
          pathName={pathName}
          slackData={slackData}
          footerScripts={footerScripts}
          subscribedUser={subscribedUser}
          bannerActive={bannerActive}
          promoData={promoData}
          subcribed_not_expired = {sub_notexpired}
          user_type={user_type}
          timer_details={timer_details}
        />

        {cookieConsent && <CookieConsent />}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    alertMessage: state.alertBox.datas,
    userData: state.authData.userData,
    userSubscriptionData: state.userProfileData.userSubscriptionData,
    user_type: state.userProfileData.user_type || "",
    user_enrolled : state.enrolled.enrolled,
    timerState:state.timer.timer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeIpDetails: (ip_details) => dispatch(storeIp(ip_details)),
    alertBoxAction: (data) => dispatch(alertBox(data)),
    storeUtmAction: (data) => dispatch(storeUtm(data)),
    stopTimer:()=> dispatch(offerClear()),
    timerRunning:()=> dispatch(OfferStart()),
    storeCampaignAction:(data)=> dispatch(StoreCampaignInfo(data)),
    updateuserprofile: (token) => dispatch(storeUserProfile(token)),
    userEnrolledStoreAction:(user_id)=>dispatch(enrollCourseDetail(user_id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
