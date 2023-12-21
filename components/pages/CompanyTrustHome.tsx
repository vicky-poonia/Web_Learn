import Link from "next/link";
import React from "react";
import { TestimonialsBlock} from "@/components/import";
import TextReviews from "./Textreviews";

function CompanyTrust() {

  const CategoryData = [
    {
      link: "cloud-certification-training-courses",
      imglink: "g1.webp",
      name:"Cloud"
    },
    {
      link: "devops-certifications",
      imglink: "g2.webp",
      name:"DevOps"
    },
    {
      link: "cyber-security-certifications",
      imglink: "g3.webp",
      name:"Security"
    },
    {
      link: "microsoft-certifications",
      imglink: "g4.webp",
      name:"Microsoft"
    },
    {
      link: "oracle-java-certifications",
      imglink: "g5.webp",
      name:"Java"
    },
    {
      link: "linux-certifications",
      imglink: "g6.webp",
      name:"Linux"
    },
    {
      link: "library",
      imglink: "g7.webp",
      name:"More"
    },
  ]
  return (
    <>
      <div className="companyTrust">
        <h4>Explore our 200+ Trending courses</h4>

        <div className="Ccontainer">
          {CategoryData.map((cat, i) => (
            <Link href={`${process.env.NEXT_PUBLIC_BASE_PATH}${cat.link}`} key={`cats-${i}`}>
              <div className="cubebox">
                <div className="circle">
                  <div className="imagediv">
                    <i style={{fontStyle:'50px'}}><img
                      className="vector"
                      src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}${cat.imglink}`}
                      alt="Category"
                    /></i>
                  </div>
                </div>
                <p>{cat.name}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/pricing">
          <button className="bannerButton"><b>Get Started Now</b></button>
        </Link>
      </div>
      <TestimonialsBlock />
      <TextReviews />
      <div className="group-12230" style={{ paddingTop: '50px' }}>
        <h1 className="bebasneue-normal-thunder-98px ">
          500+ Companies trust Whizlabs
        </h1>
        <div className="group-12229">
          {/* <div className="group"> */}
          {/* <Group49 src="logo-jp-1.png" /> */}
          <div className="group-49">
            <img className="logo-deloitte2x-1" src="/images/lp1.webp" alt="logo-deloitte2x 1" />
          </div>
          <div className="group-49">
            <img className="logo-global-knowledge-1" src="/images/lp2.webp" alt="logo-global-knowledge 1" />
          </div>
          <div className="group-49">
            <img className="logo-campgemni2x-1" src="/images/lp3.webp" alt="logo-campgemni2x 1" />
          </div>
          <div className="group-49">
            <img className="logo-telefonica-1" src="/images/lp4.webp" alt="logo-telefonica 1" />
          </div>
          {/* </div> */}
          {/* <div className="group"> */}
          {/* <Group54 src="logo-tuv-1.png" /> */}
          <Group54 src="/images/lp5.webp" />
          <Group54 src="/images/lp6.webp" />
          <Group54 src="images/lp7.webp" />
          <Group54 src="/images/lp8.webp" />
          {/* </div> */}
          {/* <div className="group"> */}
          {/* <Group59 src="logo-kpmg-1.png" /> */}
          <Group59 src="/images/lp9.webp" />
          <div className="group-49">
            <img className="logo-digi-1" src="/images/lp10.webp" alt="logo-digi 1" />
          </div>
          <Group49 src="/images/lp11.webp" />
          <div className="group-49">
            <img className="lp12.webp" src="/images/lp12.webp" alt="logo-spatial 1" />
          </div>
          {/* </div> */}
        </div>
      </div>
    </>

  );
}

export default CompanyTrust;

function Group49(props) {
  const { src, className } = props;

  return (
    <div className={`group-49 ${className || ""}`}>
      <img className="logo-1" src={src} alt="logo-jp 1" />
    </div>
  );
}

function Group54(props) {
  const { src, className } = props;

  return (
    <div className={`group-49 ${className || ""}`}>
      <img className="logo-1" src={src} alt="logo-tuv 1" />
    </div>
  );
}

function Group59(props) {
  const { src, className } = props;

  return (
    <div className={`group-49 ${className || ""}`}>
      <img className="logo-2" src={src} alt="logo-kpmg 1" />
    </div>
  );
}