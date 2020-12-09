/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { RouteProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Guard from './guard';
import { selectUser } from '../../store/user/user.selectors';
import * as effect from '../../store/authentication/auth.effects';

export default (props: RouteProps): JSX.Element => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const authenticationPath = '/login';
  const isAuthenticated = () => !(user === null);

  useEffect(() => {
    if (user === null) {
      dispatch(effect.whoami());
    }
  }, []);

  return (
    <Guard
      {...props}
      authenticationPath={authenticationPath}
      isAuthenticated={isAuthenticated}
    />
  );
};
