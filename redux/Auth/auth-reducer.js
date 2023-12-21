import * as actionTypes from "./auth-types";
import cookie from "js-cookie";

const INITIAL_STATE = {
  authDataRegister: {},
  loginmessage:{},
  userData: loadFromLocalStorage("userData") || null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.REGISTER:
      if (action.payload.result.data && action.payload.result.data.token) {
        // storing user token
        if (action.payload.result.data.user_id) {
          cookie.set("userData", JSON.stringify(action.payload.result));
        }
      }
      return {
        ...state,
        authDataRegister: action.payload.result,
        userData: action.payload.result.status === "error" || action.payload.result.data==null || action.payload.result.msg === "User registered"? null : {...action.payload.result},
      };
    case actionTypes.LOGIN:
      if (action.payload.result.data && action.payload.result.data.token) {
        // storing user token
        cookie.set("userData", JSON.stringify(action.payload.result));
      }
      return {
        ...state,
        loginmessage: action.payload.result,
        userData: action.payload.result.status === "error" || action.payload.result.data==null || action.payload.result.msg === "User registered"? null : action.payload.result,
      };
    case actionTypes.LOGOUT:
      localStorage.clear();
      cookie.remove("userData");
      cookie.remove("userAuth");
      cookie.remove("userData", { path: "/", domain: ".whizlabs.org" });
      cookie.remove("userData", { path: "/", domain: ".whizlabs.com" });
      cookie.remove("userAuth", { path: "/", domain: ".whizlabs.org" });
      cookie.remove("userAuth", { path: "/", domain: ".whizlabs.com" });
      cookie.remove("labDetails");
      cookie.remove("creditPoints");
      cookie.remove("cart_id");
      cookie.remove("cartData");
      cookie.remove("couponData");
      cookie.remove("subscriptionData");
      cookie.remove("is_socialLogin");
      cookie.remove('whislistData')
      cookie.remove("user_bought");
      cookie.remove('client')
      if (localStorage) localStorage.clear();
      return {
        ...state,
        authDataRegister: {},
        userData: null,
      };
    case actionTypes.RESELLR_LOGIN:
      if (action.payload.result.data && action.payload.result.data.token) {
        // storing user token
        cookie.set("userData", JSON.stringify(action.payload.result));
      }
      return {
        ...state,
        userData: action.payload.result,
      };
    case actionTypes.SOCIAL_LOGIN:
      if (action.payload.result.data && action.payload.result.data.token) {
        // storing user token
        cookie.set("userData", JSON.stringify(action.payload.result));
        cookie.set("is_socialLogin", "true");
      }
      return {
        ...state,
        userData: action.payload.result,
      };
    default:
      return state;
  }
};

function loadFromLocalStorage(cookieName) {
  try {
    const serialisedState = cookie.get(cookieName);
    if (typeof serialisedState == "undefined") return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export default authReducer;

// if (document) {
//   document.cookie = `${document.cookie
//     .split(";")
//     .find((row) => row.startsWith(" cartId"))}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;`;
//   document.cookie = `${document.cookie
//     .split(";")
//     .find((row) => row.startsWith(" userData"))}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;`;
//   document.cookie = `${document.cookie
//     .split(";")
//     .find((row) => row.startsWith(" cartData"))}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;`;
//   document.cookie = `${document.cookie
//     .split(";")
//     .find((row) =>
//       row.startsWith(" is_socialLogin")
//     )}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;`;
//   document.cookie = `${document.cookie
//     .split(";")
//     .find((row) =>
//       row.startsWith(" laravel_session")
//     )}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;`;
// }
