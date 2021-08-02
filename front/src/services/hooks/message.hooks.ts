import { useState, useCallback } from 'react';

import { selectMessages } from '../../store/entities/messages/messages.selectors';
import * as message from '../socket/message.socket';

import { IMemberMessage, IMessage } from '../../common/models';
import { selectOpenedChannel } from '../../store/entities/channels/channels.selectors';
import { store } from '../../store';
import { receiveMessagesAction } from '../../store/entities/messages/messages.actions';
import { useAction, useAppSelector } from './hooks';
import { messageHttpService } from '../http';
import { JsonToMessage } from '../http/message.http';
import { encryptMessage } from '../../common/crypto';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
message.receive((data: any) => {
  store.dispatch(receiveMessagesAction([
    JsonToMessage(data),
  ]));
});

export const useMessages = (): {messages: IMemberMessage[]} => {
  const messages = useAppSelector(selectMessages);
  return { messages };
};

export const useSendMessages = (): [(mess: string) => void, boolean, Error | null] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const channel = useAppSelector(selectOpenedChannel);

  const sendMessage = useCallback(async (mess: string) => {
    setLoading(true);
    const { text, iv } = await encryptMessage(mess, channel.material.scek);
    message.send({ channel: channel.id, message: text, iv: Array.from(iv) })
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
