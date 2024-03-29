import {
    LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_CLEAR, LOGIN_FROM_ROUTE, LOGIN_DEFAULT 
  } from '../actions/login';
  import {loginReducer as reducer, initialState} from './login'

  describe('loginReducer reducer', ()=> {

    const user = {
        email: 'test',
        name: 'test',
    }

    const accessToken = 'test accessToken'
    const refreshToken = 'test refreshToken'

    it('should return the initial state', () => {
        expect(reducer(undefined, {type:LOGIN_DEFAULT})).toEqual(initialState)
    })

    it('should handle LOGIN', () => {
        expect(
            reducer(initialState, {
                type: LOGIN
            }))
        .toEqual({
            ...initialState,
            loginRequest:true,
            data:undefined,
            loginSuccess:false
        })
    });

    it('should handle LOGIN_SUCCESS', () => {
        expect(
            reducer(initialState, {
                type: LOGIN_SUCCESS,
                user: user,
                accessToken: accessToken,
                refreshToken: refreshToken
            }))
        .toEqual({
            ...initialState,
            loginRequest: false, 
            loginFail: false,
            data: {
                email: user.email, 
                name: user.name, 
                accessToken: accessToken,
                refreshToken: refreshToken
            },
            loginSuccess:true
        })
    });

    it('should handle LOGIN_FAIL', () => {
        expect(
            reducer(initialState, {
                type: LOGIN_FAIL
            }))
        .toEqual({
            ...initialState,
            loginRequest: false, 
            loginFail: true,
            data:undefined
        })
    });

    it('should handle LOGIN_CLEAR', () => {
        expect(
            reducer(initialState, {
                type: LOGIN_CLEAR
            }))
        .toEqual({
            ...initialState,
            loginRequest: false, 
            loginFail: false,
            data:undefined,
            loginSuccess:false
        })
    });
    
    it('should handle LOGIN_FROM_ROUTE', () => {
        expect(
            reducer(initialState, {
                type: LOGIN_FROM_ROUTE,
                fromRoute: 'route'
            }))
        .toEqual({
            ...initialState,
            loginFromRoute:'route'
        })
    });
})
