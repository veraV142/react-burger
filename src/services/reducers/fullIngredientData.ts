import { TIngredient } from '../../utils/data';
import {
    ADD_FULL_INGREDIENT_DATA, DROP_FULL_INGREDIENT_DATA, IFullIngredientDataAction
} from '../actions/fullIngredientData';

export type TFullIngredientDataInitialState = {
    ingredient?: TIngredient
}

const fullIngredientDataInitialState: TFullIngredientDataInitialState = {
    ingredient: undefined
};

export const fullIngredientDataReducer = (state = fullIngredientDataInitialState, action: IFullIngredientDataAction):TFullIngredientDataInitialState => 
{
    switch (action.type) {
        case ADD_FULL_INGREDIENT_DATA: {
            return {
                ...state,
                ingredient: action.ingredient
            };
        }
        case DROP_FULL_INGREDIENT_DATA: {
          return {
            ...state,
            ingredient: undefined
          };
        }
        default: {
            return state;
        }
    }
}