import cookie from "js-cookie";
const INITIAL_STATE = {
   course_bought: loadFromLocalStorage("user_bought") || null,
   notified_course:loadFromLocalStorage("notified") || null
}

export const userCourseReducer = (state= INITIAL_STATE,action)=>{
    switch(action.type)
    {
        case "ADD_COURSE":
            const new_course = action.payload.result
            cookie.set("user_bought",JSON.stringify(action.payload.result))
        return{
            ...state,
            course_bought:new_course
        }
        case "CLEAR":
          cookie.remove("user_bought")
          cookie.remove("notified")
          return {
            ...state,
            course_bought:[]
          }
          case "GETNOTIFIED":
            // console.log("hard",action.payload)
            const notified = action.payload.result;
            cookie.set("notified",JSON.stringify(action.payload.result))
            // console.log("notified",notified)
            return{
              ...state,
              notified_course : notified
            }
        default:
           return state;
    }
}

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


  export default userCourseReducer;