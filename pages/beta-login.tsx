import { useEffect } from "react";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { authResellerLogin } from "redux/Auth/auth-actions";
import { connect } from "react-redux";

const BetaLogin = ({ userData, authDatas, storeToLocalStorage }) => {
  useEffect(() => {
    if (!userData && !userData?.data && !userData?.data?.user_id) {
      if (authDatas && authDatas?.data?.user_id) {
        storeToLocalStorage(authDatas);
      }
      setTimeout(() => {
        window.location.href = `/`;
      }, 3000);
    } else {
      window.location.href = `${process.env.NEXT_PUBLIC_LMS_URL}/my-courses`;
    }
  }, [authDatas]);
  return (
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
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.authData.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeToLocalStorage: (values) => dispatch(authResellerLogin(values)),
  };
};

export async function getServerSideProps(context) {
  const { token } = context.query;
  let authDatas: any = "";
  try {
    let response = await axios.get(baseUrl + "/users/profile", {
      headers: { Authorization: token },
    });
    if (response.data && response.data.data) {
      authDatas = {
        msg: "Login successfull",
        data: {
          token: token,
          user_id: response.data.data.id,
          user_email: response.data.data.email,
          name: {
            first: response.data.data.firstname,
            last: response.data.data.lastname,
          },
          profile_img: response.data.data.profile_picture,
        },
      };
    }
  } catch (error) {
    console.error(error);
  }
  return {
    props: {
      authDatas,
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BetaLogin);
