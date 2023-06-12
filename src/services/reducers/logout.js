import {
    LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL, LOGOUT_CLEAR
  } from '../actions/logout';

  export const initialState = {
    logoutRequest: false,
    logoutFail: false, 
    logoutSuccess: false 
  };

  export const logoutReducer = (state = initialState, action) => 
  {
      switch (action.type) {
        case LOGOUT: {
            return {
                ...state,
                logoutRequest:true,
                logoutFail:false, 
                logoutSuccess:false
            };
        }
        case LOGOUT_SUCCESS: {
            return {
                logoutRequest: false, 
                logoutFail: false,
                logoutSuccess: true
            };
        }
        case LOGOUT_FAIL: {
            return {
                ...state,
                logoutRequest: false, 
                logoutFail: true,
            };
        }
        case LOGOUT_CLEAR: {
            return {
                ...state,
                logoutRequest: false, 
                logoutFail: false,
                logoutSuccess: false
            };
        }
        default: {
            return state;
        }
      }
  }