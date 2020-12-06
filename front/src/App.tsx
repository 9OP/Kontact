import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import ThemeToggler from './components/theme_toggler';
import Login from './components/login';
import { AuthGuard, LoginGuard } from './common/guards';
import Home from './components/home/home';

function App(): JSX.Element {
  return (
    <Router>
      <ThemeToggler />
      <LoginGuard path="/login" component={Login} />
      <AuthGuard exact path="/" component={Home} />
    </Router>
  );
}

export default App;
