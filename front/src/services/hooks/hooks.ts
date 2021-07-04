/* eslint-disable import/prefer-default-export */
import { useMemo } from 'react';
import { bindActionCreators, ActionCreator } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';

export function useAction<T>(action: ActionCreator<T>): ActionCreator<T> {
  const dispatch = useDispatch<AppDispatch>();
  const boundAction = useMemo(() => bindActionCreators(action, dispatch), [
    action,
    dispatch,
  ]);

  return boundAction;
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
