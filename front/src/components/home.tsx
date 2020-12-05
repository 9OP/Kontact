import React from 'react';
import {
  Flex,
  Box,
  Text,
  Button,
} from '@chakra-ui/react';

export default function Home(): JSX.Element {
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
            // onClick={() => setIsLoggedIn(false)}
          >
            Sign out
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}
