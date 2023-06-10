import { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  authLogoutAndGetResult } from "../../../services/actions/logout";
import { getCookie } from "../../../utils/utils";
import { LOGIN_CLEAR } from "../../../services/actions/login";


export const LogoutPage = () =>  
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
            const accessToken = getCookie('refreshToken');
            dispatch({type: LOGIN_CLEAR});
            dispatch(authLogoutAndGetResult(accessToken));
        }
        
    }, [logoutSuccess, logoutFail, dispatch, navigate]);

    return (
        <>
            <p>Переход к окну авторизации</p>
        </> 
    )
}
export default memo(LogoutPage);
