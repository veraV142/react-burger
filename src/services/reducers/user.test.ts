import {
    GET_USER, GET_USER_SUCCESS, GET_USER_FAIL, TOKEN_EXPIRED, 
    SAVE_USER, SAVE_USER_SUCCESS, SAVE_USER_FAIL, TOKEN_INVALID, GET_USER_DEFAULT
  } from '../actions/user';
  import {userReducer as reducer} from './user'

  describe('userReducer reducer', ()=> {
    const initialState = {
        getUserRequest: false,
        getUserFail: false, 
        data: undefined,
        tokenExpired: false,
        tokenInvalid: false,
        saveUserRequest: false,
        saveUserFail: false,  
        saveUserSuccess: false,
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, {type:GET_USER_DEFAULT})).toEqual(initialState)
    })

    it('should handle GET_USER', () => {
        expect(
            reducer(initialState, {
                type: GET_USER
            }))
        .toEqual({
            ...initialState,
            tokenExpired: false,
            tokenInvalid: false,
            getUserRequest:true,
            getUserFail:false, 
            data:undefined
        })
    });
    it('should handle GET_USER_SUCCESS', () => {
        expect(
            reducer(initialState, {
                type: GET_USER_SUCCESS,
                email: 'e',
                name: 'n'
            }))
        .toEqual({
            ...initialState,
            getUserRequest: false, 
            getUserFail: false,
            data: {
                email: 'e',
                name: 'n'
            }
        })
    });
    it('should handle GET_USER_FAIL', () => {
        expect(
            reducer(initialState, {
                type: GET_USER_FAIL
            }))
        .toEqual({
            ...initialState,
            getUserRequest: false, 
            getUserFail: true,
            data: { isError:true, name:'не определено', email:'не определено'  }
        })
    });
    it('should handle SAVE_USER', () => {
        expect(
            reducer(initialState, {
                type: SAVE_USER
            }))
        .toEqual({
            ...initialState,
            tokenExpired: false,
            saveUserRequest:true,
            saveUserFail:false,
            saveUserSuccess:false,
            tokenInvalid: false,
        })
    });
    it('should handle SAVE_USER_SUCCESS', () => {
        expect(
            reducer(initialState, {
                type: SAVE_USER_SUCCESS,
                email: 'e',
                name: 'n'
            }))
        .toEqual({
            ...initialState,
            saveUserRequest: false, 
            saveUserFail: false,
            saveUserSuccess:true,
            data: {
                email: 'e',
                name: 'n'
            }
        })
    });
    it('should handle SAVE_USER_FAIL', () => {
        expect(
            reducer(initialState, {
                type: SAVE_USER_FAIL
            }))
        .toEqual({
            ...initialState,
            saveUserRequest: false, 
            saveUserFail: true,
            saveUserSuccess:false
        })
    });
    it('should handle TOKEN_EXPIRED', () => {
        expect(
            reducer(initialState, {
                type: TOKEN_EXPIRED
            }))
        .toEqual({
            ...initialState,
            tokenExpired: true,
            getUserRequest: false, 
            saveUserRequest: false, 
            getUserFail: true,
            saveUserFail: true,
            data:{ isError:true, name:'не определено', email:'не определено'  },
            saveUserSuccess:false
        })
    });
    it('should handle TOKEN_INVALID', () => {
        expect(
            reducer(initialState, {
                type: TOKEN_INVALID
            }))
        .toEqual({
            ...initialState,
            tokenInvalid: true,
            getUserRequest: false, 
            saveUserRequest: false, 
            getUserFail: true,
            saveUserFail: true,
            data:{ isError:true, name:'не определено', email:'не определено'  },
            saveUserSuccess:false
        })
    });
})