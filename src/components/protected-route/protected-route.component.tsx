import React, {FC, ReactNode} from 'react';
import { Navigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCookie } from '../../utils/utils';
import {  getAuthUser } from '../../utils/burger-api';
import { LOGOUT_CLEAR } from '../../services/actions/logout';
import { LOGIN_FROM_ROUTE } from '../../services/actions/login';
import { useDispatch } from '../../services/types';

interface IProtectedRouteElementProps {
    revers?: boolean,
    route?: string,
    element?: ReactNode;
}

interface IState {
    isElement: boolean,
    redirectLink: string
}

const ProtectedRouteElement: FC<IProtectedRouteElementProps> = (props) =>
{
    const [isUserLoaded, setUserLoaded] = useState(false);
    const [state, setState] = useState<IState>();

    const dispatch = useDispatch();

    function init(endInit:(st:boolean)=>void) 
    {
        const refreshToken = getCookie('refreshToken');
        if (refreshToken === null || refreshToken === undefined || refreshToken === '')
        {
            endInit(false);
            return;
        }

        getAuthUser()
          .then(response => {
              if (response.success) {
                endInit(true);
              }
              else {
                endInit(false);
              }
        }).catch(error => {
            endInit(false);
        });
    };

    useEffect(() => {
        const currRevers = props.revers;
        const currRoute = props.route;

        init( (isAuth) => {
            dispatch({ type: LOGOUT_CLEAR });
            setState({ 
                isElement:currRevers ? !isAuth : isAuth,
                redirectLink:props.revers ? '/' : '/logout'  })
            if (currRoute !== null && currRoute !== undefined) {
                dispatch({type: LOGIN_FROM_ROUTE, fromRoute:currRoute});
            }
            setUserLoaded(true);
        });

        return () => { 
            setUserLoaded(false); 
        }
    }, []);

    if (!isUserLoaded) {
        return ( <div>Ожидание</div> );
    }

    return (
    <>{
        state?.isElement ? props.element : <Navigate to={state?.redirectLink??""} replace/>
    }</>  )
} 

export default ProtectedRouteElement;