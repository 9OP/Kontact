import React from 'react';
import { Flex } from '@chakra-ui/react';

import Main from '../main';
import SideBar from '../sidebar';

export default (): JSX.Element => (
  <Flex direction="row" padding="1rem" height="100vh">
    <SideBar />
    <Main />
  </Flex>
);
