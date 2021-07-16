import React, { useState } from 'react';
import {
  Box,
  Textarea,
} from '@chakra-ui/react';
import { useSendMessages } from '../../../services/hooks/message.hooks';

export default (): JSX.Element => {
  const [message, setMessage] = useState('');
  const [sendMessage] = useSendMessages();

  const send = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <Box
      marginLeft="2rem"
      marginRight="3rem"
      paddingBottom="3rem"
    >
      <Textarea
        placeholder="Type a message... "
        _focus={{
          outline: 'none',
          borderTop: '1px solid',
          // borderColor: 'blue.300',
        }}
        textColor="gray.500"
        border="none"
        borderRadius="0"
        borderTop="1px solid"
        borderColor="lightgray!important"
        size="sm"
        resize="none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={send}
      />
    </Box>

  );
};
