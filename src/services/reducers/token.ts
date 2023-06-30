import { TUser } from '../../utils/data';
import {
    TOKEN, TOKEN_SUCCESS, TOKEN_FAIL, ITokenAction
  } from '../actions/token';

  export interface ITokenReducerState {
    tokenRequest: boolean,
    tokenFail: boolean, 
    data?: TUser 
  };

  export const initialState = {
    tokenRequest: false,
    tokenFail: false, 
    data: undefined 
  };

  export const tokenReducer = (state = initialState, action:ITokenAction):ITokenReducerState => 
  {
      switch (action.type) {
        case TOKEN: {
            return {
                ...state,
                tokenRequest:true,
                tokenFail:false, 
                data:undefined
            };
        }
        case TOKEN_SUCCESS: {
            return {
                ...state,
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
                data:undefined
            };
        }
        default: {
            return state;
        }
      }
  }