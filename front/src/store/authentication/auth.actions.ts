import { apiActionsCreator } from '../api/api.actions';

// Move to auth.action-types.ts
export const SIGNIN = '[AUTH] SIGNIN';
export const SIGNUP = '[AUTH] SIGNUP';
export const WHOAMI = '[AUTH] WHOAMI';
export const SIGNOUT = '[AUTH] SIGNOUT';

export const signinActions = apiActionsCreator(SIGNIN);
export const signupActions = apiActionsCreator(SIGNUP);
export const whoamiActions = apiActionsCreator(WHOAMI);
export const signoutActions = apiActionsCreator(SIGNOUT);
