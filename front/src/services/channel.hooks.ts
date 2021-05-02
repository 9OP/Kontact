import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { channelsHttpService } from './effects/http';
import useAction from './useAction';
import { emit, toast } from '../components/toast';
import { ERole, IChannel } from '../common/models';
import {
  createChannelAction, deleteChannelAction, fetchChannelsAction, openChannelAction,
} from '../store/entities/channels/channels.actions';
import { selectChannels, selectOpenedChannel } from '../store/entities/channels/channels.selectors';
import { selectRole } from '../store/authentication/auth.selectors';

export function useChannels(): [
  IChannel[], (cid: string) => void, IChannel, ERole, boolean, Error | null] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const setChannels = useAction(fetchChannelsAction);
  const channels = useSelector(selectChannels);
  const openChannel = useAction(openChannelAction);
  const currentChannel = useSelector(selectOpenedChannel);
  const role = useSelector(selectRole);

  useEffect(() => {
    function fetchChannels() {
      setLoading(true);
      channelsHttpService.fetchChannels()
        .then((channels) => {
          setLoading(false);
          setChannels(channels);
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    }

    if (!channels.length && loading === false) {
      fetchChannels();
    }
  }, []); // [setLoading, channels, setChannels, auth]);

  return [channels, openChannel, currentChannel, role, loading, error];
}

export function useCreateChannel(): [(name: string)=> void, boolean, Error | null] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const setChannel = useAction(createChannelAction);

  const createChannel = useCallback((name: string) => {
    setLoading(true);
    channelsHttpService.createChannel(name).then((channel) => {
      setLoading(false);
      emit(toast.channel_created(channel));
      setChannel(channel);
    }).catch((err: Error) => {
      setLoading(false);
      setError(err);
    });
  }, [setChannel]);

  return [createChannel, loading, error];
}

export function useDeleteChannel(): [(channel: IChannel) => void, boolean, Error | null] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const removeChannel = useAction(deleteChannelAction);

  const deleteChannel = useCallback((channel: IChannel) => {
    setLoading(true);
    channelsHttpService.deleteChannel(channel.id).then(() => {
      setLoading(false);
      emit(toast.channel_deleted(channel));
      removeChannel(channel);
    }).catch((err: Error) => {
      setLoading(false);
      setError(err);
    });
  }, [removeChannel]);

  return [deleteChannel, loading, error];
}
