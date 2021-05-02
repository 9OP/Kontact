import React from 'react';
import { Flex } from '@chakra-ui/react';
import Header from './header';
import Channel from './channel';
import Message from './message';
import Members from './members/memberList';
import { useChannels } from '../../../services/channel.hooks';

export default (): JSX.Element => {
  const [, , currentChannel] = useChannels();

  return (
    <Flex flex="1 0 auto">
      {currentChannel ? (
        <Flex flexDirection="column" width="100%">
          <Header />
          <Flex
            flexDirection="row"
            height="calc(100vh - 7rem)"
            paddingTop="1rem"
          >
            <Flex flexDirection="column" width="100%">
              <Channel />
              <Message />
            </Flex>
            <Members />
          </Flex>
        </Flex>
      ) : null}
    </Flex>
  );
};
