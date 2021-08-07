import React, { useEffect, useState } from 'react';
import {
  Text,
  ListItem,
  HStack,
  Box,
  List,
  VStack,
  IconButton,
  Icon,
  Flex,
  useDisclosure,
  Badge,
} from '@chakra-ui/react';
import { FiLogOut, FiUserPlus } from 'react-icons/fi';
import { useCreateMember, useFetchMembers, useMembers } from '../../../services/hooks/member.hooks';
import { useChannels } from '../../../services/hooks/channel.hooks';
import { ERole, IMember } from '../../../common/models';
import { useSignout } from '../../../services/hooks/auth.hooks';
import ModalCreator from '../../modal';

interface Props {
  member: IMember;
  onConfirmMember: () => void;
}

const MemberItem = (props: Props): JSX.Element => {
  const { member, onConfirmMember } = props;

  return (
    <ListItem key={member.id} color={member.pending ? 'gray.400' : 'gray.600'}>
      <HStack>
        <Badge ml="1" size="sm" colorScheme={member.connected ? 'green' : 'red'}>
          { member.connected ? 'conn' : 'dis'}
        </Badge>
        <Text fontWeight="bold" fontSize="sm">
          {member.name}
        </Text>
        { member.pending ? (
          <IconButton
            colorScheme="red"
            variant="ghost"
            size="sm"
            aria-label="AddUser"
            icon={<Icon as={FiUserPlus} />}
            onClick={onConfirmMember}
          />
        ) : null}
      </HStack>
    </ListItem>
  );
};

interface ModalProps {
  isOpen: boolean,
  onClose: () => void,
  addMember: (uid: string, puek: string) => void,
  pendingMember: IMember,
}

const AddMemberModal = (props: ModalProps):JSX.Element => {
  const {
    isOpen, onClose, addMember, pendingMember,
  } = props;

  const onSubmit = () => {
    addMember(pendingMember.id, pendingMember.material.puek);
    onClose();
  };

  return (
    <ModalCreator
      isOpen={isOpen}
      onClose={onClose}
      header={`Add member ${pendingMember.name}`}
      action="Confirm"
      onSubmit={onSubmit}
      body={(
        <>
          Confirm user public key fingerprint
          <Text
            marginTop="1rem"
            fontWeight="bold"
            fontSize="md"
            color="gray.400"
          >
            { pendingMember.material.pkf.replaceAll('-', '  ')}
          </Text>
        </>
      )}
    />
  );
};

export default (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { channel, role } = useChannels();
  const { members } = useMembers(channel.id);
  const [signout] = useSignout();
  const [fetchMembers] = useFetchMembers();
  const [addMember] = useCreateMember();

  const [confirmMember, setConfirmMember] = useState<IMember>();

  useEffect(() => {
    // refetch members when opened channel changes
    fetchMembers();
  }, [channel]);

  const onConfirmMember = (member: IMember) => {
    setConfirmMember(member);
    onOpen();
  };

  // should sort first active members then pending members
  const renderMembers = () => members
    .filter((member) => !member.pending || role === ERole.Master)
    .map((member) => (
      <MemberItem
        key={member.id}
        member={member}
        onConfirmMember={() => onConfirmMember(member)}
      />
    ));

  return (
    <Flex
      direction="column"
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
        </HStack>
      </VStack>

      <List spacing={8} marginY="2rem">
        { (members && members?.length) ? renderMembers() : null}
      </List>

      {/* footer */}
      <Box
        marginTop="auto"
        padding="1rem"
        boxShadow="0px -5px 10px 2px white"
      >
        <IconButton
          colorScheme="orange"
          variant="outline"
          aria-label="Signout"
          icon={<Icon as={FiLogOut} />}
          onClick={() => signout()}
        />
      </Box>

      {/* modal */}
      { confirmMember
        ? (
          <AddMemberModal
            isOpen={isOpen}
            onClose={onClose}
            addMember={addMember}
            pendingMember={confirmMember}
          />
        )
        : null}

    </Flex>
  );
};
