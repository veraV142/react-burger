import React, {useEffect} from 'react';
import styles from './burger-list-elements.styles.module.css'
import BurgerElement from '../burger-element/burger-element.component'
import { useSelector, useDispatch} from "react-redux";
import { useInView } from "react-intersection-observer"
import { TAB_CHANGE } from '../../services/actions/index'

const BurgerListElements = (props) => 
{
    const [refBun, bunInView] = useInView({ threshold: 0 })
    const [refSauce, sauceInView] = useInView({ threshold: 0 })
    const [refMain, mainInView] = useInView({ threshold: 0 })


    const dispatch = useDispatch();

    useEffect(() => {
        if (bunInView) {
            dispatch({type: TAB_CHANGE, tab: 'bun'});
        } else
        if (sauceInView) {
            dispatch({type: TAB_CHANGE, tab: 'sauce'});
        } else
        if (mainInView) {
            dispatch({type: TAB_CHANGE, tab: 'main'});
        }
    }, 
    [dispatch, bunInView, sauceInView, mainInView]);


    const bunList = useSelector(store => store.ingredientsLoadReducer.bunList);
    const sauceList = useSelector(store => store.ingredientsLoadReducer.sauceList);
    const mainList = useSelector(store => store.ingredientsLoadReducer.mainList);

    const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
        ) - 310;

    return (
        <div className='mr-10' style={{overflowY: 'auto', overflowX: 'hidden', maxHeight: `${scrollHeight}px`, scrollBarColor: '#6969dd #e0e0e0', scrollbarWidth: 'thin'}}>
            <h2 id='bun' align='left' className="mb-6 mt-10 text text_type_main-medium">
                Булки
            </h2>
            <div  className={`mt-6 ml-4 mr-4 ${styles.table_el}`} ref={refBun}>
                {bunList && bunList.map((elem) => {
                    return (
                        <BurgerElement key={elem._id} data={elem} showIngredient={props.showIngredient}/>
                    );
                })}
            </div>
            <h2 id='sauce' align='left' className="mb-6 mt-2 text text_type_main-medium mb-6">
                Соусы
            </h2>
            <div className={`mt-6 ml-4 mr-4 ${styles.table_el}`} ref={refSauce}>
                {sauceList && sauceList.map((elem) => {
                    return (
                        <BurgerElement key={elem._id} data={elem} showIngredient={props.showIngredient}/>
                    );
                })}
            </div>
            <h2 id='main' align='left' className="mb-6 mt-2 text text_type_main-medium mb-6">
                Начинки
            </h2>
            <div className={`mt-6 ml-4 mr-4 ${styles.table_el}`} ref={refMain}>
                {mainList && mainList.map((elem) => {
                    return (
                        <BurgerElement key={elem._id} data={elem} showIngredient={props.showIngredient} />
                    );
                })}
            </div>
        </div>
    );
}

export default BurgerListElements;