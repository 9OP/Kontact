/* eslint-disable import/prefer-default-export */
import { errorActionTypes, CREATE_ERROR, RESET_ERRORS } from './error.action-types';

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

export function resetErrorsAction(): errorActionTypes {
  return {
    type: RESET_ERRORS,
  };
}

// export function errorActionDeletor(
//   action: typeof CREATE_ERROR[],
// ): errorActionTypes {
//   return {
//     type: action,
//     error: false,
//     payload: null as unknown as Error,
//   };
// }
