import React from 'react';
import {
  Text,
  IconButton,
  HStack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import SearchModal from './search';

interface Props {
  isMaster: boolean;
}

export default (props: Props): JSX.Element => {
  const { isMaster } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack
        position="sticky"
        top="0"
        paddingTop="1rem"
        paddingBottom=".5rem"
        boxShadow="0px 10px 10px 5px white"
        backgroundColor="white"
        alignItems="inherit"
      >
        <HStack justifyContent="space-between">
          <Text
            letterSpacing=".1rem"
            fontWeight="bold"
            color="gray.700"
            fontSize="md"
          >
            MEMBERS
          </Text>
          {isMaster ? (
            <IconButton
              size="xs"
              colorScheme="blue"
              variant="outline"
              aria-label="Add member"
              icon={<AddIcon />}
              onClick={onOpen}
            />
          ) : null}
        </HStack>
        {/* <Text color="gray.500" fontSize="xs">
        {`${members.length}/${members.length}`}
      </Text> */}
      </VStack>
      <SearchModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
