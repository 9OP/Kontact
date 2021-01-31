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
      height="60px"
      minHeight="60px"
      paddingLeft="2rem"
      paddingTop="1rem"
      borderBottom="1px solid"
      borderColor="gray.300"
    >
      <Text
        fontWeight="bold"
        fontSize="md"
        color="gray.600"
      >
        {channel.name}
      </Text>
    </Box>
  );
};
