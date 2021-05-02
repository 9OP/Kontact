import React, { useState } from 'react';
import {
  Box,
  useDisclosure,
  List,
} from '@chakra-ui/react';
import { ERole, IMember } from '../../../../common/models';
import Header from './header/header';
import Item from './memberItem';
import Info from './infoDrawer';
import { useDeleteMember, useMembers } from '../../../../services/member.hooks';
import { useChannels } from '../../../../services/channel.hooks';

export default (): JSX.Element => {
  const [,, currentChannel, role] = useChannels();
  const [members] = useMembers(currentChannel.id);
  const [deleteMember] = useDeleteMember();
  const [member, setMember] = useState<IMember>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isMaster = role === ERole.Master;

  const openInfo = (m: IMember) => {
    setMember(m);
    onOpen();
  };

  const renderMembers = () => members.map((member: IMember) => (
    <Item
      key={member.id}
      isMaster={isMaster}
      member={member}
      deleteMember={() => deleteMember(currentChannel.id, member.id)}
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
      <Header isMaster={isMaster} />

      <List spacing={8} marginY="2rem">
        {members ? renderMembers() : null}
      </List>

      { member ? (
        <Info
          isOpen={isOpen}
          onClose={onClose}
          member={member}
          isMaster={isMaster}
        />
      ) : null}
    </Box>
  );
};
