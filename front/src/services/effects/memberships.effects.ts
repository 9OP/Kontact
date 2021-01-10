/* eslint-disable import/prefer-default-export */
import { AppThunk } from '../../store';
import effect from '../../store/api/api.effect';
import { setMembershipsAction, resetMembershipsAction, fetchMembershipsActions } from '../../store/memberships/memberships.actions';
import * as httpService from './http/memberships.http';

export const fetchMemberships = (): AppThunk => async (dispatch) => {
  const successCb = async () => {
    const memberships = await httpService.fetchMemberships();
    dispatch(setMembershipsAction(memberships));
  };

  const failureCb = async () => {
    dispatch(resetMembershipsAction());
  };

  await effect(dispatch, fetchMembershipsActions, successCb, failureCb);
};
