import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, DispThunk } from '../../../../store';
import { membersDataManager, channelDataManager } from '../../../../services';
import MembersView from './members.view';

const mapState = (state: RootState) => ({
  channel: channelDataManager.selectOpenedChannel(state),
  members: membersDataManager.selectMembers(state),
});

const mapDispatch = (dispatch: DispThunk) => ({
  fetchMembers: (cid: string) => dispatch(membersDataManager.fetchMembers(cid)),
  deleteMember: (cid: string, uid: string) => dispatch(membersDataManager.deleteMember(cid, uid)),
});

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const Message = (props: Props): JSX.Element => {
  const {
    channel, fetchMembers, deleteMember, members,
  } = props;

  useEffect(() => {
    fetchMembers(channel.id);
  }, []);

  const delMember = (uid: string) => {
    deleteMember(channel.id, uid);
  };

  return <MembersView members={members} deleteMember={delMember} />;
};

export default connector(Message);
