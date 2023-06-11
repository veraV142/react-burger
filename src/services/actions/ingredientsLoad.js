import { loadIngredients} from '../../utils/burger-api';

export const GET_INGREDIENTS = 'GET_INGREDIENTS'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'

export function getIngredients() {
    return function(dispatch) {
        dispatch({ type: GET_INGREDIENTS });

        loadIngredients()
            .then((response) => {
              if (response.success === true) 
              {
                console.log('GET_INGREDIENTS_SUCCESS')
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