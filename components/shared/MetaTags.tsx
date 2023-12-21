import Head from "next/head";
const MetaTag = ({ data }) => {
  return (
    <>
      <title>{`${data?.title}`}</title>
      <meta name="keywords" content={`${data?.keywords}`} />
      <meta name="description" content={`${data?.description}`} />
      <meta property="og:type" content={`${data?.og_type}`} />
      <meta name="og:title" property="og:title" content={`${data?.og_title}`} />
      <meta name="og:description" property="og:description" content={`${data?.og_description}`} />
      <meta property="og:site_name" content={`${data?.og_site_name}`} />
      <meta property="og:url" content={`${data?.og_url}`} />
      <meta property="og:image" content={`${data?.og_image}`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={`${data?.twitter_title}`} />
      <meta name="twitter:description" content={`${data?.twitter_description}`} />
      <meta name="twitter:site" content={`${data?.twitter_site_name}`} />
      <meta name="twitter:image" content={`${data?.twitter_image}`} />
    </>
  );
};
export default MetaTag;
