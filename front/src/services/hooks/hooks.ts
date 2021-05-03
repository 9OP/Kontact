/* eslint-disable import/prefer-default-export */
import { useMemo } from 'react';
import { bindActionCreators, ActionCreator } from 'redux';
import { useDispatch } from 'react-redux';

export function useAction<T>(action: ActionCreator<T>): ActionCreator<T> {
  const dispatch = useDispatch();
  const boundAction = useMemo(() => bindActionCreators(action, dispatch), [
    action,
    dispatch,
  ]);

  return boundAction;
}