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
