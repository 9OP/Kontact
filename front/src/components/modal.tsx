import React from 'react';
import {
  Button, ModalBody, ModalFooter, ModalCloseButton,
  Modal, ModalOverlay, ModalContent, ModalHeader,
} from '@chakra-ui/react';

interface Props {
  isOpen: boolean,
  onClose: () => void,
  header: string,
  body: JSX.Element,
  onSubmit: () => void,
  action: string,
}

export default (props: Props): JSX.Element => {
  const {
    isOpen, onClose, header, body, onSubmit, action,
  } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {body}
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="teal" variant="outline" onClick={onSubmit}>{action}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
