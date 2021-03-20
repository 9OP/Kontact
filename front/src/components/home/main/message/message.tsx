import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState, DispThunk } from '../../../../store';
import { messagesDataManager, channelDataManager } from '../../../../services';
import MessageView from './message.view';

const mapState = (state: RootState) => ({
  channel: channelDataManager.selectOpenedChannel(state),
});

const mapDispatch = (dispatch: DispThunk) => ({
  send: (cid: string, mess: string) => dispatch(messagesDataManager.sendMessage(cid, mess)),
});

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const Message = (props: Props): JSX.Element => {
  const [message, setMessage] = useState('');
  const { channel, send } = props;

  // use callback
  const sendMessage = () => {
    send(channel.id, message);
    setMessage('');
  };

  return (
    <MessageView
      sendMessage={sendMessage}
      message={message}
      setMessage={setMessage}
    />
  );
};

export default connector(Message);
