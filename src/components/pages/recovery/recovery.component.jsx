import { Input, Button, } from '@ya.praktikum/react-developer-burger-ui-components'
import { memo, useState, useRef, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { passwordResetAndGetResult } from "../../../services/actions/password"
import { useNavigate, Link } from "react-router-dom";
import styles from './recovery.styles.module.css'
import useFormState from '../../../utils/use-form-state';

export const RecoveryPage = () => 
{
    const passwordResetComplete = useSelector(store=>store.passwordReducer.passwordResetComplete);
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 

    useEffect(() => {  
        if (passwordResetComplete) {
            navigate('/reset-password');
        }
    }, [passwordResetComplete, dispatch, navigate]);

    const { values, handleChange} = useFormState({
        email: ''
    });

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(passwordResetAndGetResult(values.email));
    };

    return (
        <form onSubmit={onSubmit}> 
        <div style={{ display: 'flex', flexDirection: 'column',  alignItems: 'center'}}>
            <p className={`text text_type_main-medium mt-20 mb-4 ${styles.text_center}`}>Восстановление пароля</p>
            
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    onChange={handleChange}
                    value={values.email}
                    name={'email'}
                    error={false}
                    errorText={'Ошибка ввода e-mail'}
                    size={'default'}
                    extraClass="mb-4"/>
                <Button type="primary" size="medium" htmlType='submit'>
                    Восстановить
                </Button>
            
            <div className='mt-20' style={{ display: 'flex', flexDirection: 'row',  justifyContent: 'center'}}>
                <p>Вспомнили пароль?</p>
                <Link to='/login' className='mt-4 ml-2'>
                    Войти
                </Link>
            </div>
        </div>
        </form>
    );
} 

export default memo(RecoveryPage);