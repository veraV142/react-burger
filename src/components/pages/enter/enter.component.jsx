import { Input, Button, PasswordInput,  } from '@ya.praktikum/react-developer-burger-ui-components'
import { memo, useState, useRef, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './enter.styles.module.css'
import { useDispatch, useSelector } from "react-redux";
import { authLoginAndGetResult } from '../../../services/actions/login';

export const EnterPage = () => 
{
    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const data = useSelector(store=>store.loginReducer.data);

    useEffect(() => {
        if (data !== null) {
            console.log('EnterPage data accepted');
            navigate('/');
        }
    }, 
    [data, dispatch, navigate]);

    const [emailValue, setEmailValue] = useState('')
    const inputEmailRef = useRef(null)

    const [password, setPassword] = useState('')
    const onChangePassword = e => {
        setPassword(e.target.value)
    }

    const enterClick = () => 
    {
        dispatch(authLoginAndGetResult(emailValue, password));
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column',  alignItems: 'center'}}>
            <p className={`text text_type_main-medium mt-20 mb-4 ${styles.text_center}`}>Вход</p>
            <Input
                type={'text'}
                placeholder={'E-mail'}
                onChange={e => setEmailValue(e.target.value)}
                value={emailValue}
                name={'email'}
                error={false}
                ref={inputEmailRef}
                errorText={'Ошибка ввода e-mail'}
                size={'default'}
                extraClass="mb-4"/>
            <PasswordInput
                onChange={onChangePassword}
                value={password}
                name={'password'}
                extraClass="mb-8"/>
            <Button htmlType="button" type="primary" size="medium" onClick={enterClick}>
                Войти
            </Button>
            <div className='mt-20' style={{ display: 'flex', flexDirection: 'row',  justifyContent: 'center'}}>
                <p>Вы - новый пользователь?</p>
                <Link to='/register' className='mt-4 ml-2'>
                    Зарегистрироваться
                </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row',  justifyContent: 'center'}}>
                <p>Забыли пароль?</p>
                <Link to='/forgot-password' className='mt-4 ml-2'>
                    Восстановить пароль
                </Link>
            </div>
        </div>
    );
} 

export default memo(EnterPage);