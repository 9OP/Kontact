/* eslint-disable import/prefer-default-export */
import { RootState } from '..';
import { IMembership } from '../../common/models/membership.model';

export const selectMemberships = (state: RootState): IMembership[] => state.memberships;
