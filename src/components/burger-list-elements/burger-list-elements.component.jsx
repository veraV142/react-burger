import React from 'react';
import styles from './burger-list-elements.styles.module.css'
import PropTypes from 'prop-types'
import BurgerElement from '../burger-element/burger-element.component'
import { dataType } from '../../data';

export default class BurgerListElements extends React.Component 
{
    render() {

        const scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
          ) - 310;

        return (
            <div className='mr-10' style={{overflowY: 'auto', overflowX: 'hidden', maxHeight: `${scrollHeight}px`, scrollBarColor: '#6969dd #e0e0e0', scrollbarWidth: 'thin'}}>
                <h2 id='bun_tab' align='left' className="mb-6 mt-10 text text_type_main-medium">
                    Булки
                </h2>
                <div  className={`mt-6 ml-4 mr-4 ${styles.table_el}`} >
                    {this.props.bunList.map((elem) => {
                        return (
                            <BurgerElement key={elem._id} data={elem} showIngredient={this.props.showIngredient}/>
                        );
                    })}
                </div>
                <h2 id='sauce_tab' align='left' className="mb-6 mt-2 text text_type_main-medium mb-6">
                    Соусы
                </h2>
                <div className={`mt-6 ml-4 mr-4 ${styles.table_el}`} >
                    {this.props.sauceList.map((elem) => {
                        return (
                            <BurgerElement key={elem._id} data={elem} showIngredient={this.props.showIngredient}/>
                        );
                    })}
                </div>
                <h2 id='main_tab' align='left' className="mb-6 mt-2 text text_type_main-medium mb-6">
                    Начинки
                </h2>
                <div className={`mt-6 ml-4 mr-4 ${styles.table_el}`}>
                    {this.props.mainList.map((elem) => {
                        return (
                            <BurgerElement key={elem._id} data={elem} showIngredient={this.props.showIngredient} />
                        );
                    })}
                </div>
            </div>
        );
    }
}

BurgerListElements.propTypes = {
    bunList: PropTypes.arrayOf(dataType),
    sauceList: PropTypes.arrayOf(dataType),
    mainList: PropTypes.arrayOf(dataType),
}