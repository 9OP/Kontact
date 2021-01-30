import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, DispThunk } from '../../../store';
import { membersDataManager, channelDataManager } from '../../../services';
import MembersView from './members.view';

const mapState = (state: RootState) => ({
  channel: channelDataManager.selectChannel(state),
  members: membersDataManager.selectMembers(state),
});

const mapDispatch = (dispatch: DispThunk) => ({
  fetchMembers: (cid: string) => dispatch(membersDataManager.fetchMembers(cid)),
});

const connector = connect(
  mapState,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

const Message = (props: Props): JSX.Element => {
  const { channel, fetchMembers, members } = props;

  useEffect(() => {
    fetchMembers(channel.id);
  }, []);

  return (
    <MembersView
      members={members}
    />
  );
};

export default connector(Message);
