import React from 'react';
import {
  Box,
  Button,
  Textarea,
} from '@chakra-ui/react';

export default (): JSX.Element => {
  const a = 0;
  // test
  return (
    <Box
      bottom="0"
      position="absolute"
      padding="1rem"
      width="full"
    >
      <Textarea
        placeholder=".... "
        size="sm"
        resize="none"
        // onChange={(event) => setMessage(event.currentTarget.value)}
      />
      <Button
        colorScheme="blue"
        variant="outline"
        width="full"
        mt={4}
        // onClick={() => sendMessage()}
      >
        Send message
      </Button>
    </Box>

  );
};
