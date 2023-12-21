import * as actionTypes from "./search-types";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const searchAllCourses = (value) => {
  return async (dispatch) => {
    function onSuccess(searchValue, result) {
      dispatch({
        type: actionTypes.SEARCH_ALL_COURSES,
        payload: {
          result: result,
          searchValue: searchValue,
        },
      });
    }

    let returnData = [];

    try {
      if (value) {
        await axios
          .get(baseUrl + "/courses/search", {
            params: {
              q: value,
            },
          })
          .then(({ status, statusText, data: { data } }) => {
            if (status === 500) {
              console.error(statusText);
            }

            if (data.length > 0) {
              returnData = data;
            }
          })
          .catch((e) => console.error(e));
      }
    } catch (error) {
      console.error(error);
    }

    return onSuccess(value, returnData);
  };
};
