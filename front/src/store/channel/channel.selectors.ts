/* eslint-disable import/prefer-default-export */
import { RootState } from '..';
import { IChannel } from '../../common/models/channel.model';

export const selectChannel = (state: RootState): IChannel => state.channel.info;
