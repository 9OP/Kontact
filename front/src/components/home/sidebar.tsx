import React, { useEffect, useState } from 'react';
import {
  Box, Flex, HStack, Icon, IconButton, Input, List, ListItem, Text, useDisclosure,
} from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import { AddIcon } from '@chakra-ui/icons';
import ModalCreator from '../modal';

import { useChannels, useCreateChannel, useFetchChannels } from '../../services/hooks/channel.hooks';
import { useSignout } from '../../services/hooks/auth.hooks';
import { IChannel } from '../../common/models';

interface ModalProps {
  isOpen: boolean,
  onClose: () => void,
  createChannel: (name: string) => void
}

const CreateChannelModal = (props: ModalProps):JSX.Element => {
  const { isOpen, onClose, createChannel } = props;
  const [name, setName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

  const onSubmit = () => {
    createChannel(name);
    onClose();
    setName('');
  };

  return (
    <ModalCreator
      isOpen={isOpen}
      onClose={onClose}
      header="Create channel"
      action="Create"
      onSubmit={onSubmit}
      body={(
        <Input
          value={name}
          onChange={handleChange}
          placeholder="Channel name"
          size="sm"
        />
      )}
    />
  );
};

export default (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createChannel] = useCreateChannel();
  const [signout] = useSignout();
  const [fetchChannels] = useFetchChannels();
  const { channels, open, channel } = useChannels();

  useEffect(() => {
    fetchChannels();
  }, []);

  const renderChannels = () => (
    channels.map((c: IChannel) => (
      <ListItem
        key={c.id}
        _hover={{
          bg: 'gray.100',
          cursor: 'pointer',
        }}
        bg={channel?.id === c.id ? 'gray.100' : ''}
        borderLeft={channel?.id === c.id ? '4px solid' : ''}
        borderColor="rgba(146, 101, 128, 0.4)"
        padding="1rem"
        paddingLeft={channel?.id === c.id ? 'calc(2rem - 4px)' : '2rem'}
        onClick={() => open(c.id)}
      >
        <Text
          fontWeight="bold"
          color="gray.600"
          fontSize="xs"
        >
          {c.name}
        </Text>
      </ListItem>
    ))
  );

  return (
    <Flex
      direction="column"
      width="17rem"
      marginRight="1rem"
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
    >
      <Box overflow="auto">
        <Box marginBottom="auto">
          {/* header */}
          <>
            <Box
              marginBottom="auto"
              position="sticky"
              top="0"
              paddingTop="1rem"
              boxShadow="0px 10px 10px 5px white"
              backgroundColor="white"
            >
              <HStack marginBottom="1rem">
                <Text
                  letterSpacing=".1rem"
                  fontWeight="bold"
                  color="gray.700"
                  fontSize="xl"
                  marginLeft="2rem"
                >
                  CHANNELS
                </Text>
                <IconButton
                  colorScheme="teal"
                  variant="outline"
                  size="xs"
                  aria-label="Create channel"
                  onClick={onOpen}
                  icon={<AddIcon />}
                />
              </HStack>
            </Box>

            <CreateChannelModal
              isOpen={isOpen}
              onClose={onClose}
              createChannel={createChannel}
            />
          </>
          {/* channels */}
          <List>
            {channels ? renderChannels() : null}
          </List>
        </Box>
      </Box>
      {/* footer */}
      <Box
        marginTop="auto"
        padding="1rem"
        boxShadow="0px -5px 10px 2px white"
      >
        <IconButton
          colorScheme="orange"
          variant="outline"
          aria-label="Signout"
          icon={<Icon as={FiLogOut} />}
          onClick={() => signout()}
        />
      </Box>
    </Flex>
  );
};
