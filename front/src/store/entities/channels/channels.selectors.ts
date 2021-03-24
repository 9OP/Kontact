/* eslint-disable arrow-body-style */
import { RootState } from '../..';
import { IChannel } from '../../../common/models';

export const selectChannels = (state: RootState): IChannel[] => {
  return Object.values(state.entities?.channels?.byId || {});
};

export const selectOpenedChannel = (state: RootState): IChannel => {
  const cid = state.entities.channels?.opened;
  return state.entities.channels?.byId?.[cid];
};
