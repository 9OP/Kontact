import { beaconHandler } from '../../common/network/socket';
import { store } from '../../store';
import { selectChannel } from '../../store/entities/channels/channels.selectors';
import { presenceConnectAction, presenceDisconnectAction } from '../../store/entities/members/members.actions';
import { useAppSelector } from '../hooks/hooks';

export const connect = beaconHandler('presence:connect');
export const disconnect = beaconHandler('presence:disconnect');

// move to presence.hooks.ts
connect(async (data) => {
  const { userId } = data;
  const { channelId } = data;
  console.log('presence: ', userId, channelId);
  // if userId not in channelId then refetch channelId memberships

  const state = store.getState();
  const channel = useAppSelector(selectChannel(channelId));

  store.dispatch(presenceConnectAction(userId));
});

disconnect(async (data) => {
  const { userId } = data;
  store.dispatch(presenceDisconnectAction(userId));
});
