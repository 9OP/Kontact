import { Action } from 'redux';

export const CREATE_ERROR = '[ERROR] CREATE_GENERIC_ERROR';

interface errorAction extends Action {
  type: typeof CREATE_ERROR;
  error: boolean;
  payload: Error;
}

export type errorActionTypes = errorAction;
