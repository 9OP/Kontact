import React, { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import Header from './header';
import Message from './message';
import Members from './members/memberList';
import { useChannels } from '../../../services/hooks/channel.hooks';
import { useFetchMessages } from '../../../services/hooks/message.hooks';

export default (): JSX.Element => {
  const { channel } = useChannels();
  const [fetchMessages] = useFetchMessages();

  useEffect(() => {
    if (channel) {
      fetchMessages(channel.id);
    }
  }, [channel]);

  return (
    <Flex flex="1 0 auto">
      {channel ? (
        <Flex flexDirection="column" width="100%">
          <Header />
          <Flex
            flexDirection="row"
            height="calc(100vh - 7rem)"
            paddingTop="1rem"
          >
            <Flex flexDirection="column" width="100%">
              <Message />
            </Flex>
            <Members />
          </Flex>
        </Flex>
      ) : null}
    </Flex>
  );
};
