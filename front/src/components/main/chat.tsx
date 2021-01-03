import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { IChannel } from '../../common/models/channel.model';
import { beacon } from '../../common/network/socket';

interface Props {
  channel: IChannel
}

export default (props: Props): JSX.Element => {
  const { channel } = props;
  // const [messages, setMessages] = useState([]);

  useEffect(() => {
    beacon.socket.on('message:receive', (data: any) => {
      console.log(data);
    });

    // unmount: detach listenner to avoid memory leak
  }, []);

  return (
    <Box>
      {channel.name}
    </Box>
  );
};
