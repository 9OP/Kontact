import { beaconHandler } from '../../common/network/socket';

export const connect = beaconHandler('presence:connect');
export const disconnect = beaconHandler('presence:disconnect');
