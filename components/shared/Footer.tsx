import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";


const Footer = ({ data, pathName, slackData, bannerActive,user_type}) => {
  const [finalDatas, setFinalDatas] = useState([]);
  const [footerBottomMargin, setFooterBottomMargin] = useState("0em");
  let url = process.env.NEXT_PUBLIC_BASE_PATH;
  const router = useRouter();

  useEffect(() => {
    let array = [];
    if (data && data.length > 0) {
      data?.map((x) => {
        switch (x.id) {
          case 8: // Categories
            array[0] = x;
            break;
          case 7: // Popular Courses
            array[1] = x;
            break;
          case 1: // Teaching & COmpany
            array[2] = x;
            break;
          case 5: // Legal
            array[3] = x;
            break;
          case 2: // Support
            array[4] = x;
            break;
          default:
        }
      });
      setFinalDatas(array);
    }
  }, []);

  useEffect(() => {
    if (bannerActive) setFooterBottomMargin("9em");
    else setFooterBottomMargin("0em");
  }, [bannerActive]);
  
  return (
    <footer>
      {!pathName.includes("/careers/[career]") && !pathName.includes("/careers/apply") ? (
        <>
          <div className="container">
            <div className="footer-new">
              <a href="#" className="logo-footer">
                <img className="img-full" src="/images/logo.svg" alt="Whizlabs Logo" />
              </a>
              <ul className="nav-footer" style={{listStyle:"none"}}>
                <li>
                  <a href={process.env.NEXT_PUBLIC_PLAY_URL} target="_blank">
                    Hands-on Labs
                  </a>
                </li>
                <li>
                  <a href={`${process.env.NEXT_PUBLIC_PLAY_URL}/sandbox`} target="_blank">
                    Sandbox
                  </a>
                </li>
                {user_type != "amazon" && (
                  <>
                    <li  onClick={() => {
                          router.push("/pricing");
                        }}
                        style={{cursor:"pointer"}}
                        >
                      <a >Pricing</a>
                    </li>
                  </>
                )}
                <li>
                  <a href={process.env.NEXT_PUBLIC_BUSINESS_URL} target="_blank">
                    For Business
                  </a>
                </li>

                <li>
                  <a href="/library" target="_blank">
                    Library
                  </a>
                </li>
                {/* <li>
							<Link href="/contact-us">Contact Us</Link>
						</li> */}
              </ul>
            </div>

            <div className="footer-top">
              {finalDatas.map((item, index) => (
                <React.Fragment key={index}>
                  {item.id == 1 || item.id == 2 || item.id == 5 || item.id == 7 || item.id == 8 ? (
                    <div className="block">
                      <div className="title">{item.heading}</div>
                      <ul>
                        {item.children.map((result, idx) => (
                          <li key={index + idx}>
                            <Link href={result.slug}>
                              <a rel="noopener" target={result.is_new_tab ? "_blank" : ""}>
                                {result.title}
                              </a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="app-block">
              <div className="left-app">
                <span>Need help? Please</span>
                <a className="icon-wp" target="_blank" href="//wa.me/916364678444">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11 21.3125C16.3157 21.3125 20.625 17.0032 20.625 11.6875C20.625 6.37176 16.3157 2.0625 11 2.0625C5.68426 2.0625 1.375 6.37176 1.375 11.6875C1.375 13.4137 1.82944 15.0338 2.6252 16.4347L1.375 21.3125L6.40397 20.1464C7.7697 20.89 9.33551 21.3125 11 21.3125ZM11 19.8317C15.4979 19.8317 19.1442 16.1854 19.1442 11.6875C19.1442 7.18957 15.4979 3.54327 11 3.54327C6.50207 3.54327 2.85577 7.18957 2.85577 11.6875C2.85577 13.4242 3.39935 15.0339 4.32564 16.3558L3.59615 19.0913L6.37995 18.3954C7.69269 19.3013 9.28439 19.8317 11 19.8317Z"
                      fill="#BFC8D0"
                    ></path>
                    <path
                      d="M19.25 11C19.25 15.5563 15.5563 19.25 11 19.25C9.26211 19.25 7.64973 18.7126 6.31995 17.795L3.5 18.5L4.23896 15.7289C3.30064 14.3898 2.75 12.7592 2.75 11C2.75 6.44365 6.44365 2.75 11 2.75C15.5563 2.75 19.25 6.44365 19.25 11Z"
                      fill="url(#paint0_linear_3504_387)"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11 20.625C16.3157 20.625 20.625 16.3157 20.625 11C20.625 5.68426 16.3157 1.375 11 1.375C5.68426 1.375 1.375 5.68426 1.375 11C1.375 12.7262 1.82944 14.3463 2.6252 15.7472L1.375 20.625L6.40397 19.4589C7.7697 20.2025 9.33551 20.625 11 20.625ZM11 19.1442C15.4979 19.1442 19.1442 15.4979 19.1442 11C19.1442 6.50207 15.4979 2.85577 11 2.85577C6.50207 2.85577 2.85577 6.50207 2.85577 11C2.85577 12.7367 3.39935 14.3464 4.32564 15.6683L3.59615 18.4038L6.37995 17.7079C7.69269 18.6138 9.28439 19.1442 11 19.1442Z"
                      fill="white"
                    ></path>
                    <path
                      d="M8.59377 6.5312C8.36492 6.07156 8.01386 6.11225 7.65921 6.11225C7.0254 6.11225 6.03711 6.87144 6.03711 8.28437C6.03711 9.44235 6.54737 10.7099 8.26679 12.6061C9.92615 14.4361 12.1065 15.3827 13.9165 15.3505C15.7266 15.3183 16.099 13.7606 16.099 13.2346C16.099 13.0015 15.9543 12.8851 15.8546 12.8535C15.2378 12.5575 14.1002 12.0059 13.8413 11.9023C13.5825 11.7987 13.4473 11.9388 13.3633 12.0151C13.1286 12.2388 12.6632 12.8981 12.5039 13.0464C12.3446 13.1946 12.1071 13.1196 12.0082 13.0635C11.6445 12.9176 10.6583 12.4789 9.87213 11.7168C8.89991 10.7744 8.84285 10.4501 8.65968 10.1615C8.51315 9.93059 8.62068 9.78892 8.67433 9.727C8.8838 9.48531 9.17304 9.11215 9.30275 8.92671C9.43246 8.74127 9.32949 8.45973 9.2677 8.28438C9.00197 7.53023 8.77684 6.89892 8.59377 6.5312Z"
                      fill="white"
                    ></path>
                    <defs>
                      <linearGradient
                        id="paint0_linear_3504_387"
                        x1="18.2187"
                        y1="4.8125"
                        x2="2.75"
                        y2="19.25"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#5BD066"></stop>
                        <stop offset="1" stop-color="#27B43E"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </a>
                <span>or</span>
                <a className="icon-phone" target="_blank" href="tel:+91 6364678444">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM6.22175 4.09167C6.5462 4.10632 6.86001 4.12048 7.04674 4.56238C7.20831 4.94474 7.3972 5.5964 7.61966 6.3747L7.62255 6.3848C7.6745 6.56633 7.75562 6.84976 7.61931 7.02735C7.48044 7.20828 7.17299 7.57084 6.95188 7.80449C6.89525 7.86434 6.78079 8.00211 6.91358 8.24391C6.94659 8.30402 6.97458 8.36529 7.00542 8.4328C7.12963 8.70475 7.3001 9.07798 8.03174 9.88465C8.77022 10.6988 9.72496 11.1961 10.0779 11.3635C10.173 11.4256 10.4046 11.5143 10.5708 11.3726C10.6473 11.3075 10.7939 11.1363 10.9538 10.9495C11.1415 10.7302 11.3477 10.4895 11.4801 10.3739C11.4841 10.3706 11.4882 10.3671 11.4924 10.3636C11.5808 10.2894 11.7209 10.1718 11.9606 10.2852C12.1706 10.3846 12.9725 10.8337 13.5781 11.173C13.6972 11.2397 13.8087 11.3021 13.9066 11.3568C14.0038 11.3942 14.141 11.5198 14.1283 11.756C14.0995 12.289 13.6447 13.8471 11.8466 13.7828C10.0486 13.7184 7.93661 12.6425 6.38994 10.6996C4.78731 8.68636 4.35026 7.37479 4.4136 6.2016C4.49089 4.7701 5.5132 4.05389 6.14221 4.08785C6.16875 4.08928 6.19528 4.09048 6.22175 4.09167Z"
                      fill="black"
                    ></path>
                  </svg>
                </a>
                <a className="phone-nub" target="_blank" href="tel:+91 6364678444">
                  +91 6364678444
                </a>
              </div>
              <div className="right-app">
                <a
                  target="_blank"
                  href="https://apps.apple.com/us/app/whizlabs/id1631714050?itsct=apps_box_link&itscg=30200"
                >
                  <img className="img-full istore-btn" src="/images/app-store.svg" alt="" />
                </a>
                <a
                  target="_blank"
                  href="https://play.google.com/store/apps/details?id=learning.app.whizlabs"
                >
                  <img className="img-full android-button" src="/images/google-play.svg" alt="" />
                </a>
              </div>
            </div>

            <div className="footer-copyright">
              <p>© {new Date().getFullYear()}, Whizlabs Software Pvt. Ltd. All rights reserved.</p>
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
        </>
      ) : (
        <div className="container">
          <Link href="/careers">
            <a className="btn-back-careers">
              <i className="icon icon-font-arrow-right"></i>
              <span>Back to Careers</span>
            </a>
          </Link>
          <Link href="/">
            <a className="logo">
              <img className="img-full" src="/images/logo.svg" alt="Whizlabs Logo" />
            </a>
          </Link>
        </div>
      )}
    </footer>
  );
};

export default Footer;
