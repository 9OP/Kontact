/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import { RootState } from '../..';
import {
  IChannel, IMember, ERole, IMessage,
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

export const selectMembers = (state: RootState): {member: IMember, role: ERole}[] => {
  const uid = state.auth.id;
  const cid = state.ui.channel;
  const membersId = Object.values(state.entities.memberships)
    .filter(({ channelId }) => channelId === cid)
    .map(({ memberId }) => memberId);

  return Object.values(state.entities.members)
    .sort((a) => (a.id === uid ? -1 : 1))
    .filter(({ id }) => membersId.includes(id))
    .map((member: IMember) => {
      return {
        member,
        role: state.entities.memberships[`${cid}.${member.id}`]?.role || 0,
      };
    });
};

export const selectRole = (state: RootState): ERole => {
  const cid = state.ui.channel;
  const uid = state.auth.id;
  return state.entities.memberships[`${cid}.${uid}`]?.role || 0;
};
