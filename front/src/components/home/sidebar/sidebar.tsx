// import React, { useEffect } from 'react';
// import { connect, ConnectedProps } from 'react-redux';

// import { DispThunk } from '../../../store';
// import { channelDataManager } from '../../../services';
// import SidebarView from './sidebar.view';

// const mapState = null;

// const mapDispatch = (dispatch: DispThunk) => ({
//   fetchChannels: () => dispatch(channelDataManager.fetchChannels()),
// });

// const connector = connect(
//   mapState,
//   mapDispatch,
// );

// type PropsFromRedux = ConnectedProps<typeof connector>

// type Props = PropsFromRedux

// const Sidebar = (props: Props): JSX.Element => {
//   const { fetchChannels } = props;

//   useEffect(() => {
//     fetchChannels();
//   }, []);

//   return (
//     <SidebarView />
//   );
// };

// export default connector(Sidebar);
export default {};
