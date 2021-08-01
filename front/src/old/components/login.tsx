import React, { useState } from 'react';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Spinner,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useSignin, useSignup } from '../services/hooks/auth.hooks';

const Signup = (props: { toggle: () => void }): JSX.Element => {
  const { toggle } = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [signup, loading, error] = useSignup();
  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signup(name, email, password);
  };

  return (
    <Box paddingTop="4rem">
      <Flex width="full" align="center" justifyContent="center">
        <Box
          p={8}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Box textAlign="center">
            <Heading>Register</Heading>
            <Button onClick={toggle}>signin</Button>
          </Box>

          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  placeholder="name"
                  size="md"
                  onChange={(event) => setName(event.currentTarget.value)}
                />
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  placeholder="name@domain.com"
                  size="md"
                  onChange={(event) => setEmail(event.currentTarget.value)}
                />
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="*******"
                    size="md"
                    onChange={(event) => setPassword(event.currentTarget.value)}
                  />
                  <InputRightElement width="3rem">
                    <Button
                      h="1.5rem"
                      size="sm"
                      onClick={handlePasswordVisibility}
                    >
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                colorScheme="teal"
                variant="outline"
                type="submit"
                width="full"
                mt={4}
              >
                { loading ? (
                  <Spinner
                    thickness="2px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="teal.500"
                    size="md"
                  />
                ) : 'Sign Up'}
              </Button>
            </form>
            { error && error.message }
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

const Signin = (props: { toggle: () => void }): JSX.Element => {
  const { toggle } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [signin, loading, error] = useSignin();
  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signin(email, password);
  };

  return (
    <Box paddingTop="4rem">
      <Flex width="full" align="center" justifyContent="center">
        <Box
          p={8}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Box textAlign="center">
            <Heading>Login</Heading>
            <Button onClick={toggle}>signup</Button>
          </Box>

          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  placeholder="name@domain.com"
                  size="md"
                  onChange={(event) => setEmail(event.currentTarget.value)}
                />
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="*******"
                    size="md"
                    onChange={(event) => setPassword(event.currentTarget.value)}
                  />
                  <InputRightElement width="3rem">
                    <Button
                      h="1.5rem"
                      size="sm"
                      onClick={handlePasswordVisibility}
                    >
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                colorScheme="teal"
                variant="outline"
                type="submit"
                width="full"
                mt={4}
              >
                { loading ? (
                  <Spinner
                    thickness="2px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="teal.500"
                    size="md"
                  />
                ) : 'Sign In'}
              </Button>
            </form>
            { error && error.message }
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default (): JSX.Element => {
  const [signin, setSignin] = useState(true);

  const toggle = () => {
    setSignin(!signin);
  };

  return (
    <>
      { signin ? <Signin toggle={toggle} /> : <Signup toggle={toggle} /> }
    </>
  );
};
