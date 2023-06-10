import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCookie } from '../../utils/utils';
import { getAuthUser } from '../../utils/burger-api';
import { useDispatch } from 'react-redux';
import { LOGOUT_CLEAR } from '../../services/actions/logout';

export function ProtectedRouteElement({ element, revers = false }) 
{
    const [isUserLoaded, setUserLoaded] = useState(false);
    const [isUserAuth, setIsUserAuth] = useState(false);

    const dispatch = useDispatch();

    const init = async () => {
        const accessToken = getCookie('refreshToken');
        await getAuthUser(accessToken)
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
            console.log('setIsUserAuth false error');
            setIsUserAuth(false);
            setUserLoaded(true);
        });
    };

    useEffect(() => {
        init();
    }, []);

    if (!isUserLoaded) {
        return null;
    }

    dispatch({ type: LOGOUT_CLEAR });

    const isElement = revers ? !isUserAuth : isUserAuth;
    const redirectLink = revers ? '/' : '/logout';
    console.log(`visual element ${isElement} ${redirectLink}`);

    return isElement ? element : <Navigate to={redirectLink} replace/>;
} 