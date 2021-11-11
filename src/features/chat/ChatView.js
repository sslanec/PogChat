// Copyright 2021 Sean Slanec and Zoey Taylor
// This file is part of PogChat.

// PogChat is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of
// the License, or (at your option) any later version.

// PogChat is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with PogChat.  If not, see <https://www.gnu.org/licenses/>.

import { useSelector } from 'react-redux';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import ChatMessage from 'features/chat/ChatMessage';
import SystemMessage from 'features/chat/SystemMessage';
import GiftMessage from 'features/chat/GiftMessage';
import EventMessage from 'features/chat/EventMessage';
import { Virtuoso } from 'react-virtuoso';

export default function ChatView(props) {
  const chats = useSelector(state => state.chat);
  const alertColor = useColorModeValue('orange.300', 'orange.600');

  const renderedChats = chats.map((chat, index) => {
    var newChat;
    switch (chat.msgType) {
      case 'chat':
        newChat = (
          <Box paddingTop={index === 0 ? 0 : 1} paddingBottom={1} key={index}>
            <ChatMessage
              bits={chat.bits}
              cheerList={chat.cheerList}
              msg={chat.msg}
              self={chat.self}
              userstate={chat.userstate}
            />
          </Box>
        );
        break;
      case 'system':
        newChat = (
          <Box paddingTop={index === 0 ? 0 : 1} paddingBottom={1} key={index}>
            <SystemMessage msg={chat.msg} />
          </Box>
        );
        break;
      case 'gift':
        newChat = (
          <Box
            paddingTop={index === 0 ? 0 : 1}
            paddingBottom={1}
            key={index}
            background={alertColor}
          >
            <GiftMessage
              msg={chat.msg}
              recipient={chat.recipient}
              displayName={chat.displayName}
            />
          </Box>
        );
        break;
      case 'event':
        newChat = (
          <Box
            paddingTop={index === 0 ? 0 : 1}
            paddingBottom={1}
            key={index}
            background={alertColor}
          >
            <EventMessage msg={chat.msg} displayName={chat.displayName} />
          </Box>
        );
        break;
      default:
        break;
    }

    return newChat;
  });

  return (
    <Flex flexDirection="column" {...props}>
      <Virtuoso
        totalCount={renderedChats.length}
        itemContent={index => renderedChats[index]}
        followOutput={true}
      />
    </Flex>
  );
}
