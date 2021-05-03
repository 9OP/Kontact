/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { RouteProps } from 'react-router-dom';
import Guard from './guard';
import { HOME_PATH } from '../constants';
import { useAuth, useWhoami } from '../../services/hooks/auth.hooks';

export default (props: RouteProps): JSX.Element => {
  const { user } = useAuth();
  const [whoami] = useWhoami();

  useEffect(() => {
    if (user === null) {
      whoami();
    }
  }, [user]);

  return (
    <Guard
      {...props}
      fallbackPath={HOME_PATH}
      isAllowed={user === null}
    />
  );
};
