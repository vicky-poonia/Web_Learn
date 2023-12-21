import CourseHeader from "@/components/LandingPages/CourseHeader/courseheader";
import CourseIncludes from "@/components/LandingPages/Courseinclues/courseincludes";
import Benefits from "@/components/LandingPages/Benfits/benefits";
import Reviews from "@/components/LandingPages/Reviews/reviews";
import GlobalReviews from "@/components/LandingPages/GlobalReviews/globalreviws";
import axios from "axios";
import Faq from "@/components/LandingPages/Faq/faq";
import Buynow from "@/components/LandingPages/Buynow/buynow";
import { getReviews,getCourseRatings} from "@/services/review-services/services";
import Head from "next/head";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const Landingindex = ({pageContent,reviewsDatas,seoHomePageData})=>{
    return <>
        {/* <Head>
        <title>{`${pageContent?.meta_title}`}</title>
        {pageContent?.meta_description && (
          <meta
            name="og:description"
            property="og:description"
            content={`${pageContent?.meta_description}`}
          />
        )}
        </Head> */}
        <CourseHeader pageContent={pageContent}/>
        <CourseIncludes pageContent={pageContent}/>
        <Benefits pageContent={pageContent}/>
        <Reviews reviewsDatas={reviewsDatas} pageContent={pageContent}/>
        <GlobalReviews/>
        <Faq pageContent={pageContent}/>
        <Buynow pageContent={pageContent}/>
    </>
}

export async function getServerSideProps(context){
    const slug = context.params.slug;
    let pageContent = {}
    let reviewsDatas = []
    let feedbackData = {}

    const seoHomePageData = {
      // title: `${pageContent?.meta_title}`, // Use dynamic title from pageContent
      title: "",
      metaTags: [
        {
          name: "og:description",
          property: "og:description",
          // content: `${pageContent?.meta_description}`,
        },
      ],
    };
    

    const cookie = context.req.headers.cookie;
    const decoded = decodeURIComponent(cookie);
    const split1 = decoded.split("userData=")[1];
    let userId = null;
    let userToken = null;
  
    if (split1) {
      const split2 = split1.split(";")[0];
      const parsed = split2 ? JSON.parse(split2) : null;
      userId = parsed ? parsed.data.user_id : null;
      userToken = parsed ? parsed.data.token : null;
    }
    try{
        let CourseData = await axios.get(`${BASE_URL}/courses/landing?slug=${slug}`)
        // console.log(CourseData.data.landingData)
        if(Object.keys(CourseData.data.landingData).length ==0){
            return{
                redirect: {
                    destination: `/`,
                    permanent: false,
                  },
            }
        }
        
        if(CourseData && CourseData.data){
            pageContent = CourseData.data.landingData
            const reviewsResponse = await getReviews(CourseData.data.landingData?.course_id, 4, 1); // course_id,ratings,current-page
            if (reviewsResponse && reviewsResponse.data && reviewsResponse.data.data) {
              reviewsDatas = reviewsResponse.data.data;
            }

            const courseRatingResponse = await getCourseRatings(CourseData.data.landingData?.course_id);
            if (courseRatingResponse && courseRatingResponse.data && courseRatingResponse.data.data) {
             pageContent[`ratings`] = courseRatingResponse.data.data;
             }

             if (userToken) {
                const courseEnrolledResponse = await axios.post(
                    BASE_URL + "/users/user-course-enroll-status",
                  {
                    course_id: CourseData.data.landingData?.course_id,
                  },
                  { headers: { Authorization: userToken } }
                );
                if (
                  courseEnrolledResponse &&
                  courseEnrolledResponse.data &&
                  courseEnrolledResponse.data.data &&
                  courseEnrolledResponse.data.data.products
                ) {
                  pageContent['enrolledProductTypes'] = courseEnrolledResponse.data.data.products;
                }
              }
        }
    }catch(e){
        console.log(e)
    }
    return {
       props:{
        pageContent,
        reviewsDatas,
        feedbackData,
        seoHomePageData,
       }
    }
}

export default Landingindex;
