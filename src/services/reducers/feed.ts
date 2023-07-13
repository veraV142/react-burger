import { TOrderData } from "../../utils/data";
import { FEED_CLOSE, FEED_ERROR, FEED_INIT, FEED_MESSAGE, TFeedActions } from "../actions/feed";

type TState = {
	wsConnected: boolean;
    orders: TOrderData[],
	total: number;
	totalToday: number;
}

const initialState: TState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
  };

export const feedReducer = (state = initialState, action: TFeedActions): TState => {
    switch (action.type) {
      case FEED_INIT:
        return {
          ...state,
          wsConnected: true,
        };
  
      case FEED_ERROR:
        return {
          ...state,
          wsConnected: false,
        };
  
      case FEED_CLOSE:
        return {
          ...state,
          wsConnected: false,
        };
  
      case FEED_MESSAGE:
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