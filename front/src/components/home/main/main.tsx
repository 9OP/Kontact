import React, { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import Header from './header';
import Message from './message';
import Members from './members';
import { useChannels } from '../../../services/hooks/channel.hooks';
import { useFetchMessages } from '../../../services/hooks/message.hooks';

export default (): JSX.Element => {
  const { channel } = useChannels();
  const [fetchMessages] = useFetchMessages();

  useEffect(() => {
    if (channel) {
      fetchMessages(channel.id, channel.material.scek);
    }
  }, [channel]);

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
            <Message />
          </Flex>
          <Members />
        </Flex>
      ) : null}
    </Flex>
  );
};
