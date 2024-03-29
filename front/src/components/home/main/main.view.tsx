import React from 'react';
import { Flex } from '@chakra-ui/react';
import Header from './header/header';
import Channel from './channel/channel';
import Message from './message/message';
import Members from './members/members';

interface Props {
  channelOpened: boolean;
}

export default (props: Props): JSX.Element => {
  const { channelOpened } = props;

  return (
    <Flex flex="1 0 auto">
      {channelOpened ? (
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
