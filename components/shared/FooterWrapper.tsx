import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import FootLess from "./FootLess";
import ExclusiveOfferBanner from "./ExclusiveOfferBanner";
import BlackfridayFooter from "./Blackfirday-footerBanner";
import CCPFooterBanner from "./CCPFooterBanner";
import { useRouter } from "next/router";
import axios from "axios";
import { connect } from "react-redux";
import UniqueProdBanner from "./UniqueProdBanner";
import PriceGoingUpBanner from "./PriceGoingUpBanner";
import SpringSaleFooter from "./SpringSaleFooter";
import PPCbanner from "./PPCbanner";
import MayDaySuperSaleBannerFooter from "./MayDaySuperSaleBannerFooter";
import LabChallengeBannerFooter from "./LabChallengeBannerFooter";
import BlackfirdayPricing from "./Blackfriday-pricing";
import BlackfirdayLibrary from "./Banner-library";
import cookie from 'js-cookie';
/**
 * UniqueProdPromo E.G. 
 * {
    offer_slug: `snowflake-snowpro-core-certification`,
    offer_name: `Snowflake SnowPro Core Certification`,
    offer_desc: `Get the entire training package at flat 40% off`,
    offer_coupon: `WHIZ40Snowflake`,
    end_date: "29 April 2022 11:00:00 GMT+05:30",
  }
*/
const UniqueProdPromo = [];

const FooterWrapper = ({
  data,
  pathName,
  slackData,
  footerScripts,
  subscribedUser,
  bannerActive,
  promoData,
  userData,
  subcribed_not_expired,
  user_type,
  timer_details,
  timerState
}) => {
  const router = useRouter();

  let pageSlug = router.asPath; // e.g: /advanced-java-course/

  // removing '/' from the pageSlug
  if (pageSlug) pageSlug = pageSlug.replace(/\//g, "");

  const [promoResp, setPromoResp] = useState({ data: [], slugs: [] });
  const [crazyDealFooter, setCrazyDealFooter] = useState(false);
  const [crazyDealFooterData, setCrazyDealFooterData] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [uniquePromo, setUniquePromo] = useState(null);

  useEffect(() => {
    setIsEnrolled(false);
    if (promoData.data && promoData.data.length > 0) {
      setPromoResp({ data: promoData.data, slugs: promoData.slugs });

      const courseData = promoData.data.find((Itm) => pageSlug.includes(Itm.course_slug)) || null;

      if (userData && courseData) {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/users/user-course-enroll-status`,
            {
              course_id: courseData.course_id,
            },
            {
              headers: {
                Authorization: userData.data.token,
              },
            }
          )
          .then(({ data: axiosResp }) => {
            if (axiosResp.data) {
              const enrolledProds = axiosResp.data.products || [];
              if (enrolledProds.includes("PT") || enrolledProds.includes("OC")) {
                setIsEnrolled(true);
              }
            }
          });
      }
    }
  }, [promoData]);

  useEffect(() => {
    if (promoResp && promoResp.data.length > 0) {
      //WEB-1580
      //pageSlug/split('?').split[0] is added because during promation whi;le sending email slug is not matched properly
      if (promoResp.slugs.includes(pageSlug.split('?')[0])) {
        setCrazyDealFooter(true);
        // console.log(promoResp.data)
        const crazyData = promoResp.data.find((itm) => itm.course_slug == pageSlug.split('?')[0]);
        setCrazyDealFooterData(crazyData);
      } else {
        setCrazyDealFooter(false);
        setCrazyDealFooterData(null);
      }
    }
  }, [promoResp, pageSlug]);

  useEffect(() => {
    if (UniqueProdPromo.length > 0) {
      const promo = UniqueProdPromo.filter((p) => router.asPath.includes(p.offer_slug))[0];
      setUniquePromo(promo);
    }
  }, [UniqueProdPromo]);

  return (
    <>
      {!pathName.includes("/register") &&
        !pathName.includes("/verifyuser") &&
        !pathName.includes("/login") &&
        !pathName.includes("/thankyou") &&
        !pathName.includes("/become-an-instructor/thankyou") &&
        !pathName.includes("/password/reset") &&
        !pathName.includes("/beta-login") &&
        !pathName.includes("/checkout/redirect/") &&
        !pathName.includes("/azure-ad-login") &&
        !pathName.includes("/aws") &&
        !pathName.includes("/azure") &&
        !pathName.includes("/devops") &&
        !pathName.includes("/gcp") &&
        !pathName.includes("/ft-course-library") &&
        !pathName.includes("/training/library") &&
        router.asPath !== `/aws-ccp/` &&
        router.asPath !== `/aws-cda/` &&
        router.asPath !== `/aws-sysops/` &&
        router.asPath !== `/aws-csap/` &&
        router.asPath !== `/aws-devops/` &&
        router.asPath !== `/aws-csaa/` &&
        router.asPath !== `/az-900/` &&
        router.asPath !== `/az-104/` &&
        router.asPath !== `/az-305/` &&
        router.asPath !== `/az-204/` &&
        router.asPath !== `/az-400/` &&
        router.asPath !== `/dp-203/` &&
        router.asPath !== `/gccace/` &&
        router.asPath !== `/gccpca/` &&
        router.asPath !== `/gcccdl/` &&
        router.asPath !== `/gccpde/` &&
        router.asPath !== `/dp-900/` &&
        router.asPath !== `/ai-900/` &&
        router.asPath !== `/sc-900/` &&
        router.asPath !== `/ai-102/` &&
        !pathName.includes('/gdgcloudpune') &&
        !pathName.includes("/amazon/[status]") && 
        !pathName.includes("/cloud/")&&
        (
          <Footer
            user_type ={user_type}
            data={data}
            pathName={pathName}
            slackData={slackData}
            bannerActive={bannerActive}
          />
        )}

      {/* Footer without links */}
      {(router.asPath === `/aws-ccp/` ||
        router.asPath === `/aws-cda/` ||
        router.asPath === `/aws-sysops/` ||
        router.asPath === `/aws-csap/` ||
        router.asPath === `/aws-devops/` ||
        router.asPath === `/aws-csaa/` ||
        router.asPath === `/az-900/` ||
        router.asPath === `/az-104/` ||
        router.asPath === `/az-305/` ||
        router.asPath === `/az-204/` ||
        router.asPath === `/az-400/` ||
        router.asPath === `/dp-203/` ||
        router.asPath === `/gccace/` ||
        router.asPath === `/gccpca/` ||
        router.asPath === `/gcccdl/` ||
        router.asPath === `/gccpde/` ||
        router.asPath === `/dp-900/` ||
        router.asPath === `/ai-900/` ||
        router.asPath === `/sc-900/` ||
        router.asPath === `/ai-102/` ||
        pathName.includes('/gdgcloudpune') ||
        pathName.includes("/training/library")) ||
        pathName.includes("/cloud/")
        && (
        <FootLess
          data={data}
          slackData={slackData}
          containerSmall={
            pathName.includes("/aws/[slug]") ||
            pathName.includes("/azure/[slug]") ||
            pathName.includes("/devops/[slug]") ||
            pathName.includes("/gcp/[slug]")
          }
        />
      )}

      {(router.asPath === `/aws-ccp/` ||
        router.asPath === `/aws-cda/` ||
        router.asPath === `/aws-sysops/` ||
        router.asPath === `/aws-csap/` ||
        router.asPath === `/aws-devops/` ||
        router.asPath === `/aws-csaa/` ||
        router.asPath === `/az-900/` ||
        router.asPath === `/az-104/` ||
        router.asPath === `/az-305/` ||
        router.asPath === `/az-204/` ||
        router.asPath === `/az-400/` ||
        router.asPath === `/dp-203/` ||
        router.asPath === `/gccace/` ||
        router.asPath === `/gccpca/` ||
        router.asPath === `/gcccdl/` ||
        router.asPath === `/gccpde/` ||
        router.asPath === `/dp-900/` ||
        router.asPath === `/ai-900/` ||
        router.asPath === `/sc-900/` ||
        router.asPath === `/ai-102/` ||
        pathName.includes("/training/library")) && (
        <>
          <PPCbanner />
        </>
      )}

      {!subscribedUser && !isEnrolled && crazyDealFooter && !uniquePromo && bannerActive && <>
        <CCPFooterBanner crazyDealData={crazyDealFooterData} />
      </>
      }

      {!subscribedUser && !isEnrolled && !crazyDealFooter && uniquePromo && bannerActive && 
        <>
          <PriceGoingUpBanner
          offer_name={uniquePromo.offer_name}
          offer_desc={uniquePromo.offer_desc}
          offer_coupon={uniquePromo.offer_coupon}
          end_date={uniquePromo.end_date}
        />
        </>
      }

      {!subcribed_not_expired && !isEnrolled && !crazyDealFooter && !uniquePromo && bannerActive && !pathName.includes('/pricing') &&
        <>
          {/* <SpringSaleFooter /> */}
          {/* <ExclusiveOfferBanner /> */}
          {/* <LabChallengeBannerFooter /> */}
          {/* <PriceGoingUpBanner
            offer_name={`<strong>Flat 25% OFF</strong> on GCP courses`}
            offer_desc={`Practice Tests + Video Courses + Hands-On Labs`}
            offer_coupon={`WHIZ25GCP`}
            className={`blue-banner`}
            slug={`google-cloud-certifications`}
            end_date="13 June 2022 11:00:00 GMT+05:30"
          /> */}
          {/* <MayDaySuperSaleBannerFooter /> */}
          {
            timerState && timer_details &&<BlackfridayFooter banner={timer_details?.details}/>
          }
        </>
      }
      {/* {router.asPath === '/library/' && !subcribed_not_expired && bannerActive && <><BlackfirdayLibrary/></> } */}
      {pathName.includes(`/pricing`)&& !subcribed_not_expired && bannerActive &&   timerState && timer_details &&<><BlackfirdayPricing banner={timer_details?.details}/></>}
      {/* <div id="footerScripts" dangerouslySetInnerHTML={{ __html: footerScripts }}></div> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.authData.userData,
    timerState:state.timer.timer
  };
};
// export default FooterWrapper;
export default connect(mapStateToProps, null)(FooterWrapper);
