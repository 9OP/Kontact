import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { DispThunk, RootState } from '../../store';
import { authDataManager, channelDataManager } from '../../services';
import SidebarView from './sidebar.view';

const mapState = (state: RootState) => ({
  user: authDataManager.selectUser(state),
  // channels: channelDataManager.selectChannels(state),
});

const mapDispatch = (dispatch: DispThunk) => ({
  signout: () => dispatch(authDataManager.signout()),
  fetchChannels: () => dispatch(channelDataManager.fetchChannels()),
});

const connector = connect(
  mapState,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

const Sidebar = (props: Props): JSX.Element => {
  const { fetchChannels } = props;

  useEffect(() => {
    fetchChannels();
  }, []);

  return (
    <SidebarView />
  );
};

export default connector(Sidebar);
