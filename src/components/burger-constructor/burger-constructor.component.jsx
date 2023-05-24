import { ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.styles.module.css'
import {Checkout} from '../checkout/checkout.component';
import { useDispatch, useSelector } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import { ADD_INGREDIENT, DROP_INGREDIENT, CALC_SUM, MOVE_INGREDIENT } from "../../services/actions/ingredientConstructor"
import { v4 as uuidv4 } from 'uuid';

export const BurgerConstructor = () => 
{
    const dispatch = useDispatch();

    const [, dropTarget] = useDrop({
        accept: "ingredients",
        drop: (ing) => {
          const uuid = uuidv4();
          dispatch({ type: ADD_INGREDIENT, data: { ingredient: ing.ingredient, uuid: uuid} });
          dispatch({ type: CALC_SUM });
        },
      });

    function dropIngredient(uuid) {
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
                    thumbnail={selectedBun.image}
                    handleClose={() => dropIngredient(null)}
                />}
            </div>
            <div className={`${styles.menu}`} 
                style={{overflowY: 'auto', maxHeight: `${scrollHeight}px`, scrollBarColor: '#6969dd #e0e0e0', scrollbarWidth: 'thin' }}>
                {selectedIngredients && selectedIngredients.map((elem) => {
                    return (
                        <div key={elem.uuid}>
                            <FillingElement uuid={elem.uuid}/>
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
                    thumbnail={selectedBun.image}
                    handleClose={() => dropIngredient(null)}
                />}
            </div>
            <Checkout />
        </div>
    );
}

const FillingElement = (props) => 
{
    const { uuid } = props;
    const selectedIngredients = useSelector(store => 
        store.ingredientConstructorReducer.selectedIngredients);

    const elem = selectedIngredients.filter(si => si.uuid === uuid)[0];

    const dispatch = useDispatch();

    function dropIngredient(uuid) {
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
        
        hover: (item) => {
            if (item.uuid === elem.uuid)
                return;
            dispatch({ type: MOVE_INGREDIENT, data: {fromItemIndex: elem.uuid, toItemIndex: item.uuid} });
        },
    });

    return drag(drop(
        <div className={`mt-2 mb-2 pr-4 ${styles.filling}`} ref={drop} style={{ opacity }}>
                            <span className='mt-6 mr-2'>
                                <DragIcon type="primary" />
                            </span>
                            <ConstructorElement
                                isLocked={false}
                                text={elem.ingredient.name}
                                price={elem.ingredient.price}
                                thumbnail={elem.ingredient.image}
                                handleClose={() => dropIngredient(elem.uuid)}
                            />
                        </div>
    ))
}

export default BurgerConstructor;