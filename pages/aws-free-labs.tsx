import Link from "next/link";
import { useEffect, useState } from "react";
import { Accordions, CallToAction, StarRating, Pagination } from "@/components/import";
import { connect } from "react-redux";
import axios from "axios";
import router, { useRouter } from "next/router";
import { clientLoader, clientClear } from "../redux/ClientOffer/client-action";
import { removeFromCart } from "redux/AddToCart/cart-actions";
import { updateRedirection } from "redux/Redirection/redirect-actions";
import cookie from "js-cookie";
import AccordianCourse from "@/components/shared/AccordianCourse";
import md5 from "md5";
import { enrollCourseDetail } from "redux/UserEnrolled/enroll-action";
import moment from "moment";
import AccordianPricing from "@/components/shared/Accordian-pricingfaq";
import * as LibData from "../lib/Library_lib";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const AWSFreeLabs = ({
  Courses,
  userData,
  ClientLoader,
  enrolled,
  removeFromCartAction,
  redirectionAction,
  clientClear,
  plans,EnrolledcoursesAction,
}) => {
  const [CourseType, setCourseType] = useState("all");
  const [courses, setCourses] = useState(Courses);
  const [labInfoData, setLabInfoData] = useState([]);
  const [access,setAccess] = useState(false)
  const [loading,setLoading] = useState(false)
  const [emailverification,setEmailverification] = useState(false)
  const [banner,setBanner] = useState(false);
  const checkenrolled = async()=>{
    let user = cookie.get("userData")
    if(userData && userData.data.user_id && user){
      await  EnrolledcoursesAction(userData?.data.user_id);
    }
  }

  const getAccess = async(token,user_id)=>{
      await axios.get(baseUrl + `/cart/verifylabs/?token=${token}&user_id=${user_id}&course_id=${2578}`).then(async(resp)=>{
       if(resp.data.msg = "success"){
        if(userData && userData.data.user_id){
          await  EnrolledcoursesAction(userData?.data.user_id);
        }
        if(window){
          window.history.replaceState(null, '', '/aws-free-labs')
          setBanner(true)
          setTimeout(()=>{
              setBanner(false)
          },4000)
        }
       }
      })
  }
  useEffect(()=>{
    checkenrolled();
  },[])
  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    let campaign = urlParams.get('campaign')
    if(campaign == "AWSFREELABS"){
      //get access
      //update enroll
      //redirect
      let tokenu = urlParams.get('token')
      let user_id_i = urlParams.get('user_id')
      getAccess(tokenu,user_id_i)
      
    }
  },[])
  useEffect(()=>{
    let c_value = cookie.get('AWSFREELABS')
    if(enrolled == null && userData && userData.data.user_id){
      checkenrolled()
    }
    if(enrolled != null && enrolled.length == 0){
      if(c_value){
        handleSubmit()
        cookie.remove('AWSFREELABS')
      }
    }
    if(enrolled?.length > 0 ){
      let courses = enrolled.filter((itm)=> itm.course_id == 2578)
      if(courses.length == 0){
        window.open("/pricing","_self")
      }
      else if (courses.length == 1){
        let endDate = new Date(courses[0].enrollment_details.LAB.end_date);
        let a = moment(endDate)
        let b = moment(new Date())
        let remaining =  a.diff(b,'days')
        if(remaining < 0 ){
            window.open("/pricing","_self")
        }
        setAccess(true)
      }
    }
    if(plans){
      let active_plans = plans.userSubscriptionData?.active_plans
      if(active_plans){
        let active = active_plans.filter((itm)=> itm.is_plan_active == true)
        if(active.length > 0){
          window.open('/pricing',"_self")
        }
      }
    }
  },[enrolled,plans])
  useEffect(() => {
    const labTree = [];
    let labCount = 1;
    Courses?.detailedInfo?.lab_info
      .sort((a, b) => a.order_by - b.order_by)
      .forEach((item, idx) => {
        item.children = [];

        if (item.section_heading) {
          labTree.push(item);
          return;
        }

        labTree.length > 0 ? labTree[labTree.length - 1].children.push(item) : labTree.push(item);

        labCount = labCount + 1;
      });

    setLabInfoData(labTree);
  }, []);
  let course_id = [];
  if (enrolled) {
    enrolled.forEach((itm) => {
      course_id.push(itm.course_id);
    });
  }

  const handleSubmit = async()=>{
    if(!access && userData && !emailverification ){
      setLoading(true)
      await axios.get(baseUrl + `/cart/freelabs/?user_id=${userData.data.user_id}&course_id=${Courses.id}`,
      {
        headers: {
          Authorization: userData.data.token,
          "Content-Type": "application/json",
        },
      }).then(async(resp)=>{
        if(resp.data){

          if(resp.data.msg == "Please Verify your email to access this course"){
            setEmailverification(true)
            setLoading(false)
          }
        }
      })
    }
    if(access){
      window.open(
        `${process.env.NEXT_PUBLIC_LMS_URL}/course/${Courses.seo_details?.slug}/${Courses.id}`
      );
    }
    if (!userData || !userData.data || !userData.data.user_id) {
      document.querySelector("body").classList.add("open-modal-login");
      cookie.set("AWSFREELABS",true)
    }
  }

  const handleLabs = (e, labData) => {
    e.preventDefault();
    if (userData && userData.data.user_id) {
      const backLink = `${process.env.NEXT_PUBLIC_LMS_URL}/course/${Courses.seo_details?.slug}/${Courses.id}/lab`;
      const token = md5("1@sas" + userData.data.user_email + "%1@asa");
      // const playRedirectLink = new URL("https://play.whizlabs.com/site/lms_login");
      let playRedirectLink;
      if (labData.lab_type == 4) {
        playRedirectLink = new URL(`${process.env.NEXT_PUBLIC_PLAY_URL_PYTHON}/site/lms_login`);
      } else if (labData.task_slug == "sandbox") {
        window.open(`${process.env.NEXT_PUBLIC_PLAY_URL}/sandbox`);
      } else {
        window.open(`${process.env.NEXT_PUBLIC_PLAY_URL}/${labData.task_slug}`);
        // playRedirectLink = new URL(`${process.env.NEXT_PUBLIC_PLAY_URL}/login`);
      }
      playRedirectLink?.searchParams.append("course_id", Courses.id);
      playRedirectLink?.searchParams.append("lab_id", labData.id);
      playRedirectLink?.searchParams.append("points", labData.credits);
      playRedirectLink?.searchParams.append("ref", labData.play_link);
      playRedirectLink?.searchParams.append("user_token", userData.data.token);
      playRedirectLink?.searchParams.append("task_slug", labData.task_slug);
      playRedirectLink?.searchParams.append("back", backLink);
      playRedirectLink?.searchParams.append("token", token);
      playRedirectLink?.searchParams.append("version", "3");
      playRedirectLink?.searchParams.append("api_origin", process.env.NEXT_PUBLIC_BASE_URL);
      window.open(playRedirectLink?.href);
    } else {
      let url =
        process.env.NEXT_PUBLIC_LMS_URL +
        "/course/" +
        Courses.seo_details?.slug +
        "/" +
        Courses.id +
        "/lab";
      redirectionAction("LMS_ACTIVITY", url); // after sign in redirect to LMS ONLINE COURSE PAGE
      document.body.classList.add("open-modal-login");
    }
  };

  const router = useRouter();
  useEffect(() => {
    if (CourseType != "all") {
      let newCoures = [];
      Courses.forEach((itm) => {
        itm.products.forEach((x) => {
          if (x.product_type == CourseType.toUpperCase()) {
            newCoures.push(itm);
          }
        });
      });
      setCourses(newCoures);
    } else {
      setCourses(Courses);
    }
  }, [CourseType]);

  const handleCourseType = (e, val) => {
    setCourseType(val);
  };

  return (
    <>
      {
        banner &&
        <div className="aws-free-banner">
          Your Account verified Successfully!.
        </div>
      }
      <div style={{ background: "#f4f7fa" }}>
        <div
          className="category-banner01"
          style={{
            background: "#3D4050 url(/images/new.png) no-repeat right",
          }}
        >
          <div className="container">
            <div className="left-part">
              <ul className="breadcrumbs">
                <li>
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>AWS Free Hands-on Labs</a>
                  </Link>
                </li>
              </ul>
              <h1>AWS Free Hands-on Labs</h1>
              <div style={{ color: "white" }}>
                <p>
                Learn to build your own architectures with AWS and validate your cloud skills in live AWS environments with these AWS hands-on labs for FREE 7 Days Trial (credit points based) !
                </p>
              </div>
            </div>
            <div className="right-part">
              <img className="img-full" src="/images/become-an-expert.png" alt="" />
            </div>
          </div>
          <div className="overlay"></div>
        </div>
        <div className="aws-free-handson">
          <div className="container">
            <div className="box">
              <div className="content-aws">
                <div className="tops-section">
                  <div className="left">
                    <div className="img-inner">
                      <figure>
                        <img className="img-full" src="/images/awsfreelabs.webp" />
                      </figure>
                    </div>
                    <div className="inc-box">
                      <h4>{Courses.name}</h4>
                      <p>Our AWS hands-on labs provide practical, interactive learning experiences for individuals to play around with Amazon Web Services (AWS) cloud services in real world settings. By utilizing our FREE AWS hands-on labs, you will gain deeper understanding of AWS and build confidence in utilizing its powerful cloud capabilities.</p>
                      {/* <div className="whats-included">
                  <div className="inner">
                    <div className="accordian-list">
                        {labInfoData && (
                          <>
                            <AccordianCourse
                              list={labInfoData}
                              type="lab"
                              panel="panel0"
                              link={handleLabs}
                              mobile={false}
                            />
                          </>
                        )}
                    </div>
                  </div>
                </div> */}
                    </div>
                  </div>
                  {/* <div className="right" onClick={(e)=>{
                    e.preventDefault()
                    handleSubmit();
                  }}>
                    {
                      !loading ? <div className="buy-btn" style={access?{background:"#1ac48b"}:{}}>{access ? <>Access Now</>:<>Access Free Labs</>}</div>:
                      <div className="buy-btn" style={{minWidth:"95px",textAlign:"center"}}>
                        <Oval
                      height={30}
                      width={30}
                      color="#fff"
                      wrapperStyle={{justifyContent:"center"}}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#ff6d00"
                      strokeWidth={10}
                      strokeWidthSecondary={5}
                      
                    />
                      </div>
                    }
                    { emailverification &&
                      <p style={{color:"red",width:"170px",fontSize:"11px",marginTop:"8px",fontWeight:"600"}}>Please check your Inbox and verify the link</p>
                    }
                  </div> */}
                
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="category-page">
              <div className="market-dmand">
                  <h2>What is AWS Hands-on Labs?</h2>
                  <div className="content">
                    <figure>
                    <img className="img-full" src="/images/awsfree.webp" alt=""/>
                    </figure>
                    <div className="caption">
                      <p>Want to transform your theory knowledge into practice? Then think no more! Try our engaging AWS hands-on labs. You can experience the power of AWS firsthand through our immersive labs.</p>
                      <p>AWS Hands-on Labs are interactive learning environments provided by Amazon Web Services (AWS) to help individuals gain practical experience and knowledge about various AWS services and solutions. These labs allow users to explore, experiment, and work with AWS technologies in a guided, step-by-step manner.</p>
                      <p>AWS Hands-on Labs typically consist of pre-configured environments that are accessible through a web browser. Users can follow instructions provided in the lab to perform specific tasks or exercises using AWS services. The labs cover a wide range of topics, including compute, storage, networking, security, databases, machine learning, and more.</p>
                      <p>The labs are designed to provide a hands-on experience, allowing users to interact with the AWS Management Console, use command-line tools, and deploy resources in real AWS environments. They may include scenarios like launching EC2 instances, setting up S3 buckets, configuring VPCs, creating Lambda functions, or deploying applications on AWS Elastic Beanstalk.</p>
                      <p>With our hands-on labs, you'll bridge the gap between theory and practice, empowering you to confidently navigate the world of AWS and unleash its full potential for your projects and career.</p>
                    </div>
                  </div>
              </div>
          </div>
          <div className="faq-block-as">
              <div className="container-small">
                <div className="container-left">
                    <h3>Frequently Asked Questions</h3>
                    <div className="tab_content active">
                        <div className="accordian-block">
                          <div className="accordian-list">
                          <AccordianPricing data={LibData.faq_aws_free} panel="panel0" />
                          </div>
                        </div>
                    </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  let Courses = null;
  return {
    redirect: {
      destination: `/`,
      permanent: false,
    },
  };
  await axios.get(`${baseUrl}/courses/?course_id=2578`).then((resp) => {
    if (resp.data.data) {
      Courses = resp.data.data;
    }
  });

  return {
    props: {
      Courses,
    },
  };
}
const mapStateToProps = (state) => {
  return {
    userData: state.authData.userData,
    enrolled: state.enrolled.enrolled,
    plans:state.userProfileData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ClientLoader: () => dispatch(clientLoader()),
    clientClear: () => dispatch(clientClear()),
    removeFromCartAction: (id, type) => dispatch(removeFromCart(id, type)),
    redirectionAction: (Courses, url) => dispatch(updateRedirection(Courses, url)),
    EnrolledcoursesAction : (user_id) => dispatch(enrollCourseDetail(user_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AWSFreeLabs);
