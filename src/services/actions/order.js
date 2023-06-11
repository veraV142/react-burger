import { sendOrder} from '../../utils/burger-api';
import { setCookie, withCheckToken } from '../../utils/utils';

export const GET_ORDER_NUM = 'GET_ORDER_NUM'
export const GET_ORDER_NUM_SUCCESS = 'GET_ORDER_NUM_SUCCESS'
export const GET_ORDER_NUM_FAIL = 'GET_ORDER_NUM_FAIL'
export const DROP_ORDER_NUM = 'DROP_ORDER_NUM'
export const CLEAR_INGREDIENTS = 'CLEAR_INGREDIENTS'

export function sendOrderAndGetResult(data) {
    return function(dispatch) {
      dispatch({ type: GET_ORDER_NUM });
      sendOrder(data)
          .then((response) => {
            if (response.success === true) 
            {
              console.log('GET_ORDER_NUM_SUCCESS');
              dispatch({ type: GET_ORDER_NUM_SUCCESS, orderNum: response.order.number });
            }
            else {
              console.log('GET_ORDER_NUM_FAIL');
              dispatch({ type: GET_ORDER_NUM_FAIL });
            }
          })
          .catch((error) => {
            console.log(`GET_ORDER_NUM_FAIL error ${error.message}`);
            dispatch({ type: GET_ORDER_NUM_FAIL });
          })
    }
}