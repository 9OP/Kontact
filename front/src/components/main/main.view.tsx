import React from 'react';
import { Flex } from '@chakra-ui/react';

import { IChannel } from '../../common/models/channel.model';
import Header from './header/header';
import Channel from './channel/channel';
import Message from './message/message';

interface Props {
  channel: IChannel
  send: (message: string) => void;
}

export default (props: Props): JSX.Element => {
  const { channel, send } = props;

  return (
    // <Box
    //   as="nav"
    //   width="17rem"
    //   height="100vh"
    //   position="fixed"
    //   overflow="auto"
    //   // boxShadow="xl"
    //   borderRight="1px solid gray"
    // ></Box>
    <Flex
      height="100vh"
      flex="1 0 auto"
    >
      { (channel)
        ? (
          <Flex
            flexDirection="column"
            width="100%"
          >
            <Header channel={channel} />
            <Channel />
            <Message send={send} />
          </Flex>
        )
        : null }
    </Flex>
  );
};
