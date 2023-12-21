import * as actionType from './enroll-types'
import axios from 'axios'
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const enrollCourseDetail = (user_id)=>{
    return async (dispatch)=>{
        function onSuccess(data){
            dispatch({
                type:actionType.ADD_TO_STATE,
                payload:data
            })
        }
        try{
           let resp =  await axios.get(`${baseUrl}/users/enrolled-courses-details?user_id=${user_id}`);
           return onSuccess(resp.data)
        }
        catch(e){
            console.log(e)
        }
    }
}

export const clearEnrolled = ()=>{
    return async (dispatch)=>{
        function onSuccess()
        {
            dispatch({
                type:actionType.REMOVE_FROM_STATE
            })
        }
        return onSuccess();
    }
}