/* eslint-disable import/prefer-default-export */
import { bindEvent } from './events';
import * as messageController from './message_controller';
import * as userController from './user_controller';

const messageBinders = [
  bindEvent(messageController.sendMessage),
  // bindEvent(messageController.fetchMessages),
];

const userBinders = [
  bindEvent(userController.authWhoami),
];

export default [
  ...messageBinders,
  ...userBinders,
];
