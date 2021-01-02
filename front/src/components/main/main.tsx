import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { DispThunk, RootState } from '../../store';
import { selectChannel } from '../../store/channel/channel.selectors';
import MainView from './main.view';

const mapState = (state: RootState) => ({
  channel: selectChannel(state),
});

// const mapDispatch = (dispatch: DispThunk) => ({
//   signout: () => dispatch(auth.signout()),
//   fetchMemberships: () => dispatch(mberships.fetch()),
//   fetchChannel: (cid: string) => dispatch(channel.fetch(cid)),
// });

const mapDispatch = null;

const connector = connect(
  mapState,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

const Main = (props: Props): JSX.Element => {
  const { channel } = props;

  return (
    <MainView channel={channel} />
  );
};

export default connector(Main);
