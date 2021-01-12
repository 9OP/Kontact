import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { DispThunk, RootState } from '../../store';
import { authDataManager, membershipsDataManager, channelDataManager } from '../../services';
import SidebarView from './sidebar.view';

const mapState = (state: RootState) => ({
  user: authDataManager.selectUser(state),
  memberships: membershipsDataManager.selectMemberships(state),
});

const mapDispatch = (dispatch: DispThunk) => ({
  signout: () => dispatch(authDataManager.signout()),
  fetchMemberships: () => dispatch(membershipsDataManager.fetchMemberships()),
  fetchChannel: (cid: string) => dispatch(channelDataManager.fetchChannel(cid)),
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
  } = props;

  useEffect(() => {
    fetchMemberships();
  }, []);

  return (
    <SidebarView
      user={user}
      signout={signout}
    />
  );
};

export default connector(Sidebar);
