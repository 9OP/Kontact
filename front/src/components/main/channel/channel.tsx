import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../../store';
import { channelDataManager } from '../../../services';
import ChannelView from './channel.view';

const mapState = (state: RootState) => ({
  messages: channelDataManager.selectMessages(state),
});

const mapDispatch = {};

const connector = connect(
  mapState,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

const Channel = (props: Props): JSX.Element => {
  const { messages } = props;

  return (
    <ChannelView
      messages={messages}
    />
  );
};

export default connector(Channel);
