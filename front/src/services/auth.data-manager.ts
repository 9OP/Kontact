import { signin, signout, whoami } from './effects/auth.effects';
import { selectUser, selectRole } from '../store/authentication/auth.selectors';

export default {
  // actions
  signin,
  signout,
  whoami,
  // selectors
  selectUser,
  selectRole,
};
