import { sendOrder} from '../../utils/burger-api';
import { TIngredient } from '../../utils/data';
import { AppDispatch } from '../types';

export const GET_ORDER_NUM = 'GET_ORDER_NUM'
export const GET_ORDER_NUM_SUCCESS = 'GET_ORDER_NUM_SUCCESS'
export const GET_ORDER_NUM_FAIL = 'GET_ORDER_NUM_FAIL'
export const DROP_ORDER_NUM = 'DROP_ORDER_NUM'
export const CLEAR_INGREDIENTS = 'CLEAR_INGREDIENTS'

export interface IGetOrderNum {
	type: typeof GET_ORDER_NUM;
}

export interface IGetOrderNumSuccess {
	type: typeof GET_ORDER_NUM_SUCCESS;
  orderNum: number
}

export interface IGetOrderNumFail {
	type: typeof GET_ORDER_NUM_FAIL;
}

export interface IDropOrderNum {
	type: typeof DROP_ORDER_NUM;
}

export type IOrderAction = | IGetOrderNum | IGetOrderNumSuccess | IGetOrderNumFail | IDropOrderNum ;

export function sendOrderAndGetResult(data: TIngredient[]) {
    return function(dispatch: AppDispatch) {
        dispatch({ type: GET_ORDER_NUM });

        sendOrder(data)
            .then((response) => {
              if (response.success === true) 
              {
                dispatch({ type: GET_ORDER_NUM_SUCCESS, orderNum: response.order.number });
              }
              else {
                dispatch({ type: GET_ORDER_NUM_FAIL });
              }
            })
            .catch((error) => {
              dispatch({ type: GET_ORDER_NUM_FAIL });
            })
    }
}