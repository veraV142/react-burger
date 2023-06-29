import { passwordReset, newPassword } from '../../utils/burger-api';
import { clearTokens } from '../../utils/utils';
import { AppThunk } from '../types';

export const PASSWORD_RESET = 'PASSWORD_RESET'
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS'
export const PASSWORD_RESET_FAIL = 'PASSWORD_RESET_FAIL'
export const PASSWORD_NEW = 'PASSWORD_NEW'
export const PASSWORD_NEW_SUCCESS = 'PASSWORD_NEW_SUCCESS'
export const PASSWORD_NEW_FAIL = 'PASSWORD_NEW_FAIL'

export interface IPasswordReset {
	type: typeof PASSWORD_RESET;
}
export interface IPasswordResetSuccess {
	type: typeof PASSWORD_RESET_SUCCESS;
}
export interface IPasswordResetFail {
	type: typeof PASSWORD_RESET_FAIL;
}
export interface IPasswordNew {
	type: typeof PASSWORD_NEW;
}
export interface IPasswordNewSuccess {
	type: typeof PASSWORD_NEW_SUCCESS;
}
export interface IPasswordNewFail {
	type: typeof PASSWORD_NEW_FAIL;
}

export type IPasswordAction = |IPasswordReset|IPasswordResetSuccess|IPasswordResetFail|IPasswordNew|IPasswordNewSuccess|IPasswordNewFail

export const passwordNewAndGetResult:AppThunk = (password:string, code:string) => {
    return function(dispatch) {
        dispatch({ type: PASSWORD_NEW });
        newPassword(password, code)
            .then((response) => {
              if (response.success === true) 
              {
                  console.log('PASSWORD_NEW_SUCCESS');
                  dispatch({ type: PASSWORD_NEW_SUCCESS });
              }
              else {
                  dispatch({ type: PASSWORD_NEW_FAIL });
              }
            })
            .catch((error) => {
                dispatch({ type: PASSWORD_NEW_FAIL });
            })
    }
}

export const passwordResetAndGetResult:AppThunk = (email:string) => {
    return function(dispatch) {
        dispatch({ type: PASSWORD_RESET });
        passwordReset(email)
            .then((response) => {
              if (response.success === true) 
              {
                console.log('PASSWORD_RESET_SUCCESS');
                clearTokens();
                dispatch({ type: PASSWORD_RESET_SUCCESS });
              }
              else {
                dispatch({ type: PASSWORD_RESET_FAIL });
              }
            })
            .catch((error) => {
              dispatch({ type: PASSWORD_RESET_FAIL });
            })
    }
}