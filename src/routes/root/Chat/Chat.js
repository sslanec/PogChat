import ChannelForm from 'features/chat/ChannelForm';
import ChatView from 'features/chat/ChatView';
import ChatForm from 'features/chat/ChatForm';

export default function Chat(props) {
  return (
    <>
      <ChannelForm />
      <ChatView flex={[1, 1, '1px']} paddingTop={2} overflow="auto" />
      <ChatForm paddingTop={2} />
    </>
  );
}
