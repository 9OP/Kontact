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
  fetchChannel: async (cid: string) => dispatch(channelDataManager.fetchChannel(cid)),
  fetchMessages: async (cid: string) => dispatch(channelDataManager.fetchMessages(cid)),
});

const connector = connect(
  mapState,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

const Memberships = (props: Props): JSX.Element => {
  const {
    fetchChannel, fetchMessages, channel, memberships,
  } = props;

  const fetch = async (cid: string) => {
    // if (cid !== channel?.id || channel === null) {
    //   fetch(cid);
    // }
    await fetchChannel(cid);
    await fetchMessages(cid);
  };

  return (
    <MembershipsView
      memberships={memberships}
      fetchChannel={fetch}
      channel={channel}
    />
  );
};

export default connector(Memberships);
