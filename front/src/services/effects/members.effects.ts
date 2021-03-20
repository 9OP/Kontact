/* eslint-disable import/prefer-default-export */
import { AppThunk } from '../../store';
import {
  fetchMembersAction,
  createMemberAction,
  deleteMemberAction,
  updateMemberAction,
} from '../../store/entities/members/memberships.actions';
import { membersHttpService } from './http';
import { toast, emit } from '../../components/toast';
import { IMember } from '../../common/models';

export const fetchMembers = (cid: string): AppThunk => async (dispatch) => {
  try {
    const members = await membersHttpService.fetchMembers(cid);
    dispatch(fetchMembersAction(members));
  } catch (err) {
    // dispatch(failure(err.message));
  }
};

// export const createMember = (cid: string, uid: string): AppThunk => async (
//   dispatch
// ) => {
//   try {
//     await membersHttpService.createMember(cid, uid);
//     dispatch(createMemberAction(`${cid}.${uid}`));
//   } catch (err) {
//     // dispatch(failure(err.message));
//   }
// };

export const deleteMember = (cid: string, uid: string): AppThunk => async (
  dispatch,
) => {
  try {
    await membersHttpService.deleteMember(cid, uid);
    dispatch(deleteMemberAction(uid));
    emit(toast.member_deleted({} as IMember));
  } catch (err) {
    // dispatch(failure(err.message));
  }
};
