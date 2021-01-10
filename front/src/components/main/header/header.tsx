import React from 'react';
import { Box } from '@chakra-ui/react';

import { IChannel } from '../../../common/models/channel.model';

interface Props {
  channel: IChannel;
}

export default (props: Props): JSX.Element => {
  const { channel } = props;

  return (
    <Box
      height="60px"
      minHeight="60px"
      padding=".5rem"
      borderBottom="1px solid gray"
      backgroundColor="teal.200"
    >
      {channel.name}
      ---
      {channel.createdAt.toDateString()}
    </Box>
  );
};
