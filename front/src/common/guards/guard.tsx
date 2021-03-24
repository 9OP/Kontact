/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export interface Props extends RouteProps {
  isAllowed: boolean;
  fallbackPath: string;
}

export default function Guard(props: Props): JSX.Element {
  const { isAllowed, fallbackPath } = props;

  let redirectPath = '';

  if (!isAllowed) {
    redirectPath = fallbackPath;
  }

  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  }
  return <Route {...props} />;
}
