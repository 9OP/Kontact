import { useState, useEffect, useCallback } from 'react';

import {
  createMemberAction,
  deleteMemberAction,
  fetchMembersAction,
  updateMemberAction,
} from '../../store/entities/members/memberships.actions';
import { selectMembers } from '../../store/entities/members/memberships.selectors';
import { membersHttpService } from '../http';
import { useAction, useAppSelector } from './hooks';

import { emit, toast } from '../../components/toast';
import { ERole, IMember, IMemberPreview } from '../../common/models';
import { selectOpenedChannel } from '../../store/entities/channels/channels.selectors';

export const useMembers = (): {members: IMember[], byId: (uid: string) => IMember | null} => {
  const members = useAppSelector(selectMembers);
  // const byId = (uid: string) => useSelector((state: RootState) => selectMemberById(state, uid));
  const byId = (uid: string) => members.find(({ id }) => id === uid) || null;
  return { members, byId };
};

export const useFetchMembers = (): [() => void, boolean, Error | null] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const setMembers = useAction(fetchMembersAction);
  const channel = useAppSelector(selectOpenedChannel);

  const fetchMembers = useCallback(() => {
    setLoading(true);
    membersHttpService.fetchMembers(channel.id)
      .then((members: IMember[]) => {
        setMembers(members);
      }).catch((err: Error) => {
        setError(err);
      }).finally(() => {
        setLoading(false);
      });
  }, [setMembers, channel]);

  return [fetchMembers, loading, error];
};

export const useCreateMember = (): [(uid: string) => void, boolean, Error | null] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const setMember = useAction(createMemberAction);
  const channel = useAppSelector(selectOpenedChannel);

  const createMember = useCallback((uid: string) => {
    setLoading(true);
    membersHttpService.createMember(channel.id, uid)
      .then((member: IMember) => {
        emit(toast.member_created(member));
        setMember(member);
      }).catch((err: Error) => {
        setError(err);
      }).finally(() => {
        setLoading(false);
      });
  }, [setMember, channel]);

  return [createMember, loading, error];
};

export const useDeleteMember = (): [(uid: string) => void, boolean, Error | null] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const removeMember = useAction(deleteMemberAction);
  const channel = useAppSelector(selectOpenedChannel);
  const members = useAppSelector(selectMembers);

  const deleteMember = useCallback((uid: string) => {
    setLoading(true);
    const member = members.find(({ id }) => uid === id) || {} as IMember;
    membersHttpService.deleteMember(channel.id, uid)
      .then(() => {
        emit(toast.member_deleted(member));
        removeMember(uid);
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
        setMember(member);
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
  }, [search]);

  return [search, setSearch, previewMembers, loading, error];
};
