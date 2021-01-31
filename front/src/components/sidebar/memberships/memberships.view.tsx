import React from 'react';
import {
  Box,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { IChannel } from '../../../common/models/channel.model';

interface Props {
  channels: IChannel[];
  openedChannel: IChannel;
  openChannel: (cid: string) => void
}

export default (props: Props): JSX.Element => {
  const { channels, openChannel, openedChannel } = props;

  const renderChannels = () => (
    channels.map((channel: IChannel) => (
      <ListItem
        key={channel.id}
        _hover={{
          bg: 'rgba(146, 101, 128, 0.05)',
        }}
        bg={openedChannel?.id === channel.id ? 'rgba(146, 101, 128, 0.07)' : ''}
        borderLeft={openedChannel?.id === channel.id ? '4px solid' : ''}
        borderColor="rgba(146, 101, 128, 0.4)"
        padding="1rem"
        paddingLeft="2rem"
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
    <Box marginBottom="auto" marginTop="5rem">
      <Text
        letterSpacing=".1rem"
        fontWeight="bold"
        color="gray.700"
        fontSize="sm"
        marginBottom="1rem"
        marginLeft="2rem"
      >
        GROUPS
      </Text>
      <List>
        {(channels && channels.length) ? renderChannels() : null}
      </List>
    </Box>

  );
};
