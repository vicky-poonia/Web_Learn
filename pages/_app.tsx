import { Provider } from "react-redux";
import store from "../redux/store";
import axios from "axios";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Layout from "@/components/shared/Layout";
import { SessionProvider } from "next-auth/react";
import MenuList from "../lib/Menu.json";
import FooterDataList from "../lib/FooterData.json";
import ErrorBoundary from "../components/ErrorBoundary";
import Cookie from "js-cookie";
import Script from "next/script";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const baseUrlA = process.env.NEXT_PUBLIC_ASSIST_URL;
const JS_SCRIPTS = [
  "/js/jquery-3.6.1.min.js", // https://code.jquery.com/jquery-3.6.1.min.js
  "/js/jquery-ui.js",
  "/js/chosen.jquery.js",
  "/js/tokenfield.js",
  "/js/stickySidebar.js",
  "/js/owl.carousel.js",
  "/js/easyResponsiveTabs.js",
  "/custom/header.js",
  "/custom/custom.js",
];

//Binding events.
Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  loadScript(JS_SCRIPTS);
  NProgress.done();
});
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({
  Component,
  pageProps,
  menusList,
  footerData,
  slackData,
  websiteSettings,
  router,
  promoData,
}) => {
  const [ipDetails, setIpDetails] = useState({});
  const [timer_details,setTimer_details] = useState(null)
  const [maintenance_details,setMaintenance_details] = useState(null)
  const [offerHeader,setOfferHeader] = useState(null)
  const [loading,setloading] = useState(true)
  const pageData = pageProps?.pageData;
  const pageContent = pageProps?.pageData;
  const TEST_PATH = "whizlabs.com";

  const fetchCampaignData = async()=>{
    let tm_data = await axios.get(baseUrl + "/campaigns/get")
    if(tm_data.data && tm_data.data.timer){
       return tm_data.data.timer
    }else{
      return {}
    }
  }
  const fetchMaintenanceData = async () => {
    try {
      let m_data = await axios.get(`${baseUrlA}/website/banner?domain=${0}&platform=${1}`);
      if (m_data.data && m_data.data.data && m_data.data.status !== "error") {
        return m_data.data.data
      }else{
        return null;
      }
    } catch (error) {
      console.error("Error fetching maintenance data:", error);
    }
  }  

  const OfferHeaderData = async()=>{
    try{
      let offer = await axios.get(`${baseUrl}/combo/offer`);
      if(offer.data.offerData){
        return offer.data.offerData
      }else{
        return {}
      }
    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
  Cookie.remove("cartData")
  setloading(true)
  Promise.all([fetchCampaignData(),fetchMaintenanceData(),OfferHeaderData()]).then((results)=>{
    setTimer_details(results[0])
    setMaintenance_details(results[1])
    setOfferHeader(results[2])
    setloading(false)
  })
  },[])
  
  useEffect(() => {
    axios.get("https://api64.ipify.org/?format=json").then((resp) => {
      const ip = resp.data.ip;
      axios.get(baseUrl + "/data/ip2location?ip=" + ip).then((res) => {
        setIpDetails(res.data.data);
      });
    });
    setTimeout(() => {
      loadScript(JS_SCRIPTS);
    }, 1000);
  }, []);

  interface PageProps {
    seoHomePageData?: {
      metaTags: any[];
      seoPageType:"";
      title:"";
    };
  }
 
  const { seoHomePageData: { metaTags, ...seoHomePageData } = {} as PageProps } = pageProps ?? {};

  return (
    <>
      <Head>
        {seoHomePageData?.seoPageType && (
          <>
            <title>{seoHomePageData?.title != "" && seoHomePageData?.title}</title>
            {metaTags?.map((tag, index) => {
              if (tag.name && tag.property && tag.content) {
                return (
                  <meta
                    key={index}
                    name={tag?.name ? tag.name : ""}
                    property={tag?.property ? tag.property : ""}
                    content={tag?.content ? tag.content : ""}
                  />
                );
              } else if (tag.property && tag.content && !tag.name) {
                return (
                  <meta
                    key={index}
                    property={tag?.property ? tag.property : ""}
                    content={tag?.content ? tag.content : ""}
                  />
                );
              } else if (tag.name && tag.content && !tag.property) {
                return (
                  <meta key={index} name={tag?.name} content={tag?.content ? tag.content : ""} />
                );
              }
            })}
          </>
        )}
        {/* {pageContent ? (
          <>
            <Script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: (Math.floor(pageContent.ratings?.overall_rating * 2) / 2).toFixed(1),
                  reviewCount: pageContent.ratings?.rating,
                },
                description: pageContent.seo_details?.seo_description,
                mpn: pageContent?.sku,
                sku: pageContent?.sku,
                brand: {
                  "@type": "Brand",
                  name: "Whizlabs",
                },
                name: pageContent.seo_details?.seo_title,
                seo_title: pageContent.seo_details?.seo_title,
                image:
                  process.env.NEXT_PUBLIC_WEB_MEDIA_URL +
                  pageContent.seo_details?.featured_image?.replace("media/", ""),
              })}
            </Script>
          </>
        ) : null} */}
        {/* GOOGLE TAG MANAGER */}
        {/* <Script
        strategy="beforeInteractive"
        >
          {
            `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); 
            })(window,document,'script','dataLayer','GTM-PV9429C')`
          }
        </Script> */}
        <script
          id="whiz_googleScript"
          dangerouslySetInnerHTML={{
            __html: process.env.NEXT_PUBLIC_BASE_PATH.includes(TEST_PATH)
              ? `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-PV9429C');`
              : ``,
          }}
        />
        {/* END GOOGLE TAG MANAGER */}
      </Head>
      <motion.div
        key={router.route}
        initial="pageInitial"
        animate="pageAnimate"
        variants={{
          pageInitial: {
            opacity: 0,
          },
          pageAnimate: {
            opacity: 1,
          },
        }}
      >
        <SessionProvider session={pageProps?.session}>
          <Provider store={store}>
            {!loading ? (
              <Layout
                websiteSettings={websiteSettings}
                menusList={MenuList}
                footerData={FooterDataList}
                slackData={slackData}
                ip_details={ipDetails}
                promoData={promoData}
                timer_details={timer_details}
                maintenance_details={maintenance_details}
                offerHeader={offerHeader}
              >
                <Component {...pageProps} promoData={promoData} timer_details={timer_details} />
              </Layout>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  height: "100vh",
                  alignItems: "center",
                  padding: "20px",
                }}
              >
                <img src="/images/logo.svg" width={"500px"} alt="Whizlabs Logo" />
              </div>
            )}
          </Provider>
        </SessionProvider>
      </motion.div>

      {/* <!-- Google Tag Manager (noscript) --> */}
      <noscript>
        <iframe
          src={
            process.env.NEXT_PUBLIC_BASE_PATH.includes(TEST_PATH)
              ? "https://www.googletagmanager.com/ns.html?id=GTM-PV9429C"
              : ""
          }
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
      {/* <!-- End Google Tag Manager (noscript) --> */}
    </>
  );
};

MyApp.getInitialProps = async () => {
  let menusList = [];
  let footerData = [];
  let slackData = {};
  let websiteSettings = [];
  let ip_details = null;
  let promoData = [];
  
  // try {
  //   const {
  //     data: { data: MenuData },
  //   } = await axios.get(baseUrl + "/web/menu/header");
  //   menusList = MenuData;
  // } catch (error) {
  //   console.error("header error:", baseUrl, error);
  // }

  // try {
  //   const {
  //     data: { data: FooterData },
  //   } = await axios.get(baseUrl + "/web/menu/footer");
  //   footerData = FooterData;
  // } catch (error) {
  //   console.error("footer error:", baseUrl, error);
  // }

  try {
    const { data } = await axios.get(baseUrl + "/web/fetch-settings");
    
    slackData = data.data.filter((Itm) => Itm.key === "website_slack_url");
    websiteSettings = data.data;



  } catch (error) {
    console.error("Website Settings error:", baseUrl, error);
  }

  try {
    const { data } = await axios.get(baseUrl + "/web/promotions");

      
    promoData = data;
  } catch (error) {
    console.error("Website Promos error:", baseUrl, error);
  }

  return { menusList, footerData, slackData, websiteSettings, ip_details, promoData};
};

const loadScript = (url: Array<any>) => {
  if (document && document.readyState == "complete") {
    const jsDiv = document.querySelector("#CUSTOM_SCRIPTS");
    jsDiv.innerHTML = "";
    if (url.length > 0) {
      url.forEach((el, i) => {
        const script = document.createElement("script");
        script.innerHTML = "";
        script.src = el;
        script.id = "CUSTOM_SCRIPT_" + i;
        script.async = false;
        script.defer = true;
        jsDiv.appendChild(script);
      });
    }
  }
};

export default MyApp;
