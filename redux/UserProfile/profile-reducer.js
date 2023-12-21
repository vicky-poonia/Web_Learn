import * as actionTypes from "./profile-types";
import cookie from "js-cookie";

const INITIAL_STATE = loadFromLocalStorage("userProfile") || {
  userSubscriptionData: null,
};

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.STORE_USER_PROFILE:
      let profileData = {
        ...state,
        userSubscriptionData: action?.payload?.subscrptions || null,
        myname:action.payload?.firstname + " " + action.payload?.lastname || null,
        organizationData:action.payload?.organization_name || null,
        designationData:action.payload?.designation || null,
        user_type: action.payload?.user_type || null,
        email_verified:action.payload?.is_email_verified,
        mail_sent:false
      };
      localStorage.setItem("userProfile", JSON.stringify(profileData));
      return profileData;
    case actionTypes.CLEAR_USER_PROFILE:
      cookie.remove("userProfile");
      cookie.remove("signupmodal");
      localStorage.removeItem("userProfile")
      return {
        ...state,
        userSubscriptionData: null,
        myname: null,
        organizationData: null,
        designationData: null,
      };
    case actionTypes.UPDATE_EMAIL_VERIFIED:
      localStorage.setItem('userProfile',JSON.stringify({
        ...state,
        email_verified:action.payload
      }))
      return {
        ...state,
        email_verified:action.payload
      }
    case actionTypes.MAIL_SENT:
      localStorage.setItem('userProfile',JSON.stringify({
        ...state,
        mail_sent:action.payload
      }))
      return{
        ...state,
        mail_sent:action.payload
      }
      default:
      return state;
  }
};

function loadFromLocalStorage(cookieName) {
  try {
    const serialisedState = typeof window != "undefined" ? localStorage.getItem(`${cookieName}`) : undefined
    if (typeof serialisedState == "undefined") return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

export default profileReducer;
