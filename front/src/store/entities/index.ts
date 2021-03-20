import { combineReducers } from 'redux';
import channelsReducer from './channels/channels.reducer';
import membersReducer from './memberships/members/members.reducer';
import membershipsReducer from './memberships/memberships.reducer';
import messagesReducer from './messages/messages.reducer';

export default combineReducers({
  channels: channelsReducer,
  members: membersReducer,
  memberships: membershipsReducer,
  messages: messagesReducer,
});
