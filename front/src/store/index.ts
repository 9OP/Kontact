/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import {
  combineReducers, applyMiddleware, compose, Action,
} from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

// Reducers
import { userReducer } from './user/user.reducer';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const enhancer = composeEnhancers(applyMiddleware(thunk));

export const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;
export type DispThunk = ThunkDispatch<RootState, unknown, Action>
