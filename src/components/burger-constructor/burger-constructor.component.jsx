import React, {useState} from 'react';
import PropTypes from 'prop-types';
import BurgerConstructorTabPanel from '../burger-constructor-tab-panel/burger-constructor-tab-panel.component'
import BurgerConstructorListElements from '../burger-constructor-list-elements/burger-constructor-list-elements.component'
import { dataType } from '../../data';
import IngredientDetails from '../ingredient-details/ingredient-details.component';
import Modal from '../modal/modal.component';

const BurgerConstructor = (props) => {
    const [showedIngredient, showIngredient] = useState({ selected: false });

    const bunList = props.allData.filter((item) => item.type === 'bun');
    const sauceList = props.allData.filter((item) => item.type === 'sauce');
    const mainList = props.allData.filter((item) => item.type === 'main');

    return (
        <div>
            <p align='left' className={`mt-10 mb-5 text text_type_main-large`}>
                Соберите бургер
            </p>
            <BurgerConstructorTabPanel selectTab={(currTab) => {
                const elemForScroll = document.getElementById(`${currTab}`);
                elemForScroll.scrollIntoView();
            }} 
            />
            <BurgerConstructorListElements bunList={bunList} sauceList={sauceList} mainList={mainList} showIngredient={showIngredient}/>
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

BurgerConstructor.propTypes = {
    allData: PropTypes.arrayOf(dataType),
}

export default BurgerConstructor;
