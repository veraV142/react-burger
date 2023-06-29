import { Input, Button, PasswordInput,  } from '@ya.praktikum/react-developer-burger-ui-components'
import { memo, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { passwordNewAndGetResult } from "../../../services/actions/password"
import { LOGOUT_CLEAR } from '../../../services/actions/logout';
import useFormState from '../../../utils/use-form-state';
import { useDispatch, useSelector } from '../../../services/types';
import React, {FC, FormEvent} from 'react';
import styles from '../registration/registration.styles.module.css'

export const ResetPage:FC = () => 
{
    const dispatch = useDispatch(); 
    const passwordNewComplete = useSelector(store=>store.passwordReducer.passwordNewComplete);

    const navigate = useNavigate();

    const { values, handleChange, setValues} = useFormState({
        code: '',
        password: ''
    });

    useEffect(() => {  
        if (passwordNewComplete) {
            dispatch({ type: LOGOUT_CLEAR });
            navigate('/logout');
        }
    }, [dispatch, navigate, passwordNewComplete]);

    const onSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(passwordNewAndGetResult(values.password, values.code));
        setValues({
            ...values,
            password: ''
        });
    };

    return (
        <form onSubmit={onSubmit}> 
        <div style={{ display: 'flex', flexDirection: 'column',  alignItems: 'center'}}>
            <p className={`text text_type_main-medium mt-20 mb-4 ${styles.text_center}`}>Восстановление пароля</p>
            
                <PasswordInput
                    onChange={handleChange}
                    value={values.password}
                    placeholder={'Введите новый пароль'}
                    name={'password'}
                    extraClass="mb-4"/>
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={handleChange}
                    value={values.code}
                    name={'code'}
                    error={false}
                    errorText={'Ошибка ввода имени'}
                    size={'default'}
                    extraClass="mb-4"
                    icon="EditIcon"/>
                <Button type="primary" size="medium" htmlType='submit'>
                    Сохранить
                </Button>
            
            <div className='mt-20' style={{ display: 'flex', flexDirection: 'row',  justifyContent: 'center'}}>
                <p>Вспомнили пароль?</p>
                <Link to='/logout' className='mt-4 ml-2'>
                    Войти
                </Link>
            </div>
        </div>
        </form>
    );
} 

export default memo(ResetPage);