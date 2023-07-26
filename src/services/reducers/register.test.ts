import {
    REGISTER, REGISTER_SUCCESS, REGISTER_FAIL, REGISTER_DEFAULT
  } from '../actions/register';
  import {registerReducer as reducer} from './register'

  describe('registerReducer reducer', ()=> {
    const initialState = {
        registerRequest: false,
        registerFail: false, 
        data: undefined 
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, {type:REGISTER_DEFAULT})).toEqual(initialState)
    })

    it('should handle REGISTER', () => {
        expect(
            reducer(initialState, {
                type: REGISTER
            }))
        .toEqual({
            ...initialState,
            registerRequest:true,
            registerFail:false, 
            data:undefined
        })
    });

    it('should handle REGISTER_SUCCESS', () => {
        expect(
            reducer(initialState, {
                type: REGISTER_SUCCESS,
                email: 'e',
                name: 'n',
                accessToken: 'a',
                refreshToken: 'r'
            }))
        .toEqual({
            ...initialState,
            registerRequest: false, 
            registerFail: false,
            data: {
                email: 'e', 
                name: 'n', 
                accessToken: 'a',
                refreshToken: 'r'
            }
        })
    });

    it('should handle REGISTER_FAIL', () => {
        expect(
            reducer(initialState, {
                type: REGISTER_FAIL
            }))
        .toEqual({
            ...initialState,
            registerRequest: false, 
            registerFail: true,
            data:undefined
        })
    });
})