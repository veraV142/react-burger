import React, {FC} from 'react';
import styles from './burger-element.styles.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from "react-dnd";
import { Link, useLocation } from 'react-router-dom';
import { TIngredient } from '../../utils/data';
import { useSelector } from '../../services/types';

interface IBurgerElementProps {
    data: TIngredient,
    showIngredient: (data: TIngredient, selected: boolean) => void
}

const BurgerElement: FC<IBurgerElementProps> = (props) => 
{
    const location = useLocation();

    const [{ isDrag }, dragRef] = useDrag({
        type: "ingredients" ,
        item: { ingredient: props.data },
        collect: (monitor) => ({
          isDrag: monitor.isDragging(),
        }),
      });

    const selectedBunCount = useSelector(store => 
        store.ingredientConstructorReducer.selectedBun === null || (store.ingredientConstructorReducer.selectedBun as TIngredient)?._id !== props.data._id ? 0 : 2);
    const selectedIngredientCount = useSelector(store => store.ingredientConstructorReducer.selectedIngredients
        .filter(si => (si as TIngredient)._id === props.data._id).length);
    const countEl = props.data.type === 'bun' ? selectedBunCount : selectedIngredientCount;

    return ( 
        <>{
            !isDrag &&
            <div className={`ml-4 mb-8 ${styles.constructor_el}`} ref={dragRef} data-cy={`ingredient${props.data._id}`}>
            <Link
                to={{pathname: `/ingredients/${props.data._id}` }}
                state= {{ background: location }}
                onClick={() => props.showIngredient(props.data, true)}
                className={`${styles.link}`}>
                        { countEl !== 0 && <Counter count={countEl} size="default" />}
                        <img src={props.data.image} alt={props.data.name} className="ml-4 mr-4 mt-6" />
    
                        <div className={`mt-1 mb-1 ${styles.price_for_icon}`}>
                            <p className={`mr-4 text text_type_digits-default`}>{props.data.price}</p>
                            <CurrencyIcon type="primary"/>
                        </div>
    
                        <p className={`text text_type_main-default ${styles.name_ing}`}>
                            {props.data.name}
                        </p>
                    
            </Link>
            </div>
        }</>
    );
}

export default BurgerElement;
