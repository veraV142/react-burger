import {
    LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL, LOGOUT_CLEAR, LOGOUT_DEFAULT
  } from '../actions/logout';
  import {logoutReducer as reducer} from './logout'


  describe('logoutReducer reducer', ()=> {
    const initialState = {
        logoutRequest: false,
        logoutFail: false, 
        logoutSuccess: false 
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, {type:LOGOUT_DEFAULT})).toEqual(initialState)
    })

    it('should handle LOGIN', () => {
        expect(
            reducer(initialState, {
                type: LOGOUT
            }))
        .toEqual({
            ...initialState,
            logoutRequest:true,
            logoutFail:false, 
            logoutSuccess:false
        })
    });

    it('should handle LOGOUT_SUCCESS', () => {
        expect(
            reducer(initialState, {
                type: LOGOUT_SUCCESS,
            }))
        .toEqual({
            ...initialState,
            logoutRequest: false, 
            logoutFail: false,
            logoutSuccess: true
        })
    });

    it('should handle LOGOUT_FAIL', () => {
        expect(
            reducer(initialState, {
                type: LOGOUT_FAIL
            }))
        .toEqual({
            ...initialState,
            logoutRequest: false, 
            logoutFail: true,
        })
    });

    it('should handle LOGOUT_CLEAR', () => {
        expect(
            reducer(initialState, {
                type: LOGOUT_CLEAR
            }))
        .toEqual({
            ...initialState,
            logoutRequest: false, 
            logoutFail: false,
            logoutSuccess: false
        })
    });
})