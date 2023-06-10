import { Input, Button  } from '@ya.praktikum/react-developer-burger-ui-components'
import { memo, useState, useRef, useEffect} from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_CLEAR, authLogoutAndGetResult } from '../../../services/actions/logout'
import { getCookie } from '../../../utils/utils';
import { authGetUserAndGetResult, authSaveUserAndGetResult } from '../../../services/actions/user';

export const ProfilePage = (props) => 
{
    const subpage = props['subpage'];

    const dispatch = useDispatch();

    const [nameValue, setNameValue] = useState('')
    const [srcNameValue, setSrcNameValue] = useState('')
    const inputNameRef = useRef(null)

    const [emailValue, setEmailValue] = useState('')
    const [srcEmailValue, setSrcEmailValue] = useState('')
    const inputEmailRef = useRef(null)

    const navigate = useNavigate(); 

    // const [password, setPassword] = useState('')
    // const onChangePassword = e => {
    //     setPassword(e.target.value)
    // }



    const userData = useSelector(store => store.userReducer.data);
    const tokenInvalid = useSelector(store => store.userReducer.tokenInvalid);
    const getUserFail = useSelector(store => store.userReducer.getUserFail);

    if (subpage==='profile' && userData===null) 
    {
        console.log( `userdata=${userData}`);
        dispatch(authGetUserAndGetResult());
    }

    if (subpage==='') {
        dispatch(authGetUserAndGetResult());
        navigate('/profile/user');
    }

    
    useEffect(() => {  
        
        if (subpage==='profile') {
            if (tokenInvalid || getUserFail) {
                console.log(`tokenInvalid=${tokenInvalid}`);
                dispatch({ type: LOGOUT_CLEAR });
                navigate('/logout');
            }
            else if (userData !== null && userData !== undefined) {
                 setNameValue(userData.name);
                 setSrcNameValue(userData.name);
                 setEmailValue(userData.email);
                 setSrcEmailValue(userData.email);
            }   
        }
    }, [userData, tokenInvalid, subpage, getUserFail]);

    const cancelClick = () => 
    {
        setNameValue(srcNameValue);
        setEmailValue(srcEmailValue);
    };

    
    const saveClick = () => 
    {
        if (userData !== null && userData !== undefined) {
            userData.name = nameValue;
            userData.email = emailValue;
        }
        setSrcNameValue(nameValue);
        setSrcEmailValue(emailValue);
        dispatch(authSaveUserAndGetResult(nameValue, emailValue));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row'}}>
            <div className={`mt-20`} style={{ display: 'flex', flexDirection: 'column',  alignItems: 'flex-start'}}>
                <NavLink to={{ pathname:'/profile/user'}} 
                    className={({isActive, isPending }) =>  { 
                        return !isActive ? 
                          `text text_type_main-medium text_color_inactive mb-10` : 
                          `text text_type_main-medium text_color_active mb-10`
                        } 
                    } 
                    > 
                    Профиль
                </NavLink>
                <NavLink to={{ pathname:'/profile/orders'}} 
                    className={({isActive, isPending }) =>  { 
                        return !isActive ? 
                          `text text_type_main-medium text_color_inactive mb-10` : 
                          `text text_type_main-medium mb-10`
                        } 
                    }
                    > История заказов
                </NavLink>
                <NavLink to={{ pathname:'/profile/exit'}} 
                    className={({isActive, isPending }) =>  { 
                        return !isActive ? 
                          `text text_type_main-medium text_color_inactive mb-10` : 
                          `text text_type_main-medium mb-10`
                        } 
                    }
                    > Выход
                </NavLink>
                <p className={`text text_type_main-small text_color_inactive mt-10`} >В этом разделе вы можете</p>
                <p className={`text text_type_main-small text_color_inactive`} >изменить свои персональные данные</p>
            </div>
            {subpage==='exit' && <Navigate to={'/logout'} replace/>}
            { subpage==='profile' && <div style={{ display: 'flex', flexDirection: 'column',  alignItems: 'stretch'}}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setNameValue(e.target.value)}
                    value={nameValue}
                    name={'name'}
                    error={false}
                    ref={inputNameRef}
                    errorText={'Ошибка ввода имени'}
                    size={'default'}
                    extraClass={`text text_type_main-medium mt-20 mb-4`}
                    
                    onIconClick={e => setNameValue(e.target.value)}
                    />
                <Input
                    type={'text'}
                    placeholder={'Логин'}
                    onChange={e => setEmailValue(e.target.value)}
                    value={emailValue}
                    name={'email'}
                    error={false}
                    ref={inputEmailRef}
                    errorText={'Ошибка ввода логина'}
                    size={'default'}
                    extraClass={`mb-4`}
                    onIconClick={e => setEmailValue(e.target.value)}/>
                {/* <PasswordInput
                    onChange={onChangePassword}
                    value={password}
                    name={'password'}
                    extraClass="mb-2"
                    icon="EditIcon" /> */}
                <div style={{ display: 'flex', flexDirection: 'row',  justifyContent: 'flex-end'}}>
                    <Button htmlType="button" type="primary" size="medium" onClick={saveClick} extraClass="mr-4">
                        Сохранить
                    </Button>
                    <Button htmlType="button" type="primary" size="medium" onClick={cancelClick}>
                        Отмена
                    </Button>
                </div>
            </div>}
        </div>
    );
} 

export default memo(ProfilePage);