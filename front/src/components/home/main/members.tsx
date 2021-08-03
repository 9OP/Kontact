import React, { useEffect } from 'react';
import {
  Text,
  ListItem,
  HStack,
  Box,
  List,
  VStack,
  IconButton,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import { useFetchMembers, useMembers } from '../../../services/hooks/member.hooks';
import { useChannels } from '../../../services/hooks/channel.hooks';
import { IMember } from '../../../common/models';
import { useSignout } from '../../../services/hooks/auth.hooks';

interface Props {
  member: IMember;
}

const MemberItem = (props: Props): JSX.Element => {
  const { member } = props;

  return (
    <ListItem key={member.id} color="gray.600">
      <HStack>
        <Text fontWeight="bold" fontSize="sm">
          {member.name}
        </Text>
      </HStack>
    </ListItem>
  );
};

export default (): JSX.Element => {
  const { channel } = useChannels();
  const { members } = useMembers(channel.id);
  const [signout] = useSignout();
  const [fetchMembers] = useFetchMembers();

  useEffect(() => {
    // refetch members when opened channel changes
    fetchMembers();
  }, [channel]);

  const renderMembers = () => members.map((member: IMember) => (
    <MemberItem
      key={member.id}
      member={member}
    />
  ));

  return (

    <Flex
      direction="column"
      minWidth="17rem"
      padding="1rem"
      paddingTop="0"
      overflow="auto"
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
    >
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
        </HStack>
      </VStack>

      <List spacing={8} marginY="2rem">
        { (members && members?.length) ? renderMembers() : null}
      </List>

      {/* footer */}
      <Box
        marginTop="auto"
        padding="1rem"
        boxShadow="0px -5px 10px 2px white"
      >
        <IconButton
          colorScheme="orange"
          variant="outline"
          aria-label="Signout"
          icon={<Icon as={FiLogOut} />}
          onClick={() => signout()}
        />
      </Box>
    </Flex>
  );
};
