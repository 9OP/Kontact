/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Guard from './guard';
import { selectUser } from '../../store/authentication/auth.selectors';
import { HOME_PATH } from '../constants';

export default (props: RouteProps): JSX.Element => {
  const user = useSelector(selectUser);

  const isUserNull = user === null;

  return (
    <Guard
      {...props}
      fallbackPath={HOME_PATH}
      isAllowed={isUserNull}
    />
  );
};
