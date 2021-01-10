import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@chakra-ui/react';

import { IChannel } from '../../common/models/channel.model';
import { selectMessages } from '../../store/channel/messages/messages.selector';

interface Props {
  channel: IChannel
}

export default (props: Props): JSX.Element => {
  const { channel } = props;
  const messages = useSelector(selectMessages);

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
    <Box>
      {channel.name}
      {(messages && messages.length) ? renderMessages() : null}
    </Box>
  );
};
