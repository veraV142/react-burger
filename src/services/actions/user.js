import { getAuthUser, authToken, saveAuthUser } from '../../utils/burger-api';
import { getCookie, saveTokens } from '../../utils/utils';


export const TOKEN_EXPIRED = 'TOKEN_EXPIRED'

export const GET_USER = 'GET_USER'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAIL = 'GET_USER_FAIL'

export const SAVE_USER = 'SAVE_USER'
export const SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS'
export const SAVE_USER_FAIL = 'SAVE_USER_FAIL'

export function withCheckToken( dispatch, getUser, failAction ) {
    const accessToken = getCookie('accessToken');
    if (accessToken===null || accessToken===undefined) {
        const refreshToken = getCookie('refreshToken');
        authToken(refreshToken)
          .then(response=> {
            if (response.success === 'true') {
                saveTokens(response.accessToken, response.refreshToken);
                getUser();
            } 
            else {
                dispatch({ type: failAction });
            }
          })
          .catch(error => {
            dispatch({ type: failAction });
          });
    }
    else {
        getUser();
    }
}

export function authGetUserAndGetResult(token) {
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
                    console.log(`GET_USER_FAIL  ${response}`);
                    dispatch({ type: GET_USER_FAIL });
                }
                })
                .catch((error) => 
                {
                    console.log(`GU_ERROR  ${error}`);
                    if (error.message === 'jwt expired') {
                        dispatch({ type: TOKEN_EXPIRED });
                    }
                    else 
                        dispatch({ type: GET_USER_FAIL });
                })
        };

        withCheckToken(dispatch, getUser, GET_USER_FAIL);
    }
}

export function authSaveUserAndGetResult(name, email) {
    return function(dispatch) {
        dispatch({ type: SAVE_USER });

        const saveUser = () => {
            saveAuthUser(name, email)
                .then((response) => {
                if (response.success === true) 
                {
                    console.log('SAVE_USER_SUCCESS');
                    dispatch({ type: SAVE_USER_SUCCESS, email: response.user.email, name: response.user.name });
                }
                else {
                    console.log(`SAVE_USER_FAIL  ${response}`);
                    dispatch({ type: SAVE_USER_FAIL });
                }
                })
                .catch((error) => 
                {
                    console.log(`GU_ERROR  ${error}`);
                    if (error.message === 'jwt expired') {
                        dispatch({ type: TOKEN_EXPIRED });
                    }
                    else 
                        dispatch({ type: SAVE_USER_FAIL });
                })
        };

        withCheckToken(dispatch, saveUser, SAVE_USER_FAIL);
    }
}
    