import  { FC, memo, useEffect } from 'react';
import { OrderElement } from '../../order-element/order-element.component';
import { Link, useLocation } from 'react-router-dom';
import { TOrderData } from '../../../utils/data';
import { useDispatch, useSelector } from '../../../services/types';
import styles from './orders.styles.module.css'
import { ordersClose, ordersInit } from '../../../services/actions/orders';


export const OrdersPage:FC = () => 
{
    const location = useLocation();
    const dispatch = useDispatch();
    const orders: Array<TOrderData> = useSelector(store => store.ordersReducer.orders);

    useEffect(() => {
        dispatch(ordersInit());
        return () => {
            dispatch(ordersClose());
        }
    });

    const showOrder = (order:TOrderData) => {
        
    };

    const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
        ) - 310;

    return (
       <div  style={{overflowY: 'auto', overflowX: 'hidden', maxHeight: `${scrollHeight}px`, scrollbarWidth: 'thin'}}>
            {orders && orders.map((order) => {
                return (
                    <Link
                        to={{pathname: `/profile/orders/${order._id}` }}
                        state= {{ background: location }}
                        onClick={() => showOrder(order)}
                        className={`${styles.link}`}>
                            <OrderElement order={order} status={false}/>
                    </Link>
                )
            })}
       </div>
    );
} 

export default memo(OrdersPage);