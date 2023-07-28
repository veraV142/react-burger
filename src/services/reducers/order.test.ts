import {
    GET_ORDER_NUM, GET_ORDER_NUM_SUCCESS, GET_ORDER_NUM_FAIL, DROP_ORDER_NUM, GET_ORDER_NUM_DEFAULT
  } from '../actions/order';

  import {orderNumReducer as reducer, initialState} from './order'

  describe('orderNumReducer reducer', ()=> {
    it('should return the initial state', () => {
        expect(reducer(undefined, {type:GET_ORDER_NUM_DEFAULT})).toEqual(initialState)
    })

    it('should handle GET_ORDER_NUM', () => {
        expect(
            reducer(initialState, {
                type: GET_ORDER_NUM
            }))
        .toEqual({
            ...initialState,
            orderNumRequest:true
        })
    });

    it('should handle GET_ORDER_NUM_SUCCESS', () => {
        expect(
            reducer(initialState, {
                type: GET_ORDER_NUM_SUCCESS,
                orderNum: 111
            }))
        .toEqual({
            ...initialState,
            orderNum: 111,
            orderNumRequest: false, 
            orderNumFail: false
        })
    });

    it('should handle GET_ORDER_NUM_FAIL', () => {
        expect(
            reducer(initialState, {
                type: GET_ORDER_NUM_FAIL
            }))
        .toEqual({
            ...initialState,
            orderNumRequest: false, 
            orderNumFail: true
        })
    });

    it('should handle DROP_ORDER_NUM', () => {
        expect(
            reducer(initialState, {
                type: DROP_ORDER_NUM
            }))
        .toEqual({
            ...initialState,
            orderNum: undefined,
            orderNumRequest: false, 
            orderNumFail: false
        })
    });
})