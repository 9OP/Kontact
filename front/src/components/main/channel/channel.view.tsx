/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { IMessage, IMember } from '../../../common/models';

interface Props {
  messages: {data: IMessage, author: IMember}[]
}

export default (props: Props): JSX.Element => {
  const { messages } = props;

  const chatRef = useCallback((node) => {
    if (node !== null) {
      node.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const renderDate = (date: Date) => {
    const hours = (`0${date.getHours()}`).slice(-2);
    const mins = (`0${date.getMinutes()}`).slice(-2);
    return `${hours}:${mins}`;
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
