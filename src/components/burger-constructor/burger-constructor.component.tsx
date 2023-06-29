import { ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.styles.module.css'
import {Checkout} from '../checkout/checkout.component';
import { useDrop, useDrag } from "react-dnd";
import { ADD_INGREDIENT, DROP_INGREDIENT, CALC_SUM, MOVE_INGREDIENT } from "../../services/actions/ingredientConstructor"
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from '../../services/types';
import { FC } from "react";
import { TIngredient } from '../../utils/data';

interface TDrop {
	ingredient: TIngredient;
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
        <div className={`mt-25 ${styles.panel}`} ref={dropTarget}> 

            <div className={`mt-2 mb-4 mr-4 ml-7 pr-4`}>
                {selectedBun &&
                <ConstructorElement
                    type={'top'}
                    isLocked={false}
                    text={`${selectedBun.name} (верх)`}
                    price={selectedBun.price}
                    thumbnail={selectedBun.image??""}
                    handleClose={() => dropIngredient(undefined)}
                />}
            </div>
            <div className={`${styles.menu}`} 
                style={{overflowY: 'auto', maxHeight: `${scrollHeight}px`, scrollbarWidth: 'thin' }}>
                {selectedIngredients && selectedIngredients.map((elem) => {
                    return (
                        <div key={elem.uuid}>
                            <FillingElement uuid={`${elem.uuid}`} />
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
                    text={`${selectedBun.name} (низ)`}
                    price={selectedBun.price}
                    thumbnail={selectedBun.image??""}
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

    const elem = selectedIngredients.filter(si => si.uuid === props.uuid)[0];

    const dispatch = useDispatch();

    function dropIngredient(uuid?: string) {
        dispatch({ type: DROP_INGREDIENT, uuid: uuid });
        dispatch({ type: CALC_SUM });
    }

    const [{ isDrag }, drag] = useDrag({
        type: "fillings",
        item: { uuid: elem.uuid },
        collect: (monitor) => ({
          isDrag: monitor.isDragging(),
        }),
      });

      const opacity = isDrag ? 0 : 1;

      const [, drop] = useDrop({
        accept: "fillings",
        
        hover: (item:IDrop) => {
            if (item.uuid === elem.uuid)
                return;
            dispatch({ type: MOVE_INGREDIENT, fromItemIndex: elem.uuid, toItemIndex: item.uuid });
        },
    });

    let result = drag(drop(
        <div className={`mt-2 mb-2 pr-4 ${styles.filling}`} ref={drop} style={{ opacity }}>
                            <span className='mt-6 mr-2'>
                                <DragIcon type="primary" />
                            </span>
                            <ConstructorElement
                                isLocked={false}
                                text={elem.name??""}
                                price={elem.price??0}
                                thumbnail={elem.image??""}
                                handleClose={() => dropIngredient(elem.uuid)}
                            />
                        </div>
    ))

    return result;
}

export default BurgerConstructor;