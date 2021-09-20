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
        />
        <EmotePicker
          disabled={!loggedIn || !connected}
          insertEmote={insertEmote}
        />
        <Button disabled={!loggedIn || !connected || msg === ''} type="submit">
          Send
        </Button>
      </HStack>
    </FormControl>
  );
}
