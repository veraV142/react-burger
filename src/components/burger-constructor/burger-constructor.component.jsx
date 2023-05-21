import { ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.styles.module.css'
import {Checkout} from '../checkout/checkout.component';
import { useDispatch, useSelector } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import { ADD_INGREDIENT, DROP_INGREDIENT, CALC_SUM, MOVE_INGREDIENT } from "../../services/actions/index"

export const BurgerConstructor = () => 
{
    const dispatch = useDispatch();

    const [, dropTarget] = useDrop({
        accept: "ingredients",
        drop: (ing) => {
          dispatch({ type: ADD_INGREDIENT, data: ing });
          dispatch({ type: CALC_SUM });
        },
      });

    function dropIngredient(index) {
        dispatch({ type: DROP_INGREDIENT, index: index });
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

            <div className={`mt-2 mb-4 mr-4 pr-4`}>
                {selectedBun &&
                <ConstructorElement
                    type={'top'}
                    isLocked={false}
                    text={`${selectedBun.name} (верх)`}
                    price={selectedBun.price}
                    thumbnail={selectedBun.image}
                    handleClose={() => dropIngredient(-1)}
                />}
            </div>
            <div className={`${styles.menu}`} 
                style={{overflowY: 'auto', maxHeight: `${scrollHeight}px`, scrollBarColor: '#6969dd #e0e0e0', scrollbarWidth: 'thin' }}>
                {selectedIngredients && selectedIngredients.map((elem) => {
                    return (
                        <div key={elem.index}>
                            <FillingElement index={elem.index}/>
                        </div>
                    );
                })}
            </div>
            <div className={`mt-4 mb-2 mr-4 pr-4`}>
                {
                selectedBun &&
                <ConstructorElement
                    type={'bottom'}
                    isLocked={false}
                    text={`${selectedBun.name} (низ)`}
                    price={selectedBun.price}
                    thumbnail={selectedBun.image}
                    handleClose={() => dropIngredient(-1)}
                />}
            </div>
            <Checkout />
        </div>
    );
}

const FillingElement = (props) => 
{
    const { index } = props;
    const selectedIngredients = useSelector(store => 
        store.ingredientConstructorReducer.selectedIngredients);

    const elem = selectedIngredients.filter(si => si.index === index)[0];

    const dispatch = useDispatch();

    function dropIngredient(index) {
        dispatch({ type: DROP_INGREDIENT, index: index });
        dispatch({ type: CALC_SUM });
    }

    const [{ isDrag }, drag] = useDrag({
        type: "fillings",
        item: { index: elem.index },
        collect: (monitor) => ({
          isDrag: monitor.isDragging(),
        }),
      });

      const [, drop] = useDrop({
        accept: "fillings",
        
        drop: (item) => {
            dispatch({ type: MOVE_INGREDIENT, data: {fromItemIndex: elem.index, toItemIndex: item.index} });
        }
    });

    return drag(drop(
        !isDrag && <div className={`mt-2 mb-2 pr-4 `} ref={drop}>
                            <ConstructorElement
                                isLocked={false}
                                text={elem.ingredient.name}
                                price={elem.ingredient.price}
                                thumbnail={elem.ingredient.image}
                                handleClose={() => dropIngredient(elem.index)}
                            />
                        </div>
    ))
}

export default BurgerConstructor;