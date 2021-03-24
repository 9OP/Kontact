import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, DispThunk } from '../../../../../store';
import { channelDataManager } from '../../../../../services';
import MembershipsView from './memberships.view';

const mapState = (state: RootState) => ({
  channels: channelDataManager.selectChannels(state),
  openedChannel: channelDataManager.selectOpenedChannel(state),
});

const mapDispatch = (dispatch: DispThunk) => ({
  openChannel: (cid: string) => dispatch(channelDataManager.openChannel(cid)),
});

const connector = connect(
  mapState,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

const Memberships = (props: Props): JSX.Element => {
  const { channels, openChannel, openedChannel } = props;

  return (
    <MembershipsView
      channels={channels}
      openedChannel={openedChannel}
      openChannel={openChannel}
    />
  );
};

export default connector(Memberships);
