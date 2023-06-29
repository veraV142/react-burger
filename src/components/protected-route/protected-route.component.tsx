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

const ProtectedRouteElement: FC<IProtectedRouteElementProps> = (props:IProtectedRouteElementProps) =>
{
    const [isUserLoaded, setUserLoaded] = useState(false);
    const [state, setState] = useState<IState>();

    console.log(`isUserLoaded=${isUserLoaded}`);

    const dispatch = useDispatch();

    function init(endInit:(st:boolean)=>void) 
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

        const currRevers = props.revers;
        const currRoute = props.route;

        init( (isAuth) => {
            dispatch({ type: LOGOUT_CLEAR });
            setState({ 
                isElement:currRevers ? !isAuth : isAuth,
                redirectLink:props.revers ? '/' : '/logout'  })
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

    return (
    <>{
        state?.isElement ? props.element : <Navigate to={state?.redirectLink??""} replace/>
    }</>  )
} 

export default ProtectedRouteElement;