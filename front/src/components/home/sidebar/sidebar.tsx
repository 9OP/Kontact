import React, { useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import Header from './header';
import Memberships from './memberships';
import Footer from './footer';

import { useFetchChannels } from '../../../services/hooks/channel.hooks';

export default (): JSX.Element => {
  const [fetchChannels] = useFetchChannels();

  useEffect(() => {
    fetchChannels();
  }, []);

  return (
    <Flex
      direction="column"
      width="17rem"
      marginRight="1rem"
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
    >
      <Box overflow="auto">
        <Box marginBottom="auto" marginTop="2rem">
          <Header />
          <Memberships />
        </Box>
      </Box>
      <Footer />
    </Flex>
  );
};
