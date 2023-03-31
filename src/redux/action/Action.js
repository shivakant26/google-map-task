import { ADD_LOCATION } from "../actionType"

export const addLocation = (data) =>{
    return{
        type:ADD_LOCATION,
        payload:data
    }
}
