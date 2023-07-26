import {
    PASSWORD_RESET, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAIL,
    PASSWORD_NEW, PASSWORD_NEW_SUCCESS, PASSWORD_NEW_FAIL, PASSWORD_DEFAULT, 
  } from '../actions/password';
  import {passwordReducer as reducer} from './password'

  describe('passwordReducer reducer', ()=> {
    const initialState = {
        passwordResetRequest: false,
        passwordResetFail: false, 
        passwordResetComplete: false, 

        passwordNewRequest: false,
        passwordNewFail: false, 
        passwordNewComplete: false, 
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, {type:PASSWORD_DEFAULT})).toEqual(initialState)
    })

    it('should handle PASSWORD_NEW', () => {
        expect(
            reducer(initialState, {
                type: PASSWORD_NEW
            }))
        .toEqual({
            ...initialState,
            passwordNewRequest:true,
            passwordNewComplete:false
        })
    });

    it('should handle PASSWORD_NEW_SUCCESS', () => {
        expect(
            reducer(initialState, {
                type: PASSWORD_NEW_SUCCESS
            }))
        .toEqual({
            ...initialState,
            passwordNewRequest: false, 
            passwordNewFail: false,
            passwordNewComplete: true
        })
    });

    it('should handle PASSWORD_NEW_FAIL', () => {
        expect(
            reducer(initialState, {
                type: PASSWORD_NEW_FAIL
            }))
        .toEqual({
            ...initialState,
            passwordNewRequest: false, 
            passwordNewFail: true
        })
    });

    it('should handle PASSWORD_RESET', () => {
        expect(
            reducer(initialState, {
                type: PASSWORD_RESET
            }))
        .toEqual({
            ...initialState,
            passwordResetRequest:true,
            passwordResetComplete:false
        })
    });

    it('should handle PASSWORD_RESET_SUCCESS', () => {
        expect(
            reducer(initialState, {
                type: PASSWORD_RESET_SUCCESS
            }))
        .toEqual({
            ...initialState,
            passwordResetRequest: false, 
            passwordResetFail: false,
            passwordResetComplete: true
        })
    });

    it('should handle PASSWORD_RESET_FAIL', () => {
        expect(
            reducer(initialState, {
                type: PASSWORD_RESET_FAIL
            }))
        .toEqual({
            ...initialState,
            passwordResetRequest: false, 
            passwordResetFail: true
        })
    });
})