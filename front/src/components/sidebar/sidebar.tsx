import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { DispThunk, RootState } from '../../store';
import * as effect from '../../store/authentication/auth.effects';
import { selectUser } from '../../store/authentication/auth.selectors';
import SidebarView from './sidebar.view';

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

const Sidebar = (props: Props): JSX.Element => {
  const { user, signout } = props;

  return (
    <SidebarView
      user={user}
      signout={signout}
    />
  );
};

export default connector(Sidebar);
