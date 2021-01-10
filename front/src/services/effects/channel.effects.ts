/* eslint-disable import/prefer-default-export */
import { AppThunk } from '../../store';
import effect from '../../store/api/api.effect';
import { setChannelAction, resetChannelAction, fetchChannelActions } from '../../store/channel/channel.actions';
import * as httpService from './http/channel.http';

export const fetchChannel = (
  cid: string,
): AppThunk => async (dispatch) => {
  const successCb = async () => {
    const channel = await httpService.fetchChannel(cid);
    dispatch(setChannelAction(channel));
  };

  const failureCb = async () => {
    dispatch(resetChannelAction());
  };

  await effect(dispatch, fetchChannelActions, successCb, failureCb);
};
