import React from 'react';
import { Flex } from '@chakra-ui/react';
import { IAuth } from '../../common/models';

import HeaderView from './header/header.view';
import Memberships from './memberships/memberships';
import FooterView from './footer/footer.view';

interface Props {
  signout: () => void;
  user: IAuth;
}

export default (props: Props): JSX.Element => {
  const {
    signout,
    user,
  } = props;

  return (
    <Flex
      // as="nav"
      direction="column"
      width="17rem"
      height="100vh"
      overflow="auto"
      // borderRight="1px solid gray"
      bgGradient="linear(to-t, rgba(181, 212, 232, 1), rgba(229, 225, 224, 1))"
    >
      {/* <HeaderView user={user} /> */}
      <Memberships />
      {/* <FooterView signout={signout} /> */}
    </Flex>
  );
};
