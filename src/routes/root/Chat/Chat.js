import { useReducer } from 'react';
import ChannelForm from 'features/chat/ChannelForm';
import ChatView from 'features/chat/ChatView';
import ChatForm from 'features/chat/ChatForm';
import ChatContext from 'context/Chat/Chat';
import ChatMessage from 'features/chat/ChatMessage';

function chatReducer(state, { type, item }) {
  switch (type) {
    case 'ADD':
      return [...state, item];
    case 'CLEAR':
      let clrState = state;
      for (let i = clrState.length - 1; i > 0; i--) {
        if (clrState[i]['channel'] === item) {
          // clrState[i]['ref'].current.remove();
          clrState.splice(i, 1);
        }
      }
      return clrState;
    case 'DELETE':
      let delState = state;
      let deleted = false;
      let i = delState.length - 1;
      while (!deleted) {
        if (delState[i]['id'] === item) {
          let delMsg = delState[i]['ref'].current.innerHTML.split(': ');
          delMsg[1] = '< message deleted >';
          delState[i]['ref'].current.innerHTML = delMsg.join(': ');
          delState[i] = {
            msg: (
              <ChatMessage
                displayName={delState[i]['msg']['props']['displayName']}
                msg="< message deleted >"
                userstate={delState[i]['msg']['props']['userstate']}
                reference={delState[i]['msg']['props']['reference']}
              />
            ),
            id: delState[i]['id'],
            ref: delState[i]['ref'],
            channel: delState[i]['channel'],
          };
          deleted = true;
        }
        i--;
      }
      return delState;
    default:
      return state;
  }
}

export default function Chat(props) {
  const [chats, setChats] = useReducer(chatReducer, []);

  return (
    <>
      <ChatContext.Provider value={{ chats, setChats }}>
        <ChannelForm />
        <ChatView flex={[1, 1, '1px']} paddingTop={2} overflow="auto" />
      </ChatContext.Provider>
      <ChatForm paddingTop={2} />
    </>
  );
}
