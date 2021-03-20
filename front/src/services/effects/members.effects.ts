/* eslint-disable import/prefer-default-export */
import { AppThunk } from '../../store';
import {
  fetchMembersAction,
  // createMemberAction,
  deleteMemberAction,
  updateMemberAction,
} from '../../store/entities/members/memberships.actions';
import { membersHttpService } from './http';
import { toast, emit } from '../../components/toast';
import { ERole, IChannel, IMember } from '../../common/models';

export const fetchMembers = (cid: string): AppThunk => async (dispatch) => {
  try {
    const members = await membersHttpService.fetchMembers(cid);
    dispatch(fetchMembersAction(members));
  } catch (err) {
    // dispatch(failure(err.message));
  }
};

export const deleteMember = (
  channel: IChannel,
  member: IMember,
): AppThunk => async (dispatch) => {
  try {
    await membersHttpService.deleteMember(channel.id, member.id);
    dispatch(deleteMemberAction(member.id));
    emit(toast.member_deleted(member));
  } catch (err) {
    // dispatch(failure(err.message));
  }
};

export const updateMember = (
  cid: string,
  uid: string,
  role: ERole,
): AppThunk => async (dispatch) => {
  try {
    const member = await membersHttpService.updateMember(cid, uid, role);
    dispatch(updateMemberAction(member));
  } catch (err) {
    // dispatch(failure(err.message));
  }
};
