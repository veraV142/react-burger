import  {feedReducer as reducer} from './feed'
import { FEED_CLOSE, FEED_ERROR, FEED_INIT, FEED_MESSAGE, FEED_DEFAULT } from "../actions/feed";

describe('feed reducer', () => {
    const initialState = {
        wsConnected: false,
        orders: [],
        total: 0,
        totalToday: 0,
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, { type:FEED_DEFAULT })).toEqual([initialState])
      })

    it('should handle FEED_INIT', () => {
        expect(
            reducer(initialState, {
                type: FEED_INIT
            }))
        .toEqual({
            ...initialState,
            wsConnected: true,
        });
    });

    it('should handle FEED_ERROR', () => {
        expect(
            reducer(initialState, {
                type: FEED_ERROR
            }))
        .toEqual({
            ...initialState,
            wsConnected: false,
        });
    });

    it('should handle FEED_CLOSE', () => {
        expect(
            reducer(initialState, {
                type: FEED_CLOSE
            }))
        .toEqual({
            ...initialState,
            wsConnected: false,
        });
    });

    it('should handle FEED_MESSAGE', () => {
        const testOrders = [
            {
                createdAt: '24.07.2023',
                ingredients: [ '1e151688-405e-4669-a09a-3c14df797a92', '1e151688-405e-4669-a09a-3c14df797a93'],
                name: 'test order',
                number: 1,
                status: 'completed',
                updatedAt: '24.07.2023',
                _id: '1e151688-405e-4669-a09a-3c14df797a93'
            }
        ]

        expect(
            reducer(initialState, {
                type: FEED_MESSAGE,
                data: {
                  success:true,
                  orders: testOrders,
                  total: 1,
                  totalToday: 2
                }
            }))
        .toEqual({
            ...initialState,
            orders: testOrders,
            total: 1,
            totalToday: 2
        });
    });
})
