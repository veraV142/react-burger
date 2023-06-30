import {FC, FormEvent} from 'react';
import { Input, Button, PasswordInput,  } from '@ya.praktikum/react-developer-burger-ui-components'
import { memo} from 'react';
import { Link, Navigate } from 'react-router-dom';
import styles from './enter.styles.module.css'
import { authLoginAndGetResult } from '../../../services/actions/login';
import { useFormState } from '../../../utils/use-form-state';
import { useDispatch, useSelector } from '../../../services/types';

interface IEnterPageFormEvent {
    email: string,
    password: string
}

export const EnterPage:FC = () => 
{
    console.log(`EnterPage`);
    
    const dispatch = useDispatch();

    const data = useSelector(store=>store.loginReducer.data);
    const fromRoute = useSelector(store=>store.loginReducer.loginFromRoute);

    console.log(`fromRoute=${fromRoute}`);

    const { values, handleChange, setValues } = useFormState({
        email: '',
        password: '',
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(authLoginAndGetResult(values.email, values.password));
        setValues({
            ...values,
            password: "",
          });
    };

    if (data !== undefined) {
        return <Navigate to={fromRoute || '/'} /> 
    }

    return (
        <form onSubmit={onSubmit}> 
        <div style={{ display: 'flex', flexDirection: 'column',  alignItems: 'center'}}>
            <p className={`text text_type_main-medium mt-20 mb-4 ${styles.text_center}`}>Вход</p>
            
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
                <PasswordInput
                    onChange={handleChange}
                    value={values.password}
                    name={'password'}
                    extraClass="mb-8"/>
                <Button type="primary" size="medium" htmlType='submit'>
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
        </form>
    );
} 

export default memo(EnterPage);