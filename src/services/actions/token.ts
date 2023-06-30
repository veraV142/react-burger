import { IAuthResponse, authToken } from '../../utils/burger-api';
import { TUserLoadResponse } from '../../utils/data';
import { saveTokens } from '../../utils/utils';
import { AppThunk } from '../types';

export const TOKEN = 'TOKEN'
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS'
export const TOKEN_FAIL = 'TOKEN_FAIL'

export interface IToken {
	type: typeof TOKEN;
}
export interface ITokenSuccess {
	type: typeof TOKEN_SUCCESS;
    accessToken: string,
    refreshToken: string
}
export interface ITokenFail {
	type: typeof TOKEN_FAIL;
}

export type ITokenAction = |IToken|ITokenSuccess|ITokenFail

export const authTokenAndGetResult:AppThunk = (token:string) => {
    return function(dispatch) {
        dispatch({ type: TOKEN });
        authToken(token)
            .then((response:IAuthResponse) => {
              if (response.success === true) 
              {
                  console.log('TOKEN_SUCCESS');
                  saveTokens(response.accessToken??'', response.refreshToken??'');
                  dispatch({ type: TOKEN_SUCCESS, accessToken: response.accessToken, refreshToken: response.refreshToken });
              }
              else {
                  dispatch({ type: TOKEN_FAIL });
              }
            })
            .catch((error) => {
                console.log(`TOKEN_FAIL ${error.message}`);
                dispatch({ type: TOKEN_FAIL });
            })
    }
}