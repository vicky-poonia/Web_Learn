import Image from "next/image";

const HomeCertificationBlock = () => {
  return (
    <div className="certification-block">
      <div className="container">
        <div className="block-heading">
          <h3>
            <span>Succeed in Your Certification Journey With Us</span>
          </h3>
        </div>
        <div
          className="content"
          style={{
            backgroundImage: "url('/images/succeed-certification.webp')",
          }}
        >
          <div className="steps-group">
            <div className="step">
              <div className="step-head">
                <span>01</span>
                <figure>
                  <img className="img-full" src="/images/step-img1.svg" alt="steps" />
                </figure>
              </div>
              <div className="step-title">Find Your Course</div>
              <p>
                Search for your desired certification in our Training Library and select the
                suitable Practice Tests, Videos, and Hands-On Labs.
              </p>
            </div>
            <div className="step step2">
              <div className="step-head">
                <span>02</span>
                <figure>
                  <img className="img-full" src="/images/step-img2.svg" alt="steps" />
                </figure>
              </div>
              <div className="step-title">Start Your Preparation</div>
              <p>
                Learn through our Videos, attempt the Practice Exams to test your preparation, and
                get your practical skills with the Hands-On Labs.
              </p>
            </div>
            <div className="step step3">
              <div className="step-head">
                <span>03</span>
                <figure>
                  <img className="img-full" src="/images/step-img3.svg" alt="steps" />
                </figure>
              </div>
              <div className="step-title">Get Your Certification</div>
              <p>
                Achieve your certification, flaunt your expertise, level up your career, and live
                your dream.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCertificationBlock;
