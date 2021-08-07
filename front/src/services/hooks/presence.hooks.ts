import * as presence from '../socket/presence.socket';

presence.join(async (userId: string) => {
  // dispatch member join
});

presence.leave(async (userId: string) => {
  // dispatch member leave
});
