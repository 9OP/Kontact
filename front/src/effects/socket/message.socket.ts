/* eslint-disable import/prefer-default-export */
import { beacon } from '../../common/network/socket';
import { store } from '../../store';
import { addMessageAction } from '../../store/channel/messages/messages.actions';

interface response {
  author: string,
  message: string,
}

// socket on => define hooks here
beacon.on('message:receive', (data: response) => {
  // Should call addMessageAction only if current channel id match the received message channel

  store.dispatch(addMessageAction({
    authorId: data.author,
    content: data.message,
    date: new Date(),
  }));
});

// socket emit => define functions here
export const sendMessage = (cid: string, mess: string): void => {
  beacon.emit('message:send', {
    message: mess,
    channel: cid,
  });
};

// create effects file with sendMessage
// when message sent, wait for ack from beacon
// if ack set send icon on mssg, otherwise show error mssg not sent
