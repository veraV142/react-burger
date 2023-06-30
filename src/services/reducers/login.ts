  import { TUser } from '../../utils/data';
import {
    LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_CLEAR, LOGIN_FROM_ROUTE, TAuthLoginAndGetResultAction 
  } from '../actions/login';

  export interface ILoginReducerState {
    loginRequest: boolean,
    loginFail: boolean, 
    data?: TUser, 
    loginSuccess: boolean, 
    loginFromRoute: string
  }

  export const initialState: ILoginReducerState = {
    loginRequest: false,
    loginFail: false, 
    data: undefined, 
    loginSuccess: false, 
    loginFromRoute: '/'
  };

  export const loginReducer = (state = initialState, action:TAuthLoginAndGetResultAction):ILoginReducerState => 
  {
      switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                loginRequest:true,
                data:undefined,
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
                data:undefined
            };
        }
        case LOGIN_CLEAR: {
            return {
                ...state,
                loginRequest: false, 
                loginFail: false,
                data:undefined,
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