import { Input, Button, } from '@ya.praktikum/react-developer-burger-ui-components'
import { memo, useState, useRef, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { passwordResetAndGetResult } from "../../../services/actions/password"
import { useNavigate, Link } from "react-router-dom";
import styles from './recovery.styles.module.css'

export const RecoveryPage = () => 
{
    const passwordResetComplete = useSelector(store=>store.passwordReducer.passwordResetComplete);
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 

    useEffect(() => {  
        if (passwordResetComplete) {
            navigate('/reset-password');
        }
    }, [passwordResetComplete]);

    const recoveryClick = () => 
    {
        dispatch(passwordResetAndGetResult(emailValue));
    }

    const [emailValue, setEmailValue] = useState('')
    const inputEmailRef = useRef(null)

    return (
        <div style={{ display: 'flex', flexDirection: 'column',  alignItems: 'center'}}>
            <p className={`text text_type_main-medium mt-20 mb-4 ${styles.text_center}`}>Восстановление пароля</p>
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
            <Button htmlType="button" type="primary" size="medium" onClick={recoveryClick}>
                Восстановить
            </Button>
            <div className='mt-20' style={{ display: 'flex', flexDirection: 'row',  justifyContent: 'center'}}>
                <p>Вспомнили пароль?</p>
                <Link to='/login' className='mt-4 ml-2'>
                    Войти
                </Link>
            </div>
        </div>
    );
} 

export default memo(RecoveryPage);