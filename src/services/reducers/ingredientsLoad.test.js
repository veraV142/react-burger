import {
    GET_INGREDIENTS, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED, TGetIngredientsAction
  } from '../actions/ingredientsLoad';
  import reducer from './ingredientsLoad/ingredientsLoadReducer'

  describe('ingredientsLoadReducer reducer', ()=> {
    const initialState = {
        data: [],
        dataRequest: false,
        dataFail: false,
        bunList: [],
        sauceList: [],
        mainList: [],
    }

    const buhIngredient = {
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
        __v: '1',
    }

    const sauceIngredient = {
        _id: '072c317e-e5e3-4167-b150-030551efd561',
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
        __v: '1',
    }

    const mainIngredient = {
        _id: '072c317e-e5e3-4167-b150-030551efd562',
        name: 'Начинка',
        type: 'main',
        proteins: 111,
        fat: 12,
        carbohydrates: 1121,
        calories: 222,
        price: 22,
        image: 'test img',
        image_mobile: 'test img mob',
        image_large: 'test img large',
        __v: '1',
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual([initialState])
    })

    it('should handle GET_INGREDIENTS', () => {
        expect(
            reducer(initialState, {
                type: GET_INGREDIENTS
            }))
        .toEqual({
            ...initialState,
            dataRequest: true
        })
    });

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(
            reducer(initialState, {
                type: GET_INGREDIENTS_SUCCESS,
                data: [ buhIngredient, sauceIngredient, mainIngredient ]
            }))
        .toEqual({
            ...initialState,
            dataRequest: false,
            dataFail: false,
            data: [ buhIngredient, sauceIngredient, mainIngredient ],
            bunList: [ buhIngredient ],
            sauceList: [ sauceIngredient ],
            mainList: [  mainIngredient ],
        })
    });

    it('should handle GET_INGREDIENTS_FAILED', () => {
        expect(
            reducer(initialState, {
                type: GET_INGREDIENTS_FAILED
            }))
        .toEqual({
            ...initialState,
            dataRequest:false,
            dataFail:true,
            data: []
        })
    });
})