import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import { signin } from '../store/authentication/auth.effect';

interface LoginFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
}

function LoginForm(props: LoginFormProps): JSX.Element {
  const {
    handleSubmit,
    setEmail,
    setPassword,
  } = props;

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="test@test.com"
                size="lg"
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="*******"
                size="lg"
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" variant="outline" width="full" mt={4}>
              Sign In
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

function Login(props: {login: any}): JSX.Element {
  const { login } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const authRoute = 'http://localhost:5000/auth/signin';

  //   fetch(authRoute, {
  //     method: 'post',
  //     headers: { 'Content-type': 'application/json' },
  //     body: JSON.stringify({ email, password }),
  //   }).then((response) => response.json())
  //     .then((json) => console.log(json))
  //     .catch((err) => console.log('Request Failed', err));
  // };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <LoginForm
      handleSubmit={handleSubmit}
      setEmail={setEmail}
      setPassword={setPassword}
    />
  );
}

const LoginStore = connect(
  null,
  (dispatch) => ({
    login: (auth: {email: string, password: string}) => dispatch(signin(auth)),
  }),
)(Login);

export default LoginStore;
