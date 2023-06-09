import { authRegister } from '../../utils/burger-api';
import { saveTokens } from '../../utils/utils';

export const REGISTER = 'REGISTER'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAIL = 'REGISTER_FAIL'

export function authRegisterAndGetResult(email, password, name) {
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
