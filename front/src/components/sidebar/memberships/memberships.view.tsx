import React from 'react';
import {
  Box,
  Badge,
  List,
  ListItem,
} from '@chakra-ui/react';
import { IMembership } from '../../../common/models/membership.model';

interface Props {
  memberships: IMembership[],
  selectChannel: (cid: string) => void,
}

export default (props: Props): JSX.Element => {
  const {
    memberships,
    selectChannel,
  } = props;

  const renderChannels = () => (
    memberships.map((m: IMembership) => (
      <ListItem key={m.id} padding="1rem" onClick={() => selectChannel(m.id)}>
        <Badge colorScheme="teal" fontSize="1.2em" _hover={{ cursor: 'pointer' }}>
          {`# ${m.name}`}
        </Badge>
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
