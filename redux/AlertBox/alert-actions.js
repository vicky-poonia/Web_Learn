import * as actionTypes from "./alert-type";

export const alertBox = (datas) => {
  return {
    type: actionTypes.ALERT,
    payload: {
      datas: datas,
    },
  };
};