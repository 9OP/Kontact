import { combineReducers } from 'redux';
import channelReducer from './channel/reducer';

export default combineReducers({
  channel: channelReducer,
});
