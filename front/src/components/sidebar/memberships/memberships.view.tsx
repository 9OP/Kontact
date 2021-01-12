import React from 'react';
import {
  Box,
  List,
  ListItem,
} from '@chakra-ui/react';
import { IMembership } from '../../../common/models/membership.model';
import { IChannel } from '../../../common/models/channel.model';

interface Props {
  memberships: IMembership[],
  fetchChannel: (cid: string) => void,
  channel: IChannel,
}

export default (props: Props): JSX.Element => {
  const { memberships, fetchChannel, channel } = props;

  const renderChannels = () => (
    memberships.map((m: IMembership) => (
      <ListItem
        key={m.id}
        padding="1rem"
        _hover={{ cursor: 'pointer', backgroundColor: 'teal.100' }}
        backgroundColor={m.id === channel?.id ? 'teal.200' : 'gray.100'}
        onClick={() => fetchChannel(m.id)}
      >
        {`> ${m.name}`}
      </ListItem>
    ))
  );

  return (
    <Box marginBottom="auto">
      <List spacing={3} marginTop="3rem">
        {(memberships && memberships.length) ? renderChannels() : null}
      </List>
    </Box>

  );
};
