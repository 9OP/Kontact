import React from 'react';
import {
  Text,
  Badge,
  ListItem,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
} from '@chakra-ui/react';
import { ERole, IMember } from '../../../../../common/models';

interface Props {
  member: IMember;
  deleteMember: () => void;
  openInfo: () => void;
}

export default (props: Props): JSX.Element => {
  const { member, deleteMember, openInfo } = props;

  const MemberMenu = (p: { children: React.ReactNode }): JSX.Element => (
    <Menu>
      <MenuButton>{p.children}</MenuButton>
      <MenuList>
        <MenuGroup title="Member">
          <MenuItem onClick={openInfo}>Info</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Danger">
          <MenuItem onClick={deleteMember}>
            <Text color="red">Yeet</Text>
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );

  return (
    <ListItem key={member.id} color="gray.600">
      <MemberMenu>
        <HStack>
          <Text fontWeight="bold" fontSize="sm">
            {member.name}
          </Text>
          {member.role === ERole.Master ? (
            <Badge variant="solid" colorScheme="teal" fontSize="xs">
              Master
            </Badge>
          ) : null}
        </HStack>
      </MemberMenu>
    </ListItem>
  );
};
