/* eslint-disable max-len */
import { useState, useEffect, useCallback } from 'react';
import { store } from '../../store';
import {
  createMemberAction,
  deleteMemberAction,
  fetchMembersAction,
  updateMemberAction,
  presenceConnectAction,
  presenceDisconnectAction,
} from '../../store/entities/members/members.actions';
import { selectMembers } from '../../store/entities/members/members.selectors';
import { selectOpenedChannel, selectChannel } from '../../store/entities/channels/channels.selectors';
import { channelsHttpService, membersHttpService } from '../http';
import { useAction, useAppSelector } from './hooks';
import { emit, toast } from '../../components/toast';
import {
  ERole, IChannel, IMember, IMemberPreview,
} from '../../common/models';
import * as presence from '../socket/presence.socket';
import { confirmJoin } from '../http/channel.http';

async function fetchMembersAndPresence(channel: IChannel): Promise<IMember[]> {
  const members = await membersHttpService.fetchMembers(channel.id);
  const presences = await channelsHttpService.fetchPresence([channel.id]);

  return members.map((member) => (
    { ...member, connected: presences.includes(member.id) }
  ));
}

presence.connect(async (data) => {
  const { userId } = data;
  const { channelId } = data;

  // if userId not in channelId then refetch channelId memberships
  const state = store.getState();
  const members = selectMembers(channelId)(state);
  const channel = selectChannel(channelId)(state);
  if (!members.map(({ id }) => id).includes(userId)) {
    const newMembers = await fetchMembersAndPresence(channel);
    store.dispatch(fetchMembersAction({ members: newMembers, channel }));
  }
  store.dispatch(presenceConnectAction({ uid: userId }));
});

presence.disconnect(async (data) => {
  const { userId } = data;
  store.dispatch(presenceDisconnectAction({ uid: userId }));
});

export const useMembers = (cid: string): {
  members: IMember[], byId: (uid: string) => IMember | null} => {
  const members = useAppSelector(selectMembers(cid));

  const byId = useCallback(
    (uid: string) => members.find(({ id }) => id === uid) || null,
    [members],
  );
  return { members, byId };
};

export const useFetchMembers = (): [() => void, boolean, Error | null] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const setMembers = useAction(fetchMembersAction);
  const channel = useAppSelector(selectOpenedChannel);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const members = await fetchMembersAndPresence(channel);
      setMembers({ members, channel });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [setMembers, channel]);

  return [fetchMembers, loading, error];
};

export const useCreateMember = (): [(uid: string, puek: string) => void, boolean, Error | null] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const setMember = useAction(createMemberAction);
  const channel = useAppSelector(selectOpenedChannel);

  const createMember = useCallback(async (uid: string, puek: string) => {
    setLoading(true);
    try {
      const member = await membersHttpService.createMember(channel.id, uid, channel.material.scek, puek);
      const presences = await channelsHttpService.fetchPresence([channel.id]);
      if (presences.includes(member.id)) { member.connected = true; }
      setMember({ member, channel });
      // trigger member reload via beacon
      await confirmJoin(channel.id, member.id);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [setMember, channel]);

  return [createMember, loading, error];
};

export const useDeleteMember = (): [(uid: string) => void, boolean, Error | null] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const removeMember = useAction(deleteMemberAction);
  const channel = useAppSelector(selectOpenedChannel);
  const members = useAppSelector(selectMembers(channel.id));

  const deleteMember = useCallback((uid: string) => {
    setLoading(true);
    const member = members.find(({ id }) => uid === id) || {} as IMember;
    membersHttpService.deleteMember(channel.id, uid)
      .then(() => {
        emit(toast.member_deleted(member));
        removeMember({ uid, cid: channel.id });
      }).catch((err: Error) => {
        setError(err);
      }).finally(() => {
        setLoading(false);
      });
  }, [removeMember, channel, members]);

  return [deleteMember, loading, error];
};

export const useUpdateMember = (): [(uid: string, role: ERole) => void, boolean, Error | null] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const setMember = useAction(updateMemberAction);
  const channel = useAppSelector(selectOpenedChannel);

  const updateMember = useCallback((uid: string, role: ERole) => {
    setLoading(true);
    membersHttpService.updateMember(channel.id, uid, role)
      .then((member: IMember) => {
        setMember({ member });
      }).catch((err: Error) => {
        setError(err);
      }).finally(() => {
        setLoading(false);
      });
  }, [setMember, channel]);

  return [updateMember, loading, error];
};

export const useSearchUser = (): [
  string, (name: string) => void, IMemberPreview[], boolean, Error | null] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [search, setSearch] = useState('');
  const [previewMembers, setPreviewMembers] = useState<IMemberPreview[]>([]);

  useEffect(() => {
    async function searchUsers() {
      if (search.length >= 2) {
        setLoading(true);
        try {
          setLoading(false);
          const data = await membersHttpService.searchUser(search);
          setPreviewMembers(data);
        } catch (err) {
          setLoading(false);
          setError(err);
        }
      }
    }

    searchUsers();
  }, [search, setPreviewMembers]);

  return [search, setSearch, previewMembers, loading, error];
};
