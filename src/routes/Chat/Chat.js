import { Container } from '@chakra-ui/react';
import ChannelForm from '../../components/ChannelForm/ChannelForm';
import ChatView from '../../components/ChatView/ChatView';
import ChatForm from '../../components/ChatForm/ChatForm';

export default function Chat(props) {
  return (
    <Container display="flex" flexDirection="column" minHeight={0} {...props}>
      <ChannelForm />
      <ChatView flex={[1, 1, '1px']} marginTop={2} overflow="auto" />
      <ChatForm marginTop={2} />
    </Container>
  );
}
