import { FC, useEffect } from 'react';
import { useLocation, useParams, useResolvedPath } from "react-router-dom";
import { useDispatch, useSelector } from '../../../services/types';
import { ordersClose, ordersInit } from '../../../services/actions/orders';
import { feedClose, feedInit } from '../../../services/actions/feed';
import { TIngredient } from '../../../utils/data';
import { IconEl, getStatusDesc } from '../../order-element/order-element.component';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-panel.style.module.css'
import { toDate } from '../../../utils/utils';
import { getIngredients } from '../../../services/actions/ingredientsLoad';

export const OrderPanelPage:FC = () => {

    const { id } = useParams<{id: string}>();
    const path = useResolvedPath("").pathname;


	const location = useLocation();
    const feedBackground = location.state?.feed;
    const orderBackground = location.state?.order;

    console.log(`path = ${path}`);
    console.log(`id = ${id}`);

	const ordersState = useSelector(store => store.ordersReducer);
    const feedState = useSelector(store => store.feedReducer);
    const ingredients = useSelector(store => store.ingredientsLoadReducer.data);

    const orderPath = '/profile/orders/' + id;
    const feedPath = '/feed/' + id;

    const orders = path === orderPath ? ordersState.orders : feedState.orders;
    
    
    const order = orders.find(o => o._id === id);

    const orderIngredients: Array<TIngredient> = [];
    ingredients.forEach(ingredient => {
        var orderIngredient = order?.ingredients.find(oi => oi && oi === ingredient._id);
        if (orderIngredient !== undefined && orderIngredient !== null)
            orderIngredients.push(ingredient);
    });

    console.log(`${orders.length}  ${ingredients.length}  ${orderIngredients.length}`);

    const dispatch = useDispatch();
	
    const ingCount = (ingredient: TIngredient) => 
    {
        let cIng = orderIngredients.filter((item) => item === ingredient).length;
        return ingredient.type === "bun"
            ? `${cIng*2} x ${ingredient.price}`
            : `${cIng} x ${ingredient.price}`;
    };

    const totalPrice =  
        orderIngredients?.reduce((sum, item) => {
          if (item?.type === "bun") {
            return (sum += item.price * 2);
          }
          return sum += (item ? item.price : 0);
        }, 0);

    useEffect(() => {

        if (!ordersState.wsConnected && path === orderPath )
            dispatch(ordersInit());
        if (!feedState.wsConnected && path === feedPath )
            dispatch(feedInit());

        if (ingredients.length === 0)
            dispatch(getIngredients());
        else if (!order) {
          if (path === orderPath) {
            dispatch(ordersInit());
          }
          if (path === feedPath) {
            dispatch(feedInit());
          }
        }
        return () => {
          if (path === orderPath) {
            dispatch(ordersClose());
          }
          if (path === feedPath) {
            dispatch(feedClose());
          }
        };
      }, [order]);

    const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
     ) - 510;

	return (
		<> {
            order && (
                <div className={`ml-8 mr-8 pb-8`}>
                    {(!feedBackground && !orderBackground)&& (<p className={`${styles.order_num} text text_type_digits-default pb-10 mt-15`}>#{order.number}</p>)}
                    {(feedBackground || orderBackground)&& (<p className="text text_type_digits-default pb-10 pt-2">#{order.number}</p>)}
                    <h3 className="text text_type_main-medium pb-4">
                        {order.name}
                    </h3>
                    {!!order.status && (
                        <p className={`${styles.status} text text_type_main-default pb-15`}>
                            {getStatusDesc(order.status)}
                        </p>
                    )}
                    <p className={`text text_type_main-medium pb-4`}>
                        Состав:
                    </p>
                    <div style={{overflowY: 'auto', overflowX: 'hidden', maxHeight: `${scrollHeight}px`, scrollbarWidth: 'thin'}}>
                        {orderIngredients && orderIngredients.map((ingredient) => {
                            return (
                                <div className={`${styles.ingredients} pr-4`}  key={ingredient._id}>
                                    <div className={styles.ingredient_info}>
                                        <IconEl image={ingredient.image??""} alt={ingredient.name??""} />
                                        <p className={`text text_type_main-default pl-4`}>
                                            {ingredient.name}
                                        </p>
                                    </div>
                                    <div className={styles.ingredient_price}>
                                        <p className="text text_type_digits-default pr-2">
                                            {ingCount(ingredient)}
                                        </p>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                    
                                </div>
                            )
                        })}
                    </div>
                    <div className={`${styles.currency} pt-10 `}>
                        <p className="text text_type_main-default text_color_inactive">
                        {toDate(order.createdAt)}
                        </p>
                        <div className={styles.total_price}>
                        <p className="text text_type_digits-default pr-2">
                            {totalPrice}
                        </p>
                        <CurrencyIcon type="primary"/>
                        </div>
                    </div>

                </div>
            )
        }</>
	)
} 