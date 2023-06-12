import BurgerTabPanel from '../burger-tab-panel/burger-tab-panel.component'
import BurgerListElements from '../burger-list-elements/burger-list-elements.component'
import { useDispatch } from "react-redux";
import { ADD_FULL_INGREDIENT_DATA} from '../../services/actions/fullIngredientData'

const BurgerIngredients = () => 
{
    const dispatch = useDispatch();

    const onShowIngredient = (data) => {
        dispatch({ type: ADD_FULL_INGREDIENT_DATA, ingredient: data.ingredient });
    };

    return (
        <div>
            <p align='left' className={`mt-10 mb-5 text text_type_main-large`}>
                Соберите бургер
            </p>
            <BurgerTabPanel selectTab={(currTab) => {
                const elemForScroll = document.getElementById(`${currTab}`);
                elemForScroll.scrollIntoView();
            }} 
            />
            <BurgerListElements showIngredient={onShowIngredient}/>
        </div>
    );
    
}

export default BurgerIngredients;

