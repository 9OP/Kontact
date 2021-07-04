import { useState, useCallback } from 'react';

import { resetUserAction, setUserAction } from '../../store/authentication/auth.actions';
import { selectUser } from '../../store/authentication/auth.selectors';
import { authHttpService } from '../http';
import { useAction, useAppSelector } from './hooks';

import { emit, toast } from '../../components/toast';
import { IAuth } from '../../common/models';

export const useAuth = (): { user: IAuth } => {
  const user = useAppSelector(selectUser);
  return { user };
};

export const useSignin = (): [(email: string, password: string) => void, boolean, Error | null] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const setUser = useAction(setUserAction);
  const resetUser = useAction(resetUserAction);
  const auth = useAppSelector(selectUser);

  const signin = useCallback((email: string, password: string) => {
    setLoading(true);
    if (!auth) {
      authHttpService.signin(email, password).then((user) => {
        setLoading(false);
        emit(toast.auth_signin(user));
        setUser(user);
      }).catch((err: Error) => {
        setLoading(false);
        setError(err);
        resetUser();
      });
    }
  }, [auth]);

  return [signin, loading, error];
};

export const useWhoami = (): [() => void, boolean, Error | null] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const setUser = useAction(setUserAction);
  const resetUser = useAction(resetUserAction);
  const auth = useAppSelector(selectUser);

  const whoami = useCallback(() => {
    setLoading(true);
    if (!auth) {
      authHttpService.whoami().then((user) => {
        setUser(user);
      }).catch((err: Error) => {
        setError(err);
        resetUser();
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [auth]);

  return [whoami, loading, error];
};

export const useSignout = (): [() => void] => {
  const resetUser = useAction(resetUserAction);
  const auth = useAppSelector(selectUser);

  const signout = useCallback(() => {
    if (auth) {
      authHttpService.signout().finally(() => {
        emit(toast.auth_signout());
        resetUser();
      });
    }
  }, [auth]);

  return [signout];
};
