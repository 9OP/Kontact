/* eslint-disable import/prefer-default-export */
import { RootState } from '..';
import { IAuth, ERole } from '../../common/models';
import { selectOpenedChannel } from '../entities/channels/channels.selectors';

export const selectUser = (state: RootState): IAuth => state.authentication;

export const selectRole = (state: RootState): ERole => {
  const cid = selectOpenedChannel(state).id;
  const uid = selectUser(state).id;
  return state.entities.memberships?.byId?.[`${cid}.${uid}`]?.role || ERole.Member;
};
