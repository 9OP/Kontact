// /* eslint-disable import/prefer-default-export */
// import { AppThunk, store } from '../../store';
// import {
//   fetchMembersAction,
//   createMemberAction,
//   deleteMemberAction,
//   updateMemberAction,
// } from '../../store/entities/members/memberships.actions';
// import { membersHttpService } from './http';
// import { toast, emit } from '../../components/toast';
// import { ERole } from '../../common/models';

// export const fetchMembers = (cid: string): AppThunk => async (dispatch) => {
//   try {
//     const members = await membersHttpService.fetchMembers(cid);
//     dispatch(fetchMembersAction(members));
//   } catch (err) {
//     // dispatch(failure(err.message));
//   }
// };

// export const createMember = (cid: string, uid: string): AppThunk => async (dispatch) => {
//   try {
//     const member = await membersHttpService.createMember(cid, uid);
//     dispatch(createMemberAction(member));
//     emit(toast.member_created(member));
//   } catch (err) {
//     // dispatch(failure(err.message));
//   }
// };

// export const deleteMember = (cid: string, uid: string): AppThunk => async (dispatch) => {
//   try {
//     const member = store.getState().entities.members?.byId?.[uid] || {};
//     await membersHttpService.deleteMember(cid, uid);
//     dispatch(deleteMemberAction(uid));
//     emit(toast.member_deleted(member));
//   } catch (err) {
//     // dispatch(failure(err.message));
//   }
// };

// export const updateMember = (cid: string, uid: string, role: ERole): AppThunk => async (
//   dispatch,
// ) => {
//   try {
//     const member = await membersHttpService.updateMember(cid, uid, role);
//     dispatch(updateMemberAction(member));
//   } catch (err) {
//     // dispatch(failure(err.message));
//   }
// };
export default {};
