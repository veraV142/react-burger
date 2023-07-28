import { TOrderData } from "../../utils/data";
import { ORDERS_CLOSE, ORDERS_ERROR, ORDERS_INIT, ORDERS_MESSAGE, TOrdersActions } from "../actions/orders";

type TState = {
	wsConnected: boolean;
    orders: TOrderData[],
	total: number;
	totalToday: number;
}

export const initialState: TState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
  };

export const ordersReducer = (state = initialState, action: TOrdersActions): TState => {
    switch (action.type) {
      case ORDERS_INIT:
        return {
          ...state,
          wsConnected: true,
        };
  
      case ORDERS_ERROR:
        return {
          ...state,
          wsConnected: false,
        };
  
      case ORDERS_CLOSE:
        return {
          ...state,
          wsConnected: false,
        };
  
      case ORDERS_MESSAGE:
        return {
          ...state,
          orders: action.data.orders,
          total: action.data.total,
          totalToday: action.data.totalToday,
        };
  
      default:
        return state;
    }
  };