import {
      TAB_CHANGE, TAB_CHANGE_DEFAULT
    } from '../actions/tabChange';
    import {tabChangeReducer as reducer, initialState} from './tabChange'

    describe('registerReducer reducer', ()=> {    
        it('should return the initial state', () => {
            expect(reducer(undefined, {type:TAB_CHANGE_DEFAULT})).toEqual(initialState)
        })
    
        it('should handle TAB_CHANGE', () => {
            expect(
                reducer(initialState, {
                    type: TAB_CHANGE,
                    tab: '1'
                }))
            .toEqual({
                ...initialState,
                tab: '1'
            })
        });
    })