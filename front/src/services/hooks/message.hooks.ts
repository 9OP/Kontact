import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { selectMessages } from '../../store/entities/messages/messages.selectors';
import * as message from '../socket/message.socket';

import { IMemberMessage, IMessage } from '../../common/models';
import { selectOpenedChannel } from '../../store/entities/channels/channels.selectors';
import { store } from '../../store';
import { receiveMessagesAction } from '../../store/entities/messages/messages.actions';
import { useAction } from './hooks';
import { messageHttpService } from '../http';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JsonToMessage = (json: any): IMessage => ({
  id: json.id,
  authorId: json.authorId,
  channelId: json.channelId,
  content: json.content,
  date: new Date(), // should use date send back
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
message.receive((data: any) => {
  store.dispatch(receiveMessagesAction([
    JsonToMessage(data),
  ]));
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
  }, [channel]); // update callback when channel changes

  return [sendMessage, loading, error];
};

export const useFetchMessages = (): [(cid: string) => void, boolean, Error | null] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const setMessages = useAction(receiveMessagesAction);

  const fetchMessages = useCallback((cid: string) => {
    setLoading(true);
    messageHttpService.fetchMessages(cid)
      .then((messages: IMessage[]) => {
        setMessages(messages);
      }).catch((err: Error) => {
        setError(err);
      }).finally(() => {
        setLoading(false);
      });
  }, [setMessages]);

  return [fetchMessages, loading, error];
};
