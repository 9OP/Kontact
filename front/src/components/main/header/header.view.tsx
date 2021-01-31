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
      height="5rem"
      minHeight="5rem"
      paddingLeft="2rem"
      paddingTop="1rem"
      borderBottom="1px solid"
      borderColor="gray.300"
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
