import React, { useState } from 'react';
import {
  Box,
  Button,
  Textarea,
} from '@chakra-ui/react';

import { beacon } from '../../common/network/socket';

interface Props {
  cid: string;
}

export default (props: Props): JSX.Element => {
  const [message, setMessage] = useState('');
  const { cid } = props;

  const sendMessage = () => {
    beacon.socket.emit('message:send', {
      message,
      channel: cid,
    });
  };

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
        onClick={() => sendMessage()}
      >
        Send message
      </Button>
    </Box>

  );
};
