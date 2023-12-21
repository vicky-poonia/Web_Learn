import * as actionTypes from "./redirect-types";

export const updateRedirection = (datas, url = null) => {

  return async (dispatch) => {
    function onSuccess(data) {
      dispatch({
        type: actionTypes.UPDATE,
        payload: {
          data : data,
          url : url
        },
      });
    }
    return onSuccess(datas, url);
  };
};
