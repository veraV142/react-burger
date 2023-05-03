import React from 'react';
import PropTypes from 'prop-types';
import BurgerConstructorTabPanel from '../burger-constructor-tab-panel/burger-constructor-tab-panel.component'
import BurgerConstructorListElements from '../burger-constructor-list-elements/burger-constructor-list-elements.component'
import { dataType } from '../../data';

export default class BurgerConstructor extends React.Component {
    render() {
        const bunList = this.props.allData.filter((item) => item.type === 'bun');
        const sauceList = this.props.allData.filter((item) => item.type === 'sauce');
        const mainList = this.props.allData.filter((item) => item.type === 'main');

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
                <BurgerConstructorListElements bunList={bunList} sauceList={sauceList} mainList={mainList} />
            </div>
        );
    }
}

BurgerConstructor.propTypes = {
    allData: PropTypes.arrayOf(dataType),
}
