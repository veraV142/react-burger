import { TIngredient, TIngredientExt } from "../../utils/data"

export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const DROP_INGREDIENT = 'DROP_INGREDIENT'
export const CALC_SUM = 'CALC_SUM'
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT'
export const CLEAR_INGREDIENTS = 'CLEAR_INGREDIENTS'

export interface IAddIngredient {
	type: typeof ADD_INGREDIENT;
  data: TIngredient|TIngredientExt;
}

export interface IDropIngredient {
	type: typeof DROP_INGREDIENT;
  uuid?: string;
}

export interface IClearIngredients {
	type: typeof CLEAR_INGREDIENTS;
}

export interface ICalcSum {
	type: typeof CALC_SUM;
  selectedBun: TIngredient
}

export interface IMoveIngredients {
	type: typeof MOVE_INGREDIENT;
  fromItemIndex: string, 
  toItemIndex: string
}

export type IIngredientConstructorAction = | IAddIngredient | IDropIngredient | IClearIngredients | ICalcSum | IMoveIngredients;