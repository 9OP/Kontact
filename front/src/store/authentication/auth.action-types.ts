export const FETCH_USER = '[AUTH] Fetch User';
export const SIGNUP = '[AUTH] Signup';
export const SIGNIN = '[AUTH] Signin';
export const SIGNOUT = '[AUTH] Signout';

interface signupAction {
  type: typeof SIGNUP;
  payload: {
    name: string;
    email: string;
    password: string;
  };
}

interface signinAction {
  type: typeof SIGNIN;
  payload: {
    email: string;
    password: string;
  };
}

interface signoutAction {
  type: typeof SIGNOUT;
}

interface fetchUserAction {
  type: typeof FETCH_USER;
}

export type authActionTypes = signupAction | signinAction | signoutAction | fetchUserAction;
