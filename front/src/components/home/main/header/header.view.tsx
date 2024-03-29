import React, { useRef } from 'react';
import {
  Box,
  Text,
  IconButton,
  HStack,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { IChannel, ERole } from '../../../../common/models';

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
  channel: IChannel;
  deleteChannel: () => void;
}

function DeleteChannelAlert(props: AlertProps) {
  const {
    isOpen, onClose, channel, deleteChannel,
  } = props;
  const cancelRef = useRef(null);

  const del = () => {
    deleteChannel();
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {`Delete ${channel.name}`}
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can&#39;t undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={del} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

interface Props {
  channel: IChannel;
  role: ERole;
  deleteChannel: () => void;
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

        {isMaster ? (
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

      <DeleteChannelAlert
        isOpen={isOpen}
        onClose={onClose}
        channel={channel}
        deleteChannel={deleteChannel}
      />
    </Box>
  );
};
