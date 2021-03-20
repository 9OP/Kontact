/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import { RootState } from '../..';
import { IMember } from '../../../common/models';

export const selectMembers = (state: RootState): IMember[] => {
  return Object.values(state.entities.members?.byId || {});
};
