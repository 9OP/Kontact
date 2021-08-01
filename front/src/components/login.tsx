/* eslint-disable max-len */
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
  useDisclosure,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useCreateChannel } from '../services/hooks/auth.hooks';
import ModalCreator from './modal';

/**
 * TODO:
 * - new login page
 *  - create channel
 *  - join channel
 */

/* channel: city_name (tokyo, paris, berlin, rome ...: capital) - adjectif/color (joyfull, red, cyan, light)
 * name: author/creator (vinci, graebber, tesla, hugo, turing, alan, church, curry) - adjectif (sad, angry, happy ...)
 */

interface loginProps {
  type: 'create' | 'join',
  isOpen: boolean,
  onClose: () => void,
}

const LoginModal = (props: loginProps): JSX.Element => {
  const { type, isOpen, onClose } = props;
  const [channelName, setChannelName] = useState('');
  const [userName, setUserName] = useState('');

  const [create, loading, error] = useCreateChannel();

  const handleCreate = () => {
    create(channelName, userName);
    onClose();
    setChannelName('');
    setUserName('');
  };

  const handleJoin = () => {
    //
  };

  const createBody = (
    <Box my={4} textAlign="left">
      <form>
        <FormControl>
          <FormLabel>Channel</FormLabel>
          <Input
            type="text"
            size="md"
            onChange={(event) => setChannelName(event.currentTarget.value)}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>User</FormLabel>
          <Input
            type="text"
            size="md"
            onChange={(event) => setUserName(event.currentTarget.value)}
          />
        </FormControl>
      </form>
    </Box>
  );

  const joinBody = (
    <Box my={4} textAlign="left">
      <form>
        <FormControl>
          <FormLabel>User</FormLabel>
          <Input
            type="text"
            size="md"
            onChange={(event) => setUserName(event.currentTarget.value)}
          />
        </FormControl>
      </form>
    </Box>
  );

  return (
    <ModalCreator
      isOpen={isOpen}
      onClose={onClose}
      header={`${type} channel`}
      action={type}
      onSubmit={type === 'create' ? handleCreate : handleJoin}
      body={type === 'create' ? createBody : joinBody}
    />
  );
};

const Login = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [type, setType] = useState<'create' | 'join'>('create');

  const openModal = (t: 'create' | 'join') => {
    setType(t);
    onOpen();
  };

  return (
    <Box paddingTop="4rem">
      <Flex flexDirection="row" width="full" align="center" justifyContent="center">
        {/* Create channel */}
        <Button
          p={8}
          m={8}
          width="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          onClick={() => openModal('create')}
        >
          Create channel
        </Button>

        {/* Join channel */}
        <Button
          p={8}
          m={8}
          width="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          onClick={() => openModal('join')}
        >
          Join channel
        </Button>

        <LoginModal type={type} isOpen={isOpen} onClose={onClose} />
      </Flex>
    </Box>
  );
};

export default Login;
