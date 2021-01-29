import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';
import { channelDataManager } from '../../services';

import MainView from './main.view';

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

const Main = (props: Props): JSX.Element => {
  const { channel } = props;
  const channelLoaded = !!channel;

  return (
    <MainView channelLoaded={channelLoaded} />
  );
};

export default connector(Main);
