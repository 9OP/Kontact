import React from 'react';
import {
  Box,
  Stack,
  Heading,
  Badge,
  Text,
} from '@chakra-ui/react';
import { IAuth } from '../../../common/models';

interface Props {
  user: IAuth;
}

export default (props: Props): JSX.Element => {
  const { user } = props;

  return (
    <Box
      textAlign="left"
      // backgroundColor="cyan.400"
      height="60px"
      borderBottom="1px solid gray"
    >
      <Box marginLeft=".5rem">
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

    </Box>
  );
};
