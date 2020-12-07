import { requestActionTypes } from './request.actions';

interface State {
  [key: string]: {isFetching: boolean}
}

const INITIAL_STATE: State = {} as unknown as State;

export default function requesReducer(
  state: State = INITIAL_STATE,
  action: requestActionTypes,
): State {
  if (action.type.includes('[COMPLETED]')) {
    // mark request as completed
    const key = action.type.replace('[COMPLETED]', '[REQUEST]');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: _, ...rest } = state;
    return rest;
  }

  if (action.type.includes('[REQUEST]')) {
    // mark request as fetching
    return {
      ...state,
      [action.type]: { ...action.payload },
    };
  }

  return state;
}
