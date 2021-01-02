import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { DispThunk, RootState } from '../../store';
import * as auth from '../../store/authentication/auth.effects';
import * as mberships from '../../store/memberships/memberships.effect';
import * as channel from '../../store/channel/channel.effects';
import { selectUser } from '../../store/authentication/auth.selectors';
import { selectMemberships } from '../../store/memberships/memberships.selectors';
import SidebarView from './sidebar.view';

const mapState = (state: RootState) => ({
  user: selectUser(state),
  memberships: selectMemberships(state),
});

const mapDispatch = (dispatch: DispThunk) => ({
  signout: () => dispatch(auth.signout()),
  fetchMemberships: () => dispatch(mberships.fetch()),
  fetchChannel: (cid: string) => dispatch(channel.fetch(cid)),
});

const connector = connect(
  mapState,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

const Sidebar = (props: Props): JSX.Element => {
  const {
    user,
    signout,
    fetchMemberships,
    memberships,
    fetchChannel,
  } = props;

  useEffect(() => {
    fetchMemberships();
  }, []);

  return (
    <SidebarView
      user={user}
      signout={signout}
      memberships={memberships}
      selectChannel={fetchChannel}
    />
  );
};

export default connector(Sidebar);
