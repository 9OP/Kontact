import React, { useState } from 'react';
import {
  Text, Box, HStack, IconButton, useDisclosure, Input,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import ModalCreator from '../../modal';
import { useCreateChannel } from '../../../services/hooks/channel.hooks';

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
  const [createChannel] = useCreateChannel();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
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
  );
};
