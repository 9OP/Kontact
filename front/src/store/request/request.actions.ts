/* eslint-disable import/prefer-default-export */
// import { errorActionTypes } from './error.action-types';

import { Action } from 'redux';

interface requestActionCreator extends Action {
  type: string;
  payload: {
    isFetching: boolean
  };
}

export type requestActionTypes = requestActionCreator;

export function requestActionCreator(
  action: string,
): requestActionTypes {
  return {
    type: action,
    payload: {
      isFetching: true,
    },
  };
}
