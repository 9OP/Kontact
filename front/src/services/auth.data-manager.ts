import {
  signin,
  signup,
  signout,
  whoami,
} from './effects/auth.effects';
import {
  selectUser,
  signinSelectors,
  signupSelectors,
  signoutSelectors,
  whoamiSelectors,
} from '../store/authentication/auth.selectors';

export default {
  signin,
  signup,
  signout,
  whoami,
  selectUser,
  signinSelectors,
  signupSelectors,
  signoutSelectors,
  whoamiSelectors,
};
