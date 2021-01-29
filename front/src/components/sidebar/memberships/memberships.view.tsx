import React from 'react';
import {
  Box,
  List,
  ListItem,
} from '@chakra-ui/react';
import { IChannel } from '../../../common/models/channel.model';

interface Props {
  channels: IChannel[];
  openChannel: (cid: string) => void
}

export default (props: Props): JSX.Element => {
  const { channels, openChannel } = props;

  const renderChannels = () => (
    channels.map((channel: IChannel) => (
      <ListItem
        key={channel.id}
        padding="1rem"
        _hover={{ cursor: 'pointer', backgroundColor: 'teal.100' }}
        // backgroundColor={channel.id === channel?.id ? 'teal.200' : 'gray.100'}
        onClick={() => openChannel(channel.id)}
      >
        {`> ${channel.name}`}
      </ListItem>
    ))
  );

  return (
    <Box marginBottom="auto">
      <List spacing={3} marginTop="3rem">
        {(channels && channels.length) ? renderChannels() : null}
      </List>
    </Box>

  );
};
