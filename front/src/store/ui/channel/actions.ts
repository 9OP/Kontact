import { Action } from 'redux';

// Channel ui actions
export const OPEN_CHANNEL = '[UI-CHANNEL] OPEN_CHANNEL';

interface openChannelAction extends Action {
  payload: string;
  type: typeof OPEN_CHANNEL;
}

export type actionTypes = openChannelAction;

export function openChannelAction(cid: string): actionTypes {
  return {
    payload: cid,
    type: OPEN_CHANNEL,
  };
}
