/* eslint-disable import/prefer-default-export */
import { AppThunk } from '..';
import { setMembershipsAction } from './memberships.actions';
import * as httpService from './memberships.http';

export const fetch = (): AppThunk => async (dispatch) => {
  // const { request, success, failure } = signinActions;

  // dispatch(request());
  try {
    const memberships = await httpService.fetchMemberships();
    dispatch(setMembershipsAction(memberships));
    // dispatch(setMembershipsAction(memberships));
    // dispatch(success());
  } catch (err) {
    // console.log(err);
    // dispatch(resetUserAction());
    // dispatch(failure('Mail or password invalid'));
    // dispatch(failure(err.message));
  }
};
