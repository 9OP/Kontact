/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { CREATE_PATH } from '../common/constants';
import { useJoinChannel } from '../services/hooks/auth.hooks';
import { generateUserName } from '../common/nameGenerator';

const JoinChannel = (): JSX.Element => {
  const [channelId, setChannelId] = useState('');
  const [userName, setUserName] = useState(generateUserName());
  const history = useHistory();
  const [join, loading, error] = useJoinChannel();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const channel = params.get('channel');
    if (channel) {
      setChannelId(channel);
    } else {
      // navigate
      history.push(CREATE_PATH);
    }
  }, [window.location.search]);

  const handleJoin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    join(channelId, userName);
    setChannelId('');
    setUserName('');
  };

  return (
    <Box paddingTop="4rem">
      <Flex flexDirection="column" width="full" align="center" justifyContent="center">
        <Box my={4} textAlign="left">
          <form onSubmit={handleJoin}>
            <h1>
              {`Join channel ${channelId}`}
            </h1>
            <FormControl>
              <FormLabel>User</FormLabel>
              <Input
                type="text"
                size="md"
                value={userName}
                onChange={(event) => setUserName(event.currentTarget.value)}
              />
            </FormControl>
            <Button type="submit">Join channel</Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default JoinChannel;
