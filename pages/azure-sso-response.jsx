import { useEffect } from "react";
import FourOhFour from "pages/404";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { connect } from "react-redux";
import { authResellerLogin, authLogout } from "redux/Auth/auth-actions";
import { clearCart } from "redux/AddToCart/cart-actions";

const AzureSsoResponse = ({
  ssoDatas,
  userData,
  authLogoutAction,
  clearCartAction,
  storeToLocalStorage,
}) => {
  useEffect(() => {
    if (ssoDatas && ssoDatas.data && ssoDatas.data.user_id) {
      if (userData && userData.data && userData.data.user_id) {
        // If user is already Loggin means have to logout
        authLogoutAction(); // empty user detail cookies
        clearCartAction(); // empty cart cookies
      }
      // Again Login the user with SSO details
      storeToLocalStorage(ssoDatas);
      setTimeout(() => {
        if (ssoDatas.data.redirect_course_slug && ssoDatas.data.redirect_course_id) {
          window.location.href = `${process.env.NEXT_PUBLIC_LMS_URL}/course/${ssoDatas.data.redirect_course_slug}/${ssoDatas.data.redirect_course_id}`;
        } else {
          window.location.href = `${process.env.NEXT_PUBLIC_LMS_URL}/my-courses`;
        }
      }, 3000);
    }
  }, [userData, ssoDatas]);

  return (
    <>
      {ssoDatas && ssoDatas.data && ssoDatas.data.user_id ? (
        <>
          <div id="content-area">
            <div className="error-page error-500">
              <div className="container">
                <div className="btn-group">
                  <h2>Redirecting....</h2>
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

const mapDispatchToProps = (dispatch) => {
  return {
    authLogoutAction: () => dispatch(authLogout()),
    clearCartAction: () => dispatch(clearCart()),
    storeToLocalStorage: (values) => dispatch(authResellerLogin(values)),
  };
};

export async function getServerSideProps(context) {
  let user_type = "";
  const cookie = context.req.headers.cookie;
  const decoded = decodeURIComponent(cookie);
  const split1 = decoded.split("sso_user_type=")[1];
  if (split1) {
    user_type = split1.split(";")[0];
  }
  const { code } = context.query;
  let ssoDatas = "";
  try {
    if (code && user_type) {
      let response = await axios.get(baseUrl + "/sso/azureadResponse", {
        params: {
          user_type: user_type,
          code: code,
        },
      });
      if (response.data && response.data.data) {
        ssoDatas = response.data;
      }
    }
  } catch (error) {
    console.error(error);
  }
  return {
    props: {
      ssoDatas,
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AzureSsoResponse);
