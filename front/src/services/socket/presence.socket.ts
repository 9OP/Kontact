import { beaconHandler } from '../../common/network/socket';
import { store } from '../../store';
import { selectChannel } from '../../store/entities/channels/channels.selectors';
import {
  fetchMembersAction,
  presenceConnectAction,
  presenceDisconnectAction,
} from '../../store/entities/members/members.actions';
import { selectMembers } from '../../store/entities/members/members.selectors';
// eslint-disable-next-line import/no-cycle
import { channelsHttpService, membersHttpService } from '../http';

export const connect = beaconHandler('presence:connect');
export const disconnect = beaconHandler('presence:disconnect');

connect(async (data) => {
  const { userId } = data;
  const { channelId } = data;

  // if userId not in channelId then refetch channelId memberships
  const state = store.getState();
  const members = selectMembers(channelId)(state);
  const channel = selectChannel(channelId)(state);
  if (!members.map(({ id }) => id).includes(userId)) {
    // bad pattern = duplicate from member.hooks.ts
    let newMembers = await membersHttpService.fetchMembers(channelId);
    const presences = await channelsHttpService.fetchPresence([channelId]);

    newMembers = newMembers.map((member) => (
      { ...member, connected: presences.includes(member.id) }
    ));

    store.dispatch(fetchMembersAction({ members: newMembers, channel }));
  }
  store.dispatch(presenceConnectAction({ uid: userId }));
});

disconnect(async (data) => {
  const { userId } = data;
  store.dispatch(presenceDisconnectAction({ uid: userId }));
});
