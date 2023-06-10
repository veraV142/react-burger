import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCookie, saveTokens } from '../../utils/utils';
import { authToken, getAuthUser } from '../../utils/burger-api';
import { useDispatch } from 'react-redux';
import { LOGOUT_CLEAR } from '../../services/actions/logout';

export function ProtectedRouteElement({ element, revers = false }) 
{
    const [isUserLoaded, setUserLoaded] = useState(false);
    const [isUserAuth, setIsUserAuth] = useState(false);

    const dispatch = useDispatch();

    const init = async (tryAcceptToken) => {
        await getAuthUser()
          .then(response => {
              if (response.success) {
                console.log('setIsUserAuth true');
                setIsUserAuth(true);
              }
              else {
                console.log('setIsUserAuth false');
                setIsUserAuth(false);
              }
              setUserLoaded(true);
        }).catch(error => {
            console.log(`getAuthUser failed message=${error.message}`);
            if ((error.message === 'jwt expired' || error.message === 'You should be authorised') && tryAcceptToken) {
                const refreshToken = getCookie('refreshToken');
                if (refreshToken === '' || refreshToken === undefined || refreshToken === null)
                {
                    setIsUserAuth(false);
                    setUserLoaded(true);
                    return;
                }
                authToken(refreshToken)
                .then(response=> {
                    if (response.success === 'true') {
                        saveTokens(response.accessToken, response.refreshToken);
                        init(false);
                    } 
                    else {
                        console.log(`authToken no get message=${response.message}`);
                        setIsUserAuth(false);
                        setUserLoaded(true);
                    }
                })
                .catch(error => {
                    console.log(`authToken error=${error.message}`);
                    setIsUserAuth(false);
                    setUserLoaded(true);
                });
            }
            else {
                setIsUserAuth(false);
                setUserLoaded(true);
            }
        });
    };

    useEffect(() => {
        init(true);
    }, [dispatch]);

    if (!isUserLoaded) {
        return null;
    }

    dispatch({ type: LOGOUT_CLEAR });

    const isElement = revers ? !isUserAuth : isUserAuth;
    const redirectLink = revers ? '/' : '/logout';
    console.log(`visual element ${isElement} ${redirectLink}`);

    return isElement ? element : <Navigate to={redirectLink} replace/>;
} 