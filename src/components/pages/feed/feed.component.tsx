import  {FC, FormEvent, SyntheticEvent} from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { memo, useEffect} from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { LOGOUT_CLEAR } from '../../../services/actions/logout'
import { useFormState } from '../../../utils/use-form-state';
import { useDispatch, useSelector } from '../../../services/types';


export const FeedPage:FC = () => 
{
    

    return (
       <>
       </>
    );
} 

export default memo(FeedPage);