import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { HOME_PATH, LOGIN_PATH } from './common/constants';
import { AuthGuard, LoginGuard } from './common/guards';

// import Toast from './components/toast';
import Login from './components/login';
import Home from './components/home/home';

function App(): JSX.Element {
  return (
    <Router>
      {/* <Toast /> */}
      <LoginGuard path={LOGIN_PATH} component={Login} />
      <AuthGuard exact path={HOME_PATH} component={Home} />
    </Router>
  );
}

export default App;
