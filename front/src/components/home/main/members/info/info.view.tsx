import React from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
} from '@chakra-ui/react';
import { IMember } from '../../../../../common/models';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  member: IMember;
}

export default (props: Props): JSX.Element => {
  const { isOpen, onClose, member } = props;
  const btnRef = React.useRef(null);

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{member.name}</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button color="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
