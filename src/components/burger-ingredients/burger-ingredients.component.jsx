import BurgerTabPanel from '../burger-tab-panel/burger-tab-panel.component'
import BurgerListElements from '../burger-list-elements/burger-list-elements.component'
import IngredientDetails from '../ingredient-details/ingredient-details.component';
import Modal from '../modal/modal.component';
import { useSelector, useDispatch } from "react-redux";
import { ADD_FULL_INGREDIENT_DATA, DROP_FULL_INGREDIENT_DATA } from '../../services/actions/fullIngredientData'
import { useNavigate } from "react-router-dom";

const BurgerIngredients = () => 
{
    const dispatch = useDispatch();
    const showedIngredient = useSelector(store => store.fullIngredientDataReducer.ingredient);

    const navigate = useNavigate(); 
    const onShowIngredient = (data) => {
        dispatch({ type: ADD_FULL_INGREDIENT_DATA, ingredient: data.ingredient });
        navigate(`/ingredients/${data.ingredient._id}`, {replace:false});
    };

    const onCloseIngredient = () => {
        dispatch({ type: DROP_FULL_INGREDIENT_DATA });
        navigate(`/`);
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
            {
                showedIngredient && (
                    <Modal header={'Детали ингредиента'} showed={showedIngredient != null} onClose={onCloseIngredient}>
                        <IngredientDetails ingredient={showedIngredient.ingredient}/>
                    </Modal>
                ) 
            }
        </div>
    );
    
}

export default BurgerIngredients;

