/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { RouteProps } from 'react-router-dom';
import Guard from './guard';
import { LOGIN_PATH } from '../constants';
import { useAuth } from '../../services/hooks/auth.hooks';

export default (props: RouteProps): JSX.Element => {
  const { user } = useAuth();

  return (
    <Guard
      {...props}
      fallbackPath={LOGIN_PATH}
      isAllowed={!(user === null)}
    />
  );
};
