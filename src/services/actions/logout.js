import { authLogout } from '../../utils/burger-api';
import { clearTokens } from '../../utils/utils';

export const LOGOUT = 'LOGOUT'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAIL = 'LOGOUT_FAIL'
export const LOGOUT_CLEAR = 'LOGOUT_CLEAR'

export function authLogoutAndGetResult(token) {
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