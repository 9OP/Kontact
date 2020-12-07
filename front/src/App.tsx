import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthGuard, LoginGuard } from './common/guards';
import ThemeToggler from './components/theme_toggler';
import Login from './components/login';
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
