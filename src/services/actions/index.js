import { loadIngredients, sendOrder} from '../../utils/burger-api';

export const GET_INGREDIENTS = 'GET_INGREDIENTS'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'

export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const DROP_INGREDIENT = 'DROP_INGREDIENT'
export const CALC_SUM = 'CALC_SUM'

export const TAB_CHANGE = 'TAB_CHANGE'

export const ADD_FULL_INGREDIENT_DATA = 'ADD_FULL_INGREDIENT_DATA'
export const DROP_FULL_INGREDIENT_DATA = 'DROP_FULL_INGREDIENT_DATA'

export const GET_ORDER_NUM = 'GET_ORDER_NUM'
export const GET_ORDER_NUM_SUCCESS = 'GET_ORDER_NUM_SUCCESS'
export const GET_ORDER_NUM_FAIL = 'GET_ORDER_NUM_FAIL'
export const DROP_ORDER_NUM = 'DROP_ORDER_NUM'

export const MOVE_INGREDIENT = "MOVE_INGREDIENT"

export function getIngredients() {
    return function(dispatch) {
        dispatch({ type: GET_INGREDIENTS });

        loadIngredients()
            .then((response) => {
              if (response.success === true) 
              {
                dispatch({ type: GET_INGREDIENTS_SUCCESS, data: response.data });
              }
              else {
                dispatch({ type: GET_INGREDIENTS_FAILED });
              }
            })
            .catch((error) => {
              dispatch({ type: GET_INGREDIENTS_FAILED });
            })
    }
}

export function sendOrderAndGetResult(data) {
    return function(dispatch) {
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

 