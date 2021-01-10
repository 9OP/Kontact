import React from 'react';
import { Flex } from '@chakra-ui/react';

import Main from '../main';
import SideBar from '../sidebar';

export default (): JSX.Element => (
  <Flex direction="row">
    <SideBar />
    <Main />
  </Flex>
);
