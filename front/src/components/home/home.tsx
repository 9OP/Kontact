import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Flex, Box } from '@chakra-ui/react';
import { beacon } from '../../common/network/socket';

import { DispThunk, RootState } from '../../store';
import * as effect from '../../store/authentication/auth.effects';
import { selectUser } from '../../store/authentication/auth.selectors';
import Main from '../main/main';
import SideBar from '../sidebar';

const mapState = (state: RootState) => ({
  user: selectUser(state),
});

const mapDispatch = (dispatch: DispThunk) => ({
  signout: () => dispatch(effect.signout()),
});

const connector = connect(
  mapState,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

const Home = (props: Props): JSX.Element => {
  const { signout, user } = props;
  const [message, setMessage] = React.useState('');

  const sendMessage = () => {
    const channel = 'channel-test';
    beacon.socket.emit('message:send', { message, channel });
  };

  return (
    <Box>
      <SideBar />
      <Main />
    </Box>
  );
};

export default connector(Home);
