import { Input, Button, PasswordInput,  } from '@ya.praktikum/react-developer-burger-ui-components'
import { memo, useState, useRef, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './registration.styles.module.css'
import { useDispatch, useSelector } from "react-redux";
import { authRegisterAndGetResult } from '../../../services/actions/register';

export const RegistrationPage = () => 
{
    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const data = useSelector(store=>store.registerReducer.data);

    const [nameValue, setNameValue] = useState('')
    const inputNameRef = useRef(null)

    const [emailValue, setEmailValue] = useState('')
    const inputEmailRef = useRef(null)

    const [password, setPassword] = useState('')
    const onChangePassword = e => {
        setPassword(e.target.value)
    }

    const registrationClick = () => 
    {
        dispatch(authRegisterAndGetResult(emailValue, password, nameValue));
    }

    useEffect(() => {
        if (data !== null)
            navigate('/');
    }, 
    [data]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column',  alignItems: 'center'}}>
            <p className={`text text_type_main-medium mt-20 mb-4 ${styles.text_center}`}>Регистрация</p>
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
                extraClass="mb-4"/>
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
            <Button htmlType="button" type="primary" size="medium" onClick={registrationClick}>
                Зарегистрироваться
            </Button>
            <div className='mt-20' style={{ display: 'flex', flexDirection: 'row',  justifyContent: 'center'}}>
                <p>Уже зарегистрированы?</p>
                <Link to='/login' className='mt-4 ml-2'>
                    Войти
                </Link>
            </div>
        </div>
    );
} 

export default memo(RegistrationPage);