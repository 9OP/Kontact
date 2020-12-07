import { Action } from 'redux';

// export const CREATE_ERROR = '[ERROR] CREATE_GENERIC_ERROR';

interface errorActionCreator extends Action {
  type: string;
  error: boolean;
  payload: Error;
}

export type errorActionTypes = errorActionCreator;
