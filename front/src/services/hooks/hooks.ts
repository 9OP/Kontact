/* eslint-disable import/prefer-default-export */
import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';

type actionCreator<K, A> = (payload: K) => A

export function useAction<K, A>(action: actionCreator<K, A>): actionCreator<K, A> {
  const dispatch = useDispatch<AppDispatch>();
  const boundAction = useMemo(() => bindActionCreators(action, dispatch), [
    action,
    dispatch,
  ]);

  return boundAction;
}

// export const useAppDispatch = useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
