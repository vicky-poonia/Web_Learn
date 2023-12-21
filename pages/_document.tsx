import Document, { Html, Head, Main, NextScript } from "next/document";


const TEST_PATH = "whizlabs.com";
export default class BaseDoc extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <script async src={`https://www.googletagmanager.com/gtag/js?id=GTM-PV9429C`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GTM-PV9429C}', {
              page_path: window.location.pathname,
            });`,
            }}
          /> */}
          <script src="/js/check-browser.js" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/favicons/apple-touch-icon.png?v=3"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/favicons/favicon-32x32.png?v=3"
          />

          <link rel="manifest" href="/images/favicons/site.webmanifest" />
          <link rel="mask-icon" href="/images/favicons/safari-pinned-tab.svg" color="#e05613" />

          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#e05613" />

          <link href="/css/style.css" rel="stylesheet" />
          <link href="/css/responsive.css" rel="stylesheet" />
          <link href="/css/owl.carousel.css" rel="stylesheet" />
          <link href="/css/owl.theme.default.css" rel="stylesheet" />
          <link href="/fonts/generated-fonts/stylesheet.css" rel="stylesheet" />
          <link href="/fonts/styles.css" rel="stylesheet" />
          <link href="/css/slick.css" rel="stylesheet" />
          <link href="/css/slick-theme.css" rel="stylesheet" />
          <link href="/css/chosen.css" rel="stylesheet" />
          <link href="/css/tokenfield.css" rel="stylesheet" />
          <link href="/custom/custom.css" rel="stylesheet" />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
            rel="stylesheet"
          />
          {/* <link href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" rel="stylesheet" />; */}
          <link
            href="https://fonts.googleapis.com/css?family=Bebas+Neue:400|Montserrat:400,500,600"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="CUSTOM_SCRIPTS">
            <script
              defer
              type="text/javascript"
              src="https://code.jquery.com/jquery-3.6.1.min.js"
            ></script>
            {/* <script defer type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.js"></script> */}
            <script
              defer
              type="text/javascript"
              src="https://code.jquery.com/jquery-migrate-3.4.0.js"
            ></script>
            <script defer type="text/javascript" src="/js/jquery-ui.js"></script>
            <script defer type="text/javascript" src="/js/chosen.jquery.js"></script>
            <script defer type="text/javascript" src="/js/tokenfield.js"></script>
            {/* <script defer type="text/javascript" src="/js/slick.js"></script> */}
            <script defer type="text/javascript" src="/js/stickySidebar.js"></script>
            <script defer type="text/javascript" src="/js/owl.carousel.js"></script>
            <script defer type="text/javascript" src="/js/easyResponsiveTabs.js"></script>
            <script defer type="text/javascript" src="/custom/header.js"></script>
            <script defer type="text/javascript" src="/custom/custom.js"></script>
            {/* <script defer src="https://www.google.com/recaptcha/api.js"></script> */}
            <script
              defer
              src="https://cdn.mouseflow.com/projects/e7d46f41-b290-4fa4-9a60-1ca5f62e8330.js"
            ></script>
          </div>
        </body>
      </Html>
    );
  }
}
