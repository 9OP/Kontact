/* eslint-disable import/prefer-default-export */
import * as socketService from './socket/message.socket';
import { store } from '../../store';

export const sendMessage = (cid: string, message: string): void => {
  // when message sent, wait for ack from beacon
  // if ack set send icon on mssg, otherwise show error mssg not sent
  socketService.sendMessage(cid, message);
};
