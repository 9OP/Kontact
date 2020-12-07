import { errorActionTypes, RESET_ERRORS } from './error.action-types';

interface State {
  [key: string]: string
}

const INITIAL_STATE: State = {} as unknown as State;

export default function errorReducer(
  state: State = INITIAL_STATE,
  action: errorActionTypes,
): State {
  if (action.type === RESET_ERRORS) {
    return INITIAL_STATE;
  }

  if (!action.error) {
    const key = action.type;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: _, ...rest } = state;
    return rest;
  }

  return {
    ...state,
    [action.type]: action.payload.message,
  };
}
