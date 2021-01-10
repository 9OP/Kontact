/* eslint-disable import/prefer-default-export */
import { AppThunk } from '../store';
import { setChannelAction, fetchChannelActions } from '../store/channel/channel.actions';
import * as httpService from './http/channel.http';

export const fetch = (cid: string): AppThunk => async (dispatch) => {
  const { request, success, failure } = fetchChannelActions;

  dispatch(request());
  try {
    const memberships = await httpService.fetchChannel(cid);
    dispatch(setChannelAction(memberships));
    dispatch(success());
  } catch (err) {
    // console.log(err);
    dispatch(failure(err.message));
  }
};
