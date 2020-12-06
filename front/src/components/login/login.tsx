import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { DispThunk } from '../../store';
import { signin } from '../../store/authentication/auth.effect';
import LoginForm from './login.view';

const mapState = null;

const mapDispatch = (dispatch: DispThunk) => ({
  login: (email: string, password: string) => dispatch(signin(email, password)),
});

const connector = connect(
  mapState,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

function Login(props: Props): JSX.Element {
  const { login } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(email, password);
  };

  return (
    <LoginForm
      handleSubmit={handleSubmit}
      setEmail={setEmail}
      setPassword={setPassword}
    />
  );
}

export default connector(Login);
