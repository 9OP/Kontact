/* eslint-disable arrow-body-style */
import { RootState } from '../..';
import { IChannel } from '../../../common/models';

export const selectChannels = (state: RootState): IChannel[] => {
  return Object.values(state.entities?.channels?.byId || {});
};

export const selectChannel = (cid: string) => (state: RootState): IChannel => {
  const channel = state.entities.channels?.byId?.[cid];
  return channel;
};

export const selectOpenedChannel = (state: RootState): IChannel => {
  const cid = state.entities.channels?.opened;
  const channel = state.entities.channels?.byId?.[cid];
  return channel;
};
