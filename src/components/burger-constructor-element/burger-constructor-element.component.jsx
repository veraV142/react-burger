import React from 'react';
import styles from './burger-constructor-element.styles.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'

export default class BurgerConstructorElement extends React.Component 
{
    render() {

        return (
            <div className={`ml-4 mb-8 ${styles.constructor_el}`} >
                <Counter count={1} size="default" />
                <img src={this.props.data.image} alt={this.props.data.name} className="ml-4 mr-4 mt-6" />

                <div className={`mt-1 mb-1 ${styles.price_for_icon}`}>
                    <p className={`mr-4 text text_type_digits-default`}>{this.props.data.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
 
                <p className={`text text_type_main-default ${styles.name_ing}`}>
                    {this.props.data.name}
                </p>
            </div>
        );
    }
}

const dataType = PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
})

BurgerConstructorElement.propTypes = {
    data: dataType
}