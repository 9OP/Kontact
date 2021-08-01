import React, { useCallback, useState, useEffect } from 'react';
import {
  Box,
  Textarea,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { IMessage, IMember } from '../../../common/models';
import { useMessages, useSendMessages } from '../../../services/hooks/message.hooks';

const MessageBox = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const { messages } = useMessages();

  useEffect(() => {
    if (messages && messages.length) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [messages]);

  const chatRef = useCallback((node) => {
    if (node !== null) {
      node.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const renderDate = (date: Date) => {
    const local = 'en';
    const ye = new Intl.DateTimeFormat(local, { year: 'numeric' }).format(date);
    const mo = new Intl.DateTimeFormat(local, { month: 'short' }).format(date);
    const da = new Intl.DateTimeFormat(local, { day: '2-digit' }).format(date);
    const hours = (`0${date.getHours()}`).slice(-2);
    const mins = (`0${date.getMinutes()}`).slice(-2);
    return `${mo} ${da}, ${ye} at ${hours}:${mins}`;
  };

  const renderMessages = () => (
    messages.map((message: {data: IMessage, author: IMember}) => (
      <Box
        key={message.data.id}
        marginBottom="2rem"
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        <Box p=".5em" width="25rem">
          <Text fontSize="xs" color="gray.400">
            {renderDate(message.data.date)}
          </Text>
          <Text fontSize="md" fontWeight="bold" color="gray.600">
            {message?.author?.name}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {message.data.content}
          </Text>
        </Box>
      </Box>

    ))
  );

  return (
    <>
      { !loading
        ? (
          <Box
            paddingRight="3rem"
            marginBottom="auto"
            overflow="auto"
            className="scroller"
          >
            {renderMessages()}
            <Box ref={chatRef} />
          </Box>
        )
        : (
          <Box paddingRight="3rem" marginBottom="auto" marginTop="auto">
            <Box display="flex" justifyContent="center">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="teal.500"
                size="xl"
              />
            </Box>
          </Box>

        )}
    </>

  );
};

const MessageInput = (): JSX.Element => {
  const [message, setMessage] = useState('');
  const [sendMessage] = useSendMessages();

  const send = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <Box
      marginLeft="2rem"
      marginRight="3rem"
      paddingBottom="3rem"
    >
      <Textarea
        placeholder="Type a message... "
        _focus={{
          outline: 'none',
          borderTop: '1px solid',
          // borderColor: 'blue.300',
        }}
        textColor="gray.500"
        border="none"
        borderRadius="0"
        borderTop="1px solid"
        borderColor="lightgray!important"
        size="sm"
        resize="none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={send}
      />
    </Box>

  );
};

export default (): JSX.Element => (
  <>
    <MessageBox />
    <MessageInput />
  </>
);
