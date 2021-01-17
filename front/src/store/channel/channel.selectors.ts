/* eslint-disable import/prefer-default-export */
import { RootState } from '..';
import { IChannel, IMember } from '../../common/models/channel.model';

export const selectChannel = (state: RootState): IChannel => state.channel.info;

export const selectMember = (state: RootState, memberId: string): IMember | undefined => {
  const { members } = state.channel.info;
  return members.find((member: IMember) => member.id === memberId);
};
