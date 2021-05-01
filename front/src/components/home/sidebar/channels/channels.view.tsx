import React from 'react';
import { Box } from '@chakra-ui/react';
import Header from './header/header.view';
import Memberships from './memberships/memberships.view';

export default (): JSX.Element => (
  <Box marginBottom="auto" marginTop="2rem">
    <Header />
    <Memberships />
  </Box>
);
