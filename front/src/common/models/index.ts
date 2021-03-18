import { IAuth, EAccess } from './auth.model';
import { IMember } from './member.model';
import { IMembership, ERole } from './membership.model';
import { IChannel } from './channel.model';
import { IMessage } from './message.model';

// interface NormalizedState<Type> {
//   byId: {
//     [id: string]: Type;
//   };
//   allIds: string[];
// }

interface NormalizedState<Type> {
  [id: string]: Type;
}

export type {
  NormalizedState,
  IAuth,
  IMembership,
  IChannel,
  IMember,
  IMessage,
};

export {
  EAccess,
  ERole,
};
