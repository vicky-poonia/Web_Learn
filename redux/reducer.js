import { combineReducers } from "redux";
import cartReducer from "./AddToCart/cart-reducer";
import searchCourseReducer from "./SearchAllCourses/search-reducer";
import authReducer from "./Auth/auth-reducer";
import whislistReducer from "./whislist/whislist-reducer"
import alertBoxReducer from "./AlertBox/alert-reducer"
import ipReducer from "./IpToLocation/ip-reducer"
import redirectReducer from "./Redirection/redirect-reducer"
import utmReducer from "./UTM/utm-reducer"
import profileReducer from "./UserProfile/profile-reducer"
import userCourseReducer from "./userCourse/usercourse-reducer"
import whizCardReducer from "./WhizCard/whizcard-reducer"
import enrollReducer from './UserEnrolled/enroll-reducer'
import clientReducer from './ClientOffer/client-reducer'
import campaignOfferReducer from './campaign/campaign-reducer'
import buttonClickReducer from './buttonClick/click-reducer'
import comboslugReducer from './ComboSlug/combo-slug-reducer'

const reducers = combineReducers({
  cart: cartReducer,
  searchAllCourses: searchCourseReducer,
  authData: authReducer,
  whislist: whislistReducer,
  alertBox: alertBoxReducer,
  ipDetails: ipReducer,
  redirectData: redirectReducer,
  utmData: utmReducer,
  userProfileData: profileReducer,
  userCourse: userCourseReducer,
  whizCard: whizCardReducer,
  enrolled : enrollReducer,
  client :clientReducer,
  timer:campaignOfferReducer,
  button:buttonClickReducer,
  combo_slug:comboslugReducer
});

export default reducers;
