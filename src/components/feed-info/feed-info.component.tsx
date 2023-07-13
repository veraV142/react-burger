import  { FC, memo, useEffect } from 'react';
import { useSelector } from '../../services/types';
import styles from "./feed-info.styles.module.css";

export const FeedInfo:FC = () => 
{
    const feedState =  useSelector(store => store.feedReducer);

    const ordersComplete = feedState.orders.filter(order => order.status === 'done').slice(0, 13);
    const ordersWork = feedState.orders.filter(order => order.status === 'pending').slice(0, 13);
    const totalAll = feedState.total;
    const totalToday = feedState.totalToday;

    return (
        <div className={styles.main}>
          <div className={`${styles.orders} mb-10`}>
            <div>
              <p className="text text_type_main-medium pb-4">Готовы:</p>
              <ul className={styles.list}>
                {ordersComplete.map((order) => {
                  return (
                    <li className={`${styles.done} text text_type_digits-default pb-2`} key={order._id}>
                      {order.number}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={`ml-10`}>
              <p className="text text_type_main-medium pb-4">В работе:</p>
              <ul className={styles.list}>
                {ordersWork.map((order) => {
                  return (
                    <li className={`${styles.work} text text_type_digits-default pb-2`} key={order._id}>
                      {order.number}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за все время:</p>
            <h2 className={`text text_type_digits-large ${styles.total} `}>
              {totalAll}
            </h2>
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <h2 className={`text text_type_digits-large ${styles.total}`}>
              {totalToday}
            </h2>
          </div>
        </div>
      );
} 

export default memo(FeedInfo);