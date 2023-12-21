import * as actionTypes from "./redirect-types";
import cookie from "js-cookie";

const INITIAL_STATE = loadFromLocalStorage("redirectionData") || {
  redirect_to: null,
  redirect_url: null,
};

const redirectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.UPDATE:
      if (action.payload.data) {
        cookie.set(
          "redirectionData",
          JSON.stringify({
            redirect_to: action.payload.data,
            redirect_url: action.payload.url,
          })
        );
      } else {
        cookie.remove("redirectionData");
      }

      return {
        ...state,
        redirect_to: action.payload.data,
        redirect_url: action.payload.url,
      };
    default:
      return state;
  }
};

function loadFromLocalStorage(cookieName) {
  try {
    const serialisedState = cookie.get(cookieName);
    if (typeof serialisedState == "undefined") return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export default redirectReducer;
