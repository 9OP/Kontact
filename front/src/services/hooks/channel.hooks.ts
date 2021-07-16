import { useState, useCallback } from 'react';

import { ActionCreator } from 'redux';
import {
  createChannelAction,
  deleteChannelAction,
  fetchChannelsAction,
  openChannelAction,
} from '../../store/entities/channels/channels.actions';
import { selectChannels, selectOpenedChannel } from '../../store/entities/channels/channels.selectors';
import { selectRole } from '../../store/authentication/auth.selectors';
import { channelsHttpService } from '../http';
import { useAction, useAppSelector } from './hooks';

import { emit, toast } from '../../components/toast';
import { ERole, IChannel } from '../../common/models';
import { channelsActionTypes } from '../../store/entities/channels/channels.action-types';

export const useChannels = (): {
  channel: IChannel, channels: IChannel[],
  role: ERole, open: ActionCreator<channelsActionTypes>} => {
  const channels = useAppSelector(selectChannels);
  const channel = useAppSelector(selectOpenedChannel);
  const role = useAppSelector(selectRole);
  const open = useAction(openChannelAction);

  return {
    channel, role, channels, open,
  };
};

export const useFetchChannels = (): [() => void, boolean, Error | null] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const setChannels = useAction(fetchChannelsAction);

  const fetchChannels = useCallback(() => {
    setLoading(true);
    channelsHttpService.fetchChannels()
      .then((channels: IChannel[]) => {
        setChannels(channels);
      }).catch((err: Error) => {
        setError(err);
      }).finally(() => {
        setLoading(false);
      });
  }, [setChannels]);

  return [fetchChannels, loading, error];
};

export const useCreateChannel = (): [(name: string)=> void, boolean, Error | null] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const setChannel = useAction(createChannelAction);

  const createChannel = useCallback((name: string) => {
    setLoading(true);
    channelsHttpService.createChannel(name)
      .then((channel: IChannel) => {
        emit(toast.channel_created(channel));
        setChannel(channel);
      }).catch((err: Error) => {
        setError(err);
      }).finally(() => {
        setLoading(false);
      });
  }, [setChannel]);

  return [createChannel, loading, error];
};

export const useDeleteChannel = (): [() => void, boolean, Error | null] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const removeChannel = useAction(deleteChannelAction);
  const channel = useAppSelector(selectOpenedChannel);

  const deleteChannel = useCallback(() => {
    setLoading(true);
    channelsHttpService.deleteChannel(channel.id)
      .then(() => {
        emit(toast.channel_deleted(channel));
        removeChannel(channel.id);
      }).catch((err: Error) => {
        setError(err);
      }).finally(() => {
        setLoading(false);
      });
  }, [removeChannel, channel]);

  return [deleteChannel, loading, error];
};
