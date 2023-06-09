import {
    TOKEN, TOKEN_SUCCESS, TOKEN_FAIL
  } from '../actions/token';

  export const initialState = {
    tokenRequest: false,
    tokenFail: false, 
    data: null 
  };

  export const tokenReducer = (state = initialState, action) => 
  {
      switch (action.type) {
        case TOKEN: {
            return {
                ...state,
                tokenRequest:true,
                tokenFail:false, 
                data:null
            };
        }
        case TOKEN_SUCCESS: {
            return {
                tokenRequest: false, 
                tokenFail: false,
                data: {
                    accessToken: action.accessToken,
                    refreshToken: action.refreshToken
                }
            };
        }
        case TOKEN_FAIL: {
            return {
                ...state,
                tokenRequest: false, 
                tokenFail: true,
                data:null
            };
        }
        default: {
            return state;
        }
      }
  }