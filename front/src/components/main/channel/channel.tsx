import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { DispThunk, RootState } from '../../../store';
import { channelDataManager } from '../../../services';
import ChannelView from './channel.view';

const mapState = (state: RootState) => ({
  channel: channelDataManager.selectChannel(state),
  messages: channelDataManager.selectMessages(state),
});

const mapDispatch = (dispatch: DispThunk) => ({
  fetchMessages: (cid: string) => dispatch(channelDataManager.fetchMessages(cid)),
});

const connector = connect(
  mapState,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

const Channel = (props: Props): JSX.Element => {
  const {
    messages, channel, fetchMessages,
  } = props;

  useEffect(() => {
    fetchMessages(channel.id);
  }, [channel]);

  return (
    <ChannelView
      messages={messages}
    />
  );
};

export default connector(Channel);
