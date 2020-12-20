import React from 'react';
import {
  Flex,
  Box,
  Button,
  Avatar,
  AvatarBadge,
  Stack,
  Heading,
  Textarea,
  Badge,
  Text,
} from '@chakra-ui/react';
import MessageBox from './message_box';

export default (): JSX.Element => {
  const a = 0;
  // test
  return (
    <Box height="100vh" marginLeft="17rem" position="relative">
      <Box display="flex" flexDirection="column">
        <Box>
          Chat Box
        </Box>
        <MessageBox />
      </Box>
    </Box>
  );
};
