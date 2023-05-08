import React, {useState} from 'react';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.styles.module.css'
import PropTypes from 'prop-types'
import { dataType } from '../../utils/data';
import OrderDetails from '../order-details/order-details.component'
import Modal from '../modal/modal.component';

const Checkout = (props) =>  
{
    const [showedOrder, showOrder] = useState({ selected: false });

    return (
        <div className={`mt-10 mr-8 ${styles.checkout_st}`}>
            <p className={`mt-2 text text_type_digits-medium`}>{props.sum}</p>
            <div className={`mr-10 mt-4`}>
                <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="medium" onClick={() => showOrder({selected: true, orderNum: '034536'})}>
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

Checkout.propTypes = {
    sum: PropTypes.number.isRequired
}

export default class BurgerConstructor extends React.Component 
{
    render() 
    {
        const dataLen = Object.keys(this.props.allData).length;
        let firstEl = -1; let lastEl = -1;
        const centerEls = [];

        if (dataLen > 3)
            for (let index = 0; index < dataLen; index++) 
            {
                let element = this.props.allData[index];
                if (index === 0) 
                    firstEl = element;
                else if (index === dataLen - 1) 
                    lastEl = element;
                else {
                    centerEls.push(element);
                }
            }
        else {
            return (
                <div>Данные некорректны</div>
            );
        }

        const scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
          ) - 550;

        return (
            <div className={`mt-25 ${styles.panel}`}>

                <div className={`mt-2 mb-4 mr-4 pr-4`}>
                    <ConstructorElement
                        type={'top'}
                        isLocked={true}
                        text={`${firstEl.name} (верх)`}
                        price={firstEl.price}
                        thumbnail={firstEl.image}
                    />
                </div>
                <div className={`${styles.menu}`} 
                    style={{overflowY: 'auto', maxHeight: `${scrollHeight}px`, scrollBarColor: '#6969dd #e0e0e0', scrollbarWidth: 'thin' }}>
                    {centerEls.map((elem) => {
                        return (
                            <div className={`mt-2 mb-2 pr-4 `} key={elem._id}>
                                <ConstructorElement
                                    isLocked={true}
                                    text={elem.name}
                                    price={elem.price}
                                    thumbnail={elem.image}
                                />
                            </div>
                            
                        );
                    })}
                </div>
                <div className={`mt-4 mb-2 mr-4 pr-4`}>
                    <ConstructorElement
                        type={'bottom'}
                        isLocked={true}
                        text={`${lastEl.name} (низ)`}
                        price={lastEl.price}
                        thumbnail={lastEl.image}
                    />
                </div>
                <Checkout sum={610} />
            </div>
        );
    }
}

BurgerConstructor.propTypes = {
    allData: PropTypes.arrayOf(dataType).isRequired
}