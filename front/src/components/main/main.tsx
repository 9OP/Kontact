import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { DispThunk, RootState } from '../../store';
import { channelDataManager, membersDataManager } from '../../services';

import MainView from './main.view';

const mapState = (state: RootState) => ({
  channel: channelDataManager.selectChannel(state),
});

const mapDispatch = (dispatch: DispThunk) => ({
  fetchMembers: (cid: string) => dispatch(membersDataManager.fetchMembers(cid)),
});

const connector = connect(
  mapState,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

const Main = (props: Props): JSX.Element => {
  // pass channel as props add fetch messages too
  const { channel, fetchMembers } = props;
  const channelLoaded = !!channel;

  useEffect(() => {
    if (channel) {
      fetchMembers(channel.id);
    }
  }, [channel]);

  return (
    <MainView channelLoaded={channelLoaded} />
  );
};

export default connector(Main);
