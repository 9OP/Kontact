import { errorActionTypes } from './error.action-types';

interface State {
  [key: string]: string
}

const INITIAL_STATE: State = {} as unknown as State;

export default function errorReducer(
  state: State = INITIAL_STATE,
  action: errorActionTypes,
): State {
  if (action.type.includes('[REQUEST]')) {
    const key = action.type.replace('[REQUEST]', '[ERROR]');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: _, ...rest } = state;
    return rest;
  }

  if (action.error) {
    return {
      ...state,
      [action.type]: action.payload.message,
    };
  }

  return state;
}
