/* eslint-disable arrow-body-style */
import { RootState } from '../..';
import { IMember } from '../../../common/models';

export const selectMembers = (cid: string) => (state: RootState): IMember[] => {
  const membersId = state.entities.memberships?.[cid] || [];
  return membersId.map((id) => state.entities.members?.byId[id]);
};

export const selectMemberById = (state: RootState, uid: string): IMember => {
  return state.entities.members?.byId?.[uid] || {};
};
