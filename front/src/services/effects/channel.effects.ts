/* eslint-disable import/prefer-default-export */
import { AppThunk } from '../../store';
import {
  fetchChannelsAction,
  createChannelAction,
  deleteChannelAction,
} from '../../store/entities/channels/channels.actions';
import { IChannel } from '../../common/models';
import { channelsHttpService } from './http';
import * as user from './socket/user.socket';
import { toast, emit, Events } from '../../components/toast';

export const fetchChannels = (): AppThunk => async (dispatch) => {
  try {
    const channels = await channelsHttpService.fetchChannels();
    dispatch(fetchChannelsAction(channels));
  } catch (err) {
    // dispatch(failure(err.message));
  }
};

export const createChannel = (name: string): AppThunk => async (dispatch) => {
  try {
    const channel = await channelsHttpService.createChannel(name);
    await user.reloadBeacon({});
    dispatch(createChannelAction(channel));
  } catch (err) {
    // dispatch(failure(err.message));
  }
};

export const deleteChannel = (cid: string): AppThunk => async (dispatch) => {
  try {
    await channelsHttpService.deleteChannel(cid);
    dispatch(deleteChannelAction(cid));
    emit(toast[Events.CHANNEL_DELETED]({} as IChannel));
  } catch (err) {
    // dispatch(failure(err.message));
  }
};
