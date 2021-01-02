import React from 'react';
import { Box, Divider } from '@chakra-ui/react';
import { IUser } from '../../common/models/user.model';
import { IMembership } from '../../common/models/membership.model';

import HeaderView from './header/header.view';
import MembershipsView from './memberships/memberships.view';
import FooterView from './footer/footer.view';

interface Props {
  signout: () => void;
  user: IUser;
  memberships: IMembership[],
  selectChannel: (cid: string) => void,
}

export default (props: Props): JSX.Element => {
  const {
    signout,
    user,
    memberships,
    selectChannel,
  } = props;

  return (
    <Box
      as="nav"
      width="17rem"
      height="100vh"
      position="fixed"
      overflow="auto"
      boxShadow="xl"
    >
      <HeaderView user={user} />
      <Divider />
      <MembershipsView memberships={memberships} selectChannel={selectChannel} />

      <FooterView signout={signout} />
    </Box>
  );
};
