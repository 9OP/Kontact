import React from 'react';
import {
  Box,
  Textarea,
} from '@chakra-ui/react';

interface Props {
  sendMessage: () => void,
  message: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
}

export default (props: Props): JSX.Element => {
  const { sendMessage, message, setMessage } = props;

  const send = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <Box
      paddingLeft="5rem"
      paddingRight="5rem"
      paddingBottom="3rem"
    >
      <Textarea
        placeholder=".... "
        _focus={{
          outline: 'none',
          borderColor: 'gray.300',
        }}
        _hover={{
          borderColor: 'gray.300',
        }}
        borderColor="gray.100"
        borderRadius="10px"
        size="sm"
        resize="none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={send}
      />
    </Box>

  );
};
