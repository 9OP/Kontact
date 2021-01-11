import React from 'react';
import { Box } from '@chakra-ui/react';
import { IMessage } from '../../../common/models/channel.model';

interface Props {
  messages: IMessage[]
}

export default (props: Props): JSX.Element => {
  const { messages } = props;

  const renderMessages = () => (
    messages.map((m, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" key={i}>
        {m.authorId}
        {' '}
        -
        {' '}
        {m.content}
      </Box>
    ))
  );

  return (
    <Box
      marginBottom="auto"
      // padding="1rem"
      overflow="auto"
    >
      {(messages && messages.length) ? renderMessages() : null}
    </Box>
  );
};
