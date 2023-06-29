import React, {FC} from 'react';
import styles from './burger-constructor-list-elements.styles.module.css'
import BurgerConstructorElement from '../burger-element/burger-element.component'
import { TIngredient } from '../../utils/data';


interface IBurgerConstructorProps {
    bunList: TIngredient[],
    sauceList: TIngredient[],
    mainList: TIngredient[],
    showIngredient: (data: TIngredient, selected: boolean) => void
}

const BurgerConstructorListElements: FC<IBurgerConstructorProps> = (props: IBurgerConstructorProps)=>
{
    const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
        ) - 310;

    return (
        <div className='mr-10' style={{overflowY: 'auto', overflowX: 'hidden', maxHeight: `${scrollHeight}px`, scrollbarWidth: 'thin'}}>
            <h2 id='bun_tab' className="mb-6 mt-10 text text_type_main-medium">
                Булки
            </h2>
            <div  className={`mt-6 ml-4 mr-4 ${styles.table_el}`} >
                {props.bunList.map((elem) => {
                    return (
                        <BurgerConstructorElement key={elem._id} data={elem} showIngredient={props.showIngredient}/>
                    );
                })}
            </div>
            <h2 id='sauce_tab' className="mb-6 mt-2 text text_type_main-medium mb-6">
                Соусы
            </h2>
            <div className={`mt-6 ml-4 mr-4 ${styles.table_el}`} >
                {props.sauceList.map((elem) => {
                    return (
                        <BurgerConstructorElement key={elem._id} data={elem} showIngredient={props.showIngredient}/>
                    );
                })}
            </div>
            <h2 id='main_tab' className="mb-6 mt-2 text text_type_main-medium mb-6">
                Начинки
            </h2>
            <div className={`mt-6 ml-4 mr-4 ${styles.table_el}`}>
                {props.mainList.map((elem) => {
                    return (
                        <BurgerConstructorElement key={elem._id} data={elem} showIngredient={props.showIngredient} />
                    );
                })}
            </div>
        </div>
    );
    
}

export default BurgerConstructorListElements;
