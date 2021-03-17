import React from 'react';
import {
  Box,
  List,
  ListItem,
  Text,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
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
          bg: 'gray.100',
        }}
        bg={openedChannel?.id === channel.id ? 'gray.100' : ''}
        borderLeft={openedChannel?.id === channel.id ? '3px solid' : ''}
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
    <Box marginBottom="auto" marginTop="2rem">
      <HStack marginBottom="1rem">
        <Text
          letterSpacing=".1rem"
          fontWeight="bold"
          color="gray.700"
          fontSize="xl"
          marginLeft="2rem"
        >
          CHANNELS
        </Text>
        <IconButton
          size="sm"
          aria-label="Create channel"
          icon={<AddIcon />}
        />
      </HStack>

      <List>
        {(channels && channels.length) ? renderChannels() : null}
      </List>
    </Box>

  );
};
