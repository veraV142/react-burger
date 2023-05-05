import React, {useState} from 'react';
import PropTypes from 'prop-types';
import BurgerTabPanel from '../burger-tab-panel/burger-tab-panel.component'
import BurgerListElements from '../burger-list-elements/burger-list-elements.component'
import { dataType } from '../../data';
import IngredientDetails from '../ingredient-details/ingredient-details.component';
import Modal from '../modal/modal.component';

const BurgerIngredients = (props) => {
    const [showedIngredient, showIngredient] = useState({ selected: false });

    const bunList = props.allData.filter((item) => item.type === 'bun');
    const sauceList = props.allData.filter((item) => item.type === 'sauce');
    const mainList = props.allData.filter((item) => item.type === 'main');

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
            <BurgerListElements bunList={bunList} sauceList={sauceList} mainList={mainList} showIngredient={showIngredient}/>
            {
                showedIngredient.selected && (
                    <Modal header={'Детали ингредиента'} showed={showedIngredient.selected} onClose={() => showIngredient({selected: false})}>
                        <IngredientDetails ingredient={showedIngredient.ingredient}/>
                    </Modal>
                ) 
            }
        </div>
    );
    
}

BurgerIngredients.propTypes = {
    allData: PropTypes.arrayOf(dataType).isRequired,
}

export default BurgerIngredients;
