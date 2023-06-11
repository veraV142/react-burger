import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { memo, useEffect} from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_CLEAR } from '../../../services/actions/logout'
import { authGetUserAndGetResult, authSaveUserAndGetResult } from '../../../services/actions/user';
import { useFormState } from '../../../utils/use-form-state';


export const ProfilePage = (props) => 
{
    console.log(`ProfilePage`);

    const subpage = props['subpage'];

    const userData = useSelector(store => store.userReducer.data);
    console.log( `userdata=${userData}`);
    const name = userData?.name;
    const email = userData?.email;
    const { values, handleChange, setValues } = useFormState({
        name: name??'',
        email: email??'',
        password: '',
      });

    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const tokenInvalid = useSelector(store => store.userReducer.tokenInvalid);
    const getUserFail = useSelector(store => store.userReducer.getUserFail);

    useEffect(() => 
    {   
        setValues({
            name: name??'',
            email: email??'',
            password: "",
          });

        if (subpage==='') {
            dispatch(authGetUserAndGetResult());
            navigate('/profile/user');
        }

        if (subpage==='profile') {
            if (tokenInvalid || getUserFail) {
                console.log(`tokenInvalid=${tokenInvalid} getUserFail=${getUserFail}`);
                dispatch({ type: LOGOUT_CLEAR });
                navigate('/logout');
            }
            else if (userData===null || userData === undefined) {
                console.log( `userdata=${userData}`);
                dispatch(authGetUserAndGetResult());
            } 
        }
    }, [userData, tokenInvalid, subpage, getUserFail, navigate, dispatch]);

    const onResetForm = (e) => {
        e.preventDefault();
        setValues({
            name: name,
            email: email,
            password: "",
          });
      };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(authSaveUserAndGetResult(values.name, values.email, values.password));
        setValues({
            ...values,
            password: "",
          });
    };

    const isDisabled = values.name === name && values.email === email && values.password === '';

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
             
              {subpage==='profile' && <form onSubmit={onSubmit}> 
               <div style={{ display: 'flex', flexDirection: 'column',  alignItems: 'stretch'}}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={handleChange}
                    value={values.name}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка ввода имени'}
                    size={'default'}
                    extraClass={`text text_type_main-medium mt-20 mb-4`}
                    icon="EditIcon"
                    />
                <Input
                    type={'text'}
                    placeholder={'Логин'}
                    onChange={handleChange}
                    value={values.email}
                    name={'email'}
                    error={false}
                    errorText={'Ошибка ввода логина'}
                    size={'default'}
                    extraClass={`mb-4`}
                    icon="EditIcon"/>
                <Input
                    placeholder={"Пароль"}
                    onChange={handleChange}
                    value={values.password}
                    name={'password'}
                    icon={"EditIcon"}
                    extraClass="mb-8"/> 
                <div style={{ display: 'flex', flexDirection: 'row',  justifyContent: 'flex-end'}}>
                    <Button  type="primary" size="medium" extraClass="mr-4" disabled={isDisabled} htmlType='submit'>
                        Сохранить
                    </Button>
                    <Button type="primary" size="medium" onClick={onResetForm} disabled={isDisabled} htmlType='reset'>
                        Отмена
                    </Button>
                </div>
            </div>
            </form>}
        </div>
    );
} 

export default memo(ProfilePage);