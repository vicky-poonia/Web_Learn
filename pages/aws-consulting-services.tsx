import Recaptcha from "react-recaptcha";
import { connect } from "react-redux";
import { alertBox } from "redux/AlertBox/alert-actions";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Head from "next/head";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useWindowSize , loadScript } from "helpers/customHooks";
import { Accordions } from "@/components/import";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const JS_SCRIPT = "https://www.google.com/recaptcha/api.js";

const AwsConsultingServices = ({ alertBox, seoHomePageData}) => {
  const [isBreakpoint, setIsBreakpoint] = useState(false);
  const [expanded, setExpanded] = useState("panel0");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    loadScript(JS_SCRIPT);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    function handleResize() {
      const { innerWidth: width, innerHeight: height } = window;
      if (width > 1023) {
        setIsBreakpoint(false);
      } else {
        setIsBreakpoint(true);
      }
    }
  }, []);

  const [expertiseData, setExpertiseData] = useState([
    {
      id: 1,
      img: "https://www.whizlabs.com/aws-consulting-images/aws-ec2@2x.png",
      title: "Amazon EC2",
      content:
        "AWS Elastic Compute Cloud (EC2) is used for operating Virtual Machines in different AWS environments. We help you in establishing and configuring your EC2 infrastructure for highly secure and resizable compute capabilities in the cloud.",
    },
    {
      id: 2,
      img: "https://www.whizlabs.com/aws-consulting-images/aws-vpc@2x.png",
      title: "AWS VPC",
      content:
        "AWS Virtual Private Cloud (VPC) is used for launching AWS resources into a predefined virtual network. We provide reliable support to help you access an assortment of shared computing resources with scalability and ease of configuration.",
    },
    {
      id: 3,
      img: "https://www.whizlabs.com/aws-consulting-images/aws-elasticache@2x.png",
      title: "AWS Elasticache",
      content:
        "AWS Elasticache is the in-memory data store and cache, providing scalability and management for AWS services. We help you in building an app as per data with the improvement of performance for existing apps by leveraging Elasticache.",
    },
    {
      id: 4,
      img: "https://www.whizlabs.com/aws-consulting-images/aws-lambda@2x.png",
      title: "AWS Lambda",
      content:
        "AWS Lambda provides a serverless computing platform for the execution of code through provisioning, management, and payment for servers. We support you to execute the codes in response to events with the management of computing resources.",
    },
    {
      id: 5,
      img: "https://www.whizlabs.com/aws-consulting-images/aws-cloudfront@2x.png",
      title: "AWS CloudFront",
      content:
        "AWS CloudFront facilitates a global, faster and secure Content Delivery Network service through the delivery of apps, APIs, and videos. We help you increase your website speed by speeding up downloads from Amazon S3 via CloudFront.",
    },
    {
      id: 6,
      img: "https://www.whizlabs.com/aws-consulting-images/aws-rds@2x.png",
      title: "Amazon RDS",
      content:
        "AWS RDS is a relational database service which supports set up, operations and scaling of a relational database on the AWS cloud. We help you in ensuring considerable savings of resources, time and cost in setting up the relational databases.",
    },
    {
      id: 7,
      img: "https://www.whizlabs.com/aws-consulting-images/aws-ecs@2x.png",
      title: "AWS ECS",
      content:
        "AWS Elastic Container Service is a reliable container orchestration service with higher levels of performance and scalability. It provides comprehensive support for Docker containers. We help you with operations and scaling of containerized apps with AWS ECS.",
    },
    {
      id: 8,
      img: "https://www.whizlabs.com/aws-consulting-images/aws-s3@2x.png",
      title: "Amazon s3",
      content:
        "AWS Simple Storage Service (S3) provides an object storage service that delivers higher performance, security, data availability and security. We as AWS consulting partner, facilitate reliable object storage through a web service interface with AWS S3.",
    },
    {
      id: 9,
      img: "https://www.whizlabs.com/aws-consulting-images/aws-ebs@2x.png",
      title: "Amazon EBS",
      content:
        "AWS Elastic Block Storage (EBS) is a block-level storage service in which you get storage volumes that you can use with EC2 instances. We help you in making the optimal use of AWS EBS to handle applications for higher transaction and throughput inputs.",
    },
    {
      id: 10,
      img: "https://www.whizlabs.com/aws-consulting-images/con-service-img4.png",
      title: "AWS DynamoDB",
      content:
        "AWS DynamoDB provides a managed NoSQL database service with fully managed services supporting documents as well as key-value data structures. We help you with better performance in single-digit milliseconds at any scale with AWS DynamoDB.",
    },
    {
      id: 11,
      img: "https://www.whizlabs.com/aws-consulting-images/aws-code-deploy.png",
      title: "AWS CodeDeploy",
      content:
        "AWS CodeDeploy automates the deployment process for various compute services like AWS EC2, AWS Lambda and others. We as an AWS consulting company provide you with effective deployment of different application content with CodeDeploy.",
    },
    {
      id: 12,
      img: "https://www.whizlabs.com/aws-consulting-images/aws-code-commit.png",
      title: "AWS Code Commit",
      content:
        "AWS Code Commit is a source control, fully-managed service that hosts highly secure Git-based repositories. We help you improve team collaboration in coding in a secure and scalable environment without the need for your own source control system.",
    },
    {
      id: 13,
      img: "https://www.whizlabs.com/aws-consulting-images/aws-codebuild.png",
      title: "AWS CodeBuild",
      content:
        "AWS CodeBuild provides a fully managed service, ideal for continuous integration capable of producing ready-to-deploy software packages. We support you in software development without the need for provisioning, manning, and scalability for your build servers.",
    },
    {
      id: 14,
      img: "https://www.whizlabs.com/aws-consulting-images/aws-iam2x.png",
      title: "AWS IAM",
      content:
        "AWS Identity and Access Management (IAM) helps users to manage secure access to AWS resources and services. We provide competent services for the creation and management of AWS users and groups as well as use permissions with AWS.",
    },
    {
      id: 15,
      img: "https://www.whizlabs.com/aws-consulting-images/aws-cloudfront@2x.png",
      title: "AWS CloudFormation",
      content:
        "AWS CloudFormation supports modelling and provisioning AWS and other third party resources with a general language. As an AWS consulting company, we help in modelling and setting up AWS resources alongside reliable resource management.",
    },
    {
      id: 16,
      img: "https://www.whizlabs.com/aws-consulting-images/aws-redshift@2x.png",
      title: "AWS Redshift",
      content:
        "AWS Redshift facilitates a cloud data warehouse product with the support of AWS fully managed services, eligible for storage and analysis for large scale data sets. We support you in performing efficient large scale data storage, migration, and analysis.",
    },
    {
      id: 17,
      img: "https://www.whizlabs.com/aws-consulting-images/aws-ses@2x.png",
      title: "AWS SES",
      content:
        "AWS Simple Email Services (SES) facilitates a cloud-based email service developed on the highly reliable and scalable AWS infrastructure. We offer a reliable, cost-effective solution with AWS SES to send emails and interact with your customers.",
    },
    {
      id: 18,
      img: "https://www.whizlabs.com/aws-consulting-images/aws-sns.png",
      title: "AWS SNS",
      content:
        "AWS Simple Notification Service (SNS) provides a completely managed publisher/subscriber messaging service. We provide you with reliable messaging service solutions with higher availability, durability and security by leveraging AWS SNS.",
    },
    {
      id: 19,
      img: "https://www.whizlabs.com/aws-consulting-images/asw-inspector.png",
      title: "AWS Inspector",
      content:
        "AWS Inspector is a reliable security evaluation service for compliance and security for AWS-based apps. We, as your AWS consulting partner, help you in efficient management of security vulnerabilities throughout the development and deployment process.",
    },
    {
      id: 20,
      img: "https://www.whizlabs.com/aws-consulting-images/aws-waf.png",
      title: "AWS WAF",
      content:
        "AWS Web Application Firewall (WAF) can help you develop ideal infrastructures for safeguarding your web applications from various cybersecurity threats. We offer credible services for protecting your web applications from threats.",
    },
    {
      id: 21,
      img: "https://www.whizlabs.com/aws-consulting-images/aws-cloudwatch@2x.png",
      title: "AWS CloudWatch",
      content:
        "AWS CloudWatch provides a monitoring service tailored to AWS cloud applications and resources. We offer services for monitoring AWS resources and applications, setting alarms, monitoring, and storage of logs and custom metrics with CloudWatch.",
    },
    {
      id: 22,
      img: "https://www.whizlabs.com/aws-consulting-images/aws-config@2x.png",
      title: "AWS Config",
      content:
        "AWS Config enables users for reviewing, auditing and then evaluating the configurations of various AWS resources. We provide reliable support for using AWS Config to ensure efficient monitoring and recording your AWS resource configuration.",
    },
    {
      id: 23,
      img: "https://www.whizlabs.com/aws-consulting-images/aws-certmanager@2x.png",
      title: "AWS Cert Manager",
      content:
        "AWS Cert Manager ensures provisioning, deployment, and management of private and public security certifications for AWS services and resources. We, as AWS consulting company, help you in extracting the optimum potential from AWS Cert Manager.",
    },
  ]);
  const [reviewData, setReviewData] = useState([
    {
      id: 1,
      title: "Highly responsive, friendly as well",
      img: "/images/user-not-found.svg",
      user_name: "Abhishek Manuja",
      review:
        "Highly responsive, friendly as well as professional support. Whizlabs is simply the best! Provide best quality services and are always ready for help and support in a professional manner. Thanks!",
    },
    {
      id: 2,
      title: "Consulting services by Whizlabs. I",
      img: "/images/user-not-found.svg",
      user_name: "Dany",
      review:
        "Wonderful consulting services by Whizlabs. I really appreciate the prompt response and extended support to solve my issues. You really deserve more than 5 stars. Thanks a lot, guys.",
    },
    {
      id: 3,
      title: "Experienced team with quick and reliable",
      img: "/images/user-not-found.svg",
      user_name: "Jimmy Nelson",
      review:
        "Experienced team with quick and reliable support. Whizlabs AWS consulting services are strongly recommendable to everyone who is planning for cloud adoption or migration. Thanks team, you’re doing a great job.",
    },
    {
      id: 4,
      title: "Whizlabs is one of the best",
      img: "/images/user-not-found.svg",
      user_name: "Jeff Oswald",
      review:
        "Whizlabs is one of the best AWS consulting services providers. They have a very good technical support team that helped me to resolve the website downtime issue. Good job Whizlabs, thanks.",
    },
    {
      id: 5,
      title: "I contacted Whizlabs after seeing the",
      img: "/images/user-not-found.svg",
      user_name: "Brian Felix",
      review:
        "I contacted Whizlabs after seeing the positive reviews and now I can say that they are giving very good services. I recommend Whizlabs to others as what else would anyone need rather than a good server with 24/7 technical support.",
    },
  ]);

  const { register, handleSubmit, watch, errors } = useForm();

  const recaptcha = useRef(null);

  const [recaptchaVerified, SetRecaptchaVerified] = useState(false);
  const [currentSlide_two, setCurrentSlide_two] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView: isBreakpoint ? 1 : 4,
    spacing: 20,
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });
  const [slider_two, slide] = useKeenSlider<HTMLDivElement>({
    slidesPerView: 1,
    spacing: 20,
    initial: 0,
    slideChanged(s) {
      setCurrentSlide_two(s.details().relativeSlide);
    },
  });
  const recaptchaLoader = () => {};

  const verifyCallback = (response) => {
    if (response) SetRecaptchaVerified(true);
  };

  const onSubmit = async (formData, e) => {
    const insertData = JSON.stringify({
      name: formData.full_name,
      organization: formData.organization,
      email: formData.email,
      requirements: formData.description,
    });

    if (recaptchaVerified) {
      const { data } = await axios.post(baseUrl + "/web/contact/aws", insertData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      e.target.reset(); // reset form inputs
      recaptcha.current.reset();
      alertBox({
        type: "SUCCESS",
        title: "Success",
        msg: "Thank you for your request. We will get back to you soon.",
      });

      closeAwsModal();
    }
  };

  const openAwsModal = (e) => {
    e.preventDefault();
    document.querySelector("body").classList.add("open-modal-request-consultation");
  };

  const closeAwsModal = (e = null) => {
    if (e) {
      e.preventDefault();
    }
    document.querySelector("body").classList.remove("open-modal-request-consultation");
  };

  const faqData1 = [
    {
      question: `How much does AWS Managed Services cost?`,
      answer: `  <p>
      No, there is no pre-requisite for the AWS Certified Cloud Practitioner Exam.
      You can directly appear for this amazon certification exam.
    </p>`,
    },
    {
      question: `How could I get AWS consulting technical assistance from Whizlabs?`,
      answer: `<p>
      Whizlabs provides 24/7/365 technical assistance for your AWS related queries
      and concerns. You can connect with us via live chat, email, or phone.
    </p>`,
    },
    {
      question: `How much does AWS Managed Services cost?`,
      answer: `<p>
      AWS Managed Services pricing is calculated as per the percentage of AWS
      usage with the accounts that we manage. As you AWS consulting partner, we
      follow AWS best practices to optimize the cost of AWS Managed Services for
      you.
    </p>`,
    },
    {
      question: `Can I use AWS cloud for hosting high-traffic websites?`,
      answer: ` <p>
      AWS cloud specifically built for high-traffic websites as they need highly
      reliable servers, and AWS is that.
    </p>`,
    },
    {
      question: `I have security concerns in migrating to AWS infrastructure. Is cloud less
      secure?`,
      answer: `<p>
      No, AWS cloud is completely secure with end-to-end encryption, firewall, and
      VPN. If security is properly implemented in your design, you needn’t worry
      about the security concerns.&nbsp;
    </p>`,
    },
    {
      question: `How could cloud adoption benefit my business?`,
      answer: `<p>
      Cloud adoption can help your business in many ways such as reducing
      operational costs, improving security, risk mitigation with maximum
      availability, advanced analytics, improving performance, increasing
      productivity, and maximising ROI.&nbsp;
    </p>`,
    },
  ];

  const faqData2 = [
    {
      question: `Which operating system do you help with?`,
      answer: `<p>
      We have a broad team of AWS experts that can help you with all versions of
      Windows and Linux/Unix operating systems
    </p>`,
    },
    {
      question: `Which languages are supported by AWS Managed Services?`,
      answer: `<p>Currently, AWS Managed Services offers support in English</p>`,
    },
    {
      question: `Is it possible to launch multiple Amazon cloud instances?`,
      answer: `Yes, we can launch multiple Amazon cloud instances, as many as you want`,
    },
    {
      question: `What are the common cloud migration scenarios?`,
      answer: `<p>
      Generally, there are three scenarios that fit for the businesses that are
      new to cloud
    </p>
    <ul>
      <li>
        <span>who plan to deploy resources quickly</span>
      </li>
      <li>
        <span>who want to increase productivity and maximize ROI</span>
      </li>
      <li>
        <span>who need to migrate or upgrade their systems</span>
      </li>
    </ul>`,
    },
    {
      question: `What are the common cloud migration strategies?`,
      answer: `<p>
      The common cloud migration strategies are - Rehost, Replatform, and
      Refactor. One can be chosen on the basis of current analysis and further
      requirements.&nbsp
    </p>`,
    },
  ];

  return (
    <>
      {/* <Head>
        <title>AWS Consulting Services | Whizlabs</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />

        <meta name="title" content="AWS Consulting Services - Whizlabs" />
        <meta
          name="description"
          content="Being one of the top AWS consulting partners, we bring your business the capabilities of building, deploying and managing any type of complex cloud systems on AWS."
        />
        <meta
          name="keywords"
          content="AWS Consulting Services, AWS Consultant, AWS Consulting Partner, Cloud Consulting Services"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AWS Consulting Services - Whizlabs" />
        <meta
          property="og:description"
          content="Being one of the top AWS consulting partners, we bring your business the capabilities of building, deploying and managing any type of complex cloud systems on AWS."
        />
        <meta property="og:url" content="https://www.whizlabs.com/aws-consulting-services/" />
        <meta property="og:site_name" content="Whizlabs" />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acdd59dae9e"}
        />
        <meta property="fb:app_id" content="502194103558420" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="Being one of the top AWS consulting partners, we bring your business the capabilities of building, deploying and managing any type of complex cloud systems on AWS."
        />
        <meta name="twitter:title" content="AWS Consulting Services - Whizlabs" />
        <meta name="twitter:site" content="@whizlabs" />
        <meta
          name="twitter:image"
          content= {process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acdd59daef4"}
        />
        <meta name="twitter:creator" content="@whizlabs" />
      </Head> */}
      {/* AWS CONSULTING MODAL START */}
      <div className="modal modal-request-consultation">
        <div className="modal-inner">
          <div className="modal-container" style={{ transform: "translateY(0px)" }}>
            <div className="modal-content">
              <div onClick={(e) => closeAwsModal(e)} className="icon-close icon-font-cross"></div>
              <div className="form-block">
                <div className="title">Request a Consultation</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-box-group">
                    <div className="input-box">
                      <label>
                        Name <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        ref={register({ required: true, pattern: /^[a-zA-Z ]*$/i })}
                      />
                      {errors.full_name && errors.full_name.type === "required" && (
                        <span style={{ color: "red" }}>This field is required</span>
                      )}
                    </div> 
                    <div className="input-box">
                      <label>
                        Organization <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="organization"
                        ref={register({ required: true, pattern: /^[a-zA-Z ]*$/i })}
                      />
                      {errors.organization && errors.organization.type === "required" && (
                        <span style={{ color: "red" }}>This field is required</span>
                      )}
                    </div>
                    <div className="input-box">
                      <label>
                        Email <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        ref={register({
                          required: true,
                          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        })}
                      />
                      {errors.email && errors.email.type === "required" && (
                        <span style={{ color: "red" }}>This field is required</span>
                      )}
                      {errors.email && errors.email.type === "pattern" && (
                        <span style={{ color: "red" }}>Please enter valid email.</span>
                      )}
                    </div>
                    <div className="input-box">
                      <label>
                        Requirements <span style={{ color: "red" }}>*</span>
                      </label>
                      <textarea name="description" ref={register({ required: true })}></textarea>
                      {errors.description && errors.description.type === "required" && (
                        <span style={{ color: "red" }}>This field is required</span>
                      )}
                    </div>
                  </div>
                  <div className="captcha-img">
                    <Recaptcha
                      ref={recaptcha}
                      sitekey="6LeuGo4UAAAAAIZ6-Na4KHV_sIEJNjt-XlRO-Jgk"
                      render="explicit"
                      verifyCallback={verifyCallback}
                      onloadCallback={recaptchaLoader}
                      theme="light"
                    />
                  </div>
                  <br />
                  <button
                    type="submit"
                    className="btn btn-submit"
                    style={{ background: "#e05613", marginRight: "1em" }}
                  >
                    Submit
                  </button>
                  <button
                    className="btn cancel"
                    onClick={(e) => closeAwsModal(e)}
                    style={{ background: "#F3F3F4", color: "#1F2430" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
              <div className="graphic-area">
                <figure>
                  <img
                    width={355}
                    height={385}
                    className="img-full"
                    src="/images/consultation-modal-graphics.png"
                    alt=""
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* AWS CONSULTING MODAL END */}

      <div className="banner-aws-consulting">
        <div className="container">
          <div className="container-small">
            <div className="left">
              <h1>We are AWS standard consulting partner</h1>
              <p>
                Leverage the benefits of AWS platform for successful cloud transformation with
                Whizlabs strategic AWS consulting services.
              </p>
              <button className="btn btn-consultation" onClick={(e) => openAwsModal(e)}>
                Request a Consultation
              </button>
            </div>
            <figure className="img-block">
              <img
                width={840}
                height={540}
                className="img-full"
                src="/images/banner-aws-consulting.svg"
              />
            </figure>
          </div>
        </div>
      </div>

      {/* <!-- content area part -->  */}
      <div id="content-area" className="aws-consulting-page">
        {/* <!-- awsbenifits-block --> */}
        <div className="awsbenifits-block">
          <div className="container-small">
            <div className="title">
              <h2>Top Benefits</h2>
              <p>Scale & Optimise your application with AWS Services</p>
            </div>
            <div className="block-group">
              <div className="block">
                <i className="icon icon-font-administrator"></i>
                <div className="block-content">
                  <div className="block-title">Easy to Administer</div>
                  <p>
                    AWS offers you a reliable platform where you can perform project conception to
                    deployment, and database launch to application connection in an instance.
                  </p>
                </div>
              </div>
              <div className="block">
                <i className="icon icon-font-high-scalabel"></i>
                <div className="block-content">
                  <div className="block-title">Fast and Secure</div>
                  <p>
                    AWS delivers consistently fast performance at any scale for all the
                    applications. Also, you get end-to-end encryption and easy database access to
                    the cloud.
                  </p>
                </div>
              </div>
              <div className="block">
                <i className="icon icon-font-cost-effective"></i>
                <div className="block-content">
                  <div className="block-title">Improved Performance</div>
                  <p>
                    The cutting-edge services and resources of AWS helps you manage your
                    infrastructure and database on the AWS platform for better quality and
                    performance.
                  </p>
                </div>
              </div>
              <div className="block">
                <i className="icon icon-font-secure"></i>
                <div className="block-content">
                  <div className="block-title">Maximized ROI</div>
                  <p>
                    The pay-as-you-go model of AWS resources and services makes it more
                    cost-effective as you need to pay for what you use, thus you maximize your ROI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- tech-partner-block --> */}
        <div className="tech-partner-block">
          <div className="container-small">
            <div
              className="why-choose-block"
              style={{
                background: "#3D4050 url('/images/line-design.svg') no-repeat center center",
                backgroundSize: "cover",
              }}
            >
              <div className="left-block">
                <h3>Why Choose Whizlabs?</h3>
                <hr />
                <div className="sub-title">
                  We’re registered Consulting Partner with Amazon Web Services
                </div>
                <p>
                  We are a team of highly experienced and certified AWS experts intended to help you
                  in your cloud transformation journey. We help you leverage and embrace AWS
                  services for better quality, performance, and security. We handle all your
                  server-related workloads with 24/7/365 expert support, thus helping you stay
                  focused to increase productivity and maximize ROI.
                </p>
              </div>
              <div className="right-block">
                <figure>
                  <img
                    width={300}
                    height={85}
                    className="img-full"
                    src="/images/aws-partner-network.svg"
                    alt=""
                  />
                </figure>
                <div className="text">
                  <span>Standard</span>Technology Partner
                </div>
              </div>
            </div>

            <div className="consulting-block">
              <div className="title">
                <h2>
                  <span> We Hold Expertise In</span>AWS Cloud Services
                </h2>
              </div>
              <div className="slider-block keen-slider" ref={sliderRef}>
                {expertiseData.map((item) => (
                  <div className="block keen-slider__slide" key={item.id}>
                    <div className="white-box">
                      <div className="box-title">{item.title}</div>
                      <p>{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                {/* <div style={isBreakpoint?{marginLeft:"43.5%",marginTop:"10px"}:{marginLeft:"48%",marginTop:"10px"}}> */}
                <div style={{ display: "flex", flexDirection: "row", padding: "0 5px", marginTop: "15px" }}>
                  <div>
                    <button
                      className="button_for_slider slider-block__controls_left"
                      onClick={(e) => {
                        e.preventDefault();
                        slider.prev();
                      }}
                      style={currentSlide == 0 ? { opacity: ".3" } : { opacity: "1" }}
                    >
                      &lt;
                    </button>
                   </div>
                   <div>
                     <button
                       className="button_for_slider button_right_margin slider-block__controls_right" onClick={(e) => slider.next()}
                       style={currentSlide == 19 ? { opacity: ".3" } : { opacity: "1" }}
                     >
                       &gt;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- process-block --> */}
        <div className="process-block">
          <div className="container-small">
            <div className="title">
              <h2>Process we follow</h2>
            </div>
            <div className="block-group">
              <div className="block">
                <figure>
                  <img
                    width={95}
                    height={95}
                    className="img-full"
                    src="/images/consult-process-img1.png"
                  />
                </figure>
                <div className="box-title">01. Evaluation</div>
                <p>
                  We evaluate your organizational challenges and requirements through a deep
                  analysis of several factors.
                </p>
              </div>
              <div className="block">
                <figure>
                  <img
                    width={95}
                    height={95}
                    className="img-full"
                    src="/images/consult-process-img2.png"
                    alt=""
                  />
                </figure>
                <div className="box-title">02. Design</div>
                <p>
                  We assess all the aspects of your organization and come up with the best design as
                  per your requirements.
                </p>
              </div>
              <div className="block">
                <figure>
                  <img
                    width={95}
                    height={95}
                    className="img-full"
                    src="/images/consult-process-img3.png"
                    alt=""
                  />
                </figure>
                <div className="box-title">03. Implement</div>
                <p>
                  We translate designing vision into product implementation for the best, to achieve
                  the sustainable goal.
                </p>
              </div>
              <div className="block">
                <figure>
                  <img
                    width={95}
                    height={95}
                    className="img-full"
                    src="/images/consult-process-img4.png"
                    alt=""
                  />
                </figure>
                <div className="box-title">04. Manage</div>
                <p>
                  We help you throughout your cloud journey to foster the adoption, implementation,
                  and management.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- offering-block --> */}
        <div className="offering-block">
          <div className="container-small">
            <div className="title">
              <h2>Tailor&#8208;made AWS solutions</h2>
            </div>
            <div className="block-group">
              <div className="block">
                <figure>
                  <img
                    width={390}
                    height={220}
                    className="img-full"
                    src="/images/offering-block-img1.jpg"
                    alt=""
                  />
                </figure>
                <div className="box-title">Managed AWS</div>
                <p>
                  AWS Managed Services help in accelerating the process of cloud adoption. We
                  provide you reliable support for deployment, management, and monitoring, so you
                  could focus on your core business.
                </p>
              </div>
              <div className="block">
                <figure>
                  <img
                    width={390}
                    height={220}
                    className="img-full"
                    src="/images/offering-block-img2.jpg"
                    alt=""
                  />
                </figure>
                <div className="box-title">Cloud Migration</div>
                <p>
                  You need a proper strategy to migrate to AWS cloud infrastructure. We make cloud
                  migration easier by managing your compute, storage, and hosting workloads with
                  security, privacy, and flexibility.
                </p>
              </div>
              <div className="block">
                <figure>
                  <img
                    width={390}
                    height={220}
                    className="img-full"
                    src="/images/offering-block-img3.jpg"
                    alt=""
                  />
                </figure>
                <div className="box-title">Cloud Planning</div>
                <p>
                  Planning to move to cloud? We’ll be there with you in your cloud transformation
                  journey from the cloud planning phase, where we’ll help you in choosing cloud
                  resources as per your requirements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- testimonial-block --> */}
        <div className="testimonial-block">
          <div className="container">
            <div className="heading">
              <figure>
                <img
                  width={50}
                  height={36}
                  className="img-full"
                  src="/images/quote-img.svg"
                  alt=""
                />
              </figure>
              <h5>
                Some Awesome Words By <strong>Our Clients</strong>
              </h5>
            </div>
            </div>
            <div className="slider-block keen-slider " ref={slider_two}>
               {reviewData.map((item) => (
                 <div className="block keen-slider__slide">
                   <div className="white-box clients_told " >
                     <div  className="title" style={{textAlign:"center"}}>
                       <p>{item.review}</p>
                     </div>
                     <div className="user-block">
                       <figure>
                         <img className="img-full client_image" src={item.img} alt="" />
                       </figure>
                       <div className="details">
                       <div className="details" style={{textAlign:"center"}}>
                         <span >{item.user_name}</span>
                         {/* <samp>Founder at StartSmart</samp> */}
                       </div>
                     </div>
                   </div>
                 </div>
                 </div>
               ))}
               </div>
               <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                 {/* <div style={isBreakpoint?{marginLeft:"43.5%",marginTop:"10px"}:{marginLeft:"48%",marginTop:"10px"}}> */}
                 <div style={{ display: "flex", flexDirection: "row", padding: "0 5px", marginTop: "15px" }}>
                   <div>
                     <button
                       className="button_for_slider slider-block__controls_left"
                       onClick={(e) => {
                         e.preventDefault();
                         slide.prev();
                       }}
                       style={currentSlide_two == 0 ? { opacity: ".3" } : { opacity: "1" }}
                     >
                       &lt;
                     </button>
                   </div>
                   <div>
                     <button
                       className="button_for_slider button_right_margin slider-block__controls_right"
                       onClick={(e) => slide.next()}
                       style={currentSlide_two == 4 ? { opacity: ".3" } : { opacity: "1" }}
                     >
                       &gt;
                     </button>
                   </div>
                 </div>
               </div>
        </div>

        {/* <!-- faq block --> */}
        <div className="consulting-faq-block">
          <div className="container-small">
            <div className="title">
              <h4>Frequently Asked Questions</h4>
            </div>
            <div className="accordian-block-group">
              <div className="accordian-block">
                <div className="accordian-list">
                  {faqData1.map((e, i) => (
                    // <Accordions
                    //   data={{
                    //     key: i,
                    //     question: e.question,
                    //     answer: e.answer,
                    //   }}
                    // />
                    <div className="item">
                    <Accordion expanded={expanded === `panel${i}`}
                      TransitionProps={{ unmountOnExit: true }}
                      onChange={handleChange(`panel${i}`)}>
                      <AccordionSummary className={expanded === `panel${i}` ? "item-head open" : "item-head"}>
                        <>
                          <samp></samp>
                          <span>{e.question}</span>
                        </>
                      </AccordionSummary>
                      <AccordionDetails className="item-content">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: e.answer,
                          }}
                        ></div>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                  ))}
                </div>
              </div>
              <div className="accordian-block">
                <div className="accordian-list">
                  {faqData2.map((e, i) => (
                    // <Accordions
                    //   data={{
                    //     key: i,
                    //     question: e.question,
                    //     answer: e.answer,
                    //   }}
                    // />
                    <div className="item">
                    <Accordion expanded={expanded === `panel1${i}`}
                      TransitionProps={{ unmountOnExit: true }}
                      onChange={handleChange(`panel1${i}`)}>
                      <AccordionSummary className={expanded === `panel1${i}` ? "item-head open" : "item-head"}>
                        <>
                          <samp></samp>
                          <span>{e.question}</span>
                        </>
                      </AccordionSummary>
                      <AccordionDetails className="item-content">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: e.answer,
                          }}
                        ></div>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- expert-block --> */}
        <div className="consulting-expert-block">
          <div className="container-small">
            <div className="caption-block">
              <div className="caption">
                <div className="title">
                  Discuss with our <strong>Cloud Expert</strong>
                </div>
                <p>
                  Whether you’re just planning for cloud adoption or all set for the cloud
                  migration, we’re here to help you in your cloud transformation journey
                </p>
              </div>
              <a
                style={{ cursor: "pointer" }}
                className="btn btn-contact btn-consultation"
                onClick={(e) => openAwsModal(e)}
              >
                Contact Now
              </a>
            </div>
            <figure>
              <img
                width={492}
                height={343}
                className="img-full"
                src="/images/consulting-expert-img.png"
                alt=""
              />
            </figure>
          </div>
        </div>
      </div>
      
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    alertBox: (data) => dispatch(alertBox(data)),
  };
};

export default connect(null, mapDispatchToProps)(AwsConsultingServices);

export async function getServerSideProps() {
  const seoHomePageData = {
    seoPageType: "awsConsultingPage", // This should be changed to reflect the actual page type
    title: "AWS Consulting Services | Whizlabs",
    metaTags: [
      {
        name: "facebook-domain-verification",
        property: "",
        content: "twh401qzi7r7o3n227q4sg3hghbpzh",
      },
      { name: "title", property: "", content: "AWS Consulting Services - Whizlabs" },
      {
        name: "description",
        property: "",
        content:
          "Being one of the top AWS consulting partners, we bring your business the capabilities of building, deploying and managing any type of complex cloud systems on AWS.",
      },
      {
        name: "keywords",
        property: "",
        content: "AWS Consulting Services, AWS Consultant, AWS Consulting Partner, Cloud Consulting Services",
      },
      { name: "", property: "og:locale", content: "en_US" },
      { name: "", property: "og:type", content: "website" },
      { name: "", property: "og:title", content: "AWS Consulting Services - Whizlabs" },
      {
        name: "",
        property: "og:description",
        content:
          "Being one of the top AWS consulting partners, we bring your business the capabilities of building, deploying and managing any type of complex cloud systems on AWS.",
      },
      { name: "", property: "og:url", content: "https://www.whizlabs.com/aws-consulting-services/" },
      { name: "", property: "og:site_name", content: "Whizlabs" },
      {
        name: "",
        property: "og:image",
        content:
          process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acdd59dae9e",
      },
      { name: "", property: "fb:app_id", content: "502194103558420" },
      { name: "", property: "og:image:width", content: "500" },
      { name: "", property: "og:image:height", content: "500" },
      { name: "twitter:card", property: "", content: "summary" },
      {
        name: "twitter:description",
        property: "",
        content:
          "Being one of the top AWS consulting partners, we bring your business the capabilities of building, deploying and managing any type of complex cloud systems on AWS.",
      },
      { name: "twitter:title", property: "", content: "AWS Consulting Services - Whizlabs" },
      { name: "twitter:site", property: "", content: "@whizlabs" },
      {
        name: "twitter:image",
        content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60acdd59daef4",
      },
      { name: "twitter:creator", property: "", content: "@whizlabs" },
    ],
  };
  
  
  
  return {
    props: {
      seoHomePageData,
    }, // will be passed to the page component as props
  };
}