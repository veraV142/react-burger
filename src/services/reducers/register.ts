import { TUser } from '../../utils/data';
import {
    REGISTER, REGISTER_SUCCESS, REGISTER_FAIL, IRegisterAction
  } from '../actions/register';

  export interface IRegisterReducerState {
    registerRequest: boolean,
    registerFail: boolean, 
    data?: TUser
  }

  export const initialState : IRegisterReducerState = {
    registerRequest: false,
    registerFail: false, 
    data: undefined 
  };

  export const registerReducer = (state = initialState, action:IRegisterAction):IRegisterReducerState  => 
  {
      switch (action.type) {
        case REGISTER: {
            return {
                ...state,
                registerRequest:true,
                registerFail:false, 
                data:undefined
            };
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
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
                data:undefined
            };
        }
        default: {
            return state;
        }
      }
  }