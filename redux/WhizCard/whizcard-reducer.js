import * as actionTypes from "./whizcard-types"
import cookie from "js-cookie"

const INITIAL_STATE = loadFromLocalStorage("DOWNLOAD_WHIZCARD") || {data: {
    check: false,
    course_id: null,
    email: null,
    type: "",
    url: "",
  }};

const  whizCardReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case actionTypes.DOWNLOAD_WHIZCARD:
            state = action.payload;
            cookie.set("DOWNLOAD_WHIZCARD", JSON.stringify(action.payload));
            return state;
        default:
             return state
    }
    
}

function loadFromLocalStorage(cookieName){
    try{
        const serialisedState = cookie.get(cookieName);
        if(typeof serialisedState == "undefined") return undefined;
        return JSON.parse(serialisedState)
    } catch(e){
        console.error(e);
        return undefined
    }   
}

export default whizCardReducer;