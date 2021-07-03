import { beaconEmitter, beaconHandler } from '../../common/network/socket';

// beacon.on('connect_error', (err: any) => {
//   console.log('connect_error', err.message);
// });

// beacon.on('error', (err: any) => {
//   console.log('socket error', err, err?.message);
// });

// beacon.on('message:send:error', (err: any) => {
//   console.log('message:send:error', err?.message);
// });

// beacon.on('connect', () => {
//   console.log('socket connected');
// });

export const receive = beaconHandler('message:receive');
export const send = beaconEmitter('message:send');
