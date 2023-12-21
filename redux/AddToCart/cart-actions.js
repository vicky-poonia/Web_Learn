import * as actionTypes from "./cart-types";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import cookie from "js-cookie";

const DEFAULT_PRICE_STRUCTURE = {
  usd: 0,
  gbp: 0,
  eur: 0,
  inr: 0,
};

export const addToCart = (itemID, type, currency) => {
  return async (dispatch) => {
    function onSuccess(data) {
      dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: data,
      });
    }

    try {
      let authData = cookie.get("userData") ? JSON.parse(cookie.get("userData")) : null;
      if (authData) {
        let userToken = authData?.data?.token;
        await axios
          .post(
            `${baseUrl}/cart/addtocart`,
            {
              data: {
                courseId: itemID,
                selectedCourseType: type,
                currency: currency,
              },
            },
            {
              headers: {
                Authorization: userToken,
              },
            }
          )
          .then((resp) => {
            return onSuccess(resp.data.resp);
          });
      } else {
        let data = {
          courseId: itemID,
          selectedCourseType: type,
        };
        return onSuccess(data);
      }
    } catch (e) {}
  };
};

export const removeFromCart = (itemID, type, currency) => {
  return async (dispatch) => {
    function onSuccess(data) {
      dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: data,
      });
    }
    try {
      let authData = cookie.get("userData") ? JSON.parse(cookie.get("userData")) : null;
      if (authData) {
        let userToken = authData.data?.token;
        await axios
          .get(`${baseUrl}/cart/removefromcart?courseId=${itemID}&productType=${type}`, {
            headers: {
              Authorization: userToken,
            },
          })
          .then((resp) => {
            // console.log(resp)
            return onSuccess(resp.data.resp);
          });
      } else {
        let data = {
          courseId: itemID,
          productType: type,
        };
        return onSuccess(data);
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const clearCart = () => {
  return {
    type: actionTypes.CLEAR_CART,
    payload: {
      datas: null,
    },
  };
};

export const addSubscription = (datas = null) => {
  return {
    type: actionTypes.ADD_SUBSCRIPTION,
    payload: {
      datas: datas,
    },
  };
};

//NOT IN USE
export const getCart = (userId) => {
  return async (dispatch) => {
    function onSuccess(data) {
      dispatch({
        type: actionTypes.GET_CART_DETAILS,
        payload: data,
      });
    }
    return onSuccess(null);
  };
};

export const updateCoupon = (coupon_data = null) => {
  return {
    type: actionTypes.UPDATE_COUPON_DETAILS,
    payload: coupon_data,
  };
};

export const updateCartAfterLogin = (condition) => {
  return {
    type: actionTypes.UPDATE_CART_AFTER_SIGNIN,
    payload: condition,
  };
};

//We can add products to cart before login
//once we got the userData
//take the cart stored in locastorage and move to backend for further calculation
//it will return accurate cart
export const updateSateOfCartAfterLogin = (stateCart, currency, userData) => {
  return async (dispatch) => {
    function onSuccess(data) {
      dispatch({
        type: actionTypes.UPDATE_CART_STATE_AFTER_LOGIN,
        payload: data,
      });
    }
    try {
      let data = await axios.post(
        `${baseUrl}/cart/updatecart`,
        {
          cart: stateCart,
          currency: currency.type,
        },
        {
          headers: {
            Authorization: userData.data.token,
          },
        }
      );
      return onSuccess(data.data.cart_details);
    } catch (e) {}
  };
};

//Not in USE
export const getInitalCart = (token) => {
  return async (dispatch) => {
    function onSuccess(data) {
      dispatch({
        type: actionTypes.UPDATE_CART_STATE_AFTER_LOGIN,
        payload: data,
      });
    }
    try {
      let data = await axios.get(`${baseUrl}/cart/getsimpifiedcart`, {
        headers: {
          Authorization: token,
        },
      });
      return onSuccess(data.data.data.cart_details);
    } catch (e) {}
  };
};

//Once the subscription is bought or anyother order is placed we need to check the cart
//and avoid duplicate entries .. and avoid storing the product which he has the access
// calling /cart/getcartdata -> will take care above points
export const storeCartdetails = (userToken) => {
  return async (dispatch) => {
    function onSuccess(data) {
      dispatch({
        type: actionTypes.STORE_CART_WHEN_GETCARTDETAILS,
        payload: data,
      });
    }
    try {
      let CartData = await axios.get(`${baseUrl}/cart/getcartdata`, {
        headers: {
          Authorization: userToken,
        },
      });
      return onSuccess(CartData.data.cartData);
    } catch (e) {}
  };
};

export const clearCarts = () => {
  return async (dispatch) => {
    function onSuccess() {
      dispatch({
        type: actionTypes.CLEAR_CARTS,
        payload: [],
      });
    }
    return onSuccess();
  };
};

//store while /getcart in cartpage will result a accurate cart
//so every time /getcart is called it will store the cart count
export const updateCartCount = (count) => {
  return async (dispatch) => {
    function onSuccess(count) {
      dispatch({
        type: actionTypes.GET_CART_COUNT,
        payload: count,
      });
    }
    return onSuccess(count);
  };
};
