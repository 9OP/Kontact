import React from 'react';
import {
  Box,
  Text,
  Badge,
  List,
  ListItem,
  IconButton,
  HStack,
  VStack,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { ERole, IMember } from '../../../common/models';

interface menuProps {
  member: IMember;
  children: React.ReactNode;
}

const MemberMenu = (props: menuProps): JSX.Element => {
  const { member, children } = props;

  return (
    <Menu>
      <MenuButton>
        {children}
      </MenuButton>
      <MenuList>
        <MenuGroup title="Profile">
          <MenuItem>Key</MenuItem>
          <MenuItem>Info</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Danger">
          <MenuItem>Role</MenuItem>
          <MenuItem>
            <Text color="red">
              Yeet
            </Text>
          </MenuItem>
        </MenuGroup>

      </MenuList>
    </Menu>
  );
};

interface Props {
  members: {member: IMember, role: ERole}[]
}

export default (props: Props): JSX.Element => {
  const { members } = props;

  const renderMembers = () => (
    members.map(({ member, role }) => (
      <ListItem key={member.id} color="gray.600">
        <MemberMenu member={member}>
          <HStack>
            <Text fontWeight="bold" fontSize="sm">
              {member.name}
            </Text>
            { role === ERole.Master ? (
              <Badge variant="solid" colorScheme="teal" fontSize="xs">
                Master
              </Badge>
            ) : null}
          </HStack>
        </MemberMenu>
      </ListItem>
    ))
  );

  return (
    <Box
      minWidth="17rem"
      padding="1rem"
      paddingTop="0"
      overflow="auto"
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
    >
      <VStack
        position="sticky"
        top="0"
        paddingTop="1rem"
        paddingBottom=".5rem"
        boxShadow="0px 10px 10px 5px white"
        backgroundColor="white"
        alignItems="inherit"
      >
        <HStack justifyContent="space-between">
          <Text
            letterSpacing=".1rem"
            fontWeight="bold"
            color="gray.700"
            fontSize="md"
          >
            MEMBERS
          </Text>
          <IconButton
            size="xs"
            colorScheme="blue"
            variant="outline"
            aria-label="Add member"
            icon={<AddIcon />}
          />
        </HStack>
        <Text color="gray.500" fontSize="xs">
          {`${members.length}/${members.length}`}
        </Text>
      </VStack>

      <List spacing={8} marginY="2rem">
        {members ? renderMembers() : null}
      </List>
    </Box>

  );
};
