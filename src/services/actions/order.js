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
      let tryAcceptToken = false;

      const send = () => {
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
              console.log(`GU_ERROR  ${error.message} ==== ${tryAcceptToken}`);
              if (error.message === 'jwt expired' && tryAcceptToken === 'false') {
                  console.log(`GU_ERROR_jwt ${tryAcceptToken}`);
                  setCookie('accessToken', '', 0);
                  tryAcceptToken = true;
                  withCheckToken(dispatch, send, GET_ORDER_NUM_FAIL);
              }
              else 
                  dispatch({ type: GET_ORDER_NUM_FAIL });
              dispatch({ type: GET_ORDER_NUM_FAIL });
            })
      }

      withCheckToken(dispatch, send, GET_ORDER_NUM_FAIL);
    }
}