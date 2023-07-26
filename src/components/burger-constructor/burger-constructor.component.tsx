import { ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.styles.module.css'
import {Checkout} from '../checkout/checkout.component';
import { useDrop, useDrag } from "react-dnd";
import { ADD_INGREDIENT, DROP_INGREDIENT, CALC_SUM, MOVE_INGREDIENT } from "../../services/actions/ingredientConstructor"
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from '../../services/types';
import { FC } from "react";
import { TIngredient, TIngredientExt } from '../../utils/data';

interface TDrop {
	ingredient: TIngredient | TIngredientExt;
}

export const BurgerConstructor: FC = () => 
{
    const dispatch = useDispatch();

    const [, dropTarget] = useDrop({
        accept: "ingredients",
        drop: (ing: TDrop) => {
          const uuid = uuidv4();
          dispatch({ type: ADD_INGREDIENT, data: { ...ing.ingredient, uuid: uuid} });
          dispatch({ type: CALC_SUM });
        },
      });

    function dropIngredient(uuid?: string) {
        dispatch({ type: DROP_INGREDIENT, uuid: uuid });
        dispatch({ type: CALC_SUM });
    }

    const selectedIngredients = useSelector(store => { 
        return store.ingredientConstructorReducer.selectedIngredients; }
    );
    const selectedBun = useSelector(store => store.ingredientConstructorReducer.selectedBun);

    const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
        ) - 550;

    return (
        <div className={`mt-25 ${styles.panel}`} ref={dropTarget} data-cy={'constructor'}> 

            <div className={`mt-2 mb-4 mr-4 ml-7 pr-4`}>
                {selectedBun &&
                <ConstructorElement
                    type={'top'}
                    isLocked={false}
                    text={`${(selectedBun as TIngredient).name} (верх)`}
                    price={(selectedBun as TIngredient).price}
                    thumbnail={(selectedBun as TIngredient).image??""}
                    handleClose={() => dropIngredient(undefined)}
                />}
            </div>
            <div className={`${styles.menu}`} 
                style={{overflowY: 'auto', maxHeight: `${scrollHeight}px`, scrollbarWidth: 'thin' }}>
                {selectedIngredients && selectedIngredients.map((elem) => {
                    return (
                        <div key={(elem as TIngredientExt).uuid}>
                            <FillingElement uuid={`${(elem as TIngredientExt).uuid}`} />
                        </div>
                    );
                })}
            </div>
            <div className={`mt-4 mb-2 mr-4 pr-4 ml-7 `}>
                {
                selectedBun &&
                <ConstructorElement
                    type={'bottom'}
                    isLocked={false}
                    text={`${(selectedBun as TIngredient).name} (низ)`}
                    price={(selectedBun as TIngredient).price}
                    thumbnail={(selectedBun as TIngredient).image??""}
                    handleClose={() => dropIngredient(undefined)}
                />}
            </div>
            <Checkout />
        </div>
    );
}

interface IDrop {
    uuid: string;
}

interface TFillingElementProps {
    uuid: string
} 

const FillingElement = (props: TFillingElementProps) => 
{
    const selectedIngredients = useSelector(store => 
        store.ingredientConstructorReducer.selectedIngredients);

    const elem = selectedIngredients.filter(si => (si as TIngredientExt).uuid === props.uuid)[0];

    const dispatch = useDispatch();

    function dropIngredient(uuid?: string) {
        dispatch({ type: DROP_INGREDIENT, uuid: uuid });
        dispatch({ type: CALC_SUM });
    }

    const [{ isDrag }, drag] = useDrag({
        type: "fillings",
        item: { uuid: (elem as TIngredientExt).uuid },
        collect: (monitor) => ({
          isDrag: monitor.isDragging(),
        }),
      });

      const opacity = isDrag ? 0 : 1;

      const [, drop] = useDrop({
        accept: "fillings",
        
        hover: (item:IDrop) => {
            if (item.uuid === (elem as TIngredientExt).uuid)
                return;
            dispatch({ type: MOVE_INGREDIENT, fromItemIndex: (elem as TIngredientExt).uuid, toItemIndex: item.uuid });
        },
    });

    let result = drag(drop(
        <div className={`mt-2 mb-2 pr-4 ${styles.filling}`} ref={drop} style={{ opacity }}>
                            <span className='mt-6 mr-2'>
                                <DragIcon type="primary" />
                            </span>
                            <ConstructorElement
                                isLocked={false}
                                text={(elem as TIngredient).name??""}
                                price={(elem as TIngredient).price??0}
                                thumbnail={(elem as TIngredient).image??""}
                                handleClose={() => dropIngredient((elem as TIngredientExt).uuid)}
                            />
                        </div>
    ))

    return result;
}

export default BurgerConstructor;