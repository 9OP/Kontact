import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, DispThunk } from '../../../../../store';
import {
  membersDataManager,
  channelDataManager,
  authDataManager,
} from '../../../../../services';
import { ERole } from '../../../../../common/models';
import InfoView from './info.view';

const mapState = (state: RootState, ownProps: {memberId: string}) => ({
  channel: channelDataManager.selectOpenedChannel(state),
  member: membersDataManager.selectMemberById(state, ownProps.memberId),
  role: authDataManager.selectRole(state),
});

const mapDispatch = (dispatch: DispThunk) => ({
  updateMember: (cid: string, uid: string, role: ERole) => {
    dispatch(membersDataManager.updateMember(cid, uid, role));
  },
});

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  isOpen: boolean;
  onClose: () => void;
};

const Message = (props: Props): JSX.Element => {
  const {
    channel, member, updateMember, role, isOpen, onClose,
  } = props;

  const isMaster = role === ERole.Master;

  return (
    <InfoView
      isOpen={isOpen}
      onClose={onClose}
      isMaster={isMaster}
      member={member}
      update={(role: ERole) => updateMember(channel.id, member.id, role)}
    />
  );
};

export default connector(Message);
