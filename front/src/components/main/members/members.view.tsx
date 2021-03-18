import React, { useState } from 'react';
import {
  Box,
  Text,
  Badge,
  List,
  ListItem,
  IconButton,
  HStack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { ERole, IMember } from '../../../common/models';
import ModalCreator from '../../modal';

interface ModalProps {
  isOpen: boolean,
  onClose: () => void,
  member: IMember,
}

const MemberModal = (props: ModalProps) => {
  const {
    isOpen, onClose, member,
  } = props;

  const onSubmit = () => {
    onClose();
  };

  return (
    <ModalCreator
      isOpen={isOpen}
      onClose={onClose}
      header={member.name}
      action="Save"
      onSubmit={onSubmit}
      body={<Text />}
    />
  );
};

interface Props {
  members: {member: IMember, role: ERole}[]
}

export default (props: Props): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [member, setMember] = useState<IMember>({} as IMember);
  const { members } = props;

  const openModal = (member: IMember) => {
    setMember(member);
    onOpen();
  };

  const renderMembers = () => (
    members.map(({ member, role }) => (
      <ListItem
        key={member.id}
        _hover={{ cursor: 'pointer', color: 'blue.600' }}
        color="gray.600"
        onClick={() => openModal(member)}
      >
        <HStack>
          <Text fontWeight="bold" color="inherit">
            {member.name}
          </Text>
          { role === ERole.Master ? (
            <Badge variant="solid" colorScheme="teal" fontSize="xs">
              Master
            </Badge>
          ) : null}
        </HStack>
      </ListItem>
    ))
  );

  return (
    <Box
      overflow="auto"
      width="20rem"
      padding="1rem"
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
    >
      <VStack marginBottom="2rem" alignItems="inherit">
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
          {members.length}
          {' '}
          /
          {' '}
          {members.length}
        </Text>
      </VStack>

      <List spacing={8} marginBottom="2rem">
        {(members && members.length) ? renderMembers() : null}
      </List>

      {/* <MemberModal
        isOpen={isOpen}
        onClose={onClose}
        member={member}
      /> */}
    </Box>

  );
};
