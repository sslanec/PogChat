import { useContext } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import ChatContext from '../../context/Chat/Chat';
import ScrollableFeed from 'react-scrollable-feed';

export default function ChatView(props) {
  const { chats } = useContext(ChatContext);

  return (
    <Flex flexDirection="column" {...props}>
      <ScrollableFeed>
        {chats.slice(-200).map(({ msg }, index) => (
          <Box key={index}>{msg}</Box>
        ))}
      </ScrollableFeed>
    </Flex>
  );
}
