import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, DispThunk } from '../../../../store';
import {
  membersDataManager,
  channelDataManager,
  authDataManager,
} from '../../../../services';
import MembersView from './members.view';
import { ERole, IMember } from '../../../../common/models';

const mapState = (state: RootState) => ({
  channel: channelDataManager.selectOpenedChannel(state),
  members: membersDataManager.selectMembers(state),
  role: authDataManager.selectRole(state),
});

const mapDispatch = (dispatch: DispThunk) => ({
  fetchMembers: (cid: string) => dispatch(membersDataManager.fetchMembers(cid)),
  deleteMember: (cid: string, uid: string) => {
    dispatch(membersDataManager.deleteMember(cid, uid));
  },
  updateMember: (cid: string, uid: string, role: ERole) => {
    dispatch(membersDataManager.updateMember(cid, uid, role));
  },
});

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const Message = (props: Props): JSX.Element => {
  const {
    channel, fetchMembers, role, deleteMember, members,
  } = props;

  const isMaster = role === ERole.Master;

  useEffect(() => {
    fetchMembers(channel.id);
  }, []);

  return (
    <MembersView
      isMaster={isMaster}
      members={members}
      deleteMember={(member: IMember) => deleteMember(channel.id, member.id)}
    />
  );
};

export default connector(Message);
