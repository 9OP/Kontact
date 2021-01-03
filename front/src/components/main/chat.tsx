import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { IChannel } from '../../common/models/channel.model';
import { beacon } from '../../common/network/socket';

interface Props {
  channel: IChannel
}

interface response {
  author: string,
  message: string,
}

export default (props: Props): JSX.Element => {
  const { channel } = props;
  const [messages, setMessages] = useState<response[]>([]);

  useEffect(() => {
    beacon.socket.on('message:receive', (data: response) => {
      setMessages((prevState) => [...prevState, data]);
    });

    // unmount: detach listenner to avoid memory leak
  }, []);

  const renderMessages = () => (
    messages.map((m: response) => (
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        {m.author}
        {' '}
        -
        {' '}
        {m.message}
      </Box>
    ))
  );

  return (
    <Box>
      {channel.name}
      {(messages && messages.length) ? renderMessages() : null}
    </Box>
  );
};
