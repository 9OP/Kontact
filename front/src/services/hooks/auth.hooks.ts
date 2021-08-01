import { useState, useCallback } from 'react';

import { resetUserAction, setUserAction } from '../../store/authentication/auth.actions';
import { selectUser } from '../../store/authentication/auth.selectors';
import { authHttpService, channelsHttpService } from '../http';
import { useAction, useAppSelector } from './hooks';

import { emit, toast } from '../../components/toast';
import { IAuth } from '../../common/models';
import { createChannelAction } from '../../store/entities/channels/channels.actions';

export const useAuth = (): { user: IAuth } => {
  const user = useAppSelector(selectUser);
  return { user };
};

export const useSignup = (): [
  (name:string, email: string, password: string) => void, boolean, Error | null] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const auth = useAppSelector(selectUser);

  const signin = useCallback((name: string, email: string, password: string) => {
    setLoading(true);
    if (!auth) {
      authHttpService.signup(email, password, name).then(() => {
        setLoading(false);
        emit(toast.auth_signup(email));
      }).catch((err: Error) => {
        setLoading(false);
        setError(err);
      });
    }
  }, [auth]);

  return [signin, loading, error];
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
        console.log('err', err);
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

export const useCreateChannel = ():
[(channelName: string, userName: string) => void, boolean, Error | null] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const setChannel = useAction(createChannelAction);
  const setUser = useAction(setUserAction);

  const create = useCallback(async (channelName: string, userName: string) => {
    setLoading(true);
    const email = `user_${userName}@kontact.com`; // random uuid instead of usernName
    const password = '123'; // gen random pwd
    try {
      const user = await authHttpService.signup(email, password, userName);
      const channel = await channelsHttpService.createChannel(channelName, user.material.suek);
      setUser(user);
      setChannel(channel);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [setChannel, setUser]);

  return [create, loading, error];
};
