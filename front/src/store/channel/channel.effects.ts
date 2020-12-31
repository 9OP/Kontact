/* eslint-disable import/prefer-default-export */
import { AppThunk } from '..';
import { setChannelAction } from './channel.actions';
import * as httpService from './channel.http';

export const fetch = (cid: string): AppThunk => async (dispatch) => {
  try {
    const memberships = await httpService.fetchChannel(cid);
    dispatch(setChannelAction(memberships));
  } catch (err) {
    // console.log(err);
  }
};
