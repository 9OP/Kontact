/* eslint-disable import/prefer-default-export */
import { AppThunk } from '../store';
import { setMembershipsAction, fetchMembershipsActions } from '../store/memberships/memberships.actions';
import * as httpService from './http/memberships.http';

export const fetch = (): AppThunk => async (dispatch) => {
  const { request, success, failure } = fetchMembershipsActions;

  dispatch(request());
  try {
    const memberships = await httpService.fetchMemberships();
    dispatch(setMembershipsAction(memberships));
    dispatch(success());
  } catch (err) {
    dispatch(failure(err.message));
  }
};
