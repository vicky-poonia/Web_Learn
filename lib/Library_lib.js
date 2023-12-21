export const categoryList = [
    {
      id: 25,
      categoryName: "Agile",
    },
    {
      id: 15,
      categoryName: "Amazon (AWS)",
    },
    {
      id: 34,
      categoryName: "Alibaba Cloud",
    },
    {
      id: 21,
      categoryName: "Big Data",
    },
    {
      id: 22,
      categoryName: "Blockchain",
    },
    {
      id: 31,
      categoryName: "Blue Prism",
    },
    {
      id: 26,
      categoryName: "Business Analysis",
    },
    {
      id: 20,
      categoryName: "Cloud Security",
    },
    {
      id: 38,
      categoryName: "Cyber Security",
    },
    {
      id: 37,
      categoryName: "DevOps",
    },
    {
      id: 19,
      categoryName: "Google Cloud",
    },
    {
      id: 39,
      categoryName: "IT Ops",
    },
    {
      id: 38,
      categoryName: "CompTIA",
    },
    {
      id: 28,
      categoryName: "Java",
    },
    {
      id: 29,
      categoryName: "Linux",
    },
    {
      id: 18,
      categoryName: "Microsoft Azure",
    },
    {
      id: 41,
      categoryName: "Microsoft Power Platform",
    },
    {
      id: 2,
      categoryName: "Microsoft 365 Certifications",
    },
    {
      id: 33,
      categoryName: "Networking",
    },
    // {
    //   id: 23,
    //   categoryName: "Project Management",
    // },
    {
      id: 24,
      categoryName: "Salesforce",
    },
    {
      id: 36,
      categoryName: "Spring Framework",
    },
    {
      id: 40,
      categoryName: "Snowflake",
    },
  ];

export const productTypeList = [
    {
      shortname: "FT",
      fullname: "Free Test",
    },
    {
      shortname: "PT",
      fullname: "Practice Test",
    },
    {
      shortname: "OC",
      fullname: "Video Course",
    },
    {
      shortname: "SANDBOX",
      fullname: "Sandbox",
    },
    // {
    //   shortname: "ILT",
    //   fullname: "Includes Instructor Instruction",
    // },
    {
      shortname: "LAB",
      fullname: "Labs",
    },
  ];

export const courseLevels = [
    {
      name: "Beginner",
      value: "Beginner",
    },
    {
      name: "Intermediate",
      value: "Intermediate",
    },
    {
      name: "Advanced",
      value: "Advanced",
    },
    {
      name: "Expert",
      value: "Expert",
    },
  ];

export const languages = [
    {
      count:"207",
      name: "English",
      value: "English",
    },
    {
      count:"1",
      name: "Spanish",
      value: "Spanish",
    },
  ];

export const categoryListLab = [
    {
      id:1,
      categoryName:"Aws"
    },
    {
      id:2,
      categoryName:"Azure"
    },
    {
      id:3,
      categoryName:"GCP"
    },
    // {
    //   id:4,
    //   categoryName:"Python"
    // },
    {
      id:5,
      categoryName:"Microsoft Power BI"
    }
    // {
    //   id:6,
    //   categoryName:"Kubernetes"
    // }
  ]
export const productTypeListLab = [
    {
      id:1,
      name:"Guided Lab"
    },
    {
      id:2,
      name:"Lab Challenge"
    },
    {
      id:3,
      name:"Lab Project"
    },
  ]
export const courseLevelLab = [
    {
      id:1,
      name:"Fundamentals"
    },
    {
      id:2,
      name:"Intermediate"
    },
    {
      id:3,
      name:"Advanced"
    }
  ]

 export let sandboxData = [
    {
      icon:"aws-sandbox.svg",
      title:"AWS Sandbox",
      description:"Get your hands cloudy with Amazon Web Services Sandbox Console and master your skills.",
      slug:"/sandbox/aws/aws-sandbox",
      start:"Start AWS Sandbox",
      id:1
    },
    {
      icon:"google-sandbox.svg",
      title:"Google Cloud Sandbox",
      description:"Access Google Cloud Platform and try out things on your own.",
      slug:"/gcp-sandbox",
      start:"Start GCP Sandbox",
      id:2
    },
    {
      icon:"azure-sandbox.svg",
      title:"Azure Sandbox",
      description:"This playground is intended for anyone interested in learning Azure in depth.",
      slug:"/azure-sandbox",
      start:"Start Azure Sandbox",
      id:3
    },
    {
      icon:"powerbi-lib.svg",
      title:"Power BI Sandbox",
      description:"Comes up with real-time connectivity with Microsoft Power BI & MS-office apps.",
      slug:"/sandbox/ms-power-bi/ms-power-bi-sandbox",
      start:"Start Power BI Sandbox",
      id:4
    },
    {
      icon:"jupyter-sandbox.svg",
      title:"Jupyter Sandbox",
      description:"Try out Jupyter notebooks tool for interactive data analysis and coding.",
      slug:"/jupyter-sandbox",
      start:"Start Jupyter Sandbox",
      id:5
    }
  ]
  
  export const SANDBOX_PRD = [2475,2476,2479,2483]
  export const gcp_course_id = [239,274,250,394]

  export const faq_aws_free = [
    {
      question:"What are AWS hands-on labs?",
      answer:"If you want to dive deep into the AWS concepts, you can utilize the AWS hands-on labs. The AWS hands-on labs help to acquire practical experience and master AWS services through guided exercises."
    },
    {
      question:"What are the benefits of AWS hands-on labs?",
      answer:"Hands-on labs provide a practical learning experience, allowing you to apply theoretical knowledge in a real-world environment. You can gain practical experience by working with AWS services and understanding their functionalities. Moreover, practical experience enhances your technical expertise and boosts your confidence in working with AWS."
    },
    {
      question:"Does Whizlabs provide AWS free hands-on labs?",
      answer:"Yes. Whizlabs provides a free trial for 7 days for AWS hands-on labs. The new users can utilize this chance and gain practical experience with our live AWS platform. "
    },
    {
      question:"What is the validity of the AWS hands-on labs free trial?",
      answer:"The AWS hands-on labs free trial in Whizlabs will be valid only for 7 days."
    },
    {
      question:"What can be done after the completion of the free trial period?",
      answer:"<p>After the completion of a 7 days trial period, the user has to upgrade their subscriptions and has to select the plans as per their requirement to continue the subscription.To Upgrade FREE trial to a subscription, follow the below steps <ul><li>Go to the pricing page: <a href='/pricing'>https://www.whizlabs.com/pricing/</a> and purchase your subscription.</li></ul></p>"
    },
    {
      question:"Who is eligible for this AWS hands-on labs free trial?",
      answer:"The free trial plan can be offered to new users or existing users who have already signed up but have not purchased any of the Whizlabs training materials like labs, sandboxes, and practice tests till now."

    }
  ]
