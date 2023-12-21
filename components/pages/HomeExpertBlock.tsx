import Image from "next/image";
import Link from "next/link";

const mystyle = {
  border: 'none',
  backgroundColor: '#FF6D00',
  borderRadius: '25px',
  height: '45px',
  width: '200px',
  marginTop: '35px',
  color: 'white'
}
const HomeExpertBlock = () => {
  return (
    <>
    <div style={{marginTop:'20px'}}>
      <img src="/images/homeborder.webp" width="100%"  alt="whizlabs"/>
    </div>
    <div className="expert-support-group">
      <div className="container">
        <div className="block">
          <div className="caption">
            <h4>WHIZLABS GUIDED HANDS-ON LABS</h4>
            <p style={{ textAlign: "left" }}>
              Learn by yourself in <br /> the technical  <br /> Playground
            </p>
            <a href={process.env.NEXT_PUBLIC_PLAY_URL}>
              <button style={mystyle}><b>Learn by Doing</b></button>
            </a>
          </div>
          <figure className="img-block">
            <img className="img-full" src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}whizlabs-labs.webp`} alt="guided hands on labs for technology learning aws azure google cloud" />
          </figure>
        </div>
        <div className="block">
          <div className="caption">
            <span className="blue"></span>
            <h4>WHIZLABS SANDBOX</h4>
            <p style={{ textAlign: "left" }}>
              Login to Console <br /> and Experiment with your <br /> own Ideas
            </p>

            <a href={`${process.env.NEXT_PUBLIC_PLAY_URL}/sandbox`}>
              <button style={mystyle}><b>Get Access</b></button>
              </a>
          </div>
          <figure className="img-block">
            <img className="img-full" src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}whizlabs-sandbox.webp`} alt="practice cloud skills by logging into console directly with sandbox" />
          </figure>
        </div>
        <div className="block">
          <div className="caption">
            <span></span>
            <h4>WHIZLABS EXAM SIMULATOR</h4>
            <p style={{ textAlign: "left" }}>
              Get ready to test your <br /> skill gaps
            </p>
            <a href="/practice-exam-simulator"><button style={mystyle}><b>Test Your Skills</b></button></a>
          </div>
          <figure className="img-block">
            <img className="img-full" src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}whizlabs-exam-simulator.webp`} alt="mock tests in our exam simulator helps testing your skill gaps " />
          </figure>
        </div>
        <div className="block">
          <div className="caption">
            <span className="blue"></span>
            <h4>WHIZLABS VIDEO COURSES</h4>
            <p style={{ textAlign: "left" }}>
              Deep dive into the <br /> latest tech skills
            </p>
            <a href="/self-study-video-courses">
              <button style={mystyle}><b>Get Started</b></button>
            </a>

          </div>
          <figure className="img-block">
            <img className="img-full" src={`${process.env.NEXT_PUBLIC_WEB_MEDIA_URL}whizlabs-video-course.webp`} alt="it certification training videos created by technology experts" />
          </figure>
        </div>
      </div>
    </div>
    </>
  );
};

export default HomeExpertBlock;
