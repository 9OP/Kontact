import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { DispThunk, RootState } from '../../store';
import { authDataManager } from '../../services';
import LoginView from './login.view';

const mapState = (state: RootState) => ({
  error: authDataManager.signinSelectors.error(state),
  isLoading: authDataManager.signinSelectors.loading(state),
});

const mapDispatch = (dispatch: DispThunk) => ({
  signin: (email: string, password: string) => dispatch(authDataManager.signin(email, password)),
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

  // TODO: email/password validation

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
    />
  );
};

export default connector(Login);
