import * as actionTypes from "./utm-types";

export const storeUtm = (urlData = null) => {
  return async (dispatch) => {
    function onSuccess(data) {
      dispatch({
        type: actionTypes.STORE_UTM,
        payload: data,
      });
    }
    const urlParams = new URLSearchParams(urlData);
    const returnData = {
      utm_id: urlParams?.get("utm_id") || "",
      utm_source: urlParams?.get("utm_source") || "",
      utm_campaign: urlParams?.get("utm_campaign") || "",
      utm_medium: urlParams?.get("utm_medium") || "",
      utm_term: urlParams?.get("utm_term") || "",
      utm_content: urlParams?.get("utm_content") || "",
      share_a_sale: false,
    };
    // Share a sale Tracking
    if (urlParams?.get("sscid")) {
      returnData.utm_source = "shareasale-analytics.com";
      returnData.share_a_sale = true;
    }

    return onSuccess(returnData);
  };
};
