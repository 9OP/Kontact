import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../../store';
import { selectChannel } from '../../../store/channel/channel.selectors';
import { sendMessage } from '../../../services/effects/messages.effects';
import MessageView from './message.view';

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

const Message = (props: Props): JSX.Element => {
  const [message, setMessage] = useState('');
  const { channel } = props;

  // use callback
  const send = () => {
    sendMessage(channel.id, message);
    setMessage('');
  };

  return (
    <MessageView
      send={send}
      message={message}
      setMessage={setMessage}
    />
  );
};

export default connector(Message);
