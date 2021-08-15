import ChannelForm from '../../../components/ChannelForm/ChannelForm';
import ChatView from '../../../components/ChatView/ChatView';
import ChatForm from '../../../components/ChatForm/ChatForm';

export default function Chat(props) {
  return (
    <>
      <ChannelForm />
      <ChatView flex={[1, 1, '1px']} paddingTop={2} overflow="auto" />
      <ChatForm paddingTop={2} />
    </>
  );
}
