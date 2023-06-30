import { authLogout } from '../../utils/burger-api';
import { clearTokens } from '../../utils/utils';
import { AppThunk } from '../types';

export const LOGOUT = 'LOGOUT'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAIL = 'LOGOUT_FAIL'
export const LOGOUT_CLEAR = 'LOGOUT_CLEAR'

export interface ILogout {
	type: typeof LOGOUT;
}
export interface ILogoutSuccess {
	type: typeof LOGOUT_SUCCESS;
}
export interface ILogoutFail {
	type: typeof LOGOUT_FAIL;
}
export interface ILogoutClear {
	type: typeof LOGOUT_CLEAR;
}

export type IAuthLogoutAndGetResultAction = |ILogout|ILogoutSuccess|ILogoutFail|ILogoutClear

export const authLogoutAndGetResult:AppThunk = (token:string) => {
    return function(dispatch) {
        console.log(`LOGOUT token=${token}`);
        dispatch({ type: LOGOUT });
        authLogout(token)
            .then((response) => {
              if (response.success === true) 
              {
                  console.log('LOGOUT_SUCCESS');
                  clearTokens();
                  dispatch({ type: LOGOUT_SUCCESS });
              }
              else {
                  dispatch({ type: LOGOUT_FAIL });
              }
            })
            .catch((error) => {
                console.log('LOGOUT_FAIL');
                console.log(error);
                dispatch({ type: LOGOUT_FAIL });
            })
    }
}