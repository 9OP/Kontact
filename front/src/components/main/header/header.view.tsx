import React from 'react';
import { Box, Text } from '@chakra-ui/react';

import { IChannel } from '../../../common/models/channel.model';

interface Props {
  channel: IChannel;
}

export default (props: Props): JSX.Element => {
  const { channel } = props;

  return (
    <Box
      minHeight="5rem"
      padding=".8rem"
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
    >
      <Text
        letterSpacing=".25rem"
        fontSize="xl"
        color="gray.600"
      >
        {channel.name}
      </Text>
    </Box>
  );
};
