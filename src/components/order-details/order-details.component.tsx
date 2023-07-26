import React from 'react';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './order-details.styles.module.css'
import { useSelector } from '../../services/types';

const OrderDetails = () => 
{
    const orderNum = useSelector(store => store.orderNumReducer.orderNum);
    return (
        <div className={`ml-4 mb-8 ${styles.order_panel}`}>
            <p className={`mt-15 text text_type_digits-large`}>{`${orderNum}`}</p>
            <p className={`mb-15 mt-8 text text_type_main-medium`}>идентификатор заказа</p>
            <CheckMarkIcon type="primary" />
            <p className={`mt-15 mb-2 text text_type_main-medium`} >Ваш заказ начали готовить</p>
            <p className={`mb-30 text text_type_main-small text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;