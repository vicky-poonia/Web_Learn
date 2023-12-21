import * as actionTypes from "./search-types";

const INITIAL_STATE = {
  searchCourses: [],
  searchValue: ""
};

const searchCourseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_ALL_COURSES:
      return {
        ...state,
        searchCourses: action.payload.result,
        searchValue: action.payload.searchValue
      };
    default:
      return state;
  }
};

export default searchCourseReducer;
