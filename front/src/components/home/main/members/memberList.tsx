import React, { useState, useEffect } from 'react';
import {
  Box,
  useDisclosure,
  List,
} from '@chakra-ui/react';
import { ERole, IMember } from '../../../../common/models';
import Header from './header/header';
import Item from './memberItem';
import Info from './infoDrawer';
import { useDeleteMember, useFetchMembers, useMembers } from '../../../../services/hooks/member.hooks';
import { useChannels } from '../../../../services/hooks/channel.hooks';

export default (): JSX.Element => {
  const { channel, role } = useChannels();
  const { members, byId } = useMembers(channel.id);
  const [deleteMember] = useDeleteMember();
  const [fetchMembers] = useFetchMembers();
  const [memberId, setMemberId] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // refetch members when opened channel changes
    fetchMembers();
  }, [channel]);

  const isMaster = role === ERole.Master;

  const openInfo = (uid: string) => {
    setMemberId(uid);
    onOpen();
  };

  const renderMembers = () => members.map((member: IMember) => (
    <Item
      key={member.id}
      isMaster={isMaster}
      member={member}
      deleteMember={() => deleteMember(member.id)}
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
        { (members && members?.length) ? renderMembers() : null}
      </List>

      { memberId && byId(memberId) ? (
        <Info
          isOpen={isOpen}
          onClose={onClose}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          member={byId(memberId)!}
          isMaster={isMaster}
        />
      ) : null}
    </Box>
  );
};
