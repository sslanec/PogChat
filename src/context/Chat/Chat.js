import { createContext } from 'react';

const ChatContext = createContext({
  chats: [],
  setChats: () => [],
});
export default ChatContext;
