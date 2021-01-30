import React from 'react';
import {
  Box,
  List,
  ListItem,
} from '@chakra-ui/react';
import { IMember } from '../../../common/models';

interface Props {
  members: IMember[]
}

export default (props: Props): JSX.Element => {
  const { members } = props;

  const renderMembers = () => (
    members.map((member: IMember) => (
      <ListItem
        key={member.id}
        padding="1rem"
      >
        {`${member.name}-${member.email}`}
      </ListItem>
    ))
  );

  return (
    <Box
      padding="1rem"
      borderLeft="1px solid gray"
      width="20rem"
    >
      <List spacing={3} marginTop="3rem">
        {(members && members.length) ? renderMembers() : null}
      </List>
    </Box>

  );
};
