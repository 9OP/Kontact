/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export interface Props extends RouteProps {
  isAuthenticated?: () => boolean;
  isAllowed?: () => boolean;
  restrictedPath?: string;
  authenticationPath?: string;
}

const defaultProps = {
  isAuthenticated: () => true,
  isAllowed: () => true,
  restrictedPath: '/',
  authenticationPath: '/',
};

export default function Guard(props: Props = defaultProps): JSX.Element {
  let {
    isAuthenticated, isAllowed, authenticationPath, restrictedPath,
  } = props;

  isAuthenticated = isAuthenticated || defaultProps.isAuthenticated;
  isAllowed = isAllowed || defaultProps.isAllowed;
  authenticationPath = authenticationPath || defaultProps.authenticationPath;
  restrictedPath = restrictedPath || defaultProps.restrictedPath;

  let redirectPath = '';

  if (!isAuthenticated()) {
    redirectPath = authenticationPath;
  }
  if (isAuthenticated() && !isAllowed()) {
    redirectPath = restrictedPath;
  }

  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  }
  return <Route {...props} />;
}
