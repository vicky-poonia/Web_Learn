import axios from "axios";

const ProductSitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const siteUrl = "https://www.whizlabs.com";
  let productArray = [];

  let courseResponse = await axios.get(baseUrl + "/courses/sitemap");

  if (courseResponse && courseResponse.data.data) {
    courseResponse.data.data.map((item) => {
      if (item?.slug) {
        productArray.push(siteUrl + "/" + item?.slug + "/");
      }
    });
  }

  if (productArray && productArray.length > 0) {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${productArray
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

export default ProductSitemap;
