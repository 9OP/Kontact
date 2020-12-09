import { apiActionType } from './api.action-types';

const REQUEST_ACTION = 'REQUEST';
const SUCCESS_ACTION = 'SUCCESS';
const FAILURE_ACTION = 'FAILURE';

interface State {
  [key: string]: {error: string, loading: boolean}
}

const INITIAL_STATE: State = {} as State;

export default function apiReducer(
  state: State = INITIAL_STATE,
  action: apiActionType,
): State {
  let type;
  type = action.type.includes(REQUEST_ACTION) ? REQUEST_ACTION : type;
  type = action.type.includes(SUCCESS_ACTION) ? SUCCESS_ACTION : type;
  type = action.type.includes(FAILURE_ACTION) ? FAILURE_ACTION : type;
  const key = action.type.replace(`_${type}`, '');
  const { payload } = action;

  switch (type) {
    case REQUEST_ACTION:
      return {
        ...state,
        [key]: { ...state.key, error: '', loading: true },
      };
    case SUCCESS_ACTION:
      return {
        ...state,
        [key]: { ...state.key, error: '', loading: false },
      };
    case FAILURE_ACTION:
      return {
        ...state,
        [key]: { ...state.key, error: payload, loading: false },
      };

    default:
      return state;
  }
}
