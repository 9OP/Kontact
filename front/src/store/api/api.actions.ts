import {
  apiActionRequest,
  apiActionSuccess,
  apiActionFailure,
} from './api.action-types';

export interface apiActions {
  request: () => apiActionRequest;
  success: () => apiActionSuccess;
  failure: (error: string) => apiActionFailure;
}

export function apiActionsCreator(type: string): apiActions {
  const requestAction = (): apiActionRequest => ({
    type: `${type}_REQUEST`,
  });

  const successAction = (): apiActionSuccess => ({
    type: `${type}_SUCCESS`,
  });

  const failureAction = (error: string): apiActionFailure => ({
    type: `${type}_FAILURE`,
    payload: error,
  });

  return {
    request: requestAction,
    success: successAction,
    failure: failureAction,
  };
}
