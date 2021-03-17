import React from 'react';
import { Flex } from '@chakra-ui/react';

import Memberships from './memberships/memberships';
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
    <Memberships />
    <Footer />
  </Flex>
);
