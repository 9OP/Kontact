/* eslint-disable import/prefer-default-export */
import { beaconEmitter } from '../../../common/network/socket';

// Force Beacon to reload the user from Back
export const reloadBeacon = beaconEmitter('auth:whoami');
