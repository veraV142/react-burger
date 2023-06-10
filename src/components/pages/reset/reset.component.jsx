import { Input, Button, PasswordInput,  } from '@ya.praktikum/react-developer-burger-ui-components'
import { memo, useState, useRef, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { passwordNewAndGetResult } from "../../../services/actions/password"
import styles from './reset.styles.modules.css'
import { LOGOUT_CLEAR } from '../../../services/actions/logout';

export const ResetPage = () => 
{
    const dispatch = useDispatch(); 
    const passwordNewComplete = useSelector(store=>store.passwordReducer.passwordNewComplete);

    const navigate = useNavigate();

    useEffect(() => {  
        if (passwordNewComplete) {
            dispatch({ type: LOGOUT_CLEAR });
            navigate('/logout');
        }
    }, [passwordNewComplete]);

    const resetClick = () => 
    {
        dispatch(passwordNewAndGetResult(password, codeValue));
    }

    const [codeValue, setCodeValue] = useState('')
    const inputCodeRef = useRef(null)

    const [password, setPassword] = useState('')
    const onChangePassword = e => {
        setPassword(e.target.value)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column',  alignItems: 'center'}}>
            <p className={`text text_type_main-medium mt-20 mb-4 ${styles.text_center}`}>Восстановление пароля</p>
            <PasswordInput
                onChange={onChangePassword}
                value={password}
                placeholder={'Введите новый пароль'}
                name={'password'}
                extraClass="mb-4"/>
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={e => setCodeValue(e.target.value)}
                value={codeValue}
                name={'name'}
                error={false}
                ref={inputCodeRef}
                errorText={'Ошибка ввода имени'}
                size={'default'}
                extraClass="mb-4"/>
            <Button htmlType="button" type="primary" size="medium" onClick={resetClick}>
                Сохранить
            </Button>
            <div className='mt-20' style={{ display: 'flex', flexDirection: 'row',  justifyContent: 'center'}}>
                <p>Вспомнили пароль?</p>
                <Link to='/logout' className='mt-4 ml-2'>
                    Войти
                </Link>
            </div>
        </div>
    );
} 

export default memo(ResetPage);