import { combineReducers } from 'redux';
import {ingredientConstructorReducer} from './ingredientConstructor'
import {ingredientsLoadReducer} from './ingredientsLoad'
import {tabChangeReducer} from './tabChange'
import {fullIngredientDataReducer} from './fullIngredientData'
import {orderNumReducer} from './order'



// Корневой редьюсер
export const rootReducer = combineReducers({
    ingredientsLoadReducer,
    ingredientConstructorReducer,
    tabChangeReducer,
    fullIngredientDataReducer,
    orderNumReducer
}) 