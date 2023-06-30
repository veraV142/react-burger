import {
    PASSWORD_RESET, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAIL,
    PASSWORD_NEW, PASSWORD_NEW_SUCCESS, PASSWORD_NEW_FAIL, IPasswordAction, 
  } from '../actions/password';

  export type IPasswordReducerState = {
    passwordResetRequest: boolean,
    passwordResetFail: boolean, 
    passwordResetComplete: boolean, 

    passwordNewRequest: boolean,
    passwordNewFail: boolean, 
    passwordNewComplete: boolean, 
    
  };

  export const initialState:IPasswordReducerState = {
    passwordResetRequest: false,
    passwordResetFail: false, 
    passwordResetComplete: false, 

    passwordNewRequest: false,
    passwordNewFail: false, 
    passwordNewComplete: false, 
    
  };

  export const passwordReducer = (state = initialState, action:IPasswordAction):IPasswordReducerState => 
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
                    ...state,
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
                ...state,
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