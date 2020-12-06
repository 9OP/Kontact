/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Guard from './guard';
import { selectUser } from '../../store/user/user.selectors';

export default (props: RouteProps): JSX.Element => {
  const user = useSelector(selectUser);

  // If user is defined, then redirect to /
  // It prevents access to /login once authenticated
  const restrictedPath = '/';
  const isAllowed = () => user === null;

  return (
    <Guard
      {...props}
      restrictedPath={restrictedPath}
      isAllowed={isAllowed}
    />
  );
};
