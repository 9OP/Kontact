/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { IMessage } from '../../../common/models';

interface Props {
  messages: IMessage[]
}

export default (props: Props): JSX.Element => {
  const { messages } = props;

  const renderDate = (date: Date) => date.toLocaleString();
  const renderMessages = () => (
    messages.map((m, i) => (
      <Box m="1rem" key={i}>
        <Box p=".5em" width="25rem" borderWidth={1} borderRadius={4}>
          <Text fontSize="sm" color="gray.600">{m.authorId}</Text>
          <Text fontSize="md">{m.content}</Text>
        </Box>
        <Text fontSize="xs" color="gray.600">{renderDate(m.date)}</Text>
      </Box>

    ))
  );

  return (
    <Box
      marginBottom="auto"
      overflow="auto"
    >
      {(messages && messages.length) ? renderMessages() : null}
    </Box>
  );
};
