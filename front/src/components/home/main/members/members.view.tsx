import React, { useState } from 'react';
import {
  Box,
  useDisclosure,
  List,
} from '@chakra-ui/react';
import { IMember } from '../../../../common/models';
import Header from './header/header.view';
import Item from './item/item.view';
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
    <Item
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
      <Header isMaster={isMaster} />

      <List spacing={8} marginY="2rem">
        {members ? renderMembers() : null}
      </List>

      <Info isOpen={isOpen} onClose={onClose} memberId={memberId} />
    </Box>
  );
};
