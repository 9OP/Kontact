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
      padding="1rem"
      borderTop="1px solid gray"
    >
      <Button
        colorScheme="blue"
        variant="outline"
        width="full"
        mb={4}
        onClick={() => send(message)}
      >
        Send message
      </Button>
      <Textarea
        placeholder=".... "
        size="sm"
        resize="none"
        onChange={(event) => setMessage(event.currentTarget.value)}
      />
    </Box>

  );
};
