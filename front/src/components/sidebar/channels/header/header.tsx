import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { DispThunk } from '../../../../store';
import { channelDataManager } from '../../../../services';
import HeaderView from './header.view';

const mapState = null;

const mapDispatch = (dispatch: DispThunk) => ({
  createChannel: (name: string) => dispatch(channelDataManager.createChannel(name)),
});

const connector = connect(
  mapState,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

const Header = (props: Props): JSX.Element => {
  const { createChannel } = props;

  return (
    <HeaderView
      createChannel={createChannel}
    />
  );
};

export default connector(Header);
