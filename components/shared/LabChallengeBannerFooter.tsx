import Link from "next/link";
import { useEffect, useState } from "react";
import cookie from "js-cookie";

const LabChallengeBannerFooter = () => {
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
    <>
      <div
        className="bottom-challenge bottom-banner"
        style={{ display: bannerStatus ? "block" : "none" }}
      >
        <div className="container">
          <div className="left-block">
            <div className="first-sharp">
              <span>
                Whizlabs <strong>Challenge League</strong>
              </span>
            </div>
            <div className="sharp sec-sharp">
              <span>
                09 <strong>Weeks</strong>
              </span>
            </div>
            <div className="sharp third-sharp">
              <span>
                09 <strong>Lab Challenges</strong>
              </span>
            </div>
          </div>
          <div className="right-block">
            <div className="exciting-block">
              <h5>Exciting Prizes</h5>
              <span>
                Path Based Routing -<strong>AWS ELB Challenge</strong>
              </span>
            </div>
            <div className="btn-block">
              <span>Are you ready?</span>
              <a href="/labs/challenge" className="btn btn-yes">
                Yes, I'll participate
              </a>
            </div>
          </div>
        </div>
        <i className="btn-close icon-font-cross" onClick={closeBanner}></i>
      </div>
      <style jsx>{`
        .bottom-challenge {
          position: fixed;
          width: 100%;
          height: 90px;
          bottom: 0;
          background: #f4e5ec;
          z-index: 99;
        }
        .bottom-challenge .container {
          display: flex;
          height: 100%;
        }
        .bottom-challenge .left-block {
          position: relative;
          display: flex;
          align-items: center;
          margin: 0;
        }
        .bottom-challenge .left-block:before {
          content: "";
          position: absolute;
          top: 0;
          right: calc(100% - 0px);
          width: 100%;
          height: 100%;
          background: #f46262;
        }
        .bottom-challenge .left-block .first-sharp {
          position: relative;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          background: #fc6262;
          padding: 0 12px 0 0;
        }
        .bottom-challenge .left-block .first-sharp:after {
          content: "";
          position: absolute;
          left: 100%;
          top: 0;
          width: 40px;
          height: 100%;
          background: url("../images/league-1.png") no-repeat center;
          background-size: cover;
          z-index: 2;
        }
        .bottom-challenge .left-block .first-sharp span {
          font-size: 24px;
          line-height: 32px;
          font-weight: 500;
        }
        .bottom-challenge .left-block .first-sharp span strong {
          display: block;
          font-weight: 700;
          color: #fff;
        }
        .bottom-challenge .left-block .sharp {
          position: relative;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          background: #f99396;
          padding: 0 35px 0 52px;
        }
        .bottom-challenge .left-block .sharp:after {
          content: "";
          position: absolute;
          left: 100%;
          top: 0;
          width: 40px;
          height: 100%;
          background: url("../images/league-2.png") no-repeat center;
          background-size: cover;
          z-index: 2;
        }
        .bottom-challenge .left-block .sharp span {
          font-size: 26px;
          font-weight: 700;
          color: #000;
        }
        .bottom-challenge .left-block .sharp span strong {
          display: block;
          font-size: 16px;
          font-weight: 400;
          color: #1f2430;
        }
        .bottom-challenge .left-block .third-sharp {
          background: #f6c4ca;
          padding: 0 0 0 55px;
          min-width: 180px;
        }
        .bottom-challenge .left-block .third-sharp.sharp:after {
          opacity: 0.5;
        }
        .bottom-challenge .right-block {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 0 0 0 70px;
        }
        .bottom-challenge .right-block .exciting-block {
          margin: 0 44px 0 0;
        }
        .bottom-challenge .right-block .exciting-block h5 {
          position: relative;
          font-size: 26px;
          font-weight: 700;
          color: #000;
          margin: 0;
          padding: 0 0 0 28px;
        }
        .bottom-challenge .right-block .exciting-block h5:before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translate(0, -50%);
          width: 21px;
          height: 24px;
          background: url("../images/trophy-yellow.svg") no-repeat center;
          background-size: cover;
        }
        .bottom-challenge .right-block .exciting-block span {
          font-size: 16px;
          font-weight: 400;
          color: #4b535e;
        }
        .bottom-challenge .right-block .exciting-block span strong {
          font-weight: 600;
          color: #dd2424;
        }
        .bottom-challenge .right-block .btn-block {
          display: flex;
          align-items: center;
        }
        .bottom-challenge .right-block .btn-block span {
          font-size: 18px;
          font-weight: 500;
          color: #1f2430;
          margin: 0 10px 0 0;
        }
        .bottom-challenge .right-block .btn-block .btn-yes {
          font-size: 16px;
          height: 40px;
          line-height: 40px;
          font-weight: 600;
          white-space: nowrap;
          background: #2b87e2;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
          border-radius: 100px;
          margin: 0;
        }
        .bottom-challenge .right-block .btn-block .btn-yes:hover {
          color: #fff;
          text-decoration: none;
          background: #2882db;
        }
        .bottom-challenge .btn-close {
          width: 22px;
          height: 22px;
          background: #f9f9f9;
          position: absolute;
          color: #000;
          font-size: 10px;
          top: 0;
          right: 0;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0px 0px 0px 5px;
        }
        .bottom-challenge .btn-close:hover {
          background: #1f2430;
          color: #fff;
        }
        @media (min-width: 1px) and (max-width: 640px) {
          .bottom-challenge {
            height: auto;
          }
          .bottom-challenge .container {
            flex-wrap: wrap;
            justify-content: center;
          }
          .bottom-challenge .left-block {
            justify-content: center;
            flex-wrap: wrap;
          }
          .bottom-challenge .left-block:before {
            height: 50px;
          }
          .bottom-challenge .left-block .first-sharp {
            height: auto;
            text-align: center;
            flex-wrap: wrap;
            background: #fc6262;
            width: 100%;
            padding: 3px 0;
            margin: 0 0 2px 0;
          }
          .bottom-challenge .left-block .first-sharp span {
            font-size: 18px;
            line-height: 22px;
          }
          .bottom-challenge .left-block .sharp {
            height: auto;
            padding: 4px 10px 4px 30px;
            margin: 0;
          }
          .bottom-challenge .left-block .sharp:after {
            width: 30px;
          }
          .bottom-challenge .left-block .sharp.third-sharp {
            padding: 4px 0 4px 40px;
          }
          .bottom-challenge .left-block .sharp span {
            font-size: 18px;
          }
          .bottom-challenge .left-block .sharp span strong {
            font-size: 14px;
          }
          .bottom-challenge .right-block {
            max-width: 620px;
            width: 100%;
            flex-wrap: wrap;
            margin: 0;
            padding: 5px 0;
            justify-content: center;
          }
          .bottom-challenge .right-block .exciting-block {
            text-align: center;
            margin: 0 10px;
          }
          .bottom-challenge .right-block .exciting-block h5 {
            display: inline-block;
            font-size: 18px;
            padding: 0 0 0 26px;
            margin: 0 0 3px 0;
          }
          .bottom-challenge .right-block .exciting-block h5:before {
            width: 19px;
            height: 22px;
          }
          .bottom-challenge .right-block .exciting-block span {
            display: block;
            font-size: 14px;
            margin: 0 0 3px 0;
          }
          .bottom-challenge .right-block .btn-block .btn-yes {
            height: 30px;
            line-height: 30px;
            font-size: 13px;
            padding: 0 15px;
          }
        }
        @media (min-width: 480px) and (max-width: 640px) {
          .bottom-challenge .left-block {
            flex-wrap: inherit;
          }
          .bottom-challenge .left-block:before {
            height: 100%;
          }
          .bottom-challenge .left-block .first-sharp {
            height: 100%;
            text-align: left;
            flex-wrap: inherit;
            width: auto;
            margin-bottom: 0;
          }
          .bottom-challenge .left-block .sharp {
            padding: 4px 10px 4px 50px;
          }
        }
        @media (min-width: 1024px) and (max-width: 1239px) {
          .bottom-challenge .left-block .first-sharp span {
            font-size: 22px;
            line-height: 26px;
          }
          .bottom-challenge .left-block .sharp {
            padding: 0 20px 0 50px;
          }
          .bottom-challenge .left-block .sharp span {
            font-size: 22px;
          }
          .bottom-challenge .left-block .sharp span strong {
            font-size: 15px;
          }
          .bottom-challenge .left-block .sharp {
            padding: 0 10px 0 50px;
          }
          .bottom-challenge .right-block .exciting-block {
            margin: 0 15px 0 0;
          }
          .bottom-challenge .right-block .exciting-block h5 {
            font-size: 24px;
          }
          .bottom-challenge .right-block .exciting-block span {
            font-size: 14px;
          }
          .bottom-challenge .right-block .btn-block .btn-yes {
            font-size: 14px;
          }
        }
        @media (min-width: 641px) and (max-width: 767px) {
          .bottom-challenge {
            height: auto;
          }
          .bottom-challenge .container {
            flex-wrap: wrap;
            justify-content: center;
          }
          .bottom-challenge .left-block .first-sharp span {
            font-size: 19px;
            line-height: 22px;
          }
          .bottom-challenge .left-block .sharp {
            padding: 4px 10px 4px 50px;
          }
          .bottom-challenge .left-block .sharp span {
            font-size: 18px;
          }
          .bottom-challenge .left-block .sharp span strong {
            font-size: 14px;
          }
          .bottom-challenge .right-block {
            max-width: 620px;
            width: 100%;
            margin: 0;
            padding: 4px 0;
          }
          .bottom-challenge .right-block .exciting-block {
            margin: 0 22px 0 0;
          }
          .bottom-challenge .right-block .exciting-block h5 {
            font-size: 18px;
            padding: 0 0 0 26px;
          }
          .bottom-challenge .right-block .exciting-block h5:before {
            width: 19px;
            height: 22px;
          }
          .bottom-challenge .right-block .exciting-block span {
            font-size: 14px;
          }
          .bottom-challenge .right-block .btn-block .btn-yes {
            height: 30px;
            line-height: 30px;
            font-size: 13px;
            padding: 0 15px;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .bottom-challenge {
            height: auto;
          }
          .bottom-challenge .container {
            flex-wrap: wrap;
            justify-content: center;
          }
          .bottom-challenge .left-block .first-sharp span {
            font-size: 20px;
            line-height: 24px;
          }
          .bottom-challenge .left-block .sharp {
            padding: 5px 10px 5px 50px;
          }
          .bottom-challenge .left-block .sharp span {
            font-size: 20px;
          }
          .bottom-challenge .left-block .sharp span strong {
            font-size: 14px;
          }
          .bottom-challenge .right-block {
            max-width: 620px;
            width: 100%;
            margin: 0;
            padding: 5px 0;
          }
          .bottom-challenge .right-block .exciting-block {
            margin: 0 22px 0 0;
          }
          .bottom-challenge .right-block .exciting-block h5 {
            font-size: 20px;
            padding: 0 0 0 26px;
          }
          .bottom-challenge .right-block .exciting-block h5:before {
            width: 19px;
            height: 22px;
          }
          .bottom-challenge .right-block .exciting-block span {
            font-size: 14px;
          }
          .bottom-challenge .right-block .btn-block .btn-yes {
            height: 35px;
            line-height: 35px;
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
};

export default LabChallengeBannerFooter;
