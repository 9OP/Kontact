/* eslint-disable import/prefer-default-export */
import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import useAction from './useAction';
import { selectMessages } from '../store/entities/messages/messages.selectors';
import { receiveMessagesAction } from '../store/entities/messages/messages.actions';
import * as message from './effects/socket/message.socket';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useMessages() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const messages = useSelector(selectMessages);
  const setMessages = useAction(receiveMessagesAction);

  // Check if it does not subscribe multiple time
  message.receive((data: message.response) => {
    setMessages([{
      id: data.id,
      authorId: data.author,
      channelId: data.channel,
      content: data.message,
      date: new Date(),
    }]);
  });

  const sendMessage = useCallback((cid: string, mess: string) => {
    setLoading(true);
    message.send({ channel: cid, message: mess })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return [messages, sendMessage, loading, error];
}
