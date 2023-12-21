import * as actionTypes from "./ip-types";
import cookie from 'js-cookie';
const INITIAL_STATE = {
  currency_detail: null,
};

const ipReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.STORE_IP:
      cookie.set('currency',JSON.stringify(action.payload))
      return {
        ...state,
        currency_detail: action.payload,
      };
    default:
      return state;
  }
};

export default ipReducer;
