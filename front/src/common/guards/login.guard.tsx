/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { RouteProps } from 'react-router-dom';
import Guard from './guard';
import { HOME_PATH } from '../constants';
import { useWhoami } from '../../services/auth.hooks';

export default (props: RouteProps): JSX.Element => {
  const [auth] = useWhoami();

  return (
    <Guard
      {...props}
      fallbackPath={HOME_PATH}
      isAllowed={auth === null}
    />
  );
};
