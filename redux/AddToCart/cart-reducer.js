import * as actionTypes from "./cart-types";
import cookie from "js-cookie";

const INITIAL_STATE = {
  courses: [],
  cart: loadFromLocalStorage("cartData") || [],
  subscription: loadFromLocalStorage("subscriptionData") || null,
  couponData: loadFromLocalStorage("couponData") || null,
  updateaftersignin: loadFromLocalStorage("updateaftersignin") || false,
  cart_count: loadFromLocalStorage("cart_count") || 0,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  let authData = cookie.get("userData") ? JSON.parse(cookie.get("userData")) : null;

  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      //if logged in -> store the data returning from api
      //not logged in => evaluvate the cart and add the product and store in localstorage
      if (authData) {
        //loggedin user
        localStorage.setItem("cartData", JSON.stringify(action.payload));
        cookie.set("cart_count", action.payload.length);
        return { ...state, cart: action.payload, cart_count: action.payload.length };
      } else {
        //not logged in
        let currentCart = state.cart;
        let course = currentCart.find((itm) => itm.courseId == action.payload.courseId);
        if (course) {
          let newslectedCourse = [];
          action.payload.selectedCourseType.forEach((itm) => {
            if (!course.selectedCourseType.includes(itm)) {
              newslectedCourse.push(itm);
            }
          });
          let selectedCourseIndex = currentCart.findIndex(
            (itm) => itm.courseId == action.payload.courseId
          );
          currentCart[selectedCourseIndex].selectedCourseType = [
            ...currentCart[selectedCourseIndex].selectedCourseType,
            ...newslectedCourse,
          ];
          localStorage.setItem("cartData", JSON.stringify(currentCart));
          cookie.set("cart_count", currentCart.length);
          return { ...state, cart: [...currentCart], cart_count: currentCart.length };
        } else {
          localStorage.setItem("cartData", JSON.stringify([...state.cart, action.payload]));
          let cartcount = state.cart.length + 1;
          cookie.set("cart_count", cartcount);
          return { ...state, cart: [...state.cart, action.payload], cart_count: cartcount };
        }
      }

    case actionTypes.REMOVE_FROM_CART: // Remove from cart
      // cookie.remove("couponData"); // empty coupon data while add/remove new product
      // state.couponData = null; // empty coupon data while add/remove new product
      if (authData) {
        localStorage.setItem("cartData", JSON.stringify(action.payload));
        cookie.set("cart_count", action.payload.length);
        return { ...state, cart: action.payload, cart_count: action.payload.length };
      } else {
        // remove from store
        let currentCart = state.cart;
        let courseIndex = currentCart.findIndex((itm) => itm.courseId == action.payload.courseId);
        if (courseIndex != -1) {
          let temp = currentCart[courseIndex].selectedCourseType;
            let courseTypeIndex = temp.findIndex((itm) => itm == action.payload.productType);
            if (courseTypeIndex != -1) {
              currentCart[courseIndex].selectedCourseType.splice(courseTypeIndex, 1);
              if (currentCart[courseIndex].selectedCourseType.length == 0) {
                currentCart.splice(courseIndex, 1);
              }
          }
        }
        localStorage.setItem("cartData", JSON.stringify(currentCart));
        cookie.set("cart_count", currentCart.length);
        return { ...state, cart: [...currentCart], cart_count: currentCart.length };
      }

    case actionTypes.CLEAR_CART: // Clear cart
      cookie.remove("couponData"); // empty coupon data while add/remove new product
      state.couponData = null; // empty coupon data while add/remove new product
      cookie.remove("cart_id");
      cookie.remove("cartData");
      return {
        ...state,
        cart: [],
      };

    case actionTypes.ADD_SUBSCRIPTION: // add subscription datas
      cookie.set("subscriptionData", JSON.stringify(action.payload.datas));
      const subscriptionData = {
        ...state,
        subscription: action.payload.datas,
      };
      return subscriptionData;

    case actionTypes.UPDATE_COUPON_DETAILS: // add coupon datas
      cookie.set("couponData", JSON.stringify(action.payload));
      const couponData = {
        ...state,
        couponData: action.payload,
      };
      return couponData;

    case actionTypes.GET_CART_DETAILS: // add subscription datas Not in use
      cookie.remove("couponData"); // empty coupon data while add/remove new product
      state.couponData = null; // empty coupon data while add/remove new product
      cookie.set("cartData", JSON.stringify(action.payload), { expires: 365 });
      return {
        ...state,
        cart: action.payload,
      };
    case actionTypes.UPDATE_CART_STATE_AFTER_LOGIN:
      localStorage.setItem("cartData", JSON.stringify(action.payload));
      cookie.set("cart_count", action.payload.length);
      cookie.set("updatecartAfterLogin", false);
      return {
        ...state,
        cart: action.payload,
        cart_count: action.payload.length,
        updateaftersignin: false,
      };

    case actionTypes.UPDATE_CART_AFTER_SIGNIN:
      cookie.set("updatecartAfterLogin", action.payload);
      return {
        ...state,
        updateaftersignin: action.payload,
      };
    case actionTypes.STORE_CART_WHEN_GETCARTDETAILS:
      localStorage.setItem("cartData", JSON.stringify(action.payload));
      cookie.set("cart_count", action.payload.length);
      return {
        ...state,
        cart: action.payload,
        cart_count: action.payload.length,
      };
    case actionTypes.CLEAR_CARTS:
      localStorage.setItem("cartData", JSON.stringify([]));
      cookie.set("cart_count", 0);
      return {
        ...state,
        cart: [],
        cart_count: 0,
      };
    case actionTypes.GET_CART_COUNT:
      cookie.set("cart_count", action.payload);
      return { ...state, cart_count: action.payload };
    default:
      return state;
  }
};

// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage(cookieName) {
  try {
    const serialisedState =
      cookieName == "cartData" && typeof window !== "undefined"
        ? localStorage.getItem("cartData")
        : cookie.get(cookieName);
    if (typeof serialisedState == "undefined") return undefined;
    // console.log(serialisedState[0])
    return JSON.parse(serialisedState);
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export default cartReducer;
