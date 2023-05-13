import { useContext} from 'react';
import { ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.styles.module.css'
import { BuhContext, IngredientsContext} from '../../utils/contexts';
import {Checkout} from '../checkout/checkout.component';

export const BurgerConstructor = () => 
{
    const buhEl = useContext(BuhContext);
    const ingredients = useContext(IngredientsContext);

    const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
        ) - 550;

    return (
        <div className={`mt-25 ${styles.panel}`}>

            <div className={`mt-2 mb-4 mr-4 pr-4`}>
                {buhEl &&
                <ConstructorElement
                    type={'top'}
                    isLocked={true}
                    text={`${buhEl.name} (верх)`}
                    price={buhEl.price}
                    thumbnail={buhEl.image}
                />}
            </div>
            <div className={`${styles.menu}`} 
                style={{overflowY: 'auto', maxHeight: `${scrollHeight}px`, scrollBarColor: '#6969dd #e0e0e0', scrollbarWidth: 'thin' }}>
                {ingredients.map((elem) => {
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
                buhEl &&
                <ConstructorElement
                    type={'bottom'}
                    isLocked={true}
                    text={`${buhEl.name} (низ)`}
                    price={buhEl.price}
                    thumbnail={buhEl.image}
                />}
            </div>
            <Checkout />
        </div>
    );
}

export default BurgerConstructor;