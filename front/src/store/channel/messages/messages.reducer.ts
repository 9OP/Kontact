import { IMessage } from '../../../common/models/channel.model';
import { messagesActionTypes, ADD_MESSAGE } from './messages.actions';

type State = IMessage[]

const INITIAL_STATE = [] as State;

export default function channelReducer(
  state = INITIAL_STATE, action: messagesActionTypes,
): State {
  switch (action.type) {
    case ADD_MESSAGE:
      return [...state, action.payload];

    default:
      return state;
  }
}
