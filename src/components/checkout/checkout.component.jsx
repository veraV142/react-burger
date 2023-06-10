import { memo, useEffect} from 'react';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './checkout.styles.module.css'
import OrderDetails from '../order-details/order-details.component'
import Modal from '../modal/modal.component';
import { useDispatch, useSelector } from "react-redux";
import { DROP_ORDER_NUM } from '../../services/actions/order';
import {CLEAR_INGREDIENTS} from '../../services/actions/ingredientConstructor';
import { sendOrderAndGetResult } from '../../services/actions/order'
import { getCookie } from '../../utils/utils';
import { useNavigate } from "react-router-dom";
import { LOGOUT_CLEAR } from '../../services/actions/logout';

export const Checkout = () =>  
{
    const sum = useSelector(store => store.ingredientConstructorReducer.sum);

    const buhData = useSelector(store => store.ingredientConstructorReducer.selectedBun)
    const ingredientsData = useSelector(store => store.ingredientConstructorReducer.selectedIngredients)
    const orderNum = useSelector(store => store.orderNumReducer.orderNum);
    const orderNumFail = useSelector(store => store.orderNumReducer.orderNumFail);
    const tokenInvalid = useSelector(store => store.userReducer.tokenInvalid);

    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    
    const onSendOrderAndGetResult = () => 
    {
        const refreshToken = getCookie('refreshToken');
        if (refreshToken === null || refreshToken === '') {
            dispatch({ type: LOGOUT_CLEAR });
            navigate('/logout');
        }
        const ingredients = ingredientsData.map(idata => idata.ingredient);
        dispatch(sendOrderAndGetResult([buhData, buhData, ...ingredients]));
    };
    
    function closeOrder() {
        dispatch({type: DROP_ORDER_NUM});
        dispatch({ type: CLEAR_INGREDIENTS })
    }

    useEffect(() => {
        if (orderNumFail || tokenInvalid) {
            dispatch({ type: LOGOUT_CLEAR });
            navigate('/logout');
        }
    }, [orderNumFail, tokenInvalid])

    const checkoutVisible = buhData != null || ingredientsData.length > 0;

    return (checkoutVisible &&
        <div className={`mt-10 mr-8 ${styles.checkout_st}`}>
            <p className={`mt-2 text text_type_digits-medium`}>{sum}</p>
            <div className={`mr-10 mt-4`}>
                <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="medium" onClick={onSendOrderAndGetResult}>
                Оформление заказа
            </Button>
            {
                orderNum != null && (
                    <Modal header={'Детали ингредиента'} showed={orderNum != null} onClose={closeOrder}>
                        <OrderDetails/>
                    </Modal>
                )
            }
        </div>
    );
    
}

export default memo(Checkout);