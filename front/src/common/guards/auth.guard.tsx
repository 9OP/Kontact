/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { RouteProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Guard from './guard';
import { selectUser } from '../../store/authentication/auth.selectors';
import * as authEffect from '../../services/effects/auth.effects';
import { LOGIN_PATH } from '../constants';

export default (props: RouteProps): JSX.Element => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const isAuthenticated = !(user === null);

  useEffect(() => {
    if (user === null) {
      dispatch(authEffect.whoami());
    }
  }, [user]);

  return (
    <Guard
      {...props}
      fallbackPath={LOGIN_PATH}
      isAllowed={isAuthenticated}
    />
  );
};
