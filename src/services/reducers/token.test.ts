import {
    TOKEN, TOKEN_SUCCESS, TOKEN_FAIL, TOKEN_DEFAULT
  } from '../actions/token';
  import {tokenReducer as reducer} from './token'

  describe('tokenReducer reducer', ()=> {
    const initialState = {
        tokenRequest: false,
        tokenFail: false, 
        data: undefined 
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, {type:TOKEN_DEFAULT})).toEqual(initialState)
    })

    it('should handle TOKEN', () => {
        expect(
            reducer(initialState, {
                type: TOKEN
            }))
        .toEqual({
            ...initialState,
            tokenRequest:true,
            tokenFail:false, 
            data:undefined
        })
    });
    it('should handle TOKEN_SUCCESS', () => {
        expect(
            reducer(initialState, {
                type: TOKEN_SUCCESS,
                accessToken: 'a',
                refreshToken: 'r'
            }))
        .toEqual({
            ...initialState,
            tokenRequest: false, 
            tokenFail: false,
            data: {
                accessToken: 'a',
                refreshToken: 'r'
            }
        })
    });
    it('should handle TOKEN_FAIL', () => {
        expect(
            reducer(initialState, {
                type: TOKEN_FAIL
            }))
        .toEqual({
            ...initialState,
            tokenRequest: false, 
            tokenFail: true,
            data:undefined
        })
    });
})