import {useState, useContext, memo} from 'react';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './checkout.styles.module.css'
import OrderDetails from '../order-details/order-details.component'
import Modal from '../modal/modal.component';
import { IngredientsContext, SumPriceContext } from '../../utils/contexts';
import { sendOrder } from '../../utils/burger-api';

export const Checkout = () =>  
{
    const [showedOrder, showOrder] = useState({ selected: false });
    const sum = useContext(SumPriceContext);
    const state = useContext(IngredientsContext);
    const {ingredientsData, buhData} = state;
    
    function sendOrderAndGetResult() {
        sendOrder([buhData, buhData, ...ingredientsData]).then((response) => {
            if (response.success) {
                const orNum = response.order.number;
                showOrder({selected: true, orderNum: `${orNum}`})
            }
            else 
                showOrder({selected: true, orderNum: 'отсутствует'})
        })
        .catch((error) => {
            console.log(`При загрузке данных произошла ошибка ${error}`);
            showOrder({selected: true, orderNum: 'отсутствует'});
        })
    }

    return (
        <div className={`mt-10 mr-8 ${styles.checkout_st}`}>
            <p className={`mt-2 text text_type_digits-medium`}>{sum}</p>
            <div className={`mr-10 mt-4`}>
                <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="medium" onClick={sendOrderAndGetResult}>
                Оформление заказа
            </Button>
            {
                showedOrder.selected && (
                    <Modal header={'Детали ингредиента'} showed={showedOrder.selected} onClose={() => showOrder({selected: false})}>
                        <OrderDetails orderNum={showedOrder.orderNum}/>
                    </Modal>
                )
            }
        </div>
    );
    
}

export default memo(Checkout);