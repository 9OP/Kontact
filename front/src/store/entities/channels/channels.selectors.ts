/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import { RootState } from '../..';
import { IChannel } from '../../../common/models';

export const selectChannels = (state: RootState): IChannel[] => {
  return Object.values(state.entities.channels);
};
