/* eslint-disable import/prefer-default-export */
import { beaconEmitter, beaconHandler } from '../../common/network/socket';

// Force Beacon to reload the user from Back (fetch new memberships)
export const reloadBeacon = beaconEmitter('auth:whoami');
export const userJoin = beaconHandler('user:join');
