import { getAuthUser,saveAuthUser } from '../../utils/burger-api';
import { AppThunk } from '../types';


export const TOKEN_EXPIRED = 'TOKEN_EXPIRED'
export const TOKEN_INVALID = 'TOKEN_INVALID'
export const GET_USER = 'GET_USER'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAIL = 'GET_USER_FAIL'
export const SAVE_USER = 'SAVE_USER'
export const SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS'
export const SAVE_USER_FAIL = 'SAVE_USER_FAIL'

export interface ITokenExpired {
	type: typeof TOKEN_EXPIRED;
}
export interface ITokenInvalid {
	type: typeof TOKEN_INVALID;
}
export interface IGetUser {
	type: typeof GET_USER;
}
export interface IGetUserSuccess {
	type: typeof GET_USER_SUCCESS;
    email:string;
    name:string;
}
export interface IGetUserFail {
	type: typeof GET_USER_FAIL;
}
export interface ISaveUser {
	type: typeof SAVE_USER;
}
export interface ISaveUserSuccess {
	type: typeof SAVE_USER_SUCCESS;
    email:string;
    name:string;
}
export interface ISaveUserFail {
	type: typeof SAVE_USER_FAIL;
}

export type TAuthGetUserAndGetResultAction = |ITokenExpired|ITokenInvalid|IGetUser|IGetUserSuccess|IGetUserFail|ISaveUser|ISaveUserSuccess|ISaveUserFail

export const authGetUserAndGetResult: AppThunk = (token:string) => {
    return function(dispatch) {
        dispatch({ type: GET_USER });

        const getUser = () => {
            getAuthUser()
                .then((response) => {
                if (response.success === true) 
                {
                    console.log('GET_USER_SUCCESS');
                    dispatch({ type: GET_USER_SUCCESS, email: response.user.email, name: response.user.name });
                }
                else {
                    console.log(`GET_USER_FAIL  error=${response.message}`);
                    dispatch({ type: GET_USER_FAIL });
                }
                })
                .catch((error) => 
                {
                    dispatch({ type: GET_USER_FAIL });
                })
        };
        getUser();
    }
}

export const authSaveUserAndGetResult: AppThunk = (name:string, email:string, password:string) => {
    return function(dispatch) {
        dispatch({ type: SAVE_USER });

        const saveUser = () => {
            saveAuthUser(name, email, password)
                .then((response) => {
                if (response.success === true) 
                {
                    dispatch({ type: SAVE_USER_SUCCESS, email: response.user.email, name: response.user.name });
                }
                else {
                    console.log(`SAVE_USER_FAIL  ${response}`);
                    dispatch({ type: SAVE_USER_FAIL });
                }
                })
                .catch((error) => 
                {
                    dispatch({ type: SAVE_USER_FAIL });
                })
        };

        saveUser();
    }
}
    