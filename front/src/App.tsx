import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ThemeToggler from './components/theme_toggler';
import LoginForm from './components/login/login';
import Guard from './common/guard';
import Home from './components/home';

function App(): JSX.Element {
  return (
    <Router>
      <ThemeToggler />
      <Route path="/login" component={LoginForm} />
      <Guard
        restrictedPath="/login"
        authenticationPath="/login"
        isAllowed
        isAuthenticated={false}
        component={Home}
      />
    </Router>
  );
}

export default App;
