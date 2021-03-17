import React, { useState } from 'react';
import {
  Text, Box, HStack, IconButton, useDisclosure, Button,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Input,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

interface modalProps {
  isOpen: boolean,
  onClose: () => void,
  createChannel: (name: string) => void
}

function CreateChannelModal(props: modalProps) {
  const { isOpen, onClose, createChannel } = props;
  const [name, setName] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

  const onSubmit = () => {
    createChannel(name);
    onClose();
  };

  return (

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create channel</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="8px">
            Channel name:
          </Text>
          <Input
            value={name}
            onChange={handleChange}
            placeholder="Here is a sample placeholder"
            size="sm"
          />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="teal" variant="outline" onClick={onSubmit}>Create</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

  );
}

interface Props {
  createChannel: (name: string) => void
}

export default (props: Props): JSX.Element => {
  const { createChannel } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box marginBottom="auto" marginTop="2rem">
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
            size="sm"
            aria-label="Create channel"
            onClick={onOpen}
            icon={<AddIcon />}
          />
        </HStack>
      </Box>

      <CreateChannelModal isOpen={isOpen} onClose={onClose} createChannel={createChannel} />
    </>
  );
};
