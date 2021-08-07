import { beaconHandler } from '../../common/network/socket';

export const join = beaconHandler('presence:join');
export const leave = beaconHandler('presence:leave');
