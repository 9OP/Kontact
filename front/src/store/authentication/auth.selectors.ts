/* eslint-disable import/prefer-default-export */
import { RootState } from '..';
import { IAuth, ERole } from '../../common/models';

export const selectUser = (state: RootState): IAuth => state.authentication;

export const selectRole = (state: RootState): ERole => {
  const uid = selectUser(state).id;
  return state.entities.members?.byId?.[uid]?.role || ERole.Member;
};
