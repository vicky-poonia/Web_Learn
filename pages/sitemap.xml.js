const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const siteUrl = "https://www.whizlabs.com/";

  const staticPages = [
    siteUrl + "sitemap/products.xml",
    siteUrl + "sitemap/header.xml",
    siteUrl + "sitemap/footer.xml",
    siteUrl + "sitemap/pages.xml",
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${staticPages
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

  return {
    props: {},
  };
};

export default Sitemap;
