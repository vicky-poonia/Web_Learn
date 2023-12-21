import { createStore, applyMiddleware } from "redux";
import reducers from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import cookie from "js-cookie";
import axios from "axios";
import thunk from "redux-thunk";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import * as CryptoJS from "crypto-js";
const secrect_key = process.env.NEXT_PUBLIC_SECRET_KEY;
// import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync';

const config = {};
const middlewares = [thunk /* createStateSyncMiddleware(config) */];

function saveToLocalStorage(state) {
  try {
    const {
      cart: { cart, couponData },
      authData,
      ipDetails,
    } = state;
    
    const currency_type = ipDetails?.currency_detail?.type;
    const userId =
      authData.userData && authData.userData.data && authData.userData.data.user_id
        ? authData.userData.data.user_id
        : null;
    const userToken =
      authData.userData && authData.userData.data && authData.userData.data.token
        ? authData.userData.data.token
        : null;
    const serialisedState = JSON.stringify(cart);

    if (userId && currency_type) {
      let cartDetails = [];
      let coupon_code = null;
      let total_price = 0;
      let discounted_price = 0;
      let dis = 0;
      let currency = "";
      cart.forEach((element) => {
        let temp = {
          course_image: element.courseImage,
          course_name: element.courseName,
          course_slug: element.courseSlug,
          course_id: element.courseId,
          course_type: element.courseType,
          course_page_id:element.course_page_id,
          selectedCourseType:element.selectedCourseType,
          strike_out_price : 0,
          price_bought : 0,
          course_details: [],
          whizcard:element.whizcard,
          isCampaign:element.isCampaign ? true : null
        };
        // console.log(element.selectedCourseType)
        if (element.courseType.includes("pt")) {
          let ptData = {
            course_type: "pt",
            total_price: element.PtSalePrice,
            discounted_price: element.PtRegPrice,
          };
          temp.course_details.push(ptData);
          if(element.selectedCourseType.includes("pt"))
          {
            total_price += parseFloat(element.PtSalePrice[currency_type]);
            dis +=  parseFloat(element.PtRegPrice[currency_type]);
          }
        }
        if (element.courseType.includes("oc")) {
          let ocData = {
            course_type: "oc",
            total_price: element.OcSalePrice,
            discounted_price: element.OcRegPrice,
          };
          temp.course_details.push(ocData);
          if(element.selectedCourseType.includes("oc"))
          {
            total_price += parseFloat(element.OcSalePrice[currency_type]);
            dis += parseFloat(element.OcRegPrice[currency_type])
          }
        }
        if (element.courseType.includes("lab")) {
          let labData = {
            course_type: "lab",
            total_price: element.LabSalePrice,
            discounted_price: element.LabRegPrice,
          };
          temp.course_details.push(labData);
          if(element.selectedCourseType.includes("lab"))
          {
            total_price += parseFloat(element.LabSalePrice[currency_type]);
            dis += parseFloat(element.LabRegPrice[currency_type])
          }
        }
        if (element.courseType.includes("sandbox")) {
          // console.log("storejs",element)
          let sandboxData = {
            course_type: "sandbox",
            total_price: element.SandboxSalePrice,
            discounted_price: element.SandboxRegPrice,
            sandbox_validity:element.sandbox_validity
          };
          temp.course_details.push(sandboxData);
          if(element.selectedCourseType.includes("sandbox") || element.selectedCourseType.includes('sandbox-1') || element.selectedCourseType.includes('sandbox-3') || element.selectedCourseType.includes('sandbox-6'))
          {
            total_price += parseFloat(element.SandboxSalePrice[currency_type]);
            dis += parseFloat(element.SandboxRegPrice[currency_type])
          }
        }
        temp.strike_out_price = dis;
        temp.price_bought = (dis - total_price)
        cartDetails.push(temp);
      });
      // console.log(cartDetails)
      if (couponData && couponData.coupon_code && couponData.discounted_price) {
        discounted_price = couponData.discounted_price;
        coupon_code = couponData.coupon_code;
        total_price = couponData.total_price;
        currency = couponData.currency_type.toUpperCase();
      } else {
        discounted_price = total_price;
        currency = currency_type ? currency_type.toUpperCase() : "";
      }
      if (cart.length) {
        const ciphertext = CryptoJS.AES.encrypt(
          JSON.stringify({
            user_id: userId,
            cart_id: cookie.get("cart_id") || null,
            cart_details: cartDetails,
            total_price: total_price,
            discounted_price:discounted_price,
            coupon_code: coupon_code,
            currency_type: currency,
          }),
          process.env.NEXT_PUBLIC_SECRET_KEY
        ).toString();

        // storing data to DB
        axios
          .post(
            baseUrl + "/cart/",
            {
              data: ciphertext,
            },
            {
              headers: {
                Authorization: userToken,
              },
            }
          )
          .then(({ status, statusText, data: { data } }) => {
            if (status === 500) {
              throw new Error(statusText);
            }

            if (data.cart_id && data.user_id) {
              cookie.set("cart_id", data.cart_id);
              // if (localStorage) localStorage.setItem("cart_id", data.cart_id);
            }
          });
      } else {
        const ciphertext = CryptoJS.AES.encrypt(
          JSON.stringify({
            user_id: userId,
            // cart_id: localStorage ? localStorage.getItem("cart_id") : null,
            cart_id: cookie.get("cart_id") || null,
            cart_details: JSON.stringify([]),
            total_price: 0,
            discounted_price: 0,
            coupon_code: null,
            currency_type: null,
          }),
          process.env.NEXT_PUBLIC_SECRET_KEY
        ).toString();

        axios
          .post(
            baseUrl + "/cart/",
            {
              data: ciphertext,
            },
            {
              headers: {
                Authorization: userToken,
              },
            }
          )
          .then(({ status, statusText, data: { data } }) => {
            if (status === 500) {
              throw new Error(statusText);
            }
            if (data.cart_id && data.user_id) {
              cookie.set("cart_id", data.cart_id);
              // if (localStorage) localStorage.setItem("cart_id", data.cart_id);
            }
          });
      }
    }
    cookie.set("cartData", serialisedState, { expires: 365 });
  } catch (e) {
    console.error(e);
  }
}

async function updateWhislist(state) {
  try {
    const userId =
      state.authData.userData &&
      state.authData.userData.data &&
      state.authData.userData.data.user_id
        ? state.authData.userData.data.user_id
        : null;
    if (userId) {
      const getWhislist = await axios.get(baseUrl + "/users/wishlist", {
        params: {
          user_id: userId,
        },
      });
      if (getWhislist.data && getWhislist.data.userWishlistData) {
        let results = [];
        getWhislist.data.userWishlistData.map((item) => {
          results.push(item.course_id);
        });
        cookie.set("whislistData", JSON.stringify(results));
      }
    } else {
      cookie.remove("whislistData");
    }
  } catch (e) {
    console.error(e);
  }
}

// async function updateuserCourse(state) {
//   try {
//     const userId =
//       state.authData.userData &&
//       state.authData.userData.data &&
//       state.authData.userData.data.user_id
//         ? state.authData.userData.data.user_id
//         : null;
//     if (userId) {
//       axios.get(`${baseUrl}/users/courses/?user_id=${userId}`).then((resp) => {
//         if (resp && resp.data && resp.data.data) {
//             let datato_send = []
//             resp.data.data.map((itm)=>{
//                 datato_send.push(itm.course_id)
//             })
//             cookie.set("user_bought", JSON.stringify(datato_send))   
//         }
//     })
//     } else {
//       cookie.remove("user_bought");
//     }
//   } catch (e) {
//     console.error(e);
//   }
// }


const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middlewares)));

// initStateWithPrevTab(store);

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
store.subscribe(() => {
  // saveToLocalStorage(store.getState()), updateWhislist(store.getState());
});

export default store;
