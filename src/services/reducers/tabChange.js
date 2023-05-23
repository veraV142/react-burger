import {
    TAB_CHANGE
  } from '../actions/tabChange';

  export const tabChangeInitialState = {
    tab: 'bun'
  };

  export const tabChangeReducer = (state = tabChangeInitialState, action) => 
  {
      switch (action.type) {
          case TAB_CHANGE: {
              return {
                tab: action.tab
              };
          }
          default: {
              return state;
          }
      }
  }