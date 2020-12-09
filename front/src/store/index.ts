/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import {
  combineReducers, applyMiddleware, compose, Action,
} from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

// Reducers
import userReducer from './user/user.reducer';
import apiReducer from './api/api.reducer';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const enhancer = composeEnhancers(applyMiddleware(thunk));

export const rootReducer = combineReducers({
  user: userReducer,
  api: apiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;
export type DispThunk = ThunkDispatch<RootState, unknown, Action>

/* ThunkAction<R, S, E, A>
  R = return of thunk
  S = is the type of root state
    = is the return type of the getState() method.

  E = is the type of the extra arguments passed to the ThunkAction

  A = is the action type defined in your application.
    = it should be able to extend from Action.
      (this means that it should be an object
      that must have a `type` field.) Action type is defined in the redux typings.
*/
