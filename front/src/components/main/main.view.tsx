import React from 'react';
import { Flex } from '@chakra-ui/react';
import Header from './header/header';
import Channel from './channel/channel';
import Message from './message/message';
import Members from './members/members';

interface Props {
  channelLoaded: boolean
}

export default (props: Props): JSX.Element => {
  const { channelLoaded } = props;

  return (
    <Flex
      height="100vh"
      flex="1 0 auto"
    >
      { (channelLoaded)
        ? (
          <Flex
            flexDirection="row"
            width="100%"
          >

            <Flex
              flexDirection="column"
              width="100%"
            >
              <Header />
              <Channel />
              <Message />
            </Flex>
            <Members />
          </Flex>
        )
        : null }
    </Flex>
  );
};
