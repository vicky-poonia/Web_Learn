import * as actionTypes from "./campaign-types"
import Cookies from 'js-cookie'

const INITIAL_STATE = {
    timer: loadFromLocalStorage('timer') || false,
    offer_type : loadFromLocalStorage('offer_type') || null
}

const  campaignOfferReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case actionTypes.SET_OFFER:
            Cookies.set('timer',true)
            return {...state,timer:action.payload}
        case actionTypes.CLEAR_OFFER:
            Cookies.remove('timer')
            Cookies.remove('offer_type')
            return {...state,timer:action.payload,offer_type:null}
        case actionTypes.STORE_CAMPAIGN_DETAILS:
            Cookies.set('offer_type',JSON.stringify(action.payload))
            return {...state,offer_type:action.payload}
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

export default campaignOfferReducer;