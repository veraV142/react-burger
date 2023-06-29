import React, {FC} from 'react';
import { Input, Button, PasswordInput,  } from '@ya.praktikum/react-developer-burger-ui-components'
import { memo, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './registration.styles.module.css'
import { authRegisterAndGetResult } from '../../../services/actions/register';
import useFormState from '../../../utils/use-form-state';
import { useDispatch, useSelector } from '../../../services/types';

export const RegistrationPage:FC = () => 
{
    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const data = useSelector(store=>store.registerReducer.data);

    const { values, handleChange, setValues} = useFormState({
        name: '',
        email: '',
        password: ''
    });

    const onSubmit = (e:any) => {
        e.preventDefault();
        dispatch(authRegisterAndGetResult(values.email, values.password, values.name));
        setValues({
            ...values,
            password: ''
        });
    };

    useEffect(() => {
        if (data !== undefined)
            navigate('/');
    }, 
    [data, dispatch, navigate]);

    return (
        <form onSubmit={onSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column',  alignItems: 'center'}}>
            <p className={`text text_type_main-medium mt-20 mb-4 ${styles.text_center}`}>Регистрация</p>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={handleChange}
                    value={values.name}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка ввода имени'}
                    size={'default'}
                    extraClass="mb-4"/>
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
                    Зарегистрироваться
                </Button>
            
            <div className='mt-20' style={{ display: 'flex', flexDirection: 'row',  justifyContent: 'center'}}>
                <p>Уже зарегистрированы?</p>
                <Link to='/login' className='mt-4 ml-2'>
                    Войти
                </Link>
            </div>
        </div>
        </form>
    );
} 

export default memo(RegistrationPage);