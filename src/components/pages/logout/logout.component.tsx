import {FC} from 'react';
import { useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import {  authLogoutAndGetResult } from "../../../services/actions/logout";
import { getCookie } from "../../../utils/utils";
import { LOGIN_CLEAR } from "../../../services/actions/login";
import { useDispatch, useSelector } from '../../../services/types';


export const LogoutPage:FC = () =>  
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutFail = useSelector(store => store.logoutReducer.logoutFail);
    const logoutSuccess = useSelector(store => store.logoutReducer.logoutSuccess);
    useEffect(() => {
        if (logoutSuccess || logoutFail) {
            navigate('/login');
        }
        else {
            
            dispatch({type: LOGIN_CLEAR});

            const refreshToken = getCookie('refreshToken');
            if (refreshToken === '' || refreshToken === undefined || refreshToken === null) {
                navigate('/login');
            }
            else 
                dispatch(authLogoutAndGetResult(refreshToken));
        }
        
    }, [logoutSuccess, logoutFail, dispatch, navigate]);

    return (
        <>
            <p>Переход к окну авторизации</p>
        </> 
    )
}
export default memo(LogoutPage);
