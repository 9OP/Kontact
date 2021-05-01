// import React from 'react';
// import { connect, ConnectedProps } from 'react-redux';
// import { DispThunk, RootState } from '../../../../store';
// import { messagesDataManager } from '../../../../services';
// import ChannelView from './channel.view';

// const mapState = (state: RootState) => ({
//   // channel: channelDataManager.selectOpenedChannel(state),
//   messages: messagesDataManager.selectMessages(state),
// });

// const mapDispatch = (dispatch: DispThunk) => ({
//   // fetchMessages: (cid: string) => dispatch(messagesDataManager.fetchMessages(cid)),
// });

// const connector = connect(mapState, mapDispatch);

// type PropsFromRedux = ConnectedProps<typeof connector>;

// type Props = PropsFromRedux;

// const Channel = (props: Props): JSX.Element => {
//   const { messages } = props;

//   // useEffect(() => {
//   //   fetchMessages(channel.id);
//   // }, [channel]);

//   return <ChannelView messages={messages} />;
// };

// export default connector(Channel);
export default {};
