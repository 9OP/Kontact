/* eslint-disable no-case-declarations */
import { IMessage, NormalizedState } from '../../../common/models';
import { messagesActionTypes, SET_MESSAGES, ADD_MESSAGE } from './messages.actions';

type State = NormalizedState<IMessage>;

const INITIAL_STATE = {} as State;

export default function membershipsReducer(
  state = INITIAL_STATE,
  action: messagesActionTypes,
): State {
  switch (action.type) {
    case SET_MESSAGES:
      const messages: typeof state = {};
      action.payload.forEach((message: IMessage) => {
        messages[message.id] = message;
      });
      return { ...state, ...messages };

    case ADD_MESSAGE:
      const message = action.payload;
      return { ...state, [message.id]: message };

    default:
      return state;
  }
}
