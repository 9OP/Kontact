import React from 'react';
import {
  Text,
  Badge,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  FormControl,
  FormLabel,
  Switch,
  FormHelperText,
} from '@chakra-ui/react';
import { ERole, IMember } from '../../../../common/models';
import { useUpdateMember } from '../../../../services/hooks/member.hooks';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isMaster: boolean;
  member: IMember;
}

export default (props: Props): JSX.Element => {
  const {
    isOpen, onClose, isMaster, member,
  } = props;
  const btnRef = React.useRef(null);
  const [update] = useUpdateMember();

  const changeRole = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    update(
      member.id,
      member.role === ERole.Member ? ERole.Master : ERole.Member,
    );
  };

  const renderRole = (): JSX.Element => {
    const Master = (
      <Badge variant="solid" colorScheme="teal" fontSize="xs">
        Master
      </Badge>
    );
    const Member = (
      <Badge variant="solid" colorScheme="blue" fontSize="xs">
        Member
      </Badge>
    );

    switch (member.role) {
      case ERole.Master:
        return Master;
      default:
        return Member;
    }
  };

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
          <DrawerHeader>
            <HStack>
              <Text fontSize="md" fontWeight="bold" color="gray.800">
                {member.name}
              </Text>
              {renderRole()}
            </HStack>
            <Text fontSize="xs" color="gray.500">
              {`#${member.id?.slice(0, 5)}`}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {member.email}
            </Text>
            <Text fontSize="xs" color="gray.600">
              {`Joined: ${member.joinedAt?.toDateString()}`}
            </Text>
          </DrawerHeader>

          <DrawerBody>
            <FormControl
              display="flex"
              alignItems="center"
              isDisabled={!isMaster}
            >
              <FormLabel htmlFor="channel-role" mb="0">
                Channel master
              </FormLabel>
              <Switch
                id="channel-role"
                colorScheme="teal"
                isDisabled={!isMaster}
                isChecked={member.role === ERole.Master}
                onChange={changeRole}
              />
            </FormControl>
            {!isMaster ? (
              <FormHelperText>
                You need Master role
              </FormHelperText>
            ) : null}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
