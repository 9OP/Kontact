import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../../store';
import { selectChannel } from '../../../store/channel/channel.selectors';
import HeaderView from './header.view';

const mapState = (state: RootState) => ({
  channel: selectChannel(state),
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
