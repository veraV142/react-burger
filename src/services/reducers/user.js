  import {
    GET_USER, GET_USER_SUCCESS, GET_USER_FAIL, TOKEN_EXPIRED, 
    SAVE_USER, SAVE_USER_SUCCESS, SAVE_USER_FAIL,
  } from '../actions/user';

  export const initialState = {
    getUserRequest: false,
    getUserFail: false, 
    data: null,
    tokenExpired: false,
    saveUserRequest: false,
    saveUserFail: false,  
    saveUserSuccess: false,
  };

  export const userReducer = (state = initialState, action) => 
  {
      switch (action.type) {
        case GET_USER: {
            console.log('GET_USER');
            return {
                ...state,
                tokenExpired: false,
                getUserRequest:true,
                getUserFail:false, 
                data:null
            };
        }
        case GET_USER_SUCCESS: {
            console.log(`GET_USER_SUCCESS email=${action.email}`);
            return {
                getUserRequest: false, 
                getUserFail: false,
                data: {
                    email: action.email,
                    name: action.name
                }
            };
        }
        case GET_USER_FAIL: {
            console.log(`GET_USER_FAIL  ${action}`);
            return {
                ...state,
                getUserRequest: false, 
                getUserFail: true,
                data:null
            };
        }
        case SAVE_USER: {
            console.log('SAVE_USER');
            return {
                ...state,
                tokenExpired: false,
                saveUserRequest:true,
                saveUserFail:false,
                saveUserSuccess:false
            };
        }
        case SAVE_USER_SUCCESS: {
            console.log(`SAVE_USER_SUCCESS email=${action.email}`);
            return {
                saveUserRequest: false, 
                saveUserFail: false,
                saveUserSuccess:true
            };
        }
        case SAVE_USER_FAIL: {
            console.log(`SAVE_USER_FAIL  ${action}`);
            return {
                ...state,
                saveUserRequest: false, 
                saveUserFail: true,
                saveUserSuccess:false
            };
        }
        case TOKEN_EXPIRED: {
            console.log(`TOKEN_EXPIRED`);
            return {
                ...state,
                tokenExpired: true,
                getUserRequest: false, 
                saveUserRequest: false, 
                getUserFail: true,
                saveUserFail: true,
                data:null,
                saveUserSuccess:false
            };
        }
        default: {
            return state;
        }
      }
  }