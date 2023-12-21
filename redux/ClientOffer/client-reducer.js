import * as actionTypes from "./client-types"
import Cookies from 'js-cookie'

const INITIAL_STATE = {
    client: loadFromLocalStorage('client') || false
}

const  clientReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case actionTypes.CLIENT_OFFER:
            Cookies.set('client',true)
            return {...state,client:action.payload}
        case actionTypes.CLIENT_OFFER_REMOVE:
            Cookies.remove('client')
            return {...state,client:action.payload}
        default:
             return state
    }
    
}

function loadFromLocalStorage(cookieName) {
    try {
      const serialisedState = Cookies.get(cookieName);
      if (typeof serialisedState == "undefined") return undefined;
      return JSON.parse(serialisedState);
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }

export default clientReducer;