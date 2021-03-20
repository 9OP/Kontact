import { fetchMembers, deleteMember } from './effects/members.effects';
import { selectMembers } from '../store/entities/members/memberships.selectors';

export default {
  // actions
  fetchMembers,
  deleteMember,
  // selectors
  selectMembers,
};
