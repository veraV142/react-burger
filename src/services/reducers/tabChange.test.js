import {
      TAB_CHANGE
    } from '../actions/tabChange';
    import reducer from './tabChange/tabChangeReducer'

    describe('registerReducer reducer', ()=> {
        const initialState = {
            tab: 'bun'
        }
    
        it('should return the initial state', () => {
            expect(reducer(undefined, {})).toEqual([initialState])
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