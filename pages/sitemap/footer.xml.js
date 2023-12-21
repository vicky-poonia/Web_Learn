import axios from "axios";

const FooterSitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const siteUrl = "https://www.whizlabs.com";
  let footerArray = [];
  const {
    data: { data: FooterData },
  } = await axios.get(baseUrl + "/web/menu/footer");

  function validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

  FooterData.map((item) => {
    if (item.id == 1 || item.id == 2 || item.id == 5) {
      item.menu_item.map((result) => {
        if (validURL(result.link)) {
          footerArray.push(result.link);
        } else {
          footerArray.push(siteUrl + result.link + "/");
        }
      });
    }
  });

  if (footerArray && footerArray.length > 0) {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
          ${footerArray
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

export default FooterSitemap;
