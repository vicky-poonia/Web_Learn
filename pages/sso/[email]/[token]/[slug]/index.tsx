import { useEffect } from "react";
import FourOhFour from "pages/404";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { connect } from "react-redux";
import { authResellerLogin, authLogout } from "redux/Auth/auth-actions";
import { clearCart } from "redux/AddToCart/cart-actions";
import { useRouter } from "next/router";

const Sso = ({ ssoDatas, userData, authLogoutAction, clearCartAction, storeToLocalStorage }) => {
  const router = useRouter()
  let currentLocation = router.pathname;
  useEffect(() => {
    if (ssoDatas && ssoDatas.data && ssoDatas.data.user_id) {
      if (userData && userData.data && userData.data.user_id) {
        // If user is already Loggin means have to logout
        authLogoutAction(); // empty user detail cookies
        clearCartAction(); // empty cart cookies
      }
      // Again Login the user with SSO details
      storeToLocalStorage(ssoDatas,currentLocation);
      setTimeout(() => {
        if (ssoDatas.data.redirect_course_slug && ssoDatas.data.redirect_course_id) {

          window.location.href = `${process.env.NEXT_PUBLIC_LMS_URL}/course/${ssoDatas.data.redirect_course_slug}/${ssoDatas.data.redirect_course_id}?ssoredirect=1`;
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
    storeToLocalStorage: (values,path) => dispatch(authResellerLogin(values,path)),
  };
};

export async function getServerSideProps(context) {
  const { email, token, slug } = context.params;
  const url = "/sso/" + email + "/" + token?.trim() + "/" + slug;
  let ssoDatas = "";
  try {
    let response = await axios.get(baseUrl + url);
    if (response.data && response.data.data) {
      ssoDatas = response.data;
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

export default connect(mapStateToProps, mapDispatchToProps)(Sso);
