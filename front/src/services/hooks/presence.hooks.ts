import { store } from '../../store';
import { presenceConnectAction, presenceDisconnectAction } from '../../store/entities/members/members.actions';
import * as presence from '../socket/presence.socket';

presence.connect(async (userId: string) => {
  store.dispatch(presenceConnectAction(userId));
});

presence.disconnect(async (userId: string) => {
  store.dispatch(presenceDisconnectAction(userId));
});
