/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */
import { Action } from 'redux';

interface apiActionRequest extends Action {
  type: string;
}
interface apiActionSuccess extends Action {
  type: string;
  payload: any;
}
interface apiActionFailure extends Action {
  type: string;
  payload: Error;
}

export type apiActionType =
  | apiActionRequest
  | apiActionSuccess
  | apiActionFailure;

interface apiActions {
  request: () => apiActionRequest;
  success: (data?: any) => apiActionSuccess;
  failure: (error: Error) => apiActionFailure;
}

export function apiActionsCreator(type: string): apiActions {
  const requestAction = (): apiActionRequest => ({
    type: `${type}_REQUEST`,
  });

  const successAction = (data?: any): apiActionSuccess => ({
    type: `${type}_SUCCESS`,
    payload: data,
  });

  const failureAction = (error: Error): apiActionFailure => ({
    type: `${type}_FAILURE`,
    payload: error,
  });

  return {
    request: requestAction,
    success: successAction,
    failure: failureAction,
  };
}
