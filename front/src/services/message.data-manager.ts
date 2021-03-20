import { sendMessage } from './effects/messages.effects';
import { selectMessages } from '../store/entities/messages/messages.selectors';

export default {
  // actions
  sendMessage,
  // selectors
  selectMessages,
};
