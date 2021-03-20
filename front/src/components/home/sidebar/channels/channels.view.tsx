import React from 'react';
import { Box } from '@chakra-ui/react';
import Header from './header/header';
import Memberships from './memberships/memberships';

export default (): JSX.Element => (
  <Box marginBottom="auto" marginTop="2rem">
    <Header />
    <Memberships />
  </Box>
);
