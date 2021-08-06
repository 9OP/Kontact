import React, { useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import Header from './header';
import Message from './message';
import Members from './members';
import { useChannels } from '../../../services/hooks/channel.hooks';
import { useFetchMessages } from '../../../services/hooks/message.hooks';
import { useAuth } from '../../../services/hooks/auth.hooks';

export default (): JSX.Element => {
  const { user } = useAuth();
  const { channel } = useChannels();
  const [fetchMessages] = useFetchMessages();

  useEffect(() => {
    if (channel?.active) {
      fetchMessages(channel.id, channel.material.scek);
    }
  }, [channel]);

  const Pending = () => (
    <Box paddingRight="3rem" marginBottom="auto" marginTop="auto">
      <Box
        display="flex"
        justifyContent="center"
      >
        <Box
          padding="2rem"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          textAlign="center"
        >
          Confirm your public key fingeprint with the channel master:
          <Text
            marginTop="1rem"
            fontWeight="bold"
            fontSize="md"
            color="gray.400"
          >
            { user.material.pkf.replaceAll('-', '  ')}
          </Text>

        </Box>
      </Box>
    </Box>
  );

  return (
    <Flex flex="1 0 auto">
      {channel ? (
        <Flex
          flexDirection="row"
          height="calc(100vh - 2rem)"
          width="100%"
          paddingTop="1rem"
        >
          <Flex flexDirection="column" width="100%">
            <Header />
            { channel.active ? <Message /> : <Pending />}
          </Flex>
          <Members />
        </Flex>
      ) : null}
    </Flex>
  );
};
