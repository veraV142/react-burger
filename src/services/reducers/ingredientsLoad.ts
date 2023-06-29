import { TIngredient } from '../../utils/data';
import {
    GET_INGREDIENTS, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED, TGetIngredientsAction
  } from '../actions/ingredientsLoad';

  export type TIngredientsLoadState = {
    data: Array<TIngredient>,
    dataRequest: boolean,
    dataFail: boolean,
    bunList: Array<TIngredient>,
    sauceList: Array<TIngredient>,
    mainList: Array<TIngredient>,
  }

  export const ingredientsLoadInitialState: TIngredientsLoadState = {
    data: [],
    dataRequest: false,
    dataFail: false,
    bunList: [],
    sauceList: [],
    mainList: [],
  };

  export const ingredientsLoadReducer = (state = ingredientsLoadInitialState, action: TGetIngredientsAction) => 
  {
      switch (action.type) {
          case GET_INGREDIENTS: {
              return {
                ...state,
                dataRequest:true
              };
          }
          case GET_INGREDIENTS_SUCCESS: {
            return  {
                ...state,
                dataRequest: false,
                dataFail: false,
                data: action.data,
                bunList: action.data.filter((item) => item.type === 'bun'),
                sauceList: action.data.filter((item) => item.type === 'sauce'),
                mainList: action.data.filter((item) => item.type === 'main')
            };
          }
          case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                dataRequest:false,
                dataFail:true,
                data: []
            };
          }
          default: {
              return state;
          }
      }
  }