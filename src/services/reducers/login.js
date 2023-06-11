  import {
    LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_CLEAR, LOGIN_FROM_ROUTE 
  } from '../actions/login';

  export const initialState = {
    loginRequest: false,
    loginFail: false, 
    data: null, 
    loginSuccess: false, 
    loginFromRoute: '/'
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
                ...state,
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
        case LOGIN_FROM_ROUTE: {
            console.log(`LOGIN_FROM_ROUTE ${action.fromRoute}`);
            return {
                ...state,
                loginFromRoute: action.fromRoute 
            };
        }
        default: {
            return state;
        }
      }
  }