import * as authTypes from "./auth-types";
import axios from "axios";
import { clearCarts,updateSateOfCartAfterLogin} from "../AddToCart/cart-actions";
import {
  storeUserProfile,
  clearUserProfile,
  storeUtmDetails,
} from "../UserProfile/profile-actions";
import { clearWhislist } from "../whislist/whislist-actions";
import { updateRedirection } from "../Redirection/redirect-actions";
import cookie from 'js-cookie';
import {Usercourse,clearUserbought,NotifiedCourse} from "../userCourse/usercourse-action" 
import { enrollCourseDetail,clearEnrolled } from "redux/UserEnrolled/enroll-action";
import { subsButtonClick } from "../buttonClick/click-actions";
import { getWishList } from "../whislist/whislist-actions";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const saveAfterSignupDetails = (values) => {
//   return async (dispatch, getState) => {
//     function onSuccess(data) {
//       dispatch({
//         type: authTypes.AFTERSIGNUPDETAILS,
//         payload: {
//           result: data,
//         },
//       });
//     }
//     try {
//       if (values.update) {
//         return onSuccess({ detailsAdded: true });
//       }
//       const { about_us, user_id, skills, certifications, time_period , other_certification, other_skills } = values;

//       const url = `${baseUrl}/auth/aftersinup_details`;

//       await axios
//         .post(
//           url,
//           {
//             about_us,
//             user_id,
//             certifications,
//             skills,
//             time_period,
//             other_certification,
//             other_skills,
//           },
//           {
//             headers: {
//               "content-type": "application/json",
//             },
//           }
//         ).then(({ status, statusText, data }) => {
//           if (status === 500) {
//             console.error(statusText);
//             return onSuccess({ detailsAdded: false });
//           }
//           return onSuccess({ detailsAdded: true });
//         })
//         .catch((e) => {
//           console.error(e);
//           onSuccess({ detailsAdded: false })
//         });
//     } catch {
//       console.error(error);
//       return onSuccess(null);
//     }
//   }
// }
export const authRegister = (values,currentLocation) => {
  return async (dispatch, getState) => {
    function onSuccess(data) {
      dispatch({
        type: authTypes.REGISTER,
        payload: {
          result: data,
        },
      });
    }

    const utmData = getState().utmData;

    try {
      if (values.name && values.email && values.password) {
        const { name, email, password, isAmazonUser } = values;

        const url = `${baseUrl}/auth/register${isAmazonUser ? "/amazon" : ""}`;

        await axios
          .post(
            url,
            {
              name,
              email: email.toLowerCase(),
              password,
            },
            {
              headers: {
                "content-type": "application/json",
              },
            }
          )
          .then(async({ status, statusText, data }) => {
            if (status === 500) {
              console.error(statusText);
              return onSuccess(null);
            }
            if (data) {
              if (data.data && data.data.user_id) {
                dispatch(storeUtmDetails(data.data.token, data.data.user_id, utmData));
                let cookieValue = cookie.get('Subscribe_now_button');
                let parsedData = cookieValue ? JSON.parse(cookieValue) : null;
                if(cookieValue){
                  dispatch(subsButtonClick(data.data, parsedData))
                }
               
                let currency = JSON.parse(cookie.get('currency'))
                let cart = JSON.parse(localStorage.getItem('cartData')) || []
                if(cart && currency){
                  await dispatch(updateSateOfCartAfterLogin(cart,currency,data))
                } 
                dispatch(storeUserProfile(data.data.token,currentLocation)); // update User Profile Details from DB to redux/localstorage
                // dispatch(getInitalCart(data.data.token))
                dispatch(Usercourse(data.data.user_id))
                dispatch(NotifiedCourse(data.data.user_id))
                dispatch(enrollCourseDetail(data.data.user_id))
                // console.log(currentLocation)
                dispatch(getWishList(data.data.user_id))
                if(!cookie.get('client') && currentLocation != "/aws-free-labs" && !currentLocation.includes('cart') && !currentLocation.includes("/cloud/")){
                  cookie.set("signupmodal",true)
                }
              }
              return onSuccess(data);
            }
          })
          .catch((e) => console.error(e));
      } else {
        return onSuccess(null);
      }
    } catch (error) {
      console.error(error);
      return onSuccess(null);
    }
  };
};

export const authLogin = (values,currentLocation) => {
  return (dispatch) => {
    function onSuccess(data) {
      dispatch({
        type: authTypes.LOGIN,
        payload: {
          result: data,
        },
      });
    }

    try {
      if (values.email && values.password) {
        const { email, password, isAmazonUser } = values;

        const url = `${baseUrl}/auth/login${isAmazonUser ? "/amazon" : ""}`;

        axios
          .post(
            url,
            {
              email: email.toLowerCase(),
              password,
            },
            {
              headers: {
                "content-type": "application/json",
              },
            }
          )
          .then(async({ status, statusText, data }) => {
            if (status === 500) {
              console.error(statusText);
              return onSuccess(null);
            }

            if (data) {
              if (data.data && data.data.user_id) {
                // dispatch(getCart(data.data.user_id)); 
                let cookieValue = cookie.get('Subscribe_now_button');
                let parsedData = cookieValue ? JSON.parse(cookieValue) : null;
                if(cookieValue){
                  dispatch(subsButtonClick(data.data, parsedData))
                }
                let currency = JSON.parse(cookie.get('currency'))
                let cart = JSON.parse(localStorage.getItem('cartData')) || []
                if(cart && currency){
                  await dispatch(updateSateOfCartAfterLogin(cart,currency,data))
                }
                dispatch(storeUserProfile(data.data.token,currentLocation)); // update User Profile 
                dispatch(Usercourse(data.data.user_id))
                dispatch(NotifiedCourse(data.data.user_id))
                dispatch(enrollCourseDetail(data.data.user_id))
                dispatch(getWishList(data.data.user_id))
              }
              return onSuccess(data);
            }
          })
          .catch((e) => console.error(e));
      } else {
        return onSuccess(null);
      }
    } catch (error) {
      return error;
    }
  };
};

export const authLogout = () => {
  return (dispatch) => {
    function onSuccess() {
      dispatch({
        type: authTypes.LOGOUT,
      });
    }
    localStorage.removeItem("cartData");
    cookie.remove('cart_count')
    dispatch(clearUserProfile());
    dispatch(clearWhislist());
    dispatch(clearUserbought())
    dispatch(clearEnrolled())
    dispatch(clearCarts());
    return onSuccess();
  };
};

export const authSocialLogin = (values) => {
  return async(dispatch) => {
    function onSuccess(data) {
      dispatch({
        type: authTypes.SOCIAL_LOGIN,
        payload: {
          result: data,
        },
      });
    }
    try {
      if (!values.email) {
        console.log("An error occurred during social login!");
        return;
      }
      else if (values.email) {
        const { name, email, image } = values;
        // console.log(values)
        await axios
          .post(baseUrl + "/auth/login/social", {
            name: name,
            email: email.toLowerCase(),
            img: image || null,
          })
          .then(async({ status, statusText, data }) => {
            if (status === 500) {
              console.error(statusText);
              return onSuccess(null);
            }

            if (data && data.data && data.data.user_id) {
              if (data.status == 2) {
                if(!cookie.get('client') && values.currentPath != "/aws-free-labs" && !values.currentPath.includes('/cart') && !values.currentPath.includes("/cloud/")){
                  cookie.set("signupmodal",true)
                }
                // dispatch(updateRedirection("PRICING"))
              }
              // dispatch(getCart(data.data.user_id)); 
              let cookieValue = cookie.get('Subscribe_now_button');
              let parsedData = cookieValue ? JSON.parse(cookieValue) : null;
              if(cookieValue){
                dispatch(subsButtonClick(data.data, parsedData))
              }
              
              let currency = JSON.parse(cookie.get('currency'))
              let cart = JSON.parse(localStorage.getItem('cartData')) || []
              if(cart && currency){
                await dispatch(updateSateOfCartAfterLogin(cart,currency,data))
              }
              dispatch(storeUserProfile(data.data.token,values.currentPath)); // update User Profile Details from DB to redux/localstorage
              // dispatch(getInitalCart(data.data.token))
              dispatch(Usercourse(data.data.user_id))
              dispatch(NotifiedCourse(data.data.user_id))
              dispatch(enrollCourseDetail(data.data.user_id))
              dispatch(getWishList(data.data.user_id))
              return onSuccess(data);
            }
          })
          .catch((e) => console.error(e));
      } else {
        return onSuccess(null);
      }
    } catch (error) {
      console.error("An error occurred during social login:", error);
      return onSuccess(null);
    }
  };
};


export const authResellerLogin = (values,currentLocation) => {
  return (dispatch) => {
    function onSuccess(data) {
      dispatch({
        type: authTypes.RESELLR_LOGIN,
        payload: {
          result: data,
        },
      });
    }
    if (values && values.data && values.data.token) {
      dispatch(storeUserProfile(values.data.token,currentLocation,values.data?.sso)); // update User Profile Details from DB to redux/localstorage
      let cookieValue = cookie.get('Subscribe_now_button');
      let parsedData = cookieValue ? JSON.parse(cookieValue) : null;
      if(cookieValue){
        dispatch(subsButtonClick(data.data, parsedData))
      }
    }
    return onSuccess(values);
  };
};

