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
import { ERole, IMemberPreview } from '../common/models';

export function useMembers(cid: string) {
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

export function useCreateMember() {
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

export function useDeleteMember() {
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

export function useUpdateMember() {
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

export function useSearchUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [previewMembers, setPreviewMembers] = useState<IMemberPreview[]>([]);

  const searchMembers = useCallback((name: string) => {
    setLoading(true);
    membersHttpService.searchUser(name).then((preview) => {
      setLoading(false);
      setPreviewMembers(preview);
    }).catch((err: Error) => {
      setLoading(false);
      setError(err);
    });
  }, []);

  return [searchMembers, previewMembers, loading, error];
}
