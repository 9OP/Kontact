import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { DispThunk, RootState } from '../../../store';
import { channelDataManager } from '../../../services';
import HeaderView from './header.view';

const mapState = (state: RootState) => ({
  channel: channelDataManager.selectChannel(state),
  role: channelDataManager.selectRole(state),
});

const mapDispatch = (dispatch: DispThunk) => ({
  deleteChannel: (cid: string) => dispatch(channelDataManager.deleteChannel(cid)),
});

const connector = connect(
  mapState,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

const Header = (props: Props): JSX.Element => {
  const { channel, role, deleteChannel } = props;

  return (
    <HeaderView
      channel={channel}
      role={role}
      deleteChannel={deleteChannel}
    />
  );
};

export default connector(Header);
