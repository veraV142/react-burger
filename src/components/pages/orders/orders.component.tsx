import  { FC, memo, useEffect } from 'react';
import { OrderElement } from '../../order-element/order-element.component';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../services/types';
import styles from './orders.styles.module.css'
import { ordersClose, ordersInit } from '../../../services/actions/orders';


export const OrdersPage:FC = () => 
{
    const location = useLocation();
    const dispatch = useDispatch();
    
    const ordersState =  useSelector(store => store.ordersReducer);

    useEffect(() => {
        if (!ordersState.wsConnected)
            dispatch(ordersInit());
        return () => {
            dispatch(ordersClose());
        }
    }, []);

    const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
        ) - 140;

    return (
       <div className={`mt-8 ml-8`} style={{overflowY: 'auto', overflowX: 'hidden', maxHeight: `${scrollHeight}px`, scrollbarWidth: 'thin'}}>
            {ordersState.orders && ordersState.orders.map((order) => {
                return (
                    <Link
                        to={{pathname: `/profile/orders/${order._id}` }}
                        state= {{ order: location }}
                        className={`${styles.link}`}>
                            <OrderElement order={order} status={true}/>
                    </Link>
                )
            })}
       </div>
    );
} 

export default memo(OrdersPage);