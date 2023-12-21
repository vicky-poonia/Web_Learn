import * as actionTypes from "./whislist-types";
import cookie from "js-cookie";

const INITIAL_STATE = {
  whislist: loadFromLocalStorage("whislistData") || [],
};

const whislistReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_WHISLIST: // Add whislist
      var index = state.whislist.indexOf(action.payload.course_id);
      const newChecked = [...state.whislist];
      if (index === -1) {
        newChecked.push(action.payload.course_id);
      } else {
        newChecked.splice(index, 1);
      }
      cookie.set("whislistData", JSON.stringify(newChecked));
      return {
        ...state,
        whislist: newChecked,
      };
      case actionTypes.CLEAR_WHISLIST:
      cookie.remove("whislistData")
      return {
        ...state,
        whislist:[]
      };
      case actionTypes.GET_WISHLIST:
        cookie.set("whislistData", JSON.stringify(action.payload));
        return{
          ...state,
          whislist:action.payload
        }
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

export default whislistReducer;
