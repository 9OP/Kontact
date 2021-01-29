import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../store';
import { channelDataManager } from '../../../services';
import HeaderView from './header.view';

const mapState = (state: RootState) => ({
  channel: channelDataManager.selectChannel(state),
});

const mapDispatch = {};

const connector = connect(
  mapState,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

const Header = (props: Props): JSX.Element => {
  const { channel } = props;

  return (
    <HeaderView
      channel={channel}
    />
  );
};

export default connector(Header);
