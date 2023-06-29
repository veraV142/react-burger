import { loadIngredients} from '../../utils/burger-api';
import { TIngredient } from '../../utils/data';
import { AppDispatch, AppThunk } from '../types';

export const GET_INGREDIENTS = 'GET_INGREDIENTS'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'

export interface IGetIngredients {
	type: typeof GET_INGREDIENTS;
}

export interface IGetIngredientsSuccess {
	type: typeof GET_INGREDIENTS_SUCCESS;
  data: Array<TIngredient>;
}

export interface IGetIngredientsFailed {
	type: typeof GET_INGREDIENTS_FAILED;
}

export type TGetIngredientsAction = | IGetIngredients | IGetIngredientsSuccess | IGetIngredientsFailed

export const getIngredients: AppThunk = () => {
    return function(dispatch: AppDispatch) {
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