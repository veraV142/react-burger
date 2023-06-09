import {
    REGISTER, REGISTER_SUCCESS, REGISTER_FAIL
  } from '../actions/register';

  export const initialState = {
    registerRequest: false,
    registerFail: false, 
    data: null 
  };

  export const registerReducer = (state = initialState, action) => 
  {
      switch (action.type) {
        case REGISTER: {
            return {
                ...state,
                registerRequest:true,
                registerFail:false, 
                data:null
            };
        }
        case REGISTER_SUCCESS: {
            return {
                registerRequest: false, 
                registerFail: false,
                data: {
                    email: action.email, 
                    name: action.name, 
                    accessToken: action.accessToken,
                    refreshToken: action.refreshToken
                }
            };
        }
        case REGISTER_FAIL: {
            return {
                ...state,
                registerRequest: false, 
                registerFail: true,
                data:null
            };
        }
        default: {
            return state;
        }
      }
  }