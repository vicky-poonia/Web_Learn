import { useState, useEffect } from "react";
import cookie from "js-cookie";

const BlackfridayFooter = ({ banner }) => {
  const [width, setwidth] = useState(0);
  const [bannerstatus, setbannerStatus] = useState(true);
  useEffect(() => {
    if (window) {
      setwidth(window.innerWidth);
    }
    const handleResize = () => {
      setwidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  const clickHandle = (type) => {
    switch (type) {
      case "h":
        //0 new tab 1 same tab
        if (banner.clicks.headerOnclick == "0") {
          window.open(`${banner?.clicks.footer}`);
        } else {
          window.open(`${banner?.clicks.footer}`, "_self");
        }
        break;
      case "m":
        //0 new tab 1 same tab
        if (banner.clicks.footeronClick == "0") {
          window.open(`${banner?.clicks.footer}`);
        } else {
          window.open(`${banner?.clicks.footer}`, "_self");
        }
        break;
    }
  };

  return (
    <>
      {width > 640 && (
        <div
          className="exclusive-banner"
          style={
            bannerstatus
              ? { display: "block", cursor: "pointer", background: `${banner?.gradient}` }
              : { display: "none" }
          }
        >
          <div className="container">
            <img
              className="img-full"
              src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}banners/${banner?.desktopFooterImg}`}
              alt="footer banner"
              onClick={(e) => {
                e.preventDefault();
                clickHandle("h");
              }}
            />
          </div>
          <i
            className="btn-close icon-font-cross"
            onClick={(e) => {
              e.preventDefault();
              setbannerStatus(false);
              cookie.set("subs_bottom_banner", "active", { expires: 3 });
            }}
          ></i>
        </div>
      )}
      {width <= 640 && (
        <div
          className="exclusive-banner bf-footer"
          style={
            bannerstatus
              ? { display: "block", cursor: "pointer", background: `${banner?.gradient}` }
              : { display: "none" }
          }
        >
          <div className="container">
            <img
              className="img-full"
              src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}banners/${banner?.mobileFooter}`}
              alt="mobile footer"
              onClick={(e) => {
                e.preventDefault();
                clickHandle("m");
              }}
            />
          </div>
          <i
            className="btn-close icon-font-cross"
            onClick={(e) => {
              e.preventDefault();
              setbannerStatus(false);
              cookie.set("subs_bottom_banner", "active", { expires: 3 });
            }}
          ></i>
        </div>
      )}
    </>
  );
};

export default BlackfridayFooter;
