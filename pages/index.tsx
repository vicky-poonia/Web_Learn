import { useEffect, useState } from "react";
import axios from "axios";
import {
  Banner,
  Brands,
  Categories,
  PopularCourses,
  Companies,
  Testimonials,
  DownloadApp,
  CallToAction,
  ExploreSection2,
  CompanyTrust
} from "@/components/import";
import Head from "next/head";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { updateRedirection } from "redux/Redirection/redirect-actions";
import * as ga from "../lib/ga";
import { authLogout } from "redux/Auth/auth-actions";
import { signOut } from "next-auth/react";
import { clearCart } from "redux/AddToCart/cart-actions";

import dynamic from "next/dynamic";

import ValentineOfferBanner from "@/components/plugins/ValentineOfferBanner";
import WomensDayOffer from "@/components/plugins/WomensDayOffer";

// const SpringSaleBanner = dynamic(() => import("@/components/plugins/SpringSaleBanner"));
import HomeCertificationBlock from "@/components/pages/HomeCertificationBlock";
import HomeCourseBlock from "@/components/pages/HomeCourseBlock";
import HomeInstructorBlock from "@/components/pages/HomeInstructorBlock";
import HomeExpertBlock from "@/components/pages/HomeExpertBlock";
// import CompanyTrust from "@/components/import";
import MayDaySuperSaleBanner from "@/components/plugins/MayDaySuperSaleBanner";
import ChallengeBanner from "../components/plugins/ChallengeBanner";
import cookie from 'js-cookie';
import {OfferStart,offerClear} from "redux/campaign/campaign-action"
import {storeUserProfile} from "redux/UserProfile/profile-actions"
import { alertBox } from "redux/AlertBox/alert-actions";
import {checkEmailVerified} from "redux/UserProfile/profile-actions"
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

declare const window: any;
const Home = ({
  userData,
  redirectionAction,
  timer_details,
  alertBoxAction,
  updateEMail,
  countDown,
  timerState,
  seoHomePageData,
}) => {
  const router = useRouter();
  const [accVerifyDiv, setAccVerifyDiv] = useState(false);
  const [accVerifyErrMsg, setAccVerifyErrMsg] = useState("");


  const verifyEmail = async(token,email)=>{
    await axios.post(`${baseUrl}/auth/mail/verify_mail`,{
      token:token,
      email:email
    }).then(async(resp)=>{
      if(resp.data.status == 1){
          alertBoxAction({
            type: "SUCCESS",
            title: "Success",
            msg: "Email verified successfully",
          });

  
          //if user id update state
          if(userData){
            await updateEMail(userData.data.user_id)
          }
      }else{
        alertBoxAction({
          type: "ERROR",
          title: "Error",
          msg: resp.data.msg,
        });
      }
    })
  }
  useEffect(() => {
    document.querySelector("body").classList.remove("bg-color");

    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");
    const urlEmail = urlParams.get("email");
    const urlUserType = urlParams.get("ut");

    if (urlToken && urlEmail && urlUserType) {
      if (urlUserType === "au") {
        axios
          .post(`${baseUrl}/auth/register/amazon/verify`, {
            token: urlToken,
            email: urlEmail,
          })
          .then((resp) => {
            if (resp.data.status === "error") {
              setAccVerifyDiv(true);
              setAccVerifyErrMsg(resp.data.message);
            } else if (resp.data.data && resp.data.data.user_id) {
              setAccVerifyDiv(true);
              setAccVerifyErrMsg("Your account has been verified Successfully!");
            }
          });
      }
      if(urlUserType == 'lu'){
        verifyEmail(urlToken,urlEmail)
      }
    }

    // Logout from LMS
    const urlRef = urlParams.get("ref");
    // if (urlRef && urlRef === "LMSlogout") {
    //   authLogoutAction();
    //   clearCartAction();
    //   signOut({ redirect: false });
    //   setTimeout(() => {
    //     router.push("/");
    //   }, 500);
    // }

    // Redirection flow
    const urlLogin = urlParams.get("login");
    const urlRegister = urlParams.get("register");
    const urlFrom = urlParams.get("frm");
    if (!userData && urlRef && urlLogin === "true") {
      if (urlRef === "forums") {
        redirectionAction("FORUMS"); // after sign in redirect to FORUMS
        document.querySelector("body").classList.add("open-modal-login");
      }
    }
    if (!userData && urlRef && urlLogin === "true") {
      if (urlRef === "website") {
        document.querySelector("body").classList.add("open-modal-login");
      }
    }

    if (!userData && urlRef && urlRegister === "true") {
      if (urlRef === "website") {
        document.querySelector("body").classList.add("open-modal-signup");
      }
    }
    if (!userData && urlRef && urlLogin === "true") {
      if (urlRef === "labs") {
        redirectionAction("LABS", urlFrom); // after sign in redirect to labs
        document.querySelector("body").classList.add("open-modal-login");
      }
    }

    if (!userData && urlRef && urlRegister === "true") {
      if (urlRef === "labs") {
        redirectionAction("LABS", urlFrom); // after sign in redirect to labs
        document.querySelector("body").classList.add("open-modal-signup");
      }
    }

    if (process.env.NEXT_PUBLIC_BASE_PATH.includes("whizlabs.com")) {
      ga.pageview({
        page_title: "step1",
        page_path: "/home_step",
      });

      ga.event({
        action: "event",
        params: "home_step",
      });
    }
    window._mfq = window._mfq || [];
    (function () {
      var mf = document.createElement("script");
      mf.type = "text/javascript";
      mf.defer = true;
      mf.src = "//cdn.mouseflow.com/projects/e7d46f41-b290-4fa4-9a60-1ca5f62e8330.js";
      document.getElementsByTagName("head")[0].appendChild(mf);
    })();
  }, []);
  return (
    <>
      {/* <Head>
        <title> Whizlabs - A world class technology training platform for your Teams</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />

        <meta
          name="description"
          content="250+ IT Certification Video Courses, Practice Tests and Hands-on Labs: Study and Practice at Your own Pace with Whizlabs Unique Content, Boost Your Skills Today for a Brighter Future."
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Online Certification Training Courses for Professionals"
        />
        <meta
          property="og:description"
          content="Ensure your success in AWS, Azure, Java, PMP, Agile, Big Data, Linux certification exams. Pass or 100% Money Back. Trained 5M+ professionals since 20 years. Start with Free Trial Now!"
        />
        <meta property="og:url" content="https://www.whizlabs.com/" />
        <meta property="og:site_name" content="Whizlabs" />
        <meta
          property="og:image"
          content="https://media.whizlabs.com/website/2019/03/07/meta_image.jpg?60b50ff2a131f"
        />
        <meta property="fb:app_id" content="502194103558420" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="Ensure your success in AWS, Azure, Java, PMP, Agile, Big Data, Linux certification exams. Pass or 100% Money Back. Trained 5M+ professionals since 20 years. Start with Free Trial Now!"
        />
        <meta
          name="twitter:title"
          content="Online Certification Training Courses for Professionals"
        />
        <meta name="twitter:site" content="@whizlabs" />
        <meta
          name="twitter:image"
          content="https://media.whizlabs.com/website/2019/03/07/meta_image.jpg?60b50ff2a1362"
        />
        <meta name="twitter:creator" content="@whizlabs" />
        <meta
          name="google-site-verification"
          content="EY2XZIOyWiKVIRaxXKzldMItZKACA18EFG-xrTkLn48"
        />
        <meta name="cf-2fa-verify" content="03e9eec4e024dc4"/>
      </Head> */}

      {accVerifyDiv && <div className="account_verification_msg">{accVerifyErrMsg}</div>}
      <Banner
        // userData={userData}/
        details ={timer_details?.details}
        timerState ={timerState}
      />
      {/* <ChallengeBanner
        challengeType={`AWS`}
        challengeName={`NAT gateway`}
        challengeCatName={`AWS VPC`}
        endDate={`13 June 2022 11:00:00 GMT+05:30`}
      /> */}
      {/* <SpringSaleBanner /> */}
      {/* <WomensDayOffer /> */}
      {/* <ValentineOfferBanner /> */}
      {/* <MayDaySuperSaleBanner /> */}

      <div id="content-area" className={`${cookie.get("signupmodal")? 'background-blurr' : ''}`}>
        {/* <Brands data={brandsData} moreData={moreBrandsData} /> */}
        <ExploreSection2 />
        {/* <Categories data={catData} /> */}

        {/* {popularCourses.length ? <PopularCourses popularCoursesData={popularCourses} /> : null} */}

        {/* <!-- certification-block --> */}
        {/* <HomeCertificationBlock /> */}

        <CompanyTrust/>

        {/* <!-- expert-support --> */}
        <HomeExpertBlock />

        {/* <Companies data={companyData} /> */}

        {/* all courses */}
        {/* <HomeCourseBlock /> */}

        {/* <Testimonials data={testimonialsData} /> */}

        {/* <!-- instructor-block --> */}
        {/* <HomeInstructorBlock /> */}

        {/* <DownloadApp /> */}
        {/* <br/>
        <br/>
        <br/> */}

        <CallToAction />
      </div>
    </>
  );
};

export async function getStaticProps(context) {
  const seoHomePageData = {
    seoPageType: "homePage",
    title: "Whizlabs - A world class technology training platform for your Teams",
    metaTags: [
      { name: "facebook-domain-verification", property: "", content: "twh401qzi7r7o3n227q4sg3hghbpzh" },
      {
        name: "description",
        property: "",
        content:
          "250+ IT Certification Video Courses, Practice Tests and Hands-on Labs: Study and Practice at Your own Pace with Whizlabs Unique Content, Boost Your Skills Today for a Brighter Future.",
      },
      { name: "", property: "og:locale", content: "en_US" },
      { name: "", property: "og:type", content: "website" },
      {
        name: "",
        property: "og:title",
        content: "Online Certification Training Courses for Professionals",
      },
      {
        name: "",
        property: "og:description",
        content:
          "Ensure your success in AWS, Azure, Java, PMP, Agile, Big Data, Linux certification exams. Pass or 100% Money Back. Trained 5M+ professionals since 20 years. Start with Free Trial Now!",
      },
      { name: "", property: "og:url", content: "https://www.whizlabs.com/" },
      { name: "", property: "og:site_name", content: "Whizlabs" },
      {
        name: "",
        property: "og:image",
        content: "https://media.whizlabs.com/website/2019/03/07/meta_image.jpg?60b50ff2a131f",
      },
      { name: "", property: "fb:app_id", content: "502194103558420" },
      { name: "", property: "og:image:width", content: "500" },
      { name: "", property: "og:image:height", content: "500" },
      { name: "twitter:card", property: "", content: "summary" },
      {
        name: "twitter:description",
        property: "",
        content:
          "Ensure your success in AWS, Azure, Java, PMP, Agile, Big Data, Linux certification exams. Pass or 100% Money Back. Trained 5M+ professionals since 20 years. Start with Free Trial Now!",
      },
      {
        name: "twitter:title",
        property: "",
        content: "Online Certification Training Courses for Professionals",
      },
      { name: "twitter:site", property: "", content: "@whizlabs" },
      {
        name: "twitter:image",
        property: "",
        content: "https://media.whizlabs.com/website/2019/03/07/meta_image.jpg?60b50ff2a1362",
      },
      { name: "twitter:creator", property: "", content: "@whizlabs" },
      { name: "google-site-verification", property: "", content: "EY2XZIOyWiKVIRaxXKzldMItZKACA18EFG-xrTkLn48" },
      { name: "cf-2fa-verify", property: "", content: "03e9eec4e024dc4" },
    ],
  };
  
    
  const brandsData = [
    {
      id: 1,
      imgUrl: "/images/logo-jp.png",
      alt: "JP",
    },
    {
      id: 2,
      imgUrl: "/images/logo-deloitte2x.png",
      alt: "deloitte",
    },
    {
      id: 3,
      imgUrl: "/images/logo-global-knowledge.png",
      alt: "Global Knowledge",
    },
    {
      id: 4,
      imgUrl: "/images/logo-campgemni2x.png",
      alt: "campgemini",
    },
    {
      id: 5,
      imgUrl: "/images/logo-telefonica.png",
      alt: "telefonica",
    },
    {
      id: 6,
      imgUrl: "/images/logo-tuv.png",
      alt: "tuv",
    },
  ];

  const moreBrandsData: any = [
    // {
    //   id: 1,
    //   imgUrl: "/images/logo-global-knowledge.png",
    //   alt: "Global Knowledge",
    // },
    {
      id: 1,
      imgUrl: "/images/logo-wavestone.png",
      alt: "wavestone",
    },
    {
      id: 2,
      imgUrl: "/images/logo-vivid-cloud.png",
      alt: "vivid cloud",
    },
    {
      id: 3,
      imgUrl: "/images/logo-TLG.png",
      alt: "TLG",
    },
    {
      id: 4,
      imgUrl: "/images/logo-miami.png",
      alt: "miami",
    },
    {
      id: 5,
      imgUrl: "/images/logo-versor.png",
      alt: "versor",
    },
    {
      id: 6,
      imgUrl: "/images/logo-kpmg.png",
      alt: "kpmg",
    },
    {
      id: 7,
      imgUrl: "/images/logo-stack.png",
      alt: "stack",
    },
    {
      id: 8,
      imgUrl: "/images/logo-digi.png",
      alt: "digi",
    },
    {
      id: 9,
      imgUrl: "/images/logo-mityo.png",
      alt: "mityo",
    },
    {
      id: 10,
      imgUrl: "/images/logo-spatial.png",
      alt: "spatial",
    },
  ];

  const catData = [
    {
      id: 1,
      title: "Cloud Computing",
      slug: "cloud-certification-training-courses",
      imgUrl: "/images/category-img1.svg",
      content: "AWS, Microsoft Azure, Google Cloud, Salesforce, Alibaba, Cloud Security...",
    },
    {
      id: 2,
      title: "DevOps",
      slug: "devops-certifications",
      imgUrl: "/images/devops-logo.svg",
      content: "Docker Certified Associate, Certified Kubernetes ...",
    },
    {
      id: 3,
      title: "Oracle Java",
      slug: "oracle-java-certifications",
      imgUrl: "/images/category-img3.svg",
      content:
        "Oracle Certified Associate, Oracle Certified Professional, Oracle Certified Expert, Oracle Certified Master…",
    },
    {
      id: 44,
      title: "Microsoft",
      slug: "microsoft-certifications",
      imgUrl: "/images/ms-logo.svg",
      content: "Microsoft Power Platform Fundementals, MS-900 Microsoft 365 Fundamentals ...",
    },
    {
      id: 5,
      title: "Cyber Security",
      slug: "cyber-security-certifications",
      imgUrl: "/images/cyber-logo.svg",
      content: "Certified Ethical Hacker, Certified Information Systems Security Professional ...",
    },
  ];

  const companyData = [
    {
      id: 1,
      imgUrl: "/images/logo-google2x.png",
      alt: "google",
    },
    {
      id: 2,
      imgUrl: "/images/logo-aws2x.png",
      alt: "aws",
    },
    {
      id: 3,
      imgUrl: "/images/logo-azure2x.png",
      alt: "azure",
    },
    {
      id: 4,
      imgUrl: "/images/logo-linux2x.png",
      alt: "linux",
    },
    {
      id: 5,
      imgUrl: "/images/logo-salesforce2x.png",
      alt: "salesforce",
    },
    {
      id: 6,
      imgUrl: "/images/logo-java2x.png",
      alt: "java",
    },
  ];
  let testResp = await axios.get(baseUrl + "/users/testimonials");
  const { data: popularCoursesData } = await axios.get(baseUrl + "/courses/popular_course");
  return {
    props: {
      brandsData,
      moreBrandsData,
      popularCourses: popularCoursesData.popularCourses,
      catData,
      companyData,
      testimonialsData: testResp.data.data,
      seoHomePageData,
    },
  };
}

const mapStateToProps = (state) => {
  return {
    userData: state.authData.userData,
    redirectTo: state.redirectData.redirect_to,
    timerState:state.timer.timer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    redirectionAction: (data, url) => dispatch(updateRedirection(data, url)),
    authLogoutAction: () => dispatch(authLogout()),
    clearCartAction: () => dispatch(clearCart()),
    timerRunning:()=> dispatch(OfferStart()),
    stopTimer:()=> dispatch(offerClear()),
    updateUserProfile:(userToken)=>dispatch(storeUserProfile(userToken)),
    alertBoxAction: (data) => dispatch(alertBox(data)),
    updateEMail:(user_id) => dispatch(checkEmailVerified(user_id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
