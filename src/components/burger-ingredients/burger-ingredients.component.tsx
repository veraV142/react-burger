import {FC} from 'react';
import BurgerTabPanel from '../burger-tab-panel/burger-tab-panel.component'
import BurgerListElements from '../burger-list-elements/burger-list-elements.component'
import { ADD_FULL_INGREDIENT_DATA} from '../../services/actions/fullIngredientData'
import { useDispatch } from '../../services/types';
import { TIngredient } from '../../utils/data';

const BurgerIngredients: FC = () => 
{
    const dispatch = useDispatch();

    const onShowIngredient = (data:TIngredient, selected:boolean) => {
        dispatch({ type: ADD_FULL_INGREDIENT_DATA, ingredient: data });
    };

    return (
        <div>
            <p className={`mt-10 mb-5 text text_type_main-large`}>
                Соберите бургер
            </p>
            <BurgerTabPanel selectTab={(currTab) => {
                const elemForScroll = document.getElementById(`${currTab}`);
                elemForScroll?.scrollIntoView();
            }} 
            />
            <BurgerListElements showIngredient={onShowIngredient}/>
        </div>
    );
    
}

export default BurgerIngredients;

