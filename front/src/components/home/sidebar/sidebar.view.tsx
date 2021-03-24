import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

import Channels from './channels/channels';
import Footer from './footer/footer';

export default (): JSX.Element => (
  <Flex
    direction="column"
    width="17rem"
    marginRight="1rem"
    borderWidth={1}
    borderRadius={8}
    boxShadow="lg"
  >
    <Box overflow="auto">
      <Channels />
    </Box>
    <Footer />
  </Flex>
);
