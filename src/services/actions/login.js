import { authLogin } from '../../utils/burger-api';
import { saveTokens } from '../../utils/utils'; 

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGIN_CLEAR = 'LOGIN_CLEAR'
export const LOGIN_FROM_ROUTE = 'LOGIN_FROM_ROUTE'

export function authLoginAndGetResult(email, password) {
    return function(dispatch) {
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