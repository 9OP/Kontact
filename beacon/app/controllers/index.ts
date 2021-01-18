/* eslint-disable import/prefer-default-export */
import { bindEvent } from './events';
import * as messageController from './message_controller';

const messageBinders = [
  bindEvent(messageController.sendMessage),
  bindEvent(messageController.fetchMessages),
];

export default [
  ...messageBinders,
];
