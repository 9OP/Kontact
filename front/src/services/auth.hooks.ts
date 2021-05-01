/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { resetUserAction, setUserAction } from '../store/authentication/auth.actions';
import { selectUser } from '../store/authentication/auth.selectors';
import { authHttpService } from './effects/http';
import useAction from './useAction';
import { emit, toast } from '../components/toast';
import { IAuth } from '../common/models';

export function useSignin(): [(...args: any) => void, boolean, Error | null] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const setUser = useAction(setUserAction);
  const resetUser = useAction(resetUserAction);
  const auth = useSelector(selectUser);

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
}

export function useWhoami(): [IAuth, boolean, Error | null] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const setUser = useAction(setUserAction);
  const resetUser = useAction(resetUserAction);
  const auth = useSelector(selectUser);

  useEffect(() => {
    function whoami() {
      setLoading(true);
      authHttpService.whoami().then((user) => {
        setLoading(false);
        setUser(user);
      }).catch((err: Error) => {
        setLoading(false);
        setError(err);
        resetUser();
      });
    }

    if (!auth) {
      whoami();
    }
  }, [setLoading, auth, setUser, resetUser]);

  return [auth, loading, error];
}

export function useSignout(): [() => void] {
  const resetUser = useAction(resetUserAction);
  const auth = useSelector(selectUser);

  const signout = useCallback(() => {
    if (auth) {
      authHttpService.signout().then(() => {
        emit(toast.auth_signout());
        resetUser();
      });
    }
  }, [auth]);

  return [signout];
}
