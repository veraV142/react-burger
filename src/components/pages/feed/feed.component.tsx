import  { FC, memo, useEffect } from 'react';
import { OrderElement } from '../../order-element/order-element.component';
import { Link, useLocation } from 'react-router-dom';
import { TOrderData } from '../../../utils/data';
import { useDispatch, useSelector } from '../../../services/types';
import styles from './feed.styles.module.css'
import { feedClose, feedInit } from '../../../services/actions/feed';
import { FeedInfo } from '../../feed-info/feed-info.component';


export const FeedPage:FC = () => 
{
    const location = useLocation();
    const dispatch = useDispatch();
    
    const feedState =  useSelector(store => store.feedReducer);

    useEffect(() => {
        if (!feedState.wsConnected)
            dispatch(feedInit());
        return () => {
            dispatch(feedClose());
        }
    }, []);

    const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
        ) - 140;

    return (

       <div className={styles.main_control}> 
            <div className={`mt-8 ml-8`} style={{overflowY: 'auto', overflowX: 'hidden', maxHeight: `${scrollHeight}px`, scrollbarWidth: 'thin'}}>
                {feedState.orders && feedState.orders.map((order) => {
                    return (
                        <div key={order._id}>
                            <Link
                                to={{pathname: `/feed/${order._id}` }}
                                state= {{ feed: location }}
                                className={`${styles.link}`}>
                                    <OrderElement order={order} status={false}/>
                            </Link>
                        </div>
                    )
                })}
            </div>
            <div className={'ml-10'}>
                <FeedInfo />
            </div>
       </div>

       
    );
} 

export default memo(FeedPage);