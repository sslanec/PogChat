import { useContext } from 'react';
import { Flex, HStack } from '@chakra-ui/react';
import ChatContext from '../../context/Chat/Chat';
import { v4 as uuid } from 'uuid';

export default function ChatView(props) {
  const { chats } = useContext(ChatContext);

  return (
    <Flex flexFlow="column" {...props}>
      {chats.map(({ msg }) => (
        <HStack key={uuid()}>{msg}</HStack>
      ))}
    </Flex>
  );
}
