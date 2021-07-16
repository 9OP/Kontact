/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { IMessage, IMember } from '../../../common/models';
import { useMessages } from '../../../services/hooks/message.hooks';

export default (): JSX.Element => {
  const { messages } = useMessages();

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
          <Text
            fontSize="xs"
            color="gray.400"
          >
            {renderDate(message.data.date)}
          </Text>
          <Text
            fontSize="md"
            fontWeight="bold"
            color="gray.600"
          >
            {message?.author?.name}
          </Text>
          <Text
            fontSize="sm"
            color="gray.500"
          >
            {message.data.content}
          </Text>
        </Box>
      </Box>

    ))
  );

  return (
    <Box
      className="scroller"
      marginBottom="auto"
      overflow="auto"
      paddingRight="3rem"
    >
      {(messages && messages.length) ? renderMessages() : null}
      <Box ref={chatRef} />
    </Box>
  );
};
