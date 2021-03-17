/* eslint-disable import/prefer-default-export */
import { AppThunk } from '../../store';
import {
  setChannelsAction,
  fetchChannelsActions,
  createChannelActions,
} from '../../store/entities/channels/channels.actions';
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

export const createChannel = (name: string): AppThunk => async (dispatch) => {
  const { request, success, failure } = createChannelActions;

  dispatch(request());
  try {
    const channel = await httpService.createChannel(name);
    dispatch(setChannelsAction([channel]));
    dispatch(success());
  } catch (err) {
    dispatch(failure(err.message));
  }
};
