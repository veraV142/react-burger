import {
    ADD_FULL_INGREDIENT_DATA, DROP_FULL_INGREDIENT_DATA
} from '../actions/index';

export const fullIngredientDataInitialState = {
    ingredient: null
};

export const fullIngredientDataReducer = (state = fullIngredientDataInitialState, action) => 
{
    switch (action.type) {
        case ADD_FULL_INGREDIENT_DATA: {
            return {
                ingredient: action.ingredient
            };
        }
        case DROP_FULL_INGREDIENT_DATA: {
          return {
            ingredient: null
          };
        }
        default: {
            return state;
        }
    }
}