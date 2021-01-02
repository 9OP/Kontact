import React from 'react';
import {
  Box,
  Button,
  Divider,
} from '@chakra-ui/react';

interface Props {
  signout: () => void;
}

export default (props: Props): JSX.Element => {
  const { signout } = props;

  return (
    <Box position="absolute" bottom="0" width="100%">
      <Divider />
      <Box display="flex" flexDirection="row" padding=".5em">
        <Button
          padding=".25rem"
          colorScheme="orange"
          variant="outline"
          flex="1"
          marginRight=".5em"
          onClick={() => signout()}
        >
          Sign out
        </Button>
      </Box>
    </Box>
  );
};
