import * as actionTypes from "./ip-types";

export const storeIp = (ip) => {
  return async (dispatch) => {
    function onSuccess(data) {
      dispatch({
        type: actionTypes.STORE_IP,
        payload: data,
      });
    }

    let returnData = {
      type: "usd",
      symbol: "$",
      loaded: false
    };

    if (ip && ip.currency_code && ip.currency_symbol) {
        const country_code = ip.currency_code?.toLowerCase();
        if (
          country_code == "inr" ||
          country_code == "gbp" ||
          country_code == "eur" ||
          country_code == "usd"
        ) {
          returnData.type = ip.currency_code.toLowerCase();
          returnData.symbol = ip.currency_symbol;
        }
        if(country_code !== ''){
          returnData.loaded = true;
        }
    }

    return onSuccess({ ...returnData, type: returnData.type.toLowerCase() });
  };
};
