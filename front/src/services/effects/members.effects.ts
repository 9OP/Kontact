/* eslint-disable import/prefer-default-export */
import { AppThunk } from '../../store';
import { fetchMembersAction } from '../../store/entities/memberships/members/members.actions';
import {
  fetchMembershipsAction,
  createMemberAction,
  deleteMemberAction,
  updateMemberAction,
} from '../../store/entities/memberships/memberships.actions';
import { membersHttpService } from './http';

export const fetchMembers = (cid: string): AppThunk => async (dispatch) => {
  try {
    const { members, memberships } = await membersHttpService.fetchMembers(cid);
    dispatch(fetchMembersAction(members));
    dispatch(fetchMembershipsAction(memberships));
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
    dispatch(deleteMemberAction(`${cid}.${uid}`));
  } catch (err) {
    // dispatch(failure(err.message));
  }
};
