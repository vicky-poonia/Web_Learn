import * as actionTypes from "./click-types";

const INITIAL_STATE = {};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SUBSCRIBE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default authReducer;
