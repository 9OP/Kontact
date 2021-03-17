import React from 'react';
import { Flex } from '@chakra-ui/react';

import Channels from './channels/channels';
import Footer from './footer/footer';

export default (): JSX.Element => (
  <Flex
    direction="column"
    width="17rem"
    overflow="auto"
    marginRight="1rem"
    borderWidth={1}
    borderRadius={8}
    boxShadow="lg"
  >
    <Channels />
    <Footer />
  </Flex>
);
