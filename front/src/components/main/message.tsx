import React, { useState } from 'react';
import {
  Box,
  Button,
  Textarea,
} from '@chakra-ui/react';

interface Props {
  send: (message: string) => void;
}

export default (props: Props): JSX.Element => {
  const { send } = props;
  const [message, setMessage] = useState('');

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
        onChange={(event) => setMessage(event.currentTarget.value)}
      />
      <Button
        colorScheme="blue"
        variant="outline"
        width="full"
        mt={4}
        onClick={() => send(message)}
      >
        Send message
      </Button>
    </Box>

  );
};
