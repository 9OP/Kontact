import React from 'react';
import {
  Box,
  Button,
  Avatar,
  AvatarBadge,
  Stack,
  Heading,
  Badge,
  Text,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import ThemeToggler from '../theme_toggler';
import { IUser } from '../../common/models/user.model';

interface Props {
  signout: () => void;
  user: IUser;
}

export default (props: Props): JSX.Element => {
  const { signout, user } = props;
  const bg = useColorModeValue('gray.50', 'gray.800');
  const border = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      as="nav"
      bg={bg}
      width="17rem"
      height="100vh"
      position="fixed"
      overflow="auto"
      boxShadow="xl"
      borderRight="1px solid"
      borderRightColor={border}
    >
      {/* Header */}
      <Box padding="1.15rem" textAlign="left">
        <Stack direction="row" spacing="24px">
          <Avatar boxSize="2.5em" marginY="auto">
            <AvatarBadge boxSize="1em" bg="blue.500" />
          </Avatar>
          <Box>
            <Stack direction="row">
              <Heading as="h3" size="lg">
                {user.name}
                <Badge ml="2" variant="outline" colorScheme="blue">
                  {user.access}
                </Badge>
              </Heading>
            </Stack>
            <Text fontSize="sm" color="gray.500">{user.email}</Text>
          </Box>
        </Stack>
      </Box>
      <Divider />

      {/* Footer */}
      <Box position="absolute" bottom="0" width="100%">
        <Divider />
        <Box display="flex" flexDirection="row" padding=".5em">
          <Button
            padding=".25rem"
            colorScheme="orange"
            variant="outline"
            flex="1"
            marginRight=".5em"
            onClick={() => signout()}
          >
            Sign out
          </Button>
          <ThemeToggler />
        </Box>
      </Box>
    </Box>
  );
};
