import React from 'react';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';

interface Props {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
}

export default function LoginForm(props: Props): JSX.Element {
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
                type="text"
                placeholder="name@domain.com"
                size="md"
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="*******"
                size="md"
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
