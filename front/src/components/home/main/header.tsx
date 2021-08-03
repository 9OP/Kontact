import React from 'react';
import {
  Box,
  Text,
  HStack,
} from '@chakra-ui/react';
import { useChannels } from '../../../services/hooks/channel.hooks';

export default (): JSX.Element => {
  const { channel } = useChannels();

  return (
    <Box
      minHeight="5rem"
      padding=".8rem"
    >
      <HStack justifyContent="space-between">
        <Text
          letterSpacing=".15rem"
          fontWeight="bold"
          fontSize="2xl"
          color="gray.700"
        >
          {channel.name}
        </Text>
      </HStack>
      <Text
        letterSpacing=".15rem"
        fontWeight="bold"
        fontSize="sm"
        color="gray.400"
      >
        {channel.id}
      </Text>
    </Box>
  );
};
