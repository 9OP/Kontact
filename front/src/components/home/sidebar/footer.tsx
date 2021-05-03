import React from 'react';
import {
  Box,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import { useSignout } from '../../../services/hooks/auth.hooks';

export default (): JSX.Element => {
  const [signout] = useSignout();

  return (
    <Box
      marginTop="auto"
      padding="1rem"
      boxShadow="0px -5px 10px 2px white"
    >
      <IconButton
        colorScheme="orange"
        variant="outline"
        aria-label="Signout"
        icon={<Icon as={FiLogOut} />}
        onClick={() => signout()}
      />
    </Box>
  );
};
