import React from 'react';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.styles.module.css'

class Checkout  extends React.Component {
    render() {
        return (
            <div className={`mt-10 mr-8 ${styles.checkout_st}`}>
                <p className={`mt-2 text text_type_digits-medium`}>{this.props.sum}</p>
                <div className={`mr-10 mt-4`}>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="medium">
                    Оформление заказа
                </Button>
            </div>
        );
    }
}

export default class BurgerIngredients extends React.Component 
{
    render() 
    {
        let dataLen = Object.keys(this.props.allData).length;
        let firstEl = -1; let lastEl = -1;
        if (dataLen > 0)
        {
            firstEl = this.props.allData[0];
            lastEl = this.props.allData[dataLen - 1];
        } 

        let scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
          ) - 350;

        return (
            <div className={`mt-25 ${styles.panel}`}>
                <div className={`ml-4 mr-4 ${styles.menu}`} 
                    style={{overflowY: 'auto', maxHeight: `${scrollHeight}px`, scrollBarColor: '#6969dd #e0e0e0', scrollbarWidth: 'thin' }}>
                    {this.props.allData.map((elem) => {

                        let typeCE = undefined;
                        if (firstEl._id === elem._id)
                            typeCE = "top";
                        if (lastEl._id === elem._id)
                            typeCE = "bottom";

                        return (
                            <div className={`mt-2 mb-2 mr-4`}>
                                <ConstructorElement
                                    type={typeCE}
                                    isLocked={true}
                                    text={elem.name}
                                    price={elem.price}
                                    thumbnail={elem.image}
                                />
                            </div>
                            
                        );
                    })}
                </div>
                <Checkout sum={610} />
            </div>
        );
    }
}