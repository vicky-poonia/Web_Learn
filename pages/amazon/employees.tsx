import Head from "next/head";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import 'keen-slider/keen-slider.min.css'
import { addSubscription } from "../../redux/AddToCart/cart-actions";
import { useKeenSlider } from 'keen-slider/react' 
import UserAvatar from "@/components/plugins/UserAvatar";
import { useRouter } from "next/router";
import { updateRedirection } from "redux/Redirection/redirect-actions";
import { PopupModal } from "@/components/shared/Modals";
const AmazonEmployees = ({courseDatas, userData,reviewData,activePlans,userType,plan,addSubscriptionToState,redirectionAction,seoHomePageData}) => {
	const router = useRouter();
  // console.log(reviewData)
  const [isBreakpoint, setIsBreakpoint] = useState(false);
  const [mobileview ,setMobileview]= useState(false);
  const [mwidth,setMwidth]=useState(0)
  const [absslide,setAbsslide] = useState(null)
  const [active_amazonUser,setActiveAmazonUser] = useState(false)
  const [normal_user,setNormaluser] = useState(true)
  const [Othersubscription,setOtherSubscription] = useState(false)
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    function handleResize() {
      const { innerWidth: width, innerHeight: height } = window;
      setMwidth(width)
      if(width < 550)
      {
        setIsBreakpoint(true)
      }
    }
  }, []);
  useEffect(()=>{
	if(userData == null)
	{
		setNormaluser(true)
	}
  },[userData])
  useEffect(()=>{
	if(activePlans)
	{
		let amazon_subscription = activePlans.find(itm => itm.plan_id == 9)
		if(amazon_subscription)
		{
			setNormaluser(false)
		}
		if(amazon_subscription && amazon_subscription.is_plan_active)
		{
			setActiveAmazonUser(true)
		}
		let other_subscription = activePlans.filter(itm => itm.plan_id != 9)
		if(other_subscription && other_subscription.length > 0)
		{
			let active_other_plans = other_subscription.filter(itm => itm.is_plan_active == true)

			if(active_other_plans && active_other_plans.length > 0)
			{
				setActiveAmazonUser(true)
			}
			if(active_other_plans.length == 0){
				let expired_plan = other_subscription.filter( itm => itm.is_plan_active ==false)
				expired_plan.map((itm)=>{
					if(itm.plan_id == 727)
					{
						setOtherSubscription(true)
					}
				})
			}
		}
	}
  },[activePlans])

  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView: isBreakpoint ? 1 :2.2,
    initial: 1,
    spacing:mobileview?100:30,
    slideChanged(s) {
      // console.log(s.details())
      setCurrentSlide(s.details().relativeSlide);
      setAbsslide(s.details().absoluteSlide)
    },
  });

  const redirectpricing = ()=>{
	if(userData && userType == "amazon")
	{	
		addSubscriptionToState(plan)
		router.push('/pricing/checkout');
	}
	else{
		addSubscriptionToState(plan)
		redirectionAction("SUBSCRIPTION");
		document.querySelector("body").classList.add("open-modal-login");
	}
  }
  const openSignUpModal = () => {
    document.querySelector("body").classList.add("open-modal-signup");
  };
  const openLogInModal = () => {
    document.querySelector("body").classList.add("open-modal-login");
  };

	//fetch subscription plans 
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
	const [regularPrice, setRegularPrice] = useState("");
	const [subscriptionData, setSubscriptionData] = useState([]);

	let fetchSubscriptionData = async () => {
		try {
			const response = await axios.get(baseUrl + "/subscription/plans");
			setSubscriptionData(response.data.data);
		} catch (error) {
			console.error("Error fetching subscription plans:", error);
		}
	};

	useEffect(() => {
		fetchSubscriptionData();
	}, []);

	useEffect(() => {
		if (subscriptionData.length > 0) {
			let oneYearPlans = subscriptionData.filter((Itm) => Itm.subscription_for === 12 && Itm.title === "Premium Plus");

			if (oneYearPlans) {
				setRegularPrice(oneYearPlans[0].offer_price.usd);
			}
		}
	}, [subscriptionData]);

  return (
    <>
      {/* <Head>
        <title>Whizlabs</title>
        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
      </Head> */}

	  <PopupModal subs={activePlans} user_type={userType} addSubscriptionToState={addSubscriptionToState} plan={plan}/>
		<div className="amazonBannerNew">
	      	<div className="container">
		        <div className="caption">
					{
						(active_amazonUser && !normal_user)  && <><div className="sub-title">
						We found a way to say <strong>Thanks to Amazon!</strong>
					  </div>
					  <h1>
						100% Free Access to our <strong>AWS Courses</strong> for all Amazon
						Employees
					  </h1></>
					}
		          	{
						(!active_amazonUser && normal_user)  && <><div className="sub-title">
						We found a way to say <strong>Thanks to Amazon!</strong>
					  </div>
					  <h1>
						100% Free Access to our <strong>AWS Courses</strong> for all Amazon
						Employees
					  </h1></>
					}
					{
						(!active_amazonUser && !normal_user)  && <><div className="sub-title">
						Your {Othersubscription==true ? <> 1 year Amazon</>:<>6 Months FREE </> } subscription has <strong>Expired !</strong>
					  </div>
					  <h1>
					  Renew the Subscription & Get UNLIMITED Access 
					  </h1>
					<div className="sub-title">  to all Whizlabs Courses (Cloud, Devops, Cybersecurity..)</div>
					  <h1><strong>@ just $5 per month.</strong></h1>
					  <div className="cta-button-amazon " onClick={(e)=>{
						e.preventDefault();
						redirectpricing()
					  }}>Renew Now</div>
					  </>
					}
		          	{!userData && <><div className="usersSection">
				      	<div className="box-group">
				        	<div className="box" key={0}>
				              <div className="title">Existing Users</div>
				              <p>You already have access because you have signed up with your Amazon email address.</p>
				              <a onClick={(e)=>{
								e.preventDefault()
								openLogInModal()
							  }} className="btn btn-amazon yellow">
				                <strong>Sign in</strong> with your <strong>Amazon email address</strong>
				              </a>
				            </div>
				            <div className="box" key={1}>
				              <div className="title">New Users</div>
				              <p>Simply sign-up using your Amazon email address & follow the instruction to verify your email.</p>
				              <a onClick={(e)=>{
								e.preventDefault()
								openSignUpModal()
							  }} className="btn btn-amazon">
				                <strong>Sign up</strong> with your <strong>Amazon email address</strong>
				              </a>
				            </div>
				      	</div>
				    </div></>}
		        </div>
		        <figure className="img-block">
		          {/* <img className="img-full" src="images/amazonbannerMan.png" alt="" /> */}
              <img className="img-full" src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}amazonbannerMan.png`} alt="bannerman" />
		        </figure>
		        <div className="shape">
		          {/* <img className="img-full" src="images/amazonbannerSharp.png" alt="" /> */}
              <img  className="img-full" src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}amazonbannerSharp.png`} alt="bannerman" />
		        </div>
	      	</div>
    	</div>

      <div className="amazonBenefitSec">
	      <div className="container">
	        <div className="benefit-block">
	          <div className="left-side">
	            <div className="amazon-benefit">
			      <figure className="bene-img">
			        {/* <img className="img-full" src="images/Videos.svg" alt="" /> */}
              <img className="img-full" src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}Videos.svg`} alt="bannerman" />
			      </figure>
			      <div className="beni-caption">
			        <h6>Video Content</h6>
			        <p>Full access to 1000+ hours of world-className video content.</p>
			      </div>
			    </div>
			    <div className="amazon-benefit">
			      <figure className="bene-img">
			        {/* <img className="img-full" src="images/Practice-Te.svg" alt="" /> */}
              <img className="img-full" src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}Practice-Te.svg`} alt="bannerman" />
			      </figure>
			      <div className="beni-caption">
			        <h6>Practice Tests and Quizzes</h6>
			        <p>Full access to premium quality Practice Tests and Quizzes.</p>
			      </div>
			    </div>
			    <div className="amazon-benefit">
			      <figure className="bene-img">
			        {/* <img className="img-full" src="images/Hands.svg" alt="" /> */}
              <img className="img-full" src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}Hands.svg`} alt="bannerman" />
			      </figure>
			      <div className="beni-caption">
			        <h6>Hands-on Labs</h6>
			        <p>Hassle free access to guided labs and lab challenges to validate your skills.</p>
			      </div>
			    </div>
			    <div className="amazon-benefit">
			      <figure className="bene-img">
			        {/* <img className="img-full" src="images/Sandboxes.svg" alt="" /> */}
              <img className="img-full" src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}Sandboxes.svg`} alt="bannerman" />
			      </figure>
			      <div className="beni-caption">
			        <h6>Cloud Sandboxes</h6>
			        <p>Enjoy working in isolated environments with cloud sandboxes.</p>
			      </div>
			    </div>
			    <div className="amazon-benefit">
			      <figure className="bene-img">
			        {/* <img className="img-full" src="images/Expert-Support1.svg" alt="" /> */}
              <img className="img-full" src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}Expert-Support1.svg`} alt="bannerman" />
			      </figure>
			      <div className="beni-caption">
			        <h6>Expert Support</h6>
			        <p>24x7 Subject Matter Expert support for a smooth preparation.</p>
			      </div>
			    </div>
			    <div className="amazon-benefit">
			      <figure className="bene-img">
			        {/* <img className="img-full" src="images/Performance.svg" alt="" /> */}
              <img className="img-full" src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}Performance.svg`} alt="bannerman" />
			      </figure>
			      <div className="beni-caption">
			        <h6>Detailed Performance Reports</h6>
			        <p>Exhaustive analysis of your performance in each test.</p>
			      </div>
			    </div>
	          </div>
	      		<div className="amazonBenefitPrice" style={{backgroundImage:`url(${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}amaBenefitBoxSharp.png)`}}>
			      <p className="off-para">
			        Get
			      </p>
            <div className="off-txt">UNLIMITED ACCESS</div>
			      <p className="off-para">
			        {active_amazonUser ?<>to all Whizlabs Courses (Cloud, Devops, Cybersecurity..)</>:<>to</>}
			      </p>
			      <ul className="benefits" style={{listStyle:"none"}}>
			        <li>
						{active_amazonUser?<>250+ courses <span>+</span></>:<> Guided Hands-on Labs  <span>+</span></>}
			        </li>
			        <li>
						{active_amazonUser? <>500+ Hands-on Labs <span>+</span></> : <>Cloud Sandboxes<span>+</span></>}
			        </li>
			        <li>
						{active_amazonUser ? <>Unlimited Sandbox</> : <>Practice Tests</>}
					</li>
			      </ul>
			      <div className="icon-box-group">
			        <figure>
			          <img className="img-full" src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}light-blue-icon1.svg`} alt="" />
			        </figure>
			        <figure>
			          {/* <img className="img-full" src="images/light-blue-icon2.svg" alt="" /> */}
                <img className="img-full" src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}light-blue-icon2.svg`} alt="" />
			        </figure>
			        <figure>
			          {/* <img className="img-full" src="images/light-blue-icon3.svg" alt="" /> */}
                <img className="img-full" src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}light-blue-icon3.svg`} alt="" />
			        </figure>
			        <figure>
			          {/* <img className="img-full" src="images/light-blue-icon4.svg" alt="" /> */}
                <img className="img-full" src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}light-blue-icon4.svg`} alt="" />
			        </figure>
			        <figure>
			          {/* <img className="img-full" src="images/light-blue-icon5.svg" alt="" /> */}
                <img className="img-full" src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}light-blue-icon5.svg`} alt="" />
			        </figure>
			      </div>
			      <div className="price-caption">
			        <label>
			          Only for You ! <br/> <small>$5</small> /Month
			        </label>
			        <span>
			          {active_amazonUser ? <></> : <>Regular Price: <del>${regularPrice}</del> /Year</>}
			        </span>
			      </div>
			      <a className="btn btn-buy"  onClick={(e)=>{
						e.preventDefault();
						redirectpricing()
					  }}>
			        Buy Now
			      </a>
				</div>  
	        </div>
	      </div>
	    </div>

      <div className="testimonial-block new-employees">
        <div className="container">
        <div className="heading">
					<figure><img className="img-full" 
          src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}quote-img.svg`}
          alt=""/></figure>
					<h5>What our <strong>Students are Saying</strong></h5>
				</div>
        <div className="slider-blocks keen-slider" ref={sliderRef}>
          {reviewData.map((itm)=>{
            return <>
               <div className="block keen-slider__slide">
          <h5>{itm.post_question_title}</h5>
						<p>{itm.post_question_text}</p>
						<div className="user-block">
							<figure>
              <UserAvatar
                        //   img={itm.profile_pic}
                          alt={itm.post_addition?.course?.name}
                          username={itm.post_addition.name ? itm.post_addition.name : itm.user_name}
                        />
              </figure>
							<div className="details">
								<span>{itm.user_name}</span>
							</div>
						</div>
          </div>
            </>
          })}
        </div>
        <div className="nav-buttons">
          <span onClick={(e)=>{
            e.preventDefault()
			e.stopPropagation(); 
            slider.prev()
          }}
          className = {absslide == 0?"color-grey":""}
          >Previous &nbsp;/</span>
          <span  onClick={(e)=>{
            e.preventDefault()
			e.stopPropagation(); 
            slider.next()
          }}
          className = {mwidth<=550?(absslide == 9 ? "color-grey":""):(absslide == 8?"color-grey":"")}
          > &nbsp;Next</span>
        </div>
        </div>
      </div>
		<div className="consulting-expert-block">
			<div className="container">
				<div className="caption-block">
					<div className="caption">
            <p>For any Assistance</p>
						<div className="title"><strong>Get in touch with our AWS Experts</strong></div>
					</div>
					<a className="btn btn-contact" href="/contact-us">Connect with us</a>
				</div>
				<figure>  <img className="img-full" src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}consulting-expert-img.png`} alt="" /></figure>
			</div>
		</div>


		<div className="colleaguesSec">
	      <div className="container">
	        <div className="inner-container">
	          	<div className="Avatars">
			      <ul>
		        	<li>
		              <img className="img-full" 
                  src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}team-member19@2x.png`}
                  alt="" />
		            </li>
		            <li>
		              <img className="img-full"
                   src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}team-member18@2x.png`}
                  alt="" />
		            </li>
		            <li>
		              <img className="img-full" 
                   src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}team-member17@2x.png`}
                  alt="" />
		            </li>
			      </ul>
			    </div>
	          	<h5>Share this with your <strong>Amazon Colleagues!</strong></h5>
	          	<div className="socialIconsBlock">
		      		<a className="social-icon" target="_blank"   href="https://api.whatsapp.com/send?text=https://www.whizlabs.com/amazon/employees" data-action="share/whatsapp/share" >
		            	<img className="img-full" 
                   src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}WhatsApps.svg`}
                  alt="" />
		          	</a>
		          	{/* <a className="social-icon" href="#">
		            	<img className="img-full" 
                   src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}messager.svg`}
                  alt="" />
		          	</a> */}
		          	{/* <a className="social-icon" href="#">
		            	<img className="img-full"
                  src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}mails.svg`}
                  alt="" />
		          	</a> */}
		          	<a className="social-icon"  href="mailto:?subject=Just%20%245%2Fmonth%20for%20Whizlabs%20Premium%2B%20Subscription&body=Get%0AUNLIMITED%20ACCESS%0Ato%0AGuided%20Hands-on%20Labs%20%2B%0ACloud%20Sandboxes%2B%0APractice%20Tests%20%2B%0ASandbox%0A%0AKnow%20More%20visit%20https%3A%2F%2Fwww.whizlabs.com%2Famazon%2Femployees%2F">
		            	<img className="img-full"
                    src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}links.svg`}
                  alt="" />
		          	</a>
		    	</div>
	        </div>
	      </div>
	    </div>
    </>
  );
};

export async function getServerSideProps(context) {
	const seoHomePageData = {
		seoPageType: "amazon",
		title: "Whizlabs",
		metaTags: [
		  { name: "facebook-domain-verification", property: "", content: "twh401qzi7r7o3n227q4sg3hghbpzh" },
		],
	  };
  let reviewData = null;
  let plan = null;
  try{
      let data = await axios.get(baseUrl + "/users/feedback/courses", {
        params: {
          per_page: 10,
          page: 1,
          rating:5,
        },
      });
      if(data)
      {
        // console.log(data.data.data)
        reviewData = data.data.data
      }
	  let amazon_Subscription_Data = await axios.get(baseUrl + "/subscription/amazon/plan")
	  if(amazon_Subscription_Data.status == 200 && amazon_Subscription_Data.data.data)
	  {
		plan = amazon_Subscription_Data.data.data[0];
	  }
  }
  catch(e)
  {
    console.log(e)
  }

  return {
    props: {
      reviewData,
	  plan,
	  seoHomePageData,
    },
  };
}

const mapStateToProps = (state) => {
	let data_available = false
	if(state.userProfileData != null)
	{
		if(state.userProfileData.userSubscriptionData)
		{
			data_available = true
		}
	}
  return {
    userData: state.authData.userData,
	activePlans : data_available ? state.userProfileData.userSubscriptionData.active_plans : null,
	userType : state.userProfileData.user_type
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
	addSubscriptionToState: (datas) => dispatch(addSubscription(datas)),
	redirectionAction: (data) => dispatch(updateRedirection(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AmazonEmployees);
