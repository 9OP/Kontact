import React from 'react';
import { Flex } from '@chakra-ui/react';
import { IUser } from '../../common/models/user.model';

import HeaderView from './header/header.view';
import Memberships from './memberships/memberships';
import FooterView from './footer/footer.view';

interface Props {
  signout: () => void;
  user: IUser;
}

export default (props: Props): JSX.Element => {
  const {
    signout,
    user,
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
      <Memberships />
      <FooterView signout={signout} />
    </Flex>
  );
};
