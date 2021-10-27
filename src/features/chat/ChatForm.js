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

import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, Button, FormControl, HStack } from '@chakra-ui/react';
import UserContext from 'context/User/User';
import EmotePicker from 'features/chat/EmotePicker';

export default function ChatForm(props) {
  const { user } = useContext(UserContext);
  const [msg, setMsg] = useState('');
  const connected = useSelector(state => state.user.connected);
  const loggedIn = useSelector(state => state.user.loggedIn);
  const chatChannel = useSelector(state => state.user.chatChannel);

  const handleChange = event => {
    setMsg(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (msg.trim() !== '') {
      user.chatClient.say(chatChannel, msg.trim());
      setMsg('');
    }
  };

  const insertEmote = emote => {
    if (msg.slice(-1) === ' ' || props.msg === '') {
      setMsg(`${msg}${emote} `);
    } else {
      setMsg(`${msg} ${emote} `);
    }
  };

  return (
    <FormControl as="form" onSubmit={handleSubmit} {...props}>
      <HStack>
        <Input
          disabled={!loggedIn || !connected}
          fontSize
          onChange={handleChange}
          value={msg}
          variant="filled"
        />
        <EmotePicker insertEmote={insertEmote} />
        <Button disabled={!loggedIn || !connected || msg === ''} type="submit">
          Send
        </Button>
      </HStack>
    </FormControl>
  );
}
