import React from 'react';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

class Checkout  extends React.Component {
    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <p>{this.props.sum}</p>
                <CurrencyIcon type="primary" />
                <Button htmlType="button" type="primary" size="medium" extraClass="ml-2">
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
          ) - 250;

        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', 
                    overflowY: 'auto', maxHeight: `${scrollHeight}px`, scrollBarColor: '#6969dd #e0e0e0', scrollbarWidth: 'thin' }}>
                    {this.props.allData.map((elem) => {

                        let typeCE = undefined;
                        if (firstEl._id === elem._id)
                            typeCE = "top";
                        if (lastEl._id === elem._id)
                            typeCE = "bottom";

                        return (
                            <ConstructorElement
                                type={typeCE}
                                isLocked={true}
                                text={elem.name}
                                price={elem.price}
                                thumbnail={elem.image}
                            />
                        );
                    })}
                </div>
                <Checkout sum={610} />
            </div>
        );
    }
}