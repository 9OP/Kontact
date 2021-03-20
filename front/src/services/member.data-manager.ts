import {
  fetchMembers,
  deleteMember,
  updateMember,
} from './effects/members.effects';
import {
  selectMembers,
  selectMemberById,
} from '../store/entities/members/memberships.selectors';

export default {
  // actions
  fetchMembers,
  deleteMember,
  updateMember,
  // selectors
  selectMembers,
  selectMemberById,
};
