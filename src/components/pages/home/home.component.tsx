import {FC} from 'react';
import { useEffect }  from 'react';
import BurgerIngredients from '../../burger-ingredients/burger-ingredients.component';
import BurgerConstructor from '../../burger-constructor/burger-constructor.component';
import { getIngredients } from '../../../services/actions/ingredientsLoad';
import { LOGIN_FROM_ROUTE } from '../../../services/actions/login';
import { useDispatch } from '../../../services/types';

export const HomePage:FC = () => 
{
    const dispatch = useDispatch();

    useEffect(() => {  
      console.log('getIngredients()');
      dispatch({type: LOGIN_FROM_ROUTE, fromRoute:'/'});
      dispatch(getIngredients());
    }, [dispatch]);

    return (
        <>
            <div className={`mr-10`}>
                <BurgerIngredients />
            </div>
            <BurgerConstructor />
        </>
    );
}

export default HomePage;
