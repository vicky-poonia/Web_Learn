import Link from "next/link";
import { useEffect, useState } from "react";
import cookie from "js-cookie";

const SpringSaleFooter = () => {
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

  return (
    <div
      className="bottom-spring bottom-banner"
      style={{ display: bannerStatus ? "block" : "none" }}
    >
      <div className="container">
        <div className="left-block">
          <h2>
            <strong>This Spring,</strong> let your career blossom Whizlabs Spring Sale
          </h2>
          <figure>
            <img className="img-full" src="/images/spring-pan.svg" />
          </figure>
        </div>
        <div className="right-block">
          <div className="flat-box-group">
            <h3>
              <strong>Flat 40% off</strong> on Premium Subscription
              <label>(Get free access to all Hands-On Labs)</label>
            </h3>
            <div className="code-box">
              <label>Use Coupon</label>
              <div className="code">WHIZ40SPRING</div>
              <a href="/pricing" className="btn">
                Enroll Now
              </a>
            </div>
          </div>
          <div className="main-timer">
            <div className="count">
              <div className="colon">
                <div className="daytime2"></div>
                <span>:</span>
              </div>
              <label>days</label>
            </div>
            <div className="count">
              <div className="colon">
                <div className="hourtime2"></div>
                <span>:</span>
              </div>
              <label>hours</label>
            </div>
            <div className="count">
              <div className="colon">
                <div className="minutetime2"></div>
                <span>:</span>
              </div>
              <label>mins</label>
            </div>
            <div className="count">
              <div className="colon">
                <div className="secondtime2"></div>
                <span></span>
              </div>
              <label>sec</label>
            </div>
          </div>
        </div>
      </div>
      <i className="btn-close icon-font-cross" onClick={closeBanner}></i>
    </div>
  );
};

export default SpringSaleFooter;

{
  /*
    <div className="footer-sticky-banner" style={{ display: bannerStatus ? "block" : "none" }}>
      <div className="subscription-banner">
        <div className="container">
          <div className="annual-text">
            <span>Whizlabs</span>Annual subscription
          </div>
          <div className="right-block">
            <ul>
              <li>
                <span>Get Unlimited Access</span> All Courses
              </li>
              <li>
                <span>Get Unlimited Access</span>Hands-on Labs
              </li>
              <li>
                <span>Get 24/7 Instant</span>Premium Support
              </li>
            </ul>
            <div className="price-group">
              <div className="price-block">
                <del className="old-price">US$299</del>
                <div className="price">US$149</div>
              </div>
              <Link href="/pricing">
                <a className="btn-subscribe-now icon-font-arrow-right">
                  subscribe <strong>now</strong>
                </a>
              </Link>
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
    </div>
  */
  /*
    <>
      <div
        className="affordable-monthly-plans bottom-banner"
        style={{ display: bannerStatus ? "block" : "none" }}
      >
        <div className="container">
          <div className="caption">
            <label>Introducing affordable</label>
            <h6>Monthly Subscription Plans</h6>
          </div>
          <div className="plans-group">
            <div className="box one-month">
              <label>One Month Plan</label>
              <div className="price-box">
                <span className="price">$19</span>
                &nbsp;&nbsp;
                <del className="old-price">$69</del>
              </div>
            </div>
            <div className="box three-month">
              <label>Three Months Plan</label>
              <div className="price-box">
                <span className="price">$49</span>
                &nbsp;&nbsp;
                <del className="old-price">$99</del>
              </div>
            </div>
          </div>
          <Link href="/pricing">
            <a className="btn btn-now">
              Subscribe Now
              <img src="/images/btn-right.svg" alt="" />
            </a>
          </Link>
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
  */
}

{
  /* 
      <div className="footer-sticky-banner" style={{ display: bannerStatus ? "block" : "none" }}>
      <div className="subscription-banner" >
        <div className="container">
          <div className="annual-text">
            <span>Whizlabs</span>Annual subscription
          </div>
          <div className="right-block">
            <ul>
              <li>
                <span>Get Unlimited Access</span> All Courses
              </li>
              <li>
                <span>Get Unlimited Access</span>Hands-on Labs
              </li>
              <li>
                <span>Get 24/7 Instant</span>Premium Support
              </li>
            </ul>
            <div className="price-group">
              <div className="price-block">
                <del className="old-price">US$199</del>
                <div className="price">US$99</div>
              </div>
              <Link href="/pricing">
                <a className="btn-subscribe-now icon-font-arrow-right">
                  subscribe <strong>now</strong>
                </a>
              </Link>
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
    </div>
     */
}

{
  /*
  <div
      className="prices-going-banner footer-sticky-banner"
      style={{ display: bannerStatus ? "block" : "none" }}
    >
      <div className="banner-content">
        <div className="container">
          <div className="annual-text">
            PRICES GOING UP<span>for our Premium Subscription</span>
          </div>
          <div className="right-block">
            <div className="current-price-group">
              <div className="box">
                <label>From</label>
                <span className="price">
                  <strong>$99</strong> to <strong>$149</strong>
                </span>
              </div>
              <div className="box">
                <label>
                  Enroll Before <strong>1st November</strong>
                </label>
                <span>
                  <strong>To Grab The Current Price</strong>
                </span>
              </div>
            </div>
            <div className="countdown-gorup">
              <div className="countdow">
                <div className="count">
                  <div className="colon">
                    <div id="day"></div>
                    <span>:</span>
                  </div>
                  <label>days</label>
                </div>
                <div className="count">
                  <div className="colon">
                    <div id="hou"></div>
                    <span>:</span>
                  </div>
                  <label>hours</label>
                </div>
                <div className="count">
                  <div className="colon">
                    <div id="min"></div>
                    <span>:</span>
                  </div>
                  <label>mins</label>
                </div>
                <div className="count">
                  <div className="colon">
                    <div id="sec"></div>
                    <span></span>
                  </div>
                  <label>sec</label>
                </div>
              </div>
              <Link href="/pricing">
                <a className="btn-subscribe-now icon-font-arrow-right">Subscribe Now</a>
              </Link>
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
    </div>
   */
}
