import Timer from "react-compound-timer";

const ChallengeBanner = ({ challengeType, challengeName, challengeCatName, endDate }) => (
  <>
    <div className="challenge-banner">
      <div className="container">
        <div className="caption-block">
          <p>
            Get ready to test your <strong>{challengeType} cloud skills</strong> and{" "}
            <strong>win exciting prizes</strong> with
          </p>
          <div className="red-box">
            <h1>Whizlabs Challenge League</h1>
            <span>New Cloud Lab Challenges Every Week</span>
          </div>
          <div className="white-box">
            <h6>
              {challengeName} - <strong>{challengeCatName} Challenge</strong>
            </h6>
          </div>
          <a href="/labs/challenge" className="btn btn-take">
            Take challenge
          </a>
          <div className="timer-block">
            <Timer
              initialTime={Math.abs(new Date(endDate).valueOf() - new Date().valueOf())}
              direction="backward"
            >
              <div className="main-timer">
                <div className="count">
                  <div className="colon">
                    <Timer.Days />
                    <span>:</span>
                  </div>
                  <label>days</label>
                </div>
                <div className="count">
                  <div className="colon">
                    <Timer.Hours />
                    <span>:</span>
                  </div>
                  <label>hours</label>
                </div>
                <div className="count">
                  <div className="colon">
                    <Timer.Minutes />
                    <span>:</span>
                  </div>
                  <label>mins</label>
                </div>
                <div className="count">
                  <div className="colon">
                    <Timer.Seconds />
                    <span></span>
                  </div>
                  <label>sec</label>
                </div>
              </div>
            </Timer>
          </div>
        </div>
        <figure className="img-block">
          <img className="img-full" src="/images/challenge-banner-man.webp" alt="" />
        </figure>
      </div>
    </div>
    <style jsx>{`
      .challenge-banner {
        height: 450px;
        background: linear-gradient(0deg, #f4e5ec, #f4e5ec), #f3eee6;
      }
      .challenge-banner .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .challenge-banner .caption-block {
        max-width: 550px;
        width: 100%;
        text-align: center;
        margin: 0 0 0 50px;
      }
      .challenge-banner .caption-block p {
        max-width: 412px;
        width: 100%;
        font-size: 18px;
        line-height: 1.5;
        color: #595959;
        margin-bottom: 12px;
      }
      .challenge-banner .caption-block p strong {
        font-weight: 500;
        color: #000;
      }
      .challenge-banner .caption-block .red-box {
        background: #fc6262;
        border-radius: 12px;
        padding: 20px 15px 40px;
      }
      .challenge-banner .caption-block .red-box h1 {
        font-size: 30px;
        font-weight: 700;
        color: #fff;
        margin-bottom: 2px;
      }
      .challenge-banner .caption-block .red-box span {
        font-size: 16px;
        font-weight: 500;
        color: #fff;
      }
      .challenge-banner .caption-block .white-box {
        max-width: 435px;
        width: 100%;
        border-radius: 10px;
        background: #fff;
        padding: 11px 15px;
        margin: -23px auto 25px;
      }
      .challenge-banner .caption-block .white-box h6 {
        position: relative;
        display: inline-block;
        font-size: 18px;
        font-weight: 400;
        color: #51596a;
        margin: 0;
        padding: 0 0 0 28px;
      }
      .challenge-banner .caption-block .white-box h6:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 21px;
        height: 24px;
        background: url(../images/trophy-yellow.svg) no-repeat center;
        background-size: cover;
      }
      .challenge-banner .caption-block .white-box h6 strong {
        font-weight: 600;
        color: #1f2430;
      }
      .challenge-banner .caption-block .btn-take {
        max-width: 210px;
        width: 100%;
        font-size: 18px;
        height: 45px;
        line-height: 45px;
        font-weight: 600;
        color: #fff;
        background: #2b87e2;
        border-radius: 10px;
        margin-bottom: 18px;
        padding: 0 15px;
      }
      .challenge-banner .caption-block .btn-take:hover {
        color: #fff;
        text-decoration: none;
        background: #2882db;
      }
      .challenge-banner .main-timer {
        justify-content: center;
        background: none;
        padding: 0;
      }
      .challenge-banner .img-block {
        max-width: 530px;
        width: 100%;
        margin: -12px 60px;
      }

      @media (min-width: 1px) and (max-width: 640px) {
        .challenge-banner {
          height: 310px;
        }
        .challenge-banner .container {
          height: 100%;
          justify-content: center;
        }
        .challenge-banner .caption-block {
          max-width: 400px;
          margin: 0;
        }
        .challenge-banner .caption-block p {
          max-width: 340px;
          font-size: 14px;
          margin-bottom: 10px;
        }
        .challenge-banner .caption-block .red-box {
          border-radius: 6px;
          padding: 10px 10px 30px;
        }
        .challenge-banner .caption-block .red-box h1 {
          font-size: 18px;
          font-weight: 600;
        }
        .challenge-banner .caption-block .red-box span {
          font-size: 14px;
        }
        .challenge-banner .caption-block .white-box {
          max-width: 88%;
          border-radius: 6px;
          padding: 9px 12px;
          margin: -23px auto 16px;
        }
        .challenge-banner .caption-block .white-box h6 {
          font-size: 13px;
        }
        .challenge-banner .caption-block .white-box h6:before {
          width: 19px;
          height: 21px;
        }
        .challenge-banner .caption-block .btn-take {
          max-width: 160px;
          font-size: 14px;
          height: 32px;
          line-height: 32px;
          margin-bottom: 12px;
          border-radius: 6px;
        }
        .challenge-banner .main-timer .colon {
          font-size: 24px;
          line-height: 30px;
        }
        .challenge-banner .main-timer .count {
          width: 36px;
          margin: 0 11px 0 0;
        }
        .challenge-banner .main-timer .count label {
          line-height: 12px;
        }
        .challenge-banner .img-block {
          display: none;
        }
      }
      @media (min-width: 480px) and (max-width: 640px) {
      }
      @media (min-width: 1024px) and (max-width: 1239px) {
        .challenge-banner {
          height: 401px;
        }
        .challenge-banner .caption-block {
          margin: 0;
        }
        .challenge-banner .caption-block p {
          margin-bottom: 10px;
        }
        .challenge-banner .caption-block .red-box {
          padding: 15px 15px 35px;
        }
        .challenge-banner .caption-block .red-box h1 {
          font-size: 27px;
        }
        .challenge-banner .caption-block .white-box {
          max-width: 395px;
          padding: 9px 12px;
          margin: -23px auto 20px;
        }
        .challenge-banner .caption-block .white-box h6 {
          font-size: 16px;
        }
        .challenge-banner .caption-block .btn-take {
          max-width: 190px;
          font-size: 16px;
          height: 40px;
          line-height: 40px;
          margin-bottom: 15px;
        }
        .challenge-banner .img-block {
          max-width: 470px;
          margin: 0 0 0 50px;
        }
      }
      @media (min-width: 641px) and (max-width: 767px) {
        .challenge-banner {
          height: 320px;
        }
        .challenge-banner .container {
          height: 100%;
          justify-content: center;
        }
        .challenge-banner .caption-block {
          max-width: 440px;
          margin: 0;
        }
        .challenge-banner .caption-block p {
          max-width: 340px;
          font-size: 14px;
          margin-bottom: 10px;
        }
        .challenge-banner .caption-block .red-box {
          border-radius: 8px;
          padding: 10px 10px 30px;
        }
        .challenge-banner .caption-block .red-box h1 {
          font-size: 20px;
        }
        .challenge-banner .caption-block .red-box span {
          font-size: 14px;
        }
        .challenge-banner .caption-block .white-box {
          max-width: 370px;
          border-radius: 8px;
          padding: 9px 12px;
          margin: -23px auto 18px;
        }
        .challenge-banner .caption-block .white-box h6 {
          font-size: 14px;
        }
        .challenge-banner .caption-block .btn-take {
          max-width: 190px;
          font-size: 14px;
          height: 40px;
          line-height: 40px;
          margin-bottom: 12px;
        }
        .challenge-banner .main-timer .colon {
          font-size: 28px;
          line-height: 32px;
        }
        .challenge-banner .img-block {
          display: none;
        }
      }
      @media (min-width: 768px) and (max-width: 1023px) {
        .challenge-banner {
          height: 340px;
        }
        .challenge-banner .container {
          height: 100%;
        }
        .challenge-banner .caption-block {
          max-width: 460px;
          margin: 0;
        }
        .challenge-banner .caption-block p {
          font-size: 15px;
          margin-bottom: 10px;
        }
        .challenge-banner .caption-block .red-box {
          padding: 12px 12px 32px;
        }
        .challenge-banner .caption-block .red-box h1 {
          font-size: 22px;
        }
        .challenge-banner .caption-block .red-box span {
          font-size: 15px;
        }
        .challenge-banner .caption-block .white-box {
          max-width: 395px;
          padding: 9px 12px;
          margin: -23px auto 18px;
        }
        .challenge-banner .caption-block .white-box h6 {
          font-size: 14px;
        }
        .challenge-banner .caption-block .btn-take {
          max-width: 190px;
          font-size: 14px;
          height: 40px;
          line-height: 40px;
          margin-bottom: 12px;
        }
        .challenge-banner .img-block {
          max-width: 406px;
          margin: 11px 0 0 30px;
          height: 100%;
          display: flex;
          align-items: flex-end;
        }
      }
    `}</style>
  </>
);

export default ChallengeBanner;

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
