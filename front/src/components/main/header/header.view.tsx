import React from 'react';
import {
  Box, Text, IconButton, HStack, Alert, AlertIcon, useDisclosure,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
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

        <Text
          letterSpacing=".15rem"
          fontWeight="bold"
          fontSize="2xl"
          color="gray.700"
        >
          {channel.name}
        </Text>

        { isMaster ? (
          <IconButton
            size="sm"
            color="red.500"
            variant="outline"
            aria-label="Delete channel"
            icon={<DeleteIcon />}
            onClick={onOpen}
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
