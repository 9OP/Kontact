/* eslint-disable import/prefer-default-export */
import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { selectMessages } from '../../store/entities/messages/messages.selectors';
import * as message from '../socket/message.socket';

import { IMemberMessage } from '../../common/models';
import { selectOpenedChannel } from '../../store/entities/channels/channels.selectors';
import { store } from '../../store';
import { receiveMessagesAction } from '../../store/entities/messages/messages.actions';

// Check if it does not subscribe multiple time
message.receive((data: message.response) => {
  store.dispatch(receiveMessagesAction([{
    id: data.id,
    authorId: data.author,
    channelId: data.channel,
    content: data.message,
    date: new Date(),
  }]));
});

export const useMessages = (): {messages: IMemberMessage[]} => {
  const messages = useSelector(selectMessages);
  return { messages };
};

export const useSendMessages = (): [(mess: string) => void, boolean, Error | null] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const channel = useSelector(selectOpenedChannel);

  const sendMessage = useCallback((mess: string) => {
    setLoading(true);
    message.send({ channel: channel.id, message: mess })
      .catch((err) => {
        setError(err);
      }).finally(() => {
        setLoading(false);
      });
  }, []);

  return [sendMessage, loading, error];
};
