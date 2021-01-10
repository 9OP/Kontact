/* eslint-disable import/prefer-default-export */
import { IMembership } from '../../common/models/membership.model';
import { apiActionsCreator } from '../api/api.actions';
import {
  FETCH_MEMBERSHIPS,
  SET_MEMBERSHIPS,
  membershipsActionTypes,
  RESET_MEMBERSHIPS,
} from './memberships.action-types';

/**
 * Api actions
 */
export const fetchMembershipsActions = apiActionsCreator(FETCH_MEMBERSHIPS);

/**
 * Memberships actions
 */
export function setMembershipsAction(memberships: IMembership[]): membershipsActionTypes {
  return {
    payload: memberships,
    type: SET_MEMBERSHIPS,
  };
}

export function resetMembershipsAction(): membershipsActionTypes {
  return {
    type: RESET_MEMBERSHIPS,
  };
}
