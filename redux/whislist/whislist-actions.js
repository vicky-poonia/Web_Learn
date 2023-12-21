import * as actionTypes from "./whislist-types";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const StoreWhishlist = (course_id, user_id,currency) => {
  return async (dispatch) => {
    function onSuccess(data) {
      dispatch({
        type: actionTypes.ADD_WHISLIST,
        payload: {
          course_id: data,
          currency
        },
      });
    }

    try {
      if (user_id && course_id) {
        const {
          status,
          data: { data: store },
        } = await axios.post(`${baseUrl}` + "/users/wishlist", {
          user_id: user_id,
          course_id: course_id,
          currency:currency
        });

        if (status === 500) {
          return onSuccess(null);
        }

        if (store && store.id) {
          // const getWhislist = await axios.get(baseUrl + "/users/wishlist", {
          //   params: {
          //     user_id: user_id
          //   }
          // });
          // if (getWhislist.data && getWhislist.data.userWishlistData) {
          //   let results = [];
          //   getWhislist.data.userWishlistData.map((item) => {
          //     results.push(item.course_id);
          //   });
          //   return onSuccess(results);
          // }
          return onSuccess(course_id);
        }
      }
    } catch (error) {
      return onSuccess(null);
    }
  };
};
export const clearWhislist = () => {
  return (dispatch) => {
    function onSuccess() {
      dispatch({
        type: actionTypes.CLEAR_WHISLIST,
      });
    }
    return onSuccess();
  };
};

export const getWishList = (user_id)=>{
  return  async (dispatch)=>{
    function onSuccess(data){
      dispatch({
        type:actionTypes.GET_WISHLIST,
        payload:data
      })
    }
    try{
      if (user_id) {
        const getWhislist = await axios.get(baseUrl + "/users/wishlist", {
          params: {
            user_id: user_id,
          },
        });
        if (getWhislist.data && getWhislist.data.userWishlistData) {
          let results = [];
          getWhislist.data.userWishlistData.map((item) => {
            results.push(item.course_id);
          });
          
          return onSuccess(results)
        }
      }
    }catch(e){
      console.log(e)
      return;
    }
  }
}
