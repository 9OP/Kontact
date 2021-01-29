import React from 'react';
import { Box, Text, Badge } from '@chakra-ui/react';

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
    >
      <Box ml="3">
        <Text fontWeight="bold">
          {channel.name}
          <Badge ml="1" colorScheme="green">
            Members:
            {' '}
            {/* {channel.members.length} */}
          </Badge>
        </Text>
        <Text fontSize="sm">
          Created at:
          {' '}
          {channel.createdAt.toDateString()}
        </Text>
      </Box>
    </Box>
  );
};
