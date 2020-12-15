import React from 'react';
import {
  Flex,
  Box,
  Button,
  Avatar,
  AvatarBadge,
  Stack,
  Heading,
  Textarea,
  Badge,
  Text,
} from '@chakra-ui/react';
import { IUser } from '../../common/models/user.model';

interface Props {
  signout: () => void;
  user: IUser;
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  sendMessage: () => void;
}

export default (props: Props): JSX.Element => {
  const {
    signout, user, setMessage, sendMessage,
  } = props;

  return (
    <Box>
      <Flex width="full" align="center" justifyContent="center">
        <Box
          p={8}
          maxWidth="700px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Box textAlign="left">
            <Stack direction="row" spacing="24px">
              <Avatar boxSize="3em">
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

            <Button
              colorScheme="orange"
              variant="outline"
              width="full"
              mt={4}
              onClick={() => signout()}
            >
              Sign out
            </Button>
          </Box>
        </Box>
      </Flex>

      <Flex mt="5" width="full" align="center" justifyContent="center">
        <Box
          p={3}
          maxWidth="700px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Textarea
            placeholder=".... "
            size="sm"
            resize="none"
            onChange={(event) => setMessage(event.currentTarget.value)}
          />
          <Button
            colorScheme="blue"
            variant="outline"
            width="full"
            mt={4}
            onClick={() => sendMessage()}
          >
            Send message
          </Button>
        </Box>
        {/* {data} */}
      </Flex>
    </Box>

  );
};
