/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import { useCreateChannel } from '../services/hooks/auth.hooks';
import { generateChannelName, generateUserName } from '../common/nameGenerator';

const CreateChannel = (): JSX.Element => {
  const [channelName, setChannelName] = useState(generateChannelName());
  const [userName, setUserName] = useState(generateUserName());
  const [create, loading, error] = useCreateChannel();

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    create(channelName, userName);
    setChannelName('');
    setUserName('');
  };

  return (
    <Box paddingTop="4rem">
      <Flex flexDirection="column" width="full" align="center" justifyContent="center">
        <Box my={4} textAlign="left">
          <form onSubmit={handleCreate}>
            <FormControl>
              <FormLabel>Channel</FormLabel>
              <Input
                type="text"
                size="md"
                value={channelName}
                onChange={(event) => setChannelName(event.currentTarget.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>User</FormLabel>
              <Input
                type="text"
                size="md"
                value={userName}
                onChange={(event) => setUserName(event.currentTarget.value)}
              />
            </FormControl>
            <Button type="submit">Create channel</Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default CreateChannel;
