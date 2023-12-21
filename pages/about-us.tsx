import axios from "axios";
import Head from "next/head";
import Image from "next/image";

const AboutUs = ({ blogContent = [], employeesList, seoHomePageData }) => {
  const getHtmlContent = (content, link) => {
    const html =
      content
        .toString()
        .replace(/<\/?[^>]+>/gi, "")
        .substr(0, 300) + "  ......";
    return html;
  };
  return (
    <>
      {/* <Head>
        <title>About us | Whizlabs</title>

        <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />

        <meta name="title" content="About Us - Whizlabs" />
        <meta
          name="description"
          content="Established in 2000, Whizlabs is the pioneer of the online certification training industry. We&#039;ve helped over 5M+ professionals to get ahead in their careers."
        />
        <meta name="keywords" content="About Us" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About Us - Whizlabs" />
        <meta
          property="og:description"
          content="Established in 2000, Whizlabs is the pioneer of the online certification training industry. We&#039;ve helped over 5M+ professionals to get ahead in their careers."
        />
        <meta property="og:url" content="https://www.whizlabs.com/about-us/" />
        <meta property="og:site_name" content="Whizlabs" />
        <meta property="og:image" content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ac8e8025822"} />
        <meta property="fb:app_id" content="502194103558420" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="Established in 2000, Whizlabs is the pioneer of the online certification training industry. We&#039;ve helped over 5M+ professionals to get ahead in their careers."
        />
        <meta name="twitter:title" content="About Us - Whizlabs" />
        <meta name="twitter:site" content="@whizlabs" />
        <meta name="twitter:image" content={process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ac8e8025869"} />
        <meta name="twitter:creator" content="@whizlabs" />
      </Head> */}
      {/* <!-- banner-part --> */}
      <div className="aboutus-banner">
        <div className="container">
          <div className="left">
            <span>About us</span>
            <h1>We are dedicated to helping you learn the skills you need to achieve your goals.</h1>
          </div>
          <div className="right">
            <img width={811} height={416} className="img-full" src="/images/about-us-banner2x.webp" alt="" />
          </div>
        </div>
      </div>

      {/* <!-- content area part -->  */}
      <div id="content-area" className="aboutus-page">
        {/* <!-- our-journy --> */}
        <div className="our-journy">
          <div className="container-small">
            <div className="left">
              <h2>
                <span>Our Journey</span> 20+ years of success
              </h2>
              <p>
              Whizlabs is a leading hands-on learning provider in various technologies such as
               <strong> Cloud Computing (AWS, Azure, GCP), DevOps Java, BigData, Snowflake, CompTIA, Cybersecurity, and Blockchain</strong> 
              </p>
              <p>
              Since our launch in 2000, we have been helping over 10 million+ professionals and learners
               around the world to achieve success in their careers through our wide range of courses, practice tests, hands-on labs, and cloud sandbox. 
               With over 22+ years of experience, Whizlabs is a pioneer in the online training industry.
              </p>
            </div>
            <div className="right">
              <figure>
                <img width={55} height={65} className="img-full" src="/images/about-us-badge.svg" alt="" />
              </figure>
              <p>
                Awarded as the Most Innovative Indian IT Company by <strong>NASSCOM</strong> in 2004.
              </p>
            </div>
          </div>
        </div>

        {/* <!-- we-helped-block --> */}
        <div className="helped-block">
          <div className="container-small">
            <h3>
              We Helped <strong>10M+</strong> Professionals and <strong>500+</strong> Companies
            </h3>
            <div className="block-group">
              <div className="block c-light-blue">
                <div className="title">Our Mission</div>
                <p>
                Upskilling & Reskilling the Global workforce by offering the best-in-class 
                integrated learning platform with an immersive learning experience at an affordable cost.
                </p>
              </div>
              <div className="block c-cinderella">
                <div className="title">Our Vision</div>
                <p>
                To be a socially responsible Edu-tech company that transforms lives across the globe.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- vision-block --> */}
        <div className="vision-block">
          <div className="container-small">
            <div className="title-block">
              <h4>A leadership team with vision</h4>
              <p>Our executives lead by example and guide us to accomplish great things every day.</p>
            </div>

            <div className="ceo-block">
              <div className="block cyan">
                <div className="img-block">
                  <img width={405} height={455} className="img-full" src="/images/ceo-img2x.webp" alt="" />
                </div>
              </div>
              <div className="block alice-blue">
                <div className="intro-block">
                  <div className="name">Krishna Srinivasan</div>
                  <span className="position">Co-Founder & CEO</span>
                </div>
                <p>
                As a technology professional with over 20+ years of experience, 
                I am committed to sharing my knowledge and expertise with the cloud world. 
                As the CEO of Whizlabs, my primary focus is on product development, future direction, 
                and business strategy. I am proud to have been a key contributor to the success of Whizlabs. 
                Additionally, I am a co-founder of <a target="_blank" href="https://www.easydeploy.io/">easydeploy.io.</a>
                </p>
                <p>
                I firmly believe that education is a fundamental right for all and that it is the most powerful tool for creating 
                positive change in the world. With a focus on digital education, my goal is to make it possible for people to study 
                anything, anytime, anywhere, online. I am dedicated to making this dream a reality.
                </p>
                <p>
                  You can connect with me on my{" "}
                  <a target="_blank" href="https://www.linkedin.com/in/krishnasa/">
                    Linkedin
                  </a>{" "}
                  profile.
                </p>
              </div>
            </div>

            <div className="blogs-block owl-carousel owl-theme">
              {blogContent.map((item, i) => (
                <div key={i} className="block">
                  <div className="title" dangerouslySetInnerHTML={{ __html: item.title.rendered }}></div>
                  <span>
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </span>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: getHtmlContent(item.excerpt.rendered, item.link),
                    }}
                  ></p>
                  <p>
                    <a target="_blank" href={item.link}>
                      {" "}
                      Read more
                    </a>
                  </p>
                </div>
              ))}
            </div>

            <div className="borad-diretors">
              <div className="title">Board of directors</div>
              <div className="block-group">
                <div className="block">
                  <figure>
                    <img width={100} height={100} className="img-full" src="/images/board-director12x.png" alt="" />
                  </figure>
                  <div className="details">
                    <div className="block-title">Krishna Srinivasan</div>
                    <span className="designation">Co-Founder & CEO</span>
                    <div className="social-link">
                      <a target="_blank" href="https://www.facebook.com/krishna.sriarun/" className="icon icon-font-facebook"></a>
                      <a target="_blank" href="https://twitter.com/hikrish12/" className="icon icon-font-tweeter"></a>
                      <a target="_blank" href="https://www.linkedin.com/in/krishnasa/" className="icon icon-font-linkedin"></a>
                    </div>
                  </div>
                </div>
                <div className="block">
                  <figure>
                    <img width={100} height={100} className="img-full" src="/images/board-director22x.png" alt="" />
                  </figure>
                  <div className="details">
                    <div className="block-title">Kapil Nakra</div>
                    <span className="designation">Co-founder</span>
                    <div className="social-link">
                      <a target="_blank" href="https://www.facebook.com/kapil.nakra/" className="icon-font-facebook"></a>
                      <a target="_blank" href="https://twitter.com/kapilnakra/" className="icon-font-tweeter"></a>
                      <a target="_blank" href="https://www.linkedin.com/in/kapilnakra/" className="icon-font-linkedin"></a>
                    </div>
                  </div>
                </div>
                <div className="block">
                  <figure>
                    <img width={100} height={100} className="img-full" src="/images/board-director32x.png" alt="" />
                  </figure>
                  <div className="details">
                    <div className="block-title">Pradeep Chopra</div>
                    <span className="designation">Co-founder</span>
                    <div className="social-link">
                      <a target="_blank" href="https://facebook.com/pradeepchopra/" className="icon-font-facebook"></a>
                      <a target="_blank" href="http://twitter.com/pradeepchopra/" className="icon-font-tweeter"></a>
                      <a target="_blank" href="https://www.linkedin.com/in/pradeepchopra/" className="icon-font-linkedin"></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- team-block --> */}
        <div className="team-block" >
          <div className="container-small-photos">
            <h5>Our Amazing Team</h5>
            <div className="block-group" style={{ width: "100%"}}>
              {/* <img style={{ maxWidth: "100%" }} src="/employee_images/teams-image.png" /> */}
              {employeesList.map((element, i) => (
                <div key={i} className="block">
                  <figure
                    style={{
                      borderRadius: "100%",
                    }}
                  >
                    <img
                      width={100}
                      height={100}
                      className="img-full"
                      src={element.profile_pic}
                      alt={element.name}
                    />
                  </figure>
                  {/* <div className="details">
                    <div className="name">{element.name}</div>
                    <span className="designation">{element.designation}</span>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ params }) {
  let blogContent = null;

  const response = await axios.get("https://www.whizlabs.com/blog/wp-json/wp/v2/posts?categories=2718");

  if (response && response.data.length > 0) {
    blogContent = response.data;
  }

  const employeesList = [
    {
      // name: "Abilesh Premkumar",
      profile_pic: "/teammembers-webp/1.webp",
      // designation: "Digital Marketing Lead",
    },
    {
      // name: "Abinaya",
      profile_pic: "/teammembers-webp/2.webp",
      // designation: "Programmer Trainee",
    },
    {
      // name: "Aditya",
      profile_pic: "/teammembers-webp/3.webp",
      // designation: "Cloud Computing Intern",
    },
    {
      // name: "Aiswarya",
      profile_pic: "/teammembers-webp/4.webp",
      // designation: "Customer Happiness Trainee",
    },
    {
      // name: "Ajay Kannan C V",
      profile_pic: "/teammembers-webp/5.webp",
      // designation: "Business Development Manager",
    },
    {
      // name: "Anant Goel",
      profile_pic: "/teammembers-webp/6.webp",
      // designation: "Cloud Computing Intern",
    },
    {
      // name: "Ananya",
      profile_pic: "/teammembers-webp/7.webp",
      // designation: "Cloud Computing Intern",
    },
    {
      // name: "Aravind Bhuvi",
      profile_pic: "/teammembers-webp/8.webp",
      // designation: "Digital Marketing Executive",
    },
    {
      // name: "Arunkumar",
      profile_pic: "/teammembers-webp/9.webp",
      // designation: "Finance Executive",
    },
    {
      // name: "Aswin Srinivasan",
      profile_pic: "/teammembers-webp/10.webp",
      // designation: "Programmer trainee",
    },
    {
      // name: "Basant N. Singh",
      profile_pic: "/teammembers-webp/11.webp",
      // designation: "Cloud Products Manager",
    },
    {
      // name: "Cibi Manoj",
      profile_pic: "/teammembers-webp/12.webp",
      // designation: "Programmer trainee",
    },
    {
      // name: "Dharmendra Singh Digari",
      profile_pic: "/teammembers-webp/13.webp",
      // designation: "Project Manager",
    },
    {
      // name: "Deepanamarnath",
      profile_pic: "/teammembers-webp/14.webp",
      // designation: "Software Tester-Intern",
    },
    {
      // name: "Dhruval",
      profile_pic: "/teammembers-webp/15.webp",
      // designation: "Senior Software Engineer",
    },
    {
      // name: "Hemanth",
      profile_pic: "/teammembers-webp/16.webp",
      // designation: "Cloud Computing Intern",
    },
    {
      // name: "Joshua Jayachandran",
      profile_pic: "/teammembers-webp/17.webp",
      // designation: "Digital Marketing Executive",
    },
    {
      // name: "Kalidash",
      profile_pic: "/teammembers-webp/18.webp",
      // designation: "Programmer Trainee",
    },
    {
      // name: "Karam",
      profile_pic: "/teammembers-webp/19.webp",
      // designation: "Technical Lead",
    },
    {
      // name: "Karan Fotedar",
      profile_pic: "/teammembers-webp/20.webp",
      // designation: "Full Stack Developer",
    },
    {
      // name: "Karuppasamy R",
      profile_pic: "/teammembers-webp/21.webp",
      // designation: "Data Entry Operator",
    },
    {
      // name: "Mallikarjun.K.G",
      profile_pic: "/teammembers-webp/22.webp",
      // designation: "Customer Success Lead",
    },
    {
      // name: "Mayank Vaishnav",
      profile_pic: "/teammembers-webp/23.webp",
      // designation: "Senior Cloud Analyst",
    },
    {
      // name: "Naveen Kumar",
      profile_pic: "/teammembers-webp/24.webp",
      // designation: "Operations Manager",
    },
    {
      // name: "Sai Navya Mani Vadada",
      profile_pic: "/teammembers-webp/25.webp",
      // designation: "Business Analyst",
    },
    {
      // name: "Nikhil K",
      profile_pic: "/teammembers-webp/26.webp",
      // designation: "Cloud Products Associate",
    },
    {
      // name: "Pavan H G",
      profile_pic: "/teammembers-webp/27.webp",
      // designation: "Senior Manager",
    },
    {
      // name: "Poojan",
      profile_pic: "/teammembers-webp/28.webp",
      // designation: "Cloud Computing Intern",
    },
    {
      // name: "Prenesh Jaganathan",
      profile_pic: "/teammembers-webp/29.webp",
      // designation: "Senior Product Quality Analyst",
    },
    {
      // name: "Prerit Munjal",
      profile_pic: "/teammembers-webp/30.webp",
      // designation: "Cloud Computing Intern",
    },
    {
      // name: "Ramesh P",
      profile_pic: "/teammembers-webp/31.webp",
      // designation: "HR Administrative Associate",
    },
    {
      // name: "Ranjith",
      profile_pic: "/teammembers-webp/32.webp",
      // designation: "Office Admin",
    },
    {
      // name: "Rishi Priya.R",
      profile_pic: "/teammembers-webp/33.webp",
      // designation: "Senior Customer Happiness Executive",
    },
    {
      // name: "Rohini Parmar",
      profile_pic: "/teammembers-webp/34.webp",
      // designation: "Labs Support Engineer",
    },
    {
      // name: "Sahil Agarwal",
      profile_pic: "/teammembers-webp/35.webp",
      // designation: "Cloud Computing Intern",
    },
    {
      // name: "Sangeetha  Nirikhi",
      profile_pic: "/teammembers-webp/36.webp",
      // designation: "HR Manager",
    },
    {
      // name: "Saurav Raghuvanshi",
      profile_pic: "/teammembers-webp/37.webp",
      // designation: "Cloud Products Associate",
    },
    {
      // name: "Senthil Kumar P",
      profile_pic: "/teammembers-webp/38.webp",
      // designation: "Senior Data Processing Analyst",
    },
    {
      // name: "Shane Nathaneil",
      profile_pic: "/teammembers-webp/39.webp",
      // designation: "Customer Happiness Executive",
    },
    {
      // name: "Sparsh Goyal",
      profile_pic: "/teammembers-webp/40.webp",
      // designation: "Technical Lead",
    },
    {
      // name: "Suneel Moopanar",
      profile_pic: "/teammembers-webp/41.webp",
      // designation: "Cloud Products Associate",
    },
    {
      // name: "Suresh M",
      profile_pic: "/teammembers-webp/42.webp",
      // designation: "Full Stack Developer",
    },
    {
      // name: "Sweta Singhal",
      profile_pic: "/teammembers-webp/43.webp",
      // designation: "Content Writer",
    },
    {
      // name: "Tarun Dwivedi",
      profile_pic: "/teammembers-webp/44.webp",
      // designation: "Technical Lead",
    },
    {
      // name: "Ujash",
      profile_pic: "/teammembers-webp/45.webp",
      // designation: "Technical Lead",
    },
    {
      // name: "Vasanth Rajan",
      profile_pic: "/teammembers-webp/46.webp",
      // designation: "Product Technical Manager",
    },
    {
      // name: "Vidhya Boopathi",
      profile_pic: "/teammembers-webp/47.webp",
      // designation: "Senior Digital Marketing Executive",
    },
    {
      // name: "Vinothkumar Jayaraman",
      profile_pic: "/teammembers-webp/48.webp",
      // designation: "Programmer Trainee",
    },
    {
      // name: "Vishakha Sharma",
      profile_pic: "/teammembers-webp/49.webp",
      // designation: "Cloud Computing Intern",
    },
    {
      // name: "Yakshu Makkar",
      profile_pic: "/teammembers-webp/50.webp",
      // designation: "Cloud Computing Intern",
    },
    {
      // name: "Ali",
      profile_pic: "/teammembers-webp/51.webp",
      // designation: "Office Boy",
    },
  ];

    const seoHomePageData = {
      seoPageType: "aboutUsPage", // This should be changed to reflect the actual page type
      title: "About Us | Whizlabs",
      metaTags: [
        {
          name: "facebook-domain-verification",
          property: "",
          content: "twh401qzi7r7o3n227q4sg3hghbpzh",
        },
        { name: "title", property: "", content: "About Us - Whizlabs" },
        {
          name: "description",
          property: "",
          content:
            "Established in 2000, Whizlabs is the pioneer of the online certification training industry. We've helped over 5M+ professionals to get ahead in their careers.",
        },
        { name: "keywords", property: "", content: "About Us" },
        { name: "", property: "og:locale", content: "en_US" },
        { name: "", property: "og:type", content: "website" },
        { name: "", property: "og:title", content: "About Us - Whizlabs" },
        {
          name: "",
          property: "og:description",
          content:
            "Established in 2000, Whizlabs is the pioneer of the online certification training industry. We've helped over 5M+ professionals to get ahead in their careers.",
        },
        { name: "", property: "og:url", content: "https://www.whizlabs.com/about-us/" },
        { name: "", property: "og:site_name", content: "Whizlabs" },
        {
          name: "",
          property: "og:image",
          content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ac8e8025822",
        },
        { name: "", property: "fb:app_id", content: "502194103558420" },
        { name: "", property: "og:image:width", content: "500" },
        { name: "", property: "og:image:height", content: "500" },
        { name: "twitter:card", property: "", content: "summary" },
        {
          name: "twitter:description",
          property: "",
          content:
            "Established in 2000, Whizlabs is the pioneer of the online certification training industry. We've helped over 5M+ professionals to get ahead in their careers.",
        },
        { name: "twitter:title", property: "", content: "About Us - Whizlabs" },
        { name: "twitter:site", property: "", content: "@whizlabs" },
        {
          name: "twitter:image",
          content: process.env.NEXT_PUBLIC_WEB_MEDIA_URL + "2019/03/07/meta_image.jpg?60ac8e8025869",
        },
        { name: "twitter:creator", property: "", content: "@whizlabs" },
      ],
    };

  return {
    props: {
      blogContent,
      employeesList,
      seoHomePageData,
    },
  };
}

export default AboutUs;
