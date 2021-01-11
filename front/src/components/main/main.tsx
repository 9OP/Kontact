import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import { selectChannel } from '../../store/channel/channel.selectors';

import MainView from './main.view';

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

const Main = (props: Props): JSX.Element => {
  const { channel } = props;
  const channelLoaded = !!channel;

  return (
    <MainView channelLoaded={channelLoaded} />
  );
};

export default connector(Main);
