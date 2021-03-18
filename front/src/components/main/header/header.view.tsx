import React from 'react';
import {
  Box, Text, IconButton, HStack, Button, Alert, AlertIcon, useDisclosure,
} from '@chakra-ui/react';
import { DeleteIcon, SmallAddIcon } from '@chakra-ui/icons';
import { IChannel, ERole } from '../../../common/models';
import ModalCreator from '../../modal';

interface ModalProps {
  isOpen: boolean,
  onClose: () => void,
  channel: IChannel,
  deleteChannel: (cid: string) => void,
}

const DeleteChannelModal = (props: ModalProps):JSX.Element => {
  const {
    isOpen, onClose, channel, deleteChannel,
  } = props;

  const onSubmit = () => {
    deleteChannel(channel.id);
    onClose();
  };

  return (
    <ModalCreator
      isOpen={isOpen}
      onClose={onClose}
      header={`Delete channel: ${channel.name}`}
      action="Delete"
      onSubmit={onSubmit}
      body={(
        <Alert status="warning">
          <AlertIcon />
          Are you sure?
        </Alert>
      )}
    />
  );
};

interface Props {
  channel: IChannel;
  role: ERole;
  deleteChannel: (cid: string) => void,
}

export default (props: Props): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { channel, role, deleteChannel } = props;
  const isMaster = role === ERole.Master;

  return (
    <Box
      minHeight="5rem"
      padding=".8rem"
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
    >
      <HStack justifyContent="space-between">
        <HStack>
          <Text
            letterSpacing=".15rem"
            fontSize="xl"
            color="gray.600"
          >
            {channel.name}
          </Text>
        </HStack>
        { isMaster ? (
          <IconButton
            color="red.500"
            variant="outline"
            aria-label="Delete channel"
            icon={<DeleteIcon />}
            onClick={onOpen}
          />
        ) : null}
      </HStack>

      <HStack>
        <Button
          letterSpacing=".15rem"
          size="xs"
          colorScheme="blue"
          variant="outline"
        >
          Members
        </Button>

        { isMaster ? (
          <IconButton
            size="xs"
            variant="outline"
            colorScheme="teal"
            aria-label="Add member"
            icon={<SmallAddIcon />}
          />
        ) : null}
      </HStack>

      <DeleteChannelModal
        isOpen={isOpen}
        onClose={onClose}
        channel={channel}
        deleteChannel={deleteChannel}
      />
    </Box>
  );
};
