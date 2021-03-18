import React from 'react';
import {
  Box,
  IconButton,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

interface Props {
  signout: () => void;
}

export default (props: Props): JSX.Element => {
  const { signout } = props;

  return (
    <Box
      marginTop="auto"
      padding="1rem"
    >
      <IconButton
        colorScheme="orange"
        aria-label="Signout"
        icon={<CloseIcon />}
        onClick={() => signout()}
      />

    </Box>
  );
};
