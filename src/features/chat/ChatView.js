import { useSelector } from 'react-redux';
import { Box, Flex } from '@chakra-ui/react';
import ScrollableFeed from 'react-scrollable-feed';
import ChatMessage from 'features/chat/ChatMessage';
import SystemMessage from 'features/chat/SystemMessage';
import GiftMessage from 'features/chat/GiftMessage';
import EventMessage from 'features/chat/EventMessage';

export default function ChatView(props) {
  const chats = useSelector(state => state.chat);

  const renderedChats = chats.slice(-200).map((chat, index) => {
    var newChat;
    switch (chat.msgType) {
      case 'chat':
        newChat = (
          <ChatMessage
            bits={chat.bits}
            cheerList={chat.cheerList}
            msg={chat.msg}
            self={chat.self}
            userstate={chat.userstate}
          />
        );
        break;
      case 'system':
        newChat = <SystemMessage msg={chat.msg} />;
        break;
      case 'gift':
        newChat = (
          <GiftMessage
            msg={chat.msg}
            recipient={chat.recipient}
            displayName={chat.displayName}
          />
        );
        break;
      case 'event':
        newChat = (
          <EventMessage msg={chat.msg} displayName={chat.displayName} />
        );
        break;
      default:
        break;
    }

    return (
      <Box paddingTop={index === 0 ? 0 : 1} paddingBottom={1} key={index}>
        {newChat}
      </Box>
    );
  });

  return (
    <Flex flexDirection="column" {...props}>
      <ScrollableFeed>{renderedChats}</ScrollableFeed>
    </Flex>
  );
}
