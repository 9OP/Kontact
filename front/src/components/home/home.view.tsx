import React from 'react';
import {
  Flex,
  Box,
  Text,
  Button,
} from '@chakra-ui/react';

interface Props {
  signout: () => void,
}

export default (props: Props): JSX.Element => {
  const { signout } = props;

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Text>
            logged in!
          </Text>
          <Button
            colorScheme="orange"
            variant="outline"
            width="full"
            mt={4}
            onClick={() => signout()}
          >
            Sign out
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};
