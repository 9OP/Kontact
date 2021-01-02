import React from 'react';
import { Box } from '@chakra-ui/react';
import { IChannel } from '../../common/models/channel.model';

interface Props {
  channel: IChannel
}

export default (props: Props): JSX.Element => {
  const { channel } = props;

  return (
    <Box>
      {channel.name}
    </Box>
  );
};
