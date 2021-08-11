import { Container } from '@chakra-ui/react';
import ChannelForm from '../../components/ChannelForm/ChannelForm';
import ChatView from '../../components/ChatView/ChatView';
import ChatForm from '../../components/ChatForm/ChatForm';

export default function Chat(props) {
  return (
    <Container
      display="flex"
      flexDirection="column"
      minHeight={0}
      paddingTop={2}
      // paddingBottom={1}
      paddingLeft={2}
      paddingRight={2}
      {...props}
    >
      <ChannelForm />
      <ChatView flex={[1, 1, '1px']} paddingTop={2} overflow="auto" />
      <ChatForm paddingTop={2} />
    </Container>
  );
}
