import {
    TypedUseSelectorHook, useDispatch as dh, useSelector as sh,
} from "react-redux";

import { rootReducer } from "./reducers";
import { Action, ActionCreator } from "redux";
import store from "./store";
import { ThunkAction } from "redux-thunk";

interface TSimpleAction {
    readonly type: string;
}

type TApplicationActions = TSimpleAction

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = sh;
export const useDispatch = () => dh<AppDispatch & AppThunk>();
