import { memo, useEffect, FC} from 'react';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './checkout.styles.module.css'
import OrderDetails from '../order-details/order-details.component'
import Modal from '../modal/modal.component';
import { DROP_ORDER_NUM } from '../../services/actions/order';
import {CLEAR_INGREDIENTS} from '../../services/actions/ingredientConstructor';
import { sendOrderAndGetResult } from '../../services/actions/order'
import { getCookie } from '../../utils/utils';
import { useNavigate } from "react-router-dom";
import { LOGOUT_CLEAR } from '../../services/actions/logout';
import { useDispatch, useSelector } from '../../services/types';
import { TIngredient } from '../../utils/data';

export const Checkout: FC  = () =>  
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
        const ingredients: Array<TIngredient> = [];
        if (buhData !== undefined) {
            ingredients.push(buhData as TIngredient);
            ingredients.push(buhData as TIngredient);
        }

        ingredientsData.forEach(ing => ingredients.push(ing as TIngredient))
        dispatch(sendOrderAndGetResult(ingredients));
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
    }, [orderNumFail, tokenInvalid, dispatch, navigate])

    const checkoutVisible = buhData != null || ingredientsData.length > 0;

    return (
        <>
        {checkoutVisible &&
        <div className={`mt-10 mr-8 ${styles.checkout_st}`}>
            <p className={`mt-2 text text_type_digits-medium`}>{sum}</p>
            <div className={`mr-10 mt-4`}>
                <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="medium" onClick={onSendOrderAndGetResult} data-cy={`order-submit`}>
                Оформление заказа
            </Button>
            {
                orderNum != null && (
                    <Modal header={'Детали ингредиента'} showed={orderNum != null} onClose={closeOrder}>
                        <OrderDetails/>
                    </Modal>
                )
            }
        </div>}
        </>
    );
    
}

export default memo(Checkout);