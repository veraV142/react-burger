import { Navigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCookie } from '../../utils/utils';
import {  getAuthUser } from '../../utils/burger-api';
import { useDispatch } from 'react-redux';
import { LOGOUT_CLEAR } from '../../services/actions/logout';
import { LOGIN_FROM_ROUTE } from '../../services/actions/login';

export function ProtectedRouteElement({ element, route=null, revers = false }) 
{
    console.log(`ProtectedRouteElement route=${route} elem=${element}`);

    const [isUserLoaded, setUserLoaded] = useState(false);
    const [state, setState] = useState(null);

    console.log(`isUserLoaded=${isUserLoaded}`);

    const dispatch = useDispatch();

    function init(endInit) 
    {
        console.log(`init`);

        const refreshToken = getCookie('refreshToken');
        if (refreshToken === null || refreshToken === undefined || refreshToken === '')
        {
            console.log(`refreshToken is out`);
            endInit(false);
            return;
        }

        getAuthUser()
          .then(response => {
              if (response.success) {
                console.log('setIsUserAuth true');
                endInit(true);
              }
              else {
                console.log('setIsUserAuth false');
                endInit(false);
              }
        }).catch(error => {
            console.log(`getAuthUser failed message=${error.message}`);
            endInit(false);
        });
    };

    useEffect(() => {
        console.log(`init`);

        const currRevers = revers;
        const currRoute = route;

        init( (isAuth) => {
            dispatch({ type: LOGOUT_CLEAR });
            setState({ 
                isElement:currRevers ? !isAuth : isAuth,
                redirectLink:revers ? '/' : '/logout'  })
            if (currRoute !== null && currRoute !== undefined) {
                console.log(`fromRoute = ${currRoute}`);
                dispatch({type: LOGIN_FROM_ROUTE, fromRoute:currRoute});
            }
            setUserLoaded(true);
        });

        return () => { 
            console.log('unmount');
            setUserLoaded(false); 
        }
    }, []);

    if (!isUserLoaded) {
        console.log(`!isUserLoaded`);
        return ( <div>Ожидание</div> );
    }

    return state.isElement ? element : <Navigate to={state.redirectLink} replace/>;
} 