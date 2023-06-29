import {
  GET_ORDER_NUM, GET_ORDER_NUM_SUCCESS, GET_ORDER_NUM_FAIL, DROP_ORDER_NUM, IOrderAction
} from '../actions/order';

export interface IOrderNumInitialState {
  orderNum?: number, 
  orderNumRequest: boolean,
  orderNumFail: boolean
}

export const orderNumInitialState :IOrderNumInitialState = {
  orderNum: undefined, 
  orderNumRequest: false,
  orderNumFail: false
};

export const orderNumReducer = (state = orderNumInitialState, action: IOrderAction):IOrderNumInitialState => 
{
    switch (action.type) {
        case GET_ORDER_NUM: {
            return {
              ...state,
              orderNumRequest:true
            };
        }
        case GET_ORDER_NUM_SUCCESS: {
          return {
            ...state,
            orderNum: action.orderNum,
            orderNumRequest: false, 
            orderNumFail: false
          };
      }
      case GET_ORDER_NUM_FAIL: {
          return {
              ...state,
              orderNumRequest: false, 
              orderNumFail: true
            };
      }
      case DROP_ORDER_NUM: {
          return {
              ...state,
              orderNum: undefined,
              orderNumRequest: false, 
              orderNumFail: false
            };
      }
      default: {
          return state;
      }
    }
}