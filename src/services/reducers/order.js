import {
    GET_ORDER_NUM, GET_ORDER_NUM_SUCCESS, GET_ORDER_NUM_FAIL, DROP_ORDER_NUM
  } from '../actions/index';

  export const orderNumInitialState = {
    orderNum: null, 
    orderNumRequest: false,
    orderNumFail: false
  };

  export const orderNumReducer = (state = orderNumInitialState, action) => 
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
                orderNum: null,
                orderNumRequest: false, 
                orderNumFail: false
              };
        }
        default: {
            return state;
        }
      }
  }