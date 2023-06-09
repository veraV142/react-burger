import { authToken } from '../../utils/burger-api';
import { saveTokens } from '../../utils/utils';

export const TOKEN = 'TOKEN'
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS'
export const TOKEN_FAIL = 'TOKEN_FAIL'

export function authTokenAndGetResult(token) {
    return function(dispatch) {
        dispatch({ type: TOKEN });
        authToken(token)
            .then((response) => {
              if (response.success === true) 
              {
                  console.log('TOKEN_SUCCESS');
                  saveTokens(response.accessToken, response.refreshToken);
                  dispatch({ type: TOKEN_SUCCESS, accessToken: response.accessToken, refreshToken: response.refreshToken });
              }
              else {
                  dispatch({ type: TOKEN_FAIL });
              }
            })
            .catch((error) => {
                dispatch({ type: TOKEN_FAIL });
            })
    }
}