import * as actionType from './combo-slug-types'
import Cookies from 'js-cookie'

const INITIAL_STATE = {
    combo_slug: loadFromLocalStorage('combo_slug') || null
}

const comboslugReducer = (state = INITIAL_STATE,action)=>{
    switch(action.type){
        case actionType.ADD_SLUG:
            Cookies.set('combo_slug',JSON.stringify(action.payload))
            return {...state,combo_slug:action.payload}
        case actionType.REMOVE_SLUG:
            Cookies.set('combo_slug',JSON.stringify(action.payload))
            return {...state,combo_slug:action.payload}
        default:
            return state
    }
}

export default comboslugReducer

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
