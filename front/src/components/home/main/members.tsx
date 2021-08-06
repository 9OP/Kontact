import React, { useEffect } from 'react';
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
} from '@chakra-ui/react';
import { FiLogOut, FiUserPlus } from 'react-icons/fi';
import { useFetchMembers, useMembers } from '../../../services/hooks/member.hooks';
import { useChannels } from '../../../services/hooks/channel.hooks';
import { ERole, IMember } from '../../../common/models';
import { useSignout } from '../../../services/hooks/auth.hooks';
import ModalCreator from '../../modal';

interface Props {
  member: IMember;
}

const MemberItem = (props: Props): JSX.Element => {
  const { member } = props;

  return (
    <ListItem key={member.id} color={member.pending ? 'gray.400' : 'gray.600'}>
      <HStack>
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
            // onClick={() => signout()}
          />
        ) : null}
      </HStack>
    </ListItem>
  );
};

interface ModalProps {
  isOpen: boolean,
  onClose: () => void,
  createChannel: (name: string) => void
}

const AddMemberModal = (props: ModalProps):JSX.Element => {
  const { isOpen, onClose, createChannel } = props;

  const onSubmit = () => {
    createChannel(name);
    onClose();
    setName('');
  };

  return (
    <ModalCreator
      isOpen={isOpen}
      onClose={onClose}
      header="Create channel"
      action="Create"
      onSubmit={onSubmit}
      body={(
        <Input
          value={name}
          onChange={handleChange}
          placeholder="Channel name"
          size="sm"
        />
      )}
    />
  );
};

export default (): JSX.Element => {
  const { channel, role } = useChannels();
  const { members } = useMembers(channel.id);
  const [signout] = useSignout();
  const [fetchMembers] = useFetchMembers();

  useEffect(() => {
    // refetch members when opened channel changes
    fetchMembers();
  }, [channel]);

  // should sort first active members then pending members
  const renderMembers = () => members
    .filter((member) => !member.pending || role === ERole.Master)
    .map((member) => (
      <MemberItem
        key={member.id}
        member={member}
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
    </Flex>
  );
};
