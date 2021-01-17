import React from 'react';
import {
  Box,
  Button,
  Textarea,
} from '@chakra-ui/react';

interface Props {
  sendMessage: () => void,
  message: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
}

export default (props: Props): JSX.Element => {
  const { sendMessage, message, setMessage } = props;

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
        onClick={() => sendMessage()}
      >
        Send message
      </Button>
      <Textarea
        placeholder=".... "
        size="sm"
        resize="none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
    </Box>

  );
};
