/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import { RootState } from '../..';
import {
  IChannel, IMember, IMembership, ERole, IMessage,
} from '../../../common/models';

export const selectChannel = (state: RootState): IChannel => {
  const cid = state.ui.channel;
  return state.entities.channels[cid];
};

export const selectMessages = (state: RootState): {data: IMessage, author: IMember}[] => {
  const cid = state.ui.channel;
  const messages = Object.values(state.entities.messages)
    .filter((message: IMessage) => message.channelId === cid);
  return messages.map((message: IMessage) => {
    return {
      data: message,
      author: state.entities.members[message.authorId],
    };
  });
};

export const selectMembers = (state: RootState): IMember[] => {
  const cid = state.ui.channel;
  const memberships = Object.values(state.entities.memberships);
  const members = Object.values(state.entities.members);
  const membersId = memberships.filter((membership: IMembership) => membership.channelId === cid)
    .map((membership: IMembership) => membership.memberId);
  return members.filter((member: IMember) => membersId.includes(member.id));
};

export const selectRole = (state: RootState): ERole => {
  const cid = state.ui.channel;
  const uid = state.auth.id;
  return state.entities.memberships[`${cid}.${uid}`]?.role || 0;
};
