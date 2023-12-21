import Link from "next/link";
import Image from "next/image";
import React from "react";

const FootLess = ({ data, slackData, containerSmall = false }) => {
  return (
    <footer className="ft-footer" style={{marginBottom:"0px",background: "#F5F7FB"  }}>
      <div className={containerSmall ? "container-small" : "container"}>
        <div className="footer-content" >
          <div className="footer-left">
            <a className="logo" href="index.html">
              <img className="img-full" src="/images/logo.svg" alt="Whizlabs Logo" />
            </a>

            {/* <p>© {new Date().getFullYear()},Whizlabs Software Pvt. Ltd.</p>
            <div className="social-links">
              <a className="link icon-font-facebook"   href="https://www.facebook.com/whizlabs.software/" target="_blank"></a>
              <a className="link icon-font-tweeter"   href="https://twitter.com/whizlabs/" target="_blank"></a>
              <a className="link icon-font-linkedin"   href="https://www.linkedin.com/company/whizlabs-software/" target="_blank"></a>
            </div> */}
          </div>
          <div style={{margin:"0px"}}>
          <p style={{margin:"0px"}}>© {new Date().getFullYear()}, Whizlabs Software Pvt. Ltd. All rights reserved.</p>
          </div>
           <div className="footer-right">
           <div className="footer-copyright" style={{padding:"0px",border:"none"}}>
              <div className="social-icon">
                <a
                  className="icon"
                  target="_blank"
                  href="https://www.facebook.com/whizlabs.software/"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 11.993 2.92547 15.3027 6.75 15.9028V10.3125H4.71875V8H6.75V6.2375C6.75 4.2325 7.94438 3.125 9.77172 3.125C10.6467 3.125 11.5625 3.28125 11.5625 3.28125V5.25H10.5538C9.56 5.25 9.25 5.86672 9.25 6.5V8H11.4688L11.1141 10.3125H9.25V15.9028C13.0745 15.3027 16 11.993 16 8Z"
                      fill="#2D3B4D"
                    ></path>
                  </svg>
                </a>
                <a className="icon" target="_blank" href="https://twitter.com/whizlabs/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    zoomAndPan="magnify"
                    viewBox="0 0 375 374.9999"
                    preserveAspectRatio="xMidYMid meet"
                    version="1.0"
                    fill="#2D3B4D"
                  >
                    <defs>
                      <path
                        d="M 7.09375 7.09375 L 367.84375 7.09375 L 367.84375 367.84375 L 7.09375 367.84375 Z M 7.09375 7.09375 "
                        fill="#2D3B4D"
                      ></path>
                    </defs>
                    <g>
                      <path
                        d="M 187.46875 7.09375 C 87.851562 7.09375 7.09375 87.851562 7.09375 187.46875 C 7.09375 287.085938 87.851562 367.84375 187.46875 367.84375 C 287.085938 367.84375 367.84375 287.085938 367.84375 187.46875 C 367.84375 87.851562 287.085938 7.09375 187.46875 7.09375 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                        fill="#2D3B4D"
                      ></path>
                    </g>
                    <g transform="translate(85, 75)">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        version="1.1"
                        height="215"
                        width="215"
                      >
                        <path
                          d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                          fill="#ffffff"
                        ></path>
                      </svg>
                    </g>
                  </svg>
                </a>
                <a
                  className="icon"
                  target="_blank"
                  href="https://www.linkedin.com/company/whizlabs-software/"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M14.8156 0H1.18125C0.528125 0 0 0.515625 0 1.15313V14.8438C0 15.4813 0.528125 16 1.18125 16H14.8156C15.4688 16 16 15.4813 16 14.8469V1.15313C16 0.515625 15.4688 0 14.8156 0ZM4.74687 13.6344H2.37188V5.99687H4.74687V13.6344ZM3.55938 4.95625C2.79688 4.95625 2.18125 4.34062 2.18125 3.58125C2.18125 2.82188 2.79688 2.20625 3.55938 2.20625C4.31875 2.20625 4.93437 2.82188 4.93437 3.58125C4.93437 4.3375 4.31875 4.95625 3.55938 4.95625ZM13.6344 13.6344H11.2625V9.92188C11.2625 9.0375 11.2469 7.89687 10.0281 7.89687C8.79375 7.89687 8.60625 8.8625 8.60625 9.85938V13.6344H6.2375V5.99687H8.5125V7.04063H8.54375C8.85938 6.44063 9.63438 5.80625 10.7875 5.80625C13.1906 5.80625 13.6344 7.3875 13.6344 9.44375V13.6344Z"
                      fill="#2D3B4D"
                    ></path>
                  </svg>
                </a>
                <a
                  className="icon"
                  target="_blank"
                  href="https://www.youtube.com/c/WhizlabsSoftware/videos"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="12"
                    viewBox="0 0 16 12"
                    fill="none"
                  >
                    <path
                      d="M15.8406 2.79922C15.8406 2.79922 15.6844 1.69609 15.2031 1.21172C14.5938 0.574219 13.9125 0.571094 13.6 0.533594C11.3625 0.371094 8.00313 0.371094 8.00313 0.371094H7.99687C7.99687 0.371094 4.6375 0.371094 2.4 0.533594C2.0875 0.571094 1.40625 0.574219 0.796875 1.21172C0.315625 1.69609 0.1625 2.79922 0.1625 2.79922C0.1625 2.79922 0 4.09609 0 5.38984V6.60234C0 7.89609 0.159375 9.19297 0.159375 9.19297C0.159375 9.19297 0.315625 10.2961 0.79375 10.7805C1.40313 11.418 2.20313 11.3961 2.55938 11.4648C3.84063 11.5867 8 11.6242 8 11.6242C8 11.6242 11.3625 11.618 13.6 11.4586C13.9125 11.4211 14.5938 11.418 15.2031 10.7805C15.6844 10.2961 15.8406 9.19297 15.8406 9.19297C15.8406 9.19297 16 7.89922 16 6.60234V5.38984C16 4.09609 15.8406 2.79922 15.8406 2.79922ZM6.34688 8.07422V3.57734L10.6687 5.83359L6.34688 8.07422Z"
                      fill="#2D3B4D"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </footer>
  );
};

export default FootLess;
