
import * as actionTypes from './enroll-types';
import cookie from "js-cookie";

const INITIAL_STATE = {
    enrolled: loadFromLocalStorage("enrolled") || null,
}

const enrollReducer = (state = INITIAL_STATE ,action)=>{
    switch (action.type)
    {
        case actionTypes.ADD_TO_STATE:
            let enrolled = action.payload.data
            localStorage.setItem("enrolled",JSON.stringify(enrolled))
            return {
                ...state,
                enrolled
            };
        case actionTypes.REMOVE_FROM_STATE:
            localStorage.removeItem("enrolled");
            return {
                ...state,
                enrolled : null
            }
         default:
           return state;
    }

}   

function loadFromLocalStorage(cookieName) {
    try {
        if (typeof window !== 'undefined') {
            // Perform localStorage action
            const serialisedState = localStorage.getItem(cookieName);
            if (typeof serialisedState == "undefined") return undefined;
            return JSON.parse(serialisedState);
          }
    } catch (e) {
      console.warn(e);
      return undefined;
    }
  }
  

export default enrollReducer;