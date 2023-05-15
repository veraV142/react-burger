import { useContext} from 'react';
import { ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.styles.module.css'
import { IngredientsContext} from '../../utils/contexts';
import {Checkout} from '../checkout/checkout.component';

export const BurgerConstructor = () => 
{
    const state = useContext(IngredientsContext);
    const {ingredientsData, buhData} = state;

    const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
        ) - 550;

    return (
        <div className={`mt-25 ${styles.panel}`}>

            <div className={`mt-2 mb-4 mr-4 pr-4`}>
                {buhData &&
                <ConstructorElement
                    type={'top'}
                    isLocked={true}
                    text={`${buhData.name} (верх)`}
                    price={buhData.price}
                    thumbnail={buhData.image}
                />}
            </div>
            <div className={`${styles.menu}`} 
                style={{overflowY: 'auto', maxHeight: `${scrollHeight}px`, scrollBarColor: '#6969dd #e0e0e0', scrollbarWidth: 'thin' }}>
                {ingredientsData.map((elem) => {
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
                {
                buhData &&
                <ConstructorElement
                    type={'bottom'}
                    isLocked={true}
                    text={`${buhData.name} (низ)`}
                    price={buhData.price}
                    thumbnail={buhData.image}
                />}
            </div>
            <Checkout />
        </div>
    );
}

export default BurgerConstructor;