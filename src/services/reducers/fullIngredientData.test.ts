import {fullIngredientDataReducer as reducer, initialState} from './fullIngredientData'
import {
    ADD_FULL_INGREDIENT_DATA, DROP_FULL_INGREDIENT_DATA, FULL_INGREDIENT_DATA_DEFAULT
} from '../actions/fullIngredientData';

describe('fullIngredientData reducer', ()=> {

    const testIngredient = {
        _id: '072c317e-e5e3-4167-b150-030551efd56a',
        name: 'Булка',
        type: 'buh',
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
        expect(reducer(undefined, {type: FULL_INGREDIENT_DATA_DEFAULT})).toEqual(initialState)
    })

    it('should handle ADD_FULL_INGREDIENT_DATA', () => {
        expect(
            reducer(initialState, {
                type: ADD_FULL_INGREDIENT_DATA,
                ingredient: testIngredient
            }))
        .toEqual({
            ...initialState,
            ingredient: testIngredient,
        });
    });
    it('should handle DROP_FULL_INGREDIENT_DATA', () => {
        expect(
            reducer(initialState, {
                type: DROP_FULL_INGREDIENT_DATA
            }))
        .toEqual({
            ...initialState,
            ingredient: undefined,
        });
    });
})