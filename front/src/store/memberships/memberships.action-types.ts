import { Action } from 'redux';
import { IMembership } from '../../common/models/membership.model';

/**
 * Api actions
 */
export const FETCH_MEMBERSHIPS = '[MEMBERSHIPS] FETCH_MEMBERSHIPS';

/**
 * Memberships actions
 */
export const SET_MEMBERSHIPS = '[MEMBERSHIPS] SET_MEMBERSHIPS';
export const RESET_MEMBERSHIPS = '[MEMBERSHIPS] RESET_MEMBERSHIPS';

interface setMembershipsAction extends Action {
  payload: IMembership[];
  type: typeof SET_MEMBERSHIPS;
}

interface resetMembershipsAction extends Action {
  type: typeof RESET_MEMBERSHIPS;
}

export type membershipsActionTypes = setMembershipsAction | resetMembershipsAction;
