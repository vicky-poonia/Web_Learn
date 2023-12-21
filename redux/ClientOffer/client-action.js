import * as actionTypes from "./client-types";

export const clientLoader = (input) =>{
    return async (dispatch) =>{
        function onSuccess (){
            dispatch({
                type: actionTypes.CLIENT_OFFER,
                payload: true
            })
        }
        return onSuccess();
    }
}

export const clientClear = () =>{
    return async (dispatch) =>{
        function onSuccess (){
            dispatch({
                type: actionTypes.CLIENT_OFFER_REMOVE,
                payload: false
            })
        }
        return onSuccess();
    }
}