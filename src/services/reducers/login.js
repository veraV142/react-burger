  import {
    LOGIN, LOGIN_SUCCESS, LOGIN_FAIL 
  } from '../actions/login';

  export const initialState = {
    loginRequest: false,
    loginFail: false, 
    data: null, 
  };

  export const loginReducer = (state = initialState, action) => 
  {
      switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                loginRequest:true,
                data:null,
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
                }
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
        default: {
            return state;
        }
      }
  }