import { Action } from 'redux';

export const SIGNUP = '[AUTH] Signup';
export const SIGNIN = '[AUTH] Signin';
export const SIGNOUT = '[AUTH] Signout';

interface signupAction extends Action {
  type: typeof SIGNUP;
  payload: {
    name: string;
    email: string;
    password: string;
  };
}

interface signinAction extends Action {
  type: typeof SIGNIN;
  payload: {
    email: string;
    password: string;
  };
}

interface signoutAction extends Action {
  type: typeof SIGNOUT;
}

export type authActionTypes = signupAction | signinAction | signoutAction;
