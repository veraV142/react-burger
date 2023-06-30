import { authRegister } from '../../utils/burger-api';
import { saveTokens } from '../../utils/utils';
import { AppThunk } from '../types';

export const REGISTER = 'REGISTER'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAIL = 'REGISTER_FAIL'

export interface IRegister {
	type: typeof REGISTER;
}
export interface IRegisterSuccess {
	type: typeof REGISTER_SUCCESS;
  email: string,
  name: string, 
  accessToken: string,
  refreshToken: string
}
export interface IRegisterFail {
	type: typeof REGISTER_FAIL;
}
export type IRegisterAction = |IRegister|IRegisterSuccess|IRegisterFail

export const authRegisterAndGetResult:AppThunk = (email:string, password:string, name:string) => {
    return function(dispatch) {
        dispatch({ type: REGISTER });
        authRegister(email, password, name)
            .then((response) => {
              if (response.success === true) 
              {
                  console.log(`REGISTER_SUCCESS accessToken=${response.accessToken} refreshToken=${response.refreshToken}`);
                  saveTokens(response.accessToken, response.refreshToken);
                  dispatch({ type: REGISTER_SUCCESS, 
                    email: response.user.email, name: response.user.name, accessToken: response.accessToken, refreshToken: response.refreshToken });
              }
              else {
                console.log(`REGISTER_FAIL ${response}`);
                  dispatch({ type: REGISTER_FAIL });
              }
            })
            .catch((error) => {
                dispatch({ type: REGISTER_FAIL });
            })
    }
}
