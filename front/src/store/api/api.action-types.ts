/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from 'redux';

export interface apiActionRequest extends Action {
  type: string;
  payload?: any;
}
export interface apiActionSuccess extends Action {
  type: string;
  payload?: any;
}
export interface apiActionFailure extends Action {
  type: string;
  payload: string; // Error
}

export type apiActionType =
  | apiActionRequest
  | apiActionSuccess
  | apiActionFailure;
