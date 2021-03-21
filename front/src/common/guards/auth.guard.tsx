/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { RouteProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Guard from './guard';
import { isAuthenticated } from '../../store/authentication/auth.selectors';
import * as authEffect from '../../services/effects/auth.effects';
import { LOGIN_PATH } from '../constants';

export default (props: RouteProps): JSX.Element => {
  const dispatch = useDispatch();
  const authenticated = useSelector(isAuthenticated);

  useEffect(() => {
    if (!authenticated) {
      dispatch(authEffect.whoami());
    }
  }, [authenticated]);

  return (
    <Guard
      {...props}
      fallbackPath={LOGIN_PATH}
      isAllowed={authenticated}
    />
  );
};
