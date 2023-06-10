  import {
    LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_CLEAR 
  } from '../actions/login';

  export const initialState = {
    loginRequest: false,
    loginFail: false, 
    data: null, 
    loginSuccess: false
  };

  export const loginReducer = (state = initialState, action) => 
  {
      switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                loginRequest:true,
                data:null,
                loginSuccess:false
            };
        }
        case LOGIN_SUCCESS: {
            return {
                loginRequest: false, 
                loginFail: false,
                data: {
                    email: action.user.email, 
                    name: action.user.name, 
                    accessToken: action.accessToken,
                    refreshToken: action.refreshToken
                },
                loginSuccess:true
            };
        }
        case LOGIN_FAIL: {
            return {
                ...state,
                loginRequest: false, 
                loginFail: true,
                data:null
            };
        }
        case LOGIN_CLEAR: {
            return {
                ...state,
                loginRequest: false, 
                loginFail: false,
                data:null,
                loginSuccess:false
            };
        }
        default: {
            return state;
        }
      }
  }