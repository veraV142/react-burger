import { useEffect }  from 'react';
import BurgerIngredients from '../../burger-ingredients/burger-ingredients.component';
import BurgerConstructor from '../../burger-constructor/burger-constructor.component';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../../services/actions/ingredientsLoad';

export const HomePage = () => 
{
    const dispatch = useDispatch();

    useEffect(() => {  
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
