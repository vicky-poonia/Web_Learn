import Link from "next/link";
import { useEffect, useState } from "react";
import cookie from "js-cookie";

const PPCbanner = () => {
  const [bannerStatus, setBannerStatus] = useState(true);

  useEffect(() => {
    let isMounted = true;
    return () => {
      isMounted = false;
    };
  }, []);

  const closeBanner = () => {
    setBannerStatus(false);
    cookie.set("subs_bottom_banner", "active", { expires: 3 });
  };

  return <>
        <div className="exclusive-banner" style={{ display: bannerStatus ? "block" : "none" }}>
      <div className="container">
        <div className="left-block">
          <div className="annual-text" style={{fontSize:"18px"}}>
            <span>EXCLUSIVE OFFER </span>Flat 20% off SITWEIDE
          </div>
        </div>
        <div className="right-block">
          <div className="plan-group">
            <div className="box">
              <p>Practice Tests + Video Courses + Hands-On Labs</p>
            </div>
            <div className="line"></div>
          </div>
          <div className="coupon-group">
            <div className="countdow">
              <div className="count">
                <div className="colon">
                  <div id="ppcday"></div>
                  <span>:</span>
                </div>
                <label>days</label>
              </div>
              <div className="count">
                <div className="colon">
                  <div id="ppchou"></div>
                  <span>:</span>
                </div>
                <label>hours</label>
              </div>
              <div className="count">
                <div className="colon">
                  <div id="ppcmin"></div>
                  <span>:</span>
                </div>
                <label>mins</label>
              </div>
              <div className="count">
                <div className="colon">
                  <div id="ppcsec"></div>
                  <span></span>
                </div>
                <label>sec</label>
              </div>
            </div>
            <div className="coupon">
              <div className="group">
                <small>Use Coupon:</small>
                <div className="code">WHIZ20SITE</div>
              </div>
              <a href="/training/library" className="btn btn-now">
                Enroll Now
                <img src="/images/btn-right.svg" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <i
        className="btn-close icon-font-cross"
        onClick={(e) => {
          e.preventDefault();
          closeBanner();
        }}
      ></i>
    </div>
  </>


};

export default PPCbanner;