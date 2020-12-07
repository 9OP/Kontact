import { Action } from 'redux';

export const CREATE_ERROR = '[ERROR] CREATE_GENERIC_ERROR';
export const RESET_ERRORS = '[ERROR] RESET_ERRORS';

interface errorActionCreator extends Action {
  type: typeof CREATE_ERROR;
  error: boolean;
  payload: Error;
}

interface resetErrorsAction extends Action {
  type: typeof RESET_ERRORS;
}

export type errorActionTypes = errorActionCreator | resetErrorsAction;
