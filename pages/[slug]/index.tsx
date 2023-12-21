import Course from "pages/course";
import Categories from "pages/category/index";
import StaticPages from "pages/static-pages";
import FourOhFour from "pages/404";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import * as pageTypes from "../../components/page-types";
import { ppcpages } from "../../components/ppc";
// import Ppc from "pages/Ppc";
import { getReviews, getVideoRatings, getSandboxPageContent, getCourseRatings} from "@/services/review-services/services";
import Sandbox from "../../components/Sandbox";
import {Azure_data,gcp_data} from "../../components/sandboxtemp"
const Index = ({
  page = null,
  pageData = null,
  freqCoursesData = null,
  reviewsDatas = null,
  feedbackData=null,
  videoDatas = null,
  courseEnrollmentDatas,
  slug,
  crazyDealData,
  promoData,
  extraData,
  enrollmentDetails,
  sandbox,
  exampattern,
  language,
  examcode,
  timer_details,
  subscriptionRes,
  seoHomePageData,
}) => {
  const crazyDeatData = promoData.data.find((Itm) => Itm.course_slug === slug);
  switch (page) {
    case pageTypes.CATEGORY_LANDING_PAGE:
      return <Categories pageData={pageData} seoHomePageData = {seoHomePageData || null} />;
    case pageTypes.PRODUCT_LANDING_PAGE:
      return (
        <Course
          videoDatas={videoDatas}
          pageData={pageData}
          reviewsDatas={reviewsDatas}
          feedbackData={feedbackData}
          freqCoursesData={freqCoursesData}
          enrolledProductTypes={courseEnrollmentDatas}
          slug={slug}
          crazyDealData={crazyDeatData || null}
          enrollmentDetails={enrollmentDetails}
          exampattern = {exampattern || null}
          language = {language || null}
          examcode = {examcode || null}
          timer_details = {timer_details}
          subscriptionRes = {subscriptionRes || null}
          seoHomePageData = {seoHomePageData || null}
        />
      );
    case pageTypes.SANDBOX_PAGE:
      return (
        <Sandbox
          videoDatas={videoDatas}
          pageData={pageData}
          reviewsDatas={reviewsDatas}
          freqCoursesData={freqCoursesData}
          enrolledProductTypes={courseEnrollmentDatas}
          slug={slug}
          crazyDealData={crazyDeatData || null}
          enrollmentDetails={enrollmentDetails}
          sandbox = {sandbox}
          subscriptionRes = {subscriptionRes || null}
          seoHomePageData = {seoHomePageData || null}
        />
      );
    case pageTypes.STATIC_PAGE:
      return <StaticPages pageData={pageData} seoHomePageData={seoHomePageData} />;
    case pageTypes.PPC:
      // return <Ppc pageData={pageData} reviewsDatas={reviewsDatas} extraData={extraData}></Ppc>;
    default:
      return <FourOhFour seoHomePageData={seoHomePageData} />;
  }
};

export async function getServerSideProps(context) {
  const { res, query } = context;
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

  const slug = context.params.slug;

  let page = "";
  let pageData = null;
  let reviewsDatas = null;
  let feedbackData=null;
  let videoDatas = null;
  let courseEnrollmentDatas = [];
  let enrollmentDetails = null;
  let extraData = {};
  let sandbox = null
  let exampattern = null
  let language = ""
  let examcode = ""
  let subscriptionRes = null;
  try {
    // Checking Course Slug
    if(slug == "snowflake-snowpro-core-certification"){
      return {
        redirect: {
          destination: `/library`,
          permanent: false,
        },
      };
    }
    const getSubscriptionRes = await axios.get(baseUrl + "/subscription/plans");
    if(getSubscriptionRes){
      subscriptionRes = getSubscriptionRes.data.sortedData || null
    }
    let categoryResponse = await axios.get(baseUrl + "/courses/page", {
      params: {
        slug: slug,
      },
    });
    if (categoryResponse.data && categoryResponse.data.data && categoryResponse.data.data.id) {
      page = pageTypes.CATEGORY_LANDING_PAGE;
      pageData = categoryResponse.data.data;
    } else {
      // Checking Course Slug
      let courseResponse = await axios.get(baseUrl + "/courses", {
        params: {
          slug: slug,
          review: query.preview == 1 ? 0 : 1
        },
      });
      if (courseResponse.data && courseResponse.data.data && courseResponse.data.data.id) {
        page = courseResponse.data.data.seo_details.is_sandbox
          ? pageTypes.SANDBOX_PAGE
          : pageTypes.PRODUCT_LANDING_PAGE;
        pageData = courseResponse.data.data;
        const reviewsResponse = await getReviews(courseResponse.data.data.id, 4, 1); // course_id,ratings,current-page
        if (reviewsResponse && reviewsResponse.data && reviewsResponse.data.data) {
          reviewsDatas = reviewsResponse.data;
        }

        const getExamPattern = await axios.get(`${baseUrl}/courses/exampatern?course_id=${courseResponse.data.data.id}`)
        if(getExamPattern.data.data){
          if(getExamPattern.data.data.length > 0 && getExamPattern.data.data[0].language){
            exampattern = getExamPattern.data.data[0]?.list.box.sort((a,b)=>{
               a.order_by - b.order_by
            })
            language = getExamPattern.data.data[0].language
            examcode = getExamPattern.data.data[0].examcode
          }
        }
        // calling getCourseRatings API for getting reviews count(feedback count)
        const courseRatingResponse = await getCourseRatings(courseResponse.data.data.id);
        if (courseRatingResponse && courseRatingResponse.data && courseRatingResponse.data.data) {
         feedbackData = courseRatingResponse.data.data;
         }
        const videoRatingResponse = await getVideoRatings(courseResponse.data.data.id);
        if (videoRatingResponse && videoRatingResponse.data && videoRatingResponse.data.data) {
          videoDatas = videoRatingResponse.data.data;
        }
        if(courseResponse.data.data.slug === "aws-cloud-sandbox" )
        {
          const sb = await getSandboxPageContent("aws-sandbox")
          sandbox = sb
        }
        if(courseResponse.data.data.slug === "azure-cloud-sandbox" )
        {
          const sb = Azure_data
          sandbox = sb
        }
        if(courseResponse.data.data.slug === "google-cloud-sandbox" )
        {
          const sb = gcp_data
          sandbox = sb
        }
        if (userToken) {
          const courseEnrolledResponse = await axios.post(
            baseUrl + "/users/user-course-enroll-status",
            {
              course_id: courseResponse.data.data.id,
            },
            { headers: { Authorization: userToken } }
          );
          if (
            courseEnrolledResponse &&
            courseEnrolledResponse.data &&
            courseEnrolledResponse.data.data &&
            courseEnrolledResponse.data.data.products
          ) {
            courseEnrollmentDatas = courseEnrolledResponse.data.data.products;
            enrollmentDetails = courseEnrolledResponse.data.data;
          }
        }
      } else {
        //  checking Page Slug
        let pageResponse = await axios.get(baseUrl + "/web/pages/" + slug);
        if (
          pageResponse &&
          pageResponse.data &&
          pageResponse.data.data &&
          pageResponse.data.data.id
        ) {
          page = pageTypes.STATIC_PAGE;
          pageData = pageResponse.data.data;
        } else {
          // Checking 301 & 302
          let redirectionResponse = await axios.post(baseUrl + "/web/redirection", { slug: slug });
          const responData = redirectionResponse?.data?.data[0] || null;
          if (responData) {
            let redirectionSlug = responData.to;

            return {
              redirect: {
                permanent: responData.type == 301,
                destination: `${process.env.NEXT_PUBLIC_BASE_PATH}${redirectionSlug}`,
              },
            };
          }
        }
      }
    }
    let resultPPC = ppcpages.find(({ title }) => title === slug);

    if (resultPPC) {
      page = pageTypes.PPC;
      let courseResponse = await axios.get(baseUrl + "/courses", {
        params: {
          slug: resultPPC.slug,
        },
      });
      const reviewsResponse = await getReviews(courseResponse.data.data.id, 5, 1); // course_id,ratings,current-page
      if (reviewsResponse && reviewsResponse.data && reviewsResponse.data.data) {
        reviewsDatas = reviewsResponse.data;
      }

      pageData = courseResponse.data.data;
      extraData = resultPPC;

    }

  } catch (error) {
    console.error(error);
  }

  const freqCoursesData = [
    {
      categoryId: 1,
      categoryTitle: "AWS Certification Training Courses",
      courseId: 4,
      courseType: ["pt", "oc"],
      courseImage: "/images/course-img52x.jpg",
      courseName: "Implementing an Azure Data Solution (DP-200)",
      courseDescription:
        "AWS Cloud Practitioner certification demonstrates and validates your knowledge on the overall understanding of AWS Cloud Platfoliyo",
      flagType: "1", // 1- 'Best Seller', 2 - 'Top Ratted'
      level: "3", // 1- Beginner, 2- Intermediate, 3-Advanced
      freeTest: "5",
      questions: "120",
      videos: "78",
      labs: "56",
      regPrice: "1299",
      salePrice: "999",
      avgRatings: 4.6,
      totalRatings: 4322,
    },
    {
      categoryId: 1,
      categoryTitle: "Google Cloud Certifications",
      courseId: 5,
      courseType: ["pt", "oc"],
      courseImage: "/images/course-img62x.jpg",
      courseName: "Google Cloud Certified Associate Cloud Engineer",
      courseDescription:
        "AWS Cloud Practitioner certification demonstrates and validates your knowledge on the overall understanding of AWS Cloud Platfoliyo",
      flagType: "1", // 1- 'Best Seller', 2 - 'Top Ratted'
      level: "3", // 1- Beginner, 2- Intermediate, 3-Advanced
      freeTest: "5",
      questions: "120",
      videos: "78",
      labs: "56",
      regPrice: "1299",
      salePrice: "999",
      avgRatings: 4.6,
      totalRatings: 4322,
    },
    {
      categoryId: 1,
      categoryTitle: "DevOps Certifications",
      courseId: 6,
      courseType: ["pt", "oc"],
      courseImage: "/images/course-img32x.jpg",
      courseName: "Ansible Basics",
      courseDescription:
        "AWS Cloud Practitioner certification demonstrates and validates your knowledge on the overall understanding of AWS Cloud Platfoliyo",
      flagType: "1", // 1- 'Best Seller', 2 - 'Top Ratted'
      level: "3", // 1- Beginner, 2- Intermediate, 3-Advanced
      freeTest: "5",
      questions: "120",
      videos: "78",
      labs: "56",
      regPrice: "1299",
      salePrice: "999",
      avgRatings: 4.6,
      totalRatings: 4322,
    },
  ];

  const seoHomePageData = {
    seoPageType: "coursePage",
    title: `${pageData?.seo_details?.seo_title}`,
    metaTags: [
      { key:"keywords", name: "keywords", content: `${pageData?.seo_details?.seo_keyword}` },
      { name: "title", content: `${pageData?.seo_details?.seo_title}` },
      { key:"description", name: "description", content: `${pageData?.seo_details?.seo_description}` },
      { name: "", property: "og:locale", content: "en_US" },
      { name: "", property: "og:type", content: "website" },
      { name: "og:title", property: "og:title", content: `${pageData?.seo_details?.seo_title}` },
      { name: "og:description", property: "og:description", content: `${pageData?.seo_details?.seo_description}` },
      { name: "", property: "og:site_name", content: "Whizlabs" },
      { name: "og:url", property: "og:url", content: `${process.env.NEXT_PUBLIC_BASE_PATH + pageData?.seo_details?.slug}` },
      { name: "og:image", property: "og:image", content: `${process.env.NEXT_PUBLIC_WEB_MEDIA_URL + pageData?.seo_details?.featured_image?.replace("media/", "")}` },
      { name: "image", property: "twitter:image", content: `${process.env.NEXT_PUBLIC_WEB_MEDIA_URL + pageData?.seo_details?.featured_image?.replace("media/", "")}` },
      { name: "", property: "og:image:width", content: "400" },
      { name: "", property: "og:image:height", content: "300" },
      { name: "twitter:card", property: "twitter:card", content: "summary" },
      { name: "twitter:title", content: `${pageData?.seo_details?.seo_title}` },
      { name: "twitter:description", content: `${pageData?.seo_details?.seo_description}` },
      { name: "twitter:site", content: "@whizlabs" },
    ],
  };

  return {
    props: {
      page,
      pageData,
      reviewsDatas,
      feedbackData,
      videoDatas,
      freqCoursesData,
      courseEnrollmentDatas,
      slug,
      extraData,
      enrollmentDetails,
      sandbox,
      exampattern,
      language,
      examcode,
      subscriptionRes,
      seoHomePageData,
    },
  };
}

export default Index;
