import { Input, Button, PasswordInput,  } from '@ya.praktikum/react-developer-burger-ui-components'
import { memo, useState, useRef, useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './profile.styles.module.css'
import { useDispatch, useSelector } from "react-redux";
import { authLogoutAndGetResult } from '../../../services/actions/logout'
import { getCookie } from '../../../utils/utils';
import { authGetUserAndGetResult, authSaveUserAndGetResult } from '../../../services/actions/user';
import { authTokenAndGetResult } from '../../../services/actions/token';

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

    const [password, setPassword] = useState('')
    const onChangePassword = e => {
        setPassword(e.target.value)
    }

    const logoutSuccess = useSelector(store => store.logoutReducer.logoutSuccess);
    if (subpage==='exit' && !logoutSuccess) 
    {
        const accessToken = getCookie('refreshToken');
        dispatch(authLogoutAndGetResult(accessToken));
    }

    const userData = useSelector(store => store.userReducer.data);
    const saveUserSuccess = useSelector(store => store.userReducer.saveUserSuccess);
    if (subpage==='' && userData===null) 
    {
        dispatch(authGetUserAndGetResult());
    }

    const navigate = useNavigate(); 
    useEffect(() => {  
        if (subpage==='exit' && logoutSuccess) {
            navigate('/login');
        }
        if (subpage==='' && userData !== null) {
            setNameValue(userData.name);
            setSrcNameValue(userData.name);
            setEmailValue(userData.email);
            setSrcEmailValue(userData.email);
        }
        if (subpage==='' && saveUserSuccess === 'true') {
            setSrcNameValue(nameValue);
            setSrcEmailValue(emailValue);
        }
    }, [logoutSuccess, userData, saveUserSuccess]);

    const cancelClick = () => 
    {
        setNameValue(srcNameValue);
        setEmailValue(srcEmailValue);
    };

    
    const saveClick = () => 
    {
        dispatch(authSaveUserAndGetResult(nameValue, emailValue));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row'}}>
            <div className={`mt-20`} style={{ display: 'flex', flexDirection: 'column',  alignItems: 'flex-start'}}>
                <NavLink to={{ pathname:'/profile/'}} 
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
            {subpage==='exit' &&  <div style={{ display: 'flex', flexDirection: 'column',  alignItems: 'stretch'}}>
                <p className={`text text_type_main-medium mt-20 ml-8 mb-4`}>{logoutSuccess ? 'Выход завершен' : 'Выходим...'}</p>
            </div>}
            {subpage==='' && userData!==null && <div style={{ display: 'flex', flexDirection: 'column',  alignItems: 'stretch'}}>
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
                    icon="EditIcon" 
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
                    icon="EditIcon" 
                    onIconClick={e => setEmailValue(e.target.value)}/>
                <PasswordInput
                    onChange={onChangePassword}
                    value={password}
                    name={'password'}
                    extraClass="mb-2"
                    icon="EditIcon" />
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