import * as buttonTypes from "./click-types";
import axios from "axios";

export const subsButtonClick = (userData,cookie, subs, p_id) => {
  return async (dispatch) => {
    function onSuccess(data) {
      dispatch({
        type: buttonTypes.SUBSCRIBE,
        payload: {
          result: data,
        },
      });
    }

    try {
      if (userData.user_id && cookie.button_name) {
        await axios({
          method: "post",
          url: process.env.NEXT_PUBLIC_BASE_URL + "/courses/button_activities",
          data: {
            "user_id": userData.user_id,
            // "user_email": userData.user_email,
            "button_name": cookie.button_name,
            "button_url": cookie.button_url,
            "is_purchased": subs,
            "purchased_id": p_id,
          },
        })
        .then(({ status, statusText, data }) => {
          if (status === 500) {
            console.error(statusText);
            return onSuccess(null);
          }
          if (data) {
            return onSuccess(data);
          }
        })
        .catch((e) => console.error(e));
      } else {
        return onSuccess(null);
      }
    } catch (err) {
      console.error(err);
      return onSuccess(null);
    }
  };
};
