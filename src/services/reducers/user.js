  import {
    GET_USER, GET_USER_SUCCESS, GET_USER_FAIL, TOKEN_EXPIRED, 
    SAVE_USER, SAVE_USER_SUCCESS, SAVE_USER_FAIL, TOKEN_INVALID
  } from '../actions/user';

  export const initialState = {
    getUserRequest: false,
    getUserFail: false, 
    data: null,
    tokenExpired: false,
    tokenInvalid: false,
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
                tokenInvalid: false,
                getUserRequest:true,
                getUserFail:false, 
                data:null
            };
        }
        case GET_USER_SUCCESS: {
            console.log(`GET_USER_SUCCESS email=${action.email}`);
            return {
                ...state,
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
                data: { isError:true, name:'не определено', email:'не определено'  }
            };
        }
        case SAVE_USER: {
            console.log('SAVE_USER');
            return {
                ...state,
                tokenExpired: false,
                saveUserRequest:true,
                saveUserFail:false,
                saveUserSuccess:false,
                tokenInvalid: false,
            };
        }
        case SAVE_USER_SUCCESS: {
            console.log(`SAVE_USER_SUCCESS email=${action.email} name=${action.name}`);
            return {
                ...state,
                saveUserRequest: false, 
                saveUserFail: false,
                saveUserSuccess:true,
                data: {
                    email: action.email,
                    name: action.name
                }
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
                data:{ isError:true, name:'не определено', email:'не определено'  },
                saveUserSuccess:false
            };
        }
        case TOKEN_INVALID: {
            console.log(`TOKEN_INVALID`);
            return {
                ...state,
                tokenInvalid: true,
                getUserRequest: false, 
                saveUserRequest: false, 
                getUserFail: true,
                saveUserFail: true,
                data:{ isError:true, name:'не определено', email:'не определено'  },
                saveUserSuccess:false
            };
        }
        default: {
            return state;
        }
      }
  }