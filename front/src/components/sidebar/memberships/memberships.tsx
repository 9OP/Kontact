/* eslint-disable arrow-body-style */
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, DispThunk } from '../../../store';
import { channelDataManager } from '../../../services';
import MembershipsView from './memberships.view';

const mapState = (state: RootState) => ({
  channels: channelDataManager.selectChannels(state),
});

const mapDispatch = (dispatch: DispThunk) => ({
  // fetchChannels: async (cid: string) => dispatch(channelDataManager.fetchChannels()),
  // fetchMessages: async (cid: string) => dispatch(channelDataManager.fetchMessages(cid)),
  // fetchMembers
  openChannel: (cid: string) => dispatch(channelDataManager.openChannel(cid)),
});

const connector = connect(
  mapState,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

const Memberships = (props: Props): JSX.Element => {
  const { channels, openChannel } = props;

  // const fetch = async (cid: string) => {
  //   // if (cid !== channel?.id || channel === null) {
  //   //   fetch(cid);
  //   // }
  //   await fetchChannel(cid);
  //   await fetchMessages(cid);
  // };

  return (
    <MembershipsView
      channels={channels}
      openChannel={openChannel}
    />
  );
};

export default connector(Memberships);
