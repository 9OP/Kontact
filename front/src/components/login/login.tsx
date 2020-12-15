import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { DispThunk, RootState } from '../../store';
import * as effect from '../../store/authentication/auth.effects';
import { signinSelectors } from '../../store/authentication/auth.selectors';
import LoginView from './login.view';

const mapState = (state: RootState) => ({
  error: signinSelectors.error(state),
  isLoading: signinSelectors.loading(state),
});

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
  const { signin, error, isLoading } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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