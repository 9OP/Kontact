/* eslint-disable import/prefer-default-export */
import { RootState } from '../..';
import { IMember, ERole } from '../../../common/models';
import { selectOpenedChannel } from '../channels/channels.selectors';
import { selectUser } from '../../authentication/auth.selectors';

export const selectMembers = (
  state: RootState,
): { member: IMember; role: ERole }[] => {
  const uid = selectUser(state).id;
  const cid = selectOpenedChannel(state).id;
  const membersId = Object.values(state.entities.memberships?.byId || {})
    .filter(({ channelId }) => channelId === cid)
    .map(({ memberId }) => memberId);

  return Object.values(state.entities.members?.byId || {})
    .sort((a) => (a.id === uid ? -1 : 1))
    .filter(({ id }) => membersId.includes(id))
    .map((member: IMember) => ({
      member,
      role: state.entities.memberships?.byId?.[`${cid}.${member.id}`]?.role || ERole.Member,
    }));
};
