/* eslint-disable import/prefer-default-export */
import { errorActionTypes, CREATE_ERROR } from './error.action-types';

export function errorActionCreator(
  action: typeof CREATE_ERROR,
  error: Error,
): errorActionTypes {
  return {
    type: action,
    error: true,
    payload: error,
  };
}
