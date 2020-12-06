import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { DispThunk } from '../../store';
import * as effect from '../../store/authentication/auth.effect';
import HomeView from './home.view';

const mapState = null;

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
  const { signout } = props;

  const handleSignout = () => {
    signout();
  };

  return (
    <HomeView
      signout={handleSignout}
    />
  );
};

export default connector(Home);
