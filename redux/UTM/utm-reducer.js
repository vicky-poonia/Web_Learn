import * as actionTypes from "./utm-types";
import cookie from "js-cookie";

const INITIAL_STATE = loadFromLocalStorage("UTM") || null;

const utmReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.STORE_UTM:
      state = action.payload;
      cookie.set("UTM", JSON.stringify(action.payload));
      return state;
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

export default utmReducer;
