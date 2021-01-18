import { IMessage } from '../../../common/models/channel.model';
import { RESET_CHANNEL } from '../channel.action-types';
import { messagesActionTypes, ADD_MESSAGE, RESET_MESSAGES } from './messages.actions';

type State = IMessage[]

const INITIAL_STATE = [] as State;

export default function channelReducer(
  state = INITIAL_STATE, action: messagesActionTypes,
): State {
  switch (action.type) {
    case ADD_MESSAGE:
      return [...state, action.payload];
    case RESET_MESSAGES:
    case RESET_CHANNEL:
      return INITIAL_STATE;

    default:
      return state;
  }
}
