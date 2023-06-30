import {
  ITabChangeAction,
    TAB_CHANGE
  } from '../actions/tabChange';

  export interface ITabChangeInitialState {
    tab: string;
  }

  export const tabChangeInitialState = {
    tab: 'bun'
  };

  export const tabChangeReducer = (state = tabChangeInitialState, action:ITabChangeAction) :ITabChangeInitialState  => 
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