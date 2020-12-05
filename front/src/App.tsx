import React from 'react';

import ThemeToggler from './components/theme_toggler';
import LoginForm from './components/login_form';

function App(): JSX.Element {
  return (
    <div className="App">
      <ThemeToggler />
      <LoginForm />
    </div>
  );
}

export default App;
