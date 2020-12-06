import React from 'react';
import {
  Box,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';

interface Props {
  message: string
}

export default function ErrorMessage(props: Props): JSX.Element {
  const { message } = props;
  return (
    <Box my={4}>
      <Alert status="error" borderRadius={4}>
        <AlertIcon />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </Box>
  );
}
