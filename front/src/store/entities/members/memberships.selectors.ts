/* eslint-disable arrow-body-style */
import { RootState } from '../..';
import { IMember } from '../../../common/models';

export const selectMembers = (state: RootState): IMember[] => {
  return Object.values(state.entities.members?.byId || {});
};

export const selectMemberById = (state: RootState, uid: string): IMember => {
  return state.entities.members?.byId?.[uid] || {};
};
