import { TIngredient } from "../../utils/data";

export const ADD_FULL_INGREDIENT_DATA = 'ADD_FULL_INGREDIENT_DATA'
export const DROP_FULL_INGREDIENT_DATA = 'DROP_FULL_INGREDIENT_DATA'
export const FULL_INGREDIENT_DATA_DEFAULT = 'FULL_INGREDIENT_DATA_DEFAULT'

export interface IAddFullIngredientData {
	type: typeof ADD_FULL_INGREDIENT_DATA;
  ingredient: TIngredient;
}

export interface IDropFullIngredientData {
	type: typeof DROP_FULL_INGREDIENT_DATA;
}

export interface IFullIngredientDataDefault {
	type: typeof FULL_INGREDIENT_DATA_DEFAULT;
}

export type IFullIngredientDataAction = | IAddFullIngredientData | IDropFullIngredientData | IFullIngredientDataDefault ;