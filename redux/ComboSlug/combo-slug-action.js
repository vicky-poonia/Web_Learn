import * as actionTypes from './combo-slug-types'

export const addComboSlugAction = (slug)=>{
    return async (dispatch) =>{
        function onSuccess (slug){
            dispatch({
                type: actionTypes.ADD_SLUG,
                payload: slug
            })
        }
        return onSuccess(slug);
    }
}

export const removeComboSlug =()=>{
    return async(dispatch)=>{
        function onSuccess(){
            dispatch({
                type:actionTypes.REMOVE_SLUG,
                payload:null
            })
        }
        return onSuccess()
    }
}