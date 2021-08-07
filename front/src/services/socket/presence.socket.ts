import { beaconHandler } from '../../common/network/socket';
import { store } from '../../store';
import { presenceConnectAction, presenceDisconnectAction } from '../../store/entities/members/members.actions';

export const connect = beaconHandler('presence:connect');
export const disconnect = beaconHandler('presence:disconnect');

// move to presence.hooks.ts
connect(async (userId: string) => {
  store.dispatch(presenceConnectAction(userId));
});

disconnect(async (userId: string) => {
  store.dispatch(presenceDisconnectAction(userId));
});
