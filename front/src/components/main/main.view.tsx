import React from 'react';
import { Box } from '@chakra-ui/react';

import { IChannel } from '../../common/models/channel.model';
import Chat from './chat';
import Message from './message';

interface Props {
  channel: IChannel
  send: (message: string) => void;
}

export default (props: Props): JSX.Element => {
  const { channel, send } = props;

  return (
    <Box height="100vh" marginLeft="17rem" position="relative">
      { (channel)
        ? (
          <Box display="flex" flexDirection="column">
            <Chat channel={channel} />
            <Message send={send} />
          </Box>
        )
        : null }
    </Box>
  );
};
