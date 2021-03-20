import React, { useState } from 'react';
import {
  Box,
  Text,
  IconButton,
  HStack,
  VStack,
  useDisclosure,
  List,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { IMember } from '../../../../common/models';
import ItemView from './item/item.view';
import Info from './info/info';

interface Props {
  isMaster: boolean;
  members: IMember[];
  deleteMember: (member: IMember) => void;
}

export default (props: Props): JSX.Element => {
  const { isMaster, members, deleteMember } = props;
  const [memberId, setMemberId] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openInfo = (uid: string) => {
    setMemberId(uid);
    onOpen();
  };

  const renderMembers = () => members.map((member: IMember) => (
    <ItemView
      key={member.id}
      isMaster={isMaster}
      member={member}
      deleteMember={() => deleteMember(member)}
      openInfo={() => openInfo(member.id)}
    />
  ));

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
          { isMaster ? (
            <IconButton
              size="xs"
              colorScheme="blue"
              variant="outline"
              aria-label="Add member"
              icon={<AddIcon />}
            />
          ) : null}
        </HStack>
        <Text color="gray.500" fontSize="xs">
          {`${members.length}/${members.length}`}
        </Text>
      </VStack>

      <List spacing={8} marginY="2rem">
        {members ? renderMembers() : null}
      </List>

      <Info isOpen={isOpen} onClose={onClose} memberId={memberId} />
    </Box>
  );
};
