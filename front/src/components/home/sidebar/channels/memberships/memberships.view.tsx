import React from 'react';
import {
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { IChannel } from '../../../../../common/models/channel.model';

interface Props {
  channels: IChannel[];
  openedChannel: IChannel;
  openChannel: (cid: string) => void
}

export default (props: Props): JSX.Element => {
  const { channels, openChannel, openedChannel } = props;

  const isOpened = (cid: string) => openedChannel?.id === cid;

  const renderChannels = () => (
    channels.map((channel: IChannel) => (
      <ListItem
        key={channel.id}
        _hover={{
          bg: 'gray.100',
          cursor: 'pointer',
        }}
        bg={isOpened(channel.id) ? 'gray.100' : ''}
        borderLeft={isOpened(channel.id) ? '3px solid' : ''}
        borderColor="rgba(146, 101, 128, 0.4)"
        padding="1rem"
        paddingLeft={isOpened(channel.id) ? 'calc(2rem - 3px)' : '2rem'}
        onClick={() => openChannel(channel.id)}
      >
        <Text
          fontWeight="bold"
          color="gray.600"
          fontSize="xs"
        >
          {channel.name}
        </Text>
      </ListItem>
    ))
  );

  return (
    <List>
      {channels ? renderChannels() : null}
    </List>
  );
};
