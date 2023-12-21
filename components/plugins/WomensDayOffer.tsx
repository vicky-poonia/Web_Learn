const WomensDayOffer = () => (
  <div className="women-day-banner">
    <div className="container">
      <div className="img-caption-block">
        <div className="left-block">
          <figure className="women-sharp">
            <img className="img-full" src="/images/women-banner.png" alt="" />
          </figure>
        </div>
        <div className="right-block">
          <h1>
            Celebrate <strong>#WomenInTech</strong> with Whizlabs
          </h1>
          <span className="label">Women’s Day Special Sale</span>
          <div className="code-box-group">
            <div className="code-box">
              <p>
                <strong>Flat 40% off</strong>on All Courses
              </p>
              <small>
                Use Coupon: <strong>WHIZWOMEN40</strong>
              </small>
              <a href="/library" className="btn btn-enroll">
                Enroll Now
              </a>
            </div>
            <div className="code-box">
              <p>
                <strong>Flat 30% off</strong>on Premium Subscription
              </p>
              <small>
                Use Coupon: <strong>WHIZWOMEN30</strong>
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
      </div>
    </div>
  </div>
);

export default WomensDayOffer;
