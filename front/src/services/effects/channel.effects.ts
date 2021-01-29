/* eslint-disable import/prefer-default-export */
import { AppThunk } from '../../store';
import { setChannelsAction, fetchChannelsActions } from '../../store/entities/channels/channels.actions';
import * as httpService from './http/channel.http';

export const fetchChannels = (): AppThunk => async (dispatch) => {
  const { request, success, failure } = fetchChannelsActions;

  dispatch(request());
  try {
    const channels = await httpService.fetchChannels();
    dispatch(setChannelsAction(channels));
    dispatch(success());
  } catch (err) {
    dispatch(failure(err.message));
  }
};
