import { authLogin } from '../../utils/burger-api';
import { TUser } from '../../utils/data';
import { saveTokens } from '../../utils/utils'; 
import { AppDispatch, AppThunk } from '../types';

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGIN_CLEAR = 'LOGIN_CLEAR'
export const LOGIN_FROM_ROUTE = 'LOGIN_FROM_ROUTE'
export const LOGIN_DEFAULT = 'LOGIN_DEFAULT'

export interface ILoginDefault {
	type: typeof LOGIN_DEFAULT;
}
export interface ILogin {
	type: typeof LOGIN;
}
export interface ILoginSuccess {
	type: typeof LOGIN_SUCCESS;
  user:TUser;
  accessToken:string;
  refreshToken: string;
}
export interface ILoginFail {
	type: typeof LOGIN_FAIL;
}
export interface ILoginClear {
	type: typeof LOGIN_CLEAR;
}
export interface ILoginLoginFromRoute {
	type: typeof LOGIN_FROM_ROUTE;
  fromRoute:string;
}

export type TAuthLoginAndGetResultAction = | ILogin | ILoginSuccess | ILoginFail | ILoginClear | ILoginLoginFromRoute | ILoginDefault

export const authLoginAndGetResult:AppThunk = (email:string, password:string) => {
    return function(dispatch:AppDispatch) {
        dispatch({ type: LOGIN });
        authLogin(email, password)
            .then((response) => {
              if (response.success === true) 
              {
                console.log('LOGIN_SUCCESS');
                saveTokens(response.accessToken, response.refreshToken);
                dispatch({ type: LOGIN_SUCCESS, user: response.user, accessToken: response.accessToken, refreshToken: response.refreshToken });
              }
              else {
                console.log('LOGIN_FAIL');
                dispatch({ type: LOGIN_FAIL });
              }
            })
            .catch((error) => {
                console.log('LOGIN_FAIL');
                dispatch({ type: LOGIN_FAIL });
            })
    }
}