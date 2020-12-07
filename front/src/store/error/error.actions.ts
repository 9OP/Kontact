/* eslint-disable import/prefer-default-export */
import { errorActionTypes } from './error.action-types';

export function errorActionCreator(
  action: string,
  error: Error,
): errorActionTypes {
  return {
    type: action,
    error: true,
    payload: error,
  };
}
