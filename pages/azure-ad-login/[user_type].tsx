import { useEffect } from "react";
import FourOhFour from "pages/404";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { connect } from "react-redux";
import cookie from "js-cookie";
import Head from "next/head";

const AzureSsoLogin = ({ ssoDatas, user_type, userData }) => {
  useEffect(() => {
    if (ssoDatas && ssoDatas.data && ssoDatas.data.url) {
      cookie.set("sso_user_type", user_type);
      if (userData && userData.data && userData.data.user_id) {
        // If user is already Loggin means redirect to MyCourses page
        window.location.href = `${process.env.NEXT_PUBLIC_LMS_URL}/my-courses`;
      }
    }
  }, [userData, ssoDatas]);

  return (
    <>
      {ssoDatas && ssoDatas.data && ssoDatas.data.url ? (
        <>
          <Head>
            <title>Login or Sign up | Whizlabs</title>

            <meta name="facebook-domain-verification" content="twh401qzi7r7o3n227q4sg3hghbpzh" />
          </Head>
          <div id="content-area" className="reseller-register-page">
            <div className="register-page">
              <div className="graphic-img">
                <figure></figure>
              </div>
              <div className="container">
                <div className="left">
                  <a className="logo" href="index.html">
                    <img className="img-full" src="/images/logo.svg" alt="Whizlabs Logo" />
                  </a>
                  <div className="content">
                    <span>Welcome to Whizlabs</span>
                    <p>
                      Stack Social partners with Whizlabs to improve the skills of millions of
                      learners and help them getting certified to achieve their career goals.
                    </p>
                  </div>
                </div>
                <div className="right">
                  <div className="box">
                    <div className="head">
                      <figure>
                        <img
                          className="img-full"
                          src="/images/MicrosoftTeams-image.png"
                          alt=""
                          style={{ width: "80px", height: "80px" }}
                        />
                      </figure>
                    </div>
                    <a
                      className="btn btn-signup"
                      href={ssoDatas.data.url}
                      style={{ backgroundColor: "#FF953F", cursor: "pointer" }}
                    >
                      Microsoft Login
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <FourOhFour />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.authData.userData,
  };
};

export async function getServerSideProps(context) {
  const { user_type } = context.params;
  let ssoDatas = "";
  try {
    let response = await axios.get(baseUrl + "/sso/azureAd", {
      params: {
        user_type: user_type,
      },
    });
    if (response.data && response.data.data) {
      ssoDatas = response.data;
    }
  } catch (error) {
    console.error(error);
  }
  return {
    props: {
      ssoDatas,
      user_type,
    },
  };
}

export default connect(mapStateToProps, null)(AzureSsoLogin);
