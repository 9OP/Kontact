import React, { useState } from 'react';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Spinner,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import ErrorMessage from '../error';

interface Props {
  signin: (event: React.FormEvent<HTMLFormElement>) => void,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  error: string,
  isLoading: boolean,
}

export default (props: Props): JSX.Element => {
  const {
    signin,
    setEmail,
    setPassword,
    error,
    isLoading,
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">

        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>

        <Box my={4} textAlign="left">
          <form onSubmit={signin}>
            {error && <ErrorMessage message={error} />}
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
                  <Button h="1.5rem" size="sm" onClick={handlePasswordVisibility}>
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button colorScheme="teal" variant="outline" type="submit" width="full" mt={4}>
              {isLoading ? (
                <Spinner size="md" thickness="2px" speed="0.65s" colorScheme="teal" />
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </Box>

      </Box>
    </Flex>
  );
};
