import {FC, useMemo } from "react";
import { TOrderData } from "../../utils/data";
import { useSelector } from "../../services/types";
import styles from "./order-element.styles.module.css";
import { toDate } from "../../utils/utils";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type TOrderElement = {
    order: TOrderData;
	status: string | boolean;
}

type TIcon = {
    image: string;
    alt: string;
}

export const OrderElement :FC<TOrderElement> = ({ order, status }) => 
{ 
    const ingredients = useSelector(
        (store) => store.ingredientsLoadReducer.data
    );
    const { createdAt, number, name } = order;

    const max = order.ingredients.length;
    const rest = max - 6;

    const orderIngredients = useMemo(() => {
        return order?.ingredients.map((id) => {
          return ingredients?.find((item) => {
            return id === item._id;
          });
        });
    }, [order?.ingredients, ingredients]);

    const totalPrice = useMemo(() => {
        return orderIngredients?.reduce((sum, item) => {
          if (item?.type === "bun") {
            return (sum += item.price * 2);
          }
          return (sum += item ? item.price : 0);
        }, 0);
    }, [orderIngredients]);

    return (
        <div className={styles.block}>
            <div className={styles.orderNum}>
                <p className="text text_type_digits-default">#{number}</p>
                <p className="text text_type_main-default text_color_inactive">
                    {toDate(createdAt)}
                </p>
            </div>
            <div className={styles.orderData}>
                <h2 className={`${styles.orderText} text text_type_main-medium`}>{name}</h2>
                {!!status && (
                    <p className={`${styles.orderStatus} text text_type_main-default`}>
                        {getStatusDesc(status)}
                    </p>)}
            </div>
            <div className={styles.orderList}>
                <div className={styles.imageList}>
                {orderIngredients &&
                    max <= 5 &&
                    orderIngredients.map((item, index) => {
                        return (
                            <div className={styles.orderIcon} key={index}>
                                {item && <IconEl image={item.image??""} alt={item.name??""} />}
                            </div>
                        );
                    })}
                {orderIngredients &&
                    max >= 6 &&
                    orderIngredients.slice(0, 5).map((item, index) => {
                        return (
                            <div className={styles.orderIcon} key={index}>
                                {item && <IconEl image={item.image??""} alt={item.name??""} />}
                            </div>
                        );
                    })}
                {orderIngredients &&
                    max > 6 &&
                    orderIngredients.slice(5, 6).map((item, index) => {
                    return (
                        <div className={styles.orderIcon} key={index}>
                        {item && (
                            <>
                                <p className={`text text_type_main-default ${styles.ht}`}>
                                    {`+${rest}`}
                                </p>
                                <div className={styles.hp}>
                                    <IconEl image={item.image??""} alt={item.name??""} />
                                </div>
                            </>
                        )}
                        </div>
                    ); })}
                </div>
                <div className={styles.price}>
                    <p className="text text_type_digits-default pr-2">
                        {totalPrice}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}

export const IconEl: FC<TIcon> = ({ image, alt }) => {
    return (
        <div className={styles.iconElem}>
        <div className={styles.imc}>
            <img className={styles.im} src={image} alt={alt} />
        </div>
        </div>
    );
};

function getStatusDesc(status: true|string):string {
    return status === "created" ? "Создан" : status === "pending" ? "Готовится" : "Выполнен"
}
