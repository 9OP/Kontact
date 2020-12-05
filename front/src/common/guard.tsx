/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export interface GuardProps extends RouteProps {
  isAuthenticated: boolean;
  isAllowed: boolean;
  restrictedPath: string;
  authenticationPath: string;
}

export default function Guard(props: GuardProps): JSX.Element {
  const {
    isAuthenticated, isAllowed, authenticationPath, restrictedPath,
  } = props;
  let redirectPath = '';

  if (!isAuthenticated) {
    redirectPath = authenticationPath;
  }
  if (isAuthenticated && !isAllowed) {
    redirectPath = restrictedPath;
  }

  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  }
  return <Route {...props} />;
}

// Create loginGuard, AuthGuard etc...
