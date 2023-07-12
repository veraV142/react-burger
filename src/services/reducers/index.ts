import { combineReducers } from 'redux';
import {ingredientConstructorReducer} from './ingredientConstructor'
import {ingredientsLoadReducer} from './ingredientsLoad'
import {tabChangeReducer} from './tabChange'
import {fullIngredientDataReducer} from './fullIngredientData'
import {orderNumReducer} from './order'
import {passwordReducer} from './password'
import {registerReducer} from './register'
import {loginReducer} from './login'
import {logoutReducer} from './logout'
import {userReducer} from './user'
import {tokenReducer} from './token'
import {feedReducer} from './feed'
import {ordersReducer} from './orders'



// Корневой редьюсер
export const rootReducer = combineReducers({
    ingredientsLoadReducer,
    ingredientConstructorReducer,
    tabChangeReducer,
    fullIngredientDataReducer,
    orderNumReducer,
    passwordReducer,
    registerReducer,
    loginReducer,
    logoutReducer,
    userReducer,
    tokenReducer,
    ordersReducer,
    feedReducer
}) 