import * as actionTypes from "./alert-type";

const INITIAL_STATE = {
  datas : null
};

const alertBoxReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ALERT: 
    return {
        ...state,
        datas: action.payload.datas
      };
    default:
      return state;
  }
};

export default alertBoxReducer;
