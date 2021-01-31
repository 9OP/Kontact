/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { IMessage } from '../../../common/models';

interface Props {
  messages: IMessage[]
}

export default (props: Props): JSX.Element => {
  const { messages } = props;

  const renderDate = (date: Date) => {
    const hours = (`0${date.getHours()}`).slice(-2);
    const mins = (`0${date.getMinutes()}`).slice(-2);
    return `${hours}:${mins}`;
  };

  const renderMessages = () => (
    messages.map((message: IMessage) => (
      <Box
        m="1rem"
        key={message.id}
        marginBottom="2rem"
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        <Box p=".5em" width="25rem">
          <Text
            fontSize="xs"
            color="gray.400"
          >
            {renderDate(message.date)}
          </Text>
          <Text
            fontSize="md"
            fontWeight="bold"
            color="gray.600"
          >
            Author
          </Text>
          <Text
            fontSize="sm"
            color="gray.500"
          >
            {message.content}

          </Text>
        </Box>
      </Box>

    ))
  );

  return (
    <Box
      marginBottom="auto"
      overflow="auto"
      marginLeft="2rem"
    >
      {(messages && messages.length) ? renderMessages() : null}
    </Box>
  );
};
