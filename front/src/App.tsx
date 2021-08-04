import React from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';

import { HOME_PATH, CREATE_PATH, JOIN_PATH } from './common/constants';
import { AuthGuard, LoginGuard } from './common/guards';

import Create from './components/create';
import Join from './components/join';
import Home from './components/home';

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <LoginGuard path={CREATE_PATH} component={Create} />
        <LoginGuard path={JOIN_PATH} component={Join} />
        <AuthGuard exact path={HOME_PATH} component={Home} />
        <Redirect exact from="*" to={HOME_PATH} />
      </Switch>
    </Router>
  );
}

export default App;
