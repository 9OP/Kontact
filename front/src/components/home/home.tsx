import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import Main from './main';
import { useFetchChannels } from '../../services/hooks/channel.hooks';

export default (): JSX.Element => {
  const [fetchChannels] = useFetchChannels();

  useEffect(() => {
    fetchChannels();
  }, []);

  return (
    <Box padding="1rem">
      <Main />
    </Box>
  );
};
