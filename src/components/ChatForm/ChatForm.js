import { useContext, useState } from 'react';
import { Input, Button, FormControl, HStack } from '@chakra-ui/react';
import UserContext from '../../context/User/User';
import EmotePicker from '../EmotePicker/EmotePicker';

export default function ChatForm(props) {
  const { user } = useContext(UserContext);
  const [msg, setMsg] = useState('');

  const handleChange = event => {
    setMsg(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (msg.trim() !== '') {
      user.chatClient.say(user.chatChannel, msg.trim());
      setMsg('');
    }
  };

  return (
    <FormControl as="form" onSubmit={handleSubmit} {...props}>
      <HStack>
        <Input
          disabled={!user.loggedIn || !user.connected}
          fontSize
          onChange={handleChange}
          value={msg}
        />
        <EmotePicker
          disabled={!user.loggedIn || !user.connected}
          msg={msg}
          setMsg={setMsg}
        />
        <Button
          disabled={!user.loggedIn || !user.connected || msg === ''}
          type="submit"
        >
          Send
        </Button>
      </HStack>
    </FormControl>
  );
}
