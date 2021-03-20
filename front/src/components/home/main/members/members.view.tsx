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
import ItemView from './item/item.view';
import InfoView from './info/info.view';
import { IMember } from '../../../../common/models';

interface Props {
  members: IMember[];
  deleteMember: (uid: string) => void;
}

export default (props: Props): JSX.Element => {
  const { members, deleteMember } = props;
  const [memberInfo, setMemberInfo] = useState<IMember>({} as IMember);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openInfo = (member: IMember) => {
    setMemberInfo(member);
    onOpen();
  };

  const renderMembers = () => members.map((member: IMember) => (
    <ItemView
      key={member.id}
      member={member}
      deleteMember={() => deleteMember(member.id)}
      openInfo={() => openInfo(member)}
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

      <InfoView isOpen={isOpen} onClose={onClose} member={memberInfo} />
    </Box>
  );
};
