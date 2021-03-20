import { fetchMembers, deleteMember } from './effects/members.effects';
import { selectMembers } from '../store/entities/memberships/memberships.selectors';

export default {
  // actions
  fetchMembers,
  deleteMember,
  // selectors
  selectMembers,
};
