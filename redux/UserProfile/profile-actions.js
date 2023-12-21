import * as actionTypes from "./profile-types";
import axios from "axios";
import { updateRedirection } from "../Redirection/redirect-actions";
import cookie from 'js-cookie';
import { enrollCourseDetail } from "redux/UserEnrolled/enroll-action";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const storeUserProfile = (userToken = null,currentLocation = null,is_sso_user = null) => {
  return async (dispatch, getState) => {
    function onSuccess(data) {
      dispatch({
        type: actionTypes.STORE_USER_PROFILE,
        payload: data,
      });
    }

    let returnData = null;
    // let RedirectionUrl = `${process.env.NEXT_PUBLIC_BASE_PATH}library`;
    let RedirectionUrl = null;
    const redirectData = getState().redirectData;
    try {
      if (userToken && !is_sso_user) {
        const profileResp = await axios.get(baseUrl + "/users/profile", {
          headers: { Authorization: userToken },
        });
        if (profileResp && profileResp.data && profileResp.data.data) {
          returnData = profileResp.data.data;
          // REDIRECTION FLOW CONTINUED... :D
          if (redirectData.redirect_to == "REDIRECT") {
            RedirectionUrl = `${redirectData.redirect_url}`;
          } else if (redirectData.redirect_to == "CART") {
            RedirectionUrl = `${process.env.NEXT_PUBLIC_BASE_PATH}cart?ref=${decodeURI(
              redirectData.redirect_url
            )}`;
          } else if (redirectData.redirect_to == "SUBSCRIPTION") {
            RedirectionUrl = `${process.env.NEXT_PUBLIC_BASE_PATH}pricing/checkout`;
          } else if (redirectData.redirect_to == "FORUMS") {
            RedirectionUrl = `${process.env.NEXT_PUBLIC_BASE_PATH}forums`;
          } else if (redirectData.redirect_to == "LABS") {
            RedirectionUrl = redirectData.redirect_url;
          } else if (redirectData.redirect_to == "LMS_ACTIVITY" && redirectData.redirect_url) {
            RedirectionUrl = `${redirectData.redirect_url}`;
          }else if (redirectData.redirect_to === "PRICING"){
            RedirectionUrl = `${process.env.NEXT_PUBLIC_BASE_PATH}pricing`
          }else if (redirectData.redirect_to == null){
            if(!cookie.get("signupmodal")){
              if(currentLocation && (currentLocation == "/[slug]" || currentLocation == "/pricing" || currentLocation == "/login/[reseller]" || currentLocation == "/register/[reseller]" || currentLocation =="/cloud/[slug]"))
              setTimeout(()=>{
                window.location.reload()
              },1000)
            }
          }   
          /* else if (profileResp.data.data.course_count) {
            RedirectionUrl = `${process.env.NEXT_PUBLIC_LMS_URL}/my-courses`;
          } */
          
          dispatch(updateRedirection(null, null))
          if (RedirectionUrl) {
            let temp = RedirectionUrl;
            RedirectionUrl = null;
            setTimeout(() => {
              window.location.href = temp;
            }, 1000);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }

    return onSuccess(returnData);
  };
};

export const clearUserProfile = () => {
  return (dispatch) => {
    function onSuccess() {
      dispatch({
        type: actionTypes.CLEAR_USER_PROFILE,
      });
    }
    return onSuccess();
  };
};

export const checkEmailVerified = (user_id) =>{
  return async(dispatch)=>{
    function onSuccess(data){
      dispatch({
        type:actionTypes.UPDATE_EMAIL_VERIFIED,
        payload:data
      })
    }
    try{
      let email_verified = await axios.get(`${baseUrl}/users/email_check/?user_id=${user_id}`)
      return onSuccess(email_verified.data.userData.is_email_verified)
    }
    catch(e){
        console.log(e)
    }
  }
}

export const IsMailsend = ()=>{
  return async(dispatch)=>{
    function onSuccess(){
      dispatch({
        type : actionTypes.MAIL_SENT,
        payload: true
      })
    }
    return onSuccess()
  }
}
export const storeUtmDetails = (user_token, user_id, utmData) => {
  return async () => {
    if (user_token && user_id) {
      try {
        await axios.post(
          baseUrl + "/auth/register/utm",
          {
            user_id: user_id,
            utm_source: utmData.utm_source ? utmData.utm_source : null,
            utm_campaign: utmData.utm_campaign ? utmData.utm_campaign : null,
            utm_medium: utmData.utm_medium ? utmData.utm_medium : null,
            utm_term: utmData.utm_term ? utmData.utm_term : null,
            utm_content: utmData.utm_content ? utmData.utm_content : null,
            share_a_sale: utmData.share_a_sale,
          },
          {
            headers: { Authorization: user_token },
          }
        );
      } catch (error) {
        console.error(error);
        return;
      }
    }
  };
  return;
};
