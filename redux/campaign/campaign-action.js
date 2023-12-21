import * as actionTypes from "./campaign-types";

export const OfferStart = () =>{
    return async (dispatch) =>{
        function onSuccess (){
            dispatch({
                type: actionTypes.SET_OFFER,
                payload: true
            })
        }
        return onSuccess();
    }
}

export const offerClear = () =>{
    return async (dispatch) =>{
        function onSuccess (){
            dispatch({
                type: actionTypes.CLEAR_OFFER,
                payload: false
            })
        }
        return onSuccess();
    }
}

export const StoreCampaignInfo = (data)=>{
    return async(dispatch)=>{
        function onSuccess(data){
            dispatch({
                type:actionTypes.STORE_CAMPAIGN_DETAILS,
                payload:data
            })
        }

        return onSuccess(data)
    }
}