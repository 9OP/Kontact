/* eslint-disable import/prefer-default-export */
import { beacon } from '../../../common/network/socket';
import { store } from '../../../store';
import { addMessageAction } from '../../../store/channel/messages/messages.actions';

interface response {
  author: string,
  message: string,
}

beacon.on('message:receive', (data: response) => {
  // Should call addMessageAction only if current channel id match the received message channel

  store.dispatch(addMessageAction({
    authorId: data.author,
    content: data.message,
    date: new Date(),
  }));
});

// eslint-disable-next-line @typescript-eslint/ban-types
export const sendMessage = (cid: string, mess: string, ack?: Function): void => {
  beacon.emit('message:send', {
    message: mess,
    channel: cid,
  }, ack);
};
