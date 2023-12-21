import axios from "axios";

const HeaderSitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const siteUrl = "https://www.whizlabs.com/";

  const {
    data: { data: MenuData },
  } = await axios.get(baseUrl + "/web/menu/header");

  if (MenuData && MenuData.length > 0) {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
          ${MenuData.map((data) => {
            return `
                <url>
                  <loc>${siteUrl + data.slug + "/"}</loc>
                </url>
              `;
          }).join("")}
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

export default HeaderSitemap;
