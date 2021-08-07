import { useContext } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import ChatContext from '../../context/Chat/Chat';
import { v4 as uuid } from 'uuid';
import ScrollableFeed from 'react-scrollable-feed';

export default function ChatView(props) {
  const { chats } = useContext(ChatContext);

  return (
    <Flex flexDirection="column" {...props}>
      <ScrollableFeed>
        {chats.map(({ msg }) => (
          <Box key={uuid()}>{msg}</Box>
        ))}
      </ScrollableFeed>
    </Flex>
  );
}
