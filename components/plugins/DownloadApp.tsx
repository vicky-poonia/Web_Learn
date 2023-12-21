import Image from "next/image";

const DownloadApp = () => (
  <>
    {/* <!-- application-block --> */}
    <div className="application-block">
      <div className="container">
        <div className="title"><span>Learn anywhere with&nbsp;</span> Our Mobile App</div>
        <div className="apps-links">
          {/* <a href="#"><img className="img-full" src="images/apple-store-link.svg" alt="" /></a> */}
          <a target="_blank" href="https://play.google.com/store/apps/details?id=learning.app.whizlabs"><img className="img-full" src="images/google-play-badge.png" alt="" /></a>
        </div>
      </div>
    </div>
    {/* <div className="application-block">
      <div className="container">
        <div className="title"> */}
    {/* <span>Learning anywhere with&nbsp;</span> Our Mobile App */}
    {/* </div>
        <div className="apps-links"> */}
    {/* <a target="_blank" href="https://play.google.com/store/apps/details?id=com.app.whizlabs">
            <img width={190} height={55} className="img-full" src="/images/google-play-link.svg" alt="" />
          </a> */}
    {/* <a href="#">
            <img width={190} height={55} className="img-full" src="/images/apple-store-link.svg" alt="" />
          </a> */}
    {/* </div>
      </div>
    </div> */}
  </>
);
export default DownloadApp;
