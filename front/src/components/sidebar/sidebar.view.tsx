import React from 'react';
import { Flex } from '@chakra-ui/react';
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
    <Flex
      as="nav"
      flexDirection="column"
      width="17rem"
      height="100vh"
      overflow="auto"
      borderRight="1px solid gray"
    >
      <HeaderView user={user} />
      <MembershipsView memberships={memberships} selectChannel={selectChannel} />
      <FooterView signout={signout} />
    </Flex>
  );
};
