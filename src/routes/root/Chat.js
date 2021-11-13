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

import { Flex } from '@chakra-ui/react';
import ChannelForm from 'features/chat/ChannelForm';
import ChatView from 'features/chat/ChatView';
import ChatForm from 'features/chat/ChatForm';

export default function Chat() {
  return (
    <Flex paddingBottom={2} direction="column" flexGrow={1}>
      <ChannelForm paddingLeft={[3, 3, 0, 0]} paddingRight={[3, 3, 0, 0]} />
      <ChatView flex={[1, 1, '1px']} paddingTop={2} overflow="auto" />
      <ChatForm
        paddingLeft={[3, 3, 0, 0]}
        paddingRight={[3, 3, 0, 0]}
        paddingTop={2}
      />
    </Flex>
  );
}
