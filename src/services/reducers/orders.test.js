import { ORDERS_CLOSE, ORDERS_ERROR, ORDERS_INIT, ORDERS_MESSAGE, TOrdersActions } from "../actions/orders";
import reducer from './orders/ordersReducer'

describe('ordersReducer reducer', ()=> {
    const initialState = {
        wsConnected: false,
        orders: [],
        total: 0,
        totalToday: 0,
    }

    const order = {
        createdAt: '25.07.2023',
        ingredients: ['b26e9473-b751-47b8-bda6-15ebafba0ea0', '89d997fd-9c9c-455a-ae01-120889ae6c6b'],
        name: 'test order',
        number: '1',
        status: '1',
        updatedAt: '25.07.2023',
        _id: 'f003631d-2ddd-4e35-a60b-52ab74545796'
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual([initialState])
    })

    it('should handle ORDERS_INIT', () => {
        expect(
            reducer(initialState, {
                type: ORDERS_INIT
            }))
        .toEqual({
            ...initialState,
            wsConnected: true,
        })
    });

    it('should handle ORDERS_ERROR', () => {
        expect(
            reducer(initialState, {
                type: ORDERS_ERROR
            }))
        .toEqual({
            ...initialState,
            wsConnected: false,
        })
    });

    it('should handle ORDERS_CLOSE', () => {
        expect(
            reducer(initialState, {
                type: ORDERS_CLOSE
            }))
        .toEqual({
            ...initialState,
            wsConnected: false,
        })
    });

    it('should handle ORDERS_MESSAGE', () => {
        expect(
            reducer(initialState, {
                type: ORDERS_MESSAGE,
                data: {
                    orders: [ order ],
                    total: 1,
                    totalToday: 2
                }
            }))
        .toEqual({
            ...initialState,
            orders: [ order ],
            total: 1,
            totalToday: 2,
        })
    });
})