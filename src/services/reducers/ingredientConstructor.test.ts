import {ingredientConstructorReducer as reducer, initialState} from './ingredientConstructor'
import { ADD_INGREDIENT, DROP_INGREDIENT, CALC_SUM, MOVE_INGREDIENT, CLEAR_INGREDIENTS, INGREDIENTS_DEFAULT } from '../actions/ingredientConstructor';

describe('ingredientConstructorReducer reducer', ()=> {

    const buhIngredient = {
        _id: '072c317e-e5e3-4167-b150-030551efd56a',
        uuid: '072c317e-e5e3-4167-b150-030551efd56a',
        name: 'Булка',
        type: 'bun',
        proteins: 111,
        fat: 12,
        carbohydrates: 1121,
        calories: 222,
        price: 22,
        image: 'test img',
        image_mobile: 'test img mob',
        image_large: 'test img large',
        __v: 1,
    }

    const sauceIngredient = {
        _id: '072c317e-e5e3-4167-b150-030551efd561',
        uuid: '072c317e-e5e3-4167-b150-030551efd561',
        name: 'Соус',
        type: 'sauce',
        proteins: 111,
        fat: 12,
        carbohydrates: 1121,
        calories: 222,
        price: 22,
        image: 'test img',
        image_mobile: 'test img mob',
        image_large: 'test img large',
        __v: 1,
    }

    const sauceIngredient2 = {
        _id: '072c317e-e5e3-4167-b150-030551efd562',
        uuid: '072c317e-e5e3-4167-b150-030551efd562',
        name: 'Соус 2',
        type: 'sauce',
        proteins: 111,
        fat: 12,
        carbohydrates: 1121,
        calories: 222,
        price: 22,
        image: 'test img',
        image_mobile: 'test img mob',
        image_large: 'test img large',
        __v: 1,
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, {type:INGREDIENTS_DEFAULT})).toEqual(initialState)
    })

    it('should handle ADD_INGREDIENT', () => {
        expect(
            reducer(initialState, {
                type: ADD_INGREDIENT, 
                data: buhIngredient
            }))
        .toEqual({
            ...initialState,
            selectedBun: buhIngredient,
        })

        expect(
            reducer(initialState, {
                type: ADD_INGREDIENT, 
                data: sauceIngredient
            }))
        .toEqual({
            ...initialState,
            selectedIngredients: [sauceIngredient],
        })
    });

    it('should handle DROP_INGREDIENT', () => {
        expect(
            reducer({
                selectedBun: buhIngredient,
                selectedIngredients: [],
                sum:0
            }, {
                type: DROP_INGREDIENT, 
                uuid: undefined
            }))
        .toEqual({
            selectedBun: undefined,
            selectedIngredients: [],
            sum:0
        })

        expect(
            reducer({
                selectedBun: undefined,
                selectedIngredients: [ sauceIngredient ],
                sum:0
            }, {
                type: DROP_INGREDIENT, 
                uuid: '072c317e-e5e3-4167-b150-030551efd561'
            }))
        .toEqual({
            ...initialState,
            selectedIngredients: [],
        })
    });

    it('should handle CLEAR_INGREDIENTS', () => {
        expect(
            reducer({
                ...initialState,
                selectedBun: buhIngredient,
                selectedIngredients: [ sauceIngredient ] 
            }, {
                type: CLEAR_INGREDIENTS
            }))
        .toEqual({
            ...initialState,
            selectedBun: undefined, 
            selectedIngredients: []
        })
    });

    it('should handle CALC_SUM', () => {
        expect(
            reducer({
                ...initialState,
                selectedBun: buhIngredient,
                selectedIngredients: [ sauceIngredient ] 
            }, 
            {
                type: CALC_SUM,
                selectedBun: undefined
            }))
        .toEqual({
            ...initialState,
            selectedBun: buhIngredient,
            selectedIngredients: [ sauceIngredient ],
            sum: 44
        })
    });

    it('should handle MOVE_INGREDIENT', () => {
        expect(
            reducer({
                ...initialState,
                selectedIngredients: [ sauceIngredient, sauceIngredient2 ] 
            }, {
                type: MOVE_INGREDIENT,
                fromItemIndex: '072c317e-e5e3-4167-b150-030551efd561',
                toItemIndex: '072c317e-e5e3-4167-b150-030551efd562'
            }))
        .toEqual({
            ...initialState,
            dragIngredientIndex: '072c317e-e5e3-4167-b150-030551efd561',
            selectedIngredients: [ sauceIngredient2, sauceIngredient ],
        })
    });
})