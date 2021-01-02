import React from 'react';
import { Box } from '@chakra-ui/react';

import Main from '../main/main';
import SideBar from '../sidebar';

export default (): JSX.Element => (
  <Box>
    <SideBar />
    <Main />
  </Box>
);
