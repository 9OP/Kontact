/* eslint-disable import/prefer-default-export */
import { AppThunk } from '../../store';
import { setMembersAction, fetchMembersActions } from '../../store/entities/members/members.actions';
import { setMembershipsAction } from '../../store/entities/memberships/memberships.actions';
import * as httpService from './http/channel.http';

export const fetchMembers = (
  cid: string,
): AppThunk => async (dispatch) => {
  const { request, success, failure } = fetchMembersActions;

  dispatch(request());
  try {
    const { members, memberships } = await httpService.fetchMembers(cid);
    dispatch(setMembersAction(members));
    dispatch(setMembershipsAction(memberships));
    dispatch(success());
  } catch (err) {
    dispatch(failure(err.message));
  }
};
