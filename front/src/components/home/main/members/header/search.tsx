import React, { useState } from 'react';
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  ListItem,
  List,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
import { RiUserSearchLine } from 'react-icons/ri';
import { IMemberPreview } from '../../../../../common/models';
import { useCreateMember, useSearchUser } from '../../../../../services/member.hooks';
import { useChannels } from '../../../../../services/channel.hooks';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default (props: Props): JSX.Element => {
  const { isOpen, onClose } = props;
  const [selectedUsers, setSelectedUsers] = useState<{
    [id: string]: IMemberPreview;
  }>({});

  const [,, currentChannel] = useChannels();
  const [createMember] = useCreateMember();
  const [search, setSearch, searchedUsers] = useSearchUser();

  const handleClose = () => {
    Object.keys(selectedUsers).forEach((uid: string) => {
      createMember(currentChannel.id, uid);
    });
    setSearch('');
    setSelectedUsers({});
    onClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;
    setSearch(value);
  };

  const toggleUser = (user: IMemberPreview) => {
    if (user.id in selectedUsers) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [user.id]: _, ...rest } = selectedUsers;
      setSelectedUsers(rest);
    } else {
      setSelectedUsers({ ...selectedUsers, [user.id]: user });
    }
  };

  const renderSearchedUsers = () => searchedUsers.map((user: IMemberPreview) => (
    <ListItem
      key={user.id}
      paddingX="1rem"
      _hover={{
        backgroundColor: 'gray.100',
        cursor: 'pointer',
      }}
      onClick={() => toggleUser(user)}
    >
      <Text
        color={user.id in selectedUsers ? 'blue.500' : 'gray.700'}
        fontWeight="bold"
        fontSize="md"
      >
        {user.name}
      </Text>
      <Text color={user.id in selectedUsers ? 'blue.400' : 'gray.500'} fontSize="xs">
        {`#${user.id.slice(0, 5)}`}
      </Text>
    </ListItem>
  ));

  const renderSelectedUsers = () => Object.values(selectedUsers).map((user: IMemberPreview) => (
    <Tag key={user.id} size="sm" colorScheme="blue" variant="solid">
      <TagLabel>{user.name}</TagLabel>
      <TagCloseButton onClick={() => toggleUser(user)} />
    </Tag>
  ));

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={RiUserSearchLine} color="blue.300" />
          </InputLeftElement>
          <Input placeholder="Add user ..." value={search} onChange={handleChange} />
        </InputGroup>

        {Object.keys(selectedUsers).length ? (
          <HStack margin=".4rem" display="inline-block" spacing={4}>
            {renderSelectedUsers()}
          </HStack>
        ) : null}

        {searchedUsers.length ? (
          <List spacing={2} marginY="1rem">
            {renderSearchedUsers()}
          </List>
        ) : null}
      </ModalContent>
    </Modal>
  );
};
