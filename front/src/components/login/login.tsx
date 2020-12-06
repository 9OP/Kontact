import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { DispThunk } from '../../store';
import * as effect from '../../store/authentication/auth.effect';
import LoginView from './login.view';

const mapState = null;

const mapDispatch = (dispatch: DispThunk) => ({
  signin: (email: string, password: string) => dispatch(effect.signin(email, password)),
});

const connector = connect(
  mapState,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

const Login = (props: Props): JSX.Element => {
  const { signin } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    signin(email, password);
  };

  return (
    <LoginView
      signin={handleSignin}
      setEmail={setEmail}
      setPassword={setPassword}
      error={error}
      isLoading={isLoading}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
    />
  );
};

export default connector(Login);
