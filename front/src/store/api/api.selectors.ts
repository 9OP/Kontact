/* eslint-disable import/prefer-default-export */
import { RootState } from '..';

interface apiSelectors {
  error: (s: RootState) => string;
  loading: (s: RootState) => boolean;
}

export function apiSelectorsCreator(type: string): apiSelectors {
  const errorSelector = (state: RootState): string => state.api[type]?.error;

  const loadingSelector = (state: RootState): boolean => state.api[type]?.loading;

  return {
    error: errorSelector,
    loading: loadingSelector,
  };
}
