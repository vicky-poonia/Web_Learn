import Link from "next/link";
import Image from "next/image";
import bf_offer from "../black-friday-offers";

const ValentineOfferBanner = () => (
  <div className="valentine-banner">
    <figure className="left-sharp">
      <img className="img-full" src="/images/left-valentine.png" alt="" />
    </figure>
    <figure className="right-sharp">
      <img className="img-full" src="/images/right-valentine.png" alt="" />
    </figure>
    <div className="container">
      <div className="text-block">
        <div className="code-caption">
          <p>
            <strong>Flat 40% Off</strong>On All Courses
          </p>
          <small>
            Use Coupon: <strong>whiz40vd</strong>
          </small>
          <a href="/library" className="btn btn-enroll">
            Enroll Now
          </a>
        </div>
        <figure className="valentine-txt">
          <img className="img-full" src="/images/valentine-txt.svg" alt="" />
        </figure>
        <div className="code-caption">
          <p>
            <strong>Flat 30% Off</strong>On Premium Subscription
          </p>
          <small>
            Use Coupon: <strong>whiz30vd</strong>
          </small>
          <a href="/pricing" className="btn btn-enroll">
            Subscribe Now
          </a>
        </div>
      </div>
      <div className="timer-block">
        <div className="main-timer">
          <div className="count">
            <div className="colon">
              <div id="daytime2" className="daytime2"></div>
              <span>:</span>
            </div>
            <label>days</label>
          </div>
          <div className="count">
            <div className="colon">
              <div id="hourtime2" className="hourtime2"></div>
              <span>:</span>
            </div>
            <label>hours</label>
          </div>
          <div className="count">
            <div className="colon">
              <div id="minutetime2" className="minutetime2"></div>
              <span>:</span>
            </div>
            <label>mins</label>
          </div>
          <div className="count">
            <div className="colon">
              <div id="secondtime2" className="secondtime2"></div>
              <span></span>
            </div>
            <label>sec</label>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ValentineOfferBanner;

/* 
  <div className="banner-block">
    <div className="banner">
      <div className="container">
        <div className="caption">
          <h1>World-Class Online Certification Training Courses & Practice Tests</h1>
          <div className="sub-title">Take the first step to transform your career with the help of our affordable and premium quality training material</div>
          <Link href="/library/">
            <a className="btn start-now">Get Started Now</a>
          </Link>
        </div>
        <figure className="img-block">
          <img className="img-full" src="/images/banner-home-man.png" alt="" />
          </figure>
          <div className="shape">
            <img className="img-full" src="/images/banner-shape.svg" alt="banner" />
          </div>
        </div>
      </div>
    </div>
*/
