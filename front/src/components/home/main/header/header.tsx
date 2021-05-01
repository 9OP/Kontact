// import React from 'react';
// import { connect, ConnectedProps } from 'react-redux';
// import { DispThunk, RootState } from '../../../../store';
// import { channelDataManager, authDataManager } from '../../../../services';
// import HeaderView from './header.view';
// import { IChannel } from '../../../../common/models';

// const mapState = (state: RootState) => ({
//   channel: channelDataManager.selectOpenedChannel(state),
//   role: authDataManager.selectRole(state),
// });

// const mapDispatch = (dispatch: DispThunk) => ({
//   deleteChannel: (channel: IChannel) => dispatch(channelDataManager.deleteChannel(channel)),
// });

// const connector = connect(mapState, mapDispatch);

// type PropsFromRedux = ConnectedProps<typeof connector>;

// type Props = PropsFromRedux;

// const Header = (props: Props): JSX.Element => {
//   const { channel, role, deleteChannel } = props;

//   return (
//     <HeaderView
//       channel={channel}
//       role={role}
//       deleteChannel={() => deleteChannel(channel)}
//     />
//   );
// };

// export default connector(Header);
export default {};
