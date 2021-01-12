import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState, DispThunk } from '../../../store';
import MembershipsView from './memberships.view';
import { membershipsDataManager, channelDataManager } from '../../../services';

const mapState = (state: RootState) => ({
  memberships: membershipsDataManager.selectMemberships(state),
  channel: channelDataManager.selectChannel(state),
});

const mapDispatch = (dispatch: DispThunk) => ({
  fetchChannel: (cid: string) => dispatch(channelDataManager.fetchChannel(cid)),
});

const connector = connect(
  mapState,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

const Memberships = (props: Props): JSX.Element => {
  const { fetchChannel, channel, memberships } = props;

  return (
    <MembershipsView
      memberships={memberships}
      fetchChannel={fetchChannel}
      channel={channel}
    />
  );
};

export default connector(Memberships);
