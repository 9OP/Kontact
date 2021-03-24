import { combineReducers } from 'redux';
import channelsReducer from './channels/channels.reducer';
import membersReducer from './members/memberships.reducer';
import messagesReducer from './messages/messages.reducer';

export default combineReducers({
  channels: channelsReducer,
  members: membersReducer,
  messages: messagesReducer,
});
