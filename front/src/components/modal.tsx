import React from 'react';
import {
  Button,
  ModalBody,
  ModalFooter,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
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

        <ModalBody>
          {body}
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="teal" variant="solid" onClick={onSubmit}>{action}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
