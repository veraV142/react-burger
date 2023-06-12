import {
    PASSWORD_RESET, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAIL,
    PASSWORD_NEW, PASSWORD_NEW_SUCCESS, PASSWORD_NEW_FAIL, 
  } from '../actions/password';

  export const initialState = {
    passwordResetRequest: false,
    passwordResetFail: false, 
    passwordResetComplete: false, 

    passwordNewRequest: false,
    passwordNewFail: false, 
    passwordNewComplete: false, 
    
  };

  export const passwordReducer = (state = initialState, action) => 
  {
      switch (action.type) {
            case PASSWORD_NEW: {
                return {
                    ...state,
                    passwordNewRequest:true,
                    passwordNewComplete:false
                };
            }
            case PASSWORD_NEW_SUCCESS: {
                return {
                    passwordNewRequest: false, 
                    passwordNewFail: false,
                    passwordNewComplete: true
                };
            }
            case PASSWORD_NEW_FAIL: {
                return {
                    ...state,
                    passwordNewRequest: false, 
                    passwordNewFail: true
                };
            }
            case PASSWORD_RESET: {
              return {
                ...state,
                passwordResetRequest:true,
                passwordResetComplete:false
              };
          }
          case PASSWORD_RESET_SUCCESS: {
            return {
                passwordResetRequest: false, 
                passwordResetFail: false,
                passwordResetComplete: true
            };
        }
        case PASSWORD_RESET_FAIL: {
            return {
                ...state,
                passwordResetRequest: false, 
                passwordResetFail: true
              };
        }
        default: {
            return state;
        }
      }
  }