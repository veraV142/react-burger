import { getAuthUser,saveAuthUser } from '../../utils/burger-api';


export const TOKEN_EXPIRED = 'TOKEN_EXPIRED'
export const TOKEN_INVALID = 'TOKEN_INVALID'

export const GET_USER = 'GET_USER'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAIL = 'GET_USER_FAIL'

export const SAVE_USER = 'SAVE_USER'
export const SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS'
export const SAVE_USER_FAIL = 'SAVE_USER_FAIL'



export function authGetUserAndGetResult(token) {
    return function(dispatch) {
        dispatch({ type: GET_USER });
        //let tryAcceptToken = false;

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
                    // console.log(`GU_ERROR  ${error.message} ==== ${tryAcceptToken}`);
                    // if (error.message === 'jwt expired' && tryAcceptToken === 'false') {
                    //     console.log(`GU_ERROR_jwt ${tryAcceptToken}`);
                    //     setCookie('accessToken', '', 0);
                    //     tryAcceptToken = true;
                    //     withCheckToken(dispatch, getUser, GET_USER_FAIL);
                    // }
                    // else 
                        dispatch({ type: GET_USER_FAIL });
                })
        };
        getUser();

        //withCheckToken(dispatch, getUser, GET_USER_FAIL);
    }
}

export function authSaveUserAndGetResult(name, email, password) {
    return function(dispatch) {
        dispatch({ type: SAVE_USER });
        //let tryAcceptToken = false;

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
                    // console.log(`GU_ERROR  ${error.message}`);
                    // if (error.message === 'jwt expired' && tryAcceptToken ==='false') {
                    //     console.log(`GU_ERROR_jwt ${tryAcceptToken}`);
                    //     setCookie('accessToken', null, 0);
                    //     tryAcceptToken = true;
                    //     withCheckToken(dispatch, saveUser, SAVE_USER_FAIL);
                    // }
                    // else 
                    dispatch({ type: SAVE_USER_FAIL });
                })
        };

        saveUser();
        //withCheckToken(dispatch, saveUser, SAVE_USER_FAIL);
    }
}
    