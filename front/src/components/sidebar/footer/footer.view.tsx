import React from 'react';
import {
  Box,
  Button,
} from '@chakra-ui/react';

interface Props {
  signout: () => void;
}

export default (props: Props): JSX.Element => {
  const { signout } = props;

  return (
    <Box
      marginTop="auto"
      borderTop="1px solid gray"
      padding=".25rem"
    >
      <Button
        width="full"
        colorScheme="orange"
        variant="outline"
        onClick={() => signout()}
      >
        Sign out
      </Button>

    </Box>
  );
};
