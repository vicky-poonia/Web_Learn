import * as actionTypes from "./whizcard-types";

export const whizCardLoader = (input) =>{
    return async (dispatch) =>{
        function onSuccess (data){
            dispatch({
                type: actionTypes.DOWNLOAD_WHIZCARD,
                payload: data
            })
        }
        return onSuccess(input);
    }
}