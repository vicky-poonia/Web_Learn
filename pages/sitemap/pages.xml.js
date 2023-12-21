const PageSitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  let pagesArray = [
    "https://www.whizlabs.com/about-us/",
    "https://www.whizlabs.com/privacy-policy/",
    "https://www.whizlabs.com/legal/",
    "https://www.whizlabs.com/partner-with-us/",
    "https://www.whizlabs.com/refund-policy/",
    "https://www.whizlabs.com/terms-of-use/",
    "https://www.whizlabs.com/our-learning-programs-guarantee/",
    "https://www.whizlabs.com/contact-us/",
    "https://www.whizlabs.com/whizlabs-content-writers/",
    "https://www.whizlabs.com/whizlabs-trainers/",
    "https://www.whizlabs.com/whizlabs-affiliate-program/",
    "https://www.whizlabs.com/corporate-trainings/",
    "https://www.whizlabs.com/webinars/",
    "https://www.whizlabs.com/acp-certification-question-answers/",
    "https://www.whizlabs.com/assistant-manager-training-sales/",
    "https://www.whizlabs.com/big-data-and-apache-hadoop-certification/",
    "https://www.whizlabs.com/big-data-questions-answers/",
    "https://www.whizlabs.com/certification-preparation-articles/",
    "https://www.whizlabs.com/certification-registration/",
    "https://www.whizlabs.com/copyrights-trademarks/",
    "https://www.whizlabs.com/digital-marketing-talent-acquisition/",
    "https://www.whizlabs.com/hiring-writers/",
    "https://www.whizlabs.com/microsoft/",
    "https://www.whizlabs.com/html5-questions-answers/",
    "https://www.whizlabs.com/learn-by-inquiry-social-media-marketing/",
    "https://www.whizlabs.com/certification-resources/",
    "https://www.whizlabs.com/ocajp7-certification-questions-answers/",
    "https://www.whizlabs.com/ocejwcd-6-certification-question-answers/",
    "https://www.whizlabs.com/ocpjp-6-certification-question-answers/",
    "https://www.whizlabs.com/ocpjwcd-5-certification-question-answers/",
    "https://www.whizlabs.com/pmp-exam-guide/",
    "https://www.whizlabs.com/pmp-experience-calculator/",
    "https://www.whizlabs.com/pmp-free-questions/",
    "https://www.whizlabs.com/pmp-certification-question-answers/",
    "https://www.whizlabs.com/six-sigma-certification/",
    "https://www.whizlabs.com/whizlabs-questions-answers/",
    "https://www.whizlabs.com/reviews/",
    "https://www.whizlabs.com/aws-consulting-services/",
    "https://www.whizlabs.com/end-user-license-agreemen/",
  ];

  if (pagesArray && pagesArray.length > 0) {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
            ${pagesArray
              .map((url) => {
                return `
              <url>
              <loc>${url}</loc>
              </url>
              `;
              })
              .join("")}
        </urlset>
      `;

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
  }

  return {
    props: {},
  };
};

export default PageSitemap;
