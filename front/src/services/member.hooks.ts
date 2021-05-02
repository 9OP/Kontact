/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { membersHttpService } from './effects/http';
import useAction from './useAction';
import {
  createMemberAction, deleteMemberAction, fetchMembersAction, updateMemberAction,
} from '../store/entities/members/memberships.actions';
import { selectMemberById, selectMembers } from '../store/entities/members/memberships.selectors';
import { emit, toast } from '../components/toast';
import { ERole, IMember, IMemberPreview } from '../common/models';

export function useMembers(cid: string): [IMember[], boolean, Error | null] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const setMembers = useAction(fetchMembersAction);
  const members = useSelector(selectMembers);

  useEffect(() => {
    function fetchChannels() {
      setLoading(true);
      membersHttpService.fetchMembers(cid)
        .then((members) => {
          setLoading(false);
          setMembers(members);
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    }

    if (!members) {
      fetchChannels();
    }
  }, [setLoading, members, setMembers]);

  return [members, loading, error];
}

export function useCreateMember(): [(cid: string, uid: string) => void, boolean, Error | null] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const setMember = useAction(createMemberAction);

  const createMember = useCallback((cid: string, uid: string) => {
    setLoading(true);
    membersHttpService.createMember(cid, uid).then((member) => {
      setLoading(false);
      emit(toast.member_created(member));
      setMember(member);
    }).catch((err: Error) => {
      setLoading(false);
      setError(err);
    });
  }, [setMember]);

  return [createMember, loading, error];
}

export function useDeleteMember(): [(cid: string, uid: string) => void, boolean, Error | null] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const delMember = useAction(deleteMemberAction);
  const selectMember = useSelector(selectMemberById);

  const deleteMember = useCallback((cid: string, uid: string) => {
    setLoading(true);
    membersHttpService.deleteMember(cid, uid).then(() => {
      const member = selectMember(uid);
      setLoading(false);
      emit(toast.member_deleted(member));
      delMember(member);
    }).catch((err: Error) => {
      setLoading(false);
      setError(err);
    });
  }, [delMember]);

  return [deleteMember, loading, error];
}

export function useUpdateMember(): [
  (cid: string, uid: string, role: ERole) => void, boolean, Error | null] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const updMember = useAction(updateMemberAction);

  const updateMember = useCallback((cid: string, uid: string, role: ERole) => {
    setLoading(true);
    membersHttpService.updateMember(cid, uid, role).then((member) => {
      setLoading(false);
      emit(toast.member_deleted(member));
      updMember(member);
    }).catch((err: Error) => {
      setLoading(false);
      setError(err);
    });
  }, [updMember]);

  return [updateMember, loading, error];
}

export function useSearchUser(): [
  string, (name: string) => void, IMemberPreview[], boolean, Error | null] {
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
}
