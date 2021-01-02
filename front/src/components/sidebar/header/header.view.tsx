import React from 'react';
import {
  Box,
  Avatar,
  AvatarBadge,
  Stack,
  Heading,
  Badge,
  Text,
  Divider,
} from '@chakra-ui/react';
import { IUser } from '../../../common/models/user.model';

interface Props {
  user: IUser;
}

export default (props: Props): JSX.Element => {
  const { user } = props;

  return (
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
  );
};
