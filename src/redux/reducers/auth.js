/* eslint-disable import/no-anonymous-default-export */

import {REGISTER_SUCCESS , REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL,LOGOUT} from "../actions/types";

const initialState = {
    // token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading:false,
    user:null,
    error:null
}


export default function (state=initialState , action){
    const {type, payload} = action;
    console.log(action)

    switch(type){
        case LOGIN_SUCCESS:
            return{
                ...state,
                ...payload,
                isAuthenticated:true,
                loading: false,
                error:null
                
            }
        
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false,
                error:null
            }
        case REGISTER_FAIL:  
        case LOGIN_FAIL:
        case LOGOUT:
            return {
                ...state,
                isAuthenticated:false,
                loading:false,
                user:null,
                error:payload
            }
            
        default:
            return state
    }
}