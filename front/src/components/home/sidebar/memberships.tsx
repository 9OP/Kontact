import React from 'react';
import {
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { IChannel } from '../../../common/models/channel.model';
import { useChannels } from '../../../services/hooks/channel.hooks';

export default (): JSX.Element => {
  const { channels, open, channel } = useChannels();

  const renderChannels = () => (
    channels.map((c: IChannel) => (
      <ListItem
        key={c.id}
        _hover={{
          bg: 'gray.100',
          cursor: 'pointer',
        }}
        bg={channel?.id === c.id ? 'gray.100' : ''}
        borderLeft={channel?.id === c.id ? '4px solid' : ''}
        borderColor="rgba(146, 101, 128, 0.4)"
        padding="1rem"
        paddingLeft={channel?.id === c.id ? 'calc(2rem - 4px)' : '2rem'}
        onClick={() => open(c.id)}
      >
        <Text
          fontWeight="bold"
          color="gray.600"
          fontSize="xs"
        >
          {c.name}
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
